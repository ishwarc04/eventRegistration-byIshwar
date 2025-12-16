// ===== FIREBASE CONFIGURATION =====
// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Firebase configuration object
// REPLACE WITH YOUR FIREBASE CONFIG

  const firebaseConfig = {
    apiKey: "AIzaSyD59lqW6y2UUMQTRzyCxv9NB4fwGwEFB24",
    authDomain: "vishwashauryam-vit.firebaseapp.com",
    projectId: "vishwashauryam-vit",
    storageBucket: "vishwashauryam-vit.firebasestorage.app",
    messagingSenderId: "454201610840",
    appId: "1:454201610840:web:ea038fba38daa9876c302d",
    measurementId: "G-FCCFG6L4Y5"
  };





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ===== FORM HANDLING =====
const registrationForm = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const messageDiv = document.getElementById('message');

// Form submission handler
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>PROCESSING...</span>';
    
    // Clear previous messages
    messageDiv.className = 'message';
    messageDiv.style.display = 'none';
    
    try {
        // Sign in anonymously for write access
        await signInAnonymously(auth);
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            college: document.getElementById('college').value.trim(),
            branch: document.getElementById('branch').value.trim(),
            year: document.getElementById('year').value,
            ticketType: document.getElementById('ticketType').value,
            specialRequirements: document.getElementById('requirements').value.trim(),
            registeredAt: serverTimestamp(),
            status: 'pending'
        };
        
        // Validate form data
        if (!validateFormData(formData)) {
            throw new Error('Please fill all required fields correctly.');
        }
        
        // Add document to Firestore
        const docRef = await addDoc(collection(db, 'registrations'), formData);
        
        // Show success message
        showMessage('success', `Registration successful! Your registration ID is: ${docRef.id.substring(0, 8).toUpperCase()}`);
        
        // Show success banner
        showSuccessBanner();
        
        // Reset form
        registrationForm.reset();
        
    } catch (error) {
        console.error('Registration error:', error);
        showMessage('error', `Registration failed: ${error.message}`);
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>REGISTER NOW</span>';
    }
});

// ===== VALIDATION FUNCTIONS =====
function validateFormData(data) {
    // Check required fields
    if (!data.name || !data.email || !data.phone || !data.college || 
        !data.branch || !data.year || !data.ticketType) {
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    // Validate phone number (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(data.phone)) {
        return false;
    }
    
    return true;
}

// ===== UI HELPER FUNCTIONS =====
function showMessage(type, text) {
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    messageDiv.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// ===== PHONE NUMBER INPUT FORMATTING =====
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    // Remove non-numeric characters
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    
    // Limit to 10 digits
    if (e.target.value.length > 10) {
        e.target.value = e.target.value.slice(0, 10);
    }
});

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Log initialization
    console.log('Vishwashauryam Defence Club - Registration System Initialized');
});

// ===== NAVIGATION FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// ===== SUCCESS BANNER FUNCTIONALITY =====
function showSuccessBanner() {
    const banner = document.getElementById('successBanner');
    const body = document.body;
    
    if (banner) {
        banner.classList.add('show');
        body.style.paddingTop = '150px'; // Adjust for banner height
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            closeBanner();
        }, 8000);
    }
}

function closeBanner() {
    const banner = document.getElementById('successBanner');
    const body = document.body;
    
    if (banner) {
        banner.classList.remove('show');
        body.style.paddingTop = '100px'; // Reset to normal header height
    }
}

// Make closeBanner available globally
window.closeBanner = closeBanner;