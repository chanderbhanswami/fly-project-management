# Fly - Project Management Platform

A modern, responsive single-page application for a project management platform built with HTML, CSS, and JavaScript. This project showcases a complete landing page with interactive features, responsive design, and email integration.

## 🚀 Features

### Core Functionality
- **Responsive Design**: Fully responsive layout that works seamlessly across desktop, tablet, and mobile devices
- **Interactive Navigation**: Smooth scrolling navigation with both desktop and mobile hamburger menu
- **User Registration**: Complete sign-up form with validation for user onboarding
- **Email Integration**: SMTP email delivery using EmailJS for form submissions
- **Dynamic Content**: Interactive FAQ section with expandable answers
- **Customer Reviews**: Rotating testimonials with profile avatars
- **Modern UI/UX**: Clean, professional design with gradient effects and animations

### Page Sections
1. **Hero Section**: Eye-catching landing area with main value proposition and sign-up form
2. **Features Section**: Multiple feature showcases with icons and descriptions
3. **Reviews Section**: Customer testimonials with star ratings and profile images
4. **Pricing Section**: Three-tier pricing plans (Basic, Pro, Business)
5. **FAQ Section**: Expandable frequently asked questions
6. **Call-to-Action**: Secondary sign-up section to boost conversions
7. **Footer**: Social media links, copyright, and legal page links

### Technical Features
- **Sticky Navigation**: Header that remains visible while scrolling
- **Mobile-First Design**: Optimized for mobile devices with responsive breakpoints
- **Icon Integration**: Bootstrap Icons and Font Awesome for visual elements
- **Form Validation**: Client-side validation for required fields
- **Password Toggle**: Show/hide password functionality
- **Modal Windows**: Privacy Policy and Terms of Service popups
- **Cross-Browser Compatibility**: Works across modern web browsers

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and modern HTML features
- **CSS3**: Advanced styling with Flexbox, Grid, and responsive design
- **JavaScript**: Interactive functionality and DOM manipulation
- **EmailJS**: Third-party email service integration
- **Bootstrap Icons**: Icon library for UI elements
- **Font Awesome**: Additional icon sets
- **Google Fonts**: Custom typography (implied from styling)

## 📁 File Structure

```
fly-project/
├── index.html          # Main HTML file
├── styles.css          # Main stylesheet
├── css/
├── script.js          # JavaScript functionality
├── Images/            # Project images
│   ├── ui 1-portrait.png
│   └── ui 2-portrait.png
├── favicon.ico        # Website favicon
├── favicon.svg        # SVG favicon
├── favicon-96x96.png  # PNG favicon
├── apple-touch-icon.png
└── site.webmanifest   # Web app manifest
```

## 🎨 Design Highlights

- **Modern Gradient Design**: Eye-catching color schemes with gradient backgrounds
- **Skewed Backgrounds**: Unique geometric design elements
- **Mobile-Responsive**: Seamless experience across all device sizes
- **Interactive Elements**: Hover effects and smooth transitions
- **Professional Typography**: Clean, readable font choices
- **Visual Hierarchy**: Well-organized content structure

## 📧 Email Integration

The project integrates with EmailJS for handling form submissions:
- User registration forms send emails automatically
- No backend server required
- Secure email delivery through EmailJS API
- Form validation ensures data integrity before submission

## 🔧 Setup Instructions

1. **Clone or Download** the project files
2. **EmailJS Setup**:
   - Create an account at [EmailJS.com](https://www.emailjs.com/)
   - Configure your email service
   - Update the EmailJS configuration in `script.js`
3. **Local Development**:
   - Open `index.html` in a web browser
   - Or serve using a local server (recommended for full functionality)
4. **Deployment**:
   - Upload files to your web hosting service
   - Ensure all file paths are correctly configured

## 📱 Responsive Breakpoints

The design adapts to various screen sizes:
- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: 767px and below

## 🎯 JavaScript Functions

Key interactive features include:
- `homeBtn()`: Navigate to home section
- `featuresBtn()`: Scroll to features section
- `reviewsBtn()`: Navigate to reviews
- `pricingBtn()`: Jump to pricing section
- `faqBtn()`: Scroll to FAQ section
- `getStartedBtn()`: Focus on sign-up form
- `registerBtn()`: Handle user registration
- `togglePassword()`: Show/hide password input
- `toggleMenu()`: Mobile menu toggle
- Modal functions for legal pages

## 🌟 Key Learning Outcomes

This project demonstrates proficiency in:
- **HTML5 Semantic Structure**: Proper use of semantic elements
- **CSS3 Advanced Techniques**: Flexbox, Grid, animations, and responsive design
- **JavaScript DOM Manipulation**: Interactive functionality and event handling
- **Third-Party API Integration**: EmailJS email service
- **Responsive Web Design**: Mobile-first approach and cross-device compatibility
- **User Experience Design**: Intuitive navigation and form design
- **Performance Optimization**: Efficient code structure and resource loading

## 🚀 Future Enhancements

Potential improvements for the project:
- Add form validation with error messages
- Implement dark/light theme toggle
- Add loading animations and micro-interactions
- Include accessibility features (ARIA labels, keyboard navigation)
- Add blog section or case studies
- Implement user dashboard mockup
- Add more interactive elements and animations

## 📞 Contact

For technical support or inquiries about the Fly platform:
- Email: support@flyapp.com
- Developer: [@Chanderbhan](https://www.instagram.com/chanderbhan_swami/)
- Company: [Techno Taau](https://www.technotaau.com/)

## 📄 License

© 2025 Fly App. All Rights Reserved.

---

*This project was created as a front-end development assignment to demonstrate HTML, CSS, and JavaScript skills in building a modern, responsive web application.*