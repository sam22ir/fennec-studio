"use client";

import { motion } from "framer-motion";
import { 
  CalendarDays, 
  MapPin, 
  WalletCards, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Building2,
  Network
} from "lucide-react";

export function NabdhInteractivePreview({ isArabic }: { isArabic: boolean }) {
  return (
    <div className="preview-card-frame preview-nabdh-frame">
      <div className="preview-app-shell">
        <div className="app-status-bar">
          <span>09:41</span>
          <span className="app-bar-brand">نبض · NABDH</span>
          <span className="status-battery">100%</span>
        </div>

        <div className="nabdh-app-header">
          <div className="patient-avatar">س</div>
          <div className="patient-info">
            <span className="patient-greeting">{isArabic ? "مرحباً سمير" : "Hello, Samir"}</span>
            <h4>{isArabic ? "حجز موعد طبي" : "Book Medical Visit"}</h4>
          </div>
        </div>

        <div className="doctor-card-highlight">
          <div className="doc-avatar-badge">د.ن</div>
          <div className="doc-meta">
            <strong>{isArabic ? "د. نادية بن عيسى" : "Dr. Nadia Benaissa"}</strong>
            <span>{isArabic ? "طب عام · الأبيار، الجزائر" : "General Medicine · El Biar, Algiers"}</span>
            <div className="doc-rating">
              <span className="rating-star">★ 4.9</span>
              <span className="rating-count">{isArabic ? "(142 تقييم)" : "(142 reviews)"}</span>
            </div>
          </div>
        </div>

        <div className="slots-section">
          <span className="slots-label">{isArabic ? "المواعيد المتاحة اليوم" : "Available Today"}</span>
          <div className="slots-grid">
            <span className="slot-item">09:00</span>
            <span className="slot-item active-slot">
              10:30 <CheckCircle2 size={11} className="slot-check" />
            </span>
            <span className="slot-item">14:00</span>
            <span className="slot-item">16:30</span>
          </div>
        </div>

        <div className="confirm-action-pill">
          <CalendarDays size={16} />
          <span>{isArabic ? "تأكيد الحجز الفوري" : "Confirm Appointment"}</span>
        </div>
      </div>
    </div>
  );
}

export function KoupaInteractivePreview({ isArabic }: { isArabic: boolean }) {
  return (
    <div className="preview-card-frame preview-koupa-frame">
      <div className="preview-app-shell koupa-shell">
        <div className="app-status-bar dark-bar">
          <span>15:30</span>
          <span className="app-bar-brand">KOUPA // الصالونات</span>
          <MapPin size={13} />
        </div>

        <div className="koupa-shop-card">
          <div className="shop-accent-stripe" />
          <div className="shop-details">
            <div className="shop-tag">{isArabic ? "صالون معتمد" : "Verified Shop"}</div>
            <h4>Studio 19 Barber</h4>
            <p className="shop-location">{isArabic ? "باب الواد، الجزائر العاصمة" : "Bab El Oued, Algiers"}</p>
            <div className="shop-features">
              <span>{isArabic ? "حلاقة عصرية" : "Modern Cut"}</span>
              <span>{isArabic ? "عناية باللحية" : "Beard Styling"}</span>
            </div>
          </div>
        </div>

        <div className="koupa-timeline">
          <span className="timeline-title">{isArabic ? "احجز كرسي الحلاقة" : "Reserve Chair"}</span>
          <div className="timeline-slots">
            <div className="time-btn taken">16:00 <small>{isArabic ? "محجوز" : "Booked"}</small></div>
            <div className="time-btn selected">17:00 <small>{isArabic ? "متاح" : "Open"}</small></div>
            <div className="time-btn">18:30 <small>{isArabic ? "متاح" : "Open"}</small></div>
          </div>
        </div>

        <div className="koupa-bottom-cta">
          <span>{isArabic ? "تأكيد المقعد (دج 800)" : "Reserve Chair (800 DZD)"}</span>
          <ArrowUpRight size={16} />
        </div>
      </div>
    </div>
  );
}

export function MasroofInteractivePreview({ isArabic }: { isArabic: boolean }) {
  return (
    <div className="preview-card-frame preview-masroof-frame">
      <div className="preview-app-shell masroof-shell">
        <div className="masroof-topbar">
          <span className="masroof-app-title">مصاريف · MASARIF</span>
          <span className="masroof-month">{isArabic ? "أوت 2026" : "August 2026"}</span>
        </div>

        <div className="balance-hero-widget">
          <span className="balance-label">{isArabic ? "الرصيد الصافي المتاح" : "Net Available Balance"}</span>
          <strong className="balance-amount">128,450 <small>دج</small></strong>
          <div className="balance-trend">
            <TrendingUp size={13} />
            <span>{isArabic ? "+14% ادخار هذا الشهر" : "+14% savings this month"}</span>
          </div>
        </div>

        <div className="savings-progress-widget">
          <div className="savings-head">
            <span>{isArabic ? "صندوق الطوارئ" : "Emergency Fund"}</span>
            <strong>75%</strong>
          </div>
          <div className="savings-bar-track">
            <motion.div 
              className="savings-bar-fill"
              initial={{ width: "0%" }}
              whileInView={{ width: "75%" }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="bills-list-widget">
          <div className="bill-item">
            <div className="bill-icon sonelgaz"><CreditCard size={14} /></div>
            <div className="bill-info">
              <strong>{isArabic ? "فاتورة سونلغاز" : "Sonelgaz Utility"}</strong>
              <small>{isArabic ? "مستحقة بعد 4 أيام" : "Due in 4 days"}</small>
            </div>
            <span className="bill-amount">3,400 دج</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LamsaInteractivePreview({ isArabic }: { isArabic: boolean }) {
  return (
    <div className="preview-card-frame preview-lamsa-frame">
      <div className="preview-app-shell green-shell">
        <div className="green-header">
          <span className="green-logo"><Sparkles size={16} /> {isArabic ? "لمسة" : "Lamsa"}</span>
          <span className="green-coverage">{isArabic ? "متاح اليوم" : "Open today"}</span>
        </div>

        <div className="green-map-card">
          <div className="map-grid-mesh" />
          <div className="map-badge">
            <MapPin size={14} />
            <span>{isArabic ? "صالون الورد، وهران" : "Salon El Ward, Oran"}</span>
          </div>
          <div className="map-stat-row">
            <div>
              <strong>14:30</strong>
              <small>{isArabic ? "أقرب وقت متاح" : "Next open time"}</small>
            </div>
            <div>
              <strong>{isArabic ? "3500 د.ج" : "3500 DZD"}</strong>
              <small>{isArabic ? "الدفع في الصالون" : "Pay at the salon"}</small>
            </div>
          </div>
        </div>

        <div className="green-action-strip">
          <span>{isArabic ? "تأكيد الحجز" : "Confirm booking"}</span>
          <ArrowUpRight size={16} />
        </div>
      </div>
    </div>
  );
}

export function NexusInteractivePreview({ isArabic }: { isArabic: boolean }) {
  return (
    <div className="preview-card-frame preview-nexus-frame">
      <div className="preview-app-shell green-shell">
        <div className="green-header">
          <span className="green-logo"><Network size={16} /> Nexus</span>
          <span className="green-coverage">{isArabic ? "بيئة الإنتاج" : "production"}</span>
        </div>

        <div className="green-map-card">
          <div className="map-grid-mesh" />
          <div className="map-badge">
            <CheckCircle2 size={14} />
            <span>{isArabic ? "الجلسة ← المشروع أ" : "Session → Project A"}</span>
          </div>
          <div className="map-stat-row">
            <div>
              <strong>Supabase A</strong>
              <small>{isArabic ? "تم التوجيه" : "Routed"}</small>
            </div>
            <div>
              <strong>Supabase B</strong>
              <small>{isArabic ? "مرفوض" : "Refused"}</small>
            </div>
          </div>
        </div>

        <div className="green-action-strip">
          <span>{isArabic ? "لا مفاتيح عند الوكيل" : "Agents never hold keys"}</span>
          <ArrowUpRight size={16} />
        </div>
      </div>
    </div>
  );
}
