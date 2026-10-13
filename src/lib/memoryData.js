export const CARD_BACK_LOGO = 'https://media.base44.com/images/public/user_6885e537f90714e91be36212/a30038da1_logo.png';

const LOGO_BASE = 'https://media.base44.com/images/public/6a40cacdaf5a6e5cd59dda94';

export const MEMORY_PAIRS = [
  { id: 1, name: 'מחוז ירושלים והמרכז', description: 'אנחנו המחוז האחראי על עיר הבירה, מוסדות השלטון והריכוז האוכלוסייה הגדול ביותר בישראל', emoji: '🏛️', logoUrl: `${LOGO_BASE}/d615c42e1_.jpg`, color: '#F48C4F' },
  { id: 2, name: 'מחוז צפון', description: 'אנחנו המחוז שמגן על גבולות הצפון והגליל, ומאופיינים בריבוי תרבויות, יישובים ומגוון מגזרים', emoji: '🏔️', logoUrl: `${LOGO_BASE}/9d9752418_MahozZafon.png`, color: '#39B07C' },
  { id: 3, name: 'מחוז דן', description: 'אנחנו המחוז האחראי על המרכז הכלכלי, האוכלוסייה הצפופה ביותר והעורף האסטרטגי של המדינה', emoji: '🏙️', logoUrl: `${LOGO_BASE}/e725687ef_MahozDan.png`, color: '#EB5D6D' },
  { id: 4, name: 'הסוכנות היהודית', description: 'אנחנו הארגון המשמש כגשר בין מדינת ישראל לתפוצות, ומקדמים עלייה, חינוך וזהות יהודית ברחבי העולם', emoji: '🌍', logoUrl: `${LOGO_BASE}/a92b307bb_Copyof.png`, color: '#F6C64F' },
  { id: 5, name: 'המועצה הישראלית להתנדבות', description: 'אנחנו הבית המקצועי שבונה את רשת ההתנדבות הלאומית ומייעצים לממשלה בנושא', emoji: '🤝', logoUrl: `${LOGO_BASE}/1fd818f11_Copyof.png`, color: '#E8521A' },
  { id: 6, name: 'פורום כלכלי חברתי', description: 'אנחנו הזרוע שמחברת בין העסקים הגדולים לרווחה החברתית ולמצב החירום במדינה', emoji: '💼', logoUrl: `${LOGO_BASE}/5470d72d1_Copyof.png`, color: '#D4445C' },
  { id: 7, name: 'איחוד הצלה', description: 'אנחנו רשת של אלפי מתנדבים בפריסה ארצית שמגיעים להציל חיים בדקות הקריטיות', emoji: '🚑', logoUrl: `${LOGO_BASE}/183991e5b_Copyof.png`, color: '#F48C4F' },
  { id: 8, name: 'מד"א', description: 'אנחנו ארגון ההצלה הלאומי האחראי על רפואת החירום, פינוי נפגעים, בנק הדם הלאומי והכשרת עזרה ראשונה', emoji: '🎗️', logoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Logo_Magen_David_Adom.svg', color: '#EB5D6D' },
  { id: 9, name: 'רח"ל', description: 'אנחנו גוף המטה של משרד הביטחון המסנכרן את משרדי הממשלה להבטחת רציפות תפקודית בעורף', emoji: '🔄', logoUrl: `${LOGO_BASE}/bc9880765_--.png`, color: '#39B07C' },
  { id: 10, name: 'פיקוד העורף', description: 'אנחנו הפיקוד הצבאי האחראי על הגנת האוכלוסייה האזרחית, המיגון והנחיות מצילת החיים בחירום', emoji: '🚨', logoUrl: `${LOGO_BASE}/e4854e462_Bahad16.png`, color: '#E8521A' },
  { id: 11, name: 'מחלקת מיגון של פיקוד העורף', description: 'אנחנו הגוף המקצועי שקובע את תקני המקלטים, הממ"דים וטכנולוגיות המיגון של אזרחי ישראל', emoji: '🛡️', logoUrl: `${LOGO_BASE}/8afff51b0_.jpeg`, color: '#F6C64F' },
  { id: 12, name: 'המכללה', description: 'אנחנו מרכז ההכשרה הלאומי המאמן את הרשויות ומשרדי הממשלה לניהול משברים', emoji: '🎓', logoUrl: `${LOGO_BASE}/1a7ebddd0_.png`, color: '#D4445C' },
  { id: 13, name: 'משטרת ישראל', description: 'אנחנו הגוף האחראי על ביטחון הפנים, אכיפת החוק, הסדר הציבורי ולחימה בפשיעה', emoji: '👮', logoUrl: `${LOGO_BASE}/efee88224_Emblem_of_Israel_Police_Bluesvg.png`, color: '#39B07C' },
  { id: 14, name: 'כבאות והצלה', description: 'אנחנו מערך החירום הלאומי להשתלטות על שריפות, טיפול בחומרים מסוכנים והצלת חיים במפגעים יומיומיים', emoji: '🔥', logoUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/Israel_Fire_and_Rescue_Services.png', color: '#EB5D6D' },
  { id: 15, name: 'יחצ"א', description: 'אנחנו יחידת המילואים המטכ"לית המתמחה בחילוץ לכודים מאתרי הרס מורכבים בארץ ובעולם', emoji: '🏗️', logoUrl: `${LOGO_BASE}/a5eb4a75e_.png`, color: '#F48C4F' },
  { id: 16, name: 'משרד ראש הממשלה', description: 'אנחנו גוף המטה העליון שמתווה את המדיניות הלאומית, מתכלל את שרי הממשלה ומוביל את אסטרטגיית המדינה', emoji: '🏢', logoUrl: `${LOGO_BASE}/4fa31316b_.jpg`, color: '#E8521A' },
];

export const DIFFICULTIES = {
  easy:   { id: 'easy',   label: 'קלה',     pairs: 4,  totalCards: 8,  icon: '🌱', cols: 2, description: '4 זוגות קלפים',  color: '#39B07C' },
  medium: { id: 'medium', label: 'בינונית', pairs: 8,  totalCards: 16, icon: '⚡', cols: 4, description: '8 זוגות קלפים',  color: '#F48C4F' },
  hard:   { id: 'hard',   label: 'קשה',     pairs: 12, totalCards: 24, icon: '🔥', cols: 4, description: '12 זוגות קלפים', color: '#EB5D6D' },
};

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}