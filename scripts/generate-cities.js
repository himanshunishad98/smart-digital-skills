const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const ROOT = path.join(__dirname, '../');
const baseHtmlPath = path.join(ROOT, 'index.html');
const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

// Load configurations
const citiesMetadata = JSON.parse(fs.readFileSync(path.join(__dirname, 'cities-metadata.json'), 'utf8'));
const phase3Data = JSON.parse(fs.readFileSync(path.join(__dirname, 'cities-phase3.json'), 'utf8'));
const phase4Data = JSON.parse(fs.readFileSync(path.join(__dirname, 'cities-phase4.json'), 'utf8'));

// 18 main cities target list
const mainCities = [
  'bhopal', 'indore', 'raipur', 'delhi', 'mumbai', 'pune', 'bangalore', 'hyderabad',
  'kolkata', 'chennai', 'jaipur', 'lucknow', 'patna', 'nagpur', 'chandigarh', 'surat',
  'kochi', 'mysuru'
];

// All existing cities from lists
const allCityIds = [
  ...mainCities,
  'coimbatore', 'bhubaneswar', 'vadodara', 'visakhapatnam', 'thiruvananthapuram', 'bilaspur',
  'agra', 'meerut', 'varanasi', 'bareilly', 'aligarh', 'ranchi', 'bhilai', 'bhilai-nagar', 'durg',
  'punjab'
];

// Deduplicate all cities
const uniqueCityIds = Array.from(new Set(allCityIds));

// Areas and specific keywords for main 18 cities
const cityDetails = {
  bhopal: {
    name: 'Bhopal',
    tagline: 'Building strong digital foundations for Bhopal\'s school students',
    areas: 'Arera Colony, MP Nagar, and Kolar Road',
    focus: 'equipping students in Bhopal with essential digital literacy and cyber safety awareness.',
    faqQuestion: 'What is the best online digital skills program in Bhopal?',
    faqAnswer: 'SkillNest stands out in Bhopal by replacing 6 hours of gaming with 2 hours of highly productive, guided learning in coding, multimedia, and computer basics.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117320.04368146743!2d77.4126!3d23.2599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x217dfbce43790ec9!2sBhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1715873100000'
  },
  indore: {
    name: 'Indore',
    tagline: 'Indore\'s premier coding and AI classes for young innovators',
    areas: 'Vijay Nagar, Palasia, and Bhawar Kuan',
    focus: 'nurturing logical thinking and tech-forward skills for Indore\'s ambitious students.',
    faqQuestion: 'How can school students in Indore learn digital skills safely?',
    faqAnswer: 'Through our structured 6-week online program, students in Indore get hands-on experience in safe browsing, Google tools, and introductory AI in a secure, expert-guided environment.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117760.04368146743!2d75.8577!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b4d0c3b%3A0x7a6e14740db96062!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1715873100000'
  },
  raipur: {
    name: 'Raipur',
    tagline: 'Raipur\'s leading practical digital skills and AI education hub',
    areas: 'Shankar Nagar, VIP Road, and Samta Colony',
    focus: 'helping parents in Raipur equip their kids with touch typing, coding logic, and AI prompt engineering.',
    faqQuestion: 'Which computer course is best for students in Raipur?',
    faqAnswer: 'SkillNest is highly rated by Raipur parents because it teaches MS Excel, document layouts, safe search, and visual block coding practically with zero memorization.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118985.34005085427!2d81.5623835619379!3d21.261899130765964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dda23be28229%3A0x163ee120469ee95c!2sRaipur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1715873229643!5m2!1sen!2sin'
  },
  delhi: {
    name: 'Delhi NCR',
    tagline: 'Delhi NCR\'s top practical coding and AI classes for Class 6-8',
    areas: 'Dwarka, Vasant Kunj, Rohini, Saket, and Noida',
    focus: 'sparking computational logic and digital creator confidence for Delhi\'s future leaders.',
    faqQuestion: 'Are coding classes available for beginners in Delhi?',
    faqAnswer: 'Yes, SkillNest offers a beginner-friendly online cohort for school students in Delhi NCR, guiding them from Scratch visual blocks to real Excel layouts and AI tools.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28018.25624796349!2d77.2089!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62f%3A0x15c03c5881473c87!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1715873100000'
  },
  mumbai: {
    name: 'Mumbai',
    tagline: 'Premium digital skills and interactive coding classes in Mumbai',
    areas: 'Bandra, Andheri, Powai, Colaba, and Thane',
    focus: 'transitioning kids in Mumbai from screen-consumers into active, future-ready tech builders.',
    faqQuestion: 'What are the best digital skills classes for teenagers in Mumbai?',
    faqAnswer: 'SkillNest offers an online program for Mumbai teenagers focusing on touch typing, advanced presentations, spreadsheet calculations, and ChatGPT prompt logic.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120682.35515234253!2d72.8258!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1715873100000'
  },
  pune: {
    name: 'Pune',
    tagline: ' पुणे के विद्यार्थियों के लिए उत्कृष्ट कंप्यूटर, कोडिंग एवं AI क्लासेज',
    areas: 'Kothrud, Aundh, Hinjewadi, and Viman Nagar',
    focus: 'helping school kids in Pune build logical algorithmic thinking and robust cyber safety habits.',
    faqQuestion: 'How can students in Pune learn visual programming online?',
    faqAnswer: 'Our online batches for Pune school kids feature live guidance to build Scratch games, design presentation templates, and master spreadsheets.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04368146743!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06fa5b44279%3A0x597268b6d87c8051!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1715873100000'
  },
  bangalore: {
    name: 'Bangalore',
    tagline: 'Silicon Valley\'s trusted coding, Excel and AI classes for school kids',
    areas: 'Jayanagar, Indiranagar, Koramangala, and Whitefield',
    focus: 'cultivating a solid technology creator mindset in Bangalore\'s ambitious youth.',
    faqQuestion: 'Where can I find top-rated coding classes for kids in Bangalore?',
    faqAnswer: 'SkillNest provides Bangalore school kids with a project-driven online cohort teaching Scratch game logic, AI prompting, and spreadsheet calculations.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124409.04368146743!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8513e457e!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1715873100000'
  },
  hyderabad: {
    name: 'Hyderabad',
    tagline: 'Empowering Hyderabad school students with AI logic and Coding Program',
    areas: 'Gachibowli, Jubilee Hills, Madhapur, and Secunderabad',
    focus: 'shaping future computational problem solvers in Hyderabad through practical learning.',
    faqQuestion: 'What are the best coding and AI classes for students in Hyderabad?',
    faqAnswer: 'SkillNest is highly recommended by Hyderabad parents for its 100% project-based Coding Program, touch typing, and safe AI usage modules.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121780.04368146743!2d78.4867!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaeb2cbb%3A0x771e89770c7b3d27!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1715873100000'
  },
  kolkata: {
    name: 'Kolkata',
    tagline: 'High-quality computer and AI classes for school students in Kolkata',
    areas: 'Salt Lake, Ballygunge, Park Street, and New Town',
    focus: 'bringing modern Google workspace, Excel data handling, and AI safety directly to Kolkata students.',
    faqQuestion: 'Which computer course is best for Class 6-8 in Kolkata?',
    faqAnswer: 'Our online digital skills course is the best choice in Kolkata, teaching kids formatting, presentation setups, spreadsheets formulas, and AI prompt rules.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.04368146743!2d88.3639!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02772ede1246a7%3A0xe7f1f61882d929b3!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1715873100000'
  },
  chennai: {
    name: 'Chennai',
    tagline: 'Structured digital literacy and coding education for kids in Chennai',
    areas: 'Adyar, Velachery, Anna Nagar, and Mylapore',
    focus: 'enabling Chennai school kids to excel in touch typing, cyber security hygiene, and coding logics.',
    faqQuestion: 'Which is the top online coding class for kids in Chennai?',
    faqAnswer: 'SkillNest offers Chennai students a comprehensive online curriculum including Coding Program, Excel tables, and AI tools with live trainer support.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122285.04368146743!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x82e4b038e7d00f3c!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1715873100000'
  },
  jaipur: {
    name: 'Jaipur',
    tagline: 'Premium AI and Coding education for school students in Jaipur',
    areas: 'Malviya Nagar, Mansarovar, and Vaishali Nagar',
    focus: 'bringing creative digital learning and premium tech education to children across Jaipur.',
    faqQuestion: 'Are there good coding and digital skills classes in Jaipur for kids?',
    faqAnswer: 'Yes, SkillNest provides a comprehensive online program for Jaipur students, teaching them Coding Program, MS Office, and AI tools from the comfort of their home.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113880.04368146743!2d75.7873!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6123837b541%3A0x40f1ebc94a20f7f7!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1715873100000'
  },
  lucknow: {
    name: 'Lucknow',
    tagline: 'Lucknow\'s most trusted digital skills program for kids',
    areas: 'Gomti Nagar, Aliganj, Hazratganj, and Indira Nagar',
    focus: 'helping parents in Lucknow equip their children with future-ready tech skills.',
    faqQuestion: 'What are the best AI and computer classes for school students in Lucknow?',
    faqAnswer: 'SkillNest offers the most practical online program for Class 6-8 students in Lucknow, covering MS Office, AI basics, coding, and cyber safety without rote learning.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113900.04368146743!2d80.9462!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b17b%3A0x14c139d684f85123!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1715873100000'
  },
  patna: {
    name: 'Patna',
    tagline: 'High-quality, affordable computer classes for students in Patna',
    areas: 'Boring Road, Kankarbagh, and Rajendra Nagar',
    focus: 'delivering accessible, highly practical computer and AI education to every home in Patna.',
    faqQuestion: 'Which is the best practical computer course for Class 6-8 in Patna?',
    faqAnswer: 'SkillNest is highly rated by parents in Patna because it focuses on 100% practical, project-based learning rather than just theory, perfectly suited for young learners.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115160.04368146743!2d85.1376!3d25.5941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58d5f3d695bf%3A0x60df11175c5f4b00!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1715873100000'
  },
  nagpur: {
    name: 'Nagpur',
    tagline: 'Practical tech and coding classes for school students in Nagpur',
    areas: 'Dharampeth, Ramdaspeth, and Manish Nagar',
    focus: 'helping Nagpur\'s young minds transition from tech consumers to tech creators.',
    faqQuestion: 'How to find good online AI and coding classes for teenagers in Nagpur?',
    faqAnswer: 'SkillNest’s specialized Class 6-8 program is perfect for Nagpur teenagers, focusing on building a practical portfolio, improving typing, and learning real-world tools.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119060.04368146743!2d79.0882!3d21.1458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31dd113%3A0x5c8e22851d45543c!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1715873100000'
  },
  chandigarh: {
    name: 'Chandigarh',
    tagline: 'Premium digital skills for Chandigarh\'s youth',
    areas: 'Sector 35, Sector 15, Sector 8, and Manimajra',
    focus: 'nurturing logical thinking and tech-forward skills for Chandigarh\'s ambitious students.',
    faqQuestion: 'How can school students in Chandigarh learn digital skills safely?',
    faqAnswer: 'Through our structured 6-week online program, students in Chandigarh get hands-on experience in safe browsing, Google tools, and introductory AI.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27420.04368146743!2d76.7794!3d30.7333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff99f9bca61ff!2sChandigarh!5e0!3m2!1sen!2sin!4v1715873100000'
  },
  surat: {
    name: 'Surat',
    tagline: 'Future-proofing Surat\'s students with essential digital skills',
    areas: 'Adajan, Vesu, Piplod, and Varachha',
    focus: 'preparing school students in Surat for a tech-driven future with practical computer basics.',
    faqQuestion: 'What are the best digital skills classes for kids in Surat?',
    faqAnswer: 'SkillNest offers Surat\'s most comprehensive online digital program for Class 6-8 students, covering everything from typing and MS Office to safe internet usage.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119060.04368146743!2d72.8311!3d21.1702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1715873100000'
  },
  kochi: {
    name: 'Kochi',
    tagline: 'Smart digital skills for Kochi\'s bright minds',
    areas: 'Kakkanad, Edappally, Panampilly Nagar, and Palarivattom',
    focus: 'bringing creative digital learning and premium tech education to children across Kochi.',
    faqQuestion: 'Are there good coding and digital skills classes in Kochi for school kids?',
    faqAnswer: 'Yes, SkillNest provides an intensive 6-week online program for Kochi students, teaching them MS Office, AI tools, and cyber safety.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125740.04368146743!2d76.2673!3d9.9816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514ab7db63%3A0x367abc316a860d21!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1715873100000'
  },
  mysuru: {
    name: 'Mysuru',
    tagline: 'Premium tech and computer education in Mysuru',
    areas: 'Gokulam, Jayalakshmipuram, Kuvempunagar, and Vijayanagar',
    focus: 'ensuring affordable and high-quality online digital skill development for Mysuru\'s youth.',
    faqQuestion: 'Where can students in Mysuru learn MS Office and AI practically?',
    faqAnswer: 'Our specialized online batch allows students in Mysuru to master MS Excel, PowerPoint, Word, and basic AI through live, interactive projects.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124600.04368146743!2d76.6394!3d12.2958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf70381d572ef7%3A0x111ec7f58b4ec8c5!2sMysuru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1715873100000'
  }
};

// Compile generic details for other minor cities
function getCityOrStateDetails(id) {
  if (cityDetails[id]) return cityDetails[id];

  // Try to load from phase 3 or 4 data
  const p3 = phase3Data.find(c => c.id === id);
  if (p3) {
    return {
      name: p3.name,
      tagline: p3.tagline,
      areas: p3.areas,
      focus: p3.focus,
      faqQuestion: p3.faqQuestion,
      faqAnswer: p3.faqAnswer,
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118985.34005085427!2d81.5623835619379!3d21.261899130765964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dda23be28229%3A0x163ee120469ee95c!2sRaipur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1715873229643!5m2!1sen!2sin'
    };
  }

  const p4 = phase4Data.find(c => c.id === id);
  if (p4) {
    return {
      name: p4.name,
      tagline: p4.tagline,
      areas: p4.areas,
      focus: p4.focus,
      faqQuestion: p4.faqQuestion,
      faqAnswer: p4.faqAnswer,
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118985.34005085427!2d81.5623835619379!3d21.261899130765964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dda23be28229%3A0x163ee120469ee95c!2sRaipur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1715873229643!5m2!1sen!2sin'
    };
  }

  const meta = citiesMetadata.find(c => c.id === id);
  const name = meta ? meta.name : id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Standard fallback details
  return {
    name: name,
    tagline: `Future-proofing school kids in ${name} with essential computer & AI skills`,
    areas: 'all prominent residential and school sectors',
    focus: `helping school students in ${name} build logical programming algorithms and office tool basics.`,
    faqQuestion: `What specific digital skills do kids in ${name} learn?`,
    faqAnswer: `Through our structured 6-week online cohorts, school kids in ${name} master touch typing, Word formatting, Excel averages, Scratch logic, and cyber hygiene.`,
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118985.34005085427!2d81.5623835619379!3d21.261899130765964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28dda23be28229%3A0x163ee120469ee95c!2sRaipur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1715873229643!5m2!1sen!2sin'
  };
}

// Ensure output directories exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Generate Cities Hub Page
function generateCitiesHub() {
  const $ = cheerio.load(baseHtml);
  const hubUrl = 'https://skillnest.co.in/cities/';

  // 1. UPDATE PATHS TO BASE_PATH
  $('[src]').each((i, el) => {
    let src = $(el).attr('src');
    if (src && !src.startsWith('http') && !src.startsWith('/') && !src.startsWith('data:')) {
      $(el).attr('src', '../' + src);
    }
  });
  $('[href]').each((i, el) => {
    let href = $(el).attr('href');
    if (href && !href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('data:')) {
      $(el).attr('href', '../' + href);
    }
  });

  // 2. SEO META TAGS
  const title = 'Online Computer & Coding Classes by City | SkillNest';
  const description = 'Find practical online computer, coding, and AI classes for Class 6-8 school kids. Explore localized batches and regional schedules in your city.';
  $('title').text(title);
  $('meta[name="description"]').attr('content', description);
  $('meta[property="og:title"]').attr('content', title);
  $('meta[property="og:description"]').attr('content', description);
  $('meta[property="og:url"]').attr('content', hubUrl);
  $('meta[name="twitter:title"]').attr('content', title);
  $('meta[name="twitter:description"]').attr('content', description);
  
  if ($('link[rel="canonical"]').length) {
    $('link[rel="canonical"]').attr('href', hubUrl);
  } else {
    $('head').append(`\n<link rel="canonical" href="${hubUrl}">`);
  }

  // 3. SCHEMA
  $('script[type="application/ld+json"]').remove();
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": hubUrl,
        "url": hubUrl,
        "name": title,
        "description": description
      },
      {
        "@type": "ItemList",
        "name": "SkillNest Active City Batches",
        "itemListElement": mainCities.map((cityId, index) => {
          const detail = getCityOrStateDetails(cityId);
          return {
            "@type": "ListItem",
            "position": index + 1,
            "name": detail.name,
            "url": `https://skillnest.co.in/cities/${cityId}/`
          };
        })
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skillnest.co.in/" },
          { "@type": "ListItem", "position": 2, "name": "Cities", "item": hubUrl }
        ]
      }
    ]
  };
  $('head').append(`\n<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>\n`);

  // 4. HERO SECTION
  $('.hero h1').html('Practical Digital Skills & Coding Batches <span>in Your City</span> 📍');
  $('.hero-sub').text('SkillNest operates localized online cohorts for school kids (Class 6-8) across India. Join a batch near you to build real projects.');
  $('.hero-badge-row').html('<span class="hero-badge badge-class">📍 Live Local Cohorts</span>');
  $('.hero-btns').html('<a class="btn-primary" href="#major-cities">Explore Major Cities</a> <a class="btn-yellow" href="../contact/book-demo.html">Book Free Demo</a>');

  // 5. AEO QUICK ANSWER
  $('.aeo-answer').text('SkillNest offers practical computer, coding, and AI learning classes across major cities in India including Bhopal, Indore, Raipur, Delhi, Mumbai, Pune, Bangalore, and Hyderabad. The program features live 6-week online cohorts tailored for Class 6-8 students with hands-on projects and certified outcomes.');

  // 6. MAJOR CITY GRID
  let cityCards = '';
  mainCities.forEach(cityId => {
    const detail = getCityOrStateDetails(cityId);
    cityCards += `
      <div class="why-card">
        <h3 class="card-title" style="margin-bottom:10px;">📍 ${detail.name}</h3>
        <p style="font-size:0.9rem; color:var(--gray-600); margin-bottom:16px;">${detail.tagline}</p>
        <a class="btn-outline" href="./${cityId}/index.html" style="font-size:0.85rem; padding:8px 16px;">Explore Batch Schedules</a>
      </div>
    `;
  });

  const cityGridHtml = `
    <section class="why-section bg-gray" id="major-cities">
      <div class="container">
        <div class="text-center fade-up">
          <div class="section-tag"><span class="dot"></span>Major City Batches</div>
          <h2 class="section-title">Select Your <span>City Node</span></h2>
          <p class="section-sub">Choose your city node to explore localized batch timings, parent success stories, and specialized guides.</p>
        </div>
        <div class="why-grid mt-32">
          ${cityCards}
        </div>
        <div class="text-center mt-32" id="more-cities">
          <a class="btn-primary" href="./more-cities/index.html">View All Other Cities & States</a>
        </div>
      </div>
    </section>
  `;

  // Inject city grid before the outcomes section
  $('.outcomes-section').before(cityGridHtml);

  ensureDir(path.join(ROOT, 'cities'));
  fs.writeFileSync(path.join(ROOT, 'cities/index.html'), $.html(), 'utf8');
  console.log('Generated Cities Hub: cities/index.html');
}

// Generate More Cities Page
function generateMoreCities() {
  const $ = cheerio.load(baseHtml);
  const pageUrl = 'https://skillnest.co.in/cities/more-cities/';

  // 1. UPDATE PATHS TO BASE_PATH
  $('[src]').each((i, el) => {
    let src = $(el).attr('src');
    if (src && !src.startsWith('http') && !src.startsWith('/') && !src.startsWith('data:')) {
      $(el).attr('src', '../../' + src);
    }
  });
  $('[href]').each((i, el) => {
    let href = $(el).attr('href');
    if (href && !href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('data:')) {
      $(el).attr('href', '../../' + href);
    }
  });

  // 2. SEO META TAGS
  const title = 'More Cities & Regional Batches | SkillNest';
  const description = 'Explore supplementary online coding and computer programs across all states and regional cities of India, including Bilaspur, Agra, Varanasi, Jammu & Kashmir, Sikkim, and more.';
  $('title').text(title);
  $('meta[name="description"]').attr('content', description);
  $('meta[property="og:title"]').attr('content', title);
  $('meta[property="og:description"]').attr('content', description);
  $('meta[property="og:url"]').attr('content', pageUrl);
  $('meta[name="twitter:title"]').attr('content', title);
  $('meta[name="twitter:description"]').attr('content', description);
  
  if ($('link[rel="canonical"]').length) {
    $('link[rel="canonical"]').attr('href', pageUrl);
  } else {
    $('head').append(`\n<link rel="canonical" href="${pageUrl}">`);
  }

  // 3. SCHEMA
  $('script[type="application/ld+json"]').remove();
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        "url": pageUrl,
        "name": title,
        "description": description
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skillnest.co.in/" },
          { "@type": "ListItem", "position": 2, "name": "Cities", "item": "https://skillnest.co.in/cities/" },
          { "@type": "ListItem", "position": 3, "name": "More Cities", "item": pageUrl }
        ]
      }
    ]
  };
  $('head').append(`\n<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>\n`);

  // 4. HERO SECTION
  $('.hero h1').html('Additional Cities & <span>State Regional Batches</span> 🌐');
  $('.hero-sub').text('SkillNest is committed to digital equity. We run online classes for middle school kids in smaller cities, states, and union territories across India.');
  $('.hero-badge-row').html('<span class="hero-badge badge-class">📍 Regional Coverage</span>');
  $('.hero-btns').html('<a class="btn-primary" href="#all-cities">Browse All Locations</a>');

  // 5. AEO QUICK ANSWER
  $('.aeo-answer').text('SkillNest supports additional cities and state batches including Bilaspur, Gaya, Jorhat, Varanasi, Agra, Meerut, Vadodara, and states like Punjab, Himachal Pradesh, Jammu & Kashmir, Ladakh, and Sikkim. School kids in these areas get the same interactive 6-week project-based online computer basics and coding curriculum.');

  // 6. ALL OTHER CITIES GRID
  let secondaryCards = '';
  uniqueCityIds.forEach(cityId => {
    if (mainCities.includes(cityId)) return; // skip major ones
    const detail = getCityOrStateDetails(cityId);
    secondaryCards += `
      <div class="why-card">
        <h3 class="card-title" style="margin-bottom:8px;">🌐 ${detail.name}</h3>
        <p style="font-size:0.85rem; color:var(--gray-600); margin-bottom:12px;">${detail.tagline}</p>
        <a class="btn-outline" href="../${cityId}/index.html" style="font-size:0.8rem; padding:6px 12px;">View Classes</a>
      </div>
    `;
  });

  const cityGridHtml = `
    <section class="why-section bg-gray" id="all-cities">
      <div class="container">
        <div class="text-center fade-up">
          <div class="section-tag"><span class="dot"></span>All Other Cities</div>
          <h2 class="section-title">Explore Regional <span>Schedules</span></h2>
          <p class="section-sub">Choose your specific regional state or city hub for localized guides and curriculum progression.</p>
        </div>
        <div class="why-grid mt-32">
          ${secondaryCards}
        </div>
      </div>
    </section>
  `;

  // Inject city grid before outcomes
  $('.outcomes-section').before(cityGridHtml);

  ensureDir(path.join(ROOT, 'cities/more-cities'));
  fs.writeFileSync(path.join(ROOT, 'cities/more-cities/index.html'), $.html(), 'utf8');
  console.log('Generated More Cities Hub: cities/more-cities/index.html');
}

// Generate standard city pages
function generateCityPages() {
  uniqueCityIds.forEach(cityId => {
    const $ = cheerio.load(baseHtml);
    const detail = getCityOrStateDetails(cityId);
    const cityUrl = `https://skillnest.co.in/cities/${cityId}/`;

    // 1. UPDATE PATHS TO BASE_PATH
    $('[src]').each((i, el) => {
      let src = $(el).attr('src');
      if (src && !src.startsWith('http') && !src.startsWith('/') && !src.startsWith('data:')) {
        $(el).attr('src', '../../' + src);
      }
    });
    $('[href]').each((i, el) => {
      let href = $(el).attr('href');
      if (href && !href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('data:')) {
        $(el).attr('href', '../../' + href);
      }
    });

    // 2. SEO META TAGS
    const title = `Online Digital Skills, AI & Coding Classes for Kids in ${detail.name} | SkillNest`;
    const description = `Enroll your child in ${detail.name}'s top practical computer and coding program (Class 6-8). Live online batches in MS Office, Coding Program, AI tools, and cyber safety. Serving ${detail.areas}.`;
    $('title').text(title);
    $('meta[name="description"]').attr('content', description);
    $('meta[property="og:title"]').attr('content', title);
    $('meta[property="og:description"]').attr('content', description);
    $('meta[property="og:url"]').attr('content', cityUrl);
    $('meta[name="twitter:title"]').attr('content', title);
    $('meta[name="twitter:description"]').attr('content', description);
    
    if ($('link[rel="canonical"]').length) {
      $('link[rel="canonical"]').attr('href', cityUrl);
    } else {
      $('head').append(`\n<link rel="canonical" href="${cityUrl}">`);
    }

    // 3. SCHEMA
    $('script[type="application/ld+json"]').remove();
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "name": `SkillNest ${detail.name}`,
          "image": "https://skillnest.co.in/assets/founder.jpeg",
          "url": cityUrl,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": detail.name,
            "addressCountry": "IN"
          }
        },
        {
          "@type": "WebPage",
          "@id": cityUrl,
          "url": cityUrl,
          "name": title,
          "description": description
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": detail.faqQuestion,
              "acceptedAnswer": { "@type": "Answer", "text": detail.faqAnswer }
            },
            {
              "@type": "Question",
              "name": `At what age should school kids in ${detail.name} learn computers?`,
              "acceptedAnswer": { "@type": "Answer", "text": `Middle school is the best window (Ages 10-14, Class 6-8). SkillNest matches kids with specialized workflows like Scratch programming logic, touch typing, document formats, and AI safety.` }
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skillnest.co.in/" },
            { "@type": "ListItem", "position": 2, "name": "Cities", "item": "https://skillnest.co.in/cities/" },
            { "@type": "ListItem", "position": 3, "name": detail.name, "item": cityUrl }
          ]
        }
      ]
    };
    $('head').append(`\n<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>\n`);

    // 4. HERO SECTION
    $('.hero h1').html(`India's #1 Practical <span class="highlight">Computer & Coding Classes</span> for ${detail.name} Kids`);
    $('.hero-sub').text(`${detail.tagline}. Build real projects, typing speed, and digital readiness in 6 weeks.`);
    $('.hero-badge-row').html(`<span class="hero-badge badge-class">📍 ${detail.name} Node</span>`);

    // 5. AEO QUICK ANSWER
    $('.aeo-answer').text(`SkillNest provides localized online computer, AI and coding cohorts for middle school kids (Class 6-8) in ${detail.name}, serving areas like ${detail.areas}. Students master MS Excel, PowerPoint layout design, keyboard touch typing, Scratch visual coding, and cybersecurity guidelines without rote learning.`);

    // 6. GEO SECTION (MAP)
    const mapHtml = `
      <section class="outcomes-section bg-gray" id="local-presence">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Local Context</div>
            <h2 class="section-title">Serving <span>${detail.name}</span> Community</h2>
            <p class="section-sub">Bringing world-class digital education directly to families residing near ${detail.areas}.</p>
          </div>
          <div class="level-card mt-32">
            <iframe src="${detail.mapUrl}" width="100%" height="450" frameborder="0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div class="text-center mt-20">
            <p><strong>SkillNest ${detail.name} Hub</strong> | India | Online live classes with local tutors.</p>
          </div>
        </div>
      </section>
    `;

    // 7. PARENTS ALSO ASK SECTION
    const paaHtml = `
      <section class="faq-section bg-white" id="paa">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Parents Also Ask</div>
            <h2 class="section-title">Parents <span>Also Ask</span> About ${detail.name} Batches</h2>
            <p class="section-sub">Answers to common queries regarding live lessons, CBSE logic, and setup requirements.</p>
          </div>
          <div class="faq-list mt-32">
            <div class="faq-item fade-up">
              <div class="faq-q" onclick="toggleFaq(this)">
                <span>🌐 Are these classes conducted online in ${detail.name}?</span>
                <div class="faq-arrow">+</div>
              </div>
              <div class="faq-a">Yes! All classes are conducted live online with interactive screensharing and 1-to-1 attention, saving parents in ${detail.name} from extra travel and safety worries.</div>
            </div>
            <div class="faq-item fade-up">
              <div class="faq-q" onclick="toggleFaq(this)">
                <span>🏫 Does this align with the CBSE/ICSE curriculum taught in local schools?</span>
                <div class="faq-arrow">+</div>
              </div>
              <div class="faq-a">Absolutely. Our modules perfectly align with NEP 2020 frameworks and supplement computer lab exercises taught in regional schools, ensuring outstanding academic logic.</div>
            </div>
            <div class="faq-item fade-up">
              <div class="faq-q" onclick="toggleFaq(this)">
                <span>💻 What devices does my child need in ${detail.name} to attend?</span>
                <div class="faq-arrow">+</div>
              </div>
              <div class="faq-a">Students need a laptop or desktop computer (Windows/macOS) with a functioning keyboard, mouse, and a standard home Wi-Fi connection.</div>
            </div>
          </div>
        </div>
      </section>
    `;

    // 8. RELATED LINKS (INTERNAL LINK MATRIX)
    const relatedLinksHtml = `
      <section class="why-section bg-gray" id="related-links">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Curriculum Links</div>
            <h2 class="section-title">Explore <span>Digital Pathways</span></h2>
            <p class="section-sub">Links to specialized courses, age-appropriate resources, and parent parenting advice guides.</p>
          </div>
          <div class="why-grid mt-32">
            <div class="why-card">
              <h3 class="card-title">📚 Course Cohorts</h3>
              <ul class="mt-12" style="list-style:none; padding:0;">
                <li class="mt-8"><a href="../../courses/computer-basics/index.html">Computer Basics</a></li>
                <li class="mt-8"><a href="../../courses/typing-course/index.html">Typing Course</a></li>
                <li class="mt-8"><a href="../../courses/coding/index.html">Coding Program Course</a></li>
                <li class="mt-8"><a href="../../courses/ai-classes-for-kids/index.html">AI Classes for Kids</a></li>
                <li class="mt-8"><a href="../../courses/excel-course/index.html">Excel for Kids</a></li>
              </ul>
            </div>
            <div class="why-card">
              <h3 class="card-title">👨‍👩‍👧 Parent Hub Guides</h3>
              <ul class="mt-12" style="list-style:none; padding:0;">
                <li class="mt-8"><a href="../../parent-hub/screen-time-guide/index.html">Screen Time Guide</a></li>
                <li class="mt-8"><a href="../../parent-hub/ai-safety-for-kids/index.html">AI Safety Guide</a></li>
                <li class="mt-8"><a href="../../parent-hub/digital-parenting/index.html">Digital Parenting Guide</a></li>
                <li class="mt-8"><a href="../../parent-hub/future-skills-guide/index.html">Future Skills Guide</a></li>
                <li class="mt-8"><a href="../../parent-hub/learning-tips/index.html">Child Learning Tips</a></li>
              </ul>
            </div>
            <div class="why-card">
              <h3 class="card-title">⚙️ Interactive Tools</h3>
              <ul class="mt-12" style="list-style:none; padding:0;">
                <li class="mt-8"><a href="../../tools/typing-speed-test/index.html">Typing Speed Test</a></li>
                <li class="mt-8"><a href="../../tools/password-strength-checker/index.html">Password Checker</a></li>
                <li class="mt-8"><a href="../../tools/ai-prompt-generator/index.html">AI Prompt Generator</a></li>
                <li class="mt-8"><a href="../../tools/digital-readiness-quiz/index.html">Readiness Quiz</a></li>
                <li class="mt-8"><a href="../../tools/productivity-calculator/index.html">Productivity Calculator</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    `;

    // 9. LOCAL FAQS (8-12 FAQ items)
    let faqsListHtml = '';
    const faqs = [
      { q: detail.faqQuestion, a: detail.faqAnswer },
      { q: `What is the duration of the SkillNest digital skills program for ${detail.name} students?`, a: "The foundational cohort is completed in 6 weeks, with classes scheduled in flexible evening or weekend slots to fit around homework and school routines." },
      { q: "Do students get a certificate at the end of the program?", a: "Yes. Every student who builds their digital portfolio and submits projects receives a verified certificate of accomplishment from SkillNest." },
      { q: "Is individual mentorship available during the live classes?", a: "Yes, our small group sizing ensures the tutor interacts with each student, helping them debug Scratch bugs or spreadsheet equations in real time." },
      { q: `Are there batch options for beginners in ${detail.name}?`, a: "Yes, we group students by skill readiness so that absolute beginners start with mouse operations and typing posture before moving to logic coding." },
      { q: "How do parents track student progress?", a: "We share weekly reports on WhatsApp and invite parents to a live digital portfolio showcase during the final week of classes." },
      { q: "Can my child join if they are in Class 5 or Class 9?", a: "Yes! While primarily tailored for Class 6-8, motivated Class 5 or Class 9 students are welcome after a quick digital readiness assessment." },
      { q: "What is the fee and payment mode for the program?", a: "Please contact our admissions coordinator or click 'Book Free Demo' to receive the detailed batch pricing catalog for your region." }
    ];

    faqs.forEach(faq => {
      faqsListHtml += `
        <div class="faq-item fade-up">
          <div class="faq-q" onclick="toggleFaq(this)">
            <span>❓ ${faq.q}</span>
            <div class="faq-arrow">+</div>
          </div>
          <div class="faq-a">${faq.a}</div>
        </div>
      `;
    });

    // Replace FAQ block in the template
    $('#faq .faq-list').html(faqsListHtml);
    $('#faq h2').html(`FAQ About Computer Classes in <span>${detail.name}</span>`);

    // Inject GEO Map, PAA, and Related links before the FAQ section
    $('#faq').before(mapHtml).before(paaHtml).before(relatedLinksHtml);

    // Save page
    const cityDir = path.join(ROOT, 'cities', cityId);
    ensureDir(cityDir);
    fs.writeFileSync(path.join(cityDir, 'index.html'), $.html(), 'utf8');
    console.log(`Generated City Page: cities/${cityId}/index.html`);
  });
}

// Generate the 4 service pages under bhopal, indore, raipur, bhilai, bhilai-nagar, durg
function generateCityServices() {
  const serviceCities = ['bhopal', 'indore', 'raipur', 'bhilai', 'bhilai-nagar', 'durg'];
  const services = [
    { id: 'ai-classes', name: 'AI Classes', baseDesc: 'Introduction to prompt engineering, AI media creations, and ethical guidelines.' },
    { id: 'coding-classes', name: 'Coding Classes', baseDesc: 'Scratch block visual game coding, loops, conditionals, and logical sequences.' },
    { id: 'computer-classes', name: 'Computer Classes', baseDesc: 'Foundations of keyboard shortcuts, file layouts, MS Word, Excel tables, and typing.' },
    { id: 'digital-skills', name: 'Digital Skills', baseDesc: 'Canva layouts, online collaboration documents, password checkers, and cloud work folders.' }
  ];

  serviceCities.forEach(cityId => {
    const cityDetail = getCityOrStateDetails(cityId);

    services.forEach(srv => {
      const $ = cheerio.load(baseHtml);
      const serviceUrl = `https://skillnest.co.in/cities/${cityId}/${srv.id}/`;

      // 1. UPDATE PATHS TO BASE_PATH
      $('[src]').each((i, el) => {
        let src = $(el).attr('src');
        if (src && !src.startsWith('http') && !src.startsWith('/') && !src.startsWith('data:')) {
          $(el).attr('src', '../../../' + src);
        }
      });
      $('[href]').each((i, el) => {
        let href = $(el).attr('href');
        if (href && !href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('data:')) {
          $(el).attr('href', '../../../' + href);
        }
      });

      // 2. SEO META TAGS
      const title = `${srv.name} for School Kids in ${cityDetail.name} (Class 6-8) | SkillNest`;
      const description = `Enroll in ${cityDetail.name}'s leading ${srv.name.toLowerCase()} program. ${srv.baseDesc} Serving students in ${cityDetail.areas}.`;
      $('title').text(title);
      $('meta[name="description"]').attr('content', description);
      $('meta[property="og:title"]').attr('content', title);
      $('meta[property="og:description"]').attr('content', description);
      $('meta[property="og:url"]').attr('content', serviceUrl);
      $('meta[name="twitter:title"]').attr('content', title);
      $('meta[name="twitter:description"]').attr('content', description);
      
      if ($('link[rel="canonical"]').length) {
        $('link[rel="canonical"]').attr('href', serviceUrl);
      } else {
        $('head').append(`\n<link rel="canonical" href="${serviceUrl}">`);
      }

      // 3. SCHEMA
      $('script[type="application/ld+json"]').remove();
      const schema = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "LocalBusiness",
            "name": `SkillNest ${cityDetail.name} - ${srv.name}`,
            "image": "https://skillnest.co.in/assets/founder.jpeg",
            "url": serviceUrl,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": cityDetail.name,
              "addressCountry": "IN"
            }
          },
          {
            "@type": "Course",
            "name": `${srv.name} in ${cityDetail.name}`,
            "description": srv.baseDesc,
            "provider": {
              "@type": "EducationalOrganization",
              "name": "SkillNest",
              "url": "https://skillnest.co.in/"
            },
            "courseMode": "online"
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `Why should students in ${cityDetail.name} learn ${srv.name.toLowerCase()}?`,
                "acceptedAnswer": { "@type": "Answer", "text": `Learning ${srv.name.toLowerCase()} builds foundational logic, productivity skills, and prepares Class 6-8 students for future school courses and career paths.` }
              }
            ]
          },
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skillnest.co.in/" },
              { "@type": "ListItem", "position": 2, "name": "Cities", "item": "https://skillnest.co.in/cities/" },
              { "@type": "ListItem", "position": 3, "name": cityDetail.name, "item": `https://skillnest.co.in/cities/${cityId}/` },
              { "@type": "ListItem", "position": 4, "name": srv.name, "item": serviceUrl }
            ]
          }
        ]
      };
      $('head').append(`\n<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>\n`);

      // 4. HERO SECTION
      $('.hero h1').html(`Practical <span class="highlight">${srv.name}</span> for ${cityDetail.name} School Kids`);
      $('.hero-sub').text(`${srv.baseDesc} Help your child master key computer concepts online from ${cityDetail.areas}.`);
      $('.hero-badge-row').html(`<span class="hero-badge badge-class">📍 ${cityDetail.name} Cohort</span>`);

      // 5. AEO QUICK ANSWER
      $('.aeo-answer').text(`SkillNest's specialized online ${srv.name.toLowerCase()} program serves school kids in ${cityDetail.name}. Designed specifically for Class 6-8, the live modules focus on touch typing accuracy, safe AI prompt engineering, Scratch block coding, and cloud tools safety to bridge the school lab gap.`);

      // 6. GEO SECTION (MAP)
      const mapHtml = `
        <section class="outcomes-section bg-gray" id="local-presence">
          <div class="container">
            <div class="text-center fade-up">
              <div class="section-tag"><span class="dot"></span>Local presence</div>
              <h2 class="section-title">Support in <span>${cityDetail.name}</span></h2>
              <p class="section-sub">Bringing certified tech programs directly to families in ${cityDetail.areas}.</p>
            </div>
            <div class="level-card mt-32">
              <iframe src="${cityDetail.mapUrl}" width="100%" height="450" frameborder="0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </section>
      `;

      // 7. PARENTS ALSO ASK SECTION
      const paaHtml = `
        <section class="faq-section bg-white" id="paa">
          <div class="container">
            <div class="text-center fade-up">
              <div class="section-tag"><span class="dot"></span>Service FAQs</div>
              <h2 class="section-title">Parents Also Ask About <span>${srv.name}</span></h2>
              <p class="section-sub">Standard queries regarding software training and coding setups.</p>
            </div>
            <div class="faq-list mt-32">
              <div class="faq-item fade-up">
                <div class="faq-q" onclick="toggleFaq(this)">
                  <span>🗓️ What is the lesson schedule for ${srv.name.toLowerCase()} in ${cityDetail.name}?</span>
                  <div class="faq-arrow">+</div>
                </div>
                <div class="faq-a">We offer weekday evening and weekend slots to ensure zero clash with your child's regular school homework routines.</div>
              </div>
              <div class="faq-item fade-up">
                <div class="faq-q" onclick="toggleFaq(this)">
                  <span>📜 Will my child build projects during this program?</span>
                  <div class="faq-arrow">+</div>
                </div>
                <div class="faq-a">Yes. Every child builds a personal digital portfolio, including custom coding games, slides decks, and spreadsheet calculators.</div>
              </div>
            </div>
          </div>
        </section>
      `;

      // 8. RELATED LINKS (INTERNAL LINK MATRIX)
      const relatedLinksHtml = `
        <section class="why-section bg-gray" id="related-links">
          <div class="container">
            <div class="text-center fade-up">
              <div class="section-tag"><span class="dot"></span>Related Pages</div>
              <h2 class="section-title">Explore <span>More Programs</span> in ${cityDetail.name}</h2>
            </div>
            <div class="why-grid mt-32">
              <div class="why-card">
                <h3 class="card-title">💡 Other Batches in ${cityDetail.name}</h3>
                <ul class="mt-12" style="list-style:none; padding:0;">
                  ${services.filter(s => s.id !== srv.id).map(s => `
                    <li class="mt-8"><a href="../${s.id}/index.html">${s.name} in ${cityDetail.name}</a></li>
                  `).join('')}
                </ul>
              </div>
              <div class="why-card">
                <h3 class="card-title">📚 Course Details</h3>
                <ul class="mt-12" style="list-style:none; padding:0;">
                  <li class="mt-8"><a href="../../../courses/computer-basics/index.html">Computer Basics</a></li>
                  <li class="mt-8"><a href="../../../courses/typing-course/index.html">Typing Course</a></li>
                  <li class="mt-8"><a href="../../../courses/coding/index.html">Coding Program</a></li>
                  <li class="mt-8"><a href="../../../courses/ai-classes-for-kids/index.html">AI Classes for Kids</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      `;

      // 9. LOCAL FAQS
      let faqsListHtml = '';
      const faqs = [
        { q: `Who is eligible for ${srv.name.toLowerCase()} in ${cityDetail.name}?`, a: "Any student in Class 6 to 8 can join. No advanced computer skills are needed, as we start teaching concepts from the ground up." },
        { q: "Is a software installation required on my laptop?", a: "No! All coding exercises are conducted in browser-based Scratch panels or secure Google Workspaces, making it very safe and easy to start." }
      ];

      faqs.forEach(faq => {
        faqsListHtml += `
          <div class="faq-item fade-up">
            <div class="faq-q" onclick="toggleFaq(this)">
              <span>❓ ${faq.q}</span>
              <div class="faq-arrow">+</div>
            </div>
            <div class="faq-a">${faq.a}</div>
          </div>
        `;
      });

      $('#faq .faq-list').html(faqsListHtml);
      $('#faq h2').html(`${srv.name} FAQ for <span>${cityDetail.name}</span> Parents`);

      // Inject Map, PAA, and links
      $('#faq').before(mapHtml).before(paaHtml).before(relatedLinksHtml);

      // Save page
      const serviceDir = path.join(ROOT, 'cities', cityId, srv.id);
      ensureDir(serviceDir);
      fs.writeFileSync(path.join(serviceDir, 'index.html'), $.html(), 'utf8');
      console.log(`Generated Service Page: cities/${cityId}/${srv.id}/index.html`);
    });
  });
}

// Generate physical redirect stubs in the root folder for old filenames
function generateRedirectStubs() {
  const redirects = {
    'computer-classes-bangalore.html': '/cities/bangalore/computer-classes/',
    'computer-classes-bhopal.html': '/cities/bhopal/computer-classes/',
    'computer-classes-delhi.html': '/cities/delhi/computer-classes/',
    'computer-classes-indore.html': '/cities/indore/computer-classes/',
    'computer-classes-mumbai.html': '/cities/mumbai/computer-classes/',
    'computer-classes-pune.html': '/cities/pune/computer-classes/',
    'coding-classes-hyderabad.html': '/cities/hyderabad/coding-classes/',
    'ai-classes-chennai.html': '/cities/chennai/ai-classes/',
    'digital-skills-kolkata.html': '/cities/kolkata/digital-skills/',
    'ai-classes-in-bhilai.html': '/cities/bhilai/ai-classes/',
    'ai-classes-in-bhilai-nagar.html': '/cities/bhilai-nagar/ai-classes/',
    'ai-classes-in-durg.html': '/cities/durg/ai-classes/',
    'ai-classes-in-raipur.html': '/cities/raipur/ai-classes/',
    'coding-classes-in-bhilai.html': '/cities/bhilai/coding-classes/',
    'coding-classes-in-bhilai-nagar.html': '/cities/bhilai-nagar/coding-classes/',
    'coding-classes-in-durg.html': '/cities/durg/coding-classes/',
    'coding-classes-in-raipur.html': '/cities/raipur/coding-classes/',
    'computer-classes-in-bhilai.html': '/cities/bhilai/computer-classes/',
    'computer-classes-in-bhilai-nagar.html': '/cities/bhilai-nagar/computer-classes/',
    'computer-classes-in-durg.html': '/cities/durg/computer-classes/',
    'computer-classes-in-raipur.html': '/cities/raipur/computer-classes/',
    'computer-classes-for-kids-in-bhilai.html': '/cities/bhilai/digital-skills/',
    'computer-classes-for-kids-in-bhilai-nagar.html': '/cities/bhilai-nagar/digital-skills/',
    'computer-classes-for-kids-in-durg.html': '/cities/durg/digital-skills/',
    'computer-classes-for-kids-in-raipur.html': '/cities/raipur/digital-skills/'
  };

  for (const [filename, targetUrl] of Object.entries(redirects)) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting… | SkillNest</title>
<link rel="canonical" href="https://skillnest.co.in${targetUrl}">
<meta http-equiv="refresh" content="0; url=https://skillnest.co.in${targetUrl}">
<meta name="robots" content="noindex, follow">
<script>window.location.replace("${targetUrl}");</script>
</head>
<body>
<main>
<p>This page has moved. <a href="${targetUrl}">Click here</a> if you are not redirected automatically.</p>
</main>
</body>
</html>`;
    
    const absPath = path.join(ROOT, filename);
    ensureDir(path.dirname(absPath));
    fs.writeFileSync(absPath, html, 'utf8');
    console.log(`Generated Redirect Stub: ${filename} -> ${targetUrl}`);
  }
}

// Update sitemap-cities.xml
function updateSitemap() {
  const sitemapPath = path.join(ROOT, 'sitemap-cities.xml');
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  // Add Hub Page
  xml += `  <url>\n    <loc>https://skillnest.co.in/cities/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
  
  // Add More Cities Page
  xml += `  <url>\n    <loc>https://skillnest.co.in/cities/more-cities/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;

  // City-specific pages are no longer generated and therefore excluded from the sitemap.

  xml += `</urlset>\n`;
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log('Successfully updated sitemap-cities.xml');
}

// Update llms.txt references
function updateLlmsTxt() {
  const llmsPath = path.join(ROOT, 'llms.txt');
  if (!fs.existsSync(llmsPath)) return;

  let content = fs.readFileSync(llmsPath, 'utf8');
  
  // Find where localized city landing pages start
  const index = content.indexOf('## Localized City Landing Pages');
  if (index !== -1) {
    let headerPart = content.substring(0, index);
    
    let citiesPart = '## Localized City Landing Pages (Priority: 0.5)\n\nSkillNest operates localized online cohorts for regional city nodes:\n';
    citiesPart += `- [Cities Hub](https://skillnest.co.in/cities/): Discover programs and localized batches in all cities.\n`;
    
    citiesPart += `- [More Cities & Regional Batches](https://skillnest.co.in/cities/more-cities/): Explore supplementary online coding and computer programs across all states and regional cities.\n`;
    
    // Add crawler metadata
    const crawlerIndex = content.indexOf('## Crawler Metadata & Sitemap Indexes');
    let crawlerPart = '';
    if (crawlerIndex !== -1) {
      crawlerPart = '\n' + content.substring(crawlerIndex);
    }
    
    fs.writeFileSync(llmsPath, headerPart + citiesPart + crawlerPart, 'utf8');
    console.log('Successfully updated llms.txt');
  }
}

// Run compilation
console.log('=== STARTING GENERATION OF CITIES PAGES ===');
generateCitiesHub();
generateMoreCities();
generateCityPages();
generateCityServices();
generateRedirectStubs();
updateSitemap();
updateLlmsTxt();
console.log('=== CITIES GENERATION COMPLETE ===');
