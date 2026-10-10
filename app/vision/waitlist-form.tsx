"use client";

import { useState, type FormEvent } from "react";

type Locale = "en" | "ar";
type Status = "idle" | "submitting" | "success" | "error" | "invalid";

const copy = {
  en: {
    heading: "Get notified when something launches",
    email: "Email",
    emailPlaceholder: "you@example.com",
    interest: "Which project interests you?",
    interestPlaceholder: "e.g. Koupa, Nabdh, a new idea",
    submit: "Notify me",
    submitting: "Sending...",
    success: "Thank you! We'll let you know when something is ready.",
    error: "Something went wrong. Please try again in a moment.",
    invalid: "Please enter a valid email address.",
  },
  ar: {
    heading: "أعلمني عند إطلاق شيء جديد",
    email: "البريد الإلكتروني",
    emailPlaceholder: "you@example.com",
    interest: "أي مشروع يهمك؟",
    interestPlaceholder: "مثال: كوبا، نبض، فكرة جديدة",
    submit: "أعلمني",
    submitting: "جارٍ الإرسال...",
    success: "شكراً لك! سنخبرك عندما يصبح شيء ما جاهزاً في فينك.",
    error: "حدث خطأ ما. يرجى المحاولة مرة أخرى بعد قليل.",
    invalid: "يرجى إدخال بريد إلكتروني صحيح.",
  },
} as const;

export function WaitlistForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [website, setWebsite] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, interest, locale, website }),
      });
      if (response.ok) {
        setStatus("success");
        setEmail("");
        setInterest("");
        return;
      }
      setStatus(response.status === 400 ? "invalid" : "error");
    } catch {
      setStatus("error");
    }
  }

  const message =
    status === "success" ? t.success : status === "error" ? t.error : status === "invalid" ? t.invalid : "";
  const submitting = status === "submitting";

  return (
    <div className="vs-wait">
      <h3 className="vs-wait-title">{t.heading}</h3>
      <form className="vs-wait-form" onSubmit={handleSubmit}>
        <div className="vs-wait-field">
          <label htmlFor="vs-wait-email">{t.email}</label>
          <input
            id="vs-wait-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
          />
        </div>
        <div className="vs-wait-field">
          <label htmlFor="vs-wait-interest">{t.interest}</label>
          <input
            id="vs-wait-interest"
            name="interest"
            type="text"
            maxLength={100}
            placeholder={t.interestPlaceholder}
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            disabled={submitting}
          />
        </div>
        <div className="vs-wait-hp" aria-hidden="true">
          <label htmlFor="vs-wait-website">Website</label>
          <input
            id="vs-wait-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <button type="submit" className="vs-wait-submit" disabled={submitting}>
          {submitting ? t.submitting : t.submit}
        </button>
      </form>
      <p className="vs-wait-status" role="status" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
