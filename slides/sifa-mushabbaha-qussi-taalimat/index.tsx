import { type DesignSystem, type Page, type SlideMeta } from '@open-slide/core';
import { useEffect, useState } from 'react';
import sansRegular from './assets/fonts/thmanyahsans-Regular.woff2';
import sansBold from './assets/fonts/thmanyahsans-Bold.woff2';

export const design: DesignSystem = {
  palette: { bg: '#FFFFFF', text: '#2B3369', accent: '#E0A21B' },
  fonts: { display: '"Thmanyah Sans", sans-serif', body: '"Thmanyah Sans", sans-serif' },
  typeScale: { hero: 110, body: 40 },
  radius: 20,
};

const C = {
  navy: '#2B3369',
  gold: '#E0A21B',
  grey: '#6B6F80',
  cream: '#FBF5E6',
  rule: '#E6DCC4',
  red: '#B8432F',
};

const fontCss = `
@font-face{font-family:"Thmanyah Sans";src:url(${sansRegular}) format("woff2");font-weight:400}
@font-face{font-family:"Thmanyah Sans";src:url(${sansBold}) format("woff2");font-weight:700}
.qt-btn{cursor:pointer;border:none;font-family:inherit;font-weight:700;font-size:30px;border-radius:999px;padding:14px 40px;transition:transform .15s,opacity .15s}
.qt-btn:hover{transform:translateY(-2px)}
@keyframes qt-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
`;

const TOTAL = 180;
const ar = (n: number | string) => String(n).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[+d]);

function Timer() {
  const [left, setLeft] = useState(TOTAL);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const done = left === 0;
  const R = 230;
  const circ = 2 * Math.PI * R;
  const color = done ? C.red : left <= 30 ? C.gold : C.navy;
  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, '0');
  const stop = (e: { stopPropagation: () => void }) => e.stopPropagation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
      <div style={{ position: 'relative', width: 540, height: 540, animation: done ? 'qt-pulse 1s infinite' : 'none' }}>
        <svg width={540} height={540} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={270} cy={270} r={R} fill={C.cream} stroke={C.rule} strokeWidth={26} />
          <circle
            cx={270}
            cy={270}
            r={R}
            fill="none"
            stroke={color}
            strokeWidth={26}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - left / TOTAL)}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke .3s' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div dir="ltr" style={{ fontSize: 150, fontWeight: 700, color, lineHeight: 1 }}>
            {ar(mm)}:{ar(ss)}
          </div>
          <div style={{ fontSize: 32, color: C.grey, marginTop: 14 }}>{done ? 'انتهى الوقت!' : 'دقائق'}</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 20 }} onClick={stop}>
        <button
          className="qt-btn"
          style={{ background: C.navy, color: '#fff' }}
          onClick={(e) => {
            stop(e);
            if (done) setLeft(TOTAL);
            setRunning((r) => !r || done);
          }}
        >
          {running ? 'إيقاف مؤقت' : left === TOTAL ? 'ابدئي ▶' : done ? 'من جديد' : 'استئناف'}
        </button>
        <button
          className="qt-btn"
          style={{ background: C.cream, color: C.navy, border: `2px solid ${C.rule}` }}
          onClick={(e) => {
            stop(e);
            setRunning(false);
            setLeft(TOTAL);
          }}
        >
          إعادة ↺
        </button>
      </div>
    </div>
  );
}

const steps = [
  { t: 'اختاري شريطًا', d: 'قصّي شريطًا واحدًا فقط على الخط المتقطّع ✂' },
  { t: 'اقرئي المثال', d: 'اقرئي الآية أو القول المكتوب في الشريط بتمعّن' },
  { t: 'استخرجي الصفة', d: 'حدّدي الصفة المشبهة واكتبيها في مكانها' },
  { t: 'زِني الصفة', d: 'اكتبي وزنها الصرفي (فَعِيل، فَعْلان، أَفْعَل…)' },
  { t: 'شاركي', d: 'عند انتهاء الوقت: اقرئي إجابتك على زميلاتك' },
];

const Instructions: Page = () => (
  <div
    dir="rtl"
    style={{
      width: 1920,
      height: 1080,
      background: '#FFFFFF',
      fontFamily: '"Thmanyah Sans", sans-serif',
      color: C.navy,
      padding: '56px 90px 40px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <style>{fontCss}</style>
    <header style={{ display: 'flex', alignItems: 'flex-end', gap: 30, paddingBottom: 20, borderBottom: `5px solid ${C.navy}` }}>
      <h1 style={{ margin: 0, fontFamily: '"Aref Ruqaa", "Amiri", serif', fontSize: 110, lineHeight: 1.05 }}>اقصّي واكتبي</h1>
      <span style={{ background: C.gold, color: '#fff', fontWeight: 700, fontSize: 30, padding: '8px 26px', borderRadius: 14, marginBottom: 18 }}>
        تعليمات النشاط · الصفة المشبهة
      </span>
    </header>

    <div style={{ flex: 1, display: 'flex', gap: 80, alignItems: 'center' }}>
      <ol style={{ flex: 1, margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 26 }}>
        {steps.map((s, i) => (
          <li key={s.t} style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <span
              style={{
                flex: 'none',
                width: 76,
                height: 76,
                borderRadius: '50%',
                background: C.navy,
                color: '#fff',
                fontWeight: 700,
                fontSize: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {ar(i + 1)}
            </span>
            <div>
              <div style={{ fontSize: 42, fontWeight: 700 }}>{s.t}</div>
              <div style={{ fontSize: 30, color: C.grey, marginTop: 4 }}>{s.d}</div>
            </div>
          </li>
        ))}
      </ol>
      <Timer />
    </div>

    <footer style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: C.grey }}>
      <span>الصرف: الصفة المشبهة · أ. أسماء الحارثية</span>
      <span>مدرسة سمية للتعليم ما بعد الأساسي (١٠–١٢)</span>
    </footer>
  </div>
);

export const meta: SlideMeta = {
  title: 'تعليمات نشاط اقصّي واكتبي',
  createdAt: '2026-11-08T15:05:00.000Z',
};

export const notes = [
  'وزّعي أوراق النشاط، واشرحي الخطوات الخمس، ثم اضغطي «ابدئي» لتشغيل المؤقت (٣ دقائق). يتحوّل المؤقت إلى الأصفر في آخر ٣٠ ثانية وإلى الأحمر عند الانتهاء.',
];

export default [Instructions] satisfies Page[];
