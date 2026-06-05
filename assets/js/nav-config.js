/**
 * nav-config.js
 * Centralized configuration for all navigation menus, links, and dropdown items.
 * Works in both browser (window.NAV_CONFIG) and CommonJS environment.
 */
(function() {
  const config = {
    menu: [
      { name: 'HOME', url: '/' },
      {
        name: 'ABOUT',
        url: '/about/',
        dropdown: [
          { name: 'About SkillNest', url: '/about/' },
          { name: 'Our Mission', url: '/about/our-mission.html' },
          { name: 'Founder', url: '/about/founder.html' },
          { name: 'Meet Our Mentors', url: '/about/mentors.html' },
          { name: 'Testimonials', url: '/about/testimonials.html' },
          { name: 'Success Stories', url: '/about/success-stories.html' },
          { name: 'Careers', url: '/about/careers.html' }
        ]
      },
      {
        name: 'PROGRAMS',
        url: '/programs/',
        dropdown: [
          { name: 'Programs Overview', url: '/programs/' },
          { name: 'Digital Skills Foundation', url: '/programs/digital-skills-foundation/' },
          { name: 'AI Skills for Students', url: '/programs/ai-skills-for-students/' },
          { name: 'Coding Program', url: '/programs/coding/' },
          { name: 'Excel for Students', url: '/programs/excel-for-students/' },
          { name: 'Productivity Tools', url: '/programs/productivity-tools/' },
          { name: 'Cyber Safety', url: '/programs/cyber-safety/' }
        ]
      },
      {
        name: 'COURSES',
        url: '/courses/',
        dropdown: [
          { name: 'Courses Overview', url: '/courses/' },
          { name: 'Computer Basics', url: '/courses/computer-basics/' },
          { name: 'Typing Course', url: '/courses/typing-course/' },
          { name: 'Coding Course', url: '/courses/coding/' },
          { name: 'AI Classes for Kids', url: '/courses/ai-classes-for-kids/' },
          { name: 'Excel Course', url: '/courses/excel-course/' },
          { name: 'PowerPoint Course', url: '/courses/powerpoint-course/' },
          { name: 'Internet Safety Course', url: '/courses/internet-safety-course/' },
          { name: 'Productivity Tools Course', url: '/courses/productivity-tools-course/' }
        ]
      },
      {
        name: 'CITIES',
        url: '/cities/',
        dropdown: [
          { name: 'Cities Overview', url: '/cities/' },
          { name: 'Major Cities', url: '/cities/#major-cities' },
          { name: 'More Cities', url: '/cities/#more-cities' }
        ]
      },
      {
        name: 'AGE GROUPS',
        url: '/age-groups/',
        dropdown: [
          { name: 'Age Groups Overview', url: '/age-groups/' },
          { name: 'Ages 8–10', url: '/age-groups/ages-8-10/' },
          { name: 'Ages 11–13', url: '/age-groups/ages-11-13/' },
          { name: 'Ages 14–16', url: '/age-groups/ages-14-16/' }
          // Future expansion reserved (e.g. Adults 40+, Adults 50+, Seniors 60+)
        ]
      },
      {
        name: 'LEARNING PATHS',
        url: '/learning-paths/',
        dropdown: [
          { name: 'Learning Paths Overview', url: '/learning-paths/' },
          { name: 'Beginner Digital Skills', url: '/learning-paths/beginner-digital-skills/' },
          { name: 'Intermediate Digital Skills', url: '/learning-paths/intermediate-digital-skills/' },
          { name: 'Advanced Digital Skills', url: '/learning-paths/advanced-digital-skills/' }
        ]
      },
      {
        name: 'RESOURCES',
        url: '/resources/',
        dropdown: [
          { name: 'Resources Overview', url: '/resources/' },
          { name: 'AI Tools', url: '/resources/ai-tools/' },
          { name: 'Typing Practice', url: '/resources/typing-practice/' },
          { name: 'Worksheets', url: '/resources/worksheets/' },
          { name: 'Parent Guides', url: '/resources/parent-guides/' },
          { name: 'Digital Skills Checklist', url: '/resources/digital-skills-checklist/' },
          { name: 'Cyber Safety Guide', url: '/resources/cyber-safety-guide/' },
          { name: 'Free Mini Courses', url: '/resources/free-mini-courses/' },
          { name: 'AI Prompt Guide', url: '/resources/ai-prompt-guide/' },
          { name: 'CBSE Resources', url: '/resources/cbse-resources/' }
        ]
      },
      {
        name: 'BLOG',
        url: '/blog/',
        dropdown: [
          { name: 'Blog Overview', url: '/blog/' },
          { name: 'AI for Kids', url: '/blog/ai-for-kids/' },
          { name: 'Digital Skills', url: '/blog/digital-skills/' },
          { name: 'Screen Time', url: '/blog/screen-time/' },
          { name: 'Productivity Skills', url: '/blog/productivity-skills/' },
          { name: 'Coding for Kids', url: '/blog/coding-for-kids/' },
          { name: 'Internet Safety', url: '/blog/internet-safety/' },
          { name: 'School Education', url: '/blog/school-education/' },
          { name: 'STEM Learning', url: '/blog/stem-learning/' },
          { name: 'AI vs Coding', url: '/blog/ai-vs-coding/' },
          { name: 'Coding vs Digital Skills', url: '/blog/coding-vs-digital-skills/' }
        ]
      },
      {
        name: 'PARENT HUB',
        url: '/parent-hub/',
        dropdown: [
          { name: 'Parent Hub Overview', url: '/parent-hub/' },
          { name: 'Screen Time Guide', url: '/parent-hub/screen-time-guide/' },
          { name: 'AI Safety for Kids', url: '/parent-hub/ai-safety-for-kids/' },
          { name: 'Digital Parenting', url: '/parent-hub/digital-parenting/' },
          { name: 'Internet Safety', url: '/parent-hub/internet-safety/' },
          { name: 'Future Skills Guide', url: '/parent-hub/future-skills-guide/' },
          { name: 'Learning Tips', url: '/parent-hub/learning-tips/' }
        ]
      },
      {
        name: 'SCHOOLS',
        url: '/schools/',
        dropdown: [
          { name: 'Workshops', url: '/schools/workshops/' },
          { name: 'School Programs', url: '/schools/school-programs/' },
          { name: 'Partner With Us', url: '/schools/partner-with-us/' },
          { name: 'CSR Programs', url: '/schools/csr-programs/' },
          { name: 'School Partnerships', url: '/schools/school-partnerships/' },
          { name: 'Principal Pitch', url: '/schools/principal-pitch/' },
          { name: 'Teacher Training', url: '/schools/teacher-training/' },
          { name: 'Case Studies', url: '/schools/case-studies/' },
          { name: 'Book School Demo', url: '/schools/book-school-demo/' }
        ]
      },
      {
        name: 'PROJECTS',
        url: '/projects/',
        dropdown: [
          { name: 'Projects Overview', url: '/projects/' },
          { name: 'Coding & Games', url: '/projects/coding-and-games/' },
          { name: 'Student Presentations', url: '/projects/student-presentations/' },
          { name: 'AI Projects', url: '/projects/ai-projects/' },
          { name: 'Certificates', url: '/projects/certificates/' },
          { name: 'Excel Projects', url: '/projects/excel-projects/' },
          { name: 'Portfolio Projects', url: '/projects/portfolio-projects/' }
        ]
      },
      {
        name: 'COMPARE',
        url: '/compare/',
        dropdown: [
          { name: 'Compare Overview', url: '/compare/' },
          { name: 'Coding vs Digital Skills', url: '/compare/coding-vs-digital-skills/' },
          { name: 'AI vs Coding', url: '/compare/ai-vs-coding/' },
          { name: 'Online vs Offline Learning', url: '/compare/online-vs-offline-learning/' },
          { name: 'SkillNest vs Traditional Classes', url: '/compare/skillnest-vs-traditional-computer-classes/' },
          { name: 'Group vs 1-to-1 Learning', url: '/compare/group-vs-1-to-1-learning/' },
          { name: 'Excel vs AI Tools', url: '/compare/excel-vs-ai-tools/' }
        ]
      },
      {
        name: 'TOOLS',
        url: '/tools/',
        dropdown: [
          { name: 'Tools Overview', url: '/tools/' },
          { name: 'Typing Speed Test', url: '/tools/typing-speed-test/' },
          { name: 'Password Strength Checker', url: '/tools/password-strength-checker/' },
          { name: 'AI Prompt Generator', url: '/tools/ai-prompt-generator/' },
          { name: 'Digital Readiness Quiz', url: '/tools/digital-readiness-quiz/' },
          { name: 'Productivity Calculator', url: '/tools/productivity-calculator/' }
        ]
      },
      {
        name: 'CONTACT',
        url: '/contact/',
        dropdown: [
          { name: 'Contact Us', url: '/contact/' },
          { name: 'Book Demo', url: '/contact/book-demo.html' },
          { name: 'WhatsApp Support', url: '/contact/whatsapp.html' },
          { name: 'Support Center', url: '/contact/support.html' }
        ]
      },
      {
        name: 'LEGAL',
        url: '/legal/privacy-policy.html',
        dropdown: [
          { name: 'Privacy Policy', url: '/legal/privacy-policy.html' },
          { name: 'Terms & Conditions', url: '/legal/terms-and-conditions.html' },
          { name: 'Disclaimer', url: '/legal/disclaimer.html' },
          { name: 'Refund Policy', url: '/legal/refund-policy.html' }
        ]
      }
    ],
    cta: {
      name: 'BOOK FREE DEMO',
      url: '/contact/book-demo.html'
    }
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = config;
  } else {
    window.NAV_CONFIG = config;
  }
})();
