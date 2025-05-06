// UI utilities and helper functions

// Update personal information throughout the website
function updatePersonalInfo(personalInfo) {
    // Update name throughout the site
    document.querySelectorAll('h1:first-of-type, .hero h1, .info-value:first-of-type').forEach(el => {
        if (el.textContent.includes('Your Name') || el.textContent.includes('Name')) {
            el.textContent = personalInfo.name;
        }
    });
    
    // Update email
    document.querySelectorAll('a[href^="mailto:"], .info-value, p').forEach(el => {
        if (el.textContent.includes('your.email@example.com') || el.textContent.includes('email@example.com')) {
            el.textContent = personalInfo.email;
        }
    });
    
    // Update phone
    document.querySelectorAll('.info-value, p').forEach(el => {
        if (el.textContent.includes('+1') || el.textContent.includes('123-456')) {
            el.textContent = personalInfo.phone;
        }
    });
    
    // Add professional title
    const professionalTitle = "Android Developer | Database | Video Editor";
    
    // Force update the hero section subtitle/title with more specific selectors
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        // Look for existing subtitle or create one if it doesn't exist
        let heroSubtitle = heroSection.querySelector('.hero-subtitle, .subtitle');
        if (!heroSubtitle) {
            const heroContent = heroSection.querySelector('.container, .hero-content');
            if (heroContent) {
                const heroTitle = heroContent.querySelector('h1');
                if (heroTitle) {
                    heroSubtitle = document.createElement('p');
                    heroSubtitle.className = 'hero-subtitle';
                    heroTitle.parentNode.insertBefore(heroSubtitle, heroTitle.nextSibling);
                }
            }
        }
        
        // Set the professional title
        if (heroSubtitle) {
            heroSubtitle.textContent = professionalTitle;
            heroSubtitle.style.fontSize = '1.5rem';
            heroSubtitle.style.fontWeight = '500';
            heroSubtitle.style.marginTop = '10px';
            heroSubtitle.style.color = '#fff';
            heroSubtitle.style.textShadow = '0 2px 5px rgba(0,0,0,0.3)';
        }
    }
    
    // Continue with existing selectors
    document.querySelectorAll('.hero-subtitle, .profession, .role, .job-title').forEach(el => {
        el.textContent = professionalTitle;
    });
    
    // Also look for generic professional title formats
    document.querySelectorAll('h2, p.subtitle, .subtitle').forEach(el => {
        if (el.textContent.includes('Web Developer') || 
            el.textContent.includes('Developer') || 
            el.textContent.includes('Designer') ||
            el.textContent.includes('Your Profession') ||
            el.textContent.includes('Frontend') ||
            el.textContent.includes('Full Stack')) {
            el.textContent = professionalTitle;
        }
    });
    
    // Update location in contact section
    document.querySelectorAll('.contact-info .contact-item i.fa-map-marker-alt, .contact-info .contact-item i.fas.fa-map-marker-alt').forEach(icon => {
        const locationContainer = icon.closest('.contact-item');
        if (locationContainer) {
            const locationText = locationContainer.querySelector('p');
            if (locationText) {
                locationText.textContent = personalInfo.location;
            }
        }
    });
    
    // Also look for location text in other potential formats
    document.querySelectorAll('.info-value, p').forEach(el => {
        if (el.textContent.includes('New York') || 
            el.textContent.includes('London') || 
            el.textContent.includes('Your City') || 
            el.textContent.match(/[A-Z][a-z]+,\s[A-Z][a-z]+/)) { // Pattern like "City, Country"
            el.textContent = personalInfo.location;
        }
    });
    
    // Update footer
    const footer = document.querySelector('footer p');
    if (footer) {
        footer.textContent = `© ${new Date().getFullYear()} ${personalInfo.name}. All Rights Reserved.`;
    }
}

// Add scroll indicators and progress bar
function addScrollIndicators() {
    // Create scroll indicator button
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = `
        <div class="scroll-arrow">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    document.body.appendChild(indicator);
    
    // Add styling for scroll indicators
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .scroll-indicator {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: var(--primary-color);
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                z-index: 100;
                opacity: 0;
                transition: all 0.4s ease;
            }
            
            .scroll-indicator.visible {
                opacity: 1;
            }
            
            .scroll-indicator:hover {
                transform: scale(1.1);
            }
            
            .scroll-arrow {
                display: flex;
                flex-direction: column;
                align-items: center;
                animation: pulse 1.5s infinite;
            }
            
            .scroll-arrow span {
                width: 10px;
                height: 10px;
                border-bottom: 2px solid white;
                border-right: 2px solid white;
                transform: rotate(45deg);
                margin: -2px;
                animation: scroll 1.5s infinite;
            }
            
            .scroll-arrow span:nth-child(2) {
                animation-delay: 0.2s;
            }
            
            .scroll-arrow span:nth-child(3) {
                animation-delay: 0.4s;
            }
            
            @keyframes pulse {
                0% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(5px);
                }
                100% {
                    transform: translateY(0);
                }
            }
            
            @keyframes scroll {
                0% {
                    opacity: 0;
                }
                50% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                }
            }
            
            /* Scroll progress indicator */
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 0;
                height: 3px;
                background: linear-gradient(to right, var(--primary-color), var(--primary-light));
                z-index: 9999;
                transition: width 0.1s;
            }
        </style>
    `);
    
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Update on scroll
    window.addEventListener('scroll', function() {
        // Update progress bar
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
        
        // Show/hide scroll indicator
        if (scrollPercent > 20 && scrollPercent < 90) {
            indicator.classList.add('visible');
        } else {
            indicator.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    indicator.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhance the About section with a more professional layout
function enhanceAboutSection() {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return;
    
    // Get the container
    const container = aboutSection.querySelector('.container');
    if (!container) return;
    
    // Add a professional class to the about section
    aboutSection.classList.add('enhanced-about');
    
    // Add custom styling for the enhanced about section
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .enhanced-about {
                background: linear-gradient(135deg, #f8f9fa 0%, #f1f1f1 100%);
                padding: 120px 0;
                position: relative;
                overflow: hidden;
            }
            
            .enhanced-about::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 5px;
                background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
            }
            
            .enhanced-about .section-title {
                margin-bottom: 50px;
                position: relative;
                display: inline-block;
            }
            
            .enhanced-about .section-title::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: -10px;
                width: 80px;
                height: 4px;
                background-color: var(--primary-color);
                transition: width 0.4s ease;
            }
            
            .enhanced-about .section-title:hover::after {
                width: 100%;
            }
            
            .enhanced-about .about-content {
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
                border-radius: 10px;
                background: white;
                padding: 40px;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .enhanced-about .about-content:hover {
                transform: translateY(-5px);
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
            }
            
            .enhanced-about .expertise-tag {
                cursor: pointer;
            }
            
            /* Add subtle animation to profile image */
            .enhanced-about .profile-image-wrapper::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, rgba(199,0,11,0.2) 0%, rgba(255,255,255,0) 50%);
                z-index: 1;
            }
            
            /* Add pattern overlay to the section */
            .enhanced-about::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c7000b' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                opacity: 0.5;
                z-index: -1;
            }
            
            @media (max-width: 900px) {
                .enhanced-about {
                    padding: 80px 0;
                }
                
                .enhanced-about .about-content {
                    padding: 25px;
                }
            }
        </style>
    `);
}

// Call the enhanceAboutSection function when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    enhanceAboutSection();
});

// Remove any Twitter-related functions or references
// For example, if there's a function like:
// function addTwitterLink() {...}
// Make sure to remove it or comment it out

// Make sure there are no Twitter references in the social media icons

console.log('UI utilities module loaded');
