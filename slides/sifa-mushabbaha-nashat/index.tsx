import { type DesignSystem, type Page, type SlideMeta } from '@open-slide/core';
import { type CSSProperties, useState } from 'react';
import sansRegular from './assets/fonts/thmanyahsans-Regular.woff2';
import sansBold from './assets/fonts/thmanyahsans-Bold.woff2';

export const design: DesignSystem = {
  palette: { bg: '#FBF3E2', text: '#1F2A5C', accent: '#C0392B' },
  fonts: { display: '"Thmanyah Sans", sans-serif', body: '"Thmanyah Sans", sans-serif' },
  typeScale: { hero: 72, body: 30 },
  radius: 20,
};

const C = {
  bg: '#FBF3E2',
  card: '#FFFDF7',
  navy: '#1F2A5C',
  red: '#B8432F',
  head: '#EFDFC0',
  line: '#D9C7A3',
  green: '#1E7A4F',
  greenBg: '#E3F4EA',
};

const fontCss = `
@font-face{font-family:"Thmanyah Sans";src:url(${sansRegular}) format("woff2");font-weight:400}
@font-face{font-family:"Thmanyah Sans";src:url(${sansBold}) format("woff2");font-weight:700}
.sm-reveal{cursor:pointer;transition:background .25s,color .25s,border-color .25s}
.sm-reveal:hover{border-color:${C.red}}
`;

const Quran = '"Amiri Quran", "Amiri", "Traditional Arabic", serif';

function Reveal({ answer, hint = 'اضغطي لإظهار الإجابة', style }: { answer: string; hint?: string; style?: CSSProperties }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="sm-reveal"
      onClick={(e) => {
        e.stopPropagation();
        setOpen((v) => !v);
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        border: `2px dashed ${open ? C.green : C.line}`,
        background: open ? C.greenBg : 'transparent',
        color: open ? C.green : '#A8977A',
        fontWeight: open ? 700 : 400,
        fontSize: open ? 36 : 22,
        minHeight: 70,
        padding: '6px 16px',
        userSelect: 'none',
        ...style,
      }}
    >
      {open ? answer : hint}
    </div>
  );
}

const ayat = [
  { text: 'وَخُلِقَ الْإِنسَانُ ضَعِيفًا', ref: 'النساء: ٢٨', sifa: 'ضَعِيف', wazn: 'فَعِيل' },
  { text: 'فَإِذَا هِيَ بَيْضَاءُ لِلنَّاظِرِينَ', ref: 'الأعراف: ١٠٨', sifa: 'بَيْضَاء', wazn: 'فَعْلاء' },
  { text: 'كَسَرَابٍ بِقِيعَةٍ يَحْسَبُهُ الظَّمْآنُ مَاءً', ref: 'النور: ٣٩', sifa: 'الظَّمْآن', wazn: 'فَعْلان' },
];

const afal = [
  { f: 'نَبُلَ', a: 'نَبِيل' },
  { f: 'رَزُنَ', a: 'رَزِين' },
  { f: 'حَمِقَ', a: 'أَحْمَق' },
];

const Q = ({ n, children }: { n: string; children: string }) => (
  <div style={{ color: C.red, fontSize: 32, fontWeight: 700, margin: '0 0 16px' }}>
    {n}. {children}
  </div>
);

const Activity: Page = () => (
  <div
    dir="rtl"
    style={{
      width: 1920,
      height: 1080,
      background: C.bg,
      fontFamily: '"Thmanyah Sans", sans-serif',
      color: C.navy,
      padding: '48px 90px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <style>{fontCss}</style>

    <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 28 }}>
      <span style={{ background: C.navy, color: '#fff', fontSize: 28, fontWeight: 700, padding: '8px 28px', borderRadius: 999 }}>
        نشاط ختامي
      </span>
      <h1 style={{ margin: 0, fontSize: 72, fontWeight: 700 }}>الصفة المشبهة</h1>
      <span style={{ marginInlineStart: 'auto', fontSize: 24, color: '#8A7A5E' }}>اضغطي على أي مربع لإظهار الإجابة</span>
    </div>

    <Q n="١">استخرجي الصفة المشبهة من كل آية مما يأتي، ثم اكتبي وزنها:</Q>
    <div style={{ border: `2px solid ${C.line}`, borderRadius: 20, overflow: 'hidden', background: C.card, marginBottom: 34 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px 360px', background: C.head, fontSize: 28, fontWeight: 700, textAlign: 'center' }}>
        <div style={{ padding: 12 }}>الآية</div>
        <div style={{ padding: 12 }}>الصفة المشبهة</div>
        <div style={{ padding: 12 }}>وزنها</div>
      </div>
      {ayat.map((a) => (
        <div key={a.ref} style={{ display: 'grid', gridTemplateColumns: '1fr 360px 360px', borderTop: `2px solid ${C.line}`, alignItems: 'center' }}>
          <div style={{ padding: '10px 30px', fontFamily: Quran, fontSize: 44 }}>
            ﴿{a.text}﴾ <span style={{ fontFamily: '"Thmanyah Sans"', fontSize: 22, color: '#8A7A5E' }}>({a.ref})</span>
          </div>
          <Reveal answer={a.sifa} style={{ margin: 10 }} />
          <Reveal answer={a.wazn} style={{ margin: 10 }} />
        </div>
      ))}
    </div>

    <Q n="٢">صوغي صفةً مشبهةً من كل فعل من الأفعال الآتية:</Q>
    <div style={{ display: 'flex', gap: 48, marginBottom: 34 }}>
      {afal.map((x) => (
        <div key={x.f} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ background: C.head, border: `2px solid ${C.line}`, borderRadius: 16, padding: '8px 30px', fontSize: 40, fontWeight: 700 }}>
            {x.f}
          </span>
          <span style={{ fontSize: 36, color: C.red }}>←</span>
          <Reveal answer={x.a} style={{ flex: 1 }} />
        </div>
      ))}
    </div>

    <Q n="٣">كوِّني جملةً من إنشائك تعبِّرين فيها عن قيمة الانتماء للوطن، مستخدمةً صفةً مشبهة:</Q>
    <Reveal
      hint="اضغطي لإظهار نموذج إجابة"
      answer="حبُّ الوطنِ شعورٌ نبيلٌ، والمواطنُ الكريمُ وفيٌّ لأرضه."
      style={{ fontSize: 34, minHeight: 90 }}
    />
  </div>
);

export const meta: SlideMeta = {
  title: 'نشاط ختامي: الصفة المشبهة',
  createdAt: '2026-11-08T13:00:00.000Z',
};

export const notes = [
  'اطلبي من الطالبات الإجابة شفهيًا أولًا، ثم اضغطي على المربع لإظهار الإجابة. السؤال الثالث إجابته نموذجية، وتُقبل أي جملة صحيحة فيها صفة مشبهة.',
];

export default [Activity] satisfies Page[];
