export const projectSlugs = ["koupa", "lamsa", "nabdh", "masroof", "nexus"] as const;

export type ProjectSlug = (typeof projectSlugs)[number];

export interface AndroidDownload {
  version: string;
  size: string;
  url: string;
}

export interface LocalizedProject {
  name: string;
  status: string;
  category: string;
  headline: string;
  description: string;
  context: string;
  approach: readonly (readonly [string, string, string])[];
  stack: readonly string[];
  metrics: readonly (readonly [string, string])[];
  siteUrl?: string;
  siteLabel: string;
  theme: string;
  logo: string;
  android?: AndroidDownload;
}

export const projects: Record<ProjectSlug, { en: LocalizedProject; ar: LocalizedProject }> = {
  koupa: {
    en: {
      name: "Koupa",
      status: "In active development",
      category: "Local Commerce & Services",
      headline: "Barbershop discovery and time reservations made seamless",
      description: "Koupa helps customers discover neighborhood barbers, pick an open chair, and lets shop owners manage their daily schedule with zero friction",
      context: "A trusted barber is a local relationship. Koupa organizes community familiarity into a structured, lightweight reservation tool that eliminates queues and respects everyone's time",
      approach: [
        ["01", "Hyper-local Barber Discovery", "Search starts with your immediate neighborhood, verified ratings, and stylist portfolios"],
        ["02", "Guaranteed Time Slots", "Direct calendar picking that turns a booking into a committed attendance"],
        ["03", "Frictionless Shop Dashboard", "Streamlined owner screen designed to be glanced at between haircuts"],
      ],
      stack: ["Expo", "Supabase", "Firebase", "Realtime Sync"],
      metrics: [
        ["Experience", "Queue-free booking"],
        ["Focus", "Local barbers & salons"],
        ["Platform", "iOS & Android"],
      ],
      siteUrl: "https://koupa-website.pages.dev",
      siteLabel: "Visit Koupa web",
      theme: "koupa-theme",
      android: { version: "", size: "", url: "" },
      logo: "/projects/koupa-logo.webp",
    },
    ar: {
      name: "Koupa",
      status: "قيد التطوير النشط",
      category: "الخدمات المحلية",
      headline: "حجز مواعيد الحلاقة وتنظيم الصالونات بذكاء",
      description: "تطبيق Koupa يساعد الزبائن على اكتشاف أفضل صالونات الحلاقة القريبة، وحجز مقعد بدقة، وإدارة مواعيد المحل دون طوابير انتظار",
      context: "الحلاق الجيد هو علاقة ثقة محلية. يحول Koupa هذا الواقع إلى تجربة حجز سلسة تحترم وقت الزبون وتمنح صاحب المحل يوماً منظماً وهادئاً",
      approach: [
        ["01", "اكتشاف المحلات القريبة", "يبدأ البحث بالحي أولاً، مع عرض الخدمات، الأسعار، وأعمال الحلاق السابقة"],
        ["02", "اختيار الوقت المتاح", "جدول أوقات واضح يحول الحجز إلى التزام حقيقي بدلاً من مجرد طلب معلق"],
        ["03", "لوحة تحكم خفيفة للمحل", "واجهة سهلة لصاحب المحل لمتابعة حجوزات اليوم بنقرة واحدة بين كل زبون"],
      ],
      stack: ["Expo", "Supabase", "Firebase", "مزامنة فورية"],
      metrics: [
        ["التجربة", "حجز بدون طوابير"],
        ["التركيز", "الصالونات والحلاقين"],
        ["المنصة", "تطبيق هاتف"],
      ],
      siteUrl: "https://koupa-website.pages.dev",
      siteLabel: "زر موقع Koupa",
      theme: "koupa-theme",
      android: { version: "", size: "", url: "" },
      logo: "/projects/koupa-logo.webp",
    },
  },
  nabdh: {
    en: {
      name: "Nabdh",
      status: "Available outside Google Play",
      category: "Healthcare Access",
      headline: "A clearer, dignified route to medical care",
      description: "Nabdh is an Arabic-first medical booking platform connecting patients with trusted doctors and clinics across Algeria",
      context: "Finding and booking healthcare should never be a multi-call struggle. Nabdh establishes real-time specialty discovery, doctor working hours, and instant visit confirmation with zero ambiguity",
      approach: [
        ["01", "Real-Time Availability", "Patients explore verified clinicians, consult fees, and open appointment slots instantly"],
        ["02", "Native Arabic RTL Experience", "Built from the ground up for Arabic readers with intuitive right-to-left UI flows"],
        ["03", "Shared Patient-Clinic Ledger", "Both doctor clinics and patients stay synchronized on confirmed schedules and reminders"],
      ],
      stack: ["Expo React Native", "Convex Backend", "TypeScript", "Arabic RTL"],
      metrics: [
        ["Accessibility", "Zero wait confusion"],
        ["Interface", "Arabic-first design"],
        ["Audience", "Patients & Clinics"],
      ],
      siteUrl: "https://nabdh.uk",
      siteLabel: "Visit Live Platform",
      theme: "nabdh-theme",
      logo: "/projects/nabdh-logo.webp",
    },
    ar: {
      name: "نبض",
      status: "متاح خارج Google Play",
      category: "الرعاية الصحية",
      headline: "طريق أوضح وأيسر للرعاية الطبية",
      description: "نبض هو منصة حجز مواعيد طبية عربية أولاً تربط المرضى بالأطباء والعيادات الموثوقة في الجزائر بوضوح تام",
      context: "البحث عن موعد طبي لا يجب أن يكون عملية معقدة من الاتصالات المتكررة. يوفر نبض دليلاً عملياً للأطباء، أوقات العمل، وحجزاً مؤكداً ومباشراً",
      approach: [
        ["01", "توفر فوري للمواعيد", "استعراض الأطباء المعتمدين، تسعيرة الكشف، وحجز المواعيد المتاحة فورا"],
        ["02", "تجربة عربية أصيلة", "واجهات مدروسة ومصممة من البداية لاتجاه القراءة العربي بدون أي تعقيد"],
        ["03", "مزامنة بين المريض والعيادة", "سجل موحد للمواعيد يقلل التأخير ويضمن متابعة التنبيهات بسهولة"],
      ],
      stack: ["Expo React Native", "Convex", "TypeScript", "واجهة عربية أصيلة"],
      metrics: [
        ["التجربة", "وضوح وحجز مباشر"],
        ["الواجهة", "عربية أصيلة RTL"],
        ["الفئة", "المرضى والعيادات"],
      ],
      siteUrl: "https://nabdh.uk",
      siteLabel: "زر المنصة المباشرة",
      theme: "nabdh-theme",
      logo: "/projects/nabdh-logo.webp",
    },
  },
  masroof: {
    en: {
      name: "Masroof",
      status: "Available outside Google Play",
      category: "Personal Finance",
      headline: "Calm, local-first companion for your everyday money",
      description: "Masroof is an offline-first personal expense tracker built for Algerian Dinar workflows, recurring bills, and savings milestones",
      context: "Managing money shouldn't feel like a math exam or require sharing bank logins. Masroof keeps your financial ledger strictly private, offline-first, and aligned with local spending habits",
      approach: [
        ["01", "Offline Privacy", "All financial records remain 100% on your device with local SQLite storage"],
        ["02", "DZD-Native Categories", "Pre-configured spending buckets reflecting Algerian living expenses"],
        ["03", "Calm Visual Ledger", "No notifications or pressure; just clean insights into where your money goes"],
      ],
      stack: ["Expo", "Local SQLite", "Offline Storage", "TypeScript"],
      metrics: [
        ["Privacy", "100% On-device data"],
        ["Connectivity", "Works fully offline"],
        ["Currency", "Algerian Dinar (DZD)"],
      ],
      siteUrl: "https://masroof-legal.pages.dev",
      siteLabel: "Explore Masroof",
      theme: "masroof-theme",
      android: { version: "", size: "", url: "" },
      logo: "/projects/masarif-logo.webp",
    },
    ar: {
      name: "مصاريف",
      status: "متاح خارج Google Play",
      category: "المال الشخصي",
      headline: "رفيق مالي هادئ ومحلي لإدارة مدخولك ونفقاتك",
      description: "مصاريف هو تطبيق محلي يعمل بدون إنترنت لتتبع المصروفات، وإدارة الميزانية بالدينار الجزائري، وحماية أهداف الادخار",
      context: "إدارة المصاريف اليومية يجب أن تكون بسيطة ومطمئنة دون الحاجة لمشاركة حسابات بنكية. يحتفظ مصاريف ببياناتك محلياً بشكل آمن تماماً",
      approach: [
        ["01", "خصوصية تامة بدون إنترنت", "جميع بيانات المعاملات المالية تظل محفوظة داخل هاتفك فقط عبر SQLite"],
        ["02", "أقسام تناسب المصاريف المحلية", "تصنيفات معدة مسبقاً تناسب نمط الحياة والإنفاق بالدينار الجزائري"],
        ["03", "سجل مالي مريح بصرياً", "بدون إعلانات مزعجة أو تعقيدات، فقط رؤية واضحة لحركة أموالك شهرياً"],
      ],
      stack: ["Expo", "SQLite بدون إنترنت", "تخزين محلي", "TypeScript"],
      metrics: [
        ["الخصوصية", "بياناتك في جهازك فقط"],
        ["الاتصال", "يعمل كلياً بدون إنترنت"],
        ["العملة", "الدينار الجزائري (د.ج)"],
      ],
      siteUrl: "https://masroof-legal.pages.dev",
      siteLabel: "استكشف مصاريف",
      theme: "masroof-theme",
      android: { version: "", size: "", url: "" },
      logo: "/projects/masarif-logo.webp",
    },
  },
  lamsa: {
    en: {
      name: "Lamsa",
      status: "Early release",
      category: "Beauty & Salon Booking",
      headline: "Find a trusted salon and book your time without a call",
      description: "Lamsa is an Arabic-first Android app for women's beauty salons in Algeria: customers see real availability and book a specialist, and salons run their day from one place",
      context: "Booking a salon usually means messages, calls, and waiting for a reply. Lamsa shows genuine openings per specialist, prices in DZD, and a clear record for both sides",
      approach: [
        ["01", "Real availability", "Browse salons by city and service, then choose a specialist and an open time with no account needed to look around"],
        ["02", "Salon day in one place", "Owners set working hours, services, prices, and team, then follow today's appointments and mark arrivals"],
        ["03", "Pay at the salon", "Prices in dinars, one upcoming appointment at a time, and reminders before the visit"],
      ],
      stack: ["Expo", "React Native", "Supabase", "Arabic RTL"],
      metrics: [
        ["Platform", "Android"],
        ["Audience", "Women's salons"],
        ["Currency", "Algerian Dinar (DZD)"],
      ],
      siteUrl: "https://lamsa-website.nafaa-store.workers.dev/",
      siteLabel: "Visit Lamsa web",
      theme: "lamsa-theme",
      android: { version: "", size: "", url: "" },
      logo: "/projects/lamsa-logo.webp",
    },
    ar: {
      name: "لمسة",
      status: "إصدار مبكر",
      category: "الجمال وحجز الصالونات",
      headline: "اكتشفي صالونًا موثوقًا واحجزي موعدكِ دون اتصال",
      description: "لمسة تطبيق أندرويد عربي أولًا لصالونات التجميل النسائية في الجزائر: ترى الزبونة الأوقات المتاحة فعلًا وتحجز عند المختصة، وتدير الصالونات يومها من مكان واحد",
      context: "حجز موعد في صالون يعني غالبًا رسائل ومكالمات وانتظار ردّ. تعرض لمسة الأوقات الحقيقية لكل مختصة، والأسعار بالدينار، وسجلًا واضحًا للطرفين",
      approach: [
        ["01", "أوقات متاحة حقيقية", "تصفّحي الصالونات حسب المدينة والخدمة، ثم اختاري المختصة والوقت المناسب دون الحاجة إلى حساب للتصفح"],
        ["02", "يوم الصالون في مكان واحد", "تضبط صاحبة الصالون ساعات العمل والخدمات والأسعار والفريق، وتتابع مواعيد اليوم وتسجّل الحضور"],
        ["03", "الدفع في الصالون", "أسعار بالدينار، موعد قادم واحد في كل مرة، وتذكير قبل الزيارة"],
      ],
      stack: ["Expo", "React Native", "Supabase", "واجهة عربية RTL"],
      metrics: [
        ["المنصة", "أندرويد"],
        ["الفئة", "صالونات نسائية"],
        ["العملة", "الدينار الجزائري (د.ج)"],
      ],
      siteUrl: "https://lamsa-website.nafaa-store.workers.dev/",
      siteLabel: "زر موقع لمسة",
      theme: "lamsa-theme",
      android: { version: "", size: "", url: "" },
      logo: "/projects/lamsa-logo.webp",
    },
  },
  nexus: {
    en: {
      name: "Nexus",
      status: "Alpha, live now",
      category: "Developer Tools",
      headline: "Connect your agents once. Link your services once",
      description: "Nexus is a desktop control plane for developers running several AI coding agents. It routes each agent to the right project, environment, and service account, and refuses anything unresolved",
      context: "With many projects open at once, an agent can reach the wrong database or the wrong environment. Nexus resolves the active project first, then forwards the call, so agents never hold keys and Project A never touches Project B",
      approach: [
        ["01", "Project-aware routing", "Each agent session is tied to one workspace, project, and environment before any service call is made"],
        ["02", "Services linked once", "Supabase and GitHub connect natively; other services go through MCP forwarding"],
        ["03", "No keys in agents", "Credentials stay in the OS keychain. Unregistered or unresolved requests are refused before they reach a provider"],
      ],
      stack: ["Tauri", "TypeScript", "MCP", "OS Keychain"],
      metrics: [
        ["Platform", "Desktop"],
        ["Focus", "AI coding agents"],
        ["Principle", "No cross-project access"],
      ],
      siteUrl: "https://nexus-guard.nafaa-store.workers.dev/",
      siteLabel: "Visit Nexus web",
      theme: "nexus-theme",
      android: { version: "", size: "", url: "" },
      logo: "/projects/nexus-logo.webp",
    },
    ar: {
      name: "Nexus",
      status: "نسخة ألفا، متاحة الآن",
      category: "أدوات المطورين",
      headline: "اربط وكلاءك مرة واحدة، واربط خدماتك مرة واحدة",
      description: "Nexus لوحة تحكم لسطح المكتب للمطورين الذين يشغّلون عدة وكلاء برمجة بالذكاء الاصطناعي. توجّه كل وكيل إلى المشروع والبيئة وحساب الخدمة الصحيح، وترفض أي طلب غير محدد",
      context: "عند فتح عدة مشاريع معًا قد يصل الوكيل إلى قاعدة بيانات أو بيئة خاطئة. يحدد Nexus المشروع النشط أولًا ثم يمرّر الطلب، فلا يحمل الوكلاء المفاتيح ولا يلمس مشروع أ مشروع ب",
      approach: [
        ["01", "توجيه يعرف المشروع", "تُربط كل جلسة وكيل بمساحة عمل ومشروع وبيئة واحدة قبل أي نداء إلى خدمة"],
        ["02", "ربط الخدمات مرة واحدة", "يرتبط Supabase وGitHub مباشرة، وتمرّ بقية الخدمات عبر MCP"],
        ["03", "لا مفاتيح عند الوكلاء", "تبقى بيانات الاعتماد في سلسلة مفاتيح النظام، ويُرفض أي طلب غير مسجّل قبل وصوله إلى المزوّد"],
      ],
      stack: ["Tauri", "TypeScript", "MCP", "سلسلة مفاتيح النظام"],
      metrics: [
        ["المنصة", "سطح المكتب"],
        ["التركيز", "وكلاء البرمجة بالذكاء الاصطناعي"],
        ["المبدأ", "لا وصول بين المشاريع"],
      ],
      siteUrl: "https://nexus-guard.nafaa-store.workers.dev/",
      siteLabel: "زيارة موقع Nexus",
      theme: "nexus-theme",
      android: { version: "", size: "", url: "" },
      logo: "/projects/nexus-logo.webp",
    },
  },
};
