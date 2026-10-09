import type { FaqEntry } from "../seo/json-ld";

// Visible FAQ on the Vision pages. The same entries feed the FAQPage JSON-LD.
export const visionFaq: Record<"ar" | "en", readonly FaqEntry[]> = {
  en: [
    {
      question: "What is Fennec Studio?",
      answer: "Fennec Studio is an independent Algerian product studio based in Algiers. It builds digital products for care, local services, beauty, personal finance, and developer tools.",
    },
    {
      question: "Which products does Fennec Studio build?",
      answer: "Koupa and Lamsa are booking apps for local services. Nabdh connects patients with doctors and clinics. Masroof tracks personal expenses offline. Nexus is a desktop control plane for developers running AI coding agents.",
    },
    {
      question: "Are the products available in Arabic?",
      answer: "Yes. Fennec designs its products bilingual by default. Nabdh is Arabic-first, and Lamsa is an Arabic-first Android app with a right-to-left interface.",
    },
    {
      question: "Does Masroof need an internet connection?",
      answer: "No. Masroof is offline-first. All financial records stay on your device in local SQLite storage, and you do not need to share bank logins.",
    },
  ],
  ar: [
    {
      question: "ما هو استوديو فينك؟",
      answer: "فينك استوديو مستقل للمنتجات الرقمية من الجزائر، يعمل من الجزائر العاصمة، ويبني منتجات للرعاية الصحية والخدمات المحلية والجمال والمال الشخصي وأدوات المطورين.",
    },
    {
      question: "ما المنتجات التي يبنيها فينك؟",
      answer: "Koupa ولمسة تطبيقان للحجز في الخدمات المحلية. نبض يربط المرضى بالأطباء والعيادات. Masroof (مصاريف) يتتبع المصاريف الشخصية دون إنترنت. Nexus لوحة تحكم لسطح المكتب للمطورين الذين يشغّلون وكلاء البرمجة بالذكاء الاصطناعي.",
    },
    {
      question: "هل المنتجات متاحة باللغة العربية؟",
      answer: "نعم. يصمم فينك منتجاته ثنائية اللغة من الأساس. نبض عربي أولاً، ولمسة تطبيق أندرويد عربي أولاً بواجهة من اليمين إلى اليسار.",
    },
    {
      question: "هل يحتاج Masroof (مصاريف) إلى اتصال بالإنترنت؟",
      answer: "لا. يعمل Masroof بدون إنترنت أولاً. تبقى جميع السجلات المالية على جهازك في تخزين SQLite محلي، ولا تحتاج إلى مشاركة حسابات بنكية.",
    },
  ],
};
