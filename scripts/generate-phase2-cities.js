const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const baseHtmlPath = path.join(__dirname, '../index.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

const cities = [
  { 
    id: 'surat', 
    name: 'Surat', 
    tagline: 'Future-proofing Surat\'s students with essential digital skills',
    areas: 'Adajan, Vesu, Piplod, and Varachha',
    focus: 'preparing school students in Surat for a tech-driven future with practical computer basics.',
    faqQuestion: 'What are the best digital skills classes for kids in Surat?',
    faqAnswer: 'SkillNest offers Surat\'s most comprehensive online digital program for Class 6-8 students, covering everything from typing and MS Office to safe internet usage.'
  },
  { 
    id: 'coimbatore', 
    name: 'Coimbatore', 
    tagline: 'Giving Coimbatore students an early tech advantage',
    areas: 'RS Puram, Peelamedu, Saibaba Colony, and Saravanampatti',
    focus: 'equipping Coimbatore\'s bright young minds with logical thinking and coding fundamentals.',
    faqQuestion: 'How can students in Coimbatore learn AI and coding practically?',
    faqAnswer: 'Our specialized online batch provides students in Coimbatore with hands-on projects in Coding Program, AI tools, and essential software.'
  },
  { 
    id: 'bhubaneswar', 
    name: 'Bhubaneswar', 
    tagline: 'Building digital confidence in Bhubaneswar\'s youth',
    areas: 'Patia, Jayadev Vihar, Saheed Nagar, and Khandagiri',
    focus: 'delivering accessible, high-quality computer education to every home in Bhubaneswar.',
    faqQuestion: 'Which is the best practical computer course for Class 6-8 in Bhubaneswar?',
    faqAnswer: 'Parents in Bhubaneswar trust SkillNest because it focuses on 100% practical, interactive learning rather than just theory.'
  },
  { 
    id: 'kochi', 
    name: 'Kochi', 
    tagline: 'Smart digital skills for Kochi\'s bright minds',
    areas: 'Kakkanad, Edappally, Panampilly Nagar, and Palarivattom',
    focus: 'bringing creative digital learning and premium tech education to children across Kochi.',
    faqQuestion: 'Are there good coding and digital skills classes in Kochi for school kids?',
    faqAnswer: 'Yes, SkillNest provides an intensive 6-week online program for Kochi students, teaching them MS Office, AI tools, and cyber safety.'
  },
  { 
    id: 'mysuru', 
    name: 'Mysuru', 
    tagline: 'Premium tech and computer education in Mysuru',
    areas: 'Gokulam, Jayalakshmipuram, Kuvempunagar, and Vijayanagar',
    focus: 'ensuring affordable and high-quality online digital skill development for Mysuru\'s youth.',
    faqQuestion: 'Where can students in Mysuru learn MS Office and AI practically?',
    faqAnswer: 'Our specialized online batch allows students in Mysuru to master MS Excel, PowerPoint, Word, and basic AI through live, interactive projects.'
  },
  { 
    id: 'vadodara', 
    name: 'Vadodara', 
    tagline: 'Practical computer skills for Vadodara\'s school students',
    areas: 'Alkapuri, Akota, Fatehgunj, and Manjalpur',
    focus: 'equipping students in Vadodara with essential digital literacy and cyber safety awareness.',
    faqQuestion: 'What is the best online digital skills program in Vadodara?',
    faqAnswer: 'SkillNest stands out in Vadodara by replacing passive screen time with highly productive, guided learning in coding and computer basics.'
  },
  { 
    id: 'visakhapatnam', 
    name: 'Visakhapatnam', 
    tagline: 'Empowering Vizag\'s youth with AI and computer proficiency',
    areas: 'MVP Colony, Seethammadhara, Madhurawada, and Gajuwaka',
    focus: 'helping Vizag\'s young minds transition from tech consumers to active tech creators.',
    faqQuestion: 'How to find good online AI and coding classes for teenagers in Visakhapatnam?',
    faqAnswer: 'SkillNest’s Class 6-8 program is perfect for Vizag teenagers, focusing on building a practical portfolio, improving typing, and learning real-world tools.'
  },
  { 
    id: 'thiruvananthapuram', 
    name: 'Thiruvananthapuram', 
    tagline: 'Trivandrum\'s top coding and digital program for kids',
    areas: 'Kowdiar, Sasthamangalam, Kazhakkoottam, and Pattom',
    focus: 'providing Trivandrum\'s students with a robust foundation in digital literacy and future-ready skills.',
    faqQuestion: 'What are the best computer classes for school students in Thiruvananthapuram?',
    faqAnswer: 'SkillNest offers a highly practical online program for Class 6-8 students in Trivandrum, focusing on MS Office, AI basics, and cyber safety without rote learning.'
  },
  { 
    id: 'chandigarh', 
    name: 'Chandigarh', 
    tagline: 'Premium digital skills for Chandigarh\'s youth',
    areas: 'Sector 35, Sector 15, Sector 8, and Manimajra',
    focus: 'nurturing logical thinking and tech-forward skills for Chandigarh\'s ambitious students.',
    faqQuestion: 'How can school students in Chandigarh learn digital skills safely?',
    faqAnswer: 'Through our structured 6-week online program, students in Chandigarh get hands-on experience in safe browsing, Google tools, and introductory AI.'
  }
];

const generatedUrls = cities.map(city => `https://skillnest.co.in/cities/${city.id}/`);

cities.forEach(city => {
  const $ = cheerio.load(baseHtml);
  const cityUrl = `https://skillnest.co.in/cities/${city.id}/`;

  // 1. UPDATE ALL RELATIVE PATHS
  $('[src]').each((i, el) => {
    let src = $(el).attr('src');
    if (src && !src.startsWith('http') && !src.startsWith('/') && !src.startsWith('data:')) {
      $(el).attr('src', '/' + src);
    }
  });

  $('[href]').each((i, el) => {
    let href = $(el).attr('href');
    if (href && !href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('data:')) {
      $(el).attr('href', '/' + href);
    }
  });

  $('[srcset]').each((i, el) => {
    let srcset = $(el).attr('srcset');
    if (srcset) {
      let parts = srcset.split(',').map(part => {
        let trimmed = part.trim();
        if (trimmed && !trimmed.startsWith('http') && !trimmed.startsWith('/')) {
          return '/' + trimmed;
        }
        return trimmed;
      });
      $(el).attr('srcset', parts.join(', '));
    }
  });

  // 2. SEO META TAGS
  const title = `Online Digital Skills & AI Classes for Kids in ${city.name} | SkillNest`;
  const description = `Enroll your child in ${city.name}'s top practical digital skills program (Class 6-8). Learn AI, Coding, MS Office & Cyber Safety online. Serving ${city.areas}.`;

  $('title').text(title);
  $('meta[name="description"]').attr('content', description);
  $('meta[property="og:title"]').attr('content', title);
  $('meta[property="og:description"]').attr('content', description);
  $('meta[property="og:url"]').attr('content', cityUrl);
  $('meta[name="twitter:title"]').attr('content', title);
  $('meta[name="twitter:description"]').attr('content', description);
  $('meta[name="twitter:url"]').attr('content', cityUrl);
  
  // Add Canonical Tag
  if ($('link[rel="canonical"]').length) {
    $('link[rel="canonical"]').attr('href', cityUrl);
  } else {
    $('head').append(`\n<link rel="canonical" href="${cityUrl}">`);
  }

  // 3. SCHEMA MARKUP
  $('script[type="application/ld+json"]').remove(); // Remove old schema
  
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "name": "SkillNest - Smart Digital Skills",
        "url": "https://skillnest.co.in/",
        "logo": "https://skillnest.co.in/assets/founder.jpeg",
        "description": "India's premier online digital skills and AI education program for Class 6-8 students.",
        "sameAs": [
          "https://linkedin.com/company/skillnest",
          "https://instagram.com/skillnest"
        ]
      },
      {
        "@type": "Course",
        "name": `Online Digital Skills & AI Classes for Kids in ${city.name}`,
        "description": `Practical digital skills program for school students (Class 6-8) in ${city.name}. Learn MS Office, AI basics, Coding Program, and Cyber Safety.`,
        "provider": {
          "@type": "EducationalOrganization",
          "name": "SkillNest - Smart Digital Skills",
          "url": "https://skillnest.co.in/"
        },
        "courseMode": "online",
        "educationalLevel": "Middle School"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": city.faqQuestion,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": city.faqAnswer
            }
          },
          {
            "@type": "Question",
            "name": "At what age should kids learn computers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Kids should start learning structured computer skills around ages 10 to 14 (Class 6-8). This is the perfect age to transition from just playing games to understanding how to use digital tools for learning."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://skillnest.co.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": `Classes in ${city.name}`,
            "item": cityUrl
          }
        ]
      }
    ]
  };
  $('head').append(`\n<script type="application/ld+json">\n${JSON.stringify(schemaMarkup, null, 2)}\n</script>\n`);

  // 4. DISTRIBUTED CONTENT INJECTIONS
  // Hero Section
  $('.hero h1').html(`India's #1 Practical <span class="highlight">Digital Skills Program</span> for ${city.name} Students`);
  $('.hero-sub').text(`${city.tagline}. Help your child build practical digital skills in just 6 weeks.`);
  $('.hero-badge-row').prepend(`<span class="hero-badge badge-open" style="margin-right:8px; background:rgba(37,99,235,0.2); color:#93c5fd; border-color:rgba(37,99,235,0.3)">📍 ${city.name} Batch</span>`);

  // Mission / Trust Section
  $('.mission-text p').text(`Aligned with modern digital skills & AI learning trends, ${city.focus} We believe practical skills will open doors that theory alone cannot.`);

  // Why Choose Us
  $('.section-title:contains("Why Parents Choose")').html(`Why ${city.name} Parents Choose <span>This Digital Skills Program</span>`);
  $('.why-section .section-sub').append(` Join hundreds of satisfied families from ${city.areas}.`);

  // Before / After Section
  $('.before-after-section .section-title').html(`From Confused to Confident in <span>6 Weeks in ${city.name}</span>`);

  // 5. LOCAL FAQ SECTION & FOOTER LINKS (INJECT AT BOTTOM)
  const citiesMetadata = JSON.parse(fs.readFileSync(path.join(__dirname, 'cities-metadata.json'), 'utf8'));
  const currentCityMeta = citiesMetadata.find(c => c.id === city.id);
  const currentCluster = currentCityMeta ? currentCityMeta.cluster : null;

  const otherCitiesLinks = citiesMetadata.filter(c => c.id !== city.id && c.cluster === currentCluster).map(c => 
    `<a href="/cities/${c.id}/" style="color:rgba(255,255,255,0.7); text-decoration:underline;">${c.anchor}</a>`
  ).join('');

  const seoFooter = `
  <section class="city-seo-hub" style="padding: 60px 0; background: var(--gray-100); border-top: 1px solid var(--gray-300);">
    <div class="container">
      <div class="text-center fade-up">
        <div class="section-tag"><span class="dot"></span>Local Support</div>
        <h2 class="section-title">Supporting <span>${city.name}'s</span> Future Leaders</h2>
        <p class="section-sub">Bringing world-class digital education to students across ${city.areas}.</p>
      </div>
        <div class="faq-accordion fade-up" style="max-width:800px; margin: 40px auto; background: var(--white); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); padding: clamp(20px, 4vw, 30px);">
        <h3 style="font-family:'Sora',sans-serif; color:var(--blue-900); margin-bottom: 20px; font-size: 1.3rem;">Frequently Asked Questions</h3>
        <div style="margin-bottom: 20px; border-bottom: 1px solid var(--gray-100); padding-bottom: 15px;">
          <h3 style="font-size: 1.05rem; color: var(--blue-800); margin-bottom: 8px; font-weight:800;">${city.faqQuestion}</h3>
          <p style="color: var(--gray-600); font-size: 0.95rem; line-height: 1.6;">${city.faqAnswer}</p>
        </div>
        <div style="padding-bottom: 15px;">
          <h3 style="font-size: 1.05rem; color: var(--blue-800); margin-bottom: 8px; font-weight:800;">At what age should kids learn computers?</h3>
          <p style="color: var(--gray-600); font-size: 0.95rem; line-height: 1.6;">Kids should start learning structured computer skills around ages 10 to 14 (Class 6-8). This is the perfect age to transition from just playing games to understanding how to use digital tools for learning.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="seo-footer-links" style="padding: 40px 0; background: var(--blue-950, #081229); color: var(--white); border-top: 1px solid rgba(255,255,255,0.05);">
    <div class="container">
      <h3 style="margin-bottom:20px; font-family:'Sora',sans-serif; font-size: 1.1rem; color: rgba(255,255,255,0.9); font-weight:800;">Explore SkillNest in Other Cities</h3>
      <div style="display:flex; flex-wrap:wrap; gap: 15px 25px; font-size: 0.9rem;">
        ${otherCitiesLinks}
      </div>
    </div>
  </section>
  `;

  // Inject before the main footer (assuming it's at the end of the body, we will inject after the last section)
  $('section').last().after(seoFooter);

  // Write file
  const outDir = path.join(__dirname, '..', 'cities', city.id);
  if (!fs.existsSync(outDir)){
      fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, 'index.html');
  fs.writeFileSync(outPath, $.html(), 'utf8');
  console.log(`Generated ${cityUrl}`);
});

// Update sitemap logic cleanly (Prevent duplicates & validate syntax)
const sitemapPath = path.join(__dirname, '../sitemap-cities.xml');
let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const $sitemap = cheerio.load(sitemapContent, { xmlMode: true });

let entriesAdded = 0;
generatedUrls.forEach(cityUrl => {
  let exists = false;
  $sitemap('url loc').each((i, el) => {
    if ($sitemap(el).text().trim() === cityUrl) {
      exists = true;
    }
  });

  if (!exists) {
    const today = new Date().toISOString().split('T')[0];
    $sitemap('urlset').append(`  <url>\n    <loc>${cityUrl}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`);
    entriesAdded++;
  }
});

if (entriesAdded > 0) {
  const updatedSitemap = $sitemap.xml();
  fs.writeFileSync(sitemapPath, updatedSitemap, 'utf8');
  console.log(`\nSuccessfully updated sitemap-cities.xml with ${entriesAdded} new entries.`);
} else {
  console.log('\nAll Phase 2 URLs already present in sitemap-cities.xml.');
}

