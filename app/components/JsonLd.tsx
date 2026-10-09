import type { JsonLdNode } from "../seo/json-ld";

// Emits schema.org data as a static script. "<" is escaped so the payload cannot close the tag.
export function JsonLd({ data }: { data: JsonLdNode }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
