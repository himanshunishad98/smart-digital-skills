const fs = require('fs');
const cheerio = require('cheerio');

// Read the blog index page
let html = fs.readFileSync('blog/index.html', 'utf8');

// Load Cheerio
const $ = cheerio.load(html, { decodeEntities: false });

// 1. Remove embedded style block
$('style').each((i, el) => {
  const content = $(el).html();
  if (content.includes('--blue-900') || content.includes('pt-banner')) {
    $(el).remove();
  }
});

// 2. Fix stylesheet path to point to bundle.min.css
$('link[rel="stylesheet"]').each((i, el) => {
  const href = $(el).attr('href');
  if (href === 'assets/css/bundle.min.css') {
    $(el).attr('href', '../assets/css/bundle.min.css');
  }
});
$('link[rel="preload"][as="style"]').each((i, el) => {
  const href = $(el).attr('href');
  if (href && href.includes('assets/css/bundle.min.css')) {
    $(el).attr('href', '../assets/css/bundle.min.css');
  }
});

// 3. Remove font preload links which have wrong paths in blog
$('link[rel="preload"][as="font"]').remove();

// 4. Remove GTM and Meta Pixel script tags from head (they are dynamically handled or can be cleaned up)
// Actually we can keep GTM / Meta Pixel in head as long as they are clean. But we should remove duplicates.
// Clean up duplicate titles
$('title').remove();
$('head').prepend('<title>SkillNest Blog | Digital Skills, AI &amp; Coding for Kids in India</title>');

// 5. Update meta canonical and details
$('link[rel="canonical"]').attr('href', 'https://skillnest.co.in/blog/');
$('meta[name="description"]').attr('content', 'Expert blog articles on AI for kids, digital skills, coding, internet safety, and STEM learning. SkillNest helps Class 6-8 students across India build future-ready skills.');
$('meta[name="author"]').attr('content', 'SkillNest');

// OG tags
$('meta[property="og:url"]').attr('content', 'https://skillnest.co.in/blog/');
$('meta[property="og:title"]').attr('content', 'SkillNest Blog | Digital Skills, AI &amp; Coding for Kids');
$('meta[property="og:description"]').attr('content', 'Expert blog articles on AI for kids, digital skills, coding, internet safety, and STEM learning for school students.');
$('meta[name="twitter:url"]').attr('content', 'https://skillnest.co.in/blog/');
$('meta[name="twitter:title"]').attr('content', 'SkillNest Blog | Digital Skills, AI &amp; Coding for Kids');
$('meta[name="twitter:description"]').attr('content', 'Expert blog articles on AI for kids, digital skills, coding, internet safety, and STEM learning for school students.');

// Remove existing inline script schemas so we can clean up and rebuild
$('script[type="application/ld+json"]').remove();

// 6. Injects Schemas
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skillnest.co.in/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://skillnest.co.in/blog/" }
  ]
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://skillnest.co.in/blog/",
  "name": "SkillNest Blog | Digital Skills, AI & Coding for Kids",
  "description": "Expert articles on AI for kids, digital skills, coding, internet safety, and STEM learning for Class 6-8 students across India.",
  "url": "https://skillnest.co.in/blog/",
  "isPartOf": { "@type": "WebSite", "url": "https://skillnest.co.in" },
  "breadcrumb": { "@id": "https://skillnest.co.in/blog/#breadcrumb" },
  "publisher": { "@type": "Organization", "name": "SkillNest" }
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "SkillNest Blog Articles",
  "description": "Collection of educational blog articles for parents and students on digital skills, AI, coding, and internet safety.",
  "numberOfItems": 10,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "url": "https://skillnest.co.in/blog/ai-for-kids/", "name": "Why Kids Should Learn AI Early" },
    { "@type": "ListItem", "position": 2, "url": "https://skillnest.co.in/blog/digital-skills/", "name": "Essential Digital Skills Every Middle School Student Needs" },
    { "@type": "ListItem", "position": 3, "url": "https://skillnest.co.in/blog/screen-time/", "name": "Productive Screen Time Ideas for Kids" },
    { "@type": "ListItem", "position": 4, "url": "https://skillnest.co.in/blog/productivity-skills/", "name": "How to Build Productivity Skills in Kids with Technology" },
    { "@type": "ListItem", "position": 5, "url": "https://skillnest.co.in/blog/coding-for-kids/", "name": "Why Coding for Kids Matters: A Parent's Complete Guide" },
    { "@type": "ListItem", "position": 6, "url": "https://skillnest.co.in/blog/internet-safety/", "name": "Internet Safety for Kids: What Every Parent Must Know" },
    { "@type": "ListItem", "position": 7, "url": "https://skillnest.co.in/blog/school-education/", "name": "How Digital Skills Are Transforming School Education in India" },
    { "@type": "ListItem", "position": 8, "url": "https://skillnest.co.in/blog/stem-learning/", "name": "STEM Learning for Kids: Building Tomorrow's Problem Solvers" },
    { "@type": "ListItem", "position": 9, "url": "https://skillnest.co.in/blog/ai-vs-coding/", "name": "AI vs Coding for Kids: Which Should Your Child Learn First?" },
    { "@type": "ListItem", "position": 10, "url": "https://skillnest.co.in/blog/coding-vs-digital-skills/", "name": "Coding vs Digital Skills: What's the Difference and Why Both Matter" }
  ]
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What topics does the SkillNest Blog cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The SkillNest Blog covers key topics in 21st-century child education, including artificial intelligence (AI) literacy for kids, computational thinking, MIT Coding Program guides, screen time management, school digital education trends, and online safety tips for parents."
      }
    },
    {
      "@type": "Question",
      "name": "How does early AI and coding education benefit middle school students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Early education in AI and coding helps students in Class 6-8 build critical thinking, problem-solving, and logical reasoning skills. It aligns with NEP 2020 guidelines and ensures students are prepared for digital classrooms, high school computer science, and future careers."
      }
    },
    {
      "@type": "Question",
      "name": "Can parents without technical backgrounds use these guides?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. All our articles are written in plain, jargon-free English specifically for parents. We provide actionable steps, home study agreements, device setup rules, and safety checklists that any parent can easily implement at home."
      }
    },
    {
      "@type": "Question",
      "name": "Are the tools recommended in the blog free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we prioritize open-source and free educational platforms. Most coding guides use MIT Scratch, typing exercises use free typing tutors, and safety guidelines apply to standard free browser controls and child-safe AI access methods."
      }
    }
  ]
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization","LocalBusiness"],
  "@id": "https://skillnest.co.in/#organization",
  "name": "SkillNest",
  "alternateName": "Smart Digital Skills",
  "url": "https://skillnest.co.in",
  "logo": {
    "@type": "ImageObject",
    "url": "https://skillnest.co.in/assets/skillnest-logo.png",
    "width": 200,
    "height": 60
  },
  "description": "SkillNest is India's premier online digital skills and AI program for Class 6–8 students. The 6-week live curriculum covers computer basics, MS Office, cyber safety, Coding Program, and practical AI tools taught by expert instructors.",
  "foundingDate": "2023",
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": 10 },
  "areaServed": { "@type": "Country", "name": "India" },
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student",
    "audienceType": "Middle School Students (Class 6–8)"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "availableLanguage": ["English", "Hindi"],
    "contactOption": "TollFree"
  },
  "sameAs": [
    "https://www.youtube.com/@SkillNestIndia",
    "https://www.instagram.com/skillnest.india"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "247",
    "bestRating": "5",
    "worstRating": "1"
  }
};

$('head').append(`
<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
<script type="application/ld+json">${JSON.stringify(webPageSchema)}</script>
<script type="application/ld+json">${JSON.stringify(itemListSchema)}</script>
<script type="application/ld+json">${JSON.stringify(faqPageSchema)}</script>
<script type="application/ld+json">${JSON.stringify(organizationSchema)}</script>
`);

// 7. Clean up hardcoded headers and mobile navs
$('header').replaceWith('<header class="header" id="mainHeader" data-dynamic-component="header"></header>');
$('.mobile-nav-menu').replaceWith('<div class="mobile-nav-menu" id="mobileNavMenu" data-dynamic-component="mobile-menu"></div>');
$('footer').replaceWith('<footer class="footer" id="mainFooter" data-dynamic-component="footer"></footer>');

// Clean up breadcrumb
$('nav[aria-label="Breadcrumb"]').replaceWith(`
<!-- BREADCRUMB -->
<nav aria-label="Breadcrumb" class="breadcrumb-nav">
  <div class="container">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item"><a href="../index.html" class="breadcrumb-link">Home</a></li>
      <li class="breadcrumb-sep">›</li>
      <li class="breadcrumb-item breadcrumb-current">Blog</li>
    </ol>
  </div>
</nav>
`);

// Remove any duplicate personality test banners if they exist or clean up the main one
// Let's replace #ptBanner with the standard dynamic personality test banner marker or structure it correctly.
// Actually, on the overview page, we keep the #ptBanner section but make sure it uses clean CSS classes and is correct.
// We can structure the ptBanner cleanly.
const ptBanner = $('#ptBanner');
if (ptBanner.length) {
  // Let's make sure it has correct classes and matches existing styling
  ptBanner.find('.pt-inner').attr('style', '');
  ptBanner.find('.pt-content').attr('style', '');
  ptBanner.find('.pt-cta-row').attr('style', '');
  ptBanner.find('.pt-cards').attr('style', '');
}

// 8. Rebuild the main content area with a beautiful why-grid of 10 approved articles
const mainContent = `
<main class="article-main">
  <!-- Core Articles Grid -->
  <section class="why-section">
    <div class="container">
      <div class="section-tag"><span class="dot"></span>Expert Articles</div>
      <h2 class="section-title">Essential Parent Guides &amp; <span>Articles</span></h2>
      <div class="why-grid">
        <div class="why-card">
          <div class="why-card-icon">🤖</div>
          <h3 class="why-card-title">Why Kids Should Learn AI Early</h3>
          <p class="why-card-desc">Understanding what artificial intelligence literacy means for Class 6-8 students and why early exposure creates lasting advantages.</p>
          <a href="ai-for-kids/" class="btn-outline">Read Article →</a>
        </div>
        <div class="why-card">
          <div class="why-card-icon">📊</div>
          <h3 class="why-card-title">Essential Digital Skills for Kids</h3>
          <p class="why-card-desc">Discover the 5 foundational digital competencies (typing, Excel, Word, coding, AI) every middle school student needs for academic success.</p>
          <a href="digital-skills/" class="btn-outline">Read Article →</a>
        </div>
        <div class="why-card">
          <div class="why-card-icon">⏱️</div>
          <h3 class="why-card-title">Productive Screen Time Ideas</h3>
          <p class="why-card-desc">How to turn passive device consumption into active creation. Age-based guidelines and daily screen limits for Indian families.</p>
          <a href="screen-time/" class="btn-outline">Read Article →</a>
        </div>
        <div class="why-card">
          <div class="why-card-icon">📈</div>
          <h3 class="why-card-title">Building Productivity Skills</h3>
          <p class="why-card-desc">Excel sheets, document formatting, and email basics. How students use technology to organize studies and complete homework in half the time.</p>
          <a href="productivity-skills/" class="btn-outline">Read Article →</a>
        </div>
        <div class="why-card">
          <div class="why-card-icon">💻</div>
          <h3 class="why-card-title">Why Coding for Kids Matters</h3>
          <p class="why-card-desc">A complete parent's guide to Scratch vs Python, computational thinking benefits, and aligning with NEP 2020 mandates from Class 6.</p>
          <a href="coding-for-kids/" class="btn-outline">Read Article →</a>
        </div>
        <div class="why-card">
          <div class="why-card-icon">🔒</div>
          <h3 class="why-card-title">Internet Safety for Kids</h3>
          <p class="why-card-desc">Critical guidelines for parents on device privacy settings, social media security, recognizing cyber threats, and digital footprint protection.</p>
          <a href="internet-safety/" class="btn-outline">Read Article →</a>
        </div>
        <div class="why-card">
          <div class="why-card-icon">🏫</div>
          <h3 class="why-card-title">Transforming School Education</h3>
          <p class="why-card-desc">How schools in Delhi, Mumbai, and Bangalore are adopting technology, and how parents can bridge the gap between theory and practical skills.</p>
          <a href="school-education/" class="btn-outline">Read Article →</a>
        </div>
        <div class="why-card">
          <div class="why-card-icon">🔬</div>
          <h3 class="why-card-title">STEM Learning for Kids</h3>
          <p class="why-card-desc">Building tomorrow's problem solvers. How coding logic and science concepts combine to train analytical thinking in middle schoolers.</p>
          <a href="stem-learning/" class="btn-outline">Read Article →</a>
        </div>
        <div class="why-card">
          <div class="why-card-icon">🤖</div>
          <h3 class="why-card-title">AI vs Coding for Kids</h3>
          <p class="why-card-desc">Which subject should your child learn first? An objective comparison of block coding benefits versus AI prompt engineering literacy.</p>
          <a href="ai-vs-coding/" class="btn-outline">Read Article →</a>
        </div>
        <div class="why-card">
          <div class="why-card-icon">📝</div>
          <h3 class="why-card-title">Coding vs Digital Skills</h3>
          <p class="why-card-desc">What is the difference, and why does your child need both? A detailed breakdown of foundational digital literacy versus program development.</p>
          <a href="coding-vs-digital-skills/" class="btn-outline">Read Article →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Regional SEO GEO Articles Section -->
  <section class="why-section-alt">
    <div class="container">
      <div class="section-tag"><span class="dot"></span>Regional Guides</div>
      <h2 class="section-title">State &amp; City <span>Educational Insights</span></h2>
      <div class="why-grid">
        <div class="why-card">
          <h3 class="why-card-title">AI Opportunities in Punjab</h3>
          <p class="why-card-desc">Best computer literacy and AI learning programs for Class 6-8 students in Ludhiana, Amritsar, and Jalandhar.</p>
          <a href="ai-learning-punjab/" class="btn-outline">Read Guide</a>
        </div>
        <div class="why-card">
          <h3 class="why-card-title">Coding in Ladakh</h3>
          <p class="why-card-desc">Why digital skills and Scratch programming are vital for students preparing for high school in Ladakh.</p>
          <a href="coding-ladakh/" class="btn-outline">Read Guide</a>
        </div>
        <div class="why-card">
          <h3 class="why-card-title">Computational Thinking in Arunachal</h3>
          <p class="why-card-desc">Empowering student logic through Scratch game development and design programs across Arunachal Pradesh.</p>
          <a href="computational-thinking-arunachal/" class="btn-outline">Read Guide</a>
        </div>
        <div class="why-card">
          <h3 class="why-card-title">Digital Growth in Jammu &amp; Kashmir</h3>
          <p class="why-card-desc">How school IT labs are evolving and what safety protocols parents in Jammu &amp; Srinagar should implement.</p>
          <a href="digital-education-jk/" class="btn-outline">Read Guide</a>
        </div>
        <div class="why-card">
          <h3 class="why-card-title">Himachal Pradesh Digital Trends</h3>
          <p class="why-card-desc">Insights into computer classes, typing fluency, and NEP-aligned syllabus updates in Himachal Pradesh schools.</p>
          <a href="education-himachal/" class="btn-outline">Read Guide</a>
        </div>
        <div class="why-card">
          <h3 class="why-card-title">Sikkim STEM Education Hubs</h3>
          <p class="why-card-desc">Finding verified coding programs and hands-on science activities for middle schoolers in Sikkim.</p>
          <a href="stem-sikkim/" class="btn-outline">Read Guide</a>
        </div>
        <div class="why-card">
          <h3 class="why-card-title">Excel &amp; Data for Middle School</h3>
          <p class="why-card-desc">How learning spreadsheet basics early makes science tables and math tracking fun and academic-ready.</p>
          <a href="excel-for-students/" class="btn-outline">Read Guide</a>
        </div>
        <div class="why-card">
          <h3 class="why-card-title">Skills Schools Don't Teach</h3>
          <p class="why-card-desc">Understanding the gap between school IT classes and functional real-world typing, Office, and AI skills.</p>
          <a href="skills-schools-miss/" class="btn-outline">Read Guide</a>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section (Visible Accordions) -->
  <section class="why-section">
    <div class="container">
      <div class="section-tag"><span class="dot"></span>FAQ</div>
      <h2 class="section-title">Frequently Asked Questions</h2>
      <div class="faq-list">
        <div class="faq-item fade-up">
          <div class="faq-q" onclick="toggleFaq(this)">
            <span>What topics does the SkillNest Blog cover?</span>
            <span class="faq-arrow">+</span>
          </div>
          <div class="faq-a"><p>The SkillNest Blog covers key topics in 21st-century child education, including artificial intelligence (AI) literacy for kids, computational thinking, MIT Coding Program guides, screen time management, school digital education trends, and online safety tips for parents.</p></div>
        </div>
        <div class="faq-item fade-up">
          <div class="faq-q" onclick="toggleFaq(this)">
            <span>How does early AI and coding education benefit middle school students?</span>
            <span class="faq-arrow">+</span>
          </div>
          <div class="faq-a"><p>Early education in AI and coding helps students in Class 6-8 build critical thinking, problem-solving, and logical reasoning skills. It aligns with NEP 2020 guidelines and ensures students are prepared for digital classrooms, high school computer science, and future careers.</p></div>
        </div>
        <div class="faq-item fade-up">
          <div class="faq-q" onclick="toggleFaq(this)">
            <span>Can parents without technical backgrounds use these guides?</span>
            <span class="faq-arrow">+</span>
          </div>
          <div class="faq-a"><p>Absolutely. All our articles are written in plain, jargon-free English specifically for parents. We provide actionable steps, home study agreements, device setup rules, and safety checklists that any parent can easily implement at home.</p></div>
        </div>
        <div class="faq-item fade-up">
          <div class="faq-q" onclick="toggleFaq(this)">
            <span>Are the tools recommended in the blog free to use?</span>
            <span class="faq-arrow">+</span>
          </div>
          <div class="faq-a"><p>Yes, we prioritize open-source and free educational platforms. Most coding guides use MIT Scratch, typing exercises use free typing tutors, and safety guidelines apply to standard free browser controls and child-safe AI access methods.</p></div>
        </div>
      </div>
    </div>
  </section>
</main>
`;

$('main').replaceWith(mainContent);

// Remove all inline style="" attributes except GTM and Pixel
$('*').each((i, el) => {
  const style = $(el).attr('style');
  if (style) {
    const keep = [
      'display:none;visibility:hidden',
      'display:none',
      'position:absolute;width:1px',
    ];
    let matched = false;
    for (const k of keep) {
      if (style.includes(k)) {
        matched = true;
        break;
      }
    }
    if (!matched) {
      $(el).removeAttr('style');
    }
  }
});

// Write the result back to blog/index.html
fs.writeFileSync('blog/index.html', $.html(), 'utf8');
console.log('Successfully upgraded blog/index.html!');
