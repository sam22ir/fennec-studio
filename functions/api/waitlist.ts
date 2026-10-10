// Cloudflare Pages Function: stores waitlist signups in the WAITLIST_DB D1 binding.

interface WaitlistDatabase {
  prepare(query: string): {
    bind(...values: unknown[]): { run(): Promise<unknown> };
  };
}

interface WaitlistEnv {
  WAITLIST_DB?: WaitlistDatabase;
}

interface WaitlistContext {
  request: Request;
  env: WaitlistEnv;
}

type WaitlistHandler = (context: WaitlistContext) => Promise<Response> | Response;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_MAX_LENGTH = 254;
const INTEREST_MAX_LENGTH = 100;

const RESPONSE_HEADERS = {
  "content-type": "application/json",
  "cache-control": "no-store",
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: RESPONSE_HEADERS });
}

export const onRequestPost: WaitlistHandler = async ({ request, env }) => {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    return json({ ok: false, error: "invalid_body" }, 400);
  }

  const body = payload as Record<string, unknown>;

  // Honeypot: bots fill hidden fields. Pretend success without storing anything.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(email)) {
    return json({ ok: false, error: "invalid_email" }, 400);
  }

  const rawInterest = typeof body.interest === "string" ? body.interest.trim() : "";
  if (rawInterest.length > INTEREST_MAX_LENGTH) {
    return json({ ok: false, error: "invalid_interest" }, 400);
  }
  const interest = rawInterest === "" ? null : rawInterest;

  const locale = body.locale === "ar" ? "ar" : "en";

  if (!env.WAITLIST_DB) {
    return json({ ok: false, error: "not_configured" }, 503);
  }

  try {
    await env.WAITLIST_DB
      .prepare("INSERT OR IGNORE INTO waitlist (email, interest, locale, created_at) VALUES (?, ?, ?, ?)")
      .bind(email, interest, locale, new Date().toISOString())
      .run();
  } catch {
    return json({ ok: false, error: "storage_error" }, 500);
  }

  return json({ ok: true });
};

export const onRequest: WaitlistHandler = ({ request, env }) => {
  if (request.method === "POST") {
    return onRequestPost({ request, env });
  }
  return new Response(JSON.stringify({ ok: false, error: "method_not_allowed" }), {
    status: 405,
    headers: { ...RESPONSE_HEADERS, allow: "POST" },
  });
};
