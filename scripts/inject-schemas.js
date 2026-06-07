/**
 * inject-schemas.js
 * Injects/replaces comprehensive JSON-LD schema markup in all HTML files.
 * Adds: EducationalOrganization, Course, FAQPage, AggregateRating, Person schemas.
 * Removes invalid FAQ properties: dateModified, lastReviewed.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../');

// ─── GLOBAL ORGANIZATION SCHEMA ────────────────────────────────────────────
const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  '@id': 'https://skillnest.co.in/#organization',
  'name': 'SkillNest',
  'alternateName': 'Smart Digital Skills',
  'url': 'https://skillnest.co.in',
  'logo': {
    '@type': 'ImageObject',
    'url': 'https://skillnest.co.in/assets/skillnest-logo.png',
    'width': 200,
    'height': 60
  },
  'description': 'SkillNest is India\'s premier online digital skills and AI program for Class 6–8 students. The 6-week live curriculum covers computer basics, MS Office, cyber safety, Coding Program, and practical AI tools taught by expert instructors.',
  'foundingDate': '2023',
  'numberOfEmployees': { '@type': 'QuantitativeValue', 'value': 10 },
  'areaServed': {
    '@type': 'Country',
    'name': 'India'
  },
  'audience': {
    '@type': 'EducationalAudience',
    'educationalRole': 'student',
    'audienceType': 'Middle School Students (Class 6–8)'
  },
  'contactPoint': {
    '@type': 'ContactPoint',
    'contactType': 'customer support',
    'availableLanguage': ['English', 'Hindi'],
    'contactOption': 'TollFree'
  },
  'sameAs': [
    'https://www.youtube.com/@SkillNestIndia',
    'https://www.instagram.com/skillnest.india'
  ],
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': '4.9',
    'reviewCount': '247',
    'bestRating': '5',
    'worstRating': '1'
  }
};

// ─── FOUNDER PERSON SCHEMA ─────────────────────────────────────────────────
const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': 'SkillNest Founder',
  'jobTitle': 'Founder & Lead Instructor',
  'worksFor': { '@id': 'https://skillnest.co.in/#organization' },
  'knowsAbout': ['Digital Literacy', 'AI Education', 'EdTech', 'STEM for Kids', 'Coding Education'],
  'description': 'Experienced EdTech educator focused on building practical digital skills for Indian middle school students through live, interactive online learning.'
};

// ─── GLOBAL FAQ SCHEMA (applies to all pages) ─────────────────────────────
const GLOBAL_FAQS = [
  {
    question: 'What is SkillNest?',
    answer: 'SkillNest is India\'s leading online digital skills and AI program designed specifically for Class 6–8 students. The 6-week live program teaches computer basics, MS Office, Coding Program, cyber safety, and practical AI tools through project-based interactive learning.'
  },
  {
    question: 'Are SkillNest classes live or recorded?',
    answer: 'SkillNest offers 100% live, interactive online classes — not pre-recorded videos. Students attend real-time sessions with an expert instructor in small groups, enabling direct interaction, instant doubt resolution, and personalized attention.'
  },
  {
    question: 'What is the fee for SkillNest?',
    answer: 'SkillNest\'s 6-week program is available at an early-bird introductory price with a fully refundable seat reservation option. The complete fee structure is shared during the free demo session. A 7-day full refund guarantee is offered for all enrolled students.'
  },
  {
    question: 'Is SkillNest suitable for absolute beginners?',
    answer: 'Yes. SkillNest is specifically designed for students with zero prior coding or computer knowledge. The curriculum starts from foundational digital literacy and gradually progresses to AI tools and Scratch programming, making it perfect for beginners in Class 6–8.'
  },
  {
    question: 'What certificate does SkillNest provide?',
    answer: 'Students who complete the 6-week program receive an official SkillNest Digital Skills Certificate recognized by parents and schools across India. The certificate validates competency in computer skills, MS Office, coding fundamentals, and AI literacy.'
  },
  {
    question: 'How many students has SkillNest taught?',
    answer: 'SkillNest has successfully trained over 1,000 students across India, with a 4.9/5 average parent rating based on 247+ reviews. Students from cities including Delhi, Mumbai, Lucknow, Jaipur, Patna, Bhopal, and Chandigarh have completed the program.'
  },
  {
    question: 'What tools and software will my child learn?',
    answer: 'Students learn Microsoft Office (Word, Excel, PowerPoint), Scratch programming, ChatGPT prompting basics, Canva for presentations, Google Workspace tools, and foundational cyber safety practices — all relevant for school projects and future academics.'
  },
  {
    question: 'What is the batch size and class schedule?',
    answer: 'SkillNest maintains small batch sizes of 5–10 students for maximum individual attention. Weekend batches (Saturday and Sunday) run at 10:00 AM and 12:00 PM IST. Weekday batches are also available on request.'
  },
  {
    question: 'Is there a free trial or demo class available?',
    answer: 'Yes. SkillNest offers a completely free demo class for all new students. Parents can book the demo session through WhatsApp or the enrollment form on the website. No payment or commitment is required to attend the demo.'
  },
  {
    question: 'Does SkillNest follow the NEP 2020 curriculum?',
    answer: 'Yes. SkillNest\'s curriculum is aligned with NEP 2020 guidelines for digital literacy and computational thinking. The program emphasizes practical skills, project-based learning, and 21st-century competencies required by the updated national education policy.'
  }
];

function makeFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(f => ({
      '@type': 'Question',
      'name': f.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': f.answer
      }
    }))
  };
}

// ─── COURSE SCHEMAS per page ───────────────────────────────────────────────
const PAGE_COURSE_SCHEMAS = {
  'index.html': {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': 'SkillNest Digital Skills & AI Program',
    'description': 'A comprehensive 6-week live online program for Class 6–8 students covering computer basics, MS Office, Coding Program, cyber safety, and practical AI tools. Taught by expert instructors in small interactive batches.',
    'provider': { '@id': 'https://skillnest.co.in/#organization' },
    'educationalLevel': 'Middle School (Class 6–8)',
    'timeRequired': 'P6W',
    'courseMode': 'online',
    'availableLanguage': ['English', 'Hindi'],
    'teaches': ['Digital Literacy', 'Computer Basics', 'MS Office', 'Coding Program', 'AI Tools', 'Cyber Safety', 'Canva', 'Touch Typing'],
    'hasCourseInstance': {
      '@type': 'CourseInstance',
      'courseMode': 'online',
      'courseWorkload': 'PT2H',
      'instructor': { '@id': 'https://skillnest.co.in/#organization' }
    },
    'offers': {
      '@type': 'Offer',
      'category': 'Educational',
      'availability': 'https://schema.org/InStock',
      'validFrom': '2024-01-01'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '247',
      'bestRating': '5'
    }
  },
  'courses/coding/index.html': {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': 'SkillNest Coding Classes for Kids',
    'description': 'Online Coding Program and algorithmic logic course for Class 6–8 students. Students build interactive games, animations, and stories through project-based block coding.',
    'provider': { '@id': 'https://skillnest.co.in/#organization' },
    'educationalLevel': 'Middle School (Class 6–8)',
    'timeRequired': 'P6W',
    'courseMode': 'online',
    'teaches': ['Scratch Programming', 'Algorithmic Logic', 'Computational Thinking', 'Game Design'],
    'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'reviewCount': '247', 'bestRating': '5' }
  },
  'courses/computer/index.html': {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': 'SkillNest Computer Classes for Kids',
    'description': 'Practical online computer classes for Class 6–8 students. Covers MS Word, Excel, PowerPoint, touch typing, file management, and internet safety.',
    'provider': { '@id': 'https://skillnest.co.in/#organization' },
    'educationalLevel': 'Middle School (Class 6–8)',
    'timeRequired': 'P6W',
    'courseMode': 'online',
    'teaches': ['MS Word', 'MS Excel', 'MS PowerPoint', 'Touch Typing', 'Cyber Safety', 'File Management'],
    'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'reviewCount': '247', 'bestRating': '5' }
  },
  'programs/summer-camp/index.html': {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': 'SkillNest Summer Digital Skills Bootcamp',
    'description': 'A 6-week intensive online summer camp for Class 6–8 students. Covers MS Office, Coding Program, AI prompting, Canva, and cyber safety during school vacations.',
    'provider': { '@id': 'https://skillnest.co.in/#organization' },
    'educationalLevel': 'Middle School (Class 6–8)',
    'timeRequired': 'P6W',
    'courseMode': 'online',
    'teaches': ['MS Office', 'Coding Program', 'AI Prompting', 'Canva', 'Cyber Safety'],
    'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'reviewCount': '247', 'bestRating': '5' }
  }
};

// ─── HELPERS ────────────────────────────────────────────────────────────────
function getAllHtmlFiles(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (['node_modules', '.git', 'scripts', 'backup-original-structure', 'archive'].includes(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) getAllHtmlFiles(full, results);
    else if (e.name.endsWith('.html')) results.push(full);
  }
  return results;
}

function removeInvalidFAQProps(jsonldString) {
  // Remove dateModified and lastReviewed properties that are invalid for FAQPage
  return jsonldString
    .replace(/,?\s*"dateModified"\s*:\s*"[^"]*"/g, '')
    .replace(/,?\s*"lastReviewed"\s*:\s*"[^"]*"/g, '');
}

function schemaToTag(obj) {
  let json = JSON.stringify(obj, null, 0);
  json = removeInvalidFAQProps(json);
  return `<script type="application/ld+json">${json}</script>`;
}

function injectOrReplaceSchema(html, typeIdentifier, newSchemaTag) {
  // Remove existing schema blocks of this type
  const pattern = new RegExp(
    `<script\\s+type="application/ld\\+json">[^<]*"@type"\\s*:\\s*"?${typeIdentifier}"?[^<]*<\/script>`,
    'gi'
  );
  // Also handle arrays: ["EducationalOrganization","LocalBusiness"]
  const patternArray = new RegExp(
    `<script\\s+type="application/ld\\+json">[\\s\\S]*?"@type"[\\s\\S]*?${typeIdentifier}[\\s\\S]*?<\/script>`,
    'gi'
  );
  html = html.replace(pattern, '');
  // Insert before closing </head>
  if (!html.includes(newSchemaTag)) {
    html = html.replace('</head>', `${newSchemaTag}\n</head>`);
  }
  return html;
}

// ─── MAIN ───────────────────────────────────────────────────────────────────
console.log('\n=== INJECTING SCHEMAS ===');

const orgTag = schemaToTag(ORG_SCHEMA);
const personTag = schemaToTag(PERSON_SCHEMA);
const faqTag = schemaToTag(makeFAQSchema(GLOBAL_FAQS));

const allFiles = getAllHtmlFiles(ROOT);
let modified = 0;

for (const file of allFiles) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  // Skip tiny redirect files (< 2KB)
  if (html.length < 2000) continue;

  // 1. Remove invalid FAQ properties from existing schemas
  html = removeInvalidFAQProps(html);

  // 2. Remove old EducationalOrganization/LocalBusiness schemas (will replace)
  html = html.replace(
    /<script\s+type="application\/ld\+json">\s*\{[^<]*?"EducationalOrganization"[\s\S]*?<\/script>/gi,
    ''
  );

  // 3. Inject Organization schema before </head>
  if (!html.includes('"@id":"https://skillnest.co.in/#organization"') &&
      !html.includes('"@id": "https://skillnest.co.in/#organization"')) {
    html = html.replace('</head>', `${orgTag}\n</head>`);
  }

  // 4. Inject Person schema (once, on index only)
  if (rel === 'index.html' && !html.includes('"@type":"Person"') && !html.includes('"@type": "Person"')) {
    html = html.replace('</head>', `${personTag}\n</head>`);
  }

  // 5. Inject FAQPage schema if not already present (or replace invalid one)
  const hasFaq = html.includes('"FAQPage"') || html.includes('@type":"FAQPage"');
  if (!hasFaq) {
    html = html.replace('</head>', `${faqTag}\n</head>`);
  } else {
    // Just clean invalid props from existing FAQ schemas
    html = removeInvalidFAQProps(html);
  }

  // 6. Inject Course schema for specific pages
  if (PAGE_COURSE_SCHEMAS[rel]) {
    const courseTag = schemaToTag(PAGE_COURSE_SCHEMAS[rel]);
    const hasCourse = html.includes('"Course"') || html.includes('@type":"Course"');
    if (!hasCourse) {
      html = html.replace('</head>', `${courseTag}\n</head>`);
    }
  }

  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    console.log(`  ✓ Schemas updated: ${rel}`);
    modified++;
  }
}

console.log(`\n✅ Schema injection complete. ${modified} files updated.`);
