/**
 * Smoke договор: всички страници отговарят 200 и съдържат маркерите си
 * (ключова цена/факт от клиентските документи + телефонът в чекъра).
 * Пускане: node scripts/smoke-local.mjs [baseUrl]   (default http://localhost:4173)
 * Изход: код 0 само при пълно зелено.
 */
const BASE = process.argv[2] || "http://localhost:4173";

const CHECKS = [
  { path: "/", markers: ["Истинската грижа", "Запази час", "088 981 6905"] },
  { path: "/za-nas", markers: ["Моята история", "А защо AURÈLIS?", "Йоана Здравкова"] },
  { path: "/konsultatsia", markers: ["20 €", "приспада", "Анализ на кожата"] },
  { path: "/uslugi", markers: ["Почистване на лице", "Лазерна епилация", "от 40 €"] },
  { path: "/uslugi/pochistvane-na-lice", markers: ["45 €", "Водно дермабразио", "90–100 мин."] },
  { path: "/uslugi/biorepeel", markers: ["65 €", "95 €", "10–14 дни"] },
  { path: "/uslugi/terapii-za-litse", markers: ["Карбокситерапия", "50 €", "DermShield", "75 €"] },
  { path: "/uslugi/mikronidling", markers: ["80 €", "115 €", "SQT", "спикули"] },
  { path: "/uslugi/led-terapia", markers: ["15 €", "Червена", "10–15 мин."] },
  { path: "/uslugi/vezhdi", markers: ["8 €", "къна"] },
  { path: "/lazerna-epilatsia", markers: ["Цяло лице", "25 €", "Цели крака", "75 €", "Цял интим", "45 €"] },
  { path: "/paketi", markers: ["Acne Clear", "295 €", "Skin Renewal", "275 €", "550 €", "Full Body Premium", "150 €", "145 €", "Виж програмата"] },
  { path: "/paketi/acne-clear", markers: ["295 €", "NOON Corrective Acne", "Класическо почистване", "LED терапия"] },
  { path: "/paketi/skin-renewal", markers: ["275 €", "BioRePeel", "Casmara", "LED терапия"] },
  { path: "/paketi/vip-skin-rejuvenation", markers: ["550 €", "SQT Premium Anti-Age", "Микронидлинг Fusion", "LED терапия"] },
  { path: "/tsenorazpis", markers: ["45 €", "Жени", "Мъже", "20 €", "95 €"] },
  { path: "/marki", markers: ["Collagena", "BioRePeel", "Casmara", "NOON", "Fusion", "SQT"] },
  { path: "/kontakti", markers: ["Дунавски лебед", "088 981 6905", "yoanazdravkova1@gmail.com", "08:00 – 16:00", "Изпрати запитване"] },
  { path: "/logo.svg", markers: ["<svg", "font_8_374"] },
  { path: "/logo-cream.svg", markers: ["#f6efe6"] },
];

let failed = 0;
for (const check of CHECKS) {
  try {
    const res = await fetch(BASE + check.path);
    if (res.status !== 200) {
      console.error(`FAIL ${check.path}: HTTP ${res.status}`);
      failed++;
      continue;
    }
    const html = await res.text();
    const missing = check.markers.filter((m) => !html.includes(m));
    if (missing.length) {
      console.error(`FAIL ${check.path}: липсват маркери: ${missing.join(" | ")}`);
      failed++;
    } else {
      console.log(`OK   ${check.path}`);
    }
  } catch (err) {
    console.error(`FAIL ${check.path}: ${err.message}`);
    failed++;
  }
}

// 404 договор: несъществуваща категория НЕ бива да връща 200
const notFound = await fetch(BASE + "/uslugi/nyama-takava").then((r) => r.status);
if (notFound === 404) {
  console.log("OK   /uslugi/nyama-takava -> 404");
} else {
  console.error(`FAIL /uslugi/nyama-takava: очакван 404, получен ${notFound}`);
  failed++;
}

if (failed) {
  console.error(`\n${failed} проверки паднаха.`);
  process.exit(1);
}
console.log(`\nВсички ${CHECKS.length + 1} проверки минаха.`);
