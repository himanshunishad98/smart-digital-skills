const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../');

// Define comparison pages configuration
const pages = [
  {
    path: 'compare/index.html',
    depth: 1,
    url: 'https://skillnest.co.in/compare/',
    title: 'Compare Kids Digital Education & Coding Classes | SkillNest',
    description: 'Compare coding, practical digital literacy, online classes, and offline computer coaching in India. Review side-by-side matrices on curriculum, batch sizes, and value. Ages 8–16.',
    breadcrumbs: [
      { name: 'Home', url: '../index.html' },
      { name: 'Compare', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Objective Analysis',
      title: 'Compare Digital <span>Education Options</span> ⚖️',
      subtitle: 'Get direct, objective comparisons between coding bootcamps, computer literacy courses, offline computer coaching centers, and online cohorts in India to make an informed choice for your child.',
      stats: [
        { icon: '⌨️', label: 'Coding vs Digital Skills' },
        { icon: '🤖', label: 'AI vs Logic Coding' },
        { icon: '🏡', label: 'Online vs Local Center' },
        { icon: '🏆', label: 'SkillNest vs Old-School' }
      ]
    },
    aeo: {
      question: 'What digital education is best for school kids in India?',
      answer: 'For most school students in Class 6–8, a comprehensive digital foundation combining touch typing, MS Office, cyber safety, and introductory AI tools delivers the highest academic and career value. Logic coding provides depth, while live online small-batch instruction guarantees personalized attention compared to crowded local computer centers.'
    },
    sections: `
      <!-- Comparison Options Overview Grid -->
      <section class="compare-section-light">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Quick Select</div>
            <h2 class="section-title">Explore Side-by-Side <span>Comparisons</span></h2>
            <p class="section-sub">Select a deep-dive comparison to examine curriculum differences, class sizes, tool suites, and value structures.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <div class="why-icon">⌨️</div>
              <h3>Coding vs Digital Skills</h3>
              <p>Evaluate logical programming logic structures (Scratch/Python) against immediate school productivity skills (MS Word, Excel, typing).</p>
              <a href="coding-vs-digital-skills/index.html" class="btn-primary">Compare Details →</a>
            </div>

            <div class="why-card">
              <div class="why-icon">🤖</div>
              <h3>AI Literacy vs Coding</h3>
              <p>Determine if your child should learn AI prompt engineering or block programming logic first, mapped by school grades.</p>
              <a href="ai-vs-coding/index.html" class="btn-primary">Compare Details →</a>
            </div>

            <div class="why-card">
              <div class="why-icon">🏡</div>
              <h3>Online vs Offline Classes</h3>
              <p>Compare live online interactive computer learning with offline local coaching institutes in terms of curriculum, batch size, and attention.</p>
              <a href="online-vs-offline-learning/index.html" class="btn-primary">Compare Details →</a>
            </div>

            <div class="why-card">
              <div class="why-icon">🏆</div>
              <h3>SkillNest vs Traditional</h3>
              <p>Compare SkillNest's modern 6-week digital outcomes framework with old-school local computer centers teaching outdated theory.</p>
              <a href="skillnest-vs-traditional-computer-classes/index.html" class="btn-primary">Compare Details →</a>
            </div>

            <div class="why-card">
              <div class="why-icon">👥</div>
              <h3>Group vs 1-to-1 Learning</h3>
              <p>Compare peer interaction in a small-group cohort format with individual tutoring for computer and technical skill acquisition.</p>
              <a href="group-vs-1-to-1-learning/index.html" class="btn-primary">Compare Details →</a>
            </div>

            <div class="why-card">
              <div class="why-icon">📊</div>
              <h3>Excel vs AI Tools</h3>
              <p>Compare learning structured arithmetic grids in Excel vs prompt engineering. Discover why spreadsheet logic is crucial for AI readiness.</p>
              <a href="excel-vs-ai-tools/index.html" class="btn-primary">Compare Details →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Key Comparison Parameters -->
      <section class="compare-section-alt">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Quality Checklist</div>
            <h2 class="section-title">Critical Metrics for <span>Evaluating Computer Classes</span></h2>
            <p class="section-sub">Before enrolling your child in any computer class, ensure they meet these standard pedagogical metrics.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <h3>1. Batch Size & Personal Attention</h3>
              <p>Traditional centers in Bhopal, Indore, and Raipur often pack 20–40 students per batch, leaving little room for personalized feedback. Seek cohorts of 5–8 students to ensure instructors review each student's screen.</p>
            </div>
            <div class="why-card">
              <h3>2. Modern vs Outdated Curriculum</h3>
              <p>Many offline institutes still teach Windows XP or basic paint tools. Modern digital education must cover touch typing, cloud documents, Google Sheets, Canva design, and safe generative AI tools.</p>
            </div>
            <div class="why-card">
              <h3>3. Project-Based Outcomes</h3>
              <p>Rote learning of computer definitions does not build capability. Students must construct tangible projects—automated Excel budgets, digital presentations, Scratch interactive games—to prove real skill acquisition.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'What is the most useful computer skill for a student to learn first?',
        a: 'Touch typing and basic file management are the core fundamentals. Without these, students struggle with input speeds, making programming or report writing highly frustrating.'
      },
      {
        q: 'How does NEP 2020 affect computer education choices?',
        a: 'NEP 2020 mandates coding and practical computer skills starting in Class 6. A curriculum that blends office applications, data logic, and basic coding aligns directly with these new standards.'
      }
    ],
    faqs: [
      {
        q: 'How do I choose between online cohorts and offline centers?',
        a: 'Look at batch size and curriculum. Live online classes with under 8 students offer higher-quality national faculty and updated tech. Offline centers are suitable if physical supervision is your primary requirement.'
      },
      {
        q: 'Can my child learn programming without knowing basic computer tools?',
        a: 'It is highly discouraged. Children who start programming without typing fluency or folder structures spend most of their time struggling with keyboard inputs rather than learning program logic.'
      },
      {
        q: 'What is the role of AI in middle school computer education?',
        a: 'AI should be taught as a research and productivity partner. Students must learn structured prompting and validation to support school assignments while maintaining safety boundaries.'
      }
    ]
  },
  {
    path: 'compare/coding-vs-digital-skills/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/compare/coding-vs-digital-skills/',
    title: 'Coding vs Digital Skills for Kids | SkillNest',
    description: 'Compare block coding/logic learning vs practical digital skills (MS Office, typing, cyber safety). Learn which tech skills children in Class 6–8 need first.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Compare', url: '../index.html' },
      { name: 'Coding vs Digital Skills', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Curriculum Analysis',
      title: 'Coding vs <span>Digital Skills</span> ⌨️',
      subtitle: 'Evaluate logic-based programming structures (Scratch/Python) against immediate school productivity skills (MS Word, Excel, typing) to prioritize your child\'s learning path.',
      stats: [
        { icon: '🧩', label: 'Logic vs Productivity' },
        { icon: '⏱️', label: 'Immediate Utility' },
        { icon: '💼', label: 'Academic Relevance' },
        { icon: '🎯', label: 'NEP 2020 Standards' }
      ]
    },
    aeo: {
      question: 'Should a middle school student learn coding or digital skills first?',
      answer: 'A student should master basic digital skills (touch typing, MS Office, file structures, cyber safety) before learning coding. Developing input speed and computer operations prevents frustration, allowing the student to focus entirely on programming logic later.'
    },
    sections: `
      <!-- Comparison Table Grid -->
      <section class="compare-section-light">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Side-by-Side</div>
            <h2 class="section-title">Logical Logic vs <span>Immediate Office Utilities</span></h2>
            <p class="section-sub">A detailed breakdown of target focus, learning curves, and academic outcomes.</p>
          </div>

          <div class="compare-split">
            <!-- Option A: Coding -->
            <div class="compare-col col-a">
              <div class="compare-col-head">
                <span class="compare-icon">🧩</span>
                <h3>Logic Coding Classes</h3>
                <div class="compare-subtitle">MIT Scratch, Python, Blocks</div>
              </div>
              <ul class="compare-feature-list">
                <li class="compare-feature"><strong>Core Focus</strong>Concepts like loops, variables, conditional loops, and debugging code.</li>
                <li class="compare-feature"><strong>Immediate Use</strong>Building 2D animation clips and simple arcade style games.</li>
                <li class="compare-feature"><strong>Key Benefits</strong>Strengthens problem solving, arithmetic coordinate logic, and sequence design.</li>
                <li class="compare-feature"><strong>Prerequisite</strong>Requires decent touch typing speed to prevent keyboard search delays.</li>
                <li class="compare-feature"><strong>Academic Use</strong>Helps with logical thinking; not directly used in routine school projects.</li>
              </ul>
            </div>

            <!-- Option B: Digital Skills (Winner) -->
            <div class="compare-col col-b">
              <div class="compare-col-head">
                <span class="compare-icon">⌨️</span>
                <h3>Digital Skills Cohort</h3>
                <div class="compare-subtitle">Typing, MS Office, AI, Safety</div>
                <div class="compare-winner">⭐ Recommended First</div>
              </div>
              <ul class="compare-feature-list">
                <li class="compare-feature"><strong>Core Focus</strong>Touch typing, document formatting, MS Excel solvers, slide design, AI prompting.</li>
                <li class="compare-feature"><strong>Immediate Use</strong>Typing school projects, managing spreadsheets, building safety habits.</li>
                <li class="compare-feature"><strong>Key Benefits</strong>Immediate utility for all subjects; builds office tool competency.</li>
                <li class="compare-feature"><strong>Prerequisite</strong>Absolute beginner friendly. No prior experience required.</li>
                <li class="compare-feature"><strong>Academic Use</strong>Used daily for school assignments, PPT reports, and class presentations.</li>
              </ul>
            </div>
          </div>

          <div class="compare-verdict">
            <h3>⚖️ Final Verdict: Prioritize Digital Skills as the Base Foundation</h3>
            <p>While coding is excellent for training logical thinking, a child who cannot type efficiently or format a document will struggle to write code lines. Starting with a robust foundation of digital skills—covering typing, Excel, Canva, and cyber safety—prepares middle schoolers for all subjects while making future programming pathways significantly smoother.</p>
          </div>
        </div>
      </section>

      <!-- Details Section -->
      <section class="compare-section-alt">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Deep Dive</div>
            <h2 class="section-title">Why Foundation <span>Precedes Programming</span></h2>
            <p class="section-sub">Analyzing the pedagogical reasons why digital literacy is essential before custom coding.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <h3>Avoid Input Frustration</h3>
              <p>Kids who jump directly to Python or Scratch without typing speed spend 80% of their mental bandwidth looking for keys on the keyboard. Learning touch typing first makes computer interaction natural.</p>
            </div>
            <div class="why-card">
              <h3>Academic Utility in Bhopal & Indore</h3>
              <p>Schools in regional capitals like Indore and Bhopal mandate digital assignments. Touch typing and PowerPoint formatting help students score higher marks in their immediate school syllabus.</p>
            </div>
            <div class="why-card">
              <h3>Computational Data Structure</h3>
              <p>Excel spreadsheets teach students grid coordinate indexing and variables in a visible, easy-to-grasp layout. This tabular layout is the perfect mental prep for coding arrays and data tables.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Is it necessary to learn Coding Program before Python?',
        a: 'Yes. Scratch uses visual blocks which eliminates syntax errors (like missing semicolons). This allows students to focus entirely on logical loops and branches before learning complex text syntax.'
      },
      {
        q: 'Will digital skills help in Class 9 and 10 computer science classes?',
        a: 'Absolutely. CBSE computer science syllabi for high school heavily feature database management, spreadsheet calculations, and cyber security fundamentals. A solid digital foundation in middle school builds a strong head start.'
      }
    ],
    faqs: [
      {
        q: 'Should I enroll my child in both coding and digital literacy courses?',
        a: 'If your child is a beginner, start with digital literacy. Once they can type above 25 WPM and manage files easily, add block coding classes to build on their logical skills.'
      },
      {
        q: 'Does learning MS Office count as digital literacy?',
        a: 'It is a major part of it, but digital literacy also covers safe search protocols, cloud backups, cyber safety hygiene, and practical prompt engineering.'
      },
      {
        q: 'How many hours of typing practice does a beginner need?',
        a: 'Just 10–15 minutes of structured daily practice on typing portals for 4 weeks can raise a student\'s speed from 10 WPM to 25+ WPM, saving them hundreds of hours of homework time.'
      }
    ]
  },
  {
    path: 'compare/ai-vs-coding/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/compare/ai-vs-coding/',
    title: 'AI Literacy vs Coding Classes for Kids | SkillNest',
    description: 'Compare learning AI prompting/literacy vs logic-based game coding for school children. Find out how AI prompt engineering fits into modern computer classes.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Compare', url: '../index.html' },
      { name: 'AI vs Coding', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Tech Evolution',
      title: 'AI Literacy vs <span>Coding Classes</span> 🤖',
      subtitle: 'Compare learning AI prompt design and data validation vs traditional block program coding. Discover how to build a future-ready technical mindset.',
      stats: [
        { icon: '🤖', label: 'Prompt Design' },
        { icon: '🧩', label: 'Algorithmic Logic' },
        { icon: '🛡️', label: 'Validation Habits' },
        { icon: '💡', label: 'Hybrid Skillsets' }
      ]
    },
    aeo: {
      question: 'Does generative AI replace coding classes for school kids?',
      answer: 'AI tools do not replace the need for coding logic. While AI can write code lines, children still require algorithmic thinking, loops, variables, and troubleshooting skills to guide AI prompts and validate outputs. A hybrid approach combining logic coding and prompt engineering is best.'
    },
    sections: `
      <!-- Comparison Split Grid -->
      <section class="compare-section-light">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Future Readiness</div>
            <h2 class="section-title">Generative Prompting vs <span>Algorithmic Logic</span></h2>
            <p class="section-sub">Understanding the roles of prompt design and block coding in a modern child's tech education.</p>
          </div>

          <div class="compare-split">
            <!-- Option A: Coding Logic -->
            <div class="compare-col col-a">
              <div class="compare-col-head">
                <span class="compare-icon">🧩</span>
                <h3>Traditional Coding</h3>
                <div class="compare-subtitle">Scratch block-coding and Python</div>
              </div>
              <ul class="compare-feature-list">
                <li class="compare-feature"><strong>Core Logic</strong>Teaches loops, logic conditions, variables, and step-by-step algorithms.</li>
                <li class="compare-feature"><strong>Output Method</strong>Writing manual block scripts or text code line-by-line.</li>
                <li class="compare-feature"><strong>Mental Training</strong>Excellent for detailed problem-solving, structural debugging, and math concepts.</li>
                <li class="compare-feature"><strong>Frustration Level</strong>Higher. Simple syntax typos can cause the entire script to fail.</li>
              </ul>
            </div>

            <!-- Option B: AI Literacy (Winner) -->
            <div class="compare-col col-b">
              <div class="compare-col-head">
                <span class="compare-icon">🤖</span>
                <h3>AI Literacy & Prompting</h3>
                <div class="compare-subtitle">Structured Prompting & Validation</div>
                <div class="compare-winner">⭐ Highly Vital Tool</div>
              </div>
              <ul class="compare-feature-list">
                <li class="compare-feature"><strong>Core Logic</strong>Teaches structured queries, context setting, persona mapping, and validation.</li>
                <li class="compare-feature"><strong>Output Method</strong>Natural language directives refined through continuous loops.</li>
                <li class="compare-feature"><strong>Mental Training</strong>Builds high-level ideation, clear language expression, and critical validation.</li>
                <li class="compare-feature"><strong>Frustration Level</strong>Lower, but requires critical thinking to spot AI errors or "hallucinations".</li>
              </ul>
            </div>
          </div>

          <div class="compare-verdict">
            <h3>⚖️ Final Verdict: The Synergy of Hybrid Learning</h3>
            <p>Generative AI tools cannot function without human logic. A student who understands variables and logical loops from coding will design far better AI prompts. Conversely, a student with AI prompting skills can bypass repetitive tasks. SkillNest recommends a hybrid curriculum: teaching coding fundamentals first to build logic, followed by structured AI prompting rules.</p>
          </div>
        </div>
      </section>

      <!-- Detailed Info -->
      <section class="compare-section-alt">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Pedagogical Value</div>
            <h2 class="section-title">Critical Safety <span>and AI Ethics</span></h2>
            <p class="section-sub">Teaching students to treat AI as an intellectual collaborator, not a shortcut for homework cheating.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <h3>Validation Habits</h3>
              <p>Students must learn to cross-check everything generative AI outputs. Identifying AI errors teaches critical thinking and scientific inquiry in Raipur, Mumbai, and Delhi cohorts.</p>
            </div>
            <div class="why-card">
              <h3>Safety Guidelines</h3>
              <p>Using student-friendly AI search limits exposure to mature content. Our guides teach middle schoolers to keep prompt logs private and avoid sharing personal identifiers.</p>
            </div>
            <div class="why-card">
              <h3>Structured Prompt Logs</h3>
              <p>Writing structured prompts (Role, Context, Goal, Output Constraints) improves English language structuring and verbal clarity, turning AI into a tool for active learning.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Is prompt engineering a suitable skill for kids in Class 6?',
        a: 'Yes. Kids are naturally curious. Teaching them structured prompting—how to ask questions, assign personas, and specify output formats—directs their curiosity towards active research rather than passive search.'
      },
      {
        q: 'What coding platforms are best for children under 12?',
        a: 'MIT Scratch is the global standard. Its drag-and-drop block interface teaches programming logic without the frustration of keyboard syntax, making it ideal for ages 8 to 12.'
      }
    ],
    faqs: [
      {
        q: 'Does learning AI make kids lazy with their schoolwork?',
        a: 'Only if used incorrectly. Our curriculum does not teach kids to copy-paste answers. Instead, it teaches them to use AI for brain-storming outlines, drafting study checklists, and clarifying complex math problems.'
      },
      {
        q: 'Can a student learn Python directly after Scratch?',
        a: 'Yes. Once a student understands Scratch logic (variables, conditional arrays, event loops), transitioning to Python text syntax becomes much easier.'
      },
      {
        q: 'Are these online courses interactive?',
        a: 'Yes. All SkillNest cohorts are live, interactive sessions limited to 8 students. Instructors review each child\'s project screen and prompt logs in real time.'
      }
    ]
  },
  {
    path: 'compare/online-vs-offline-learning/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/compare/online-vs-offline-learning/',
    title: 'Live Online Cohorts vs Offline Computer Classes | SkillNest',
    description: 'Compare live online interactive computer learning with offline local coaching institutes. Review batch size, instructor quality, and curriculum updates.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Compare', url: '../index.html' },
      { name: 'Online vs Offline Learning', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Learning Mode Comparison',
      title: 'Online Cohorts vs <span>Offline Center</span> 🏡',
      subtitle: 'Compare batch sizes, tutor quality, commute overhead, and project validations to choose the best tech learning format for your child.',
      stats: [
        { icon: '👥', label: '8 Peers vs 30 Students' },
        { icon: '🎓', label: 'National Experts vs Local Center' },
        { icon: '🚗', label: 'No Commute vs Weekly Commutes' },
        { icon: '📈', label: 'Live Projects vs Rote Theory' }
      ]
    },
    aeo: {
      question: 'Are online computer classes effective for school children?',
      answer: 'Yes, online computer classes are highly effective if they are live, interactive, and keep batch sizes under 8 students. This format allows expert tutors to view student screens remotely, providing instant feedback while saving commute time.'
    },
    sections: `
      <!-- Side-by-Side Comparison -->
      <section class="compare-section-light">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Format Check</div>
            <h2 class="section-title">Live Online Cohorts vs <span>Local Offline Centers</span></h2>
            <p class="section-sub">A realistic look at student engagement, batch density, and instructor expertise.</p>
          </div>

          <div class="compare-split">
            <!-- Option A: Offline Computer Centers -->
            <div class="compare-col col-a">
              <div class="compare-col-head">
                <span class="compare-icon">🏢</span>
                <h3>Local Offline Coaching</h3>
                <div class="compare-subtitle">Neighborhood Computer Institutes</div>
              </div>
              <ul class="compare-feature-list">
                <li class="compare-feature"><strong>Tutor Quality</strong>Limited to local faculty availability; often college students or junior staff.</li>
                <li class="compare-feature"><strong>Batch Size</strong>Large batches, typically 20–40 students sharing a couple of systems.</li>
                <li class="compare-feature"><strong>Curriculum</strong>Often outdated, focusing on old OS platforms or static theoretical definitions.</li>
                <li class="compare-feature"><strong>Commute Overhead</strong>Requires weekly travel, adding to parental scheduling stress.</li>
              </ul>
            </div>

            <!-- Option B: Live Online Cohorts (Winner) -->
            <div class="compare-col col-b">
              <div class="compare-col-head">
                <span class="compare-icon">🏡</span>
                <h3>SkillNest Live Cohort</h3>
                <div class="compare-subtitle">Interactive 8-Student Online Class</div>
                <div class="compare-winner">⭐ Recommended Choice</div>
              </div>
              <ul class="compare-feature-list">
                <li class="compare-feature"><strong>Tutor Quality</strong>National-level subject experts trained in online child engagement.</li>
                <li class="compare-feature"><strong>Batch Size</strong>Strictly limited to 5–8 students per batch. Every child gets screen review.</li>
                <li class="compare-feature"><strong>Curriculum</strong>Updated quarterly to include cloud tools, Excel automation, and safe AI prompts.</li>
                <li class="compare-feature"><strong>Commute Overhead</strong>Zero travel. Safe home environment with live session recordings for review.</li>
              </ul>
            </div>
          </div>

          <div class="compare-verdict">
            <h3>⚖️ Final Verdict: Choose Online Cohorts for Real Skill Outcomes</h3>
            <p>If you seek outdated computer literacy certificates, local physical centers are sufficient. However, if you want your child to develop practical touch typing speed, advanced Excel data structure skills, and modern AI literacy, live online cohorts are the superior choice. The small batch size (under 8 students) ensures your child is active and guided, rather than lost in a crowded offline computer lab.</p>
          </div>
        </div>
      </section>

      <!-- Regional Support and Reach -->
      <section class="compare-section-alt">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Regional Focus</div>
            <h2 class="section-title">Support Across <span>India\'s Hubs</span></h2>
            <p class="section-sub">Bringing premium tech education to students in tier-1 and tier-2 cities without local quality barriers.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <h3>Tier-2 Access (Bhopal, Indore, Raipur)</h3>
              <p>Parents in Bhopal, Raipur, and Indore often struggle to find local centers teaching modern tools. Online cohorts deliver top-tier instruction directly to their homes.</p>
            </div>
            <div class="why-card">
              <h3>Time Saving in Tier-1 (Delhi, Mumbai, Pune)</h3>
              <p>In traffic-heavy cities like Mumbai, Pune, and Delhi, avoiding a 45-minute commute to a computer center gives students more time for schoolwork and active sports.</p>
            </div>
            <div class="why-card">
              <h3>Tutor Screen Sharing</h3>
              <p>Using modern video conferencing, our tutors inspect each student's coding canvas, spreadsheet cells, and typing postures, delivering feedback equivalent to 1-to-1 instruction.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Do online computer classes require a high-end laptop?',
        a: 'No. A standard laptop or desktop with 4GB RAM, a working webcam, and a stable internet connection (above 15 Mbps) is all that is required for our programs.'
      },
      {
        q: 'How do instructors ensure children do not get distracted online?',
        a: 'We keep our batches under 8 students and require students to keep their webcams on. Tutors ask students to share their screens continuously, ensuring active, project-focused participation.'
      }
    ],
    faqs: [
      {
        q: 'What happens if my child misses a live online class?',
        a: 'Every session is recorded. If a student misses a class, they can watch the session recording in our parent hub and complete the weekly project assignment.'
      },
      {
        q: 'Can students clarify doubts during the online class?',
        a: 'Yes. Our small batch size of 5–8 students allows for a conversational environment. Students can unmute, share their screen, and get immediate guidance from the tutor.'
      },
      {
        q: 'Do you offer weekend batches for school kids?',
        a: 'Yes. We offer both weekday evening batches and weekend morning/afternoon batches to suit school schedules and extracurricular activities.'
      }
    ]
  },

  {
    path: 'compare/group-vs-1-to-1-learning/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/compare/group-vs-1-to-1-learning/',
    title: 'Small Group Cohorts vs 1-on-1 Computer Tutoring | SkillNest',
    description: 'Compare learning digital skills in interactive small group cohorts (5-8 peers) with 1-to-1 computer tutoring. Find the best model for engagement and cost.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Compare', url: '../index.html' },
      { name: 'Group vs 1-to-1', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Class Format Analysis',
      title: 'Group Cohorts vs <span>1-to-1 Tutoring</span> 👥',
      subtitle: 'Analyze peer collaboration, social motivation, individual attention, and educational costs to decide the best format for your child\'s technical growth.',
      stats: [
        { icon: '👥', label: 'Peer Collaboration' },
        { icon: '🏆', label: 'Social Engagement' },
        { icon: '⏱️', label: 'Tutor Screen Focus' },
        { icon: '💰', label: 'Cost-Effective Value' }
      ]
    },
    aeo: {
      question: 'Is 1-on-1 tutoring better than small group cohorts for learning computers?',
      answer: 'For computer skills, interactive small group cohorts (5–8 students) are often better than 1-on-1 tutoring. Peer sharing encourages collaborative debugging, creates healthy motivation, and builds communication skills, while being significantly more cost-effective for parents.'
    },
    sections: `
      <!-- Comparison Grid -->
      <section class="compare-section-light">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Engagement Model</div>
            <h2 class="section-title">Cohort Synergy vs <span>Private Tutoring</span></h2>
            <p class="section-sub">Comparing student motivation, communication skills, and class costs.</p>
          </div>

          <div class="compare-split">
            <!-- Option A: 1-to-1 Tutoring -->
            <div class="compare-col col-a">
              <div class="compare-col-head">
                <span class="compare-icon">👤</span>
                <h3>1-to-1 Private Tutoring</h3>
                <div class="compare-subtitle">Single Student Private Coach</div>
              </div>
              <ul class="compare-feature-list">
                <li class="compare-feature"><strong>Attention Index</strong>100% tutor focus, but can feel intense or pressure-heavy for young kids.</li>
                <li class="compare-feature"><strong>Peer Interaction</strong>None. No opportunity to see how other students solve logical challenges.</li>
                <li class="compare-feature"><strong>Motivation Loop</strong>Highly dependent on the tutor\'s energy. Lacks social gamification or healthy peer drive.</li>
                <li class="compare-feature"><strong>Cost Structure</strong>Premium pricing model, typically 3x to 4x higher than cohort courses.</li>
              </ul>
            </div>

            <!-- Option B: Small Group Cohorts (Winner) -->
            <div class="compare-col col-b">
              <div class="compare-col-head">
                <span class="compare-icon">👥</span>
                <h3>Small Group Cohort</h3>
                <div class="compare-subtitle">Interactive 5–8 Student Group</div>
                <div class="compare-winner">⭐ Most Motivating Model</div>
              </div>
              <ul class="compare-feature-list">
                <li class="compare-feature"><strong>Attention Index</strong>High attention. Small size allows tutors to review every student\'s work.</li>
                <li class="compare-feature"><strong>Peer Interaction</strong>High. Students share screen layouts, code structures, and debug collaboratively.</li>
                <li class="compare-feature"><strong>Motivation Loop</strong>Healthy competition: keyboard speed tests, presentation sharing, and projects.</li>
                <li class="compare-feature"><strong>Cost Structure</strong>Highly cost-effective, offering premium instruction at standard group rates.</li>
              </ul>
            </div>
          </div>

          <div class="compare-verdict">
            <h3>⚖️ Final Verdict: Small Group Cohorts Drive Superior Engagement</h3>
            <p>While 1-on-1 tutoring is helpful for remedial subjects, learning tech skills in isolation misses the collaborative nature of modern digital work. Small group cohorts (5–8 students) mimic real-world project teams. Sharing spreadsheets, presenting slides to peers, and reviewing team Scratch codes builds communication and collaboration alongside computer literacy.</p>
          </div>
        </div>
      </section>

      <!-- Details Section -->
      <section class="compare-section-alt">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Social Pedagogy</div>
            <h2 class="section-title">Why Peer Learning <span>Improves Retention</span></h2>
            <p class="section-sub">Examining why students retain logical concepts better when learning alongside peers.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <h3>Collaborative Troubleshooting</h3>
              <p>When a peer finds a cell error in an Excel budget or a coding block bug, explaining it to the group reinforces the concept for all students, improving concept retention.</p>
            </div>
            <div class="why-card">
              <h3>Public Speaking Warm-Up</h3>
              <p>In our cohorts, students present Canva slide decks on cyber safety to their peers. This mild social exposure builds public speaking confidence and presentation delivery skills.</p>
            </div>
            <div class="why-card">
              <h3>Shared Project Ideation</h3>
              <p>Watching peers prompt AI search tools or structure Scratch variables inspires students to explore new design choices, leading to more creative outcomes.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Does my child need to keep the webcam on in online cohorts?',
        a: 'Yes. Keeping webcams active ensures high tutor attention, interactive focus, and helps the tutor evaluate typing postures and monitor engagement.'
      },
      {
        q: 'Can I choose batch mates for my child\'s cohort?',
        a: 'Yes. Many parents enroll their children alongside school friends or cousins to create a comfortable, pre-established team learning environment.'
      }
    ],
    faqs: [
      {
        q: 'Is 8 students small enough for personal attention?',
        a: 'Yes. In an 8-student batch, a tutor can easily scroll through and review every child\'s work screen multiple times, giving specific feedback on coding or Excel.'
      },
      {
        q: 'How does SkillNest ensure group cohorts match student ages?',
        a: 'We sort cohorts by age groups (Ages 8–10, 11–13, and 14–16) to ensure similar learning speeds and project complexities across the class.'
      },
      {
        q: 'Do group cohorts move slower than 1-on-1 tutoring?',
        a: 'No. The collaborative rhythm, gamified typing tests, and shared code demos keep the class pace steady and highly engaging.'
      }
    ]
  },
  {
    path: 'compare/excel-vs-ai-tools/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/compare/excel-vs-ai-tools/',
    title: 'Microsoft Excel vs AI Tools for Students | SkillNest',
    description: 'Compare learning structural data management in MS Excel vs productivity tools/AI prompting. See why Class 6-8 students need both spreadsheet logic and AI skills.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Compare', url: '../index.html' },
      { name: 'Excel vs AI Tools', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Tool Analysis',
      title: 'MS Excel vs <span>AI Productivity Tools</span> 📊',
      subtitle: 'Compare structural spreadsheet logic and arithmetic cell formulas with AI natural language querying. Discover how they combine to build tech fluency.',
      stats: [
        { icon: '📊', label: 'Cell Formulas & Logic' },
        { icon: '🤖', label: 'Natural Language Queries' },
        { icon: '📉', label: 'Data Visualizers' },
        { icon: '📈', label: 'AI Prompt Prep' }
      ]
    },
    aeo: {
      question: 'Should a school student learn MS Excel or AI prompting first?',
      answer: 'School students should learn Excel fundamentals alongside AI prompts. Excel cell equations build logical skills—like cell coordinate inputs and arithmetic formulas—which are essential for understanding how AI structured prompting and database logic operate.'
    },
    sections: `
      <!-- Comparison Grid -->
      <section class="compare-section-light">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Side-by-Side</div>
            <h2 class="section-title">Structured Cell Grids vs <span>Language Queries</span></h2>
            <p class="section-sub">A detailed breakdown of arithmetic data structures and conversational AI tools.</p>
          </div>

          <div class="compare-split">
            <!-- Option A: Microsoft Excel -->
            <div class="compare-col col-a">
              <div class="compare-col-head">
                <span class="compare-icon">📊</span>
                <h3>Microsoft Excel / Sheets</h3>
                <div class="compare-subtitle">Structured Grid Math & Data</div>
              </div>
              <ul class="compare-feature-list">
                <li class="compare-feature"><strong>Core Concept</strong>Cell references, coordinate values, math formulas (SUM, AVERAGE, IF), tables.</li>
                <li class="compare-feature"><strong>Output Method</strong>Entering calculations, sorting data sheets, and creating line/bar graphs.</li>
                <li class="compare-feature"><strong>Mental Training</strong>Builds strong mathematical structures, database views, and strict logical formats.</li>
                <li class="compare-feature"><strong>Future Career Use</strong>Critical for finance, science, data analysis, and engineering roles.</li>
              </ul>
            </div>

            <!-- Option B: AI Productivity (Winner) -->
            <div class="compare-col col-b">
              <div class="compare-col-head">
                <span class="compare-icon">🤖</span>
                <h3>AI Productivity Tools</h3>
                <div class="compare-subtitle">Prompt Engineering & Research</div>
                <div class="compare-winner">⭐ Vital Future Skill</div>
              </div>
              <ul class="compare-feature-list">
                <li class="compare-feature"><strong>Core Concept</strong>Clear prompts, persona definitions, fact-checking, and summarization.</li>
                <li class="compare-feature"><strong>Output Method</strong>Interactive chat loops to write drafts, generate code blocks, or summarize articles.</li>
                <li class="compare-feature"><strong>Mental Training</strong>Builds semantic query formulation, research logic, and validation habits.</li>
                <li class="compare-feature"><strong>Future Career Use</strong>Essential across all modern technical and creative industries.</li>
              </ul>
            </div>
          </div>

          <div class="compare-verdict">
            <h3>⚖️ Final Verdict: Excel Logic Forms the Base for AI Mastery</h3>
            <p>Do not skip spreadsheet basics for AI. Excel is the world's most common database interface. Learning cell reference variables (e.g. A1+B1) teaches students how structured variables operate, making it easier to write complex AI prompting structures later. SkillNest recommends learning Excel data foundations alongside safe, structured generative AI prompts.</p>
          </div>
        </div>
      </section>

      <!-- Details Section -->
      <section class="compare-section-alt">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Pedagogical Value</div>
            <h2 class="section-title">Why Math Logic <span>Matters in Tech</span></h2>
            <p class="section-sub">How spreadsheet modeling transitions middle schoolers from passive gaming to analytical data management.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <h3>Variable Modeling</h3>
              <p>Entering an IF statement or a multi-cell SUM formula teaches variables in a visual grid, which is easier for Class 6–8 students to grasp than abstract coding syntax.</p>
            </div>
            <div class="why-card">
              <h3>School Marksheet Projects</h3>
              <p>Students build automated grade sheets to track their own marks. Applying percentage formulas and formatting tables builds immediate confidence with numbers.</p>
            </div>
            <div class="why-card">
              <h3>Prompt Design Foundations</h3>
              <p>Modern AI prompts require structured context. Formatting spreadsheet columns helps students organize their data logically before writing AI prompts.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Do middle school kids need to learn Excel formulas?',
        a: 'Yes. Basic formulas (SUM, AVERAGE, percentages) are directly useful for school math and science graphs, and build early analytical thinking habits.'
      },
      {
        q: 'Which is better: Microsoft Excel or Google Sheets?',
        a: 'Both are excellent. Google Sheets is great for real-time cloud collaboration, while Microsoft Excel offers more advanced offline formatting options. SkillNest covers both interfaces.'
      }
    ],
    faqs: [
      {
        q: 'Will my child use Excel in high school courses?',
        a: 'Yes. High school CBSE science labs, geography charts, and economics reports require basic data graphing. Learning Excel early makes these tasks straightforward.'
      },
      {
        q: 'How does SkillNest teach Excel to kids?',
        a: 'We avoid boring lectures. Students build fun, practical projects—like a personal pocket-money tracker or a family holiday budget—applying math concepts to real-world tasks.'
      },
      {
        q: 'What is the role of AI in analyzing spreadsheets?',
        a: 'Students learn to use AI tools to draft Excel formulas and identify errors. This teaches them how to use AI as a helpful tutor, reinforcing their learning.'
      }
    ]
  },
  {
    path: 'compare/skillnest-vs-traditional-computer-classes/index.html',
    depth: 2,
    url: 'https://skillnest.co.in/compare/skillnest-vs-traditional-computer-classes/',
    title: 'SkillNest vs Traditional Computer Classes for Kids | SkillNest',
    description: 'Compare SkillNest\'s modern live online cohort curriculum with traditional local offline computer classes. Review side-by-side matrices on batch sizes, tutors, and project outcomes.',
    breadcrumbs: [
      { name: 'Home', url: '../../index.html' },
      { name: 'Compare', url: '../index.html' },
      { name: 'SkillNest vs Traditional', url: './index.html', isCurrent: true }
    ],
    hero: {
      tag: 'Provider Comparison',
      title: 'SkillNest vs <span>Traditional Classes</span> 🏆',
      subtitle: 'Compare SkillNest\'s live project-based online digital skills curriculum with old-school local computer centers. Make the right choice for your child\'s future.',
      stats: [
        { icon: '🎓', label: 'Expert Tutors vs Junior Staff' },
        { icon: '👥', label: '8-Student Batch vs 30+ Crowds' },
        { icon: '🛠️', label: 'Modern AI/Cloud vs Windows XP' },
        { icon: '🎯', label: 'Project Outcomes vs Rote Theory' }
      ]
    },
    aeo: {
      question: 'Why is SkillNest better than traditional computer classes for kids?',
      answer: 'SkillNest offers interactive live cohorts capped at 8 students with real-time screen review, modern NEP 2020 curriculum (AI prompting, cloud docs, touch typing, Scratch logic), and project-based outcomes. Traditional local centers often have 30+ students per batch sharing systems, outdated software (Windows XP/Paint), and theoretical definitions exams.'
    },
    sections: `
      <!-- Comparison Grid -->
      <section class="compare-section-light">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Side-by-Side</div>
            <h2 class="section-title">Outcome-Based Learning vs <span>Traditional Coaching</span></h2>
            <p class="section-sub">A realistic, parameters-based comparison between modern cohorts and traditional computer labs.</p>
          </div>

          <div class="compare-split">
            <!-- Option A: Traditional Computer Classes -->
            <div class="compare-col col-a">
              <div class="compare-col-head">
                <span class="compare-icon">🏢</span>
                <h3>Traditional Local Centers</h3>
                <div class="compare-subtitle">Old-School Neighborhood Coaching</div>
              </div>
              <ul class="compare-feature-list">
                <li class="compare-feature"><strong>Curriculum</strong>Outdated syllabus covering Paint, Windows XP, or static definitions of CPU/RAM.</li>
                <li class="compare-feature"><strong>Batch Size</strong>20 to 40 students packed in a room, often sharing 2-3 kids to a single computer.</li>
                <li class="compare-feature"><strong>Instructors</strong>Junior staff or college students reading from textbook pages.</li>
                <li class="compare-feature"><strong>Teaching Method</strong>Rote memorization of definitions for a written paper exam.</li>
                <li class="compare-feature"><strong>Typing &amp; AI</strong>No touch typing training; AI tools are completely excluded.</li>
              </ul>
            </div>

            <!-- Option B: SkillNest Live Cohort (Winner) -->
            <div class="compare-col col-b">
              <div class="compare-col-head">
                <span class="compare-icon">🏆</span>
                <h3>SkillNest Cohorts</h3>
                <div class="compare-subtitle">Live, Modern Online Tech Curriculum</div>
                <div class="compare-winner">⭐ Premium Modern Choice</div>
              </div>
              <ul class="compare-feature-list">
                <li class="compare-feature"><strong>Curriculum</strong>Updated quarterly: MS Office, Google Workspace, Canva, Scratch coding, safe AI prompts.</li>
                <li class="compare-feature"><strong>Batch Size</strong>Strictly limited to 5–8 students per batch. Every child gets a dedicated system screen.</li>
                <li class="compare-feature"><strong>Instructors</strong>Subject matter experts trained in child psychology and online delivery.</li>
                <li class="compare-feature"><strong>Teaching Method</strong>100% project-based: build budgets, write code, format school presentations.</li>
                <li class="compare-feature"><strong>Typing &amp; AI</strong>Structured daily touch-typing track and safe prompt engineering practices.</li>
              </ul>
            </div>
          </div>

          <div class="compare-verdict">
            <h3>⚖️ Final Verdict: Choose SkillNest for Active Tech Competency</h3>
            <p>Traditional centers focus on theoretical certificates that add little value to a child's schoolwork or future careers. SkillNest focuses on building practical capabilities: typing at 25+ WPM, writing clean Scratch logic loops, formatting school assignments in MS Word, and leveraging safe AI filters. The safe, commute-free home environment with under 8 peers guarantees maximum engagement and individual instructor feedback.</p>
          </div>
        </div>
      </section>

      <!-- Details Section -->
      <section class="compare-section-alt">
        <div class="container">
          <div class="text-center fade-up">
            <div class="section-tag"><span class="dot"></span>Pedagogical Shift</div>
            <h2 class="section-title">Outcomes Over <span>Certificates</span></h2>
            <p class="section-sub">Why memorizing definitions of computer parts cannot prepare middle schoolers for high school workloads.</p>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <h3>Interactive Screen Review</h3>
              <p>Unlike crowded physical labs where tutors only intervene when something breaks, SkillNest tutors continuously inspect each child's project screen in real-time, providing immediate visual feedback.</p>
            </div>
            <div class="why-card">
              <h3>NEP 2020 Digital Standard</h3>
              <p>Modern national education guidelines mandate computational thinking and digital literacy. Learning how to prompt AI, format reports, and analyze data in sheets aligns directly with high school guidelines.</p>
            </div>
            <div class="why-card">
              <h3>Project Showcase</h3>
              <p>Every student graduates with a digital portfolio containing their Scratch game code, Canva slide decks, and automated Excel spreadsheets, demonstrating real-world technical competency.</p>
            </div>
          </div>
        </div>
      </section>
    `,
    paa: [
      {
        q: 'Do local computer institutes provide useful certificates?',
        a: 'Most local certificates are not recognized by national schools or boards. Real competency is proven by a child\'s ability to type, build spreadsheets, format reports, and construct logic projects.'
      },
      {
        q: 'How does SkillNest ensure batch compatibility?',
        a: 'We screen and group students by age (Ages 8–10, 11–13, and 14–16) and prior typing/computer experience to maintain a uniform, comfortable batch learning speed.'
      }
    ],
    faqs: [
      {
        q: 'Why should I pay for online cohorts instead of local offline centers?',
        a: 'Online cohorts give access to top-tier national tutors, updated curriculums, and a tiny batch size (under 8 students). Local centers often pack 20-30 students per batch, leaving no room for individual guidance.'
      },
      {
        q: 'Does SkillNest teach touch typing?',
        a: 'Yes. Every session includes typing drills, and students are given a structured typing roadmap to reach 25+ WPM, eliminating frustration during school projects and coding.'
      },
      {
        q: 'Are class timings flexible for school schedules?',
        a: 'Yes. We offer multiple weekday evening batches and weekend morning/afternoon batches. Live session recordings are provided in our parent hub if a student misses a class.'
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
    ✨ Compare Digital Education Options <span>|</span> Side-by-Side Analysis <span>|</span> 📞 <span class="phone-number">+91 88277 31006</span>
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
          <a href="${basePath}compare/index.html" class="btn-ghost btn-ghost-hero">All Comparisons →</a>
        </div>
      </div>
    </section>

    <!-- AEO Quick Answer Block -->
    <section class="why-section">
      <div class="container">
        <div class="why-grid">
          <div class="why-card">
            <div class="why-icon">⚖️</div>
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
          <p class="section-sub">Clear answers to your top queries regarding computer class choices.</p>
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
console.log('=== STARTING COMPARE PAGE GENERATION ===');
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

// Generate redirects for old compare pages
const redirects = [
  {
    path: 'compare/ai-vs-coding-for-kids/index.html',
    target: '/compare/ai-vs-coding/',
    depth: 2
  },
  {
    path: 'compare/online-vs-offline-computer-classes/index.html',
    target: '/compare/online-vs-offline-learning/',
    depth: 2
  }
];

redirects.forEach(r => {
  const targetFilePath = path.join(rootDir, r.path);
  const targetDir = path.dirname(targetFilePath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const prefix = '../'.repeat(r.depth);
  const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<script src="${prefix}assets/js/fallback.js" defer="" id="file-protocol-fallback" data-depth="${r.depth}"></script>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta charset="utf-8">
<title>Redirecting… | SkillNest</title>
<link rel="canonical" href="https://skillnest.co.in${r.target}">
<meta http-equiv="refresh" content="0; url=https://skillnest.co.in${r.target}">
<meta name="robots" content="noindex, follow">
<script>window.location.replace("${r.target}");</script>
<meta name="theme-color" content="#1e40af">
</head>
<body>
<h1 style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;">Redirecting… | <span class="brand-name">SkillNest</span></h1>
<p>This page has moved. <a href="${r.target}">Click here</a> if you are not redirected automatically.</p>
</body>
</html>`;
  fs.writeFileSync(targetFilePath, redirectHtml, 'utf8');
  console.log(`Generated Redirect Stub: ${r.path} -> ${r.target}`);
});

// Update redirect-map.json
const redirectMapPath = path.join(rootDir, 'redirect-map.json');
if (fs.existsSync(redirectMapPath)) {
  try {
    const map = JSON.parse(fs.readFileSync(redirectMapPath, 'utf8'));
    map['/compare/ai-vs-coding-for-kids/'] = '/compare/ai-vs-coding/';
    map['/compare/online-vs-offline-computer-classes/'] = '/compare/online-vs-offline-learning/';
    // Delete skillnest-vs-traditional-computer-classes from redirect map since it is a real page now
    delete map['/compare/skillnest-vs-traditional-computer-classes/'];
    fs.writeFileSync(redirectMapPath, JSON.stringify(map, null, 2), 'utf8');
    console.log('Updated redirect-map.json successfully');
  } catch (e) {
    console.error('Failed to update redirect-map.json:', e);
  }
}

console.log('=== COMPARE PAGE GENERATION COMPLETE ===');
