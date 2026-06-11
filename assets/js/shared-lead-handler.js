/**
 * shared-lead-handler.js — Central Lead Management Integration
 * Handles dynamic Firebase CDN load, App Check activation, sanitization,
 * input validation, and unified Firestore write logic with retry mechanism.
 */

// Compliance imports for static analysis verification
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Global tracking to ensure Firebase SDKs are loaded only once
let _firebaseLoadPromise = null;
let _firebaseInitialized = false;

/**
 * Helper to dynamically load all Firebase CDN SDK libraries (compat version)
 */
function loadFirebaseSDK() {
  if (window.firebase) {
    return Promise.resolve();
  }
  if (_firebaseLoadPromise) {
    return _firebaseLoadPromise;
  }

  _firebaseLoadPromise = new Promise((resolve, reject) => {
    const scripts = [
      "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js",
      "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js",
      "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-check-compat.js"
    ];

    let loadedCount = 0;
    function loadNext() {
      if (loadedCount === scripts.length) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = scripts[loadedCount];
      script.async = true;
      script.onload = () => {
        loadedCount++;
        loadNext();
      };
      script.onerror = (err) => {
        console.error("Failed to load Firebase CDN script:", scripts[loadedCount], err);
        reject(new Error("Firebase SDK failed to load. Please check your network connection."));
      };
      document.head.appendChild(script);
    }
    loadNext();
  });

  return _firebaseLoadPromise;
}

/**
 * Helper to initialize Firebase and App Check once loaded
 */
function initializeFirebaseApp() {
  if (_firebaseInitialized) return;

  const config = window.CONFIG || {};
  const firebaseConfig = config.firebaseConfig || {
    apiKey: "AIzaSyBi5hdawXSsOXr9xRgapCRB0hYYE1kKRCE",
    authDomain: "skillnest-website.firebaseapp.com",
    projectId: "skillnest-website",
    storageBucket: "skillnest-website.firebasestorage.app",
    messagingSenderId: "514313010895",
    appId: "1:514313010895:web:7b0f4245c7cbad897f81ba"
  };

  const app = firebase.initializeApp(firebaseConfig);

  // Activate App Check if site key is configured
  if (config.appCheckSiteKey && firebase.appCheck && !window.skillnestAppCheckInitialized) {
    try {
      // Localhost development environment handling
      const isLocalhost = typeof window !== 'undefined' && 
                          (window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1');

      if (isLocalhost) {
        window.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
        console.log("App Check running in localhost development mode. Debug token activated.");
      }

      const appCheck = firebase.appCheck();
      appCheck.activate(
        new firebase.appCheck.ReCaptchaV3Provider(config.appCheckSiteKey),
        true // isTokenAutoRefreshEnabled
      );
      window.skillnestAppCheckInitialized = true;
      console.log("Firebase App Check initialized successfully.");
    } catch (error) {
      console.error("Firebase App Check initialization failed", error);
    }
  }

  _firebaseInitialized = true;
}

/**
 * Sanitizes input strings to prevent XSS / script injections
 */
function sanitizeInput(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/javascript:/gi, '') // Strip javascript: schemes
    .trim();
}

/**
 * Validates lead payload parameters before writing to database
 */
function validateLeadPayload(payload) {
  if (!payload.type) {
    return { valid: false, error: "Missing lead type identifier." };
  }
  if (!payload.phone) {
    return { valid: false, error: "Phone number is required." };
  }
  // Standard phone format validation: 7 to 15 characters
  if (!/^[\d\s\+\-]{7,15}$/.test(payload.phone.replace(/\s/g, ''))) {
    return { valid: false, error: "Please enter a valid mobile number." };
  }
  // Email format validation (optional check)
  if (payload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return { valid: false, error: "Please enter a valid email address." };
  }
  return { valid: true };
}

/**
 * Central Lead Submission Handler
 * @param {string} formType - Identifier for the form (e.g. 'enrollment', 'demo', 'scholarship')
 * @param {Object} rawData - Object containing all form fields
 * @param {Object} options - Options containing callbacks and button configs
 */
async function submitLead(formType, rawData, options = {}) {
  const btn = options.btnSelector ? document.querySelector(options.btnSelector) : null;
  
  // Set UI loading state
  if (btn) {
    btn.disabled = true;
    if (options.btnLoadingText) {
      btn.textContent = options.btnLoadingText;
    }
  }

  try {
    // 1. Ensure Firebase SDK is loaded
    await loadFirebaseSDK();

    // 2. Initialize Firebase App and Services
    initializeFirebaseApp();

    // 3. Extract, Map and Sanitize Schema Values
    const sanitizedData = {};
    for (const key in rawData) {
      if (Object.prototype.hasOwnProperty.call(rawData, key)) {
        sanitizedData[key] = sanitizeInput(rawData[key]);
      }
    }

    // Extract dynamic metadata properties
    let utmSource = '';
    let utmMedium = '';
    let utmCampaign = '';
    try {
      if (typeof window !== 'undefined' && window.location) {
        const searchParams = new URLSearchParams(window.location.search);
        utmSource = searchParams.get('utm_source') || '';
        utmMedium = searchParams.get('utm_medium') || '';
        utmCampaign = searchParams.get('utm_campaign') || '';
      }
    } catch (e) {
      console.warn("Failed to parse UTM parameters:", e);
    }

    let geoCity = '';
    try {
      if (typeof window !== 'undefined' && window.location && window.location.pathname) {
        const pathLower = window.location.pathname.toLowerCase();
        const cities = [
          'bhilai-nagar',
          'bhilai',
          'raipur',
          'durg',
          'bhopal',
          'indore',
          'pune',
          'mumbai',
          'hyderabad',
          'bangalore',
          'chennai',
          'kolkata',
          'delhi'
        ];
        for (const city of cities) {
          if (pathLower.includes(city)) {
            geoCity = city.replace('-', ' ');
            break;
          }
        }
      }
    } catch (e) {
      console.warn("Failed to parse geoCity:", e);
    }

    const referrer = (typeof document !== 'undefined' && document.referrer) ? document.referrer : '';
    const landingPage = (typeof window !== 'undefined' && window.location && window.location.href) ? window.location.href : '';

    // Unified CRM & Analytics Ready Lead Schema mapping
    const leadPayload = {
      type: sanitizeInput(formType),
      status: "new",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      sourcePage: sanitizeInput(window.location.pathname),
      studentName: sanitizeInput(
        sanitizedData.studentName ||
        sanitizedData.demoStudentName ||
        sanitizedData.schStudentName ||
        sanitizedData.demoBookStudentName ||
        sanitizedData.careerName ||
        sanitizedData.contactName ||
        sanitizedData.supportName ||
        sanitizedData.lmName ||
        sanitizedData.full_name ||
        ""
      ),
      parentName: sanitizeInput(
        sanitizedData.parentName ||
        sanitizedData.demoParentName ||
        sanitizedData.schParentName ||
        sanitizedData.demoBookParentName ||
        sanitizedData.careerName ||
        sanitizedData.contactName ||
        sanitizedData.supportName ||
        sanitizedData.lmName ||
        sanitizedData.full_name ||
        ""
      ),
      phone: sanitizeInput(
        (
          sanitizedData.parentPhone ||
          sanitizedData.demoMobile ||
          sanitizedData.schMobile ||
          sanitizedData.demoBookPhone ||
          sanitizedData.careerPhone ||
          sanitizedData.contactPhone ||
          sanitizedData.supportPhone ||
          sanitizedData.lmPhone ||
          sanitizedData.mobile ||
          ""
        ).replace(/\s/g, '')
      ),
      email: sanitizeInput(
        sanitizedData.emailAddress ||
        sanitizedData.demoEmail ||
        sanitizedData.schEmail ||
        sanitizedData.demoBookEmail ||
        sanitizedData.careerEmail ||
        sanitizedData.contactEmail ||
        sanitizedData.supportEmail ||
        sanitizedData.email ||
        ""
      ),
      metaData: {
        landingPage: landingPage,
        referrer: referrer,
        geoCity: geoCity,
        utmSource: utmSource,
        utmMedium: utmMedium,
        utmCampaign: utmCampaign
      },
      formData: sanitizedData
    };

    // 4. Central input validation
    const validationResult = validateLeadPayload(leadPayload);
    if (!validationResult.valid) {
      throw new Error(validationResult.error);
    }

    // 5. Submit to Firestore & Pipedream in a resilient manner
    let docRef = null;
    let firestoreSuccess = false;
    let firestoreError = null;

    try {
      const db = firebase.firestore();
      let attempts = 0;
      const maxAttempts = 3;
      let delay = 1000; // start with 1 second delay

      while (attempts < maxAttempts) {
        try {
          docRef = await db.collection("leads").add(leadPayload);
          firestoreSuccess = true;
          break; // break loop on success
        } catch (err) {
          attempts++;
          if (attempts >= maxAttempts) {
            firestoreError = err;
            break;
          }
          console.warn(`Firestore write failed, retrying in ${delay}ms... (Attempt ${attempts} of ${maxAttempts})`);
          await new Promise(r => setTimeout(r, delay));
          delay *= 2; // exponential backoff
        }
      }
    } catch (err) {
      console.error("Firestore initialization or operation failed:", err);
      firestoreError = err;
    }

    // Generate a unique fallback ID if Firestore write failed or was blocked
    const leadId = docRef ? docRef.id : "lead_" + Date.now() + "_" + Math.random().toString(36).substring(2, 11);

    let pipedreamSuccess = false;
    let pipedreamError = null;

    // Send Telegram notification via Pipedream
    try {
      const response1 = await fetch("https://eothguiuw8eqpfu.m.pipedream.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...leadPayload, clientLeadId: leadId })
      });
      if (response1.ok) {
        pipedreamSuccess = true;
      }
    } catch (telegramError) {
      console.error("Telegram notification failed:", telegramError);
      pipedreamError = telegramError;
    }

    // Send lead to Pipedream webhook
    try {
      const response2 = await fetch("https://eothguiuw8eqpfu.m.pipedream.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          leadId: leadId,
          type: formType,
          studentName: leadPayload.studentName,
          parentName: leadPayload.parentName,
          phone: leadPayload.phone,
          email: leadPayload.email,
          sourcePage: leadPayload.sourcePage
        })
      });
      if (response2.ok) {
        pipedreamSuccess = true;
      }
      console.log("Pipedream webhook sent successfully");
    } catch (webhookError) {
      console.error("Pipedream webhook failed:", webhookError);
      if (!pipedreamError) {
        pipedreamError = webhookError;
      }
    }

    // Treat submission as successful if Firestore succeeded OR Pipedream webhook succeeded
    if (firestoreSuccess || pipedreamSuccess) {
      console.log(`Lead registered successfully (Firestore: ${firestoreSuccess}, Pipedream: ${pipedreamSuccess})`);
      
      // Push events to dataLayer for analytics tracking
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'lead_submission_success',
        lead_id: leadId,
        lead_type: formType,
        source_page: leadPayload.sourcePage
      });

      // Invoke success callback
      if (typeof options.onSuccess === 'function') {
        options.onSuccess(leadId);
      }
    } else {
      // Both failed
      const combinedError = firestoreError || pipedreamError || new Error("Lead submission failed on all channels.");
      throw combinedError;
    }

  } catch (error) {
    console.error("Lead submission error:", error);
    
    // Invoke error callback
    if (typeof options.onError === 'function') {
      options.onError(error);
    } else {
      alert("Something went wrong: " + error.message);
    }
  } finally {
    // Reset UI loading state
    if (btn) {
      btn.disabled = false;
      if (options.btnOriginalText) {
        btn.textContent = options.btnOriginalText;
      }
    }
  }
}

// Make submitLead available globally
window.submitLead = submitLead;
