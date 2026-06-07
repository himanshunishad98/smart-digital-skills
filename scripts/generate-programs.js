const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../');

// Define programs pages configuration
const pages = [
  {
    path: 'programs/index.html',
    depth: 1,
    url: 'https://skillnest.co.in/programs/',
    title: 'Structured Digital Skills & AI Programs for Kids | SkillNest',
    description: 'Discover our CBSE-aligned, NEP 2020-compliant digital skills and coding programs for school kids (Class 6-8). Explore live online cohorts in AI, coding, Excel, and cyber safety.',
    breadcrumbs: [
      { name: 'Home', url: '../index.html' },
      { name: 'Programs', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'SkillNest Programs Node',
      title: 'Structured Learning <span>Programs for Kids</span> 🚀',
      subtitle: 'Equipping middle school students (Class 6-8) with essential digital, logical, and computational competencies. Shifting screen consumers into tech creators.',
      stats: [
        { icon: '🧩', label: '6 Structured Silos' },
        { icon: '📅', label: '6-Week Cohorts' },
        { icon: '👨‍👩‍👧', label: '1000+ Enrolled' },
        { icon: '🏆', label: 'NEP 2020 Aligned' }
      ]
    },
    aeo: {
      question: 'What is the best digital skills program for school kids?',
      answer: 'SkillNest offers a structured suite of six NEP 2020-aligned programs for kids (Class 6-8), including Digital Skills Foundation, AI Skills for Students, Coding Program, Excel for Students, Productivity Tools, and Cyber Safety. All courses feature live, project-based learning with small batches of 5-10 students.'
    },
    sections: `
      <!-- Program Categories Hub -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Program Silos</div>
            <h2 class="section-title">Our 6 Core <span>Learning Pillars</span></h2>
            <p class="section-sub">Choose a specialized educational program node to explore structured syllabus progressions, parent benefits, and local cohort schedules.</p>
          </div>

          <div class="why-grid">
            <div class="why-card fade-up">
              <div class="why-icon">💻</div>
              <h3>Digital Skills Foundation</h3>
              <p>Master computer fundamentals, file structure safety, and basic document formatting. The essential tech starting point for middle school students.</p>
              <a class="btn-primary" href="digital-skills-foundation/index.html">Explore Program →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">🤖</div>
              <h3>AI Skills for Students</h3>
              <p>Explore safe prompt writing, machine learning classification, and AI creative apps. Prepare kids for a future powered by AI tools.</p>
              <a class="btn-primary" href="ai-skills-for-students/index.html">Explore Program →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">🎮</div>
              <h3>Coding Program</h3>
              <p>Build computational logic and algorithmic thinking. Develop and debug interactive visual block games on MIT Scratch.</p>
              <a class="btn-primary" href="coding/index.html">Explore Program →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">📊</div>
              <h3>Excel for Students</h3>
              <p>Master mathematical spreadsheet calculations, data layouts, tables, and visual charts. High academic utility for school math and science.</p>
              <a class="btn-primary" href="excel-for-students/index.html">Explore Program →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">🚀</div>
              <h3>Productivity Tools</h3>
              <p>Unleash efficiency. Touch typing, advanced doc formatting, Canva design, and digital scheduling workflows for school project submissions.</p>
              <a class="btn-primary" href="productivity-tools/index.html">Explore Program →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">🛡️</div>
              <h3>Cyber Safety</h3>
              <p>Protect kids online. Cyber safety hygiene, complex password structures, safe browser search configurations, and phishing awareness.</p>
              <a class="btn-primary" href="cyber-safety/index.html">Explore Program →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Roadmaps & Pathways -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Progression</div>
            <h2 class="section-title">The SkillNest <span>Learning Roadmaps</span></h2>
            <p class="section-sub">We align our classes systematically to transition middle schoolers from basic digital navigation to advanced tech creation.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>✓ Level 1: Digital Foundations</h3>
              <p>Focuses on touch typing speed, directory file layouts, basic doc formatting, and safe browser navigation settings.</p>
            </div>
            <div class="why-card">
              <h3>✓ Level 2: Logical Blocks & Data</h3>
              <p>Covers variable Scratch block coding loops, coordinate geometry maps, and MS Excel formula calculations.</p>
            </div>
            <div class="why-card">
              <h3>✓ Level 3: AI Productivity & Safety</h3>
              <p>Includes Canva infographics design, safe ChatGPT prompt templates, and advanced cyber hygiene security.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Student Success stories -->
      <section class="before-after-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Outcomes</div>
            <h2 class="section-title">Student <span>Success Highlights</span></h2>
            <p class="section-sub">Read reviews from parents whose children transformed their screen habits from gaming to active building.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <p>"My daughter in Bhopal used to struggle with her computer homework file uploads. After the Digital Skills Foundation cohort, she organizes her school files independently and formats science presentations easily."</p>
              <strong>— Mrs. Shrivastava (Mother of Class 7 Student)</strong>
            </div>
            <div class="why-card">
              <p>"SkillNest's coding and cyber safety programs are outstanding. Tutors in Indore coordinate live screen sharing, helping kids debug math maze scripts. My son built three playable games!"</p>
              <strong>— Mr. Dubey (Father of Class 6 Student)</strong>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Which program should my child start with?',
        a: 'For absolute beginners in Class 6, we recommend starting with Digital Skills Foundation or touch typing basics. For students with prior computer familiarity, the Coding Program or AI Skills for Students are excellent entry gates.'
      },
      {
        q: 'Is there a verified outcome certificate?',
        a: 'Yes. Every student who compiles their digital project portfolio and completes the 6-week syllabus milestones earns a verified SkillNest Program Certificate.'
      }
    ],
    faqs: [
      {
        q: 'What are the main programs offered by SkillNest?',
        a: 'SkillNest offers six core programs: Digital Skills Foundation, AI Skills for Students, Coding Program, Excel for Students, Productivity Tools, and Cyber Safety.'
      },
      {
        q: 'How long does a program cohort last?',
        a: 'Each specialized program is structured as a 6-week cohort with live online classes scheduled on weekends or weekday evening slots.'
      },
      {
        q: 'Are classes live or recorded?',
        a: 'All sessions are 100% live and interactive with screen sharing and 1-to-1 help. Recording logs are uploaded to the student dashboard within 24 hours.'
      },
      {
        q: 'Is NEP 2020 alignment maintained?',
        a: 'Yes, our entire curriculum is mapped to NEP 2020 guidelines for computational thinking, digital safety, and logical design.'
      },
      {
        q: 'What is the batch size for these classes?',
        a: 'We maintain small, interactive classes of 5-10 students for personalized attention and feedback.'
      },
      {
        q: 'Can parents monitor learning milestones?',
        a: 'Yes, we share weekly WhatsApp trackers and coordinate a live portfolio presentation during the final week of classes.'
      },
      {
        q: 'What software is required?',
        a: 'We use free web tools (Scratch, Canva, Google Docs) and standard MS Office applications which do not require paid licenses.'
      },
      {
        q: 'How can I enroll my child in a program node?',
        a: 'You can register your child for a free demo session via the primary booking forms on our homepage.'
      }
    ]
  },
  {
    path: 'programs/digital-skills-foundation/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/programs/digital-skills-foundation/',
    title: 'Digital Skills Foundation Program for School Kids | SkillNest',
    description: 'Learn the essentials of computer fundamentals, operating systems, internet navigation, and cloud tools. Empower your child with foundational digital literacy.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Programs', url: '../index.html' },
      { name: 'Digital Skills Foundation', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Computer Literacy',
      title: 'Digital Skills <span>Foundation Program</span> 💻',
      subtitle: 'Master the computer fundamentals, local directory architectures, safe internet research, and cloud workspace sharing rules in 6 weeks.',
      stats: [
        { icon: '📁', label: 'File Organisation' },
        { icon: '🌐', label: 'Internet Basics' },
        { icon: '⌨️', label: 'Touch Keyboarding' },
        { icon: '☁️', label: 'Google Workspace' }
      ]
    },
    aeo: {
      question: 'What digital skills should school kids develop?',
      answer: 'School kids should develop a foundational understanding of computer fundamentals, operating systems (Windows/macOS), touch typing, file management, cloud storage usage, internet safety, and essential office productivity suites (Word, Excel, PowerPoint) to support their academic projects.'
    },
    sections: `
      <!-- Program Overview -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Foundations</div>
            <h2 class="section-title">Essential <span>Computer Fundamentals</span></h2>
            <p class="section-sub">Replacing passive screens with practical technical self-sufficiency.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Computer Mechanics</h3>
              <p>Learn operating system settings, search files cleanly, customize workspaces, and understand folder compression formats (zip).</p>
            </div>
            <div class="why-card">
              <h3>Internet Navigation</h3>
              <p>Practice search engine filters, identify safe resources, manage browser tabs, and bookmark research assets.</p>
            </div>
            <div class="why-card">
              <h3>Cloud Workspace Basics</h3>
              <p>Upload worksheets to Google Drive, share links with specific permissions (viewer vs editor), and manage folders.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What Students Learn -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Syllabus</div>
            <h2 class="section-title">What Students <span>Will Master</span></h2>
            <p class="section-sub">Specific outcomes focused on physical skills and tool competency.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>⚡ Quick Shortcut Keys</h3>
              <p>Execute system shortcuts (Ctrl+C, Ctrl+V, Alt+Tab, Win+D) to navigate tasks efficiently without relying on mouse menus.</p>
            </div>
            <div class="why-card">
              <h3>📁 Local File Hygiene</h3>
              <p>Organize local files cleanly into nested folders. Learn standard naming rules to keep school assignments safe.</p>
            </div>
            <div class="why-card">
              <h3>📧 Email Etiquette Basics</h3>
              <p>Draft academic emails, include clear subject titles, upload file attachments, and write formal messages.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Learning Outcomes -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Outcomes</div>
            <h2 class="section-title">Program <span>Learning Milestones</span></h2>
            <p class="section-sub">Building real capability through NEP 2020-compliant practical study.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>✓ Self-Sufficient Learners</h3>
              <p>Students in Bhopal and Indore download school worksheets, organize study folders, and print files independently.</p>
            </div>
            <div class="why-card">
              <h3>✓ Cloud Workspace Readiness</h3>
              <p>Kids in Raipur and Delhi build collaborative documents, edit shared slides, and back up files safely on cloud drives.</p>
            </div>
            <div class="why-card">
              <h3>✓ Basic Device Troubleshooting</h3>
              <p>Learn to close frozen programs (Task Manager), check storage settings, clean browser cache, and handle basic system issues.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Curriculum Highlights -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Curriculum</div>
            <h2 class="section-title">6-Week <span>Curriculum Syllabus</span></h2>
            <p class="section-sub">Structured modules designed specifically for Class 6-8 students.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Week 1: Hardware & Desktop Setup</h3>
              <p>System components, mouse clicks precision, taskbar configurations, and essential system shortcuts.</p>
            </div>
            <div class="why-card">
              <h3>Week 2: File Explorer & Architecture</h3>
              <p>Nesting directories, renaming rules, drag-and-drop operations, and sorting file configurations.</p>
            </div>
            <div class="why-card">
              <h3>Week 3: Internet & Safe Browsing</h3>
              <p>URL inputs, safe search engines, bookmarks organization, and browser cache cleaning.</p>
            </div>
            <div class="why-card">
              <h3>Week 4: Cloud Storage (Google Drive)</h3>
              <p>Uploading assets, sharing permissions, syncing local folders, and cloud directory layouts.</p>
            </div>
            <div class="why-card">
              <h3>Week 5: Core Document Layouts</h3>
              <p>Font margins, paragraph alignments, headings hierarchy, and table insertions inside docs.</p>
            </div>
            <div class="why-card">
              <h3>Week 6: Project Compilation</h3>
              <p>Building a personal structured workspace index folder and sending a zipped email submission.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Project Outcomes -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Projects</div>
            <h2 class="section-title">Practical <span>Student Projects</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>📁 Standard Workspace Portfolio</h3>
              <p>Students build a structured local file explorer folder indexing all their course files cleanly inside labeled directories.</p>
            </div>
            <div class="why-card">
              <h3>📧 Term Project Submission Email</h3>
              <p>Drafting and sending a formal email sharing a zipped workspace folder with specific folder permissions.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GEO Section -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Regional Impact</div>
            <h2 class="section-title">Digital Foundations in <span>Bhopal, Indore, and Raipur</span></h2>
            <p class="section-sub">Bringing certified practical digital literacy to middle school students across India's academic centers.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Central Cohorts</h3>
              <p>Students in Bhopal, Indore, and Raipur learn how folders, OS files, and shortcuts operate on their own laptops.</p>
            </div>
            <div class="why-card">
              <h3>Metropolitan Scale</h3>
              <p>Weekly practice sessions connect students in Delhi, Mumbai, Pune, Bangalore, and Hyderabad to exchange workspaces.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Is this foundation program suitable for absolute beginners?',
        a: 'Yes, this program starts from basic hardware parts and desktop setup, building up systematically to cloud workspaces.'
      },
      {
        q: 'Does it teach typing speed?',
        a: 'Basic keyboard navigation and character reach are covered, though advanced blind typing is taught in our touch keyboarding courses.'
      }
    ],
    faqs: [
      {
        q: 'What is the Digital Skills Foundation program?',
        a: 'It is a 6-week live online cohort teaching Class 6-8 kids computer operations, file structures, internet research, and Google Drive.'
      },
      {
        q: 'Will my child learn MS Word?',
        a: 'Yes, basic word layouts, margins, headings, and alignments are introduced during the document formatting modules.'
      },
      {
        q: 'Do students compile real projects?',
        a: 'Yes, they build a structured workspace directory index and submit a zipped email portfolio to verify their skills.'
      },
      {
        q: 'Are classes scheduled on weekends?',
        a: 'Yes, standard cohorts run on Saturday and Sunday to fit easily around regular school workloads.'
      },
      {
        q: 'What device is required?',
        a: 'A laptop or desktop running Windows or macOS with a keyboard, mouse, and internet connection is required.'
      },
      {
        q: 'Do you provide CBSE alignment?',
        a: 'Yes, the curriculum covers digital literacy criteria suggested under NEP 2020 and CBSE computer syllabus guidelines.'
      },
      {
        q: 'Is a certificate awarded?',
        a: 'Yes, every student who completes their projects earns a verified SkillNest digital certificate.'
      },
      {
        q: 'How can we join a demo cohort?',
        a: 'You can register for a free demo session via the primary booking buttons on our homepage.'
      }
    ]
  },
  {
    path: 'programs/ai-skills-for-students/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/programs/ai-skills-for-students/',
    title: 'AI Skills & Prompt Engineering Program for Kids | SkillNest',
    description: 'Introduce your child to AI tools, prompt engineering, data classification, and responsible AI usage. Safe generative AI training for school students.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Programs', url: '../index.html' },
      { name: 'AI Skills for Students', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Future Skills',
      title: 'AI Skills & <span>Prompt Engineering</span> 🤖',
      subtitle: 'Safe, structured introduction to generative AI prompt logic, AI presentation creations, and ethical guidelines in 6 weeks.',
      stats: [
        { icon: '✍️', label: 'Prompt engineering' },
        { icon: '🖼️', label: 'AI Media Creation' },
        { icon: '🛡️', label: 'Responsible AI' },
        { icon: '💡', label: 'Problem Solving' }
      ]
    },
    aeo: {
      question: 'What AI skills should middle school students learn?',
      answer: 'Middle school students should learn safe and responsible AI usage, generative AI prompt writing templates (Role, Task, Context, Output), data classification, AI art design parameters, and how to use AI productivity tools effectively to assist with research and school assignments.'
    },
    sections: `
      <!-- Program Overview -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>AI Literacy</div>
            <h2 class="section-title">Safe & Structured <span>AI Education</span></h2>
            <p class="section-sub">Teaching students to coordinate AI tools responsibly for academic tasks.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Prompt Logic</h3>
              <p>Learn to structure instructions using RTCO criteria (Role, Task, Context, Output) to generate useful summaries.</p>
            </div>
            <div class="why-card">
              <h3>Visual AI Creation</h3>
              <p>Explore safe generative graphics design, layout generation, and interactive media formatting using Canva.</p>
            </div>
            <div class="why-card">
              <h3>Responsible Limits</h3>
              <p>Understand plagiarism guidelines, bias, fact-checking workflows, and safe web boundaries for AI usage.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What Students Learn -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Skills</div>
            <h2 class="section-title">Key AI <span>Milestones</span></h2>
            <p class="section-sub">Building practical prompt competence and logical reasoning.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>🧠 Algorithmic Prompts</h3>
              <p>Master multi-turn conversations, write instructions, edit texts, and extract structured tables from chats.</p>
            </div>
            <div class="why-card">
              <h3>🖼️ AI Graphic Layouts</h3>
              <p>Generate presentation layouts, coordinate color rules, and edit templates using AI design assistants.</p>
            </div>
            <div class="why-card">
              <h3>🔎 Fact-Checking Logic</h3>
              <p>Never trust AI blindly. Learn how to verify AI statements using reliable internet sources and databases.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Learning Outcomes -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Outcomes</div>
            <h2 class="section-title">Program <span>Outcomes & Pedagogy</span></h2>
            <p class="section-sub">We align prompt engineering with logic-building to improve study workflows.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>✓ Study Assistants</h3>
              <p>Students in Bhopal and Indore write prompts to summarize history lessons or clarify complex math steps.</p>
            </div>
            <div class="why-card">
              <h3>✓ Critical Thinkers</h3>
              <p>Kids in Raipur and Delhi recognize copy-paste shortcuts and write their own original texts with AI help.</p>
            </div>
            <div class="why-card">
              <h3>✓ Digital Creators</h3>
              <p>Design infographics slide decks, configure outline templates, and present data-backed school slides.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Curriculum Highlights -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Syllabus</div>
            <h2 class="section-title">6-Week <span>Curriculum Syllabus</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Week 1: AI Basics & Types</h3>
              <p>What is AI, machine learning loops, prompt interfaces, and safe account boundaries.</p>
            </div>
            <div class="why-card">
              <h3>Week 2: Prompt Templates (RTCO)</h3>
              <p>Role, Task, Context, Output formatting. Generating summaries and structured tables.</p>
            </div>
            <div class="why-card">
              <h3>Week 3: AI Media & Design</h3>
              <p>Generating design ideas, palette choices, and text layouts using Canva Magic tools.</p>
            </div>
            <div class="why-card">
              <h3>Week 4: Ethical AI & Plagiarism</h3>
              <p>Understanding citation rules, avoiding copy-paste traps, and safe search engine choices.</p>
            </div>
            <div class="why-card">
              <h3>Week 5: AI Fact-Checking Drills</h3>
              <p>Identifying errors in AI texts and cross-checking references using search engines.</p>
            </div>
            <div class="why-card">
              <h3>Week 6: Presentation Project</h3>
              <p>Creating and presenting a project slide deck using prompt-engineered outlines.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Project Outcomes -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Projects</div>
            <h2 class="section-title">AI <span>Student Portfolios</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>📚 Science Study Guide</h3>
              <p>A customized science workbook built using multi-turn prompt structures, complete with tables and outline notes.</p>
            </div>
            <div class="why-card">
              <h3>🖼️ AI Presentation Deck</h3>
              <p>An original school project presentation formatted using design guidelines and safe generative outlines.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GEO Section -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Regional Impact</div>
            <h2 class="section-title">AI Skills in <span>Bhopal, Indore, and Raipur</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Central Cohorts</h3>
              <p>Students in Bhopal, Indore, and Raipur meet in weekend cohorts to present their prompt-engineering worksheets.</p>
            </div>
            <div class="why-card">
              <h3>Metro Collaboration</h3>
              <p>Our online panels connect students from Delhi, Mumbai, Pune, Bangalore, and Hyderabad for safe AI design matches.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Is AI safety suitable for kids in Class 6?',
        a: 'Yes. We teach safe prompts under strict ethical rules to ensure kids use AI as a study aid, not a cheating tool.'
      },
      {
        q: 'Do students need paid AI accounts?',
        a: 'No. All tools utilized in this curriculum are free to use and do not require paid accounts.'
      }
    ],
    faqs: [
      {
        q: 'What is the AI Skills program for kids?',
        a: 'It is a 6-week online class teaching Class 6-8 students generative prompts, safe AI usage, and design templates.'
      },
      {
        q: 'Will my child learn prompt writing?',
        a: 'Yes, they learn prompt engineering templates using Role, Task, Context, and Output criteria.'
      },
      {
        q: 'What projects do students compile?',
        a: 'They build a customized study workbook and design a school presentation slide deck.'
      },
      {
        q: 'Is it live or recorded?',
        a: 'All sessions are live with interactive screensharing and direct group instruction.'
      },
      {
        q: 'Do you cover AI ethics?',
        a: 'Yes. Plagiarism rules, fact-checking, and responsible AI limits are core parts of our syllabus.'
      },
      {
        q: 'Is coding logic required?',
        a: 'No, this program focuses on prompts and design logic. No coding experience is needed.'
      },
      {
        q: 'Is a certificate awarded?',
        a: 'Yes, completing the program and submitting projects earns a verified SkillNest certificate.'
      },
      {
        q: 'How do I book a demo class?',
        a: 'You can book a free demo session via the booking links on our homepage.'
      }
    ]
  },
  {
    path: 'programs/coding/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/programs/coding/',
    title: 'Online Coding Program for Kids (Class 6-8) | SkillNest',
    description: 'Develop algorithmic thinking and logic with our online Coding Program for kids. Master block-based coding, game physics, loops, and coordinates on MIT Scratch.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Programs', url: '../index.html' },
      { name: 'Coding Program', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Computational Logic',
      title: 'Practical <span>Coding Program</span> 🎮',
      subtitle: 'Build programming logic without syntax errors. Practice coordinate logic, variable loops, conditional sequences, and build custom games on Scratch.',
      stats: [
        { icon: '🧩', label: 'MIT Scratch block logic' },
        { icon: '👾', label: 'Game development' },
        { icon: '🔄', label: 'Loops & variables' },
        { icon: '📈', label: 'Coordinate math' }
      ]
    },
    aeo: {
      question: 'What is the best coding program for school students?',
      answer: 'The best coding program for middle school students starts with visual, block-based coding like MIT Scratch to master fundamental programming logic (loops, conditionals, variables, coordinates) without syntax errors, transitioning kids from screen consumers to game creators.'
    },
    sections: `
      <!-- Program Overview -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Coding logic</div>
            <h2 class="section-title">Master Logic Over <span>Syntax Errors</span></h2>
            <p class="section-sub">Using visual Scratch blocks to focus on coding mechanics instead of missing semicolons.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Computational Thinking</h3>
              <p>Learn command sequencing, problem decomposition, and pattern matching. These principles prepare kids for languages like Python.</p>
            </div>
            <div class="why-card">
              <h3>Active Game Building</h3>
              <p>Transition kids from playing games to building them. Code balloon clickers, chase logics, and platform jumps.</p>
            </div>
            <div class="why-card">
              <h3>Coordinate Geometry</h3>
              <p>Animating screen items requires using X and Y coordinate grids, reinforcing school geometry performance.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What Students Learn -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Skills</div>
            <h2 class="section-title">Coding Concepts <span>Taught</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>🔄 Loops & Iterations</h3>
              <p>Learn repeat and forever loops to update animations and check settings dynamically.</p>
            </div>
            <div class="why-card">
              <h3>🚦 Conditionals & Branching</h3>
              <p>Write decision logic using If-Else blocks. Make games react when a character hits a wall or scores points.</p>
            </div>
            <div class="why-card">
              <h3>💾 Variables & Data</h3>
              <p>Create data variables to track score counters, adjust speed levels, and record high scores.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Learning Outcomes -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Outcomes</div>
            <h2 class="section-title">Program <span>Learning Milestones</span></h2>
            <p class="section-sub">Measurable problem-solving skills verified by project building.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>✓ Dynamic Game Designers</h3>
              <p>Students in Bhopal and Indore customize animations, write coordinate moves, and design layout rules.</p>
            </div>
            <div class="why-card">
              <h3>✓ Logic Debugging Habits</h3>
              <p>Kids in Raipur and Delhi learn to read code errors logically and debug scripts without adult support.</p>
            </div>
            <div class="why-card">
              <h3>✓ Collaborative Coding</h3>
              <p>Connect with peers in Pune, Mumbai, Bangalore, and Hyderabad to play, test, and remix online Scratch games.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Curriculum Highlights -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Syllabus</div>
            <h2 class="section-title">6-Week <span>Curriculum Syllabus</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Week 1: Coordinates & Sequencing</h3>
              <p>Sprite placement, positive/negative X-Y screen grids, sequence commands, and basic sprite actions.</p>
            </div>
            <div class="why-card">
              <h3>Week 2: Animation Loops</h3>
              <p>Coordinating costumes, repeat loops, and moving sprites using keyboard inputs.</p>
            </div>
            <div class="why-card">
              <h3>Week 3: If-Else Branching</h3>
              <p>Sprite sensing: coding wall bounces, target touches, and branching logic pathways.</p>
            </div>
            <div class="why-card">
              <h3>Week 4: Variables & Scoreboards</h3>
              <p>Creating variables, updating scores, setting speed controls, and coding countdown timers.</p>
            </div>
            <div class="why-card">
              <h3>Week 5: Jump & Gravity Physics</h3>
              <p>Designing custom platform structures, implementing jump velocity, and writing gravity code.</p>
            </div>
            <div class="why-card">
              <h3>Week 6: Debugging & Publishing</h3>
              <p>Finding logic loop errors, sharing scripts online, and publishing to the Scratch portal.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Project Outcomes -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Projects</div>
            <h2 class="section-title">Playable <span>Student Portfolios</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>👾 Coordinate Chase Game</h3>
              <p>A playable game where sprites spawn at random coordinates, scoring points when touched by the player.</p>
            </div>
            <div class="why-card">
              <h3>🔑 Platform Maze Escape</h3>
              <p>Code character sprites to jump over barriers and navigate platforms. Hitting barriers resets coordinates.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GEO Section -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>National Coverage</div>
            <h2 class="section-title">Coding Cohorts in <span>Bhopal, Indore, and Raipur</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Central India Nodes</h3>
              <p>Middle schoolers in Bhopal, Indore, and Raipur meet in weekend cohorts to test Scratch code scripts.</p>
            </div>
            <div class="why-card">
              <h3>Metro Integrations</h3>
              <p>Connecting students in Delhi, Mumbai, Pune, Bangalore, and Hyderabad for live coordinate matches.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Is coding suitable for absolute beginners in Class 6?',
        a: 'Yes, Scratch visual blocks eliminate syntax spelling errors, letting kids focus entirely on logic and loops.'
      },
      {
        q: 'Does this program prepare kids for Python?',
        a: 'Yes, loops, conditionals, and variables learned on Scratch map directly to text-based coding languages like Python.'
      }
    ],
    faqs: [
      {
        q: 'What is the Coding Program?',
        a: 'It is a 6-week online cohort teaching Class 6-8 kids logic, loops, coordinates, and game creation on Scratch.'
      },
      {
        q: 'Do kids write text codes?',
        a: 'We use visual blocks first to avoid syntax syntax errors and build strong logic before moving to text code.'
      },
      {
        q: 'What projects do students compile?',
        a: 'Every student builds a chase game and a platform maze escape project.'
      },
      {
        q: 'Are classes live or recorded?',
        a: 'Sessions are 100% live with interactive screen share help. Recording links are shared within 24 hours.'
      },
      {
        q: 'Will my child learn variables?',
        a: 'Yes, coding game scores and timers teaches kids variables and memory concepts practically.'
      },
      {
        q: 'Does coding help with school math?',
        a: 'Yes, placing sprites requires coordinate math (X-Y grids), reinforcing CBSE geometry topics.'
      },
      {
        q: 'Is a certificate awarded?',
        a: 'Yes, completing the program and submitting projects earns a verified SkillNest certificate.'
      },
      {
        q: 'How do I book a demo class?',
        a: 'You can book a free demo session via the booking links on our homepage.'
      }
    ]
  },
  {
    path: 'programs/excel-for-students/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/programs/excel-for-students/',
    title: 'Excel & Data Analysis Program for Students | SkillNest',
    description: 'Master spreadsheet basics, mathematical formulas, data organization, and visual charts. Practical Excel course designed specifically for Class 6-8 students.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Programs', url: '../index.html' },
      { name: 'Excel for Students', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Data Skills',
      title: 'MS Excel for <span>School Students</span> 📊',
      subtitle: 'Build mathematical grids, calculate arithmetic averages, compile visual charts, and organize school science data in 6 weeks.',
      stats: [
        { icon: '📊', label: 'Spreadsheet layout' },
        { icon: '🧮', label: 'Math Formulas' },
        { icon: '📈', label: 'Visual Charts' },
        { icon: '📂', label: 'Data Management' }
      ]
    },
    aeo: {
      question: 'Why should school students learn Microsoft Excel?',
      answer: 'Students should learn Microsoft Excel because it is the global standard for organizing data, designing charts, and calculating mathematical formulas. Excel skills are highly valuable for school math, science lab reports, and future professional environments.'
    },
    sections: `
      <!-- Program Overview -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Spreadsheets</div>
            <h2 class="section-title">Practical <span>Excel Competencies</span></h2>
            <p class="section-sub">Bypassing theoretical textbooks to build real cell alignment and data calculations.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Grids & Cells Layouts</h3>
              <p>Learn to size columns, format data types (text, numbers, currency), and apply clean styles to grids.</p>
            </div>
            <div class="why-card">
              <h3>Arithmetic Formulas</h3>
              <p>Write formulas for sum, average, min, max, and percentages. Let the computer handle the calculations.</p>
            </div>
            <div class="why-card">
              <h3>Visual Data Charts</h3>
              <p>Convert tables into bar graphs, pie charts, and line grids to present school science projects visually.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What Students Learn -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Skills</div>
            <h2 class="section-title">Spreadsheet Concepts <span>Taught</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>🧮 Cell Address Logic</h3>
              <p>Understand columns (letters) and rows (numbers). Select cell ranges (A1:B10) to execute code formulas.</p>
            </div>
            <div class="why-card">
              <h3>⚡ Automated Recalculations</h3>
              <p>Learn how editing cell values updates formulas automatically, showing the power of computation.</p>
            </div>
            <div class="why-card">
              <h3>📂 Sorting & Filtering</h3>
              <p>Sort columns alphabetically or numerically, filter rows by value, and manage large data tables.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Learning Outcomes -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Outcomes</div>
            <h2 class="section-title">Program <span>Learning Milestones</span></h2>
            <p class="section-sub">Measurable study advantages for middle school math and science.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>✓ Math Grid Creators</h3>
              <p>Students in Bhopal and Indore compile budget grids and marksheet tables, writing calculations independently.</p>
            </div>
            <div class="why-card">
              <h3>✓ Science Lab Trackers</h3>
              <p>Kids in Raipur and Delhi build science experiment tables, plotting line graphs for lab logs.</p>
            </div>
            <div class="why-card">
              <h3>✓ Clean Data Presentation</h3>
              <p>Organize data tables, apply layout color rules, and format headers for school submissions in Pune and Mumbai.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Curriculum Highlights -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Syllabus</div>
            <h2 class="section-title">6-Week <span>Curriculum Syllabus</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Week 1: Grid Anatomy & Setup</h3>
              <p>Rows, columns, cells addresses, adjusting sizes, entering texts, and numbers formatting.</p>
            </div>
            <div class="why-card">
              <h3>Week 2: Arithmetic Calculations</h3>
              <p>Writing cell addition, subtraction, multiplication, and division formulas (basic math operators).</p>
            </div>
            <div class="why-card">
              <h3>Week 3: Auto-Sum & Average</h3>
              <p>Using SUM and AVERAGE range functions to calculate marks and percentages.</p>
            </div>
            <div class="why-card">
              <h3>Week 4: Table Styling & Formats</h3>
              <p>Borders, cell background fills, alignment layouts, and currency formatting rules.</p>
            </div>
            <div class="why-card">
              <h3>Week 5: Chart & Graph Insertion</h3>
              <p>Inserting bar charts, custom legends, line graphs, and exporting images for slides.</p>
            </div>
            <div class="why-card">
              <h3>Week 6: Portfolio Project Compilation</h3>
              <p>Building a student monthly budget spreadsheet and calculating class marksheet reports.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Project Outcomes -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Projects</div>
            <h2 class="section-title">Excel <span>Student Portfolios</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>📊 Monthly Budget Tracker</h3>
              <p>Students build a budget grid showing income and expenses, calculating savings percentages via formulas.</p>
            </div>
            <div class="why-card">
              <h3>🧮 Automated Class Marksheet</h3>
              <p>A data table compiling student grades, writing range logic to find class averages and rank scores.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GEO Section -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>National Scope</div>
            <h2 class="section-title">Excel Classes in <span>Bhopal, Indore, and Raipur</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Central India Focus</h3>
              <p>Middle schoolers in Bhopal, Indore, and Raipur attend weekend batches to master spreadsheet calculations.</p>
            </div>
            <div class="why-card">
              <h3>National Network</h3>
              <p>Connecting students in Delhi, Mumbai, Pune, Bangalore, and Hyderabad to exchange data sheets.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Is Excel too difficult for Class 6 students?',
        a: 'No, we start with column layout setups and simple addition, building up to averages and charts step-by-step.'
      },
      {
        q: 'Do students need paid Office licenses?',
        a: 'No, students can use free online spreadsheet tools (Google Sheets or MS Office Web) during the cohort.'
      }
    ],
    faqs: [
      {
        q: 'What is the Excel for Students program?',
        a: 'It is a 6-week online cohort teaching Class 6-8 kids spreadsheet layouts, calculations, formulas, and charts.'
      },
      {
        q: 'Will my child learn math formulas?',
        a: 'Yes, they write SUM, AVERAGE, and basic arithmetic formulas to calculate values.'
      },
      {
        q: 'What projects do students compile?',
        a: 'They build a monthly savings budget sheet and an automated class marksheet table.'
      },
      {
        q: 'Is it live or recorded?',
        a: 'Classes are live with real-time feedback. Recordings are shared within 24 hours on the student portal.'
      },
      {
        q: 'Will Excel help with school math?',
        a: 'Yes, tracking grid cells and averages reinforces school arithmetic and geometry statistics.'
      },
      {
        q: 'Do you cover chart design?',
        a: 'Yes. Inserting bar graphs, line charts, and editing chart titles is a core syllabus block.'
      },
      {
        q: 'Is a certificate awarded?',
        a: 'Yes, completing the program and projects earns a verified SkillNest Excel certificate.'
      },
      {
        q: 'How do I book a demo class?',
        a: 'You can book a free demo session via the booking links on our homepage.'
      }
    ]
  },
  {
    path: 'programs/productivity-tools/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/programs/productivity-tools/',
    title: 'Modern Productivity Tools Program for School Kids | SkillNest',
    description: 'Learn Google Workspace, Canva, digital scheduling, and file management. Empower your child with modern digital productivity and organization workflows.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Programs', url: '../index.html' },
      { name: 'Productivity Tools', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Academic Advantage',
      title: 'Modern <span>Productivity Tools</span> 🚀',
      subtitle: 'Master touch typing speed, advanced document styling, Canva infographic design, and digital calendar workflows in 6 weeks.',
      stats: [
        { icon: '⌨️', label: 'Home Row typing' },
        { icon: '🎨', label: 'Canva design' },
        { icon: '📂', label: 'Workspace files' },
        { icon: '📅', label: 'Time Management' }
      ]
    },
    aeo: {
      question: 'How can school kids improve their digital productivity?',
      answer: 'School kids can improve digital productivity by mastering touch typing speed, learning advanced document layouts, customizing presentation slides in Canva, using digital calendars for time management, and organizing local and cloud files cleanly.'
    },
    sections: `
      <!-- Program Overview -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Productivity</div>
            <h2 class="section-title">Lifelong <span>Digital Assets</span></h2>
            <p class="section-sub">Teaching kids active document layouts and scheduling habits that schools miss.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Touch Typing Speed</h3>
              <p>Type blind using the home row, increasing input speeds by 200% and preventing screen-to-keys neck strain.</p>
            </div>
            <div class="why-card">
              <h3>Canva Presentation Design</h3>
              <p>Create visual outlines, coordinate contrast palettes, and design school slide deck layouts.</p>
            </div>
            <div class="why-card">
              <h3>Digital Study Schedules</h3>
              <p>Use digital calendars to schedule homework hours, set exam reminders, and track tasks independently.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What Students Learn -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Skills</div>
            <h2 class="section-title">Productivity Milestones <span>Taught</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>⌨️ Blind Typing Muscle</h3>
              <p>Anchor index fingers on J and F keys, using all 10 fingers on default zones without looking down.</p>
            </div>
            <div class="why-card">
              <h3>📝 Advanced Doc Layouts</h3>
              <p>Configure margins, line spacing, headings hierarchy, and insert headers/footers inside docs.</p>
            </div>
            <div class="why-card">
              <h3>📅 Time Blocking Logic</h3>
              <p>Organize weekly study tasks in color-coded calendar blocks, building independent time-management habits.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Learning Outcomes -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Outcomes</div>
            <h2 class="section-title">Program <span>Learning Milestones</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>✓ Self-Sufficient Builders</h3>
              <p>Students in Bhopal and Indore compile school slide decks and write documents without adult help.</p>
            </div>
            <div class="why-card">
              <h3>✓ High Layout Quality</h3>
              <p>Kids in Raipur and Delhi avoid messy formats, formatting reports cleanly with correct margins.</p>
            </div>
            <div class="why-card">
              <h3>✓ Organized Schedules</h3>
              <p>Schedule studies and track homework timelines in Pune, Mumbai, Bangalore, and Hyderabad nodes.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Curriculum Highlights -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Syllabus</div>
            <h2 class="section-title">6-Week <span>Curriculum Syllabus</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Week 1: Typing Home Row Basics</h3>
              <p>Keyboard posture, home anchors, spacing, and initial typing accuracy runs.</p>
            </div>
            <div class="why-card">
              <h3>Week 2: Full Keyboard Typing</h3>
              <p>QWERTY zone reach, bottom row, opposite Shift keys, and WPM speed building.</p>
            </div>
            <div class="why-card">
              <h3>Week 3: Advanced Document Styling</h3>
              <p>Setting page margins, custom paragraphs, headers, and automatic outlines.</p>
            </div>
            <div class="why-card">
              <h3>Week 4: Graphic Outlines in Canva</h3>
              <p>Slide dimensions, hierarchy alignment, contrast color rules, and exporting layouts.</p>
            </div>
            <div class="why-card">
              <h3>Week 5: Digital Calendar Setup</h3>
              <p>Creating tasks, blocking homework hours, and setting automatic study alerts.</p>
            </div>
            <div class="why-card">
              <h3>Week 6: Presentation Project Compilation</h3>
              <p>Designing a personal study planner dashboard and presenting slide assets.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Project Outcomes -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Projects</div>
            <h2 class="section-title">Productivity <span>Student Portfolios</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>📅 Student Study Calendar</h3>
              <p>A digital calendar dashboard detailing weekly homework blocks and automated test reminders.</p>
            </div>
            <div class="why-card">
              <h3>🖼️ Slide Design Project</h3>
              <p>An infographic slide template created in Canva following design alignment guidelines.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GEO Section -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Local Context</div>
            <h2 class="section-title">Productivity Classes in <span>Bhopal, Indore, and Raipur</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Central India Focus</h3>
              <p>Middle schoolers in Bhopal, Indore, and Raipur learn how document layouts, typing, and digital scheduling operate.</p>
            </div>
            <div class="why-card">
              <h3>Metro Collaboration</h3>
              <p>Connecting students in Delhi, Mumbai, Pune, Bangalore, and Hyderabad for live speed runs.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Why should kids learn typing in Class 6?',
        a: 'Class 6 is when school report sizes increase. Touch typing saves time and neck strain, helping kids compile texts rapidly.'
      },
      {
        q: 'Is Canva free for school students?',
        a: 'Yes, Canva has a free account tier with access to excellent templates and design tools.'
      }
    ],
    faqs: [
      {
        q: 'What is the Productivity Tools program?',
        a: 'It is a 6-week online cohort teaching Class 6-8 kids touch typing, advanced doc styling, Canva design, and digital calendars.'
      },
      {
        q: 'Will my child learn touch typing?',
        a: 'Yes, placing hands on the home row keys blind is a primary module in our syllabus.'
      },
      {
        q: 'What projects do students compile?',
        a: 'They design a school slide deck template in Canva and build a digital calendar dashboard.'
      },
      {
        q: 'Is it live or recorded?',
        a: 'Sessions are live with interactive screensharing. Recording links are shared on the student dashboard.'
      },
      {
        q: 'Will Google Docs be covered?',
        a: 'Yes. Font sizes, line spacing, captions, and outlines are core document formatting blocks.'
      },
      {
        q: 'How does digital scheduling help kids?',
        a: 'It teaches them time management and task tracking, reducing late project rushes.'
      },
      {
        q: 'Is a certificate awarded?',
        a: 'Yes, completing the program and projects earns a verified SkillNest productivity certificate.'
      },
      {
        q: 'How do I book a demo class?',
        a: 'You can book a free demo session via the booking links on our homepage.'
      }
    ]
  },
  {
    path: 'programs/cyber-safety/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/programs/cyber-safety/',
    title: 'Cyber Safety & Internet Security Program for Kids | SkillNest',
    description: 'Equip your child with cyber safety hygiene: password complexity, phishing awareness, private browsing settings, and safe social media habits.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Programs', url: '../index.html' },
      { name: 'Cyber Safety', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Digital Citizenship',
      title: 'Cyber Safety & <span>Online Security</span> 🛡️',
      subtitle: 'Build robust password habits, identify phishing link traps, customize browser privacy settings, and learn safe online behaviors in 6 weeks.',
      stats: [
        { icon: '🔑', label: 'Password Security' },
        { icon: '🔎', label: 'Phishing Awareness' },
        { icon: '🛡️', label: 'Browser Settings' },
        { icon: '💬', label: 'Safe Messaging' }
      ]
    },
    aeo: {
      question: 'Why is cyber safety and internet security important for children?',
      answer: 'Cyber safety is critical for children to recognize online risks, including phishing links, virus downloads, private location trackers, and cyber bullying. Developing safe browsing settings and complex password hygiene protects kids\' digital footprints.'
    },
    sections: `
      <!-- Program Overview -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Security</div>
            <h2 class="section-title">Robust <span>Cyber Hygiene</span></h2>
            <p class="section-sub">Teaching kids to identify online risks and protect their personal data.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Password Entropy</h3>
              <p>Learn to avoid simple name codes, structuring complex password loops using letters, symbols, and length guidelines.</p>
            </div>
            <div class="why-card">
              <h3>Phishing Indicators</h3>
              <p>Practice identifying fake email attachments, suspicious download links, and fake software update warnings.</p>
            </div>
            <div class="why-card">
              <h3>Browser Privacy Settings</h3>
              <p>Configure private search settings, toggle location access parameters, and manage cookies options.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What Students Learn -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Skills</div>
            <h2 class="section-title">Safety Milestones <span>Taught</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>🔑 Safe Data Credentials</h3>
              <p>Write complex passwords and calculate crack time approximations using length entropy guidelines.</p>
            </div>
            <div class="why-card">
              <h3>🔒 Browser Privacy Controls</h3>
              <p>Turn off cookies tracking, disable location permissions, and toggle safe search search settings.</p>
            </div>
            <div class="why-card">
              <h3>💬 Messaging Safe Rules</h3>
              <p>Learn to avoid sharing home address entries, phone lists, or schools names in online public chats.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Learning Outcomes -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Outcomes</div>
            <h2 class="section-title">Program <span>Learning Milestones</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>✓ Safe Digital Citizens</h3>
              <p>Students in Bhopal and Indore set up secure search profiles, managing password settings independently.</p>
            </div>
            <div class="why-card">
              <h3>✓ Phishing Detectors</h3>
              <p>Kids in Raipur and Delhi spot fake update alerts and avoid spam link clicks in study folders.</p>
            </div>
            <div class="why-card">
              <h3>✓ Protected Footprints</h3>
              <p>Toggle sharing controls and secure digital identities across Pune, Mumbai, Bangalore, and Hyderabad nodes.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Curriculum Highlights -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Syllabus</div>
            <h2 class="section-title">6-Week <span>Curriculum Syllabus</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Week 1: Digital Footprint Basics</h3>
              <p>What is a digital footprint, tracking search loops, cookies logic, and permanent data records.</p>
            </div>
            <div class="why-card">
              <h3>Week 2: Password Complexity Rules</h3>
              <p>Character combinations, lengths entropy, safe vaults, and avoiding personal indicators.</p>
            </div>
            <div class="why-card">
              <h3>Week 3: Phishing & Link Safety</h3>
              <p>Identifying fake emails, spam downloads, pop-up ads traps, and unsafe URLs.</p>
            </div>
            <div class="why-card">
              <h3>Week 4: Device Privacy Controls</h3>
              <p>Toggling search safety, camera/microphone permissions, and location trackers setup.</p>
            </div>
            <div class="why-card">
              <h3>Week 5: Safe Online Messaging</h3>
              <p>Chat permissions, data sharing rules, recognizing cyber bullying, and block rules.</p>
            </div>
            <div class="why-card">
              <h3>Week 6: Safety Portfolio Project</h3>
              <p>Building a custom student cyber threat safety checklist sheet for the home network.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Project Outcomes -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Projects</div>
            <h2 class="section-title">Safety <span>Student Portfolios</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>🛡️ Student Home Safety Checklist</h3>
              <p>A custom printable cyber safety checklist designed to audit browser settings and passwords on home laptops.</p>
            </div>
            <div class="why-card">
              <h3>🔑 Password Complexity Test</h3>
              <p>Creating and documenting three complex password templates, verifying security levels using diagnostic checkers.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GEO Section -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Local Context</div>
            <h2 class="section-title">Cyber Safety Classes in <span>Bhopal, Indore, and Raipur</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Central India Focus</h3>
              <p>Middle schoolers in Bhopal, Indore, and Raipur learn how password entropy, safe search, and phishing rules operate.</p>
            </div>
            <div class="why-card">
              <h3>Metro Collaboration</h3>
              <p>Connecting students in Delhi, Mumbai, Pune, Bangalore, and Hyderabad to exchange safety tips.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Is cyber safety necessary for kids in Class 6?',
        a: 'Yes. Middle school is when kids start browsing the internet for CBSE homework, making phishing links a real threat.'
      },
      {
        q: 'Do you teach security settings on mobile devices?',
        a: 'Yes, basic camera, microphone, and location sharing security limits on mobile devices are covered.'
      }
    ],
    faqs: [
      {
        q: 'What is the Cyber Safety program?',
        a: 'It is a 6-week online cohort teaching Class 6-8 kids password rules, safe browser settings, and phishing detection.'
      },
      {
        q: 'Will my child learn password safety?',
        a: 'Yes, writing complex passwords and verifying character strength is a core syllabus block.'
      },
      {
        q: 'What projects do students compile?',
        a: 'They build a custom home cyber safety audit checklist sheet and document password tests.'
      },
      {
        q: 'Is it live or recorded?',
        a: 'All sessions are live with interactive screensharing. Recordings are shared within 24 hours on the student portal.'
      },
      {
        q: 'Do you cover browser privacy?',
        a: 'Yes. Configuring private search safety, cookies options, and location permissions is a core module.'
      },
      {
        q: 'How does it help with digital footprints?',
        a: 'It teaches kids that internet comments, searches, and posts form a permanent online trail.'
      },
      {
        q: 'Is a certificate awarded?',
        a: 'Yes, completing the program and projects earns a verified SkillNest cyber safety certificate.'
      },
      {
        q: 'How do I book a demo class?',
        a: 'You can book a free demo session via the booking links on our homepage.'
      }
    ]
  }
,
  {
    path: 'programs/summer-camp/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/programs/summer-camp/',
    title: 'Best Summer Course for Kids in India | 6-Week Coding & Digital Skills Bootcamp | SkillNest',
    description: 'Enroll your child in the best summer course for kids in India (Class 6-8). 6-week online coding, AI, and computer basics bootcamp to build practical digital skills. Book a Free Demo today!',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Programs', url: '../index.html' },
      { name: 'Summer Camp', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Summer Bootcamp',
      title: 'Summer Course <span>for Kids</span> ☀️',
      subtitle: 'Keep your child productive this summer. A complete online program teaching AI tools, coding, computer basics, and cyber safety for Class 6–8.',
      stats: [
        { icon: '📅', label: '6 Weeks Duration' },
        { icon: '⏰', label: '2 Hrs / Day Daily Classes' },
        { icon: '✨', label: 'Online Mode' },
        { icon: '✨', label: 'Certificate Included' }
      ]
    },
    aeo: {
      question: 'What is the best summer course for kids in India?',
      answer: 'The best summer course for school kids (Class 6-8) is a comprehensive digital literacy and tech-skills bootcamp. SkillNest offers a 6-week online summer camp teaching computer basics, Microsoft Office (Word, Excel, PowerPoint), cyber safety, block-based Scratch coding, and safe generative AI tools. Taught live by expert tutors in small cohorts, the curriculum is NEP 2020-compliant and highly practical.'
    },
    sections: `
      <!-- Program Overview -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Overview</div>
            <h2 class="section-title">A Structured <span>Summer Bootcamp</span></h2>
            <p class="section-sub">Turning summer screen time into active, structured building and future-ready skill creation.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Computer & Office Foundations</h3>
              <p>Master operating system directories, touch typing mechanics, formal email drafting, and Microsoft Office (Word, Excel, PowerPoint) layouts.</p>
            </div>
            <div class="why-card">
              <h3>Scratch Logic & Coding</h3>
              <p>Build coordinate geometry precision and Algorithmic thinking. Program interactive visual block games, chase loops, and scoring timers.</p>
            </div>
            <div class="why-card">
              <h3>AI Prompting & Cyber Safety</h3>
              <p>Learn child-safe generative AI prompts (Role, Task, Context) and enforce essential cyber hygiene rules like strong password safety.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What Students Learn -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Skills</div>
            <h2 class="section-title">Core Competencies <span>Developed</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>💻 Digital Literacy Basics</h3>
              <p>Learn keyboard shortcuts, file system nesting, and cloud folder sharing settings to prepare for high-school assignments.</p>
            </div>
            <div class="why-card">
              <h3>👾 Coding Mechanics</h3>
              <p>Write coordinate grid movements, repeat loops, variable counters, and conditional branch structures in Scratch.</p>
            </div>
            <div class="why-card">
              <h3>🛡️ Cyber Safety Protocols</h3>
              <p>Establish safe browser settings, phishing awareness, and account security habits to protect personal data online.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Learning Outcomes -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Outcomes</div>
            <h2 class="section-title">Summer Learning <span>Milestones</span></h2>
            <p class="section-sub">Achieve real capabilities that improve academic performance and build creative tech confidence.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>✓ Creative Tech Builders</h3>
              <p>Students in Bhopal and Indore design animations, coordinate grids, and compile project folders independently.</p>
            </div>
            <div class="why-card">
              <h3>✓ Critical Thinkers</h3>
              <p>Kids in Raipur and Delhi write smart prompt outlines, fact-check statements, and format spreadsheets logically.</p>
            </div>
            <div class="why-card">
              <h3>✓ Peer Collaboration</h3>
              <p>Connect with students in Pune, Mumbai, Bangalore, and Hyderabad for live coordinate game matches and workspace reviews.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Curriculum Highlights -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Syllabus</div>
            <h2 class="section-title">6-Week <span>Bootcamp Syllabus</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Week 1: System Basics & Shortcuts</h3>
              <p>Operating system setup, file directory nesting, folder zipping, and system keyboard navigation shortcuts.</p>
            </div>
            <div class="why-card">
              <h3>Week 2: Document Formatting & Layouts</h3>
              <p>Font margins, paragraph alignments, headers hierarchy, table insertions, and academic templates inside MS Word.</p>
            </div>
            <div class="why-card">
              <h3>Week 3: Spreadsheets & Data Math</h3>
              <p>MS Excel grids formatting, basic formula operations (SUM, AVERAGE), table structures, and data charts creation.</p>
            </div>
            <div class="why-card">
              <h3>Week 4: Coding Grids & Loops</h3>
              <p>Scratch coordinate placement, sprite animation loops, If-Else block logic, and variable scoreboards.</p>
            </div>
            <div class="why-card">
              <h3>Week 5: AI Prompts & Slides</h3>
              <p>Generative prompt logic templates, Canva graphic presentations layout rules, and ethics/fact-checking rules.</p>
            </div>
            <div class="why-card">
              <h3>Week 6: Digital Portfolio & Email</h3>
              <p>Compiling 5 term projects inside a workspace directory, cloud sharing setup, and formal email submissions.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Project Outcomes -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Projects</div>
            <h2 class="section-title">Practical <span>Student Portfolios</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>📁 Structured Workspace Folder</h3>
              <p>A nested local directory containing labeled science reports, math databases, and game assets compiled cleanly.</p>
            </div>
            <div class="why-card">
              <h3>🎮 Coordinate Game Script</h3>
              <p>A Scratch game featuring custom sprite movements, wall bounces, score variables, and timers programmed from scratch.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GEO Section -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>National Coverage</div>
            <h2 class="section-title">Summer Cohorts in <span>Bhopal, Indore, and Raipur</span></h2>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Regional Hubs</h3>
              <p>Middle school students in Bhopal, Indore, and Raipur interact in weekend summer batches to test program projects.</p>
            </div>
            <div class="why-card">
              <h3>Metropolitan Scale</h3>
              <p>Online classrooms connect students in Pune, Mumbai, Bangalore, Chennai, Lucknow, Patna, and Delhi to review portfolios.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Which computer skills are covered in this summer course?',
        a: 'The bootcamp covers operating system file management, touch typing, Microsoft Office (Word, Excel, PowerPoint), Scratch block coding, AI prompting basics (using ChatGPT and Canva), and essential cyber safety hygiene.'
      },
      {
        q: 'Are classes live or pre-recorded?',
        a: 'All SkillNest summer classes are delivered 100% live and interactive on our online platform. Students attend scheduled cohorts in small batches of 5-10 kids to ensure personal attention and hands-on guidance.'
      }
    ],
    faqs: [
      {
        q: 'What is the best computer course for kids in India?',
        a: 'The best computer course for kids in India focuses on practical skills rather than theory. SkillNest teaches Class 6–8 students MS Word, Excel, PowerPoint, file management, safe internet use, typing skills, and an introduction to AI tools — all through hands-on projects.'
      },
      {
        q: 'At what age should kids start learning computer skills?',
        a: 'Class 6–8 (ages 10–14) is the ideal age for structured computer learning. At this stage, children have the focus and cognitive ability to move beyond games and begin using technology productively for school projects, documents, spreadsheets, and digital creativity.'
      },
      {
        q: 'What computer skills should school students learn?',
        a: 'School students should learn: MS Word for documents, MS Excel for data and calculations, PowerPoint for presentations, file management, safe internet browsing, touch typing, email etiquette, and basic AI tool awareness. These are the foundational practical computer skills every student needs.'
      },
      {
        q: 'Is MS Office important for school students?',
        a: 'Yes. MS Office — including Word, Excel, and PowerPoint — is essential for school students. These tools are used for assignments, project reports, science data analysis, and presentations throughout middle school, high school, and college. Learning them early gives students a significant academic advantage.'
      },
      {
        q: 'How is SkillNest different from school computer classes?',
        a: 'School computer classes focus on theory, definitions, and exam marks. SkillNest focuses entirely on practical, hands-on skills. Students spend 80% of class time actually using computers — building real projects, practicing typing, creating documents and spreadsheets — rather than reading from textbooks.'
      }
    ]
  }];

function generateHtml(page) {
  const basePath = '../'.repeat(page.depth);
  const canonicalUrl = page.url;

  // Compile Breadcrumbs HTML
  let breadcrumbsHtml = '';
  page.breadcrumbs.forEach(bc => {
    if (bc.isCurrent) {
      breadcrumbsHtml += `<span style="color:var(--gray-600);">${bc.name}</span>`;
    } else {
      breadcrumbsHtml += `
        <a href="${bc.url}" style="color:var(--blue-600); text-decoration:none; font-weight:600;">${bc.name}</a>
        <span style="margin:0 8px; color:var(--gray-400);">›</span>
      `;
    }
  });

  // Compile Stats HTML
  let statsHtml = '';
  page.hero.stats.forEach(stat => {
    statsHtml += `
      <div class="res-stat-card">
        <span class="res-stat-icon">${stat.icon}</span>
        <span class="res-stat-label">${stat.label}</span>
      </div>
    `;
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
        "text": item.a
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

  // Add EducationalOccupationalProgram schema for program pages
  let programSchemaHtml = '';
  if (page.depth > 1) {
    const programSchema = {
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalProgram",
      "name": page.hero.tag || page.title,
      "description": page.description,
      "provider": {
        "@type": "EducationalOrganization",
        "name": "SkillNest",
        "url": "https://skillnest.co.in/"
      },
      "programPrerequisites": [
        {
          "@type": "AlignmentObject",
          "alignmentType": "educationalLevel",
          "educationalFramework": "CBSE / NEP 2020",
          "targetName": "Middle School Students (Class 6-8)"
        }
      ],
      "offers": {
        "@type": "Offer",
        "category": "Educational",
        "availability": "https://schema.org/InStock"
      }
    };
    programSchemaHtml = `
      <script type="application/ld+json">
        ${JSON.stringify(programSchema, null, 2)}
      </script>
    `;
  }

  // Compile page HTML content (Without inline styles)
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
  ${programSchemaHtml}
  
  <script src="${basePath}assets/js/fallback.js" defer="" id="file-protocol-fallback" data-depth="${page.depth}"></script>
</head>
<body>

  <!-- Sticky Header Placeholder (Injected Statically at Build) -->
  <header class="header" id="mainHeader" data-dynamic-component="header"></header>

  <!-- Mobile Nav Overlay Placeholder (Injected Statically at Build) -->
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
    <section class="page-hero">
      <div class="container">
        <div class="page-hero-tag"><span class="dot"></span>${page.hero.tag}</div>
        <h1>${page.hero.title}</h1>
        <p>${page.hero.subtitle}</p>
        <div class="res-stats-strip">
          ${statsHtml}
        </div>
        <div class="hero-ctas">
          <a href="${basePath}contact/book-demo.html" class="btn-yellow cd-btn-shift" data-config="ctaText">Book Free Demo</a>
          <a href="#related-links" class="btn-ghost btn-ghost-hero">Explore Syllabus →</a>
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

    <!-- Core Page Content Sections -->
    ${page.sections}

    <!-- Related Links / Internal Linking Matrix -->
    <section class="why-section bg-gray" id="related-links">
      <div class="container">
        <div class="text-center fade-up">
          <div class="section-tag"><span class="dot"></span>Linking matrix</div>
          <h2 class="section-title">Related <span>Educational Pathways</span></h2>
          <p class="section-sub">Cross-reference with सीबीएसई subjects, tools calculators, and parenting guides.</p>
        </div>

        <div class="why-grid mt-32">
          <div class="why-card">
            <h3>🎓 Core Courses</h3>
            <p>Syllabus info: <a href="${basePath}courses/computer-basics/index.html">Computer Basics</a>, <a href="${basePath}courses/typing-course/index.html">Touch Keyboarding</a>, <a href="${basePath}courses/coding/index.html">Coding Program</a>, and <a href="${basePath}courses/ai-classes-for-kids/index.html">AI Classes for Kids</a>.</p>
          </div>
          <div class="why-card">
            <h3>👨‍👩‍👧 Parent Advice</h3>
            <p>Expert guides: <a href="${basePath}parent-hub/screen-time-guide/index.html">Screen Time limits</a>, <a href="${basePath}parent-hub/ai-safety-for-kids/index.html">AI safety monitoring</a>, and <a href="${basePath}parent-hub/digital-parenting/index.html">Digital parenting agreements</a>.</p>
          </div>
          <div class="why-card">
            <h3>📊 Comparisons</h3>
            <p>Review facts: <a href="${basePath}compare/ai-vs-coding/index.html">AI vs Coding</a>, <a href="${basePath}compare/coding-vs-digital-skills/index.html">Coding vs Digital Skills</a>, and <a href="${basePath}compare/online-vs-offline-learning/index.html">Online vs Offline Learning</a>.</p>
          </div>
        </div>
      </div>
    </section>

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
          <p class="section-sub">Clear answers regarding program details and cbse alignments.</p>
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

</body>
</html>`;
}

// Legacy Coding Program to Coding Redirect stub mapping
const redirects = {
  '/programs/scratch-coding/': '/programs/coding/'
};

function getDepthAndPrefix(cleanUrl) {
  const segments = cleanUrl.split('/').filter(Boolean);
  const depth = segments.length;
  let prefix = '';
  for (let i = 0; i < depth; i++) {
    prefix += '../';
  }
  return { depth, prefix };
}

function makeRedirectHtml(target, depth, prefix) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<script src="${prefix}assets/js/fallback.js" defer="" id="file-protocol-fallback" data-depth="${depth}"></script>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta charset="utf-8">
<title>Redirecting… | SkillNest</title>
<link rel="canonical" href="https://skillnest.co.in${target}">
<meta http-equiv="refresh" content="0; url=https://skillnest.co.in${target}">
<meta name="robots" content="noindex, follow">
<script>window.location.replace("${target}");</script>
<meta name="theme-color" content="#1e40af">
</head>
<body>
<main>
<h1 style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;">Redirecting… | <span class="brand-name">SkillNest</span></h1>
<p>This page has moved. <a href="${target}">Click here</a> if you are not redirected automatically.</p>
</main>
</body>
</html>`;
}

console.log('=== STARTING PROGRAMS PAGE GENERATION ===');

// Generate active programs pages
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

// Generate redirect stubs and update redirect-map.json
const redirectMapPath = path.join(rootDir, 'redirect-map.json');
let redirectMap = {};
if (fs.existsSync(redirectMapPath)) {
  try {
    redirectMap = JSON.parse(fs.readFileSync(redirectMapPath, 'utf8'));
  } catch(e) {
    console.warn(`Could not parse existing redirect-map.json: ${e.message}`);
  }
}

// Remove legacy program redirects to allow fresh pages to load
const freshPrograms = [
  '/programs/',
  '/programs/digital-skills-foundation/',
  '/programs/ai-skills-for-students/',
  '/programs/coding/',
  '/programs/excel-for-students/',
  '/programs/productivity-tools/',
  '/programs/cyber-safety/',
  '/programs/summer-camp/'
];
freshPrograms.forEach(url => {
  if (redirectMap[url]) {
    delete redirectMap[url];
    console.log(`Removed redirect rule for fresh page: ${url}`);
  }
});

for (const [cleanUrl, target] of Object.entries(redirects)) {
  const folderRelPath = cleanUrl.slice(1); // remove leading slash
  const folderAbsPath = path.join(rootDir, folderRelPath);
  const indexHtmlPath = path.join(folderAbsPath, 'index.html');

  if (!fs.existsSync(folderAbsPath)) {
    fs.mkdirSync(folderAbsPath, { recursive: true });
  }

  const { depth, prefix } = getDepthAndPrefix(cleanUrl);
  const stubHtml = makeRedirectHtml(target, depth, prefix);
  fs.writeFileSync(indexHtmlPath, stubHtml, 'utf8');
  console.log(`✓ Generated Redirect Stub: ${cleanUrl} -> ${target} (depth: ${depth})`);

  redirectMap[cleanUrl] = target;
}

fs.writeFileSync(redirectMapPath, JSON.stringify(redirectMap, null, 2), 'utf8');
console.log('✓ Successfully updated redirect-map.json.');

console.log('=== PROGRAMS PAGE GENERATION COMPLETE ===');
