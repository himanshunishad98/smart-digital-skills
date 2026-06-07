const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');
const { SITE_CONFIG } = require('../assets/js/config.js');

const baseHtmlPath = path.join(__dirname, '../courses/computer/index.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

const cities = [
  { id: 'bhilai', name: 'Bhilai', localPhrase: 'Bhilai\'s top-rated', mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41709427902!2d81.25838573199852!3d21.212061099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a293ccce52af29d%3A0xe510a7674dc0579e!2sBhilai%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1715873103444!5m2!1sen!2sin' },
  { id: 'bhilai-nagar', name: 'Bhilai Nagar', localPhrase: 'Bhilai Nagar\'s premier', mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41709427902!2d81.25838573199852!3d21.212061099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a293ccce52af29d%3A0xe510a7674dc0579e!2sBhilai%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1715873103444!5m2!1sen!2sin' },
  { id: 'durg', name: 'Durg', localPhrase: 'Durg\'s trusted', mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59546.591244099516!2d81.24233775199652!3d21.185675545229615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a29235e1654a933%3A0xc3cf3f99017f8a7e!2sDurg%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1715873200924!5m2!1sen!2sin' },
  { id: 'raipur', name: 'Raipur', localPhrase: 'Raipur\'s leading', mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118985.34005085427!2d81.5623835619379!3d21.261899130765964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dda23be28229%3A0x163ee120469ee95c!2sRaipur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1715873229643!5m2!1sen!2sin' }
];

const topics = [
  {
    id: 'computer-classes',
    title: 'Computer Classes',
    h1Base: 'Best Computer Classes for Kids in',
    keyword: 'computer institute',
    descriptionBase: 'Enroll your child in the best computer classes in {city}. Learn MS Office, typing, file management, and digital skills.',
    heroSubBase: 'Help your child in {city} build practical digital skills and computer basics in just 6 weeks.',
    testimonialPrefix: 'My daughter started learning basic computer operations here in {city}',
    benefits: ['Create Presentations', 'Use Excel Basics', 'Improve Typing Skills']
  },
  {
    id: 'ai-classes',
    title: 'AI Classes',
    h1Base: 'Best AI Classes for School Students in',
    keyword: 'AI learning classes',
    descriptionBase: 'Discover top AI classes for kids in {city}. Introduce your child to artificial intelligence, prompt engineering, and smart digital tools.',
    heroSubBase: 'Prepare your child in {city} for the future with our interactive AI and digital tools program.',
    testimonialPrefix: 'The AI classes in {city} completely changed my son\'s perspective on technology',
    benefits: ['Learn AI Tools', 'Prompt Engineering', 'Build AI Projects']
  },
  {
    id: 'coding-classes',
    title: 'Coding Classes',
    h1Base: 'Top Coding Classes for Kids in',
    keyword: 'coding coaching',
    descriptionBase: 'Join the best coding classes for kids in {city}. Learn Scratch programming, logical thinking, and game development.',
    heroSubBase: 'Let your child in {city} learn to code and build logic through interactive game development.',
    testimonialPrefix: 'Finding good coding classes in {city} was hard, but SkillNest is amazing',
    benefits: ['Coding Program', 'Game Development', 'Logical Thinking']
  },

];

const pages = [];
cities.forEach(city => {
  topics.forEach(topic => {
    pages.push({ city, topic });
  });
});

pages.forEach(({ city, topic }) => {
  const $ = cheerio.load(baseHtml);
  
  const pageUrl = `cities/${city.id}/${topic.id}/`;
  const fullUrl = `https://skillnest.co.in/${pageUrl}`;
  const title = `${topic.h1Base} ${city.name} | Smart Digital Skills`;
  const description = topic.descriptionBase.replace('{city}', city.name);
  const heroH1 = `${topic.h1Base} <span class="highlight">${city.name}</span>`;
  const heroSub = topic.heroSubBase.replace('{city}', city.name);

  // Update Meta Tags
  $('title').text(title);
  $('meta[name="description"]').attr('content', description);
  $('meta[property="og:title"]').attr('content', title);
  $('meta[property="og:description"]').attr('content', description);
  $('meta[property="og:url"]').attr('content', fullUrl);
  $('meta[name="twitter:title"]').attr('content', title);
  $('meta[name="twitter:description"]').attr('content', description);
  $('meta[name="twitter:url"]').attr('content', fullUrl);
  $('link[rel="canonical"]').attr('href', fullUrl);

  // Replace Schema dynamically
  const existingScripts = $('script[type="application/ld+json"]');
  existingScripts.remove(); // Remove old schema to replace completely
  
  const schemaMarkup = `
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Smart Digital Skills ${city.name}",
      "image": "https://skillnest.co.in/assets/founder.jpeg",
      "url": "${fullUrl}",
      "telephone": "",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "${city.name}",
        "addressRegion": "Chhattisgarh",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://skillnest.co.in/index.html"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "${topic.title} in ${city.name}",
          "item": "${fullUrl}"
        }
      ]
    },
    {
      "@type": "Course",
      "name": "${title}",
      "description": "${description}",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Smart Digital Skills",
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
          "name": "Which is the best ${topic.title.toLowerCase()} in ${city.name}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SkillNest provides ${city.localPhrase} program for ${topic.title.toLowerCase()}, focusing on practical, hands-on learning for school students."
          }
        },
        {
          "@type": "Question",
          "name": "Are there good ${topic.keyword} in ${city.name}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our comprehensive program in ${city.name} helps students master digital tools, coding, and AI basics effectively."
          }
        }
      ]
    }
  ]
}
  `;
  $('head').append(`\n<script type="application/ld+json">\n${schemaMarkup}\n</script>\n`);

  // Update Hero Section
  $('.hero h1').html(heroH1);
  $('.hero-sub').text(heroSub);

  // Update Section Titles with city context
  $('.high-conv-section .section-title').html(`Practical ${topic.title} <span>Every Student in ${city.name} Should Learn</span>`);
  $('.before-after-section .section-title').html(`${topic.benefits[0]}, ${topic.benefits[1]} & More <span>in ${city.name}</span>`);
  
  // Inject Map in a new section before footer (or within a specific section)
  const mapSection = `
  <section class="local-seo-map" style="padding: 60px 0; background: var(--gray-100);">
    <div class="container">
      <div class="text-center fade-up">
        <div class="section-tag"><span class="dot"></span>Local Presence</div>
        <h2 class="section-title">Join Our Classes <span>in ${city.name}</span></h2>
        <p class="section-sub">We are proud to serve the ${city.name} community with top-tier digital education.</p>
      </div>
      <div style="margin-top:40px; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm);">
        <iframe src="${city.mapUrl}" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div style="margin-top:20px; text-align:center;">
        <p><strong>Smart Digital Skills</strong> | ${city.name}, Chhattisgarh | 📞 <span class="phone-number"></span></p>
        <a href="https://g.page/smartdigitalskills" target="_blank" style="color:var(--blue-600); font-weight:700;">View Google Business Profile</a>
      </div>
    </div>
  </section>
  `;
  
  // Add Breadcrumb HTML right below header
  const breadcrumbHtml = `
  <div style="background:var(--gray-100); padding: 12px 0; font-size:0.85rem; border-bottom: 1px solid var(--gray-300);">
    <div class="container">
      <a href="index.html" style="color:var(--blue-600);">Home</a> / 
      <a href="computer-classes.html" style="color:var(--blue-600);">Courses</a> / 
      <span style="color:var(--gray-700); font-weight:600;">${topic.title} in ${city.name}</span>
    </div>
  </div>
  `;
  $('.header').after(breadcrumbHtml);
  
  // Insert map section before footer or at the bottom of the main content
  $('section.curriculum-section').after(mapSection);

  // Footer Internal Links Injection
  const seoLinksHtml = `
  <section class="seo-footer-links" style="padding: 40px 0; background: var(--blue-900); color: var(--white); border-top: 1px solid rgba(255,255,255,0.1);">
    <div class="container">
      <h3 style="margin-bottom:20px; font-family:'Sora',sans-serif; font-size:1.15rem; font-weight:800; color:var(--white);">Explore More Local Classes</h3>
      <div style="display:flex; flex-wrap:wrap; gap: 15px; font-size: 0.9rem;">
        <a href="computer-classes-in-bhilai.html" style="color:rgba(255,255,255,0.7); text-decoration:underline;">Computer Classes in Bhilai</a>
        <a href="ai-classes-in-durg.html" style="color:rgba(255,255,255,0.7); text-decoration:underline;">AI Classes in Durg</a>
        <a href="coding-classes-in-raipur.html" style="color:rgba(255,255,255,0.7); text-decoration:underline;">Coding Classes in Raipur</a>
        <a href="computer-classes-for-kids-in-bhilai-nagar.html" style="color:rgba(255,255,255,0.7); text-decoration:underline;">Computer Classes for Kids in Bhilai Nagar</a>
      </div>
    </div>
  </section>
  `;
  $('section.outcomes-section').after(seoLinksHtml);

  // Update Testimonials
  const localTestimonial = `
  <section class="local-testimonial" style="padding: 60px 0;">
    <div class="container">
      <div class="text-center fade-up">
        <h2 class="section-title">What ${city.name} Parents Say</h2>
      </div>
      <div style="background:var(--blue-50); padding:30px; border-radius:var(--radius-lg); max-width:800px; margin: 30px auto 0; text-align:center; border: 1px solid var(--blue-100);">
        <p style="font-size:1.1rem; font-style:italic; color:var(--gray-700); margin-bottom:20px;">
          "${topic.testimonialPrefix} and it has been the best decision for their education."
        </p>
        <h3 style="color:var(--blue-900); font-size:1rem; font-weight:700;">- Parent from ${city.name}</h3>
      </div>
    </div>
  </section>
  `;
  $('.high-conv-section').after(localTestimonial);

  // Save the file
  const outDir = path.join(__dirname, '..', 'cities', city.id, topic.id);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, 'index.html');
  fs.writeFileSync(outPath, $.html(), 'utf8');
  console.log('Generated ' + pageUrl);
});
