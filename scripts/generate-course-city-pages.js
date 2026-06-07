const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const baseHtmlPath = path.join(__dirname, '../index.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

// Load configurations from JSON files
const courseCityData = JSON.parse(fs.readFileSync(path.join(__dirname, 'course-city-metadata.json'), 'utf8'));
const citiesMetadata = JSON.parse(fs.readFileSync(path.join(__dirname, 'cities-metadata.json'), 'utf8'));

const generatedUrls = courseCityData.map(item => `https://skillnest.co.in/cities/${item.cityId}/${item.courseId}/`);

// Define Curriculums dynamically based on courseId
function getCurriculum(courseId) {
  switch (courseId) {
    case 'coding-classes':
      return [
        { week: 'Week 1', title: 'Algorithms & Coding Logic', desc: 'Understanding step-by-step logic, sequence creation, and visual block interfaces.' },
        { week: 'Week 2', title: 'Loops & Iterations', desc: 'Working with repeating structures to draw geometric designs and automate movements.' },
        { week: 'Week 3', title: 'Conditional Statements', desc: 'Learning If-Else logic to create branching choices and simple keyboard-controlled maze games.' },
        { week: 'Week 4', title: 'Variables & Score Tracking', desc: 'Storing data, designing scoreboards, and working with coordinate systems.' },
        { week: 'Week 5', title: 'Advanced Game Physics', desc: 'Implementing jump gravity, collision detection, and custom audio effects.' },
        { week: 'Week 6', title: 'Scratch Portfolio Showcase', desc: 'Debugging student projects, styling elements, and publishing to the MIT Scratch portal.' }
      ];
    case 'ai-classes':
      return [
        { week: 'Week 1', title: 'Introduction to AI & ML', desc: 'Exploring how machine learning works through interactive pattern matching games.' },
        { week: 'Week 2', title: 'Prompt Engineering Basics', desc: 'How to write structured prompts to generate essays, summaries, and search guides.' },
        { week: 'Week 3', title: 'AI Media & Art Generation', desc: 'Creating visuals and storyboards responsibly using modern AI design tools.' },
        { week: 'Week 4', title: 'Ethics, Bias & Fact-checking', desc: 'Learning to identify hallucinations, avoid plagiarism, and protect personal privacy.' },
        { week: 'Week 5', title: 'AI for School Projects', desc: 'Structuring school research, building slide layouts, and outlining reports efficiently.' },
        { week: 'Week 6', title: 'Tech Innovation Portfolio', desc: 'Stitching projects together and presenting a final AI prompt guide.' }
      ];
    case 'digital-skills':
    case 'computer-classes':
      return [
        { week: 'Week 1', title: 'Hardware & OS Foundations', desc: 'Mastering correct keyboard typing techniques, file structures, and key shortcuts.' },
        { week: 'Week 2', title: 'Advanced Word Processing', desc: 'Formatting margins, headers, tables, and structuring reports in MS Word/Google Docs.' },
        { week: 'Week 3', title: 'Excel & Data Basics', desc: 'Creating simple spreadsheets, basic sum/average formulas, and styling charts.' },
        { week: 'Week 4', title: 'Presentations & Slides', desc: 'Designing high-impact school presentation decks with transition logic.' },
        { week: 'Week 5', title: 'Cyber Hygiene & Security', desc: 'Recognizing phishing links, safe password rules, and secure search engines.' },
        { week: 'Week 6', title: 'Practical Tech Portfolio', desc: 'A cumulative digital showcase where students assemble a personal workspace.' }
      ];
    case 'spoken-english':
      return [
        { week: 'Week 1', title: 'Vocabulary & Sentence Building', desc: 'Learning active verbs, conversational adjectives, and simple tense structures.' },
        { week: 'Week 2', title: 'Pronunciation & Accent Training', desc: 'Correcting common speech habits and practicing natural sentence intonation.' },
        { week: 'Week 3', title: 'Public Speaking Foundations', desc: 'Overcoming hesitation, body posture tips, and projecting confidence.' },
        { week: 'Week 4', title: 'Roleplays & Real Conversations', desc: 'Simulated dialogues: talking to teachers, mock interviews, and phone etiquette.' },
        { week: 'Week 5', title: 'Debating & Argument Structures', desc: 'Expressing agreements/disagreements politely and structuring arguments.' },
        { week: 'Week 6', title: 'Live Speech Showcase', desc: 'Delivering a final live speech to peers and parent audience, showing progress.' }
      ];
    default:
      return [];
  }
}

courseCityData.forEach(item => {
  const $ = cheerio.load(baseHtml);
  const pageUrl = `https://skillnest.co.in/cities/${item.cityId}/${item.courseId}/`;
  const cityUrl = `https://skillnest.co.in/cities/${item.cityId}/`;

  // 1. UPDATE ALL RELATIVE PATHS (STRICTLY ROOT-RELATIVE ONLY)
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

  // 2. SEO META TAGS (SPECIFIC COURSE + CITY INTENT)
  const title = `${item.courseName} for School Kids in ${item.cityName} (Class 6-8) | SkillNest`;
  const description = `Enroll in ${item.cityName}'s premier ${item.courseName.toLowerCase()} program. Hands-on projects, expert trainers, and certified syllabus. Serving ${item.areas}.`;

  $('title').text(title);
  $('meta[name="description"]').attr('content', description);
  $('meta[property="og:title"]').attr('content', title);
  $('meta[property="og:description"]').attr('content', description);
  $('meta[property="og:url"]').attr('content', pageUrl);
  $('meta[name="twitter:title"]').attr('content', title);
  $('meta[name="twitter:description"]').attr('content', description);
  $('meta[name="twitter:url"]').attr('content', pageUrl);
  
  // Add Canonical Tag
  if ($('link[rel="canonical"]').length) {
    $('link[rel="canonical"]').attr('href', pageUrl);
  } else {
    $('head').append(`\n<link rel="canonical" href="${pageUrl}">`);
  }

  // 3. SCHEMA MARKUP WITH LOCALIZED FAQS & BREADCRUMBS
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
        "name": `${item.courseName} for Kids in ${item.cityName}`,
        "description": `Interactive and practical 6-week online ${item.courseName.toLowerCase()} course for middle school students (Class 6-8) in ${item.cityName}.`,
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
            "name": item.faqQuestion1,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.faqAnswer1
            }
          },
          {
            "@type": "Question",
            "name": item.faqQuestion2,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.faqAnswer2
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
            "name": `Classes in ${item.cityName}`,
            "item": cityUrl
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": item.courseName,
            "item": pageUrl
          }
        ]
      }
    ]
  };
  $('head').append(`\n<script type="application/ld+json">\n${JSON.stringify(schemaMarkup, null, 2)}\n</script>\n`);

  // 4. BREADCRUMB UI INJECTION IN HERO
  const breadcrumbHtml = `
    <nav class="breadcrumb-container" aria-label="breadcrumb" style="margin-bottom: 25px; font-size: 0.9rem;">
      <span style="color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        <a href="/" style="color: var(--yellow-400); text-decoration: none; font-weight: 500;">Home</a> 
        <span style="color: rgba(255,255,255,0.4);">&gt;</span> 
        <a href="/cities/${item.cityId}/" style="color: var(--yellow-400); text-decoration: none; font-weight: 500;">${item.cityName}</a> 
        <span style="color: rgba(255,255,255,0.4);">&gt;</span> 
        <span style="color: #ffffff; font-weight: 600;">${item.courseName}</span>
      </span>
    </nav>
  `;

  // Inject Breadcrumbs above Hero H1
  $('.hero h1').before(breadcrumbHtml);

  // Update Hero elements
  $('.hero h1').html(item.h1);
  $('.hero-sub').text(`${item.tagline}. Start your child's 6-week project journey in ${item.cityName} today.`);
  $('.hero-badge-row').prepend(`<span class="hero-badge badge-open" style="margin-right:8px; background:rgba(251,191,36,0.2); color:#fde047; border-color:rgba(251,191,36,0.3)">📍 ${item.cityName} Batch</span>`);

  // Mission / Trust Section
  $('.mission-text p').text(`Aligned with modern digital skills & AI learning trends, ${item.focus} We believe practical skills will open doors that theory alone cannot.`);

  // Why Choose Us
  $('.section-title:contains("Why Parents Choose")').html(`Why ${item.cityName} Parents Choose <span>This Digital Skills Program</span>`);
  $('.why-section .section-sub').append(` Join hundreds of satisfied families from ${item.areas}.`);

  // Before / After Section
  $('.before-after-section .section-title').html(`From Confused to Confident in <span>6 Weeks in ${item.cityName}</span>`);

  // 5. DEEP CONTENT SECTION (>1000 WORDS) - INJECT BEFORE FAQ
  const curriculumData = getCurriculum(item.courseId);
  const curriculumRows = curriculumData.map(c => `
    <tr style="border-bottom: 1px solid var(--gray-200);">
      <td style="padding: 15px; font-weight: bold; color: var(--blue-900); width: 120px;">${c.week}</td>
      <td style="padding: 15px; font-weight: 600; color: var(--blue-800); width: 200px;">${c.title}</td>
      <td style="padding: 15px; color: var(--gray-600); line-height: 1.5;">${c.desc}</td>
    </tr>
  `).join('');

  const benefitsList = item.benefits.map(b => `
    <li style="margin-bottom: 12px; display: flex; align-items: flex-start; gap: 10px; font-size: 1.05rem; color: var(--gray-700);">
      <span style="color: #10b981; font-weight: bold; font-size: 1.2rem; line-height: 1;">✔</span>
      <span>${b}</span>
    </li>
  `).join('');

  const deepContentHtml = `
  <section class="course-deep-dive" style="padding: 80px 0; background: var(--white); border-top: 1px solid var(--gray-200);">
    <div class="container" style="max-width: 1000px; margin: 0 auto;">
      <div class="text-center fade-up" style="margin-bottom: 50px;">
        <div class="section-tag" style="background: rgba(37, 99, 235, 0.1); color: var(--blue-600);"><span class="dot" style="background: var(--blue-600);"></span>Curriculum Deep Dive</div>
        <h2 class="section-title" style="font-size: clamp(1.8rem, 4vw, 2.2rem); margin-top: 10px;">Why Learning <span>${item.courseName}</span> is Crucial in ${item.cityName}</h2>
        <p class="section-sub" style="max-width: 700px; margin: 15px auto 0;">A detailed overview of syllabus milestones, project-based outcomes, and academic progression.</p>
      </div>

      <div style="background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: var(--radius-xl); padding: clamp(20px, 5vw, 40px); margin-bottom: 40px; box-shadow: var(--shadow-sm);">
        <h3 style="font-family: 'Sora', sans-serif; color: var(--blue-950); margin-bottom: 15px; font-size: 1.4rem;">The Local Skill Gap in ${item.cityName}</h3>
        <p style="color: var(--gray-700); font-size: 1.05rem; line-height: 1.7; margin-bottom: 20px;">
          ${item.localStory}
        </p>
        <p style="color: var(--gray-700); font-size: 1.05rem; line-height: 1.7;">
          At SkillNest, we take a different approach. Our curriculum bypasses mindless rote memorization. We focus on building logic, fostering creativity, and teaching safe internet behavior. By guiding students through actual development tasks, we ensure they retain concepts permanently and develop an engineering mindset early in life.
        </p>
      </div>

      <div style="margin-bottom: 50px;">
        <h3 style="font-family: 'Sora', sans-serif; color: var(--blue-950); margin-bottom: 25px; font-size: 1.4rem; text-align: center;">6-Week Curriculum Structure</h3>
        <div style="overflow-x: auto; background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm);">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem;">
            <thead>
              <tr style="background: var(--blue-900); color: var(--white);">
                <th style="padding: 15px; font-weight: 600;">Timeline</th>
                <th style="padding: 15px; font-weight: 600;">Module Name</th>
                <th style="padding: 15px; font-weight: 600;">Topics & Hands-on Projects Covered</th>
              </tr>
            </thead>
            <tbody>
              ${curriculumRows}
            </tbody>
          </table>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 30px; margin-bottom: 40px;">
        <div style="background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--radius-lg); padding: clamp(20px, 4vw, 30px); box-shadow: var(--shadow-sm);">
          <h3 style="font-family: 'Sora', sans-serif; color: var(--blue-900); margin-bottom: 20px; font-size: 1.2rem; display: flex; align-items: center; gap: 8px; font-weight:800;">
            <span>📈</span> Key Student Outcomes
          </h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${benefitsList}
          </ul>
        </div>

        <div style="background: linear-gradient(135deg, var(--blue-950), var(--blue-900)); color: var(--white); border-radius: var(--radius-lg); padding: clamp(20px, 4vw, 30px); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: center;">
          <h3 style="font-family: 'Sora', sans-serif; color: var(--yellow-400); margin-bottom: 15px; font-size: 1.25rem; font-weight:800;">Future Academic Progression</h3>
          <p style="font-size: 0.95rem; line-height: 1.6; color: rgba(255, 255, 255, 0.85); margin-bottom: 20px;">
            Understanding technological principles before starting Class 9 gives children an immense advantage. It lays the groundwork for high school Computer Applications, supports Science Olympiad research, and trains their brains to break complex problems into simple, logical steps.
          </p>
          <a class="btn-yellow course-city-cta-btn" href="#enroll">${item.ctaText}</a>
        </div>
      </div>
    </div>
  </section>
  `;

  // Inject deepContentHtml right before the FAQ section
  $('#faq').before(deepContentHtml);

  // 6. GEOGRAPHIC & COURSE-RELATION footer links
  // A. Other courses in the SAME city (e.g. if Coding in Lucknow, link to AI in Lucknow)
  const sameCityOtherCourses = courseCityData
    .filter(c => c.cityId === item.cityId && c.courseId !== item.courseId)
    .map(c => `<a href="/cities/${c.cityId}/${c.courseId}/" style="color:var(--yellow-300); text-decoration:underline; font-weight:600; margin-right:15px;">${c.courseName} in ${item.cityName}</a>`)
    .join('');

  // B. Same course in OTHER cities in the SAME cluster (e.g. if Coding in Lucknow, link to Coding in Agra, Bareilly, etc.)
  const currentCityMeta = citiesMetadata.find(c => c.id === item.cityId);
  const currentCluster = currentCityMeta ? currentCityMeta.cluster : null;

  const sameCourseOtherCities = courseCityData
    .filter(c => c.cityId !== item.cityId && c.courseId === item.courseId)
    .filter(c => {
      const targetCityMeta = citiesMetadata.find(cm => cm.id === c.cityId);
      return targetCityMeta && targetCityMeta.cluster === currentCluster;
    })
    .map(c => `<a href="/cities/${c.cityId}/${c.courseId}/" style="color:rgba(255,255,255,0.75); text-decoration:underline; margin-right:15px;">${c.courseName} in ${c.cityName}</a>`)
    .join('');

  const seoFooter = `
  <section class="city-seo-hub" style="padding: 60px 0; background: var(--gray-100); border-top: 1px solid var(--gray-300);">
    <div class="container">
      <div class="text-center fade-up">
        <div class="section-tag"><span class="dot"></span>Local Support</div>
        <h2 class="section-title">Supporting <span>${item.cityName}'s</span> Students</h2>
        <p class="section-sub">Providing top-grade digital classes to school kids across ${item.areas}.</p>
      </div>
      
      <div class="faq-accordion fade-up" style="max-width:800px; margin: 40px auto; background: var(--white); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); padding: clamp(20px, 4vw, 30px);">
        <h3 style="font-family:'Sora',sans-serif; color:var(--blue-900); margin-bottom: 20px; font-size: 1.3rem;">Course FAQ for ${item.cityName} Parents</h3>
        <div style="margin-bottom: 20px; border-bottom: 1px solid var(--gray-100); padding-bottom: 15px;">
          <h4 style="font-size: 1.05rem; color: var(--blue-800); margin-bottom: 8px;">${item.faqQuestion1}</h4>
          <p style="color: var(--gray-600); font-size: 0.95rem; line-height: 1.6;">${item.faqAnswer1}</p>
        </div>
        <div style="padding-bottom: 15px;">
          <h4 style="font-size: 1.05rem; color: var(--blue-800); margin-bottom: 8px;">${item.faqQuestion2}</h4>
          <p style="color: var(--gray-600); font-size: 0.95rem; line-height: 1.6;">${item.faqAnswer2}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="seo-footer-links" style="padding: 40px 0; background: var(--blue-950, #081229); color: var(--white); border-top: 1px solid rgba(255,255,255,0.05);">
    <div class="container">
      <div style="margin-bottom: 20px;">
        <h3 style="margin-bottom:10px; font-family:'Sora',sans-serif; font-size: 1.1rem; color: rgba(255,255,255,0.955); font-weight:800;">Other Programs in ${item.cityName}</h3>
        <div style="display:flex; flex-wrap:wrap; gap: 10px; font-size: 0.9rem;">
          ${sameCityOtherCourses ? sameCityOtherCourses : '<span style="color:rgba(255,255,255,0.5)">More batches launching soon.</span>'}
        </div>
      </div>
      <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;">
      <div>
        <h3 style="margin-bottom:10px; font-family:'Sora',sans-serif; font-size: 1.1rem; color: rgba(255,255,255,0.95); font-weight:800;">Explore ${item.courseName} in Nearby Cities</h3>
        <div style="display:flex; flex-wrap:wrap; gap: 10px; font-size: 0.9rem;">
          ${sameCourseOtherCities ? sameCourseOtherCities : '<span style="color:rgba(255,255,255,0.5)">Regional expansion in progress.</span>'}
        </div>
      </div>
    </div>
  </section>
  `;

  // Inject before the main footer
  $('section').last().after(seoFooter);

  // Write file
  const outDir = path.join(__dirname, '..', 'cities', item.cityId, item.courseId);
  if (!fs.existsSync(outDir)){
      fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, 'index.html');
  fs.writeFileSync(outPath, $.html(), 'utf8');
  console.log(`Generated ${pageUrl}`);
});

// Update sitemap logic cleanly (Prevent duplicates & validate syntax)
const sitemapPath = path.join(__dirname, '../sitemap-course-pages.xml');
let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const $sitemap = cheerio.load(sitemapContent, { xmlMode: true });

let entriesAdded = 0;
generatedUrls.forEach(pageUrl => {
  let exists = false;
  $sitemap('url loc').each((i, el) => {
    if ($sitemap(el).text().trim() === pageUrl) {
      exists = true;
    }
  });

  if (!exists) {
    const today = new Date().toISOString().split('T')[0];
    $sitemap('urlset').append(`  <url>\n    <loc>${pageUrl}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`);
    entriesAdded++;
  }
});

if (entriesAdded > 0) {
  const updatedSitemap = $sitemap.xml();
  fs.writeFileSync(sitemapPath, updatedSitemap, 'utf8');
  console.log(`\nSuccessfully updated sitemap-course-pages.xml with ${entriesAdded} new entries.`);
} else {
  console.log('\nAll Course + City URLs already present in sitemap-course-pages.xml.');
}
