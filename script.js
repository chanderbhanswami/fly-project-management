// Splash Screen functionality

window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const logo = document.querySelector(".splash-logo");
  const mainContent = document.querySelector(".main-container");

  setTimeout(() => {
    logo.classList.add("scale-up");
  }, 2000);
  behavior: 'smooth';

  setTimeout(() => {
    splash.style.opacity = "0";
    splash.style.pointerEvents = "none";
    setTimeout(() => {
      splash.style.display = "none";
      mainContent.style.opacity = "1";
    }, 1000);
    behavior: 'smooth';
  }, 2000);
  behavior: 'smooth';
});


// Password visibility toggle functionality
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const toggleIcon = document.querySelector('.toggle-password-icon');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.classList.remove('fa-eye-slash');
    toggleIcon.classList.add('fa-eye');
  } else {
    passwordInput.type = 'password';
    toggleIcon.classList.remove('fa-eye');
    toggleIcon.classList.add('fa-eye-slash');
  }
}


// Login Form Validation and Registration Functionality

document.addEventListener('DOMContentLoaded', function() {
    try {
        emailjs.init("xMgve__SZ9gqc6m_5");
        console.log("EmailJS initialized successfully");
    } catch (error) {
        console.error("EmailJS initialization failed:", error);
    }
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateName(name) {
    return name.trim().length >= 2;
}

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    input.style.borderColor = '#ff4757';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4757';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '4px';
    errorDiv.style.marginBottom = '8px';
    errorDiv.style.lineHeight = '1.2';
    
    if (inputId === 'password') {
        const passwordContainer = input.parentNode;
        const nextElement = passwordContainer.nextElementSibling;
        if (nextElement) {
            passwordContainer.parentNode.insertBefore(errorDiv, nextElement);
        } else {
            passwordContainer.parentNode.appendChild(errorDiv);
        }
    } else {
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    
    if (inputId === 'password') {
        const passwordContainer = input.parentNode;
        const errorMessage = passwordContainer.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    } else {
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    input.style.borderColor = '#ccc';
}

function clearAllErrors() {
    ['name', 'email', 'password', 'type'].forEach(id => {
        clearError(id);
    });
}

function sendConfirmationEmail(userData) {
    console.log("Attempting to send email with data:", userData);
    
    const templateParams = {
        to_name: userData.name,
        to_email: userData.email,
        account_type: userData.type,
        registration_date: new Date().toLocaleDateString(),
        from_name: "Fly App Team"
    };

    console.log("Template parameters:", templateParams);

    if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS library not loaded');
    }

    return emailjs.send('service_lph2db2', 'template_m3ro1ye', templateParams)
        .then(function(response) {
            console.log('✅ Email sent successfully!', response.status, response.text);
            return response;
        })
        .catch(function(error) {
            console.error('❌ Email sending failed:', error);
            console.error('Error details:', {
                name: error.name,
                message: error.message,
                text: error.text,
                status: error.status
            });
            throw error;
        });
}

function registerBtn() {
    clearAllErrors();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const type = document.getElementById('type').value;
    
    let isValid = true;
    
    if (!validateName(name)) {
        showError('name', 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }
    
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!validatePassword(password)) {
        showError('password', 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 symbol (@$!%*?&)');
        isValid = false;
    }
    
    if (!type) {
        showError('type', 'Please select an account type');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }

    if (typeof emailjs === 'undefined') {
        alert('EmailJS library not loaded. Please refresh the page and try again.');
        return;
    }
    
    const userData = {
        name: name,
        email: email,
        type: type,
        registrationDate: new Date().toISOString()
    };
    
    const registerButton = document.querySelector('.register-btn');
    const originalText = registerButton.textContent;
    
    registerButton.textContent = 'Registering...';
    registerButton.disabled = true;
    
    sendConfirmationEmail(userData)
        .then(function(response) {
            console.log('Registration successful with email confirmation');
            
            setTimeout(() => {
                alert(`✅ Registration Successful!\n\nWelcome ${name}!\nAccount type: ${type}\nConfirmation email sent to: ${email}`);
                
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                document.getElementById('type').value = '';
                
                registerButton.textContent = originalText;
                registerButton.disabled = false;
                
                console.log('User registered successfully:', userData);
            }, 1000);
        })
        .catch(function(error) {
            console.error('Email sending failed, but registration can continue');
            
            setTimeout(() => {
                let errorMessage = '';
                if (error.status === 400) {
                    errorMessage = 'Invalid email template or service configuration.';
                } else if (error.status === 401) {
                    errorMessage = 'EmailJS authentication failed. Check your service keys.';
                } else if (error.status === 402) {
                    errorMessage = 'EmailJS quota exceeded.';
                } else if (error.status === 403) {
                    errorMessage = 'EmailJS domain restriction. Check your settings.';
                } else {
                    errorMessage = `Email service error (${error.status || 'Unknown'}). Please try again.`;
                }
                
                alert(`⚠️ Registration Completed!\n\nWelcome ${name}!\nAccount type: ${type}\n\nNote: ${errorMessage}\nYou may not receive a confirmation email.`);
                
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                document.getElementById('type').value = '';
                
                registerButton.textContent = originalText;
                registerButton.disabled = false;
                
                console.log('User registered (email failed):', userData);
            }, 1000);
        });
}

// Real time Form validation
document.addEventListener('DOMContentLoaded', function() {
    
    // Form validation events
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const formContainer = document.querySelector('.signin-form-container');
    
    if (nameField) {
        nameField.addEventListener('blur', function() {
            if (this.value && !validateName(this.value)) {
                showError('name', 'Please enter a valid name (at least 2 characters)');
            } else if (this.value) {
                clearError('name');
            }
        });
    }
    
    if (emailField) {
        emailField.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                showError('email', 'Please enter a valid email address');
            } else if (this.value) {
                clearError('email');
            }
        });
    }
    
    if (passwordField) {
        passwordField.addEventListener('blur', function() {
            if (this.value && !validatePassword(this.value)) {
                showError('password', 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 symbol (@$!%*?&)');
            } else if (this.value) {
                clearError('password');
            }
        });
    }
    
    if (formContainer) {
        formContainer.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                registerBtn();
            }
        });
    }
});

// Get Started button function

function getStartedBtn() {
    document.querySelector('.signin-form-container').scrollIntoView({
        behavior: 'smooth'
    });
    
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 500);
}

// Sticky header functionality

window.addEventListener('scroll', function() {
    const stickyHeader = document.querySelector('.sticky-header');
    const heroSection = document.querySelector('.hero');
    const heroHeight = heroSection.offsetHeight;
    
    if (window.scrollY > heroHeight - 100) {
        stickyHeader.classList.add('visible');
    } else {
        stickyHeader.classList.remove('visible');
    }
});

// Navigation button functions

function homeBtn() {
    document.querySelector('.hero').scrollIntoView({
        behavior: 'smooth'
    });
}

function featuresBtn() {
    document.querySelector('.second-container').scrollIntoView({
        behavior: 'smooth'
    });
}

function reviewsBtn() {
    document.querySelector('.reviews-container').scrollIntoView({
        behavior: 'smooth'
    });
}

function pricingBtn() {
    document.querySelector('.sixth-container').scrollIntoView({
        behavior: 'smooth'
    });
}

function faqBtn() {
    document.querySelector('.faq-container').scrollIntoView({
        behavior: 'smooth'
    });
}

// Reviews Section functionality

document.addEventListener('DOMContentLoaded', function() {
    const avatars = document.querySelectorAll('.avatar');
    const reviews = document.querySelectorAll('.review-item');
    let currentIndex = 0;
    let reviewInterval;
    
    const avatarData = [
        { 
            src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face", 
            alt: "Professional headshot of Garry Alexander, a smiling Caucasian man with short brown hair, stylish eyeglasses, and a blue shirt, representing a satisfied Fly App customer testimonial", 
            index: 0 
        },
        { 
            src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face", 
            alt: "High-resolution portrait of Deborah Smith, an African-American woman with voluminous curly hair, radiant smile, and casual attire, sharing her positive Fly App review and user experience", 
            index: 1 
        },
        { 
            src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face", 
            alt: "Close-up image of Michael Johnson, a bearded man with a friendly expression, dark hair, and casual clothing, providing a genuine testimonial for Fly App's features and benefits", 
            index: 2 
        },
        { 
            src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face", 
            alt: "Detailed photo of Sarah Williams, a cheerful woman with long brown hair, bright eyes, and a welcoming smile, offering a positive review and feedback about Fly App's user-friendly interface", 
            index: 3 
        }
    ]
    
    function updateAvatarPositions() {
        const leftIndex = (currentIndex - 1 + avatarData.length) % avatarData.length;
        const centerIndex = currentIndex;
        const rightIndex = (currentIndex + 1) % avatarData.length
        
        avatars[0].src = avatarData[leftIndex].src;
        avatars[0].alt = avatarData[leftIndex].alt;
        avatars[0].dataset.index = avatarData[leftIndex].index;
        avatars[0].className = 'avatar left'
        
        avatars[1].src = avatarData[centerIndex].src;
        avatars[1].alt = avatarData[centerIndex].alt;
        avatars[1].dataset.index = avatarData[centerIndex].index;
        avatars[1].className = 'avatar center'
        
        avatars[2].src = avatarData[rightIndex].src;
        avatars[2].alt = avatarData[rightIndex].alt;
        avatars[2].dataset.index = avatarData[rightIndex].index;
        avatars[2].className = 'avatar right';
    }
    
    function switchReview(newIndex) {
        if (newIndex === currentIndex) return
        reviews[currentIndex].classList.remove('active')
        reviews[newIndex].classList.add('active')
        currentIndex = newIndex;
        updateAvatarPositions();
    }
    
    function startReviewRotation() {
        reviewInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % reviews.length;
            switchReview(nextIndex);
        }, 8000);
    }
    
    avatars.forEach((avatar) => {
        avatar.addEventListener('click', () => {
            const targetIndex = parseInt(avatar.dataset.index);
            switchReview(targetIndex);
        });
    });

    updateAvatarPositions();
    startReviewRotation();

    document.querySelector('.review-container').addEventListener('mouseenter', () => {
        clearInterval(reviewInterval);
    });

    document.querySelector('.review-container').addEventListener('mouseleave', () => {
        startReviewRotation();
    });

    document.querySelector('.profile-avatars').addEventListener('mouseenter', () => {
        clearInterval(reviewInterval);
    });

    document.querySelector('.profile-avatars').addEventListener('mouseleave', () => {
        startReviewRotation();
    });
});

function switchReview(newIndex) {
    if (newIndex === currentIndex) return;
    
    reviews[currentIndex].classList.remove('active');
    
    setTimeout(() => {
        reviews[newIndex].classList.add('active');
    }, 50);

    currentIndex = newIndex;
    updateAvatarPositions();
}

function switchReview(newIndex) {
    if (newIndex === currentIndex) return;
    
    reviews[currentIndex].classList.remove('active');
    
    setTimeout(() => {
        reviews[newIndex].classList.add('active');
    }, 50);

    currentIndex = newIndex;
    updateAvatarPositions();
}


// FAQ Accordion functionality

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item, .faq-item-open');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const icon = question.querySelector('span');
        
        question.addEventListener('click', () => {
 
            const isOpen = item.classList.contains('faq-item-open');
            

            faqItems.forEach(i => {
                i.className = 'faq-item';
                i.querySelector('span').textContent = '+';
            });

            if (!isOpen) {
                item.className = 'faq-item-open';
                icon.textContent = '-';
            }
        });
    });
});

// Navbar highlight on scroll

window.addEventListener('scroll', function() {
    const scrollPos = window.scrollY + 150;

    const sections = [
        { id: 'home', nav: 'home' },
        { id: 'features-1', nav: 'features' },
        { id: 'features-2', nav: 'features' },
        { id: 'features-3', nav: 'features' },
        { id: 'reviews', nav: 'reviews' },
        { id: 'pricing', nav: 'pricing' },
        { id: 'faq', nav: 'faq' },
    ];

    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    sections.forEach(sectionObj => {
        const section = document.getElementById(sectionObj.id);
        const navLinks = document.querySelectorAll(`.nav-link[data-target="${sectionObj.nav}"]`);
        
        if (section && navLinks.length > 0) {
            if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                navLinks.forEach(link => link.classList.add('active'));
            }
        }
    });
});

// Modal functionality for Privacy Policy and Terms of Service
function openModal(contentType) {
    const modal = document.getElementById('modal-overlay');
    const modalText = document.getElementById('modal-text');

    let content = '';

    if (contentType === 'privacy') {
        content = `
            <h2>Privacy Policy</h2>
            <p><strong>Effective Date:</strong> June 30, 2025</p>
            <p>At Fly App, we value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
            
            <h3>Information We Collect:</h3>
            <ul>
                <li>Personal details (like name and email) provided during registration.</li>
                <li>Usage data to improve app functionality.</li>
            </ul>

            <h3>How We Use Your Information:</h3>
            <ul>
                <li>To provide and improve our services.</li>
                <li>To communicate with you about your account and updates.</li>
                <li>To ensure security and prevent fraud.</li>
            </ul>

            <h3>Data Protection:</h3>
            <p>We implement industry-standard measures to safeguard your data against unauthorized access.</p>

            <h3>Your Rights:</h3>
            <p>You can request to view, update, or delete your data by contacting our support team.</p>

            <p>For questions, contact us at <a href="mailto:support@flyapp.com">support@flyapp.com</a>.</p>
        `;
    } else if (contentType === 'terms') {
        content = `
            <h2>Terms of Service</h2>
            <p><strong>Effective Date:</strong> June 30, 2025</p>
            <p>Welcome to Fly App! By using our services, you agree to the following terms and conditions:</p>

            <h3>1. Acceptance of Terms:</h3>
            <p>By accessing or using Fly App, you accept these Terms of Service.</p>

            <h3>2. User Responsibilities:</h3>
            <ul>
                <li>You agree to provide accurate and current information during registration.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            </ul>

            <h3>3. Prohibited Activities:</h3>
            <ul>
                <li>No unauthorized access or hacking attempts.</li>
                <li>No distribution of malware or harmful content.</li>
                <li>No misuse of Fly App for illegal purposes.</li>
            </ul>

            <h3>4. Service Modifications:</h3>
            <p>We reserve the right to modify or discontinue parts of the service at any time.</p>

            <h3>5. Limitation of Liability:</h3>
            <p>We are not responsible for any indirect or consequential damages arising from using Fly App.</p>

            <p>For questions, contact us at <a href="mailto:support@flyapp.com">support@flyapp.com</a>.</p>
        `;
    }

    modalText.innerHTML = content;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
document.getElementById('modal-overlay').addEventListener('click', function(e) {
    const modalBox = document.getElementById('modal-content');
    if (!modalBox.contains(e.target)) {
    closeModal();
    }
});
});


function toggleMenu() {
  const mobileNav = document.getElementById("mobileNav");
  const overlay = document.getElementById("overlay");

  mobileNav.classList.toggle("open");
  overlay.classList.toggle("visible");
}

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("overlay");
  const mobileNav = document.getElementById("mobileNav");
  const hamburger = document.querySelector(".hamburger-menu");
  const hamburger2 = document.getElementById("hamburger2");

  // Outside click closes menu
  document.addEventListener("click", function (event) {
    const isClickInsideMenu = mobileNav.contains(event.target);
    const isClickHamburger = hamburger.contains(event.target);
    const isClickHamburger2 = hamburger2.contains(event.target);

    if (!isClickInsideMenu && !isClickHamburger && !isClickHamburger2) {
      mobileNav.classList.remove("open");
      overlay.classList.remove("visible");
    }
  });

  // Scroll closes menu
  window.addEventListener("scroll", function () {
    if (mobileNav.classList.contains("open")) {
      mobileNav.classList.remove("open");
      overlay.classList.remove("visible");
    }
  });
});

function toggleMenu2() {
  const mobileNav = document.getElementById("mobileNav2");
  const overlay = document.getElementById("overlay");

  mobileNav.classList.toggle("open2");
  overlay.classList.toggle("visible");
}

document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("overlay");
  const mobileNav = document.getElementById("mobileNav2");
  const hamburger = document.querySelector(".hamburger-menu");
  const hamburger2 = document.getElementById("hamburger2");

  // Outside click closes menu
  document.addEventListener("click", function (event) {
    const isClickInsideMenu = mobileNav.contains(event.target);
    const isClickHamburger = hamburger.contains(event.target);
    const isClickHamburger2 = hamburger2.contains(event.target);

    if (!isClickInsideMenu && !isClickHamburger && !isClickHamburger2) {
      mobileNav.classList.remove("open2");
      overlay.classList.remove("visible");
    }
  });

  // Scroll closes menu
  window.addEventListener("scroll", function () {
    if (mobileNav2.classList.contains("open2")) {
      mobileNav2.classList.remove("open2");
      overlay.classList.remove("visible");
    }
  });
});


function updateThemeColor() {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeColorMeta.setAttribute('content', '#5f2c82');
    } else {
        themeColorMeta.setAttribute('content', '#49a09d');
    }
}

    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeColor);
}

    document.addEventListener('DOMContentLoaded', updateThemeColor);