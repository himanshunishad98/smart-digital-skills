/**
 * post-process.js
 * Performs structural refactoring on all HTML files in the project:
 *   1. Eliminates the Curriculum section entirely.
 *   2. Removes curriculum references and links from header, footer, and navigation.
 *   3. Removes "View All Outcomes" button, makes hidden outcome cards visible, and ensures CTA points to /demo.html.
 *   4. Removes "View All Projects" button, makes hidden project cards visible, and ensures CTA points to /student-projects.html.
 *   5. Removes "View All Blog" links from learning-resources section.
 *   6. Removes the entire student-outcomes-hub section.
 *   7. Keeps all links and assets root-relative (does NOT translate them to relative paths).
 */
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const ROOT = path.join(__dirname, '../');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'css' && file !== 'js' && file !== 'assets' && file !== 'scripts') {
        getFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allHtmlFiles = getFiles(ROOT);
console.log(`Found ${allHtmlFiles.length} HTML files to post-process.`);

allHtmlFiles.forEach(fp => {
  const relPath = path.relative(ROOT, fp).replace(/\\/g, '/');
  let html = fs.readFileSync(fp, 'utf8');
  const $ = cheerio.load(html, { decodeEntities: false });
  let changed = false;

  // 1. ELIMINATE CURRICULUM SECTION
  if ($('.curriculum-section').length || $('#curriculum').length) {
    $('.curriculum-section').remove();
    $('#curriculum').remove();
    changed = true;
  }
  
  // Remove curriculum links from navigation / footer
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (href && (href.includes('#curriculum') || href.includes('curriculum-section') || href.includes('index.html#curriculum') || href.includes('/index.html#curriculum'))) {
      const li = $(el).closest('li');
      if (li.length) {
        li.remove();
      } else {
        $(el).remove();
      }
      changed = true;
    }
  });
  
  // 2. CLEAN OUTCOMES SECTION (Remove "View All Outcomes" button, show cards, set demo CTA)
  const outcomesSection = $('.outcomes-section');
  if (outcomesSection.length) {
    // Remove the button
    outcomesSection.find('button').each((j, btn) => {
      const onclick = $(btn).attr('onclick') || '';
      if (onclick.includes('hidden-toggle-outcomes') || $(btn).text().includes('View All Outcomes')) {
        const btnEl = $(btn);
        if (btnEl.next().is('br')) {
          btnEl.next().remove();
        }
        btnEl.remove();
        changed = true;
      }
    });

    // Make all outcome cards visible
    outcomesSection.find('.hidden-toggle-outcomes').each((j, card) => {
      $(card).css('display', '');
      $(card).removeClass('hidden-toggle-outcomes');
      changed = true;
    });

    // Ensure CTA link goes to /demo.html (root-relative)
    outcomesSection.find('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && (href === '#demo' || href === '#enroll' || href.endsWith('/demo.html') || href === '/demo.html' || href === 'demo.html' || href.includes('demo.html'))) {
        $(el).attr('href', '/demo.html');
        changed = true;
      }
    });
  }
  
  // 3. CLEAN PROJECTS SECTION (Remove "View All Projects" button, show cards, set gallery link)
  const projectsSection = $('.projects-section');
  if (projectsSection.length) {
    // Remove "View All Projects" button
    projectsSection.find('button').each((j, btn) => {
      const onclick = $(btn).attr('onclick') || '';
      if (onclick.includes('hidden-toggle-projects') || $(btn).text().includes('View All Projects')) {
        $(btn).remove();
        changed = true;
      }
    });

    // Make all project cards visible
    projectsSection.find('.hidden-toggle-projects').each((j, card) => {
      $(card).css('display', '');
      $(card).removeClass('hidden-toggle-projects');
      changed = true;
    });

    // Check CTA container and ensure only gallery link remains pointing to /projects/
    let hasGalleryLink = false;
    projectsSection.find('a').each((i, el) => {
      const href = $(el).attr('href') || '';
      const text = $(el).text();
      if (text.includes('Project Gallery') || href.includes('student-projects.html') || href.includes('/projects/')) {
        $(el).attr('href', '/projects/');
        hasGalleryLink = true;
        changed = true;
      }
    });

    // Remove any leftover text-center button wrappers and add clean link wrapper if needed
    let ctaBlock = projectsSection.find('.text-center');
    ctaBlock.each((i, el) => {
      // If there are buttons in the text-center div, remove them
      const buttons = $(el).find('button');
      if (buttons.length) {
        buttons.remove();
        changed = true;
      }
    });

    if (!hasGalleryLink) {
      const ctaHtml = `
      <div class="text-center" style="margin-top:30px; display:flex; flex-direction:column; align-items:center; gap:15px; width:100%;">
        <a href="/projects/" style="color:var(--blue-600); font-weight:bold;">Go to Project Gallery →</a>
      </div>
      `;
      projectsSection.find('.container').append(ctaHtml);
      changed = true;
    }
  }

  // 4. CLEAN LEARNING-RESOURCES SECTION (Remove "View All Blog" links)
  const learningResources = $('.learning-resources');
  if (learningResources.length) {
    learningResources.find('a').each((j, el) => {
      const text = $(el).text().trim();
      const href = $(el).attr('href') || '';
      if ((text.includes('View All Blog') || text.includes('View All Blogs')) && href.includes('blog')) {
        const parent = $(el).parent();
        if (parent.hasClass('text-center') && parent.children().length <= 1) {
          parent.remove();
        } else {
          $(el).remove();
        }
        changed = true;
      }
    });
  }

  // 5. REMOVE STUDENT-OUTCOMES-HUB SECTION
  if ($('.student-outcomes-hub').length || $('#student-outcomes-hub').length) {
    $('.student-outcomes-hub').remove();
    $('#student-outcomes-hub').remove();
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(fp, $.html(), 'utf8');
  }
});

console.log('✅ Post-processing complete! All HTML files are clean and root-relative.');
