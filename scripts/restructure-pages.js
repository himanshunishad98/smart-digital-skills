const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const rootDir = path.join(__dirname, '../');

function fixHeadingJumps($) {
  // 1. Fix AEO Summary Box heading jumps (H3 to H2)
  $('.aeo-summary-box h3').each((i, el) => {
    const $el = $(el);
    const h2 = $('<h2>').html($el.html());
    const attrs = el.attribs;
    for (const attr in attrs) {
      h2.attr(attr, attrs[attr]);
    }
    $el.replaceWith(h2);
  });

  // 2. Change H4 card headings to sequential H3 headings
  $('h4').each((i, el) => {
    const $el = $(el);
    const h3 = $('<h3>').html($el.html());
    const attrs = el.attribs;
    for (const attr in attrs) {
      h3.attr(attr, attrs[attr]);
    }
    $el.replaceWith(h3);
  });
}

const pages = [
  {
    file: 'index.html',
    aeoTitle: '🤖 Quick Summary (AI Overview)',
    aeoText: '<strong>SkillNest</strong> is India\'s premier online digital skills and introductory AI program specifically designed for Class 6–8 students. The comprehensive 6-week curriculum covers computer basics, MS Office, cyber safety, Coding Program, and practical AI tools. Through live, project-based learning, students transition from passive technology consumers to active digital creators.',
    aeoFacts: [
      { label: 'Program Name:', value: 'SkillNest — India\'s Digital Skills Program' },
      { label: 'Target Age:', value: 'Class 6–8 students (Middle School)' },
      { label: 'Duration:', value: '6 Weeks (Live online interactive classes)' },
      { label: 'Key Tools Taught:', value: 'Scratch, ChatGPT, Excel, PowerPoint, Canva' }
    ]
  },
  {
    file: 'computer-classes.html',
    aeoTitle: '💻 Computer Classes Quick Summary',
    aeoText: '<strong>SkillNest\'s</strong> online computer classes for Class 6–8 students provide a 100% practical, project-based learning experience. The curriculum teaches foundational digital literacy, including touch typing, operating system file management, internet safety, and essential Microsoft Office tools (Word, Excel, PowerPoint). This program equips students with the technical confidence required for school and future academic success.',
    aeoFacts: [
      { label: 'Course focus:', value: 'Practical Computer Basics & MS Office' },
      { label: 'Target Age:', value: 'Class 6–8 students (10–14 years)' },
      { label: 'Core Tools:', value: 'MS Word, MS Excel, MS PowerPoint, Windows/Mac OS' },
      { label: 'Outcomes:', value: 'Independent school projects, 30+ WPM typing speed, secure web navigation' }
    ]
  },
  {
    file: 'coding-classes.html',
    aeoTitle: '🚀 Coding Classes Quick Summary',
    aeoText: '<strong>SkillNest\'s</strong> online coding classes introduce school students to block-based programming via Scratch and algorithmic logic. Tailored for Class 6–8 learners, this hands-on course guides kids through building interactive games, stories, and animations. The class prioritizes computational reasoning and problem-solving over rote code typing.',
    aeoFacts: [
      { label: 'Course focus:', value: 'Coding Program & Algorithmic Logic' },
      { label: 'Target Age:', value: 'Class 6–8 (Middle School Beginners)' },
      { label: 'Core Tools:', value: 'Scratch Studio, block-based logic, animations' },
      { label: 'Outcomes:', value: 'Personal 2D game portfolio, computational reasoning, problem solving' }
    ]
  },
  {
    file: 'summer-course-for-kids.html',
    aeoTitle: '☀️ Summer Bootcamp Quick Summary',
    aeoText: 'The <strong>SkillNest Summer Digital Skills Course</strong> is a 6-week intensive online camp designed to turn middle school screen time into productive skill-building. Covering touch typing, MS Office, cyber safety, Coding Program, and basic AI prompting, this course ensures Class 6–8 kids get a technical head-start during vacations.',
    aeoFacts: [
      { label: 'Course focus:', value: 'Summer Digital Skills Bootcamp' },
      { label: 'Target Age:', value: 'Class 6–8 students (10–14 years)' },
      { label: 'Bootcamp Duration:', value: '6 Weeks (Summer batch slots)' },
      { label: 'Core Skills:', value: 'MS Office, Scratch, AI prompting, Canva graphics' }
    ]
  },
  {
    file: 'ai-coding-classes-near-me.html',
    aeoTitle: '📍 AI & Coding Classes Quick Summary',
    aeoText: '<strong>SkillNest</strong> offers top-rated online AI and coding classes for school students, aligned with NEP 2020. This 6-week interactive course covers coding logic, productivity applications, cyber hygiene, and child-safe AI tools. With small batch sizes, we bring premium technical education directly to homes across all major cities.',
    aeoFacts: [
      { label: 'Course focus:', value: 'AI, Coding & Digital Skills near me' },
      { label: 'Target Age:', value: 'Class 6–8 students (Middle School)' },
      { label: 'Mode:', value: 'Live Online (Interactive batches of 12)' },
      { label: 'Core Focus:', value: 'Introductory AI prompting, Scratch logic, cyber safety' }
    ]
  },
  // Injections for the static state city index pages
  {
    file: 'cities/punjab/index.html',
    aeoTitle: '🤖 Quick Summary (AI Overview)',
    aeoText: '<strong>SkillNest</strong> provides top-rated online coding, computer basics, and AI classes for Class 6–8 students in Punjab, including Ludhiana, Amritsar, and Jalandhar. The 6-week practical program focuses on real digital creation.',
    aeoFacts: [
      { label: 'Course focus:', value: 'Coding Program, MS Office & AI Tools' },
      { label: 'Target Age:', value: 'Class 6–8 students (10–14 years)' },
      { label: 'Mode:', value: 'Online (Live interactive classes)' },
      { label: 'Locations Served:', value: 'Ludhiana, Amritsar, Jalandhar & other regions' }
    ]
  }
];

pages.forEach(p => {
  const filePath = path.join(rootDir, p.file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });

  // 1. Semantic landmarks: Wrap direct sections in <main>
  const directSections = $('body > section');
  if (directSections.length && !$('body > main').length) {
    directSections.wrapAll('<main></main>');
    console.log(`Wrapped sections in <main> for: ${p.file}`);
  }

  // 2. Add explicit width and height to founder.jpeg
  $('img[src*="founder.jpeg"]').each((i, el) => {
    $(el).attr('width', '400');
    $(el).attr('height', '400');
    $(el).attr('loading', 'lazy');
  });

  // 3. Fix classroom screenshot in ai-coding-classes-near-me.html
  if (p.file === 'ai-coding-classes-near-me.html') {
    $('img[src*="classroom_screenshot.png"]').each((i, el) => {
      $(el).attr('width', '800');
      $(el).attr('height', '450');
      $(el).attr('loading', 'lazy');
    });
  }

  // 4. Inject AEO Summary Box under the hero section
  const heroSection = $('section.hero');
  if (heroSection.length && !$('.aeo-summary-box').length) {
    let factsHtml = '';
    p.aeoFacts.forEach(f => {
      factsHtml += `
      <tr style="border-bottom: 1px solid var(--gray-100);">
        <td style="padding: 8px 0; font-weight: bold; color: var(--blue-900); width: 140px; font-size: 0.88rem;">${f.label}</td>
        <td style="padding: 8px 0; color: var(--gray-700); font-size: 0.88rem;">${f.value}</td>
      </tr>`;
    });

    const aeoBox = `
    <!-- AEO / GEO QUICK SUMMARY & KEY TAKEAWAYS -->
    <section class="aeo-summary-box" style="padding: 40px 0; background: var(--blue-50); border-bottom: 1px solid var(--gray-200); position: relative; z-index: 10;">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 30px; align-items: start;" class="aeo-grid">
          <!-- Quick Answer -->
          <div style="background: var(--white); border-radius: var(--radius-md); padding: 25px; box-shadow: var(--shadow-sm); border-left: 5px solid var(--blue-600);">
            <h2 style="font-family: 'Sora', sans-serif; color: var(--blue-900); font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; font-weight: 800;">
              ${p.aeoTitle}
            </h2>
            <p style="font-size: 0.95rem; color: var(--gray-700); line-height: 1.6; margin: 0;">
              ${p.aeoText}
            </p>
          </div>
          <!-- Key Takeaways & Citation Details -->
          <div style="background: var(--white); border-radius: var(--radius-md); padding: 25px; box-shadow: var(--shadow-sm); border-left: 5px solid var(--yellow-400);">
            <h2 style="font-family: 'Sora', sans-serif; color: var(--blue-900); font-size: 1.1rem; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; font-weight: 800;">
              <span>📋</span> Key Facts
            </h2>
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
              <tbody>
                ${factsHtml}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
    `;

    heroSection.after(aeoBox);
    console.log(`Injected AEO Summary Box for: ${p.file}`);
  }

  // 5. Convert flexbox comparison table to HTML table
  const compTable = $('.comparison-table');
  if (compTable.length) {
    compTable.replaceWith(`
    <div class="comparison-table-wrap fade-up" style="max-width: 800px; margin: 30px auto 0; overflow-x: auto; background: var(--white); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); border: 1px solid var(--gray-100);">
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-family: 'Nunito', sans-serif;">
        <thead>
          <tr style="background: var(--gray-100);">
            <th style="padding: 16px 20px; font-family: 'Sora', sans-serif; font-weight: 800; color: var(--gray-700); font-size: 0.95rem; border-bottom: 2px solid var(--gray-200);">✗ Traditional Computer Classes</th>
            <th style="padding: 16px 20px; font-family: 'Sora', sans-serif; font-weight: 800; color: var(--green-500); font-size: 0.95rem; border-bottom: 2px solid var(--gray-200);">✅ SkillNest Approach</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid var(--gray-100);">
            <td style="padding: 16px 20px; color: var(--gray-500); font-size: 0.95rem;">Theory-based, learning from textbooks</td>
            <td style="padding: 16px 20px; font-weight: bold; color: var(--blue-900); font-size: 0.95rem;">100% Practical, project-based learning</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--gray-100);">
            <td style="padding: 16px 20px; color: var(--gray-500); font-size: 0.95rem;">Limited lab practice time</td>
            <td style="padding: 16px 20px; font-weight: bold; color: var(--blue-900); font-size: 0.95rem;">Daily hands-on classes from home</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--gray-100);">
            <td style="padding: 16px 20px; color: var(--gray-500); font-size: 0.95rem;">No real-world project output</td>
            <td style="padding: 16px 20px; font-weight: bold; color: var(--blue-900); font-size: 0.95rem;">Build a personal digital portfolio</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--gray-100);">
            <td style="padding: 16px 20px; color: var(--gray-500); font-size: 0.95rem;">Rote learning of UI menu locations</td>
            <td style="padding: 16px 20px; font-weight: bold; color: var(--blue-900); font-size: 0.95rem;">Problem-solving & design-thinking</td>
          </tr>
          <tr>
            <td style="padding: 16px 20px; color: var(--gray-500); font-size: 0.95rem;">No exposure to AI or modern tech</td>
            <td style="padding: 16px 20px; font-weight: bold; color: var(--blue-900); font-size: 0.95rem;">AI prompting & digital safety included</td>
          </tr>
        </tbody>
      </table>
    </div>
    `);
    console.log(`Converted comparison table to <table> for: ${p.file}`);
  }

  // 6. Inject FAQ Page schema & OG/Twitter tags specifically for ai-coding-classes-near-me.html
  if (p.file === 'ai-coding-classes-near-me.html') {
    const nearMeFaq = {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is eligible to join the classes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Any middle-school student currently in Class 6, 7, or 8 (ages 10 to 14) is welcome. The curriculum is optimized specifically for this age group to match NCERT benchmarks."
          }
        },
        {
          "@type": "Question",
          "name": "What is the duration of the program?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The program runs for 6 weeks, consisting of structured interactive live sessions. We offer both daily weekday batches and compressed weekend batches to fit school routines."
          }
        },
        {
          "@type": "Question",
          "name": "Will my child receive a certificate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Every student who builds their project portfolios receives an official Completion Certificate, which can be showcased in school portfolios."
          }
        },
        {
          "@type": "Question",
          "name": "How are online classes structured to keep kids focused?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We limit batches to 12 students.Tutors verify student progress through live screen-sharing and interactive code challenges, ensuring children are actively building instead of passively listening."
          }
        }
      ]
    };

    const scriptTag = $('script[type="application/ld+json"]').filter((i, el) => {
      return $(el).html().includes('"@graph"');
    }).first();

    if (scriptTag.length) {
      try {
        const schema = JSON.parse(scriptTag.html());
        if (schema && schema['@graph']) {
          // Filter out existing FAQPage if any
          schema['@graph'] = schema['@graph'].filter(item => item['@type'] !== 'FAQPage');
          schema['@graph'].push(nearMeFaq);
          scriptTag.html(JSON.stringify(schema, null, 2));
          console.log(`Successfully merged FAQ schema in ${p.file}`);
        }
      } catch (e) {
        console.error('Failed to parse and append FAQ to schema in near-me page', e);
      }
    }

    if (!$('meta[property="og:title"]').length) {
      $('head').append('\n<meta property="og:title" content="Practical Coding and AI Classes for Kids | SkillNest">');
    }
    if (!$('meta[name="twitter:card"]').length) {
      $('head').append('\n<meta name="twitter:card" content="summary_large_image">');
    }
  }

  fixHeadingJumps($);
  fs.writeFileSync(filePath, $.html(), 'utf8');
});

// Wrap minor supporting pages in <main> and update images
const supportingPages = [
  'b2b-schools.html',
  'parent-testimonials.html',
  'blog.html',
  'resources/cbse-resources/ncert-books/index.html',
  'resources/cbse-resources/class-1/index.html',
  'resources/cbse-resources/class-2/index.html',
  'resources/cbse-resources/class-3/index.html',
  'resources/cbse-resources/class-4/index.html',
  'resources/cbse-resources/class-5/index.html',
  'resources/cbse-resources/class-6/index.html',
  'resources/cbse-resources/class-7/index.html',
  'resources/cbse-resources/class-8/index.html',
  'resources/cbse-resources/class-9/index.html',
  'resources/cbse-resources/class-10/index.html',
  'resources/cbse-resources/class-11/index.html',
  'resources/cbse-resources/class-12/index.html'
];

supportingPages.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });

  // Wrap direct sections in <main>
  const directSections = $('body > section');
  if (directSections.length && !$('body > main').length) {
    directSections.wrapAll('<main></main>');
    console.log(`Wrapped sections in <main> for supporting: ${file}`);
  }

  // Explicit sizes to founder image
  $('img[src*="founder.jpeg"]').each((i, el) => {
    $(el).attr('width', '400');
    $(el).attr('height', '400');
    $(el).attr('loading', 'lazy');
  });

  // Inject FAQ Schema to resources/ncert-books.html if needed
  if (file === 'resources/cbse-resources/ncert-books/index.html') {
    const ncertFaq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are these NCERT books official and free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. All NCERT book PDFs are sourced directly from ncert.nic.in, the official website of the National Council of Educational Research and Training. They are completely free to download."
          }
        },
        {
          "@type": "Question",
          "name": "Which classes have NCERT Exemplar books?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "NCERT Exemplar books are available for Classes 6 to 12. They cover Mathematics and Science for Classes 6–10, and Mathematics, Physics, Chemistry, and Biology for Classes 11–12."
          }
        },
        {
          "@type": "Question",
          "name": "How is SkillNest different from just downloading NCERT PDFs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SkillNest provides expert-led live online classes where students learn practical digital skills alongside their NCERT curriculum. While NCERT books provide the theory, SkillNest ensures students apply and understand concepts through hands-on, interactive sessions."
          }
        },
        {
          "@type": "Question",
          "name": "Can I download all chapters of a book at once?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Currently, NCERT books are available as chapter-wise PDFs. Each book card shows all individual chapter download links. You can download them one by one from the class pages."
          }
        },
        {
          "@type": "Question",
          "name": "Are these books aligned with the latest CBSE syllabus?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all books are from the latest NCERT edition aligned with the CBSE 2025–26 syllabus. NCERT regularly updates their textbooks; these PDFs reflect the current curriculum."
          }
        }
      ]
    };

    const hasFaqSchema = $('script[type="application/ld+json"]').filter((i, el) => $(el).html().includes('FAQPage')).length > 0;
    if (!hasFaqSchema) {
      $('head').append(`\n<script type="application/ld+json">\n${JSON.stringify(ncertFaq, null, 2)}\n</script>\n`);
      console.log(`Injected FAQPage schema to ${file}`);
    }
  }

  // Convert H3 elements to H2 elements for blog.html and student-projects.html to resolve heading level jump
  if (file === 'blog.html' || file === 'student-projects.html') {
    $('h3').each((i, el) => {
      const $el = $(el);
      const h2 = $('<h2>').html($el.html());
      const attrs = el.attribs;
      for (const attr in attrs) {
        h2.attr(attr, attrs[attr]);
      }
      $el.replaceWith(h2);
    });
    console.log(`Changed H3 tags to H2 in ${file} to fix heading hierarchy`);
  }

  fixHeadingJumps($);
  fs.writeFileSync(filePath, $.html(), 'utf8');
});

// Process all blog files to wrap in <main> and fix the "Lead Educator at ." missing brand name
const files = fs.readdirSync(rootDir);
files.forEach(file => {
  if (file.startsWith('blog-') && file.endsWith('.html')) {
    const filePath = path.join(rootDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Fix the "Lead Educator at ." text
    html = html.replace(/Lead Educator at \./g, 'Lead Educator at <span class="brand-name"></span>.');
    
    const $ = cheerio.load(html, { decodeEntities: false });
    
    // Ensure founder image has explicit sizes
    $('img[src*="founder.jpeg"]').each((i, el) => {
      $(el).attr('width', '400');
      $(el).attr('height', '400');
      $(el).attr('loading', 'lazy');
    });

    fixHeadingJumps($);
    fs.writeFileSync(filePath, $.html(), 'utf8');
    console.log(`Fixed educator bio and image sizes in: ${file}`);
  }
});

console.log('=== PAGES RESTRUCTURING COMPLETE ===');
