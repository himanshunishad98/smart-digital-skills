/**
 * global-data.js — Global Config Data Injector for SkillNest
 * Automatically injects centralized SITE_CONFIG values into HTML elements.
 * Provides helper functions and standardizes class injectors.
 */

// Helper functions as requested
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerText = value;
}

function setHref(id, value) {
  const el = document.getElementById(id);
  if (el) el.href = value;
}

function setHTML(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = value;
}

(function () {
  'use strict';

  function injectGlobalValues() {
    const config = window.SITE_CONFIG;
    if (!config) {
      console.warn("SITE_CONFIG not found in global-data.js. Skipping injection.");
      return;
    }

    const cleanPhone = config.PHONE.replace(/[^\d+]/g, '');

    // 1. Inject by standardized classes
    document.querySelectorAll(".phone-number").forEach(el => {
      el.innerText = config.PHONE;
      if (el.tagName === 'A') el.href = `tel:${cleanPhone}`;
    });

    document.querySelectorAll(".whatsapp-link").forEach(el => {
      el.href = `https://wa.me/${config.WHATSAPP}?text=Hi%2C%20I%20want%20details%20about%20Smart%20Digital%20Skills%20Program.`;
      // Preserve custom inner icon structure if it exists, otherwise set text
      if (el.innerHTML.trim() === '' || el.innerHTML.trim() === '#') {
        el.innerText = config.SUPPORT_TEXT;
      }
    });

    document.querySelectorAll(".email-address").forEach(el => {
      el.innerText = config.EMAIL;
      if (el.tagName === 'A') el.href = `mailto:${config.EMAIL}`;
    });

    document.querySelectorAll(".current-price").forEach(el => {
      el.innerText = config.CURRENT_PRICE;
    });

    document.querySelectorAll(".original-price").forEach(el => {
      el.innerText = config.ORIGINAL_PRICE;
    });

    document.querySelectorAll(".brand-name").forEach(el => {
      if (el.closest('a.logo.ref-style-1iq1zl')) {
        return;
      }
      el.innerText = config.BRAND_NAME;
    });

    document.querySelectorAll(".address-text").forEach(el => {
      el.innerText = `${config.ADDRESS}, ${config.CITY}, ${config.STATE}, ${config.COUNTRY}`;
    });

    document.querySelectorAll(".registration-fees").forEach(el => {
      el.innerText = config.REGISTRATION_FEES;
    });

    document.querySelectorAll(".working-hours").forEach(el => {
      el.innerText = config.WORKING_HOURS;
    });

    document.querySelectorAll(".instagram-link").forEach(el => {
      if (el.tagName === 'A') el.href = config.INSTAGRAM;
    });

    document.querySelectorAll(".facebook-link").forEach(el => {
      if (el.tagName === 'A') el.href = config.FACEBOOK;
    });

    document.querySelectorAll(".cta-primary").forEach(el => {
      if (el.innerText.trim() === '' || el.getAttribute('data-inject') === 'true') {
        el.innerText = config.CTA_TEXT;
      }
    });

    document.querySelectorAll(".website-url").forEach(el => {
      el.innerText = config.WEBSITE;
      if (el.tagName === 'A') el.href = config.WEBSITE;
    });

    // 2. Dynamic footer & form elements replacement (reusing data attributes)
    document.querySelectorAll('[data-config]').forEach(el => {
      const key = el.getAttribute('data-config');
      const mapping = {
        mobile: config.PHONE,
        email: config.EMAIL,
        address: `${config.ADDRESS}, ${config.CITY}, ${config.STATE}, ${config.COUNTRY}`,
        workingHours: config.WORKING_HOURS,
        actualPrice: config.ORIGINAL_PRICE,
        currentPrice: config.CURRENT_PRICE,
        specialOfferPrice: config.CURRENT_PRICE,
        registrationFees: config.REGISTRATION_FEES,
        tagline: config.BRAND_NAME,
        copyrightText: `© ${new Date().getFullYear()} ${config.BRAND_NAME}. All Rights Reserved.`,
        ctaText: config.CTA_TEXT,
        batchName: (window.CONFIG && window.CONFIG.batchName) || (config.CURRENT_MONTH + " 2026 Batch"),
        currentMonth: config.CURRENT_MONTH
      };
      if (mapping[key] !== undefined) {
        el.innerText = mapping[key];
      }
    });

    // Inject per-course prices via data-course-price="<slug>" attribute
    document.querySelectorAll('[data-course-price]').forEach(el => {
      const slug = el.getAttribute('data-course-price');
      const price = config.COURSE_PRICES && config.COURSE_PRICES[slug];
      if (price) el.innerText = price;
    });

    document.querySelectorAll('[data-config-href]').forEach(el => {
      const key = el.getAttribute('data-config-href');
      if (key === 'mobile') {
        el.href = `tel:${cleanPhone}`;
      } else if (key === 'whatsapp') {
        el.href = `https://wa.me/${config.WHATSAPP}?text=Hi%2C%20I%20want%20details%20about%20Smart%20Digital%20Skills%20Program.`;
      } else if (key === 'email') {
        el.href = `mailto:${config.EMAIL}?subject=Digital%20Learning%20Program%20Inquiry&body=I%20want%20details%20about%20digital%20learning%20program.`;
      }
    });

    // 3. Dynamic Meta Tags injection
    const originalBrand = "Smart Digital Skills";
    document.title = document.title.replace(new RegExp(originalBrand, 'g'), config.BRAND_NAME);
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      let descContent = metaDesc.getAttribute('content') || '';
      
      const legacyNums = (config.LEGACY_PHONES || ["8827731006", "7987605097"]).concat([config.PHONE]);
      const legacyRegexParts = legacyNums.map(num => {
        const digits = num.replace(/\D/g, '').slice(-10);
        if (digits.length === 10) {
          return `(?:\\+91[ -]?)?${digits.slice(0, 5)}[ -]?${digits.slice(5)}`;
        }
        return num.replace(/\+/g, '\\+');
      });
      const phoneRegex = new RegExp(legacyRegexParts.join('|'), 'g');

      descContent = descContent
        .replace(new RegExp(originalBrand, 'g'), config.BRAND_NAME)
        .replace(phoneRegex, config.PHONE)
        .replace(/₹3,499/g, config.CURRENT_PRICE)
        .replace(/₹3,000/g, config.CURRENT_PRICE);
      metaDesc.setAttribute('content', descContent);
    }

    document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]').forEach(el => {
      let content = el.getAttribute('content') || '';
      if (content) {
        content = content.replace(new RegExp(originalBrand, 'g'), config.BRAND_NAME);
        el.setAttribute('content', content);
      }
    });

    // 4. Dynamic Schema JSON Injection
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => {
      try {
        let jsonText = el.innerText;
        jsonText = jsonText
          .replace(/CONFIG_TELEPHONE/g, config.PHONE)
          .replace(/CONFIG_EMAIL/g, config.EMAIL)
          .replace(/CONFIG_CITY/g, config.CITY)
          .replace(/CONFIG_STATE/g, config.STATE)
          .replace(/CONFIG_COUNTRY_CODE/g, "IN")
          .replace(/CONFIG_BRAND_NAME/g, config.BRAND_NAME)
          .replace(/CONFIG_INSTAGRAM/g, config.INSTAGRAM)
          .replace(/"telephone"\s*:\s*"[^"]*"/g, `"telephone": "${config.PHONE}"`)
          .replace(/"email"\s*:\s*"[^"]*"/g, `"email": "${config.EMAIL}"`)
          .replace(new RegExp(originalBrand, 'g'), config.BRAND_NAME)
          .replace(/Smart Digital Skills/g, config.BRAND_NAME);
        el.innerText = jsonText;
      } catch (err) {
        console.error("Error updating schema JSON:", err);
      }
    });

    // 4b. Dynamic Organization Schema Injection (to avoid hardcoding it in HTML files)
    try {
      const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${config.WEBSITE}/#organization`,
        "name": `${config.BRAND_NAME} - Smart Digital Skills`,
        "alternateName": config.BRAND_NAME,
        "url": `${config.WEBSITE}/`,
        "logo": {
          "@type": "ImageObject",
          "url": `${config.WEBSITE}/assets/founder.jpeg`,
          "width": 400,
          "height": 400
        },
        "description": "India's premier online digital skills program for Class 6–8 students, covering AI basics, Coding Program, MS Office, and cyber safety.",
        "telephone": config.PHONE,
        "email": config.EMAIL,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": config.CITY,
          "addressRegion": config.STATE,
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://linkedin.com/company/skillnest",
          config.INSTAGRAM
        ]
      };

      const orgScript = document.createElement('script');
      orgScript.type = 'application/ld+json';
      orgScript.id = 'dynamic-organization-schema';
      orgScript.text = JSON.stringify(orgSchema, null, 2);
      
      const existing = document.getElementById('dynamic-organization-schema');
      if (existing) existing.remove();
      
      document.head.appendChild(orgScript);
    } catch (err) {
      console.error("Error injecting dynamic Organization schema:", err);
    }
  }

  // Load immediately or wait for DOM depending on state
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectGlobalValues);
  } else {
    injectGlobalValues();
  }
})();
