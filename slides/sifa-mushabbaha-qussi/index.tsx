import { type DesignSystem, type Page, type SlideMeta } from '@open-slide/core';
import sansRegular from './assets/fonts/thmanyahsans-Regular.woff2';
import sansBold from './assets/fonts/thmanyahsans-Bold.woff2';

export const design: DesignSystem = {
  palette: { bg: '#FFFFFF', text: '#2B3369', accent: '#E0A21B' },
  fonts: { display: '"Thmanyah Sans", sans-serif', body: '"Thmanyah Sans", sans-serif' },
  typeScale: { hero: 96, body: 28 },
  radius: 14,
};

const C = {
  bg: '#FFFFFF',
  navy: '#2B3369',
  gold: '#E0A21B',
  grey: '#6B6F80',
  dash: '#9A9DAA',
  rule: '#D9C7A3',
  cream: '#FBF5E6',
};

const fontCss = `
@font-face{font-family:"Thmanyah Sans";src:url(${sansRegular}) format("woff2");font-weight:400}
@font-face{font-family:"Thmanyah Sans";src:url(${sansBold}) format("woff2");font-weight:700}
`;

const Quran = '"Amiri Quran", "Amiri", "Traditional Arabic", serif';
const Display = '"Aref Ruqaa", "Amiri", "Traditional Arabic", serif';

type Item = { n: string; text: string; quran: boolean };

const page1: Item[] = [
  { n: '١', text: 'وَلَمَّا رَجَعَ مُوسَىٰ إِلَىٰ قَوْمِهِ غَضْبَانَ أَسِفًا', quran: true },
  { n: '٢', text: 'إِنَّهُ لَفَرِحٌ فَخُورٌ', quran: true },
  { n: '٣', text: 'فَهُوَ فِي الْآخِرَةِ أَعْمَىٰ', quran: true },
  { n: '٤', text: 'إِنَّهَا بَقَرَةٌ صَفْرَاءُ فَاقِعٌ لَوْنُهَا', quran: true },
  { n: '٥', text: 'وَفَدَيْنَاهُ بِذِبْحٍ عَظِيمٍ', quran: true },
  { n: '٦', text: 'وَأَبُونَا شَيْخٌ كَبِيرٌ', quran: true },
];

const page2: Item[] = [
  { n: '٧', text: 'أَلَمْ يَعِدْكُمْ رَبُّكُمْ وَعْدًا حَسَنًا', quran: true },
  { n: '٨', text: 'هَٰذَا عَذْبٌ فُرَاتٌ', quran: true },
  { n: '٩', text: 'وَهَٰذَا مِلْحٌ أُجَاجٌ', quran: true },
  { n: '١٠', text: 'وَلَا عَلَى الْأَعْرَجِ حَرَجٌ', quran: true },
  { n: '١١', text: 'وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا', quran: false },
  { n: '١٢', text: 'شُجَاعُ العَزْمِ، مِقْدَامٌ، كَثِيرُ البَذْلِ', quran: false },
];

const Scissors = ({ side }: { side: 'right' | 'left' }) => (
  <span style={{ position: 'absolute', top: 10, [side]: -16, fontSize: 30, color: C.navy, background: C.bg, lineHeight: 1 }}>✂</span>
);

const Lines = ({ count }: { count: number }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 50 }}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{ borderBottom: `2px solid ${C.rule}` }} />
    ))}
  </div>
);

const Strip = ({ item, last }: { item: Item; last: boolean }) => (
  <div
    style={{
      position: 'relative',
      flex: 1,
      borderInlineStart: last ? `2px dashed ${C.dash}` : 'none',
      borderInlineEnd: `2px dashed ${C.dash}`,
      padding: '26px 24px 20px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Scissors side="right" />
    {last && <Scissors side="left" />}
    <div
      style={{
        alignSelf: 'center',
        width: 60,
        height: 60,
        borderRadius: '50%',
        background: C.navy,
        color: '#fff',
        fontWeight: 700,
        fontSize: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {item.n}
    </div>
    <div
      style={{
        height: 230,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: Quran,
        fontSize: 40,
        lineHeight: 1.7,
        color: C.navy,
      }}
    >
      {item.quran ? `﴿${item.text}﴾` : `«${item.text}»`}
    </div>
    <div style={{ fontSize: 24, fontWeight: 700, color: C.grey }}>الصفة المشبهة</div>
    <Lines count={2} />
    <div style={{ fontSize: 24, fontWeight: 700, color: C.grey, marginTop: 40 }}>وزنها</div>
    <Lines count={2} />
  </div>
);

const Sheet = ({ items, sheet }: { items: Item[]; sheet: string }) => (
  <div
    dir="rtl"
    style={{
      width: 1920,
      height: 1080,
      background: C.bg,
      fontFamily: '"Thmanyah Sans", sans-serif',
      color: C.navy,
      padding: '36px 70px 24px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <style>{fontCss}</style>

    <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: 18, borderBottom: `5px solid ${C.navy}` }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
        <span style={{ background: C.gold, color: '#fff', fontWeight: 700, fontSize: 24, padding: '6px 20px', borderRadius: 12 }}>
          نشاط ورقي · الورقة {sheet}
        </span>
        <h1 style={{ margin: 0, fontFamily: Display, fontSize: 96, lineHeight: 1.1, fontWeight: 700 }}>اقصّي واكتبي</h1>
      </div>
      <ol style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 27, lineHeight: 1.75, color: C.grey, textAlign: 'right' }}>
        <li>
          <b style={{ color: C.navy }}>١.</b> قصّي شريطًا <b style={{ color: C.navy }}>واحدًا فقط</b> على الخط المتقطّع ✂
        </li>
        <li>
          <b style={{ color: C.navy }}>٢.</b> استخرجي <b style={{ color: C.navy }}>الصفة المشبهة</b> من المثال
        </li>
        <li>
          <b style={{ color: C.navy }}>٣.</b> اكتبي <b style={{ color: C.navy }}>وزنها</b> الصرفي
        </li>
      </ol>
    </header>

    <div style={{ flex: 1, display: 'flex', marginTop: 24, borderTop: `2px dashed ${C.dash}`, borderBottom: `2px dashed ${C.dash}` }}>
      {items.map((it, i) => (
        <Strip key={it.n} item={it} last={i === items.length - 1} />
      ))}
    </div>

    <footer style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, color: C.grey, marginTop: 14 }}>
      <span>الصرف: الصفة المشبهة · أ. أسماء الحارثية</span>
      <span>مدرسة سمية للتعليم ما بعد الأساسي (١٠–١٢)</span>
    </footer>
  </div>
);

const Sheet1: Page = () => <Sheet items={page1} sheet="١" />;
const Sheet2: Page = () => <Sheet items={page2} sheet="٢" />;

export const meta: SlideMeta = {
  title: 'اقصّي واكتبي: الصفة المشبهة',
  createdAt: '2026-11-08T15:00:00.000Z',
};

export const notes = [
  'الإجابات: ١ غَضْبان (فَعْلان) وأَسِف (فَعِل) · ٢ فَرِح (فَعِل) · ٣ أَعْمى (أَفْعَل) · ٤ صَفْراء (فَعْلاء) · ٥ عَظِيم (فَعِيل) · ٦ شَيْخ (فَعْل) وكَبِير (فَعِيل).',
  'الإجابات: ٧ حَسَن (فَعَل) · ٨ عَذْب (فَعْل) وفُرات (فُعَال) · ٩ مِلْح (فِعْل) وأُجاج (فُعَال) · ١٠ الأَعْرَج (أَفْعَل) · ١١ سَهْل (فَعْل) · ١٢ شُجاع (فُعَال). يُقبل استخراج أي صفة صحيحة من المثال.',
];

export default [Sheet1, Sheet2] satisfies Page[];
