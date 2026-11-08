import { type DesignSystem, type Page, type SlideMeta, type SlideTransition } from '@open-slide/core';
import { createContext, type ReactNode, useContext, useState } from 'react';
import aBase from './assets/a-base.png';
import aClap from './assets/a-clap.png';
import aPoint from './assets/a-point.png';
import aThink from './assets/a-think.png';

export const design: DesignSystem = {
  palette: { bg: '#F6EDD9', text: '#2A1E14', accent: '#B3122E' },
  fonts: {
    display: '"Aref Ruqaa", "Amiri", serif',
    body: '"Tajawal", "Segoe UI", Tahoma, sans-serif',
  },
  typeScale: { hero: 150, body: 36 },
  radius: 20,
};

const C = {
  red: '#B3122E',
  green: '#1F7A4D',
  gold: '#B8862B',
  sand: '#EBDDBE',
  card: '#FFFAEF',
  soft: '#6B5A45',
  edge: '#D9C49A',
};
const NASKH = '"Amiri", serif';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Aref+Ruqaa:wght@700&family=Tajawal:wght@500;700;800&display=swap';
const FONT_LINK_ID = 'osd-webfont-sifa-mushabbaha';
const STYLE_ID = 'osd-styles-sifa-mushabbaha';
const css = `
@keyframes sm-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
@keyframes sm-pop { 0% { transform: scale(.7); opacity: 0 } 100% { transform: scale(1); opacity: 1 } }
@keyframes sm-in { 0% { transform: scale(.92); opacity: 0 } 100% { transform: scale(1); opacity: 1 } }
.sm-bob { animation: sm-bob 5s ease-in-out infinite; }
.sm-pop { animation: sm-pop .28s cubic-bezier(.22,1,.36,1) both; }
.sm-in { animation: sm-in .3s cubic-bezier(.22,1,.36,1) both; }
.sm-btn { cursor: pointer; transition: filter .15s, transform .1s; }
.sm-btn:hover { filter: brightness(1.07); }
.sm-btn:active { transform: translateY(2px); }
[data-still] .sm-bob, [data-still] .sm-pop, [data-still] .sm-in { animation: none !important; }
@media (prefers-reduced-motion: reduce) { .sm-bob, .sm-pop, .sm-in { animation: none !important; } }
`;
if (typeof document !== 'undefined') {
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if (link.href !== FONT_HREF) link.href = FONT_HREF;
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  if (style.textContent !== css) style.textContent = css;
}

export const transition: SlideTransition = {
  duration: 240,
  enter: {
    duration: 240,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

// ── Shared frame: sand paper, Omani flag band, khanjar-style geometric border ──

function OmaniBand({ bottom }: { bottom?: boolean }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, [bottom ? 'bottom' : 'top']: 0 }}>
      <div style={{ display: 'flex', height: 14 }}>
        <div style={{ flex: 1, background: C.green }} />
        <div style={{ flex: 1, background: '#FFFFFF' }} />
        <div style={{ flex: 1, background: C.red }} />
      </div>
      <div
        style={{
          height: 22,
          background: `repeating-linear-gradient(45deg, transparent 0 10px, ${C.edge} 10px 12px), repeating-linear-gradient(-45deg, transparent 0 10px, ${C.edge} 10px 12px)`,
          opacity: 0.8,
        }}
      />
    </div>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <div
      dir="rtl"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--osd-font-body)',
        color: 'var(--osd-text)',
        background: `radial-gradient(ellipse at 30% 20%, #FBF4E4 0%, var(--osd-bg) 55%, ${C.sand} 100%)`,
      }}
    >
      <OmaniBand />
      <OmaniBand bottom />
      {children}
    </div>
  );
}

function Aisha({ src, height, style }: { src: string; height: number; style?: React.CSSProperties }) {
  return (
    <img
      src={src}
      alt="عائشة بنت راشد الريامية"
      className="sm-bob"
      style={{ position: 'absolute', height, filter: 'drop-shadow(0 18px 18px rgba(80,50,20,.22))', ...style }}
    />
  );
}

function Btn({ onClick, children, color = C.green }: { onClick: () => void; children: ReactNode; color?: string }) {
  return (
    <button
      className="sm-btn"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{
        fontFamily: 'var(--osd-font-body)',
        fontWeight: 800,
        fontSize: 30,
        color: '#fff',
        background: color,
        border: 'none',
        borderRadius: 999,
        padding: '14px 40px',
        boxShadow: '0 6px 0 rgba(0,0,0,.18)',
      }}
    >
      {children}
    </button>
  );
}

// ── 1. Cover ──
const Cover: Page = () => (
  <Frame>
    <Aisha src={aBase} height={900} style={{ left: 170, bottom: 60 }} />
    <div style={{ position: 'absolute', right: 160, top: 250, width: 1050 }}>
      <div style={{ fontSize: 34, fontWeight: 800, color: C.red, letterSpacing: 2 }}>نشاط تفاعلي · الصرف</div>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          color: C.green,
          margin: '24px 0 10px',
          lineHeight: 1.25,
        }}
      >
        الصفة المشبّهة
      </h1>
      <div style={{ width: 260, height: 6, background: C.gold, borderRadius: 3, margin: '10px 0 40px' }} />
      <p style={{ fontSize: 44, lineHeight: 1.6, margin: 0, color: C.soft, fontWeight: 500 }}>
        مع العالمة العُمانية
        <br />
        <b style={{ color: 'var(--osd-text)', fontFamily: NASKH, fontSize: 56 }}>عائشة بنت راشد الريامية</b>
      </p>
    </div>
  </Frame>
);

// ── 2. Intro ──
const Intro: Page = () => (
  <Frame>
    <Aisha src={aPoint} height={860} style={{ left: 80, bottom: 70 }} />
    <div
      style={{
        position: 'absolute',
        right: 150,
        top: 170,
        width: 1080,
        background: C.card,
        border: `3px solid ${C.edge}`,
        borderRadius: 36,
        padding: '48px 60px',
        boxShadow: '0 14px 30px rgba(80,50,20,.12)',
      }}
    >
      <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 64, color: C.red, marginBottom: 20 }}>
        مرحبًا يا طالباتي!
      </div>
      <p style={{ fontSize: 38, lineHeight: 1.75, margin: 0 }}>
        أنا <b>عائشة بنت راشد الريامية</b>، فقيهة من <b>بهلا</b>، عشتُ بين القرنين الحادي عشر والثاني عشر
        الهجريين. سأحكي لكنّ سيرتي في فقرة قصيرة، وفيها صفاتٌ مشبّهة مخبّأة!
      </p>
    </div>
    <div
      style={{
        position: 'absolute',
        right: 150,
        top: 620,
        width: 1080,
        background: C.green,
        color: '#fff',
        borderRadius: 28,
        padding: '36px 56px',
      }}
    >
      <div style={{ fontSize: 30, fontWeight: 800, opacity: 0.85, marginBottom: 10 }}>المطلوب</div>
      <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.5 }}>
        استخرجي الصفة المشبّهة، ثم اكتبي وزنها.
      </div>
      <div style={{ fontSize: 30, marginTop: 14, opacity: 0.9 }}>اضغطي على الكلمة لتظهر الإجابة.</div>
    </div>
  </Frame>
);

// ── 3. The paragraph — click a word to reveal its weight ──

const Found = createContext<{ shown: Set<string>; toggle: (id: string) => void }>({
  shown: new Set(),
  toggle: () => {},
});

// A word in the paragraph; clicking it highlights it and pops its weight underneath.
function W({ id, children, wazn }: { id: string; children: ReactNode; wazn: string }) {
  const { shown, toggle } = useContext(Found);
  const on = shown.has(id);
  return (
    <span
      data-osd-interactive
      role="button"
      onClick={(e) => { e.stopPropagation(); toggle(id); }}
      style={{
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer',
        padding: '0 6px',
        borderRadius: 12,
        background: on ? 'rgba(179,18,46,.12)' : 'transparent',
        color: on ? C.red : 'inherit',
        fontWeight: on ? 700 : 400,
        boxShadow: on ? `inset 0 -4px 0 ${C.red}` : 'none',
        transition: 'background .2s, color .2s',
      }}
    >
      {children}
      {on && (
        <span
          className="sm-pop"
          style={{
            display: 'inline-block',
            verticalAlign: 'middle',
            marginInlineStart: 10,
            whiteSpace: 'nowrap',
            fontSize: 32,
            lineHeight: 1.3,
            fontFamily: NASKH,
            fontWeight: 700,
            color: '#fff',
            background: C.green,
            borderRadius: 999,
            padding: '2px 18px 6px',
          }}
        >
          {wazn}
        </span>
      )}
    </span>
  );
}

const ALL = ['faqiha', 'zama', 'fatina', 'razina', 'samh', 'hasan', 'shuja', 'bayda', 'hulwa', 'tayyib'];

const Paragraph: Page = () => {
  const [shown, setShown] = useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setShown((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  const done = shown.size === ALL.length;
  return (
    <Frame>
      <Found.Provider value={{ shown, toggle }}>
        <div style={{ position: 'absolute', right: 130, top: 70, left: 470 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 28 }}>
            <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 66, color: C.green, margin: 0 }}>
              استخرجي الصفة المشبّهة ووزنها
            </h2>
            <span style={{ fontSize: 30, fontWeight: 800, color: C.red }}>
              {shown.size.toLocaleString('ar-EG')} / {ALL.length.toLocaleString('ar-EG')}
            </span>
          </div>
          <div
            style={{
              marginTop: 26,
              background: C.card,
              border: `3px solid ${C.edge}`,
              borderRadius: 30,
              padding: '26px 48px 44px',
              fontFamily: NASKH,
              fontSize: 40,
              lineHeight: 2.35,
              textAlign: 'justify',
              boxShadow: '0 14px 30px rgba(80,50,20,.10)',
            }}
          >
            عاشت عائشة بنت راشد الريامية بين القرنين الحادي عشر والثاني عشر الهجريين، وكانت{' '}
            <W id="faqiha" wazn="فَعِيلَة">فَقِيهَةً</W> تُسأل فتُفتي. كانت <W id="zama" wazn="فَعْلَى">ظَمْأَى</W>{' '}
            إلى العلم لا ترتوي منه، <W id="fatina" wazn="فَعِلَة">فَطِنَةً</W> في فهم المسائل،{' '}
            <W id="razina" wazn="فَعِيلَة">رَزِينَةَ</W> الرأي إذا حكمت. وقفت مكتبتها على طلبة العلم، فكانت{' '}
            <W id="samh" wazn="فَعْل">سَمْحٌ</W> قلبها <W id="hasan" wazn="فَعَل">حَسَنٌ</W> صنعها. وحين أيّدت
            بفتواها الإمام بلعرب بن سلطان بدت <W id="shuja" wazn="فُعَالَة">شُجَاعَةً</W> في قول ما تراه حقًّا.
            وعاشت <W id="bayda" wazn="فَعْلَاء">بَيْضَاءَ</W> السيرة، <W id="hulwa" wazn="فُعْلَة">حُلْوَةَ</W>{' '}
            الحديث مع تلاميذها، وبقي ذكرها <W id="tayyib" wazn="فَيْعِل">طَيِّبَ</W> الأثر في بهلا.
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 30 }}>
            <Btn onClick={() => setShown(new Set(ALL))}>أظهري كل الإجابات</Btn>
            <Btn color={C.soft} onClick={() => setShown(new Set())}>
              إخفاء
            </Btn>
          </div>
        </div>
      </Found.Provider>
      <Aisha src={done ? aClap : aThink} height={760} style={{ left: 40, bottom: 60 }} />
      <div
        className="sm-in"
        key={done ? 'd' : 't'}
        style={{
          position: 'absolute',
          left: 70,
          top: 90,
          width: 340,
          background: '#fff',
          border: `3px solid ${done ? C.green : C.edge}`,
          borderRadius: 26,
          padding: '18px 24px',
          fontSize: 30,
          fontWeight: 700,
          lineHeight: 1.45,
          color: done ? C.green : C.soft,
        }}
      >
        {done ? 'أحسنتنّ! عشر صفاتٍ مشبّهة 🌟' : 'ابحثي عن الصفات… كم صفةً في سيرتي؟'}
      </div>
    </Frame>
  );
};

// ── 4. Answer cards — flip to check ──

function Card({ word, base, wazn }: { word: string; base: string; wazn: string }) {
  const [open, setOpen] = useState(false);
  const { shown } = useContext(Found);
  const on = open || shown.has('all');
  return (
    <div
      className="sm-btn"
      data-osd-interactive
      role="button"
      onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
      style={{
        height: 250,
        borderRadius: 26,
        border: `3px solid ${on ? C.green : C.edge}`,
        background: on ? '#EAF4EE' : C.card,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        boxShadow: '0 8px 18px rgba(80,50,20,.10)',
      }}
    >
      <div style={{ fontFamily: NASKH, fontWeight: 700, fontSize: 56, color: C.red }}>{word}</div>
      {on ? (
        <div className="sm-in" style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: NASKH, fontWeight: 700, fontSize: 44, color: C.green }}>{wazn}</div>
          <div style={{ fontSize: 24, color: C.soft }}>من: {base}</div>
        </div>
      ) : (
        <div style={{ fontSize: 26, color: C.soft, fontWeight: 700 }}>اضغطي لمعرفة الوزن</div>
      )}
    </div>
  );
}

const Answers: Page = () => {
  const [all, setAll] = useState(false);
  return (
    <Frame>
      <Found.Provider value={{ shown: new Set(all ? ['all'] : []), toggle: () => {} }}>
        <div style={{ position: 'absolute', right: 130, left: 130, top: 80 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 70, color: C.green, margin: 0 }}>
              تحقّقي من إجاباتك
            </h2>
            <Btn onClick={() => setAll(!all)}>{all ? 'إخفاء الكل' : 'أظهري الكل'}</Btn>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 32,
              marginTop: 60,
            }}
          >
            <Card word="فَقِيهَة" base="فَقِيه" wazn="فَعِيلَة" />
            <Card word="ظَمْأَى" base="ظَمْآن" wazn="فَعْلَى" />
            <Card word="فَطِنَة" base="فَطِن" wazn="فَعِلَة" />
            <Card word="رَزِينَة" base="رَزِين" wazn="فَعِيلَة" />
            <Card word="سَمْحٌ" base="سَمُحَ" wazn="فَعْل" />
            <Card word="حَسَنٌ" base="حَسُنَ" wazn="فَعَل" />
            <Card word="شُجَاعَة" base="شُجَاع" wazn="فُعَالَة" />
            <Card word="بَيْضَاء" base="أَبْيَض" wazn="فَعْلَاء" />
            <Card word="حُلْوَة" base="حُلْو" wazn="فُعْلَة" />
            <Card word="طَيِّب" base="طَابَ" wazn="فَيْعِل" />
          </div>
          <div style={{ marginTop: 56, fontSize: 32, color: C.soft, textAlign: 'center' }}>
            الصفة المشبّهة تدلّ على صفةٍ <b style={{ color: C.red }}>ثابتة</b> في صاحبها، وتُصاغ غالبًا من الفعل
            الثلاثي اللازم.
          </div>
        </div>
      </Found.Provider>
    </Frame>
  );
};

// ── 5. Closing ──
const Closing: Page = () => (
  <Frame>
    <Aisha src={aClap} height={880} style={{ left: 200, bottom: 70 }} />
    <div style={{ position: 'absolute', right: 180, top: 300, width: 1000 }}>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 150,
          color: C.red,
          margin: 0,
          lineHeight: 1.25,
        }}
      >
        أحسنتنّ!
      </h1>
      <p style={{ fontSize: 44, lineHeight: 1.7, color: C.soft, marginTop: 30 }}>
        كونيّ مثل عائشة الريامية:
        <br />
        <b style={{ color: C.green }}>ظَمْأَى إلى العلم، فَطِنَةً، طَيِّبَةَ الأثر.</b>
      </p>
    </div>
  </Frame>
);

export const meta: SlideMeta = {
  title: 'الصفة المشبّهة مع عائشة الريامية',
  createdAt: '2026-11-08T13:02:50.255Z',
};

export default [Cover, Intro, Paragraph, Answers, Closing] satisfies Page[];
