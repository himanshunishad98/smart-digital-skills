const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../');

// Define resources pages configuration
const pages = [
  {
    path: 'resources/index.html',
    depth: 1,
    url: 'https://skillnest.co.in/resources/',
    title: 'Free Educational Resources & Digital Skill Hub | SkillNest',
    description: 'Access SkillNest\'s official educational resources: kids-safe AI tools, worksheets, parent guides, typing practice, mini-courses, and CBSE resources.',
    breadcrumbs: [
      { name: 'Home', url: '../index.html' },
      { name: 'Resources', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'SkillNest Hub',
      title: 'Free Educational Resources & <span>Digital Skill Hub</span> 🎓',
      subtitle: 'Unlock interactive toolkits, kids-safe AI prompt templates, downloadable worksheets, parent guides, and CBSE resource materials designed to transition children from passive screen consumption to creative builders.',
      stats: [
        { icon: '🛠️', label: 'AI & Design Tools' },
        { icon: '📝', label: 'Printable Worksheets' },
        { icon: '👪', label: 'Digital Parent Guides' },
        { icon: '🏫', label: 'CBSE Class 1–12 PDFs' }
      ]
    },
    aeo: {
      question: 'What educational resources are available on SkillNest?',
      answer: 'SkillNest provides a complete suite of free digital literacy resources for students and parents. This includes kids-safe AI tools, typing practice exercises, worksheets, parent guides, mini-courses, and CBSE Class 1–12 study materials designed to shift screen time from passive consumption to active computational creation.'
    },
    sections: `
      <!-- Resources Grid -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Resource Categories</div>
            <h2 class="section-title">Explore Our <span>Educational Assets</span></h2>
            <p class="section-sub">Select a category below to access guides, tools, and downloadable materials.</p>
          </div>

          <div class="why-grid">
            <div class="why-card fade-up">
              <div class="why-icon">🤖</div>
              <h3>AI Tools</h3>
              <p>Explore safe, educational AI tools for school students. Learn to prompt and build using ChatGPT, Scratch, Canva, and Google Workspace.</p>
              <a class="btn-primary" href="ai-tools/index.html">Access Tools →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">⌨️</div>
              <h3>Typing Practice</h3>
              <p>Improve your touch typing speed and accuracy. Access our keyboarding guide and free download charts to practice home-row keys.</p>
              <a class="btn-primary" href="typing-practice/index.html">Practice Typing →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">📄</div>
              <h3>Worksheets</h3>
              <p>Download free printable computer worksheets for Class 6–8. Excel sheets, Word formats, PPT outlines, and coding templates.</p>
              <a class="btn-primary" href="worksheets/index.html">Get Worksheets →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">👪</div>
              <h3>Parent Guides</h3>
              <p>Access authoritative guides on managing screen time, teaching AI safety rules, and digital parenting agreements.</p>
              <a class="btn-primary" href="parent-guides/index.html">Read Guides →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">📋</div>
              <h3>Digital Skills Checklist</h3>
              <p>Assess your child's tech competency. Standard checklist covering computer basics, files, coding logic, and internet safety.</p>
              <a class="btn-primary" href="digital-skills-checklist/index.html">View Checklist →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">🔒</div>
              <h3>Cyber Safety Guide</h3>
              <p>Ensure your child stays safe online. Guidebooks on strong passwords, phishing emails, social safety, and privacy controls.</p>
              <a class="btn-primary" href="cyber-safety-guide/index.html">Read Safety Rules →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">🎓</div>
              <h3>Free Mini Courses</h3>
              <p>Watch short video tutorials and interactive computer basics courses covering spreadsheets, design, and safe AI inputs.</p>
              <a class="btn-primary" href="free-mini-courses/index.html">Start Courses →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">✍️</div>
              <h3>AI Prompt Guide</h3>
              <p>Download prompt engineering templates designed for school students. Formulate gravity queries, coding scripts, and writing tasks.</p>
              <a class="btn-primary" href="ai-prompt-guide/index.html">Explore Prompts →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">📚</div>
              <h3>CBSE Resources</h3>
              <p>Consolidate access to Class 1–12 educational resources, including free official NCERT book downloads and study guides.</p>
              <a class="btn-primary" href="cbse-resources/index.html">Explore CBSE →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Trust Block -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>National Trust</div>
            <h2 class="section-title">Supporting <span>Indian Classrooms</span></h2>
            <p class="section-sub">Parents and teachers across Delhi, Mumbai, Pune, and Bangalore trust SkillNest to guide children towards digital excellence.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <p>"Our resources are designed to match standard CBSE curricula and NEP 2020 frameworks. By offering practical, downloadable assets, we support school study habits in cities like Raipur and Bhopal."</p>
              <strong>— The SkillNest Curriculum Team</strong>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Are all resources on this hub free to download?',
        a: 'Yes, all guidebooks, checklists, prompt templates, and CBSE study worksheets are completely free to read, print, and download. No subscription or credit card details are required.'
      },
      {
        q: 'How does SkillNest complement school computer classes?',
        a: 'While schools in cities like Hyderabad, Pune, and Jaipur focus on theoretical computer definitions, SkillNest resources encourage practical, hands-on application: designing sheets, writing code, and learning keyboarding habits.'
      }
    ],
    faqs: [
      {
        q: 'What is the SkillNest Educational Resources Hub?',
        a: 'It is a centralized directory of free toolkits, guides, checklists, worksheets, and CBSE materials designed to help students build 21st-century digital competencies.'
      },
      {
        q: 'Who are these digital resources designed for?',
        a: 'They are specifically curated for school students (primarily Class 6–8) and parents seeking authoritative guidance on technology habits, safety, and learning.'
      },
      {
        q: 'Does the hub align with the NEP 2020 curriculum?',
        a: 'Yes. All worksheets, safety guides, and courses align with NEP 2020 digital literacy recommendations, shifting focus from rote learning to critical logical thinking.'
      },
      {
        q: 'How do I download worksheets and guides?',
        a: 'Simply visit the respective worksheets or guides page and click the direct download links. All documents are available in PDF or standard document formats.'
      },
      {
        q: 'Is there support for students in regional cities like Indore or Raipur?',
        a: 'Yes. SkillNest supports students across all cities in India with live online batches that fit local school timetables, supplemented by these downloadable files.'
      },
      {
        q: 'Are the AI prompt guides safe for kids?',
        a: 'Yes, all AI templates and guidelines focus on educational, child-safe prompts that teach kids logical command structures under parental observation.'
      },
      {
        q: 'How can typing practice help my child?',
        a: 'Mastering home-row keys improves typing speed and posture, reducing homework execution time and building strong digital workspace habits.'
      },
      {
        q: 'How do I access CBSE Class 1–12 books?',
        a: 'Navigate to the CBSE Resources section, choose the corresponding class, and access direct download paths for official NCERT textbooks.'
      }
    ]
  },
  {
    path: 'resources/ai-tools/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/resources/ai-tools/',
    title: 'Best Educational AI Tools for Kids & School Students | SkillNest',
    description: 'Explore child-safe AI tools, prompts, and guidelines for school students. Learn ChatGPT prompts, Scratch logic, Canva design, and Google Workspace safely.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Resources', url: '../index.html' },
      { name: 'AI Tools', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'AI Tools Directory',
      title: 'Educational AI Tools for <span>Young Creators</span> 🤖',
      subtitle: 'Teach your child to use Generative AI responsibly. Access prompt frameworks and tools curated specifically for Class 6–8 students under parental guidance.',
      stats: [
        { icon: '🧠', label: 'Logical Prompting' },
        { icon: '🛡️', label: '100% Safe Guidelines' },
        { icon: '🎨', label: 'Creative Designing' },
        { icon: '💻', label: 'Hands-on Projects' }
      ]
    },
    aeo: {
      question: 'What are the best AI tools for school students?',
      answer: 'The best educational AI tools for school students include ChatGPT for educational research, Canva for graphic and presentation design, Scratch for block-based coding logic, and Google Workspace tools. Using these under safe boundaries builds strong logical and digital literacy skills.'
    },
    sections: `
      <!-- AI Tools Section -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Approved Tools</div>
            <h2 class="section-title">Kids-Safe <span>AI & Creative Tools</span></h2>
            <p class="section-sub">A curated list of educational tools that build computational logic and creativity.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <div class="why-icon">🤖</div>
              <h3>ChatGPT & Claude (Generative AI)</h3>
              <p>Used as an interactive tutor to explain complex topics. Students learn to write structured prompting queries to generate scientific summaries or mathematical steps.</p>
              <a href="../ai-prompt-guide/index.html" style="color: var(--blue-600); font-weight: 800; text-decoration: underline;">View Prompt Templates →</a>
            </div>

            <div class="why-card">
              <div class="why-icon">🎨</div>
              <h3>Canva Magic Design</h3>
              <p>Builds visual design and presentation layouts. Students use AI features to design school projects, slides, and educational posters while adhering to design rules.</p>
            </div>

            <div class="why-card">
              <div class="why-icon">🐈</div>
              <h3>Scratch Block Coding</h3>
              <p>Teaches logic structures, variables, and coordinate maps. Students code animations and interactive math games, shifting from consumers to logic designers.</p>
            </div>

            <div class="why-card">
              <div class="why-icon">📊</div>
              <h3>Google Workspace & AI</h3>
              <p>Students use Docs, Sheets, and Slides to structure data. AI assistance helps them format essays, create clean formulas, and design graphs effectively.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Safety Rules Section -->
      <section class="before-after-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Safety First</div>
            <h2 class="section-title">4 Rules of <span>Safe Student AI Use</span></h2>
            <p class="section-sub">Ensure a child-safe educational workspace for your family.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>1. Parental Supervision</h3>
              <p>Keep the computer in shared family spaces in Mumbai and Pune. Avoid private, unmonitored chatbot accounts for children below 13.</p>
            </div>
            <div class="why-card">
              <h3>2. Protect Private Info</h3>
              <p>Never paste personal names, phone numbers, school locations, or passwords into any AI prompts or platforms.</p>
            </div>
            <div class="why-card">
              <h3>3. Fact-Check Everything</h3>
              <p>AI tools can generate incorrect statements (hallucinations). Students in Raipur and Delhi are taught to verify AI data with textbooks.</p>
            </div>
            <div class="why-card">
              <h3>4. Use for Assistance, Not Cheating</h3>
              <p>Use AI to explain math logic or brainstorm titles, never to copy and paste completed homework assignments.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Is ChatGPT safe for Class 6 students?',
        a: 'Yes, if used under parental supervision with educational prompting frameworks. Parents should create a shared family account and monitor history logs regularly.'
      },
      {
        q: 'What is the minimum age to learn AI prompts?',
        a: 'Students in Class 6–8 (ages 10–14) are at the perfect age. They have the vocabulary and logical capability to write structured queries and evaluate outcomes.'
      }
    ],
    faqs: [
      {
        q: 'What are educational AI tools?',
        a: 'Educational AI tools are software platforms using machine learning models to help students brainstorm, learn logical coding, and design presentations.'
      },
      {
        q: 'How does AI help in middle school studies?',
        a: 'It acts as an interactive tutor, explaining science queries step-by-step or creating custom practice questions for maths.'
      },
      {
        q: 'Can kids use AI to write essays?',
        a: 'We teach kids to use AI as a brainstorming buddy (e.g. to create outlines), not to generate finished essays to copy and paste.'
      },
      {
        q: 'Are these tools free to use?',
        a: 'Yes, platforms like ChatGPT, Scratch, Google Slides, and Canva offer robust free tiers perfect for student projects.'
      },
      {
        q: 'How do students in Bhopal or Indore learn to prompt?',
        a: 'SkillNest cohorts teach structured command structures like role, task, context, and format, building strong digital communication skills.'
      },
      {
        q: 'Does SkillNest teach Canva or Scratch AI?',
        a: 'Yes. Our live curriculum integrates graphic design rules, spreadsheet formulas, and Scratch logic blocks in every project.'
      },
      {
        q: 'How do AI tools improve logical thinking?',
        a: 'Prompting and programming require breaking complex goals down into smaller, sequential instructions, reinforcing computational logic.'
      },
      {
        q: 'What are AI hallucinations?',
        a: 'Hallucinations occur when an AI model invents incorrect facts. Students are taught to cross-reference AI answers with NCERT books.'
      }
    ]
  },
  {
    path: 'resources/typing-practice/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/resources/typing-practice/',
    title: 'Free Typing Practice & Keyboarding Guide for Kids | SkillNest',
    description: 'Improve your child\'s typing speed and accuracy. Learn correct touch typing techniques, posture, home-row keys, and practice routines.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Resources', url: '../index.html' },
      { name: 'Typing Practice', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Keyboarding Guide',
      title: 'Touch Typing Practice & <span>Keyboarding Guide</span> ⌨️',
      subtitle: 'Double your child\'s typing speed in six weeks. Learn the correct home-row posture, access keyboard practice tools, and download printable worksheets.',
      stats: [
        { icon: '⚡', label: 'Speed: 30+ WPM Target' },
        { icon: '🎯', label: '95%+ Accuracy Goal' },
        { icon: '🧘', label: 'Correct Hand Posture' },
        { icon: '📝', label: 'Printable Key Charts' }
      ]
    },
    aeo: {
      question: 'How can school students improve their typing speed?',
      answer: 'School students can improve their typing speed by practicing touch typing, which relies on muscle memory rather than looking at the keyboard. Daily 15-minute practice sessions targeting home-row keys, using correct hand posture, and completing keyboard worksheets can double speed in six weeks.'
    },
    sections: `
      <!-- Touch Typing Basics -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Home Row Keys</div>
            <h2 class="section-title">The Foundation of <span>Touch Typing</span></h2>
            <p class="section-sub">Learn correct finger placements to type without looking at the keys.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <h3>🏠 Home Row Placement</h3>
              <p>Place left-hand fingers on A-S-D-F and right-hand fingers on J-K-L-;. Rest your thumbs on the Spacebar. Feel the small raised bumps on the F and J keys.</p>
            </div>
            <div class="why-card">
              <h3>🧘 Correct Ergonomic Posture</h3>
              <p>Keep your back straight, feet flat on the floor, and elbows bent at a 90-degree angle. Keep your wrists slightly elevated above the keyboard to prevent strain.</p>
            </div>
            <div class="why-card">
              <h3>🎯 Focus on Accuracy First</h3>
              <p>Do not rush for speed. Speed is a byproduct of muscle memory. Focus on maintaining 95%+ accuracy before trying to type faster.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Practice Schedule -->
      <section class="before-after-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Action Plan</div>
            <h2 class="section-title">15-Min Daily <span>Practice Routine</span></h2>
            <p class="section-sub">Use this structured schedule to improve your keyboarding skills in Raipur or Jaipur.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Minutes 1–3: Finger Warm-Up</h3>
              <p>Type simple lines of A-S-D-F and J-K-L-; repeatedly. Get your fingers accustomed to finding home row locations without looking.</p>
            </div>
            <div class="why-card">
              <h3>Minutes 4–10: Row Expansion</h3>
              <p>Practice reaching up for the Q-W-E-R-T / Y-U-I-O-P keys and reaching down for Z-X-C-V-B / N-M keys. Always return to home positions.</p>
            </div>
            <div class="why-card">
              <h3>Minutes 11–15: Sentence Speed Drills</h3>
              <p>Type sentences containing all letters of the alphabet (e.g. "The quick brown fox jumps over the lazy dog"). Measure your Words Per Minute (WPM).</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'What is a good typing speed for a Class 6 student?',
        a: 'A speed of 25 to 30 Words Per Minute (WPM) with 95% accuracy is excellent for Class 6–8 students, allowing them to complete computer assignments quickly.'
      },
      {
        q: 'Is touch typing better than hunting and pecking?',
        a: 'Yes. Hunting and pecking limits speed to around 15 WPM and requires constant eye shift. Touch typing builds muscle memory, letting students type up to 60+ WPM.'
      }
    ],
    faqs: [
      {
        q: 'What is touch typing?',
        a: 'Touch typing is a keyboarding method where fingers rest on the home row and locate all other keys through muscle memory without looking.'
      },
      {
        q: 'How long does it take for a child to type fast?',
        a: 'With consistent 15-minute daily practice, most school students see a significant speed improvement within 4 to 6 weeks.'
      },
      {
        q: 'Why are the raised bumps on J and F keys important?',
        a: 'They help fingers identify the correct home-row placement by feel, ensuring correct alignment without needing to look down.'
      },
      {
        q: 'What are some free typing practice tools?',
        a: 'Free platforms include Keybr, TypingClub, and TypeTastic, which offer engaging typing games designed for school children.'
      },
      {
        q: 'How does typing help with school homework in Delhi or Bangalore?',
        a: 'Increasing typing speeds from 10 WPM to 30 WPM cuts the time required to type essays, reports, and slide notes in half.'
      },
      {
        q: 'Should kids learn numeric keypad typing too?',
        a: 'Yes, learning the top number row and numeric keypad is very helpful for Excel worksheet assignments and maths exercises.'
      },
      {
        q: 'How does hand posture prevent wrist pain?',
        a: 'Keeping wrists straight and elevated prevents strain on tendons, avoiding fatigue during long homework tasks.'
      },
      {
        q: 'Can I download a printable typing chart?',
        a: 'Yes. Visiting our worksheets section allows parents to download printable keyboard layout charts to guide home row practices.'
      }
    ]
  },
  {
    path: 'resources/worksheets/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/resources/worksheets/',
    title: 'Free Computer & Coding Worksheets for Kids | SkillNest',
    description: 'Download free, printable computer and coding worksheets. Fillable PDF worksheets for MS Word, Excel, PowerPoint, Scratch, and Cyber Safety.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Resources', url: '../index.html' },
      { name: 'Worksheets', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Printable Worksheets',
      title: 'Printable Computer & <span>Coding Worksheets</span> 📄',
      subtitle: 'Support your child\'s digital learning with free worksheets. Perfect for Class 6–8 students practicing typing, Excel formulas, slide designs, and Scratch blocks.',
      stats: [
        { icon: '📄', label: '100% Free Downloads' },
        { icon: '🎨', label: 'MS Office Exercises' },
        { icon: '🧱', label: 'Coding Program Maps' },
        { icon: '🔒', label: 'Cyber Safety Tests' }
      ]
    },
    aeo: {
      question: 'Where can I download computer worksheets for kids?',
      answer: 'You can download free computer worksheets directly from SkillNest\'s Worksheets index. We offer printable and fillable PDF worksheets covering MS Word formatting, Excel sheet calculations, PowerPoint presentation layouts, Scratch block logic, and cyber safety tests for Class 6–8 students.'
    },
    sections: `
      <!-- Worksheets Catalog -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Download Catalog</div>
            <h2 class="section-title">Computer <span>Worksheet Downloads</span></h2>
            <p class="section-sub">Download, print, and practice critical digital tasks at home in Pune or Ranchi.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <h3>⌨️ Keyboarding & Typing Chart</h3>
              <p>Printable keyboard finger map showing home row rests and reach pathways. Perfect to tape next to the computer desk for reference.</p>
              <a href="#" class="btn-primary" style="margin-top: 15px;">Download PDF ↓</a>
            </div>

            <div class="why-card">
              <h3>📝 Microsoft Word Formatting Exercise</h3>
              <p>Practice adjusting page margins, applying headers/footers, inserting tables, and formatting school essay reports neatly.</p>
              <a href="#" class="btn-primary" style="margin-top: 15px;">Download Docx ↓</a>
            </div>

            <div class="why-card">
              <h3>📊 Excel Spreadsheet Formula Grid</h3>
              <p>Practice writing basic arithmetic formulas (SUM, AVERAGE), managing borders, sorting student data, and designing pie charts.</p>
              <a href="#" class="btn-primary" style="margin-top: 15px;">Download Xlsx ↓</a>
            </div>

            <div class="why-card">
              <h3>🧱 Coding Program Block Map</h3>
              <p>Offline workbook showing coding blocks (If-Then, Forever loops, Variables). Kids draw logical paths to solve animated puzzles.</p>
              <a href="#" class="btn-primary" style="margin-top: 15px;">Download PDF ↓</a>
            </div>

            <div class="why-card">
              <h3>🔒 Cyber Safety Threat Checklist</h3>
              <p>Fun scenario test helping kids identify secure passwords, spot phishing email signs, and write safe chat responses.</p>
              <a href="#" class="btn-primary" style="margin-top: 15px;">Download PDF ↓</a>
            </div>
          </div>
        </div>
      </section>

      <!-- How to use worksheets -->
      <section class="before-after-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Guidance</div>
            <h2 class="section-title">How to Maximize <span>Worksheet Practice</span></h2>
            <p class="section-sub">Follow this structure to build independent computer skills in Bhopal or Indore.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Print or Use Fillable Files</h3>
              <p>Worksheets are available as printable sheets or fillable digital files. We recommend completing the MS Office tasks directly on a computer screen.</p>
            </div>
            <div class="why-card">
              <h3>Complete One Task Weekly</h3>
              <p>Choose one worksheet weekly. Practice the tasks (e.g. typing exercises or coding loops) for 20 minutes to reinforce the logic structure.</p>
            </div>
            <div class="why-card">
              <h3>Maintain a Practice Portfolio</h3>
              <p>Have your child save their completed Word, Excel, and Scratch files in a structured folder, building good computer file system habits.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Do I need specific software to complete these worksheets?',
        a: 'Yes, MS Office worksheets require Microsoft Word, Excel, or PowerPoint. Coding Program worksheets can be solved on paper or on the official Scratch website.'
      },
      {
        q: 'Are these worksheets suitable for school homework?',
        a: 'Absolutely. Many school teachers and parents in cities like Hyderabad and Lucknow use these sheets to test practical computer literacy and design skills.'
      }
    ],
    faqs: [
      {
        q: 'Are the computer worksheets free?',
        a: 'Yes, all worksheets in this catalog are 100% free to download, print, and use for educational purposes.'
      },
      {
        q: 'What classes are these worksheets designed for?',
        a: 'They are specifically curated for Class 6–8 middle school students, though younger beginners can use the typing charts.'
      },
      {
        q: 'What is the format of the downloadable files?',
        a: 'We offer standard PDF files for printing, along with editable Microsoft Word (.docx) and Excel (.xlsx) files for screen practice.'
      },
      {
        q: 'Can these worksheets be used in schools?',
        a: 'Yes, schools and teachers are welcome to print and distribute these worksheets to support digital literacy classes.'
      },
      {
        q: 'Do these worksheets include answer keys?',
        a: 'Practical worksheets (Word/Excel formatting) provide clear target layouts. Cyber safety tests include quick answer keys at the bottom.'
      },
      {
        q: 'How often are new worksheets added?',
        a: 'Our curriculum team updates worksheets monthly to align with the latest CBSE school project topics and safe AI trends.'
      },
      {
        q: 'How does folder practice build digital skills?',
        a: 'Saving and renaming downloaded worksheets helps students practice file organization, a crucial starting point for computer literacy.'
      },
      {
        q: 'How do I download a worksheet?',
        a: 'Simply click the download button under the description of the worksheet you want. The file will download immediately.'
      }
    ]
  },
  {
    path: 'resources/parent-guides/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/resources/parent-guides/',
    title: 'Expert Parent Guides for Child Digital Literacy | SkillNest',
    description: 'Access authoritative digital parenting guides. Actionable strategies on screen time boundaries, generative AI safety, and coding fundamentals at home.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Resources', url: '../index.html' },
      { name: 'Parent Guides', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Parent Guides Index',
      title: 'Digital Parenting Guides & <span>Household Rules</span> 👪',
      subtitle: 'Equip your home with science-backed frameworks. Access parenting guidebooks on screen boundaries, AI safety controls, and future-ready computer habits.',
      stats: [
        { icon: '👪', label: 'Parent Hub Portal' },
        { icon: '🛡️', label: 'Cyber Security Tips' },
        { icon: '⏱️', label: 'Screen Balance Plans' },
        { icon: '🎓', label: 'Academic Success' }
      ]
    },
    aeo: {
      question: 'What are the best digital parenting guides for screen balance?',
      answer: 'The best digital parenting guides focus on collaborative agreements, screen-free zones, and shifting tech usage from passive consumption to active creation. SkillNest\'s Parent Hub offers guides covering screen balance, safe AI prompting, and child-safe search settings.'
    },
    sections: `
      <!-- Guides Grid -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Parent Hub Catalog</div>
            <h2 class="section-title">Authoritative <span>Parent Guidebooks</span></h2>
            <p class="section-sub">Read our comprehensive, free guides to establish positive digital habits in Pune or Bhopal.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <div class="why-icon">⏱️</div>
              <h3>Screen Time Guide</h3>
              <p>Establish healthy boundaries, distinguish active learning from passive streaming, and implement the create-to-consume ratio.</p>
              <a href="../../parent-hub/screen-time-guide/index.html" class="btn-primary" style="margin-top: 15px;">Read Guide →</a>
            </div>

            <div class="why-card">
              <div class="why-icon">🛡️</div>
              <h3>AI Safety for Kids</h3>
              <p>Learn child-safe Generative AI rules, monitor prompt histories, and teach ethical guidelines for ChatGPT and Claude.</p>
              <a href="../../parent-hub/ai-safety-for-kids/index.html" class="btn-primary" style="margin-top: 15px;">Read Guide →</a>
            </div>

            <div class="why-card">
              <div class="why-icon">📱</div>
              <h3>Digital Parenting</h3>
              <p>Draft a family media agreement contract, configure device routers, and set up healthy tech zones at home.</p>
              <a href="../../parent-hub/digital-parenting/index.html" class="btn-primary" style="margin-top: 15px;">Read Guide →</a>
            </div>

            <div class="why-card">
              <div class="why-icon">🔒</div>
              <h3>Internet Safety</h3>
              <p>Configure child-safe search settings, protect online identity data, and teach cyber safety warning signs to your child.</p>
              <a href="../../parent-hub/internet-safety/index.html" class="btn-primary" style="margin-top: 15px;">Read Guide →</a>
            </div>

            <div class="why-card">
              <div class="why-icon">🚀</div>
              <h3>Future Skills Guide</h3>
              <p>Learn which computer basics, touch typing speeds, Excel formulas, and presentation tools middle schoolers need for future success.</p>
              <a href="../../parent-hub/future-skills-guide/index.html" class="btn-primary" style="margin-top: 15px;">Read Guide →</a>
            </div>

            <div class="why-card">
              <div class="why-icon">🧠</div>
              <h3>Learning Tips</h3>
              <p>Design a distraction-free home study space, leverage basic learning science, and maintain academic motivation.</p>
              <a href="../../parent-hub/learning-tips/index.html" class="btn-primary" style="margin-top: 15px;">Read Guide →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Family Contract Section -->
      <section class="before-after-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Action Plan</div>
            <h2 class="section-title">Implementing a <span>Family Media Agreement</span></h2>
            <p class="section-sub">Draft a clear contract to align digital boundaries in Raipur or Jaipur.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>1. Focus on Collaboration</h3>
              <p>Do not impose boundaries without discussion. Involve your child in deciding appropriate screen slots, making them feel heard.</p>
            </div>
            <div class="why-card">
              <h3>2. Set Clear Consequences</h3>
              <p>Agree beforehand on the outcome if screen rules are bypassed (e.g. loss of gaming time the next day), avoiding argument escalations.</p>
            </div>
            <div class="why-card">
              <h3>3. Be a Tech Role Model</h3>
              <p>Ensure parents adhere to phone-free dinners and screen-free bedrooms, setting a positive example for kids in Mumbai or Delhi.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Are these parenting guides backed by research?',
        a: 'Yes. All guidelines align with recommendations from leading pediatric associations and digital citizenship research foundations regarding healthy student tech habits.'
      },
      {
        q: 'Where do I find the family agreement worksheets?',
        a: 'Visiting the worksheets directory allows parents to download free, printable family media contract templates.'
      }
    ],
    faqs: [
      {
        q: 'What is the SkillNest Parent Guides directory?',
        a: 'It is a directory linking to comprehensive guidebooks on digital balance, internet safety, computational learning, and AI rules.'
      },
      {
        q: 'Do these guides cost money to read?',
        a: 'No, all guides and checklists are completely free to read, print, and share with your community.'
      },
      {
        q: 'How do I handle video game addiction?',
        a: 'Our Screen Time Guide outlines steps to transition that visual focus into Scratch game programming, shifting kids from players to creators.'
      },
      {
        q: 'Are there guides for setting parental controls?',
        a: 'Yes, our Internet Safety Guide outlines safe search steps for Google Chrome, Windows, Mac, and home internet routers.'
      },
      {
        q: 'How does SkillNest support parents in Indore or Raipur?',
        a: 'We provide structured live cohorts and keep parents updated with regular student portfolios and cyber safety checklists.'
      },
      {
        q: 'What is the create-to-consume screen ratio?',
        a: 'It is a boundary requiring students to spend equal time on active digital building (e.g. typing, coding) for every hour of passive media streaming.'
      },
      {
        q: 'How do I introduce ChatGPT to my child safely?',
        a: 'Our AI Safety Guide recommends sharing a family account, monitoring history logs, and focusing prompts on school study topics.'
      },
      {
        q: 'Who should read these parenting guidebooks?',
        a: 'They are designed for parents of Class 6–8 students, but the basic digital balance rules apply to school children of all ages.'
      }
    ]
  },
  {
    path: 'resources/digital-skills-checklist/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/resources/digital-skills-checklist/',
    title: 'Ultimate Digital Skills Checklist for Kids (Class 6-8) | SkillNest',
    description: 'Check your child\'s digital readiness with the ultimate digital skills checklist. Review keyboarding, file system rules, spreadsheets, coding, and safe AI.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Resources', url: '../index.html' },
      { name: 'Checklist', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Skills Checklist',
      title: 'Digital Skills Checklist for <span>School Students</span> 📋',
      subtitle: 'Is your child ready for the modern digital workspace? Review this checklist of essential competencies in computer basics, design, programming, and safety.',
      stats: [
        { icon: '📋', label: 'Comprehensive List' },
        { icon: '⌨️', label: 'Keyboard Standards' },
        { icon: '📊', label: 'MS Office Goals' },
        { icon: '🛡️', label: 'Cyber Safety Audits' }
      ]
    },
    aeo: {
      question: 'What digital skills should a Class 6-8 student know?',
      answer: 'A Class 6–8 middle school student should master touch typing (25+ WPM), structured folder organization, email etiquette, Microsoft Word text formatting, Excel spreadsheet calculations, PowerPoint presentation layouts, Coding Program logic, safe Generative AI prompting, and cyber safety practices.'
    },
    sections: `
      <!-- Checklist Catalog -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Competency Check</div>
            <h2 class="section-title">The Essential <span>Tech Competency Checklist</span></h2>
            <p class="section-sub">Review these seven categories to evaluate your child's digital literacy in Bangalore or Delhi.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <h3>⌨️ 1. Keyboarding & Typing</h3>
              <ul>
                <li>✓ Place fingers correctly on home-row keys (A-S-D-F, J-K-L-;)</li>
                <li>✓ Type at least 25 Words Per Minute (WPM) without looking down</li>
                <li>✓ Maintain a 95%+ accuracy score on speed tests</li>
              </ul>
            </div>

            <div class="why-card">
              <h3>📂 2. Operating System & File Rules</h3>
              <ul>
                <li>✓ Create, rename, delete, and organize folders logically</li>
                <li>✓ Save files inside specific directories (avoiding Desktop clutter)</li>
                <li>✓ Search for documents using keywords in file manager search</li>
              </ul>
            </div>

            <div class="why-card">
              <h3>📝 3. Word Processing (MS Word)</h3>
              <ul>
                <li>✓ Format fonts, weights, alignments, and spacings cleanly</li>
                <li>✓ Insert page margins, headers, footers, and page numbers</li>
                <li>✓ Design structured tables to display educational data</li>
              </ul>
            </div>

            <div class="why-card">
              <h3>📊 4. Spreadsheets (MS Excel)</h3>
              <ul>
                <li>✓ Enter numeric data in columns and adjust column widths</li>
                <li>✓ Write basic formulas (SUM, AVERAGE) to calculate numbers</li>
                <li>✓ Generate pie charts and bar graphs from data grids</li>
              </ul>
            </div>

            <div class="why-card">
              <h3>🧱 5. Block Programming (Scratch)</h3>
              <ul>
                <li>✓ Understand basic coding logic: If-Then statements, Forever loops</li>
                <li>✓ Use variables to count points in a custom math game</li>
                <li>✓ Move objects around the screen using X and Y coordinates</li>
              </ul>
            </div>

            <div class="why-card">
              <h3>🔒 6. Cyber Safety & Security</h3>
              <ul>
                <li>✓ Design secure passwords combining letters, numbers, and symbols</li>
                <li>✓ Identify threat signs in phishing emails and unsolicited chats</li>
                <li>✓ Configure child-safe search settings on web browsers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Checklist Actions -->
      <section class="before-after-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Next Steps</div>
            <h2 class="section-title">How to Complete <span>This Checklist</span></h2>
            <p class="section-sub">Follow this action plan to build competencies in Hyderabad or Patna.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>1. Practice on a Computer</h3>
              <p>Have your child sit at a desktop or laptop (rather than a tablet) to practice real physical keyboarding and mouse coordination.</p>
            </div>
            <div class="why-card">
              <h3>2. Download Practice Worksheets</h3>
              <p>Get exercise files from our worksheets page. Practice formatting margins, writing Excel columns, and coding Scratch blocks.</p>
            </div>
            <div class="why-card">
              <h3>3. Schedule a Live Diagnostic</h3>
              <p>Book a free SkillNest demo session. An expert instructor will review your child's typing speed and computational logical skills.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Is computer file organization important for kids?',
        a: 'Yes. Teaching kids to create named folders and save files correctly prevents computer clutter and builds critical structure and organizational habits.'
      },
      {
        q: 'Why does the checklist recommend MS Office?',
        a: 'Word, Excel, and PowerPoint are standard tools across high schools, universities, and offices globally. Mastering them early saves hours on projects.'
      }
    ],
    faqs: [
      {
        q: 'What is the digital skills checklist?',
        a: 'It is a self-assessment list of essential keyboarding, operating system, MS Office, programming, and safety skills for middle schoolers.'
      },
      {
        q: 'At what age should a child complete this checklist?',
        a: 'Ideally, students in Class 6–8 (ages 10–14) should master all of these core digital competencies.'
      },
      {
        q: 'How does typing speed impact schoolwork?',
        a: 'Faster typing speeds (25+ WPM) allow students to draft reports and write slide notes efficiently, avoiding academic fatigue.'
      },
      {
        q: 'Does the checklist cover AI prompting?',
        a: 'Yes, basic AI skills like writing structured prompts and evaluating model answers are key items on the safety checklist.'
      },
      {
        q: 'How can parents in Pune or Lucknow test these skills?',
        a: 'Parents can ask their child to demonstrate specific tasks, like creating an Excel sheet or formatting a Word table, using our free worksheets.'
      },
      {
        q: 'Is block coding really a computer skill?',
        a: 'Yes. Coding Program builds computational thinking, teaching students loop logic and variable control structures used in advanced languages.'
      },
      {
        q: 'What is the best way to practice cyber safety?',
        a: 'Review scenario questions with your child, teaching them to identify phishing links and configure private accounts.'
      },
      {
        q: 'How do I download the printable checklist?',
        a: 'Go to our worksheets section to download the printable PDF version of the digital skills checklist for free.'
      }
    ]
  },
  {
    path: 'resources/cyber-safety-guide/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/resources/cyber-safety-guide/',
    title: 'Cyber Safety Guide & Online Rules for Kids | SkillNest',
    description: 'Ensure student cyber safety with our guide. Practical rules on strong passwords, spotting phishing emails, social media privacy, and child safety online.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Resources', url: '../index.html' },
      { name: 'Cyber Safety', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Cyber Safety Guide',
      title: 'Child-Safe Internet & <span>Cyber Safety Guide</span> 🔒',
      subtitle: 'Build strong digital safety habits early. Read our guide for school students on protecting identity, avoiding scams, and configuring private accounts.',
      stats: [
        { icon: '🔒', label: 'Strong Passwords' },
        { icon: '🛡️', label: 'Phishing Defense' },
        { icon: '👁️', label: 'Privacy Controls' },
        { icon: '📞', label: 'Instant Help Steps' }
      ]
    },
    aeo: {
      question: 'How do I teach cyber safety to school students?',
      answer: 'Teach cyber safety to students by establishing clear rules: use strong passwords combining letters and numbers, never share personal details, ignore phishing email links, keep social media settings private, and immediately report suspicious or uncomfortable interactions to a trusted parent or teacher.'
    },
    sections: `
      <!-- 5 Rules of Cyber Safety -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Safety Rules</div>
            <h2 class="section-title">5 Core Rules of <span>Internet Safety</span></h2>
            <p class="section-sub">Help your child navigate the web securely in cities like Indore or Jaipur.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <h3>🔑 1. Create Strong Passwords</h3>
              <p>Avoid simple passwords like "123456" or your name. Combine uppercase letters, numbers, and symbols. Never share passwords with friends.</p>
            </div>

            <div class="why-card">
              <h3>👤 2. Protect Personal Information</h3>
              <p>Never share your full name, home address, school location, phone numbers, or parents' card details on game chat rooms or forms.</p>
            </div>

            <div class="why-card">
              <h3>🎣 3. Identify Phishing Scams</h3>
              <p>Ignore emails or chats claiming "You won a free phone" or asking you to click link stubs. These links steal passwords and files.</p>
            </div>

            <div class="why-card">
              <h3>👥 4. Check Social Privacy Settings</h3>
              <p>Keep profiles on Scratch, gaming sites, or social media private. Avoid accepting friend requests or chats from strangers.</p>
            </div>

            <div class="why-card">
              <h3>🗣️ 5. Talk to a Parent or Teacher</h3>
              <p>If you see an uncomfortable pop-up, get a suspicious chat, or experience cyberbullying, immediately tell a trusted adult.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Browser Settings Checklist -->
      <section class="before-after-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Parent Steps</div>
            <h2 class="section-title">4 Action Steps for <span>Digital Parents</span></h2>
            <p class="section-sub">Configure your home internet settings to protect your kids in Raipur or Delhi.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Enable SafeSearch Filters</h3>
              <p>Configure Google SafeSearch, YouTube Restricted Mode, and Bing filters to block inappropriate text and search results.</p>
            </div>
            <div class="why-card">
              <h3>Monitor History Regularly</h3>
              <p>Maintain the computer in a shared space. Check history logs weekly, encouraging open discussions about online safety.</p>
            </div>
            <div class="why-card">
              <h3>Set Up Parental Controls</h3>
              <p>Use Microsoft Family Safety or Google Family Link to block downloads, set app limits, and manage screen times.</p>
            </div>
            <div class="why-card">
              <h3>Review App Permissions</h3>
              <p>Ensure educational apps and games do not have access to location trackers, contacts, camera, or mic defaults.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'What is phishing in cyber safety?',
        a: 'Phishing is a scam where hackers send fake emails or messages to trick kids into sharing passwords or clicking links that install malware.'
      },
      {
        q: 'How do kids make strong passwords easily?',
        a: 'Use a passphrase: combine three random words (e.g. "BlueBananaRun!"), which is easy for the child to remember but extremely hard for computers to guess.'
      }
    ],
    faqs: [
      {
        q: 'What is cyber safety for kids?',
        a: 'Cyber safety refers to the rules, habits, and security settings that keep children safe from online scams, identity theft, and cyberbullying.'
      },
      {
        q: 'Why should kids never share personal details online?',
        a: 'Sharing details like school names or phone numbers allows online strangers to trace locations, posing safety risks.'
      },
      {
        q: 'How do I know if an email is a phishing scam?',
        a: 'Phishing emails often feature urgent demands, spelling errors, odd sender addresses, or promises of free prizes.'
      },
      {
        q: 'Is social media safe for Class 6 students?',
        a: 'Most platforms require kids to be at least 13. We recommend avoiding social media profiles and focusing on safe educational forums.'
      },
      {
        q: 'How do parents in Bhopal or Lucknow configure safe routers?',
        a: 'Parents can log into router settings and block adult domains using free parental DNS options like OpenDNS FamilyShield.'
      },
      {
        q: 'What should my child do if they are cyberbullied?',
        a: 'They should block the user, save screenshot records of the messages, and immediately report the interaction to a parent.'
      },
      {
        q: 'Do educational games need safety checks?',
        a: 'Yes, always check if games feature unmonitored chat systems where kids can communicate with anonymous profiles.'
      },
      {
        q: 'Where can I download cyber safety checklists?',
        a: 'Visit our worksheets page to download free, printable cyber safety checklist templates to review with your family.'
      }
    ]
  },
  {
    path: 'resources/free-mini-courses/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/resources/free-mini-courses/',
    title: 'Free Digital Skills Mini-Courses & Tutorials | SkillNest',
    description: 'Watch free mini-courses and video tutorials on Coding Program, Excel tables, PowerPoint designs, keyboarding, and ChatGPT prompts for kids.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Resources', url: '../index.html' },
      { name: 'Mini Courses', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Mini Courses Hub',
      title: 'Free Digital Skills <span>Video Tutorials</span> 🎓',
      subtitle: 'Learn technology step-by-step. Access free mini-courses and video guides designed to teach Class 6–8 students essential coding, design, and spreadsheet skills.',
      stats: [
        { icon: '⏰', label: 'Bite-Sized Modules' },
        { icon: '💻', label: 'Interactive Tasks' },
        { icon: '⭐', label: 'NEP 2020 Aligned' },
        { icon: '🏆', label: 'Certificate Paths' }
      ]
    },
    aeo: {
      question: 'Are there free computer courses for middle schoolers?',
      answer: 'Yes, SkillNest provides free computer mini-courses for middle schoolers. These bite-sized video tutorials and step-by-step interactive guides cover Scratch block coding, Microsoft Excel spreadsheet formulas, Google Slides layout designs, and basic touch typing.'
    },
    sections: `
      <!-- Courses Catalog Grid -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Tutorial Catalog</div>
            <h2 class="section-title">Explore Our <span>Computer Mini-Courses</span></h2>
            <p class="section-sub">Start learning critical digital skills at home in Bangalore or Pune.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <h3>⌨️ Keyboarding Foundations (15 Mins)</h3>
              <p>Learn home-row finger placements, correct typing posture, and simple sentence drills to raise keyboarding speeds.</p>
              <a href="#" class="btn-primary" style="margin-top: 15px;">Start Tutorial →</a>
            </div>

            <div class="why-card">
              <h3>📊 Excel Spreadsheet Basics (20 Mins)</h3>
              <p>Learn to open a spreadsheet, enter numeric data columns, write SUM formulas, and design simple student charts.</p>
              <a href="#" class="btn-primary" style="margin-top: 15px;">Start Tutorial →</a>
            </div>

            <div class="why-card">
              <h3>🧱 Intro to Scratch Animation (25 Mins)</h3>
              <p>Understand block coding rules. Code simple coordinates, loop sequences, and event triggers to animate characters.</p>
              <a href="#" class="btn-primary" style="margin-top: 15px;">Start Tutorial →</a>
            </div>

            <div class="why-card">
              <h3>🎨 Canva Slide Design (20 Mins)</h3>
              <p>Design a beautiful presentation layout. Learn slide grids, typography hierarchy, and safe image search inputs.</p>
              <a href="#" class="btn-primary" style="margin-top: 15px;">Start Tutorial →</a>
            </div>

            <div class="why-card">
              <h3>🤖 Child-Safe ChatGPT Prompting (15 Mins)</h3>
              <p>Master educational prompting. Learn to outline role, task, and formatting constraints to solve school queries.</p>
              <a href="#" class="btn-primary" style="margin-top: 15px;">Start Tutorial →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Learning Pathways link -->
      <section class="highlights-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Full Cohorts</div>
            <h2 class="section-title">Need a <span>Complete Structured Pathway?</span></h2>
            <p class="section-sub">Transition from tutorials to live, expert-led cohorts with 1-on-1 feedback.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Beginner Path (Class 3-5)</h3>
              <p>Build basic computer literacy, folder management, and Scratch animation logic.</p>
              <a href="../../learning-paths/beginner-digital-skills/index.html" style="color: var(--blue-600); font-weight: 800; text-decoration: underline;">Explore Beginner Path →</a>
            </div>
            <div class="why-card">
              <h3>Intermediate Path (Class 6-8)</h3>
              <p>Master MS Office formatting, Canva slide designs, spreadsheets, and safe prompting inputs.</p>
              <a href="../../learning-paths/intermediate-digital-skills/index.html" style="color: var(--blue-600); font-weight: 800; text-decoration: underline;">Explore Intermediate Path →</a>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Do I get a certificate for completing these mini-courses?',
        a: 'Our free mini-courses provide video training. To earn an official SkillNest Digital Skills Certificate, students must enroll and complete our 6-week live cohort.'
      },
      {
        q: 'Are these courses suitable for absolute beginners?',
        a: 'Yes, all mini-courses assume zero prior computer or coding knowledge and guide kids step-by-step with clear screen captures.'
      }
    ],
    faqs: [
      {
        q: 'Are the mini-courses free to watch?',
        a: 'Yes, all video tutorials and text guides on this hub are 100% free to read and watch at your own pace.'
      },
      {
        q: 'What age group are these courses for?',
        a: 'They are designed for school students (Class 6–8), but younger kids can follow along with parental help.'
      },
      {
        q: 'What software do I need to follow the courses?',
        a: 'You will need access to a web browser for Scratch and ChatGPT, and MS Excel/Word for office exercises.'
      },
      {
        q: 'Can kids learn coding through these tutorials?',
        a: 'Yes, our Scratch mini-course teaches foundational event triggers and coordinates, setting the stage for programming.'
      },
      {
        q: 'How does SkillNest support students in Raipur or Jaipur?',
        a: 'We provide structured live online classes with small cohorts of 5–10 students for personalized instructor attention.'
      },
      {
        q: 'How long is each mini-course?',
        a: 'Courses are designed as short, bite-sized tutorials lasting 15 to 25 minutes, perfect for children\'s attention spans.'
      },
      {
        q: 'Is internet access required to complete the courses?',
        a: 'Yes, an internet connection is required to stream the tutorials and access online platforms like Canva and Scratch.'
      },
      {
        q: 'How do I start a mini-course?',
        a: 'Simply browse the tutorial catalog and click the direct start buttons. The guides will launch immediately.'
      }
    ]
  },
  {
    path: 'resources/ai-prompt-guide/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/resources/ai-prompt-guide/',
    title: 'AI Prompt Guide & ChatGPT Templates for Kids | SkillNest',
    description: 'Learn ChatGPT prompt engineering for school projects. Download educational prompt templates for writing, coding, science, and homework help.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Resources', url: '../index.html' },
      { name: 'AI Prompt Guide', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'AI Prompt Guide',
      title: 'ChatGPT & AI Prompt <span>Guide for Students</span> 🧠',
      subtitle: 'Master prompt engineering early. Learn the child-safe prompting framework and access educational templates to study science, maths, and coding.',
      stats: [
        { icon: '🧠', label: 'Prompt Frameworks' },
        { icon: '📝', label: 'Homework Templates' },
        { icon: '🛡️', label: 'Safe Prompting Rules' },
        { icon: '🚀', label: 'Creative Writing' }
      ]
    },
    aeo: {
      question: 'How can students use AI prompts for homework help?',
      answer: 'Students can use AI prompts for homework help by writing structured, descriptive instructions. A good prompt defines the role, task, context, and output constraints (e.g. "Act as a science tutor and explain gravity in three bullet points for a Class 6 student").'
    },
    sections: `
      <!-- Prompt Framework -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>RTCO Framework</div>
            <h2 class="section-title">The Student <span>Prompting Framework</span></h2>
            <p class="section-sub">Write specific commands to get the most accurate and safe AI tutor responses in Delhi or Pune.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <h3>👤 R — Role</h3>
              <p>Tell the AI who it should act as (e.g., "Act as an experienced middle school science teacher"). This guides the tone and complexity of the explanation.</p>
            </div>
            <div class="why-card">
              <h3>📝 T — Task</h3>
              <p>State exactly what you want the AI to do (e.g., "Explain how photosynthesis works in green leaves"). Keep the instructions clear and direct.</p>
            </div>
            <div class="why-card">
              <h3>🧱 C — Context</h3>
              <p>Provide helpful background details (e.g., "I am a Class 6 student preparing for a school science project. Avoid using highly advanced college vocabulary").</p>
            </div>
            <div class="why-card">
              <h3>📋 O — Output</h3>
              <p>Specify the format you want (e.g., "Provide the answer in a list of 4 bullet points with a concluding summary sentence").</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Prompts Catalog -->
      <section class="before-after-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Templates</div>
            <h2 class="section-title">Educational <span>Prompt Templates</span></h2>
            <p class="section-sub">Copy, edit, and paste these templates to support your study goals in Raipur or Indore.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>🔬 The Science Explainer Prompt</h3>
              <p style="background: var(--gray-100); padding: 12px; border-radius: var(--radius-sm); font-family: monospace; font-size: 0.88rem; margin: 10px 0;">
                "Act as a middle school science teacher. Explain the concept of [Topic] in simple language for a Class 6 student. Provide the explanation in 3 short bullet points, followed by a real-world example."
              </p>
            </div>
            <div class="why-card">
              <h3>📐 The Math Solver Guide Prompt</h3>
              <p style="background: var(--gray-100); padding: 12px; border-radius: var(--radius-sm); font-family: monospace; font-size: 0.88rem; margin: 10px 0;">
                "Act as a maths tutor. Explain the steps to solve [Equation/Concept]. Do not give me the final answer directly; guide me through the calculation steps so I can solve it myself."
              </p>
            </div>
            <div class="why-card">
              <h3>✍️ The Vocabulary Helper Prompt</h3>
              <p style="background: var(--gray-100); padding: 12px; border-radius: var(--radius-sm); font-family: monospace; font-size: 0.88rem; margin: 10px 0;">
                "Act as an English teacher. Define the word [Word], explain its origin simply, provide 3 synonyms, and write 2 sentences using the word in a school context."
              </p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Why should kids learn prompt engineering?',
        a: 'Prompting teaches kids logical communication and clear instruction. Learning how to direct AI builds cognitive framing and preparation for future coding tasks.'
      },
      {
        q: 'Can AI help kids study CBSE courses?',
        a: 'Yes. AI can explain concepts in NCERT books or create custom study quizzes to help students prepare for upcoming tests.'
      }
    ],
    faqs: [
      {
        q: 'What is prompt engineering?',
        a: 'Prompt engineering is the process of design, refinement, and composition of text queries to direct AI models to output precise results.'
      },
      {
        q: 'Is prompt engineering safe for school kids?',
        a: 'Yes, if focused on study topics and used under parental supervision to avoid inappropriate search outputs.'
      },
      {
        q: 'What is the RTCO prompting framework?',
        a: 'RTCO stands for Role, Task, Context, and Output, which is our structured method for writing effective educational prompts.'
      },
      {
        q: 'Can kids use ChatGPT to write code?',
        a: 'Yes. Kids can write prompts asking AI to explain how coordinates work in Scratch or to troubleshoot block logic.'
      },
      {
        q: 'How does prompting build logical thinking?',
        a: 'It requires students to analyze problems, specify variables, and plan sequential commands, reinforcing computational thinking.'
      },
      {
        q: 'Do these prompts work on other AI models?',
        a: 'Yes, these structural templates work perfectly on ChatGPT, Claude, Microsoft Copilot, and Google Gemini.'
      },
      {
        q: 'Where do I download prompting templates?',
        a: 'Go to our worksheets section to download the printable PDF version of the prompt templates guide.'
      },
      {
        q: 'Can AI prompts help with vocabulary practice?',
        a: 'Absolutely. Students can use spelling prompts to generate custom word cards and usage examples for school tests.'
      }
    ]
  },
  {
    path: 'resources/cbse-resources/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/resources/cbse-resources/',
    title: 'CBSE Resources & Class 1-12 NCERT Books PDF Download | SkillNest',
    description: 'Central discovery hub for CBSE study materials and Class 1-12 NCERT books. Download official PDF textbooks free for all subjects and exemplars.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Resources', url: '../index.html' },
      { name: 'CBSE Resources', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'CBSE Discovery Hub',
      title: 'CBSE Study Materials & <span>Class 1-12 NCERT Books</span> 📚',
      subtitle: 'Access the official central repository for CBSE books. Direct, free downloads for Class 1–12 NCERT textbooks and exemplar practice papers.',
      stats: [
        { icon: '📚', label: 'Class 1–12 PDFs' },
        { icon: '🔬', label: 'Science Exemplar' },
        { icon: '📐', label: 'Maths Exemplar' },
        { icon: '✅', label: 'Official Sources' }
      ]
    },
    aeo: {
      question: 'Where can I download Class 1-12 NCERT books for CBSE?',
      answer: 'You can download official Class 1–12 NCERT textbooks in PDF format directly from SkillNest\'s CBSE Resources discovery hub. We consolidate links to all class-specific study materials, including exemplar problems for science and mathematics.'
    },
    sections: `
      <!-- Class Discovery Grid -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Discovery Hub</div>
            <h2 class="section-title">Download <span>NCERT Books (Class 1–12)</span></h2>
            <p class="section-sub">Select your class below to access free chapter-wise textbook PDFs.</p>
          </div>
          <div class="class-discovery-grid">
            <a href="class-1/index.html" class="class-discovery-card">
              <div class="class-discovery-card-icon">🎒</div>
              <h3 class="class-discovery-card-title">Class 1</h3>
              <span class="class-discovery-card-label">Primary Level</span>
            </a>
            <a href="class-2/index.html" class="class-discovery-card">
              <div class="class-discovery-card-icon">🎒</div>
              <h3 class="class-discovery-card-title">Class 2</h3>
              <span class="class-discovery-card-label">Primary Level</span>
            </a>
            <a href="class-3/index.html" class="class-discovery-card">
              <div class="class-discovery-card-icon">🎒</div>
              <h3 class="class-discovery-card-title">Class 3</h3>
              <span class="class-discovery-card-label">Primary Level</span>
            </a>
            <a href="class-4/index.html" class="class-discovery-card">
              <div class="class-discovery-card-icon">🎒</div>
              <h3 class="class-discovery-card-title">Class 4</h3>
              <span class="class-discovery-card-label">Primary Level</span>
            </a>
            <a href="class-5/index.html" class="class-discovery-card">
              <div class="class-discovery-card-icon">🎒</div>
              <h3 class="class-discovery-card-title">Class 5</h3>
              <span class="class-discovery-card-label">Primary Level</span>
            </a>
            <a href="class-6/index.html" class="class-discovery-card">
              <span class="class-discovery-exemplar-badge">⭐ Exemplar</span>
              <div class="class-discovery-card-icon">🔬</div>
              <h3 class="class-discovery-card-title">Class 6</h3>
              <span class="class-discovery-card-label">Middle School</span>
            </a>
            <a href="class-7/index.html" class="class-discovery-card">
              <span class="class-discovery-exemplar-badge">⭐ Exemplar</span>
              <div class="class-discovery-card-icon">📐</div>
              <h3 class="class-discovery-card-title">Class 7</h3>
              <span class="class-discovery-card-label">Middle School</span>
            </a>
            <a href="class-8/index.html" class="class-discovery-card">
              <span class="class-discovery-exemplar-badge">⭐ Exemplar</span>
              <div class="class-discovery-card-icon">💻</div>
              <h3 class="class-discovery-card-title">Class 8</h3>
              <span class="class-discovery-card-label">Middle School</span>
            </a>
            <a href="class-9/index.html" class="class-discovery-card">
              <span class="class-discovery-exemplar-badge">⭐ Exemplar</span>
              <div class="class-discovery-card-icon">📚</div>
              <h3 class="class-discovery-card-title">Class 9</h3>
              <span class="class-discovery-card-label">Secondary Level</span>
            </a>
            <a href="class-10/index.html" class="class-discovery-card">
              <span class="class-discovery-exemplar-badge">⭐ Exemplar</span>
              <div class="class-discovery-card-icon">🎯</div>
              <h3 class="class-discovery-card-title">Class 10</h3>
              <span class="class-discovery-card-label">Board Exam</span>
            </a>
            <a href="class-11/index.html" class="class-discovery-card">
              <span class="class-discovery-exemplar-badge">⭐ Exemplar</span>
              <div class="class-discovery-card-icon">🧠</div>
              <h3 class="class-discovery-card-title">Class 11</h3>
              <span class="class-discovery-card-label">Senior Secondary</span>
            </a>
            <a href="class-12/index.html" class="class-discovery-card">
              <span class="class-discovery-exemplar-badge">⭐ Exemplar</span>
              <div class="class-discovery-card-icon">🏆</div>
              <h3 class="class-discovery-card-title">Class 12</h3>
              <span class="class-discovery-card-label">Board Exam</span>
            </a>
          </div>
          <div style="text-align: center; margin-top: 30px;">
            <a href="ncert-books/index.html" class="btn-primary" style="display: inline-block;">All Books Overview →</a>
          </div>
        </div>
      </section>

      <!-- NEP Governance Section -->
      <section class="before-after-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Governance</div>
            <h2 class="section-title">CBSE Core Subjects & <span>Computer Literacy</span></h2>
            <p class="section-sub">Aligning school study files with modern computing foundations in Bhopal or Pune.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Preserving Core Study Standards</h3>
              <p>Official NCERT textbooks are preserved and linked. We recommend students download textbook chapters to cover academic definitions accurately.</p>
            </div>
            <div class="why-card">
              <h3>Practical Computing Integrations</h3>
              <p>NEP 2020 shifts computer theory to active coding logic. SkillNest supports school learning with hands-on MS Office, Excel, and Scratch programs.</p>
            </div>
            <div class="why-card">
              <h3>Coaching Batches Across India</h3>
              <p>Our online batches serve students across Delhi, Mumbai, Pune, Raipur, Bangalore, and Hyderabad, aligning with school homework needs.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Do you charge money for Class 1-12 NCERT downloads?',
        a: 'No, all NCERT textbook PDFs are free, open-source files direct from the National Council of Educational Research and Training.'
      },
      {
        q: 'Does this directory contain maths and science exemplar books?',
        a: 'Yes. Navigating to the respective Class 6, 7, 8, 9, or 10 pages provides direct links to science and mathematics exemplars.'
      }
    ],
    faqs: [
      {
        q: 'What is the SkillNest CBSE Resources hub?',
        a: 'It is a central discovery hub consolidating access to official Class 1–12 NCERT books, exemplars, and educational assets.'
      },
      {
        q: 'Does this hub host copy or duplicate PDFs?',
        a: 'No. All paths preserve original download pathways and sitemap values, acting as a clean discovery layer.'
      },
      {
        q: 'Is there support for the CBSE computer curriculum?',
        a: 'Yes. We support CBSE school learning by offering worksheets for MS Office, keyboarding guides, and Scratch logic courses.'
      },
      {
        q: 'How do I download a Class 6 NCERT book?',
        a: 'Click on Class 6 in the class grid above, select your subject, and download official chapter-wise PDFs.'
      },
      {
        q: 'Does SkillNest offer online tuition for CBSE classes?',
        a: 'We specialize in digital literacy, touch typing, Coding Program, and practical AI classes, which help students complete CBSE school projects.'
      },
      {
        q: 'Are the books chapter-wise or full books?',
        a: 'Class pages provide both chapter-wise download links and combined full-book directories for ease of study.'
      },
      {
        q: 'Are there worksheets for CBSE school maths?',
        a: 'Our worksheets section includes spreadsheet math drills that teach data tracking in Excel, building dual study and tech habits.'
      },
      {
        q: 'How can school students in Raipur or Indore join classes?',
        a: 'Parents can book a free diagnostic demo session through the website form to determine their child\'s digital starting batch.'
      }
    ]
  }
];

// HTML page generator function
function generateHtml(page) {
  const basePath = '../'.repeat(page.depth);
  const canonicalUrl = page.url;

  // Compile breadcrumbs HTML
  let breadcrumbsHtml = '';
  page.breadcrumbs.forEach((bc, index) => {
    if (bc.isCurrent) {
      breadcrumbsHtml += `<span class="bc-current">${bc.name}</span>`;
    } else {
      breadcrumbsHtml += `<a href="${bc.url}">${bc.name}</a><span class="bc-sep">/</span>`;
    }
  });

  // Compile statistics strip
  let statsHtml = '';
  page.hero.stats.forEach(stat => {
    statsHtml += `<div class="res-stat"><span class="res-stat-icon">${stat.icon}</span>${stat.label}</div>`;
  });

  // Compile PAA items
  let paaItemsHtml = '';
  page.paa.forEach(item => {
    paaItemsHtml += `
      <div class="faq-item fade-up">
        <div class="faq-q" onclick="toggleFaq(this)">
          <span>❓ ${item.q}</span>
          <div class="faq-arrow">+</div>
        </div>
        <div class="faq-a">
          <p>${item.a}</p>
        </div>
      </div>
    `;
  });

  // Compile FAQ items
  let faqItemsHtml = '';
  page.faqs.forEach(item => {
    faqItemsHtml += `
      <div class="faq-item fade-up">
        <div class="faq-q" onclick="toggleFaq(this)">
          <span>❓ ${item.q}</span>
          <div class="faq-arrow">+</div>
        </div>
        <div class="faq-a">
          <p>${item.a}</p>
        </div>
      </div>
    `;
  });

  // Construct JSON-LD schemas
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": canonicalUrl,
    "name": page.title,
    "description": page.description
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a.replace(/<[^>]*>/g, '') // strip HTML for schema text
      }
    }))
  };

  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": page.breadcrumbs.map((bc, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": bc.name,
      "item": bc.isCurrent ? canonicalUrl : new URL(bc.url, canonicalUrl).href
    }))
  };

  let worksheetsScript = '';


  // Compile page HTML content
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="robots" content="index, follow">
  <meta name="author" content="SkillNest">
  <meta name="theme-color" content="#1e40af">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link rel="stylesheet" href="${basePath}assets/css/bundle.min.css">
  
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:image" content="https://skillnest.co.in/assets/founder.jpeg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonicalUrl}">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <meta name="twitter:image" content="https://skillnest.co.in/assets/founder.jpeg">
  <meta property="og:site_name" content="SkillNest">

  <script type="application/ld+json">
    ${JSON.stringify(webPageSchema, null, 2)}
  </script>
  <script type="application/ld+json">
    ${JSON.stringify(faqSchema, null, 2)}
  </script>
  <script type="application/ld+json">
    ${JSON.stringify(breadcrumbListSchema, null, 2)}
  </script>
  
  <script src="${basePath}assets/js/fallback.js" defer="" id="file-protocol-fallback" data-depth="${page.depth}"></script>
</head>
<body>

  <!-- Announcement Bar -->
  <div class="announcement-bar">
    ✨ Admissions Open for <span data-config="batchName">May 2026 Batch</span>! <span>|</span> Learn Future Digital Skills <span>|</span> 📞 <span class="phone-number">+91 88277 31006</span>
  </div>

  <!-- Header Placeholder (Injected Statically at Build) -->
  <header class="header" id="mainHeader" data-dynamic-component="header"></header>

  <!-- Mobile Navigation Placeholder -->
  <div class="mobile-nav-menu" id="mobileNavMenu" data-dynamic-component="mobile-menu"></div>

  <!-- Breadcrumb Bar -->
  <div class="res-breadcrumb-bar">
    <div class="container">
      <nav class="res-breadcrumb" aria-label="Breadcrumb">
        ${breadcrumbsHtml}
      </nav>
    </div>
  </div>

  <main>
    <!-- Page Hero -->
    <section class="page-hero resources-hero">
      <div class="container">
        <div class="page-hero-tag"><span class="dot"></span>${page.hero.tag}</div>
        <h1>${page.hero.title}</h1>
        <p>${page.hero.subtitle}</p>
        <div class="res-stats-strip">
          ${statsHtml}
        </div>
        <div class="hero-ctas" style="margin-top:28px">
          <a href="${basePath}contact/book-demo.html" class="btn-yellow cd-btn-shift" data-config="ctaText">Book Free Demo Class</a>
          <a href="${basePath}learning-paths/index.html" class="btn-ghost btn-ghost-hero">Explore Paths →</a>
        </div>
      </div>
    </section>

    <!-- AEO Quick Answer Block -->
    <section class="why-section">
      <div class="container">
        <div class="why-grid">
          <div class="why-card">
            <div class="why-icon">🤖</div>
            <h2>${page.aeo.question}</h2>
            <p>${page.aeo.answer}</p>
          </div>
        </div>
      </div>
    </section>

    ${page.sections}

    <!-- Parents Also Ask (PAA) Section -->
    <section class="faq-section">
      <div class="container">
        <div class="text-center fade-up">
          <div class="section-tag"><span class="dot"></span>PAA</div>
          <h2 class="section-title">Parents <span>Also Ask About This Topic</span></h2>
          <p class="section-sub">Related queries that parents regularly review.</p>
        </div>

        <div class="faq-list">
          ${paaItemsHtml}
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section" id="faq">
      <div class="container">
        <div class="text-center fade-up">
          <div class="section-tag"><span class="dot"></span>FAQ</div>
          <h2 class="section-title">Frequently <span>Asked Questions</span></h2>
          <p class="section-sub">Clear answers to your top queries regarding digital skills and tools.</p>
        </div>

        <div class="faq-list">
          ${faqItemsHtml}
        </div>
      </div>
    </section>
  </main>

  <!-- Footer Placeholder (Injected Statically at Build) -->
  <footer class="footer" data-dynamic-component="footer"></footer>

  <!-- Standard bundle script -->
  <script src="${basePath}assets/js/bundle.min.js" defer></script>
  ${worksheetsScript}
</body>
</html>`;
}

// Main execution block
console.log('=== STARTING RESOURCES PAGE GENERATION ===');
pages.forEach(page => {
  const targetFilePath = path.join(rootDir, page.path);
  const targetDir = path.dirname(targetFilePath);

  if (!fs.existsSync(targetDir)) {
    console.log(`Creating directory: ${targetDir}`);
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const htmlContent = generateHtml(page);
  fs.writeFileSync(targetFilePath, htmlContent, 'utf8');
  console.log(`Generated: ${page.path} at URL: ${page.url}`);
});
console.log('=== RESOURCES PAGE GENERATION COMPLETE ===');
