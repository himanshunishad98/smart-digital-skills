const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../');

// Define courses pages configuration
const pages = [
  {
    path: 'courses/index.html',
    depth: 1,
    url: 'https://skillnest.co.in/courses/',
    title: 'Practical Computer & Coding Courses for Kids | SkillNest',
    description: 'Explore live online computer courses for Class 6-8: Computer Basics, Touch Typing, Coding, AI, Excel, PowerPoint, Internet Safety, and Productivity. Enroll in our project-based cohorts.',
    breadcrumbs: [
      { name: 'Home', url: '../index.html' },
      { name: 'Courses', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'SkillNest Course Hub',
      title: 'Practical <span>Computer & Coding Courses</span> 💻',
      subtitle: 'Shifting Class 6–8 students from passive screen consumption to technology creators. Our live, project-based cohorts build foundational digital competencies for CBSE and future careers.',
      stats: [
        { icon: '💻', label: 'Computer Literacy' },
        { icon: '🎮', label: 'Scratch Logic' },
        { icon: '📊', label: 'MS Office & Data' },
        { icon: '🛡️', label: 'Cyber Safety' }
      ]
    },
    aeo: {
      question: 'What computer courses does SkillNest offer for school kids?',
      answer: 'SkillNest offers a structured curriculum of 8 practical computer and coding courses for school kids, including Computer Basics, Touch Typing, Coding (Scratch game development), AI Classes, Excel Course, PowerPoint Presentation Course, Internet Safety, and Productivity Tools Course, all designed specifically for middle school students.'
    },
    sections: `
      <!-- Featured Courses Categories -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Course Catalog</div>
            <h2 class="section-title">Explore Our <span>Active Cohorts</span></h2>
            <p class="section-sub">Select a course to view details, curriculum highlights, projects built, and enrollment options.</p>
          </div>

          <div class="why-grid">
            <div class="why-card fade-up">
              <div class="why-icon">💻</div>
              <h3>Computer Basics</h3>
              <p>Master computer fundamentals, file systems, shortcuts, and core operations. Perfect starting point for students in Bhopal and Raipur.</p>
              <a class="btn-primary" href="computer-basics/index.html">View Syllabus →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">⌨️</div>
              <h3>Typing Course</h3>
              <p>Learn blind touch typing to improve typing speed and accuracy. Essential physical productivity skill for students in Indore and Delhi.</p>
              <a class="btn-primary" href="typing-course/index.html">View Syllabus →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">🎮</div>
              <h3>Coding Course</h3>
              <p>Develop logical thinking and computational mechanics through Scratch block-coding and interactive game creation.</p>
              <a class="btn-primary" href="coding/index.html">View Syllabus →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">🤖</div>
              <h3>AI Classes for Kids</h3>
              <p>Explore machine learning models, safe generative prompting, AI art, and future technologies under guided parameters.</p>
              <a class="btn-primary" href="ai-classes-for-kids/index.html">View Syllabus →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">📊</div>
              <h3>Excel Course</h3>
              <p>Create spreadsheets, build formulas, organize data grids, and design charts. High academic value for math and science projects.</p>
              <a class="btn-primary" href="excel-course/index.html">View Syllabus →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">📽️</div>
              <h3>PowerPoint Course</h3>
              <p>Design slide masters, visual outlines, custom transitions, and interactive slide presentations for school project submissions.</p>
              <a class="btn-primary" href="powerpoint-course/index.html">View Syllabus →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">🛡️</div>
              <h3>Internet Safety Course</h3>
              <p>Understand cyber hygiene, recognize phishing, implement password safety, and adopt secure browsing behaviors.</p>
              <a class="btn-primary" href="internet-safety-course/index.html">View Syllabus →</a>
            </div>

            <div class="why-card fade-up">
              <div class="why-icon">🚀</div>
              <h3>Productivity Tools</h3>
              <p>Integrate modern digital office applications, file management systems, and text formatting tools for academic efficiency.</p>
              <a class="btn-primary" href="productivity-tools-course/index.html">View Syllabus →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Learning Outcomes -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Pedagogy</div>
            <h2 class="section-title">The SkillNest <span>Learning Outcomes</span></h2>
            <p class="section-sub">We align our classes with the NEP 2020 framework to build computational thinking rather than rote theory.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>✓ Structural Logic & Math</h3>
              <p>Coding Program variables and Excel mathematical grids strengthen school science and geometry performance for students in Bangalore and Hyderabad.</p>
            </div>
            <div class="why-card">
              <h3>✓ Active Creators</h3>
              <p>Instead of watching videos, kids in Bhopal and Mumbai design active games, write formatting scripts, and analyze datasets.</p>
            </div>
            <div class="why-card">
              <h3>✓ Academic Advantage</h3>
              <p>Schools in Delhi and Pune require digital project files. Students with Excel and slide skills present their portfolios confidently.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Success Stories -->
      <section class="before-after-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Testimonials</div>
            <h2 class="section-title">Verified Parent <span>Success Stories</span></h2>
            <p class="section-sub">Read reviews from families who transformed their child's screen time habits.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <p>"My child in Pune used to stream passive videos. After the SkillNest Excel and slide courses, he automated his class study schedule and formats school assignments with high layout quality."</p>
              <strong>— Mrs. Joshi (Mother of Class 8 Student)</strong>
            </div>
            <div class="why-card">
              <p>"Highly recommend the Coding Program and cyber safety classes. Instructors in Indore and Raipur teach with direct practical feedback, and our daughter built playable coordinate maze games."</p>
              <strong>— Mr. Agarwal (Father of Class 6 Student)</strong>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Which computer course should my child start with?',
        a: 'We recommend starting with Computer Basics or touch typing if your child has minimal screen-builder experience. For students who have basic device familiarity, Coding Program or AI classes are excellent entry pathways.'
      },
      {
        q: 'Are these courses suitable for CBSE school syllabus?',
        a: 'Yes. The topics align directly with the computer application goals, computational thinking targets, and digital safety suggestions in the updated CBSE curriculum and NEP 2020 national education guidelines.'
      }
    ],
    faqs: [
      {
        q: 'What is the format of SkillNest courses?',
        a: 'SkillNest courses are conducted as 100% live, interactive online classes with small batch sizes of 5–10 students, ensuring personalized feedback and hands-on practice.'
      },
      {
        q: 'How long are the courses?',
        a: 'Each core cohort runs for 6 weeks, with weekend (Saturday and Sunday) sessions designed to fit around school workloads.'
      },
      {
        q: 'What age groups are these courses designed for?',
        a: 'The curriculum is built for middle school students, primarily Class 6 to 8 (ages 10–14 years), with concepts tailored to their academic levels.'
      },
      {
        q: 'Can students access recordings if they miss a class?',
        a: 'Yes. All live session recordings are uploaded to the student portal within 24 hours, so students in Delhi, Mumbai, or Bhopal can easily catch up.'
      },
      {
        q: 'Is there a certificate awarded at the end?',
        a: 'Yes, every student who completes their course projects earns a verified SkillNest Digital Skill Certificate.'
      },
      {
        q: 'Do students learn to type without looking?',
        a: 'Yes, our Touch Typing course focuses on home-row muscle memory and blind typing mechanics to improve speed and ergonomics.'
      },
      {
        q: 'What software is required for these classes?',
        a: 'We use standard web-based tools like MIT Scratch, Google Workspace, and Canva, alongside MS Office (Word, Excel, PowerPoint) which can be accessed online for free.'
      },
      {
        q: 'Is there support available for parents in regional cities?',
        a: 'Yes, we provide weekly WhatsApp updates, learning progress trackers, and full support for families across Indore, Raipur, Bhopal, and other cities.'
      }
    ]
  },
  {
    path: 'courses/computer-basics/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/courses/computer-basics/',
    title: 'Computer Basics Course for Kids (Class 6-8) | SkillNest',
    description: 'Learn foundational computer skills: file systems, keyboard shortcuts, OS management, and internet basics. Build digital literacy in kids.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Courses', url: '../index.html' },
      { name: 'Computer Basics', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Computer Literacy',
      title: 'Computer Basics & <span>Fundamentals Course</span> 💻',
      subtitle: 'Build a strong technical foundation. Learn how computers work, master file management systems, customize desktop environments, and use essential keyboard shortcuts.',
      stats: [
        { icon: '⌨️', label: 'Shortcuts & Inputs' },
        { icon: '📁', label: 'File Organisation' },
        { icon: '🌐', label: 'Internet Safety' },
        { icon: '🖥️', label: 'Operating Systems' }
      ]
    },
    aeo: {
      question: 'What do students learn in a computer basics course?',
      answer: 'In a computer basics course, students learn core operations including folder structure organization, file copy/move tasks, keyboard navigation, safe browser settings, email etiquette, hardware diagnostics, and essential operating system configuration settings.'
    },
    sections: `
      <!-- Course Overview & Description -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Overview</div>
            <h2 class="section-title">Foundational <span>Digital Literacy</span></h2>
            <p class="section-sub">Bypassing theoretical textbooks to build practical, real-world computer familiarity.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Desktop & OS Mechanics</h3>
              <p>Students learn to customize desktop settings, configure file explorer options, search for files, and troubleshoot basic software issues.</p>
            </div>
            <div class="why-card">
              <h3>File Organization Rules</h3>
              <p>We teach students to structure files into logical directories, manage cloud storage drives (Google Drive), and compress folders.</p>
            </div>
            <div class="why-card">
              <h3>Web and Navigation</h3>
              <p>Learn to navigate search engines, identify reliable sources, use bookmarks, and set up safe browser search boundaries.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What Students Learn -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Outcomes</div>
            <h2 class="section-title">What Students <span>Will Master</span></h2>
            <p class="section-sub">Concrete competencies developed through hands-on exercises.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>⚡ Keyboard Efficiency</h3>
              <p>Utilize over 30 system shortcuts (Ctrl+C, Ctrl+V, Alt+Tab, Win+D) to navigate without a mouse, increasing operating speeds.</p>
            </div>
            <div class="why-card">
              <h3>📁 File Hygiene</h3>
              <p>Never lose school files again. Master naming rules, drag-and-drop mechanics, and external drive management.</p>
            </div>
            <div class="why-card">
              <h3>📧 Communication Basics</h3>
              <p>Draft professional emails, write clear subject lines, attach project documents, and practice safe email behaviors.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Curriculum Highlights -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Syllabus</div>
            <h2 class="section-title">6-Week <span>Curriculum Pathway</span></h2>
            <p class="section-sub">A structured, cumulative learning journey designed for absolute beginners.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Week 1: Hardware & Inputs</h3>
              <p>Identifying system components, peripheral setups, mouse precision, and initial keyboard layout familiarity.</p>
            </div>
            <div class="why-card">
              <h3>Week 2: OS Navigation</h3>
              <p>Exploring file explorers, setting taskbars, configuring desktop environments, and executing search patterns.</p>
            </div>
            <div class="why-card">
              <h3>Week 3: File System Architecture</h3>
              <p>Creating directories, nesting folders, sorting file formats, compressing files, and using USB storage drives.</p>
            </div>
            <div class="why-card">
              <h3>Week 4: Internet Browser Basics</h3>
              <p>Using web links, search engine logic, managing multiple tabs, setting privacy settings, and utilizing bookmarks.</p>
            </div>
            <div class="why-card">
              <h3>Week 5: Digital Assets & Cloud</h3>
              <p>Uploading files to Google Drive, downloading attachments safely, sharing directories, and organizing digital assets.</p>
            </div>
            <div class="why-card">
              <h3>Week 6: Basic System Troubleshooting</h3>
              <p>Handling frozen screens, checking storage space, identifying fake software warnings, and cleaning temporary cache files.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Project Outcomes & Benefits -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Project Work</div>
            <h2 class="section-title">Practical <span>Portfolio Projects</span></h2>
            <p class="section-sub">Instead of exams, students demonstrate learning through physical file outputs.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>📁 Student Computer Workspace Folder</h3>
              <p>Students build a structured local file explorer index organizing all term school assignments into labeled directories with consistent name codes.</p>
            </div>
            <div class="why-card">
              <h3>📧 The Perfect Email Project</h3>
              <p>Drafting and sending a multi-attachment, styled email sharing a compressed project zip file to the instructor with correct text salutations.</p>
            </div>
            <div class="why-card">
              <h3>✓ Parent Benefits</h3>
              <p>Parents in Bhopal and Indore report kids becoming self-sufficient in downloading CBSE worksheets, organizing school resources, and managing their devices without adult support.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GEO Section -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>National Footprint</div>
            <h2 class="section-title">Empowering Students in <span>Bhopal, Indore, and Raipur</span></h2>
            <p class="section-sub">SkillNest brings practical computer fundamentals to families across India's top academic centers.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Central India Focus</h3>
              <p>Students from Bhopal, Indore, and Raipur attend our weekend sessions to bridge the gap in their school ICT labs, practicing active digital literacy on their home setups.</p>
            </div>
            <div class="why-card">
              <h3>Metro Case Studies</h3>
              <p>Parents in Delhi and Mumbai appreciate the shift in device behavior from gaming to file management, helping their children format science presentations and research reports.</p>
            </div>
            <div class="why-card">
              <h3>Tech Literacy Nodes</h3>
              <p>Our cohorts connect learners in Pune, Bangalore, and Hyderabad, building a collaborative workspace where students share project zip files and email setups.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Why should kids learn computer basics in Class 6?',
        a: 'Class 6 is when school project demands increase. Learning keyboard shortcuts, folder paths, and file management early saves students hours of frustration and prevents loss of academic assignments.'
      },
      {
        q: 'Is this course suitable for students with zero experience?',
        a: 'Yes, this course is designed for beginners. We start with system components and mouse controls, building up step-by-step to cloud file sharing and troubleshooting.'
      }
    ],
    faqs: [
      {
        q: 'What is the computer basics course for kids?',
        a: 'It is a 6-week online cohort teaching Class 6-8 students how to use files, folders, shortcuts, operating systems, and browsers effectively.'
      },
      {
        q: 'Do students learn to type in this class?',
        a: 'Yes, basic keyboard layout and key placements are covered, though students seeking advanced typing speed should join the dedicated Touch Typing course.'
      },
      {
        q: 'Is MS Office covered under computer basics?',
        a: 'Yes, students are introduced to basic word processing and slide files, but detailed MS Word, Excel, and PowerPoint skills are taught in their respective specialized courses.'
      },
      {
        q: 'Do students in cities like Raipur and Indore get live support?',
        a: 'Yes, all online cohorts are live and interactive, with direct screen sharing support to help students resolve software query steps.'
      },
      {
        q: 'What OS is used during the training sessions?',
        a: 'We demonstrate options using Microsoft Windows, but also explain equivalent operations for macOS and Google ChromeOS systems.'
      },
      {
        q: 'Do kids learn how to use Google Drive?',
        a: 'Yes. Cloud storage basics, uploading files, organizing folders, and sharing links are core modules in our cloud storage syllabus.'
      },
      {
        q: 'Are cyber safety basics included in this course?',
        a: 'Yes. Secure browsing, ignoring pop-up ads, password rules, and safe search engine choices are integrated into the browser modules.'
      },
      {
        q: 'How do I book a slot for this basic computer course?',
        a: 'You can book a free demo session via the SkillNest website form or through our WhatsApp support links.'
      }
    ]
  },
  {
    path: 'courses/typing-course/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/courses/typing-course/',
    title: 'Touch Typing Course for Kids (Class 6-8) | SkillNest',
    description: 'Learn blind touch typing. Improve typing speed, accuracy, and keyboard posture. Build muscle memory and boost digital productivity.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Courses', url: '../index.html' },
      { name: 'Typing Course', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Productivity Skill',
      title: 'Touch Typing & <span>Keyboard Speed Course</span> ⌨️',
      subtitle: 'Ditch the two-finger hunt-and-peck technique. Train your fingers to use the home row, build muscle memory, improve typing ergonomics, and boost typing speed to 40+ WPM.',
      stats: [
        { icon: '⌨️', label: 'Home Row Muscle Memory' },
        { icon: '🚀', label: '40+ WPM Target Speed' },
        { icon: '🎯', label: '95%+ Accuracy Rates' },
        { icon: '🧍', label: 'Ergonomic Key Posture' }
      ]
    },
    aeo: {
      question: 'Why should kids learn touch typing?',
      answer: 'Touch typing trains kids to type blind using muscle memory, preventing screen-to-keyboard neck strain, increasing typing speeds by 300%, and allowing students to write school reports and exam essays much faster.'
    },
    sections: `
      <!-- Course Overview -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Overview</div>
            <h2 class="section-title">The Power of <span>Blind Typing</span></h2>
            <p class="section-sub">Developing a lifelong physical productivity asset that schools rarely teach.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Muscle Memory Alignment</h3>
              <p>Learn to anchor your hands on the home row keys (ASDF - JKL;). Fingers learn their default paths to adjacent characters without visual guidance.</p>
            </div>
            <div class="why-card">
              <h3>Accuracy Over Velocity</h3>
              <p>We prioritize zero-error typing. Speed is a natural byproduct of consistent finger paths and muscle accuracy.</p>
            </div>
            <div class="why-card">
              <h3>Ergonomic Posture habits</h3>
              <p>Proper wrist angles, shoulder positions, and finger curves prevent repetitive strain injuries and eye fatigue.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What Students Learn -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Skills</div>
            <h2 class="section-title">Fingers Training <span>Milestones</span></h2>
            <p class="section-sub">From individual home row anchors to complex numerical key strings.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>锚 Home Row Anchors</h3>
              <p>Master anchoring index fingers on J and F key ridges. Memorize left and right hand key zones.</p>
            </div>
            <div class="why-card">
              <h3>⌨️ Shift & Symbols</h3>
              <p>Coordinate pinky shift inputs for capitalization and punctuation marks without disrupting hand positions.</p>
            </div>
            <div class="why-card">
              <h3>⚡ Speed Practice</h3>
              <p>Practice daily drills designed to eliminate cognitive pauses between visual letters and keyboard strikes.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Curriculum Highlights -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Syllabus</div>
            <h2 class="section-title">6-Week <span>Typing Roadmap</span></h2>
            <p class="section-sub">Syllabus designed specifically for students to practice typing safely at home.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Week 1: The Home Row</h3>
              <p>Finger mapping on ASDF and JKL; keys. Memorizing home anchors, thumb space bar habits, and hand postures.</p>
            </div>
            <div class="why-card">
              <h3>Week 2: The Top Row</h3>
              <p>Extending fingers to QWERTYUIOP keys and returning immediately to default home anchors without looking down.</p>
            </div>
            <div class="why-card">
              <h3>Week 3: The Bottom Row</h3>
              <p>Mapping ZXCVBNM keys. Coordinating ring finger and pinky movements on lower key sectors.</p>
            </div>
            <div class="why-card">
              <h3>Week 4: Capitalization & Punctuation</h3>
              <p>Using opposite-hand Shift combinations, mastering period, comma, question mark, and apostrophe finger paths.</p>
            </div>
            <div class="why-card">
              <h3>Week 5: Numbers & Common Symbols</h3>
              <p>Extending top row reach to numeric symbols (1-0), parenthesis, and common mathematical characters.</p>
            </div>
            <div class="why-card">
              <h3>Week 6: Endurance & Accuracy Drills</h3>
              <p>Sustained typing tests writing full paragraphs, targeting a baseline of 40 WPM with 95% accuracy rates.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects & Outcomes -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Proof of Learning</div>
            <h2 class="section-title">Verified Student <span>Outcomes</span></h2>
            <p class="section-sub">Measurable typing milestones tracked under live evaluation.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>📈 40 WPM Typing Certificate</h3>
              <p>Students pass a live 3-minute typing benchmark test, proving their speed and accuracy level on unseen text content.</p>
            </div>
            <div class="why-card">
              <h3>⚡ The Speed Run Project</h3>
              <p>Building a custom student typing log recording daily accuracy improvements and heat-maps of troublesome keys.</p>
            </div>
            <div class="why-card">
              <h3>✓ Parent Benefits</h3>
              <p>Parents in Delhi and Raipur observe kids completing school reports without typing stress, preventing late submissions.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GEO Section -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Local Impact</div>
            <h2 class="section-title">Typing Skills in <span>Bhopal, Indore, and Raipur</span></h2>
            <p class="section-sub">Building physical typing literacy across students from central cities to metro clusters.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Central Cohorts</h3>
              <p>Students from Bhopal and Indore join our typing cohorts to train their fingers early, giving them a speed advantage for high school exams.</p>
            </div>
            <div class="why-card">
              <h3>Regional Success</h3>
              <p>Our students in Raipur and Delhi practice typing drills regularly, tracking speeds that rival high schoolers within 6 weeks.</p>
            </div>
            <div class="why-card">
              <h3>National Collaborations</h3>
              <p>Weekly typing tournaments connect students in Pune, Mumbai, Bangalore, and Hyderabad to compete in live speed runs.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Why should kids learn typing instead of writing by hand?',
        a: 'Typing is the primary interface of digital study. Learning to touch type early ensures kids can transcribe essays, write code, and input spreadsheet values rapidly as they enter high school.'
      },
      {
        q: 'Can Class 6 kids achieve 40 WPM in 6 weeks?',
        a: 'Yes. With just 15 minutes of structured daily practice following our correct finger-mapping guidelines, most students reach 35 to 45 WPM easily.'
      }
    ],
    faqs: [
      {
        q: 'What is touch typing for kids?',
        a: 'Touch typing is typing using muscle memory without looking at the keyboard. Our course trains kids to place their hands on the home row keys.'
      },
      {
        q: 'Does my child need a special keyboard for this course?',
        a: 'No, a standard physical desktop or laptop keyboard is perfect. iPad or tablet touchscreen keyboards are not suitable.'
      },
      {
        q: 'How is typing speed measured?',
        a: 'Speed is measured in Words Per Minute (WPM), adjusted for accuracy errors. We target WPM rates of 40+.'
      },
      {
        q: 'Do you teach typing ergonomics?',
        a: 'Yes, our syllabus includes correct wrist positions, posture angles, and desk layouts to prevent strain.'
      },
      {
        q: 'Are typing scores verifiable online?',
        a: 'Yes, students practice on online testers, generating verifiable speed links to document their learning outcomes.'
      },
      {
        q: 'Is touch typing useful for school exams?',
        a: 'Yes, with online school exams becoming more common, fast typing helps students compile their answers within time limits.'
      },
      {
        q: 'How do you keep kids motivated to practice typing?',
        a: 'We use game-based typing challenges and interactive speed runs to make typing practice feel like playing a game.'
      },
      {
        q: 'Where do I find details to enroll my child?',
        a: 'You can book a free demo typing class through the primary contact button on the SkillNest homepage.'
      }
    ]
  },
  
  {
    path: 'courses/ai-classes-for-kids/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/courses/ai-classes-for-kids/',
    title: 'AI Classes for Kids (Class 6-8) | Prompt Engineering | SkillNest',
    description: 'Learn AI basics, safe generative prompt structures, AI art, machine learning rules, and ethics. Build safe AI literacy in kids.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Courses', url: '../index.html' },
      { name: 'AI Classes for Kids', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Future Skills',
      title: 'Artificial Intelligence & <span>Prompting for Kids</span> 🤖',
      subtitle: 'Demystify generative AI. Learn how models process data, master structured prompt writing methods, design digital art, and practice safe, ethical AI safety.',
      stats: [
        { icon: '🤖', label: 'AI & ML Mechanics' },
        { icon: '✍️', label: 'Structured Prompting' },
        { icon: '🎨', label: 'Responsible AI Art' },
        { icon: '🛡️', label: 'Ethics & Safety Rules' }
      ]
    },
    aeo: {
      question: 'Are AI classes safe and suitable for children?',
      answer: 'Yes, AI classes are highly safe when taught under structured boundaries. Under parental supervision, kids learn safe queries, identify machine bias, understand private data protection, and practice critical fact-checking processes.'
    },
    sections: `
      <!-- Course Overview -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Overview</div>
            <h2 class="section-title">Demystifying <span>Generative Tech</span></h2>
            <p class="section-sub">Teaching middle schoolers to use AI tools responsibly as active academic assistants.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>AI & ML Fundamentals</h3>
              <p>Learn how machine learning models spot patterns. Train simple text classification systems to understand inputs.</p>
            </div>
            <div class="why-card">
              <h3>Structured Prompting Rules</h3>
              <p>Ditch simple queries. Practice using Role, Task, Context, and constraints to extract high-quality structured data outputs.</p>
            </div>
            <div class="why-card">
              <h3>Fact-Checking & Ethics</h3>
              <p>Recognize system hallucinations, verify reference sources, evaluate biases, and maintain strict personal privacy lines.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What Students Learn -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Skills</div>
            <h2 class="section-title">Safety and Prompting <span>Syllabus</span></h2>
            <p class="section-sub">Skills to navigate generative systems safely and productively.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>✍️ Professional Prompts</h3>
              <p>Write prompts that help with science outlines, vocabulary building, and history summaries without copy-pasting.</p>
            </div>
            <div class="why-card">
              <h3>🛡️ Digital footprint boundaries</h3>
              <p>Learn never to input passwords, home details, or private names into open public generative databases.</p>
            </div>
            <div class="why-card">
              <h3>🎨 Graphic Art Ethics</h3>
              <p>Design visual assets responsibly, understanding creator copyright values and graphic output tools.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Curriculum Highlights -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Syllabus</div>
            <h2 class="section-title">6-Week <span>AI Syllabus</span></h2>
            <p class="section-sub">A safe, child-friendly progression through generative and data models.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Week 1: AI Pattern Basics</h3>
              <p>Introduction to classification systems. How machines spot patterns, predict inputs, and recognize objects.</p>
            </div>
            <div class="why-card">
              <h3>Week 2: Prompting Foundations</h3>
              <p>Drafting structured prompts. Learning system parameters, context styling, and constraints rules.</p>
            </div>
            <div class="why-card">
              <h3>Week 3: Graphic Art Generation</h3>
              <p>Creating visual slides and graphics safely, understanding copyright limits, and formatting graphic layouts.</p>
            </div>
            <div class="why-card">
              <h3>Week 4: Ethical AI & Hallucinations</h3>
              <p>Identifying logic errors, cross-referencing research facts, and analyzing algorithmic biases.</p>
            </div>
            <div class="why-card">
              <h3>Week 5: AI for School Work</h3>
              <p>Organizing school study notes, building slide skeletons, practicing quiz queries, and compiling report outlines.</p>
            </div>
            <div class="why-card">
              <h3>Week 6: Prompt Engineering Portfolio</h3>
              <p>Compiling a personal prompt log notebook demonstrating verified outputs for evaluation and presentation.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects & Outcomes -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Projects</div>
            <h2 class="section-title">Verified Student <span>AI Portfolios</span></h2>
            <p class="section-sub">Students demonstrate safety compliance and prompt execution in practical logs.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>📝 The Student Prompt Engineering Log</h3>
              <p>A compilation document detailing structured prompts, comparison output data, and fact-check reports for school project files.</p>
            </div>
            <div class="why-card">
              <h3>🤖 Trained Machine Classifier Model</h3>
              <p>Building a custom block classification model that reads camera visuals and sorts objects, showing basic ML mechanics.</p>
            </div>
            <div class="why-card">
              <h3>✓ Parent Benefits</h3>
              <p>Parents in Bangalore and Bhopal report kids using AI as a critical tutor tool rather than a quick homework shortcut, protecting academic integrity.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GEO Section -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Regional Cohorts</div>
            <h2 class="section-title">AI Literacy in <span>Bhopal, Indore, and Raipur</span></h2>
            <p class="section-sub">Training the next generation of safe tech creators across major regional nodes.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Central Literacy Nodes</h3>
              <p>Students from Bhopal and Indore learn the boundaries of AI, practicing structured prompts to outline school tasks.</p>
            </div>
            <div class="why-card">
              <h3>Academic Integrity</h3>
              <p>Our students in Raipur and Delhi verify all AI outputs, cross-referencing points with official NCERT textbooks to maintain accuracy.</p>
            </div>
            <div class="why-card">
              <h3>Collaborative Coding</h3>
              <p>Weekly prompts workshops connect students in Pune, Mumbai, Bangalore, and Hyderabad to discuss prompt constraints safely.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Is generative AI safe for Class 7 students?',
        a: 'Yes. When taught in a structured format with clear privacy rules, kids learn to treat AI as a research tool rather than an input database for private information.'
      },
      {
        q: 'What is prompt engineering for kids?',
        a: 'Prompt engineering is writing specific, structured inputs to extract high-quality information from AI systems. It trains logical writing and reasoning.'
      }
    ],
    faqs: [
      {
        q: 'What are AI classes for kids?',
        a: 'It is a 6-week online cohort teaching Class 6-8 kids the mechanics, ethics, safe prompting, and applications of AI systems.'
      },
      {
        q: 'Do kids write prompts in this class?',
        a: 'Yes, they practice structured prompt structures using context and output parameters for study help.'
      },
      {
        q: 'Are the AI tools used free?',
        a: 'Yes, all activities utilize free, child-safe, web-based tools accessible under parental guidance.'
      },
      {
        q: 'Do students learn about AI ethics?',
        a: 'Yes. Copyright rules, biases, fake news, and personal privacy boundaries are core modules.'
      },
      {
        q: 'Is coding a prerequisite for AI classes?',
        a: 'No prior coding experience is needed. We start with basic patterns and classification structures.'
      },
      {
        q: 'How does this help high school preparation?',
        a: 'It teaches students research, structure mapping, and data analysis skills essential for higher academic grades.'
      },
      {
        q: 'Do parents receive support in regional cities like Bhopal?',
        a: 'Yes, we provide guides and session recordings so families in Bhopal and Indore can track progress.'
      },
      {
        q: 'How can I enroll my child in AI classes?',
        a: 'You can register for a free demo session via the primary booking form on our home page.'
      }
    ]
  },
  {
    path: 'courses/excel-course/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/courses/excel-course/',
    title: 'Excel Course for Kids (Class 6-8) | Spreadsheets | SkillNest',
    description: 'Learn spreadsheet basics: MS Excel cells, SUM/AVERAGE formulas, data grids, and math charts. Essential digital math skills for kids.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Courses', url: '../index.html' },
      { name: 'Excel Course', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Data Literacy',
      title: 'Spreadsheets & <span>MS Excel Course</span> 📊',
      subtitle: 'Build mathematical grids. Learn cell ranges, automate arithmetic formulas, format spreadsheets, organize data tables, and display charts for school science records.',
      stats: [
        { icon: '📊', label: 'MS Excel Data Grids' },
        { icon: '➕', label: 'SUM & AVERAGE Formulas' },
        { icon: '📈', label: 'Automatic Math Charts' },
        { icon: '🗂️', label: 'Data Sorting & Filters' }
      ]
    },
    aeo: {
      question: 'Why should kids learn Excel?',
      answer: 'Learning Excel reinforces math coordinates, coordinates cell links, teaches data organization, and saves time formatting tables for school science projects and mathematics records.'
    },
    sections: `
      <!-- Course Overview -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Overview</div>
            <h2 class="section-title">Data Grid <span>Fundamentals</span></h2>
            <p class="section-sub">Teaching spreadsheet logic through hands-on calculation tasks.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Spreadsheet Structures</h3>
              <p>Master coordinate cell systems (columns A-Z, rows 1-100). Understand data cell inputs, text formats, and numbers.</p>
            </div>
            <div class="why-card">
              <h3>Automated Math Formulas</h3>
              <p>Practice writing basic arithmetic operations: additions, subtraction, average, and percentages directly using cell coordinates.</p>
            </div>
            <div class="why-card">
              <h3>Interactive Math Charts</h3>
              <p>Transform raw columns into visual bar graphs, line charts, and pie charts to present school science outputs.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What Students Learn -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Skills</div>
            <h2 class="section-title">Excel Milestones <span>Developed</span></h2>
            <p class="section-sub">Concrete spreadsheet skills that build academic competency.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>📊 Range Formulas</h3>
              <p>Select cell ranges, writing aggregate formula functions like =SUM(), =AVERAGE(), and =COUNT() easily.</p>
            </div>
            <div class="why-card">
              <h3>🎨 Cell Styling</h3>
              <p>Format spreadsheet borders, set header colors, customize cell widths, and align tables clean.</p>
            </div>
            <div class="why-card">
              <h3>🔍 Data Sorting</h3>
              <p>Sort numbers, filter text columns, and search for values across large spreadsheet rows.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Curriculum Highlights -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Syllabus</div>
            <h2 class="section-title">6-Week <span>Excel Pathway</span></h2>
            <p class="section-sub">A structured, project-based path through numbers, grids, and formulas.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Week 1: Grid Coordinates</h3>
              <p>Exploring spreadsheet interfaces: rows, columns, coordinates, selecting cell ranges, and entering raw data values.</p>
            </div>
            <div class="why-card">
              <h3>Week 2: Arithmetic Functions</h3>
              <p>Writing basic formulas: additions, subtraction, multiplication, division using cell coordinates (=A1+B1).</p>
            </div>
            <div class="why-card">
              <h3>Week 3: Auto-Sum & Aggregate</h3>
              <p>Using built-in spreadsheet functions: =SUM(), =AVERAGE(), and dragging autofill cells to repeat calculations.</p>
            </div>
            <div class="why-card">
              <h3>Week 4: Table Formatting</h3>
              <p>Styling spreadsheet cells: setting custom borders, header colors, number formats, and column widths.</p>
            </div>
            <div class="why-card">
              <h3>Week 5: Chart Engineering</h3>
              <p>Selecting data fields, inserting bar graphs, configuring axes labels, and customizing column chart colors.</p>
            </div>
            <div class="why-card">
              <h3>Week 6: Sorted Sheets Showcase</h3>
              <p>Sorting records alphabetically, filtering scores, and finalizing a student gradesheet project file.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects & Outcomes -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Projects</div>
            <h2 class="section-title">Excel <span>Portfolio Projects</span></h2>
            <p class="section-sub">Verifiable spreadsheet projects built by students.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>📊 Automated Student Marksheet</h3>
              <p>A spreadsheet table holding student names and scores, utilizing automatic formulas to compile totals, percentages, and averages.</p>
            </div>
            <div class="why-card">
              <h3>🛒 Household Budget Planner</h3>
              <p>Designing a monthly budget grid that deducts total costs from income cell fields, showing savings indicators.</p>
            </div>
            <div class="why-card">
              <h3>✓ Parent Benefits</h3>
              <p>Parents in Delhi and Indore observe their kids using Excel to structure study schedules and map math variables with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GEO Section -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>National reach</div>
            <h2 class="section-title">Excel Cohorts in <span>Bhopal, Indore, and Raipur</span></h2>
            <p class="section-sub">Teaching essential data literacy skills to school students across India.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Central Classrooms</h3>
              <p>Students from Bhopal and Indore practice cell ranges and autofills, using Excel values to record science projects.</p>
            </div>
            <div class="why-card">
              <h3>Metro Submissions</h3>
              <p>Our students in Raipur and Delhi format calculation sheets that meet strict CBSE computer application goals.</p>
            </div>
            <div class="why-card">
              <h3>Peer Calculations</h3>
              <p>Weekend cohorts connect learners in Pune, Mumbai, Bangalore, and Hyderabad to exchange files and calculations.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Should students learn Excel in middle school?',
        a: 'Yes, learning Excel early reinforces decimal math, sorting logic, and data analysis. It prepares students for high school science records.'
      },
      {
        q: 'Is Microsoft Excel free for school students?',
        a: 'Yes. Students can access Microsoft Excel Web for free, or use equivalent browser programs like Google Sheets.'
      }
    ],
    faqs: [
      {
        q: 'What is the Excel course for kids?',
        a: 'It is a 6-week online class teaching Class 6-8 kids file inputs, arithmetic formulas, cell styling, and math charts.'
      },
      {
        q: 'Do kids write formulas in this class?',
        a: 'Yes. Students learn to write basic formulas like addition, division, averages, and auto-sums.'
      },
      {
        q: 'What projects do students build in Excel?',
        a: 'Every student builds an automated student marksheet and a simple family budget calculator.'
      },
      {
        q: 'Is this course suitable for CBSE students?',
        a: 'Yes. Spreadsheets are a mandatory part of CBSE ICT syllabi, and this course builds excellent practical skills.'
      },
      {
        q: 'Do students need prior math knowledge?',
        a: 'Basic school arithmetic (addition, subtraction, division) is sufficient to start writing Excel formulas.'
      },
      {
        q: 'How do kids practice Excel online?',
        a: 'They work on active sheets during the live cohort, sharing their files for instructor review.'
      },
      {
        q: 'Are the spreadsheet classes live or recorded?',
        a: 'All sessions are live and interactive, with recordings uploaded to the student portal within 24 hours.'
      },
      {
        q: 'Where do I find details to book a demo slot?',
        a: 'You can book a free demo typing or computer basics class on the primary homepage form.'
      }
    ]
  },
  {
    path: 'courses/powerpoint-course/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/courses/powerpoint-course/',
    title: 'PowerPoint Slide Design Course for Kids | SkillNest',
    description: 'Learn presentation design: MS PowerPoint layouts, slide masters, custom transitions, and speaking outlines. Build slide skills in kids.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Courses', url: '../index.html' },
      { name: 'PowerPoint Course', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Communication Skill',
      title: 'PowerPoint & <span>Visual Slide Design</span> 📽️',
      subtitle: 'Ditch boring, text-heavy slides. Master slide master layouts, color contrast rules, visual outlines, animations timings, and present school topics confidently.',
      stats: [
        { icon: '📽️', label: 'MS PowerPoint Layouts' },
        { icon: '🎨', label: 'Visual Slide Masters' },
        { icon: '✨', label: 'Custom Transitions' },
        { icon: '🎤', label: 'Speaking Outlines' }
      ]
    },
    aeo: {
      question: 'What is taught in a PowerPoint course for kids?',
      answer: 'In a PowerPoint course, kids learn visual slide layouts: configuring slide masters, setting custom margins, typography hierarchy, inserting graphics safely, animating bullet points, and structuring public speaking outlines.'
    },
    sections: `
      <!-- Course Overview -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Overview</div>
            <h2 class="section-title">Visual <span>Storytelling</span></h2>
            <p class="section-sub">Teaching kids to design professional slides that support their public presentations.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Layout Hierarchy</h3>
              <p>Learn to avoid walls of text. Practice the 6x6 rule: maximum of 6 words per line and 6 lines per slide for clean readability.</p>
            </div>
            <div class="why-card">
              <h3>Graphic Contrast Rules</h3>
              <p>Select Harmonious color schemes (e.g. high-contrast headings, dark shapes on light fields) that look professional.</p>
            </div>
            <div class="why-card">
              <h3>Interactive Animations</h3>
              <p>Practice timing animations to reveal text points as you talk, preventing the audience from reading ahead.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What Students Learn -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Skills</div>
            <h2 class="section-title">Slide Design <span>Competencies</span></h2>
            <p class="section-sub">Skills that improve school project presentation grades.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>🎨 Design Masters</h3>
              <p>Configure slide master templates to automatically apply consistent fonts and shapes to every new slide.</p>
            </div>
            <div class="why-card">
              <h3>⚡ Transition Logic</h3>
              <p>Apply simple, elegant slide transitions (e.g., Fade, Push) that keep presentations focused and clean.</p>
            </div>
            <div class="why-card">
              <h3>🎤 Presentation Outlines</h3>
              <p>Draft presentation note cards, matching slide keywords with verbal explanations for class presentations.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Curriculum Highlights -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Syllabus</div>
            <h2 class="section-title">6-Week <span>Slide Pathway</span></h2>
            <p class="section-sub">A structured, project-based path through layout, graphics, and animations.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Week 1: Layout Basics</h3>
              <p>Understanding slide interfaces, selecting screen shapes, inserting text placeholders, and aligning text fields.</p>
            </div>
            <div class="why-card">
              <h3>Week 2: Slide Master Templates</h3>
              <p>Creating customized design themes: choosing font pairings, background colors, and repeating header details.</p>
            </div>
            <div class="why-card">
              <h3>Week 3: Graphic Integration</h3>
              <p>Inserting vector shapes, cropping images to circles, using contrast boxes, and framing diagrams safely.</p>
            </div>
            <div class="why-card">
              <h3>Week 4: Animations & Reveals</h3>
              <p>Setting bullet-point animations, controlling effect directions, and utilizing basic slide transitions.</p>
            </div>
            <div class="why-card">
              <h3>Week 5: Slide Outlines</h3>
              <p>Structuring slide flows: designing title pages, content indices, transition slides, and summary conclusions.</p>
            </div>
            <div class="why-card">
              <h3>Week 6: Presentation Showcase</h3>
              <p>Presenting a finalized school slide project file under peer review to practice posture and voice control.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects & Outcomes -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Projects</div>
            <h2 class="section-title">Visual <span>Slide Projects</span></h2>
            <p class="section-sub">All students design and complete verified slide projects.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>🛡️ Cyber Safety slide Deck</h3>
              <p>A multi-slide presentation covering secure password rules, utilizing custom slide master layouts and simple fade transitions.</p>
            </div>
            <div class="why-card">
              <h3>🪐 Science Topics Presentation</h3>
              <p>Designing a visual slide outline describing solar systems or CBSE biology concepts, formatting diagrams cleanly.</p>
            </div>
            <div class="why-card">
              <h3>✓ Parent Benefits</h3>
              <p>Parents in Delhi and Raipur notice their kids compiling slide assignments independently, presenting school ideas with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GEO Section -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>National Presence</div>
            <h2 class="section-title">PowerPoint Cohorts in <span>Bhopal, Indore, and Raipur</span></h2>
            <p class="section-sub">Teaching professional visual presentation skills across Indian school nodes.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Central Classrooms</h3>
              <p>Students from Bhopal and Indore learn visual layout hierarchies, escaping the traditional boring wall-of-text slide style.</p>
            </div>
            <div class="why-card">
              <h3>Metro Grades</h3>
              <p>Our students in Raipur and Delhi build presentations that receive top marks in school science exhibitions and IT projects.</p>
            </div>
            <div class="why-card">
              <h3>Speaking Collaborations</h3>
              <p>Cohorts connect learners in Pune, Mumbai, Bangalore, and Hyderabad, helping kids practice presentation speaking logic.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Do kids learn PowerPoint or Google Slides?',
        a: 'We teach Microsoft PowerPoint as the primary software, but also explain how to import and format files in Google Slides and Canva.'
      },
      {
        q: 'Does this course help with public speaking?',
        a: 'Yes, because presenting slides requires learning speaking structures, voice modulation, and coordinate bullet reveals.'
      }
    ],
    faqs: [
      {
        q: 'What is the PowerPoint course for kids?',
        a: 'It is a 6-week online class teaching Class 6-8 kids presentation design, slide templates, transitions, and slide structure.'
      },
      {
        q: 'What software does my child need?',
        a: 'Any standard version of MS PowerPoint (Office 365, offline desktop apps, or the free web version) is perfect.'
      },
      {
        q: 'Is this course suitable for beginners?',
        a: 'Yes. No prior slide layout experience is required. We start with basic text entry and build to slide masters.'
      },
      {
        q: 'How many slides do students design in their projects?',
        a: 'For their final cyber safety project, students compile a clean, 6-slide structured deck.'
      },
      {
        q: 'Do you teach design templates?',
        a: 'Yes, we teach students how to design custom templates using slide masters instead of using boring default themes.'
      },
      {
        q: 'Are the slide classes live or recorded?',
        a: 'All sessions are live and interactive, with recordings uploaded to the student portal within 24 hours.'
      },
      {
        q: 'How do students present their final work?',
        a: 'Students share their screens during the week 6 live cohort to present their slides directly to peers.'
      },
      {
        q: 'How can I enroll my child in this slide course?',
        a: 'You can book a free demo slide or typing class through the primary register buttons on our homepage.'
      }
    ]
  },
  {
    path: 'courses/internet-safety-course/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/courses/internet-safety-course/',
    title: 'Internet Safety & Cyber Hygiene Course for Kids | SkillNest',
    description: 'Learn cyber safety: secure password rules, safe browsing filters, social safety, and digital footprints. Build safe tech habits in kids.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Courses', url: '../index.html' },
      { name: 'Internet Safety', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Digital Citizenship',
      title: 'Internet Safety & <span>Cyber Hygiene Course</span> 🛡️',
      subtitle: 'Build safe browsing habits. Learn to spot phishing emails, secure personal passwords, configure browser privacy settings, and navigate social spaces securely.',
      stats: [
        { icon: '🛡️', label: 'Secure Password Rules' },
        { icon: '🔍', label: 'Safe Browser Settings' },
        { icon: '📧', label: 'Phishing Alert Checks' },
        { icon: '🔒', label: 'Digital Footprint Rules' }
      ]
    },
    aeo: {
      question: 'What is taught in an internet safety course for kids?',
      answer: 'In an internet safety course, kids learn how to identify online threats, set up complex passwords, notice phishing details in emails, configure browser safety filters, manage privacy controls, and protect their digital footprint.'
    },
    sections: `
      <!-- Course Overview -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Overview</div>
            <h2 class="section-title">Responsible <span>Digital Citizenship</span></h2>
            <p class="section-sub">Empowering school students to navigate web-connected devices safely without fear.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Secure Passwords Rules</h3>
              <p>Learn how hackers crack credentials. Practice constructing complex passwords using uppercase, numbers, and symbols.</p>
            </div>
            <div class="why-card">
              <h3>Recognizing Phishing scams</h3>
              <p>Understand how fake links and spam emails work. Learn to check email sender details before clicking attachments.</p>
            </div>
            <div class="why-card">
              <h3>Digital Footprint Limits</h3>
              <p>Learn what data is saved when you post or browse online. Understand the permanence of your digital footprints.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What Students Learn -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Skills</div>
            <h2 class="section-title">Cyber Hygiene <span>Milestones</span></h2>
            <p class="section-sub">Skills developed through interactive threat scenarios.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>🔒 Password complexity</h3>
              <p>Learn to avoid birthdates or pet names. Practice creating secure password structures that are easy to remember.</p>
            </div>
            <div class="why-card">
              <h3>🔍 Browser Privacy</h3>
              <p>Configure search filters, disable third-party cookie trackers, block location tracking, and use secure search tools.</p>
            </div>
            <div class="why-card">
              <h3>🛡️ Personal Info Safety</h3>
              <p>Master rules: never share school schedules, home numbers, or live locations in public chat rooms.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Curriculum Highlights -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Syllabus</div>
            <h2 class="section-title">6-Week <span>Safety Pathway</span></h2>
            <p class="section-sub">A structured, project-based path through passwords, phishing, and privacy.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Week 1: Passwords & Credentials</h3>
              <p>Understanding database credentials, how hackers guess common words, and building secure passwords patterns.</p>
            </div>
            <div class="why-card">
              <h3>Week 2: browser Settings</h3>
              <p>Setting up private browsing, managing cookies, blocking location tracking, and choosing secure search engines.</p>
            </div>
            <div class="why-card">
              <h3>Week 3: Phishing Link Detection</h3>
              <p>Identifying fake domain spelling variations, checking sender emails, and testing spam attachment safety.</p>
            </div>
            <div class="why-card">
              <h3>Week 4: Personal Data Footprints</h3>
              <p>Analyzing what data is stored during browser searches, and managing app permission settings.</p>
            </div>
            <div class="why-card">
              <h3>Week 5: Digital Footprint Permanence</h3>
              <p>Evaluating how online choices affect school applications, and understanding digital footprints.</p>
            </div>
            <div class="why-card">
              <h3>Week 6: Safe Digital Citizenship</h3>
              <p>Drafting a family digital safety agreement and finalizing a secure browsing safety checklist.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects & Outcomes -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Projects</div>
            <h2 class="section-title">Internet Safety <span>Outcomes</span></h2>
            <p class="section-sub">Practical safety guides built by students for their homes.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>🛡️ Family Digital Safety Agreement</h3>
              <p>A structured document listing household device rules, password management, and safe screen boundaries signed by parents.</p>
            </div>
            <div class="why-card">
              <h3>📋 Home Cyber Safety Checklist</h3>
              <p>A printable sheet containing step-by-step guidelines to check browser safety and secure home router passwords.</p>
            </div>
            <div class="why-card">
              <h3>✓ Parent Benefits</h3>
              <p>Parents in Bhopal and Indore experience peace of mind, knowing their kids navigate school study portals without clicking spam links.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GEO Section -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>National Footprint</div>
            <h2 class="section-title">Cyber Hygiene in <span>Bhopal, Indore, and Raipur</span></h2>
            <p class="section-sub">Building responsible digital habits among middle school students across India.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Central Safety Nodes</h3>
              <p>Students from Bhopal and Indore practice link evaluation, checking browser domains for CBSE study sheets.</p>
            </div>
            <div class="why-card">
              <h3>Metro Security</h3>
              <p>Our students in Raipur and Delhi secure their family setups, checking settings on school laptops.</p>
            </div>
            <div class="why-card">
              <h3>Peer Security Links</h3>
              <p>Cohorts connect learners in Pune, Mumbai, Bangalore, and Hyderabad to discuss safe password storage rules.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Why is internet safety important in Class 6?',
        a: 'Class 6 is when kids start using devices independently for school study and peer chats. Teaching them cyber hygiene early protects family networks from spam.'
      },
      {
        q: 'How do you explain phishing to kids?',
        a: 'We use game-like examples, showing them how spam emails try to look like official logos and check spelling details.'
      }
    ],
    faqs: [
      {
        q: 'What is the internet safety course for kids?',
        a: 'It is a 6-week online cohort teaching Class 6-8 kids safe browsing, password structures, phishing checks, and privacy rules.'
      },
      {
        q: 'Do kids learn how to create passwords?',
        a: 'Yes, they learn password complexity rules, creating memorable but hard-to-crack patterns.'
      },
      {
        q: 'Is there a test in this safety class?',
        a: 'We use interactive scenarios and case studies, where kids identify fake emails and check link URLs.'
      },
      {
        q: 'Do you cover mobile device safety?',
        a: 'Yes. Mobile app permissions, safe app downloads, and location sharing settings are covered.'
      },
      {
        q: 'Is parental presence required during classes?',
        a: 'No, but we encourage parents to participate in the week 6 Family Digital Safety Agreement module.'
      },
      {
        q: 'Are the safety classes live or recorded?',
        a: 'All sessions are live and interactive, with recordings uploaded to the student portal within 24 hours.'
      },
      {
        q: 'Do students learn about computer viruses?',
        a: 'Yes. Kids learn how malware runs, how fake warning pop-ups look, and how to ignore them safely.'
      },
      {
        q: 'Where do I find details to book a demo typing or basics class?',
        a: 'You can book a free demo session via the primary register buttons on our homepage.'
      }
    ]
  },
  {
    path: 'courses/productivity-tools-course/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/courses/productivity-tools-course/',
    title: 'Digital Productivity Tools Course for Kids | SkillNest',
    description: 'Learn modern digital productivity tools: Google Workspace, Canva layouts, text formatting, and calendar scheduling. Build efficiency in kids.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Courses', url: '../index.html' },
      { name: 'Productivity Tools', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Academic Efficiency',
      title: 'Digital Productivity & <span>Modern Tools Course</span> 🚀',
      subtitle: 'Build modern office skills. Learn Google Workspace shortcuts, document formatting layouts, Canva graphics, and digital calendar planning for school studies.',
      stats: [
        { icon: '📁', label: 'Google Workspace Skills' },
        { icon: '🎨', label: 'Canva Layout Design' },
        { icon: '📝', label: 'Document Text Styling' },
        { icon: '🗓️', label: 'Calendar Study Plans' }
      ]
    },
    aeo: {
      question: 'What productivity tools should school students learn?',
      answer: 'Students should learn digital tools including Google Docs for report formatting, Google Sheets for trackers, Google Calendar for schedules, Canva for graphics, and digital file organization shortcuts to increase academic efficiency.'
    },
    sections: `
      <!-- Course Overview -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Overview</div>
            <h2 class="section-title">Efficient <span>Digital Workspace</span></h2>
            <p class="section-sub">Teaching school kids how to configure online workspaces to manage homework loads easily.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Google Workspace Basics</h3>
              <p>Master Google Docs, Sheets, and Slides. Learn document collaboration, sharing links, and tracking edits.</p>
            </div>
            <div class="why-card">
              <h3>Canva Layout Design</h3>
              <p>Learn graphic rules: font hierarchy, contrast grids, and space margins to design visual school notes and study guides.</p>
            </div>
            <div class="why-card">
              <h3>Calendar Study Schedules</h3>
              <p>Configure digital calendars, setting task reminders, color-coding study slots, and scheduling exam preparation times.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- What Students Learn -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Skills</div>
            <h2 class="section-title">Academic Productivity <span>Skills</span></h2>
            <p class="section-sub">Skills developed through interactive document formatting setups.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>📝 Text Formatting</h3>
              <p>Format margins, add headers, insert image captions, and build automatic Tables of Contents in reports.</p>
            </div>
            <div class="why-card">
              <h3>🗓️ Study Task Trackers</h3>
              <p>Design automatic homework trackers, tracking deadlines and checklists for school assignments.</p>
            </div>
            <div class="why-card">
              <h3>🌐 Digital Collaboration</h3>
              <p>Share files safely with school teams, coordinate comments, and handle joint project documents clean.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Curriculum Highlights -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Syllabus</div>
            <h2 class="section-title">6-Week <span>Productivity Pathway</span></h2>
            <p class="section-sub">A structured, project-based path through docs, graphics, and calendars.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Week 1: Cloud Workspace Setup</h3>
              <p>Configuring Google accounts, understanding folder paths, managing cloud space limits, and sharing files.</p>
            </div>
            <div class="why-card">
              <h3>Week 2: Document Formatting</h3>
              <p>Mastering layout styles: setting margins, paragraph spacing, inserting lists, and building automatic Indexes.</p>
            </div>
            <div class="why-card">
              <h3>Week 3: Graphic Design Rules</h3>
              <p>Setting up Canva: choosing color palettes, text alignments, graphic icons, and designing study note covers.</p>
            </div>
            <div class="why-card">
              <h3>Week 4: Spreadsheet Trackers</h3>
              <p>Building task checklists: setting deadlines, using checkmarks, and tracking school assignment status.</p>
            </div>
            <div class="why-card">
              <h3>Week 5: Digital Calendar Planning</h3>
              <p>Adding events, setting notifications, blocking study hours, and scheduling recurring task limits.</p>
            </div>
            <div class="why-card">
              <h3>Week 6: Productivity Portfolio</h3>
              <p>Combining design templates, document reports, and trackers into a comprehensive study dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects & Outcomes -->
      <section class="weekend-section">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Projects</div>
            <h2 class="section-title">Academic <span>Productivity Projects</span></h2>
            <p class="section-sub">All students design and complete verified productivity dashboards.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>📝 Term Report Template</h3>
              <p>A beautifully formatted Google Doc report, incorporating header titles, styled tables, and automated Indexes.</p>
            </div>
            <div class="why-card">
              <h3>🗓️ Digital Study Dashboard</h3>
              <p>A task tracker linked to a Google Calendar schedule, automating homework alerts and study session limits.</p>
            </div>
            <div class="why-card">
              <h3>✓ Parent Benefits</h3>
              <p>Parents in Delhi and Pune observe kids managing school homework schedules independently, reducing late study stress.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GEO Section -->
      <section class="programs-overview">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>National Footprint</div>
            <h2 class="section-title">Productivity Cohorts in <span>Bhopal, Indore, and Raipur</span></h2>
            <p class="section-sub">Teaching essential digital office tools to middle school students across India.</p>
          </div>
          <div class="why-grid">
            <div class="why-card">
              <h3>Central India Nodes</h3>
              <p>Students from Bhopal and Indore learn modern cloud formatting, organizing study files cleanly in Google Drive folders.</p>
            </div>
            <div class="why-card">
              <h3>Metro Academic Efficiency</h3>
              <p>Our students in Raipur and Delhi track school tasks using digital calendars, avoiding late project rushes.</p>
            </div>
            <div class="why-card">
              <h3>Peer Workspace Links</h3>
              <p>Weekend cohorts connect learners in Pune, Mumbai, Bangalore, and Hyderabad to exchange trackers and design guides.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Why should kids learn Google Workspace in Class 6?',
        a: 'Google Workspace is the standard for school collaboration. Learning Google Docs, Sheets, and Calendar early helps students manage projects easily.'
      },
      {
        q: 'Is Canva design useful for school assignments?',
        a: 'Yes. Designing infographics, science reports, and presentation slide covers using Canva helps kids present ideas visually.'
      }
    ],
    faqs: [
      {
        q: 'What is the productivity tools course?',
        a: 'It is a 6-week online class teaching Class 6-8 kids Google Workspace, Canva, document styling, and digital scheduling.'
      },
      {
        q: 'Do kids learn Google Docs formatting?',
        a: 'Yes, they learn margins, line spacing, image captions, and building automated tables of contents.'
      },
      {
        q: 'What projects do students compile?',
        a: 'Every student builds a term report template and a digital study calendar dashboard.'
      },
      {
        q: 'Do students need paid licenses for these tools?',
        a: 'No. All tools utilized (Google Docs, Sheets, Calendar, Canva) are free and web-based.'
      },
      {
        q: 'How does digital scheduling help students?',
        a: 'It teaches kids time management, setting exam reminders, and organizing homework schedules independently.'
      },
      {
        q: 'Are the productivity classes live or recorded?',
        a: 'All sessions are live and interactive, with recordings uploaded to the student portal within 24 hours.'
      },
      {
        q: 'Do you cover online document sharing security?',
        a: 'Yes. Students learn how to share link settings safely, managing viewer, commenter, and editor permissions.'
      },
      {
        q: 'How do I register for a free demo session?',
        a: 'You can book a free demo session via the primary booking form on our home page.'
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
    <section class="page-hero">
      <div class="container">
        <div class="page-hero-tag"><span class="dot"></span>${page.hero.tag}</div>
        <h1>${page.hero.title}</h1>
        <p>${page.hero.subtitle}</p>
        <div class="res-stats-strip">
          ${statsHtml}
        </div>
        <div class="hero-ctas">
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
            <p>Skill programs: <a href="${basePath}programs/digital-skills-foundation/index.html">Digital Skills Foundation</a>, <a href="${basePath}programs/ai-skills-for-students/index.html">AI Skills for Students</a>, <a href="${basePath}programs/coding/index.html">Coding Program Program</a>, <a href="${basePath}programs/excel-for-students/index.html">Excel for Students</a>, and <a href="${basePath}programs/productivity-tools/index.html">Productivity Tools</a>.</p>
          </div>
          <div class="why-card">
            <h3>📚 Practical Courses</h3>
            <p>Hands-on classes: <a href="${basePath}courses/computer-basics/index.html">Computer Basics</a>, <a href="${basePath}courses/typing-course/index.html">Typing Course</a>, <a href="${basePath}courses/coding/index.html">Coding Course</a>, <a href="${basePath}courses/ai-classes-for-kids/index.html">AI Classes for Kids</a>, <a href="${basePath}courses/excel-course/index.html">Excel Course</a>, <a href="${basePath}courses/powerpoint-course/index.html">PowerPoint Course</a>, <a href="${basePath}courses/internet-safety-course/index.html">Internet Safety Course</a>, and <a href="${basePath}courses/productivity-tools-course/index.html">Productivity Tools Course</a>.</p>
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
            <h3>🎮 Student Portfolios</h3>
            <p>Examine outcomes: <a href="${basePath}projects/coding-and-games/index.html">Coding &amp; Games</a>, <a href="${basePath}projects/ai-projects/index.html">AI Projects</a>, <a href="${basePath}projects/excel-projects/index.html">Excel Projects</a>, and <a href="${basePath}projects/portfolio-projects/index.html">Portfolio Projects</a>.</p>
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
          <p class="section-sub">Clear answers to your top queries regarding computer literacy and program details.</p>
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

// Redirect stubs configuration
const redirects = {
  '/courses/computer/': '/courses/computer-basics/',
  '/courses/coding-course/': '/courses/coding/',
  '/courses/cyber-safety-course/': '/courses/internet-safety-course/'
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

console.log('=== STARTING COURSES PAGE GENERATION ===');

// Generate active courses pages
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

console.log('=== COURSES PAGE GENERATION COMPLETE ===');
