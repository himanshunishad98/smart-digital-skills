/**
 * config.js — Central Configuration File for SkillNest
 * Store all editable business details, pricing, and contact info here.
 * Any edits here will automatically propagate across the entire website.
 */

const SITE_CONFIG = {
  BRAND_NAME: "SkillNest",

  // Phone — two formats for convenience
  PHONE: "+91 74705 54811",           // Human-readable display format
  PHONE_FORMATTED: "+91 74705 54811", // Alias for PHONE
  PHONE_RAW: "+91 74705 54811",         // Digits-only for tel: links

  // WhatsApp — number + prebuilt link
  WHATSAPP: "917470554811",
  WHATSAPP_LINK: "https://wa.me/917470554811",

  // Legacy phone numbers to scan and clean up from the site
  LEGACY_PHONES: ["8827731006", "7987605097"],

  EMAIL: "admin@skillnest.co.in",
  ADDRESS: "Durg, Chhattisgarh, India",
  CITY: "Bhilai Nagar",
  STATE: "Chhattisgarh",
  COUNTRY: "India",
  WEBSITE: "https://skillnest.co.in",

  // Pricing
  CURRENT_PRICE: "\u20b95499",
  ORIGINAL_PRICE: "\u20b97499",
  REGISTRATION_FEES: "\u20b9499",

  COURSE_PRICES: {
    'communication-confidence-lab':       '\u20b94,999',
    'multilingual-communication-mastery': '\u20b96,999',
    'critical-thinking-problem-solving':  '\u20b96,999',
    'computational-thinking-coding-logic': '\u20b98,999',
    'emotional-intelligence-empathy':     '\u20b95,999',
    'parakh-presentation-skills':         '\u20b95,999',
    'public-speaking-olympiad-prep':      '\u20b915,000 - \u20b920,000',
    'ai-literacy-prompt-engineering':     '\u20b98,000 - \u20b912,000',
    'design-thinking-problem-solving':    '\u20b912,000 - \u20b914,000',
    'digital-literacy-online-presence':   '\u20b97,999',
    'digital-content-citizenship':        '\u20b97,000 - \u20b99,000',
    'financial-literacy-payments':        '\u20b96,999',
    'financial-literacy-wealth-creation': '\u20b95,000 - \u20b97,000',
    'ipr-patent-basics':                  '\u20b98,999',
    'retail-customer-service':            '\u20b96,999',
    'tourism-hospitality-communication':  '\u20b97,999'
  },

  // Social Media
  INSTAGRAM: "https://instagram.com/skillnest.co.in",
  FACEBOOK: "https://facebook.com/skillnest.co.in",

  // Business details
  WORKING_HOURS: "9 AM - 8 PM",
  SUPPORT_TEXT: "Talk to our counselor",
  CTA_TEXT: "Book Free Demo Class",
  CTA_PRIMARY: "Book Free Demo Class",
  CTA_SECONDARY: "Download Curriculum",

  // Current month variable
  CURRENT_MONTH: "June",

  // Sticky CTA Config
  STICKY_CTA_TITLE: "36-Day Digital Skills Program",
  STICKY_CTA_SUB: "Special offer · Enroll before seats fill up",
  STICKY_CTA_BADGE: "Limited Seats",

  // Exit Popup Delay (10 seconds)
  EXIT_POPUP_DELAY: 10000
};

// Legacy compatibility
const existingConfig = (typeof window !== 'undefined' && window.CONFIG) || {};

// Map configured month name to month number and days
const MONTH_NUMBER_MAP = {
  'january': '01', 'february': '02', 'march': '03', 'april': '04', 'may': '05', 'june': '06',
  'july': '07', 'august': '08', 'september': '09', 'october': '10', 'november': '11', 'december': '12'
};
const MONTH_DAYS_MAP = {
  'january': 31, 'february': 28, 'march': 31, 'april': 30, 'may': 31, 'june': 30,
  'july': 31, 'august': 31, 'september': 30, 'october': 31, 'november': 30, 'december': 31
};
const configMonthLower = (SITE_CONFIG.CURRENT_MONTH || 'June').toLowerCase();
const configMonthNum = MONTH_NUMBER_MAP[configMonthLower] || '06';
const configMonthDays = MONTH_DAYS_MAP[configMonthLower] || 30;

var CONFIG = {
  phone: SITE_CONFIG.WHATSAPP,
  phoneDisplay: SITE_CONFIG.PHONE,
  legacyPhones: SITE_CONFIG.LEGACY_PHONES,
  email: SITE_CONFIG.EMAIL,
  location: `${SITE_CONFIG.ADDRESS}, ${SITE_CONFIG.CITY}, ${SITE_CONFIG.STATE}, ${SITE_CONFIG.COUNTRY}`,
  hours: SITE_CONFIG.WORKING_HOURS,
  whatsappBaseUrl: "https://wa.me/",
  whatsappMessage: "Hi%2C%20I%20want%20details%20about%20Smart%20Digital%20Skills%20Program.",
  countdownTarget: existingConfig.countdownTarget || new Date("2026-" + configMonthNum + "-" + configMonthDays + "T23:59:59+05:30"),
  batchName: SITE_CONFIG.CURRENT_MONTH + " 2026 Batch",
  currentMonth: SITE_CONFIG.CURRENT_MONTH,
  programDuration: "6 Weeks",
  dailyClassDuration: "1 Hour",
  targetClasses: "Class 6–8",
  sheetId: "1OHn2I1PDpYdbciUWaguuLn2NPRiqK2wewqH4urcz-nc",
  sheetName: "lead details",
  firebaseConfig: {
    apiKey: "AIzaSyBi5hdawXSsOXr9xRgapCRB0hYYE1kKRCE",
    authDomain: "skillnest-website.firebaseapp.com",
    projectId: "skillnest-website",
    storageBucket: "skillnest-website.firebasestorage.app",
    messagingSenderId: "514313010895",
    appId: "1:514313010895:web:7b0f4245c7cbad897f81ba"
  },
  appCheckSiteKey: "6LeNuAwtAAAAACOSin29ofv6VW8dN2hPX4CTy8z4",
  stickyCtaTitle: SITE_CONFIG.STICKY_CTA_TITLE,
  stickyCtaSub: SITE_CONFIG.STICKY_CTA_SUB,
  stickyCtaBadge: SITE_CONFIG.STICKY_CTA_BADGE,
  exitPopupDelay: SITE_CONFIG.EXIT_POPUP_DELAY,
  ...existingConfig
};

// Export for Node.js scripts if needed, else define on window in browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SITE_CONFIG, CONFIG };
} else {
  window.SITE_CONFIG = SITE_CONFIG;
  window.CONFIG = CONFIG;
}
