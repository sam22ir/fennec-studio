import { Download } from "lucide-react";
import type { AndroidDownload as AndroidDownloadInfo } from "../projects/project-data";

interface AndroidDownloadProps {
  android: AndroidDownloadInfo;
  isArabic: boolean;
}

const labels = {
  en: {
    heading: "Download for Android",
    button: "Download APK",
    comingSoon: "Coming soon",
    version: "Version",
    size: "Size",
    stepsTitle: "How to install",
    steps: [
      "Download the APK file to your Android device.",
      "Open the file and allow installs from this source if prompted.",
      "Tap Install, then open the app.",
    ],
  },
  ar: {
    heading: "حمّل نسخة أندرويد",
    button: "تحميل ملف APK",
    comingSoon: "قريباً",
    version: "الإصدار",
    size: "الحجم",
    stepsTitle: "طريقة التثبيت",
    steps: [
      "حمّل ملف APK على جهاز أندرويد الخاص بك.",
      "افتح الملف، وفعّل السماح بالتثبيت من هذا المصدر إذا طُلب منك ذلك.",
      "اضغط تثبيت، ثم افتح التطبيق.",
    ],
  },
};

export function AndroidDownload({ android, isArabic }: AndroidDownloadProps) {
  const t = labels[isArabic ? "ar" : "en"];
  const hasUrl = android.url.trim() !== "";

  return (
    <section className="case-section-block">
      <div className="case-content-container">
        <h2 className="case-h2">{t.heading}</h2>

        <dl className="case-links-row">
          {android.version && (
            <div>
              <dt>{t.version}</dt>
              <dd>{android.version}</dd>
            </div>
          )}
          {android.size && (
            <div>
              <dt>{t.size}</dt>
              <dd>{android.size}</dd>
            </div>
          )}
        </dl>

        {hasUrl ? (
          <a href={android.url} className="btn-case-primary" rel="noreferrer">
            <Download size={17} />
            <span>{t.button}</span>
          </a>
        ) : (
          <span
            className="btn-case-primary"
            aria-disabled="true"
            style={{ opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" }}
          >
            <Download size={17} />
            <span>{t.comingSoon}</span>
          </span>
        )}

        <h3 className="case-h3">{t.stepsTitle}</h3>
        <ol>
          {t.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
