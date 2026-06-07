const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../');

// Define projects pages configuration
const pages = [
  {
    path: 'projects/index.html',
    depth: 1,
    url: 'https://skillnest.co.in/projects/',
    title: 'Student Project Gallery & Digital Portfolios | SkillNest',
    description: 'Explore the practical coding, games, AI, Excel, presentations, and digital portfolios built by Class 6-8 students at SkillNest.',
    breadcrumbs: [
      { name: 'Home', url: '../index.html' },
      { name: 'Projects', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Portfolio Showcase',
      title: 'Student <span>Project Gallery</span> 📁',
      subtitle: 'At SkillNest, we believe in learning by doing. Check out the real-world projects our Class 6–8 students build from scratch during the 6-week cohort.',
      stats: [
        { icon: '🎮', label: 'Coding & Games' },
        { icon: '📊', label: 'Excel & Data Grids' },
        { icon: '🤖', label: 'AI Prompting Logs' },
        { icon: '🎓', label: 'Verified Certificates' }
      ]
    },
    aeo: {
      question: 'What projects do students build on SkillNest?',
      answer: 'SkillNest students in Class 6–8 build practical digital projects including automated Excel marksheets, Scratch block-coded AI games, PowerPoint presentations on cyber safety, Google Docs formatting reports, Canva graphic designs, and ethical AI prompting journals to showcase verified digital competencies.'
    },
    sections: `
      <!-- Personality Test Banner -->
      <section id="ptBanner" class="pt-banner" aria-label="Free Personality Test">
        <div class="pt-inner">
          <div class="pt-content">
            <div class="pt-badge-row">
              <span class="pt-tag"><span class="pt-dot"></span>100% Free &amp; Instant</span>
              <span class="pt-tag pt-tag-new">✨ New</span>
            </div>
            <h2 class="pt-title">🧠 Discover Your <span class="pt-hl">Personality Type</span></h2>
            <p class="pt-sub">Take India's most practical HEXACO personality assessment — 100 science-backed questions designed for students. Understand your strengths, learning style &amp; career fit in minutes.</p>
            <div class="pt-chips">
              <span class="pt-chip">🔬 Science-Based</span>
              <span class="pt-chip">⏱️ ~10 Minutes</span>
              <span class="pt-chip">📊 Instant Results</span>
              <span class="pt-chip">🔒 100% Private</span>
              <span class="pt-chip">🎓 For Students</span>
            </div>
            <div class="pt-cta-row">
              <a href="../tools/personality-test/" class="pt-cta" id="ptBannerCta">Take Free Personality Test →</a>
              <span class="pt-note">No sign-up required</span>
            </div>
          </div>
          <div class="pt-cards">
            <div class="pt-card">
              <div class="pt-card-icon">🎯</div>
              <div class="pt-card-title">Know Your Strengths</div>
              <div class="pt-card-desc">Uncover your natural talents and how to apply them in studies &amp; career.</div>
            </div>
            <div class="pt-card">
              <div class="pt-card-icon">📚</div>
              <div class="pt-card-title">Better Learning Style</div>
              <div class="pt-card-desc">Understand how you learn best and maximise your academic performance.</div>
            </div>
            <div class="pt-card">
              <div class="pt-card-icon">🚀</div>
              <div class="pt-card-title">Career Clarity</div>
              <div class="pt-card-desc">Get insights into which fields and roles suit your personality profile.</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Categories Grid -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Project Categories</div>
            <h2 class="section-title">Explore Student <span>Showcase Areas</span></h2>
            <p class="section-sub">Select a category below to see verified project outcomes and specific learning proofs.</p>
          </div>

          <div class="why-grid">
            <div class="why-card fade-up">
              <div class="why-icon">🎮</div>
              <h3>Coding & Games</h3>
              <p>Explore block-based MIT Coding Program projects, interactive logic puzzles, and beginner game scripts built by students.</p>
              <a class="btn-primary" href="coding-and-games/index.html">View Games →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">📽️</div>
              <h3>Student Presentations</h3>
              <p>Browse PowerPoint slide decks and Canva design sheets on cyber safety and school topics built for public speaking.</p>
              <a class="btn-primary" href="student-presentations/index.html">View Slides →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">🤖</div>
              <h3>AI Projects</h3>
              <p>Inspect AI prompt logs, ChatGPT research queries, and productivity frameworks designed safely by middle schoolers.</p>
              <a class="btn-primary" href="ai-projects/index.html">View AI Logs →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">🎓</div>
              <h3>Student Certificates</h3>
              <p>View completion recognitions, verifiable digital skill badges, and student program credentials.</p>
              <a class="btn-primary" href="certificates/index.html">View Certificates →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">📊</div>
              <h3>Excel Projects</h3>
              <p>Review arithmetic formula grids, student marksheets, math solvers, and data analysis charts in MS Excel.</p>
              <a class="btn-primary" href="excel-projects/index.html">View Spreadsheets →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">📁</div>
              <h3>Portfolio Projects</h3>
              <p>Examine full multi-skill student portfolios, professional formatted reports, and comprehensive term projects.</p>
              <a class="btn-primary" href="portfolio-projects/index.html">View Portfolios →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Outcomes & Benefits -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Pedagogical Value</div>
            <h2 class="section-title">Why Portfolios <span>Matter for Students</span></h2>
            <p class="section-sub">A compilation of projects transitions kids from passive consumers to active digital creators.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>✓ NEP 2020 Framework Integration</h3>
              <p>Our curriculum matches national educational reforms. By creating tangible assets instead of rote reading, students in Bhopal, Indore, and Raipur demonstrate actual application skills.</p>
            </div>
            <div class="why-card">
              <h3>✓ Verified Academic Authority</h3>
              <p>School teachers and admission reviews in Delhi and Pune value student portfolios as evidence of computational thinking, logical structure, and practical office tool readiness.</p>
            </div>
            <div class="why-card">
              <h3>✓ Shifting Device Habits</h3>
              <p>Building Scratch programs or budget columns teaches students to see devices as builder toolkits, helping balance passive media streaming with active intellectual creation.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Trust Stories -->
      <section class="before-after-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Student Success</div>
            <h2 class="section-title">Parent <span>Success Stories</span></h2>
            <p class="section-sub">Read verified feedback from parents of students in Bhopal, Mumbai, and Bangalore.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <p>"My daughter used to spend hours streaming videos in Pune. After joining the SkillNest cohort, she built a complete cyber safety presentation and explained Excel formulas to us. It's a total shift in habits."</p>
              <strong>— Ritu Sharma (Mother of Class 7 Student)</strong>
            </div>
            <div class="why-card">
              <p>"We wanted our son in Durg to learn computers practically, not just memorize text definitions. His Coding Program projects and AI prompts journal are concrete proof of his learning outcomes."</p>
              <strong>— Amit Verma (Father of Class 6 Student)</strong>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'What projects do students complete in the program?',
        a: 'Students complete projects in word processing (formatting a school report), spreadsheets (an automated marksheet), slide design (a cyber safety presentation), visual coding (a Scratch maze game), and AI prompts.'
      },
      {
        q: 'Are beginner students capable of building these projects?',
        a: 'Yes. Our curriculum is tailored for absolute beginners in Class 6–8. Instructors in cities like Raipur and Indore guide students step-by-step from base concepts to complete projects.'
      }
    ],
    faqs: [
      {
        q: 'What is the SkillNest Student Project Gallery?',
        a: 'It is a digital outcomes registry showcasing real-world projects in coding, data, presentations, and design created by school students during our cohorts.'
      },
      {
        q: 'Why does SkillNest emphasize project-based computer learning?',
        a: 'NEP 2020 guidelines emphasize active computational thinking. Building spreadsheets, documents, and games forces students to apply logic rather than memorizing definitions.'
      },
      {
        q: 'Can students share their portfolios with schools?',
        a: 'Yes. Every project file (Excel sheets, Scratch files, PowerPoint decks) belongs to the student and forms a verified portfolio useful for school ICT submissions in Delhi and Mumbai.'
      },
      {
        q: 'How many projects does a student build in the 6-week cohort?',
        a: 'Every student builds at least 6 core projects, ending the cohort with a comprehensive digital competency portfolio.'
      },
      {
        q: 'Are the Scratch games playable online?',
        a: 'Yes, Scratch games are block-based and can be shared and played online through MIT Scratch project links.'
      },
      {
        q: 'Do students learn to format documents properly?',
        a: 'Yes, in the MS Word section, they learn typography rules, line spacing, image anchoring, table structures, and how to build automated tables of contents.'
      },
      {
        q: 'Is safe AI prompting part of the projects?',
        a: 'Yes. Under parental supervision, kids learn to document structured prompt queries, learning safe AI boundaries and critical fact-checking processes.'
      },
      {
        q: 'Do parents receive support in regional cities like Bhopal or Indore?',
        a: 'Yes. SkillNest supports parents nationwide with live weekend sessions, parent hubs, and clear digital project guides.'
      }
    ]
  },
  {
    path: 'projects/coding-and-games/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/projects/coding-and-games/',
    title: 'Scratch Games & Block Coding Projects for Kids | SkillNest',
    description: 'Browse block-based Coding Program projects, interactive logic games, and beginner programming tasks built by Class 6-8 students.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Projects', url: '../index.html' },
      { name: 'Coding & Games', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Coding & Games',
      title: 'Scratch & Logic <span>Coding Projects</span> 🎮',
      subtitle: 'Explore block-based games and interactive programs coded by our middle school cohorts to learn variables, loops, coordinates, and conditionals.',
      stats: [
        { icon: '🧩', label: 'MIT Scratch Block Logic' },
        { icon: '👾', label: 'Interactive Game Mechanics' },
        { icon: '🎯', label: 'Coordinate & Variable Mapping' },
        { icon: '💡', label: 'Computational Logic' }
      ]
    },
    aeo: {
      question: 'What coding projects can kids build with Scratch?',
      answer: 'School students can build interactive Scratch projects including balloon-pop clicker games, automated maze logic puzzles, block-based coordinate animations, mathematical calculators, and simple AI-driven games that teach variables, loops, conditionals, and computational logic patterns.'
    },
    sections: `
      <!-- Coding Showcase -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>MIT Scratch Gallery</div>
            <h2 class="section-title">Coding Outcomes <span>& Game Logic</span></h2>
            <p class="section-sub">Verified programming achievements built by students in Pune, Bhopal, and Raipur.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <div class="why-icon">👾</div>
              <h3>Scratch AI Logic Game</h3>
              <p>An interactive block-coded mini-game built by Class 6-8 cohorts. Teaches fundamental programming structures like variables, conditional branch limits, and loops.</p>
              <div class="project-chip-row" style="margin-top: 10px;">
                <span class="project-chip project-chip-purple">MIT Scratch</span>
                <span class="project-chip project-chip-purple">Week 6</span>
              </div>
            </div>

            <div class="why-card">
              <div class="why-icon">🔑</div>
              <h3>Interactive Maze Solver</h3>
              <p>A game requiring coordinate maps and keyboard event triggers. Students code sprite paths and collision limits to solve logical puzzles.</p>
              <div class="project-chip-row" style="margin-top: 10px;">
                <span class="project-chip project-chip-purple">Scratch Coordinates</span>
                <span class="project-chip project-chip-purple">Week 5</span>
              </div>
            </div>

            <div class="why-card">
              <div class="why-icon">🎈</div>
              <h3>Balloon Pop Clicker Game</h3>
              <p>Teaches scoring variables and animation loops. Spawns items randomly using coordinates, responding to mouse inputs to track high scores.</p>
              <div class="project-chip-row" style="margin-top: 10px;">
                <span class="project-chip project-chip-purple">Game Scripting</span>
                <span class="project-chip project-chip-purple">Week 4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Educational Value -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Pedagogy</div>
            <h2 class="section-title">Why Kids <span>Should Build Coding Projects</span></h2>
            <p class="section-sub">Programming builds rigorous logical capabilities that assist school science and math outcomes.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Problem Deconstruction</h3>
              <p>Coding requires students in Indore and Delhi to break complex goals down into simple steps. This aligns with computational thinking frameworks recommended by NEP 2020.</p>
            </div>
            <div class="why-card">
              <h3>Interactive Math Application</h3>
              <p>Mapping animations in Scratch requires understanding coordinate axes (X and Y), reinforcing math concepts through hands-on game design.</p>
            </div>
            <div class="why-card">
              <h3>Self-Directed Debugging</h3>
              <p>When code fails, students analyze their script to locate logical gaps, building tenacity and critical problem-solving skills.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Can beginners build Coding Program games?',
        a: 'Yes. Scratch uses visual blocks that click together, eliminating syntax errors. This allows beginners in cities like Raipur and Jaipur to focus entirely on learning logic.'
      },
      {
        q: 'Do Scratch projects require paid software?',
        a: 'No. Scratch is a free, web-based platform developed by MIT. Students can access their coding workspaces anytime without subscription fees.'
      }
    ],
    faqs: [
      {
        q: 'What is block coding for kids?',
        a: 'Block coding is an introductory programming method using puzzle-like block interfaces (Scratch) instead of text commands, helping students learn code structures easily.'
      },
      {
        q: 'What is Coding Program?',
        a: 'Developed by MIT, Scratch is the world\'s leading block-based programming language, designed specifically to introduce coding to school children.'
      },
      {
        q: 'Does learning Scratch help with high-school coding?',
        a: 'Yes. Scratch teaches variables, functions, conditions, and loops. Understanding these concepts makes transitioning to text-based languages like Python much easier.'
      },
      {
        q: 'How does coding improve mathematical skills?',
        a: 'Scratch logic relies on coordinates (X, Y axes), positive/negative integer grids, variables, and math operators, reinforcing CBSE math topics.'
      },
      {
        q: 'Are Scratch games safe for middle school students?',
        a: 'Yes. MIT Scratch is a completely moderated, child-safe platform focused entirely on educational creation.'
      },
      {
        q: 'Can kids share their coded games with friends?',
        a: 'Yes. Scratch allows projects to be shared publicly with a single URL, letting students showcase their games to friends in Delhi and Pune.'
      },
      {
        q: 'What are Scratch loops and variables?',
        a: 'Loops repeat actions (e.g., repeating animations), and variables store values (e.g., tracking a game score), forming the basics of all programs.'
      },
      {
        q: 'How does SkillNest support coding in regional cities like Bhopal?',
        a: 'SkillNest provides small live online cohorts, guiding students in Bhopal and Durg to code games under expert guidance.'
      }
    ]
  },
  {
    path: 'projects/student-presentations/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/projects/student-presentations/',
    title: 'Interactive Student PowerPoint Presentations | SkillNest',
    description: 'Explore digital slide decks, PowerPoint school projects, and presentation skill samples designed by Class 6-8 students.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Projects', url: '../index.html' },
      { name: 'Student Presentations', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Presentations',
      title: 'Interactive Slide Decks & <span>PowerPoint Projects</span> 📽️',
      subtitle: 'Discover PowerPoint presentations built by our students, showcasing professional formatting, typography, animations, and public speaking structures.',
      stats: [
        { icon: '📽️', label: 'MS PowerPoint Design' },
        { icon: '🎨', label: 'Canva Design Layouts' },
        { icon: '✨', label: 'Custom Transitions' },
        { icon: '🎤', label: 'Public Speaking Structure' }
      ]
    },
    aeo: {
      question: 'What presentation skills do students learn on SkillNest?',
      answer: 'SkillNest students learn to design professional slide decks using PowerPoint and Canva. They master custom slide masters, content hierarchy, animation timing, transitions, and public speaking techniques by building presentations on topics like cyber safety and space science.'
    },
    sections: `
      <!-- Slide Decks Showcase -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Presentation Gallery</div>
            <h2 class="section-title">Student <span>Slide Projects</span></h2>
            <p class="section-sub">Real PowerPoint slide decks created by Class 6-8 cohorts in Bangalore, Indore, and Raipur.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <div class="why-icon">🛡️</div>
              <h3>Cyber Safety Interactive Presentation</h3>
              <p>A multi-slide PowerPoint deck focusing on safe internet rules. Integrates slide masters, custom layout shapes, and subtle slide transitions.</p>
              <div class="project-chip-row" style="margin-top: 10px;">
                <span class="project-chip project-chip-gold">MS PowerPoint</span>
                <span class="project-chip project-chip-gold">Week 4</span>
              </div>
            </div>

            <div class="why-card">
              <div class="why-icon">🪐</div>
              <h3>Space Exploration Presentation</h3>
              <p>Slide deck utilizing content structures, high-contrast imagery contrast, and custom bulleted layouts to summarize astronomical data.</p>
              <div class="project-chip-row" style="margin-top: 10px;">
                <span class="project-chip project-chip-gold">Canva & PPT</span>
                <span class="project-chip project-chip-gold">Week 3</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Educational Value -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Learning Impact</div>
            <h2 class="section-title">How Presentations <span>Build Public Confidence</span></h2>
            <p class="section-sub">Structuring slides improves writing, while presenting them builds strong public speaking habits.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Visual Communication Rules</h3>
              <p>Students in Mumbai and Pune learn formatting rules: avoiding wall-of-text slides, maintaining typography contrast, and using bullet lists effectively.</p>
            </div>
            <div class="why-card">
              <h3>Academic Project Readiness</h3>
              <p>PowerPoint is essential for middle school science and social projects. Learning slide masters makes CBSE project submissions look extremely professional.</p>
            </div>
            <div class="why-card">
              <h3>Speaking with Structure</h3>
              <p>By learning to align slide bullet points with spoken summaries, children develop strong verbal and presentation habits early on.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Do students build slides on PowerPoint or Canva?',
        a: 'They learn both. They use Microsoft PowerPoint for structure, formatting, and offline presentation logic, and Canva for advanced layouts and design graphics.'
      },
      {
        q: 'Why are slide-design skills important for school?',
        a: 'Class 6-8 curricula regularly require student presentations. Learning slide alignment, hierarchy, and transitions helps kids excel at school projects in Raipur or Hyderabad.'
      }
    ],
    faqs: [
      {
        q: 'What presentation tools do kids learn?',
        a: 'Students master Microsoft PowerPoint and Canva, learning how to design templates, insert media, and apply animations.'
      },
      {
        q: 'What is a PowerPoint Slide Master?',
        a: 'A Slide Master is a template feature in PowerPoint that controls fonts, alignments, and background graphics across all slides, ensuring visual consistency.'
      },
      {
        q: 'How does SkillNest teach visual slide hierarchy?',
        a: 'We teach kids to use large headers for primary topics, brief bullet lists for support points, and relevant icons, avoiding cluttered designs.'
      },
      {
        q: 'Do students learn to present their slides?',
        a: 'Yes. In our live cohorts, students present their slide projects to peers, building public speaking confidence.'
      },
      {
        q: 'Can these presentations be exported to standard PDF format?',
        a: 'Yes, PowerPoint and Canva projects can be exported to standard PDF, making them highly shareable.'
      },
      {
        q: 'How do slide animations differ from transitions?',
        a: 'Transitions control the movement between slides, while animations control how individual objects (text or images) move on a single slide.'
      },
      {
        q: 'Do presentation lessons cover keyboard shortcuts?',
        a: 'Yes. Students learn essential presentation shortcuts (like F5 to start, Esc to end) to handle slide displays smoothly.'
      },
      {
        q: 'Are presentation cohorts available in Bhopal?',
        a: 'Yes. SkillNest cohorts are conducted online with students in Bhopal, Indore, and Raipur attending live sessions.'
      }
    ]
  },
  {
    path: 'projects/ai-projects/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/projects/ai-projects/',
    title: 'Student AI Projects & Prompt Engineering Logs | SkillNest',
    description: 'Browse student AI activities, prompt engineering journals, and ChatGPT research logs created by middle schoolers.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Projects', url: '../index.html' },
      { name: 'AI Projects', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'AI Projects',
      title: 'AI Prompting & <span>Productivity Projects</span> 🤖',
      subtitle: 'Explore journals of student-written AI prompts and research logs demonstrating safe, educational Generative AI collaboration.',
      stats: [
        { icon: '🤖', label: 'Structured Prompt Engineering' },
        { icon: '🛡️', label: 'Safe AI Guidelines' },
        { icon: '✍️', label: 'Research Journals' },
        { icon: '🚀', label: 'Academic Assistance' }
      ]
    },
    aeo: {
      question: 'What AI projects are suitable for middle school students?',
      answer: 'Middle school students can create AI prompt engineering logs, research outlines, creative story-generation threads, and mathematical tutoring logs. These activities teach structured prompt parameters (Role, Task, Context) and critical cross-referencing habits for school research.'
    },
    sections: `
      <!-- AI Logs Showcase -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>AI Prompts Gallery</div>
            <h2 class="section-title">Student <span>Prompt Engineering Logs</span></h2>
            <p class="section-sub">Verified journals demonstrating safe prompting rules and educational research threads.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <div class="why-icon">📝</div>
              <h3>AI Prompting Log</h3>
              <p>A curated journal showing how to write structured queries. Students prompt ChatGPT/Claude to act as tutors for physics or history summaries.</p>
              <div class="project-chip-row" style="margin-top: 10px;">
                <span class="project-chip project-chip-cyan">AI Basics</span>
                <span class="project-chip project-chip-cyan">Week 6</span>
              </div>
            </div>

            <div class="why-card">
              <div class="why-icon">🧠</div>
              <h3>AI Research Study Guide</h3>
              <p>Students use AI prompts to brainstorm study plans and generate custom NCERT science questions, testing themselves under parental guidelines.</p>
              <div class="project-chip-row" style="margin-top: 10px;">
                <span class="project-chip project-chip-cyan">Prompt Templates</span>
                <span class="project-chip project-chip-cyan">Week 5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Educational Safety -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>AI Safety Rules</div>
            <h2 class="section-title">Rules for <span>Ethical Student AI Use</span></h2>
            <p class="section-sub">Guiding children to treat AI chatbots as tutoring assistants rather than homework cheat sheets.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Role-Based Prompting</h3>
              <p>Students in Raipur and Bangalore learn to define AI roles (e.g. "Act as a Class 6 math teacher"). This makes AI responses highly educational and structured.</p>
            </div>
            <div class="why-card">
              <h3>Cross-Referencing Data</h3>
              <p>Students are taught that AI can generate false details (hallucinations). They must verify AI summaries using standard NCERT school textbooks.</p>
            </div>
            <div class="why-card">
              <h3>supervision boundaries</h3>
              <p>We teach safe usage: keeping the family chatbot account in shared rooms in Bhopal or Delhi, and never sharing personal name, school, or phone details in prompts.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Is it safe for kids to write prompts on ChatGPT?',
        a: 'Yes, if done under parental monitoring using safe educational prompt frameworks. SkillNest emphasizes prompts that query definitions and tutoring steps, avoiding private data inputs.'
      },
      {
        q: 'How does prompt engineering help with logical thinking?',
        a: 'Writing a prompt requires stating clear parameters (Role, Context, Constraints). This structures communication and builds computational logic.'
      }
    ],
    faqs: [
      {
        q: 'What is prompt engineering for kids?',
        a: 'It is the skill of writing clear, structured text instructions to help generative AI tools produce useful educational summaries.'
      },
      {
        q: 'What AI tools are introduced to students?',
        a: 'Students learn to use ChatGPT and Claude safely for study summaries, and Canva AI features for slide layouts.'
      },
      {
        q: 'How do students use AI for school studies?',
        a: 'They use AI to explain complex CBSE science terms, create custom practice math quizzes, or build outline outlines for essay drafting.'
      },
      {
        q: 'Do students learn to check AI data for correctness?',
        a: 'Yes. We teach kids to identify AI hallucinations and cross-reference all facts with official CBSE/NCERT books.'
      },
      {
        q: 'What is the role-task prompting structure?',
        a: 'It is a prompting template: setting an AI Role (e.g. Math Tutor), a Task (explain fractions), Context (for a Class 6 student), and Output Format (bullet points).'
      },
      {
        q: 'Are private student accounts created on ChatGPT?',
        a: 'No. We recommend parents set up a single shared family account to monitor prompt histories easily.'
      },
      {
        q: 'Can prompting help students in Bhopal or Indore?',
        a: 'Yes. Middle schoolers learn to leverage AI to summarize chapters, helping them manage school workloads efficiently.'
      },
      {
        q: 'Does SkillNest teach AI programming?',
        a: 'No. We focus on AI literacy: using prompts, understanding AI limitations, safety rules, and digital creation basics.'
      }
    ]
  },
  {
    path: 'projects/certificates/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/projects/certificates/',
    title: 'Student Certificates & Program Achievements | SkillNest',
    description: 'View SkillNest Digital Skills Certificates and program completion achievements earned by Class 6-8 students.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Projects', url: '../index.html' },
      { name: 'Certificates', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Certificates',
      title: 'Student Achievement & <span>Skill Verification</span> 🎓',
      subtitle: 'Verify program completion credentials and official SkillNest certificates recognizing competency in 21st-century digital tools.',
      stats: [
        { icon: '🎓', label: 'Official Course Certification' },
        { icon: '✓', label: 'Verifiable Digital Credentials' },
        { icon: '⭐', label: 'Academic Portfolio Assets' },
        { icon: '🏆', label: 'NEP 2020 Compliance' }
      ]
    },
    aeo: {
      question: 'What certificate do students receive from SkillNest?',
      answer: 'Students who complete the 6-week SkillNest cohort receive an official Digital Skills Certificate. This credential verifies hands-on competency in Microsoft Office (Word, Excel, PowerPoint), Scratch block programming, safe AI prompting, and cyber security fundamentals.'
    },
    sections: `
      <!-- Certificate Details -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Verifiable Credentials</div>
            <h2 class="section-title">Official <span>Digital Skills Certificate</span></h2>
            <p class="section-sub">Verifying student capabilities in computer applications, logic coding, and safety.</p>
          </div>

          <div class="why-grid" style="max-width: 800px; margin: 0 auto;">
            <div class="why-card text-center" style="width: 100%;">
              <div class="why-icon" style="margin: 0 auto 15px;">🎓</div>
              <h3>SkillNest Digital Skills Certificate</h3>
              <p>Issued upon completion of all cohort project submissions. Validates 25+ WPM typing speed, spreadsheet calculations, block-based game logic, document report formatting, and safe search configurations.</p>
              <div class="project-chip-row" style="margin-top: 15px; justify-content: center;">
                <span class="project-chip project-chip-blue">Verifiable PDF</span>
                <span class="project-chip project-chip-blue">NEP 2020 Aligned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Importance of Certification -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Academic Value</div>
            <h2 class="section-title">How Certificates <span>Validate Learning</span></h2>
            <p class="section-sub">A formal credential validates a student\'s digital skills, building academic motivation.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>✓ Verifiable Skill Profile</h3>
              <p>Many schools in cities like Mumbai, Bangalore, and Lucknow require students to submit practical computer reports. Our certificate verifies these skills directly.</p>
            </div>
            <div class="why-card">
              <h3>✓ Academic Portfolio Assets</h3>
              <p>As middle schoolers in Raipur or Bhopal transition to secondary grades, a verifiable certificate forms a core part of their academic portfolio.</p>
            </div>
            <div class="why-card">
              <h3>✓ Boosts Logical Confidence</h3>
              <p>Completing projects and receiving a certificate builds confidence in students, encouraging them to treat technology as a creative builder toolkit.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Do students receive certificates after the demo class?',
        a: 'No. Certificates are only issued to students who complete the full 6-week cohort program and submit all required project exercises.'
      },
      {
        q: 'Is the SkillNest certificate recognized by schools?',
        a: 'Yes, it is widely recognized by parents and school administrations across India as verifiable proof of NEP 2020 digital competency compliance.'
      }
    ],
    faqs: [
      {
        q: 'What criteria must be met to earn the certificate?',
        a: 'Students must complete the 6-week cohort, participate in classes, and submit all 6 required portfolio projects (documents, sheets, coding files, slide decks).'
      },
      {
        q: 'Is there a digital verification system?',
        a: 'Yes. Every certificate is issued in digital PDF format with a unique identification code that can be verified online.'
      },
      {
        q: 'Does the certificate list specific competencies?',
        a: 'Yes. It details specific skills like touch typing, spreadsheet logic, Scratch game creation, document formatting, and cyber safety.'
      },
      {
        q: 'How long does it take to receive the certificate?',
        a: 'Certificates are processed and emailed within 7 working days after final project evaluations.'
      },
      {
        q: 'Do students in Durg or Bhilai receive physical certificates?',
        a: 'Students nationwide receive a high-resolution, print-ready digital certificate, which parents can print locally.'
      },
      {
        q: 'Is there a grading system on the certificate?',
        a: 'No. It is a competency-based certificate validating that the student has successfully completed all required digital projects.'
      },
      {
        q: 'Can the certificate be added to LinkedIn profiles?',
        a: 'Yes. Parents can link the digital PDF certificate to LinkedIn or digital school profiles.'
      },
      {
        q: 'Does the certificate align with NEP 2020?',
        a: 'Yes. The credential directly validates critical digital literacy and computational thinking competencies outlined in NEP 2020.'
      }
    ]
  },
  {
    path: 'projects/excel-projects/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/projects/excel-projects/',
    title: 'Student Excel Projects & Spreadsheet Marksheets | SkillNest',
    description: 'Browse automated Excel marksheets, data tables, formula projects, and charts built by Class 6-8 students.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Projects', url: '../index.html' },
      { name: 'Excel Projects', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Excel Projects',
      title: 'Spreadsheet Calculations & <span>Excel Marksheets</span> 📊',
      subtitle: 'Explore data analysis spreadsheets and automated grids created by students using mathematical formulas and interactive charts.',
      stats: [
        { icon: '📊', label: 'MS Excel Columns' },
        { icon: '➕', label: 'Arithmetic Formulas' },
        { icon: '🎨', label: 'Conditional Formatting' },
        { icon: '📈', label: 'Data Visualisation' }
      ]
    },
    aeo: {
      question: 'What Excel projects can school students build?',
      answer: 'Class 6-8 students build automated marksheets, weekly pocket-money trackers, visual pie charts, and data tables. They practice writing arithmetic functions (SUM, AVERAGE, MIN, MAX), cell styling, sorting parameters, and data visualization configurations.'
    },
    sections: `
      <!-- Excel Gallery -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Excel Gallery</div>
            <h2 class="section-title">Student <span>Spreadsheet Grids</span></h2>
            <p class="section-sub">Real Excel projects built by Class 6-8 cohorts in Raipur, Bhopal, and Bangalore.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <div class="why-icon">📊</div>
              <h3>Automated Excel Marksheet</h3>
              <p>A fully functional spreadsheet utilizing SUM, AVERAGE, and conditional formatting to automatically calculate grades and display math charts.</p>
              <div class="project-chip-row" style="margin-top: 10px;">
                <span class="project-chip project-chip-green">MS Excel</span>
                <span class="project-chip project-chip-green">Week 3</span>
              </div>
            </div>

            <div class="why-card">
              <div class="why-icon">💵</div>
              <h3>Pocket Money Expense Tracker</h3>
              <p>A custom sheet where students track items, input prices, and use formula codes to calculate weekly sums and averages.</p>
              <div class="project-chip-row" style="margin-top: 10px;">
                <span class="project-chip project-chip-green">Formula Grids</span>
                <span class="project-chip project-chip-green">Week 2</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Educational Value -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Math & Data</div>
            <h2 class="section-title">How Spreadsheets <span>Strengthen Mathematics</span></h2>
            <p class="section-sub">Formatting and calculating tables reinforces CBSE math topics through practical tools.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>✓ Formula Logic Application</h3>
              <p>Writing formulas like '=SUM(A1:A10)' teaches kids in Bhopal or Durg structural logic, variables, and math cell definitions.</p>
            </div>
            <div class="why-card">
              <h3>✓ Data Visualisation</h3>
              <p>Converting grids into bar charts or pie graphs helps students understand charts, percentages, and data visually, reinforcing CBSE math topics.</p>
            </div>
            <div class="why-card">
              <h3>✓ Practical Utility</h3>
              <p>Excel is the most demanded digital tool. Learning it in Class 6 makes handling school statistics, charts, and tables incredibly easy.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Is Excel too difficult for Class 6 students?',
        a: 'No. Our curriculum starts with basic formatting: adjusting columns, borders, and colors, before introducing simple, practical math formulas like SUM and AVERAGE.'
      },
      {
        q: 'Do students learn Google Sheets too?',
        a: 'Yes. The interface and formula syntax are identical. Students learn Excel formatting rules, which they can apply directly to Google Sheets.'
      }
    ],
    faqs: [
      {
        q: 'What basic Excel formulas do kids learn?',
        a: 'Students learn basic arithmetic formulas including SUM, AVERAGE, MIN, MAX, and basic percentage calculations.'
      },
      {
        q: 'What is Excel Conditional Formatting?',
        a: 'It is a feature that automatically changes cell styles (e.g. highlighting text in green or red) based on rules, like highlighting failing grades.'
      },
      {
        q: 'How do students build math charts in Excel?',
        a: 'They learn to select data columns and insert bar charts or pie graphs, configuring labels and legends for science projects.'
      },
      {
        q: 'Can Excel projects be completed on Mac computers?',
        a: 'Yes. Excel runs perfectly on Mac, and students can also use Google Sheets in any web browser.'
      },
      {
        q: 'Do kids learn file handling in Excel?',
        a: 'Yes. They learn to save `.xlsx` files inside organized folders, practicing file hygiene from day one.'
      },
      {
        q: 'Does learning Excel help with school homework?',
        a: 'Yes. Middle school science tables, math charts, and geography data calculations become much easier to complete.'
      },
      {
        q: 'How does hand posture affect spreadsheet speed?',
        a: 'Correct home-row keyboarding lets kids enter numeric data and formulas rapidly, reducing homework time.'
      },
      {
        q: 'Are spreadsheet classes available in Indore?',
        a: 'Yes. SkillNest conducts live online classes for students in Indore, Bhopal, and Raipur, coordinating with school schedules.'
      }
    ]
  },
  {
    path: 'projects/portfolio-projects/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/projects/portfolio-projects/',
    title: 'Student Digital Portfolios & Showcase Projects | SkillNest',
    description: 'Explore multi-skill digital student portfolios, professional Word reports, and final showcase work from SkillNest.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Projects', url: '../index.html' },
      { name: 'Portfolio Projects', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Portfolio Projects',
      title: 'Digital Portfolios & <span>Showcase Projects</span> 📁',
      subtitle: 'Explore complete student portfolios combining document layouts, data trackers, slide designs, and custom coding programs into a unified proof-of-learning.',
      stats: [
        { icon: '📁', label: 'Multi-Skill Portfolios' },
        { icon: '📝', label: 'MS Word Document Layouts' },
        { icon: '🎨', label: 'Multimedia Graphics' },
        { icon: '✓', label: 'Verified Proof-of-Learning' }
      ]
    },
    aeo: {
      question: 'Why is a student digital portfolio important?',
      answer: 'A student digital portfolio serves as a visual proof-of-learning hub. By compiling Microsoft Word reports, Excel sheets, PowerPoint designs, Scratch code, and AI prompts, students demonstrate verified technical competencies, logical organization, and career readiness skills to parents and schools.'
    },
    sections: `
      <!-- Portfolios Showcase -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Document & Layout Gallery</div>
            <h2 class="section-title">Student <span>Document Portfolios</span></h2>
            <p class="section-sub">Verified multi-page reports and visual layout projects built by Class 6-8 cohorts in Pune, Bhopal, and Bangalore.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <div class="why-icon">📝</div>
              <h3>Professional Word Report</h3>
              <p>Students format a multi-page school report complete with automated table of contents, custom headers, footers, margins, and embedded imagery.</p>
              <div class="project-chip-row" style="margin-top: 10px;">
                <span class="project-chip project-chip-blue">MS Word</span>
                <span class="project-chip project-chip-blue">Week 2</span>
              </div>
            </div>

            <div class="why-card">
              <div class="why-icon">🎨</div>
              <h3>Digital Poster & Graphic Design</h3>
              <p>Using basic design rules to compile typography, custom shapes, and icons into a digital poster for school topics.</p>
              <div class="project-chip-row" style="margin-top: 10px;">
                <span class="project-chip project-chip-purple">Canva & Design</span>
                <span class="project-chip project-chip-purple">Week 4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Educational Value -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Writing & Design</div>
            <h2 class="section-title">How Digital Portfolios <span>Build Work Ethics</span></h2>
            <p class="section-sub">Compiling work into folders teaches students file management and professional organization habits.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>✓ Professional Formatting Rules</h3>
              <p>Kids in Pune and Bhopal learn style rules: maintaining consistent fonts, margins alignment, spacing guidelines, and header sizing.</p>
            </div>
            <div class="why-card">
              <h3>✓ Digital File Hygiene</h3>
              <p>Students organize project files inside labeled sub-directories rather than cluttering their desktop, practicing operations hygiene.</p>
            </div>
            <div class="why-card">
              <h3>✓ Verified Capability</h3>
              <p>A compiled portfolio provides concrete evidence of tech competency that parents can share with CBSE schools during admissions reviews.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Why should school kids build a digital portfolio?',
        a: 'A portfolio turns screen time into practical creation. It teaches kids in cities like Hyderabad and Delhi how to compile, organize, and present their work professionally.'
      },
      {
        q: 'Do parents receive a copy of the portfolio?',
        a: 'Yes. Upon completion of the cohort, parents receive links and files of all student projects, forming a verifiable proof-of-learning profile.'
      }
    ],
    faqs: [
      {
        q: 'What is a digital portfolio for middle schoolers?',
        a: 'It is a compiled digital folder containing student-designed document layouts, data sheets, coding files, and safety audits.'
      },
      {
        q: 'What document skills do kids learn in MS Word?',
        a: 'They master page margins, paragraph spacing, inserting tables, headers, footers, page numbering, and automated indexes.'
      },
      {
        q: 'Does the portfolio program cover Canva design?',
        a: 'Yes. Students learn basic design rules (contrast, alignment, spacing) to design educational posters and cover pages in Canva.'
      },
      {
        q: 'Can the portfolio be submitted for CBSE school marks?',
        a: 'Yes. Many students submit their SkillNest projects as computer class portfolios, scoring top marks in school.'
      },
      {
        q: 'How does folder structures help with computer basics?',
        a: 'Creating, naming, and organizing folders is a core operational skill. We teach students to save projects in dedicated directories.'
      },
      {
        q: 'What makes a document look professional?',
        a: 'Consistency in typography, correct margins, proper image placements, and clear heading hierarchies.'
      },
      {
        q: 'Do students learn PDF creation?',
        a: 'Yes. They learn to export their document and presentation files into PDF format for school sharing.'
      },
      {
        q: 'Are digital portfolio classes available in Bangalore?',
        a: 'Yes. SkillNest supports students across all major cities with online batches, parent guides, and project templates.'
      }
    ]
  }
];

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
  <div class="res-breadcrumb-bar" style="background:var(--gray-100); border-bottom:1px solid var(--gray-200); padding:10px 0; font-size:0.85rem;">
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

    <!-- Contextual Discovery Hub -->
    <section class="weekend-section" id="discoverMatrix">
      <div class="container">
        <div class="text-center fade-up">
          <div class="section-tag"><span class="dot"></span>Explore SkillNest</div>
          <h2 class="section-title">Related Learning Paths <span>&amp; Resources</span></h2>
          <p class="section-sub">Contextual quick links to other sections of our practical computer skills training framework.</p>
        </div>
        <div class="why-grid">
          <div class="why-card">
            <h3>📈 Learning Paths</h3>
            <p>Explore our roadmaps: <a href="${basePath}learning-paths/beginner-digital-skills/index.html">Beginner Digital Skills</a>, <a href="${basePath}learning-paths/intermediate-digital-skills/index.html">Intermediate Digital Skills</a>, and <a href="${basePath}learning-paths/advanced-digital-skills/index.html">Advanced Digital Skills</a>.</p>
          </div>
          <div class="why-card">
            <h3>👦 Age Groups</h3>
            <p>Tailored courses: <a href="${basePath}age-groups/ages-8-10/index.html">Ages 8–10 (Class 3–5)</a>, <a href="${basePath}age-groups/ages-11-13/index.html">Ages 11–13 (Class 6–8)</a>, and <a href="${basePath}age-groups/ages-14-16/index.html">Ages 14–16 (Class 9–10)</a>.</p>
          </div>
          <div class="why-card">
            <h3>🎓 Programs</h3>
            <p>Skill programs: <a href="${basePath}programs/digital-skills-foundation/index.html">Digital Skills Foundation</a>, <a href="${basePath}programs/ai-skills-for-students/index.html">AI Skills for Students</a>, <a href="${basePath}programs/coding/index.html">Coding Program</a>, <a href="${basePath}programs/excel-for-students/index.html">Excel for Students</a>, and <a href="${basePath}programs/productivity-tools/index.html">Productivity Tools</a>.</p>
          </div>
          <div class="why-card">
            <h3>📚 Practical Courses</h3>
            <p>Hands-on classes: <a href="${basePath}courses/ai-classes-for-students/index.html">AI Classes</a>, <a href="${basePath}courses/coding/index.html">Coding Courses</a>, <a href="${basePath}courses/typing-course/index.html">Typing Course</a>, <a href="${basePath}courses/computer-basics/index.html">Computer Basics</a>, and <a href="${basePath}courses/cyber-safety-course/index.html">Cyber Safety</a>.</p>
          </div>
          <div class="why-card">
            <h3>🔧 Diagnostics &amp; Tools</h3>
            <p>Try our diagnostic utilities: <a href="${basePath}tools/ai-prompt-generator/index.html">AI Prompt Generator</a>, <a href="${basePath}tools/digital-readiness-quiz/index.html">Digital Readiness Quiz</a>, and <a href="${basePath}tools/productivity-calculator/index.html">Productivity Calculator</a>.</p>
          </div>
          <div class="why-card">
            <h3>📑 Useful Resources</h3>
            <p>Free toolkits: <a href="${basePath}resources/ai-tools/index.html">AI Tools Guide</a>, <a href="${basePath}resources/worksheets/index.html">Worksheets</a>, <a href="${basePath}resources/parent-guides/index.html">Parent Guides</a>, <a href="${basePath}resources/digital-skills-checklist/index.html">Digital Skills Checklist</a>, and <a href="${basePath}resources/cbse-resources/index.html">CBSE Resources</a>.</p>
          </div>
          <div class="why-card">
            <h3>🏡 Parent Hub Guides</h3>
            <p>Parenting guides: <a href="${basePath}parent-hub/screen-time-guide/index.html">Screen Time Guide</a>, <a href="${basePath}parent-hub/ai-safety-for-kids/index.html">AI Safety for Kids</a>, <a href="${basePath}parent-hub/digital-parenting/index.html">Digital Parenting</a>, and <a href="${basePath}parent-hub/future-skills-guide/index.html">Future Skills Guide</a>.</p>
          </div>
          <div class="why-card">
            <h3>📝 Parent Blogs &amp; Articles</h3>
            <p>Read opinions: <a href="${basePath}blog/ai-for-kids/index.html">AI for Kids</a>, <a href="${basePath}blog/coding-for-kids/index.html">Coding for Kids</a>, <a href="${basePath}blog/digital-skills/index.html">Digital Skills</a>, and <a href="${basePath}blog/internet-safety/index.html">Internet Safety</a>.</p>
          </div>
          <div class="why-card">
            <h3>📍 Regional Study Cohorts</h3>
            <p>Access our cohorts in <a href="${basePath}cities/bhopal/index.html">Bhopal</a>, <a href="${basePath}cities/indore/index.html">Indore</a>, <a href="${basePath}cities/raipur/index.html">Raipur</a>, <a href="${basePath}cities/delhi/index.html">Delhi</a>, <a href="${basePath}cities/mumbai/index.html">Mumbai</a>, <a href="${basePath}cities/pune/index.html">Pune</a>, <a href="${basePath}cities/bangalore/index.html">Bangalore</a>, and <a href="${basePath}cities/hyderabad/index.html">Hyderabad</a>.</p>
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
          <p class="section-sub">Clear answers to your top queries regarding student outcomes and portfolios.</p>
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

// Main execution block
console.log('=== STARTING PROJECTS PAGE GENERATION ===');
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
console.log('=== PROJECTS PAGE GENERATION COMPLETE ===');
