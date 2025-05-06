// Animation functionality and styling

// Add custom color scheme and animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    :root {
        --primary-color: #c7000b; /* Huawei red */
        --primary-light: #ff4d56;
        --primary-dark: #9a0008;
        --secondary-color: #333333;
        --accent-color: #f6d54a; /* Gold accent */
    }
    
    /* Enhanced animations */
    .section-title::after {
        background-color: var(--primary-color);
        transition: width 0.5s ease;
    }
    
    .section-title:hover::after {
        width: 120px;
    }
    
    .btn-primary {
        background-color: var(--primary-color);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .btn-primary:hover {
        background-color: var(--primary-dark);
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(199, 0, 11, 0.3);
    }
    
    .nav-links a::after {
        background-color: var(--primary-color);
        transition: width 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    
    /* Enhanced scroll animations */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .scroll-animation {
        opacity: 0;
    }
    
    .scroll-animation.animated {
        animation-duration: 0.8s;
        animation-fill-mode: both;
    }
    
    .fade-in-up {
        animation-name: fadeInUp;
    }
    
    .fade-in-left {
        animation-name: fadeInLeft;
    }
    
    .fade-in-right {
        animation-name: fadeInRight;
    }
    
    /* Parallax effect on scroll */
    .parallax-bg {
        transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    }
    
    /* Enhance navigation highlight effect */
    .nav-links a {
        position: relative;
        padding: 5px 0;
    }
    
    .nav-links a::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--primary-color);
        transform: scaleX(0);
        transition: transform 0.3s ease;
        transform-origin: right center;
    }
    
    .nav-links a:hover::before,
    .nav-links a.active::before {
        transform: scaleX(1);
        transform-origin: left center;
    }
    
    /* Skill progress animation */
    .skill-progress {
        background-color: var(--primary-color);
        background-image: linear-gradient(45deg, rgba(255,255,255,.15) 25%, 
            transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, 
            rgba(255,255,255,.15) 75%, transparent 75%, transparent);
        background-size: 1rem 1rem;
        animation: progress-bar-stripes 1s linear infinite;
    }
    
    @keyframes progress-bar-stripes {
        from { background-position: 1rem 0 }
        to { background-position: 0 0 }
    }
    
    .timeline-item {
        transition: transform 0.4s ease;
    }
    
    .timeline-item:hover {
        transform: translateX(5px);
    }
    
    /* Accessibility improvements */
    a:focus, button:focus {
        outline: 2px dashed var(--primary-color);
        outline-offset: 3px;
    }
</style>
`);

// Function to initialize hero background
function initHeroBackground() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        // Try loading the local image with error handling
        const img = new Image();
        img.onload = function() {
            applyBackgroundToHero(heroSection, `url("${img.src}")`);
        };
        img.onerror = function() {
            console.error('Could not load image from path:', img.src);
            tryAlternativeImagePaths(heroSection);
        };
        img.src = window.location.origin + '/asset/bg.JPG';
    }
}

// Function to try different possible image paths
function tryAlternativeImagePaths(heroSection) {
    const possiblePaths = [
        './asset/bg.JPG',
        './asset/bg.jpg',
        '../asset/bg.JPG',
        'asset/bg.jpg',
        '/asset/bg.jpg',
        'images/bg.JPG',
        'images/bg.jpg',
        './images/bg.JPG',
        '../images/bg.JPG'
    ];
    
    let pathIndex = 0;
    
    function tryNextPath() {
        if (pathIndex >= possiblePaths.length) {
            console.log('All local image paths failed, using fallback image');
            applyBackgroundToHero(heroSection, 'url("https://source.unsplash.com/random/1920x1080/?professional,technology")');
            return;
        }
        
        const path = possiblePaths[pathIndex];
        console.log('Trying image path:', path);
        
        const img = new Image();
        img.onload = function() {
            applyBackgroundToHero(heroSection, `url("${path}")`);
            console.log('Successfully loaded image from path:', path);
        };
        img.onerror = function() {
            pathIndex++;
            tryNextPath();
        };
        img.src = path;
    }
    
    tryNextPath();
}

// Function to apply background and overlay to hero section with animations
function applyBackgroundToHero(heroSection, backgroundImageUrl) {
    // Set background image styles for the hero section
    heroSection.style.backgroundImage = backgroundImageUrl;
    heroSection.style.backgroundSize = 'cover';
    heroSection.style.backgroundPosition = 'center';
    heroSection.style.backgroundRepeat = 'no-repeat';
    
    // Add subtle zoom animation to background
    heroSection.style.transition = 'transform 15s ease';
    heroSection.classList.add('animated-bg');
    
    // Create keyframe animation for subtle zoom effect
    const zoomAnimation = document.createElement('style');
    zoomAnimation.textContent = `
        @keyframes subtle-zoom {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .animated-bg {
            animation: subtle-zoom 15s infinite ease-in-out;
        }
    `;
    document.head.appendChild(zoomAnimation);
    
    // Override existing background styles
    heroSection.style.background = 'none';
    
    // Add gradient overlay with red theme for better text visibility
    const overlay = document.createElement('div');
    overlay.className = 'hero-overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'linear-gradient(135deg, rgba(199,0,11,0.7) 0%, rgba(0,0,0,0.7) 100%)';
    overlay.style.zIndex = '1';
    
    // Add subtle texture to overlay for more depth
    overlay.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")';
    
    // Move existing content inside the hero section
    const heroContainer = heroSection.querySelector('.container');
    if (heroContainer) {
        heroContainer.style.position = 'relative';
        heroContainer.style.zIndex = '2';
        
        // Add entrance animation to hero content
        heroContainer.style.opacity = '0';
        heroContainer.style.transform = 'translateY(20px)';
        heroContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroContainer.style.opacity = '1';
            heroContainer.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Insert overlay as first child of hero section
    heroSection.insertBefore(overlay, heroSection.firstChild);
    
    // Add animations to buttons inside hero
    setTimeout(() => {
        const buttons = heroSection.querySelectorAll('.btn');
        buttons.forEach((btn, index) => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            btn.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background-color 0.3s, color 0.3s, box-shadow 0.3s';
            
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 600 + (index * 150));
        });
    }, 500);
}

// Function to initialize scroll animations
function initScrollAnimations() {
    // Select all elements to animate
    const animatedSections = document.querySelectorAll('section');
    const animatedElements = document.querySelectorAll('.section-title, .timeline-item, .skill-item, .project-card, .about-content > div');
    
    // Add animation classes
    animatedElements.forEach(el => {
        el.classList.add('scroll-animation');
    });
    
    // Add random animation direction for variety
    animatedElements.forEach(el => {
        const animations = ['fade-in-up', 'fade-in-left', 'fade-in-right'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        el.classList.add(randomAnimation);
    });
    
    // Force section titles to always fade up
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.remove('fade-in-left', 'fade-in-right');
        el.classList.add('fade-in-up');
    });
    
    // Add parallax effect to sections
    animatedSections.forEach(section => {
        section.classList.add('parallax-bg');
    });
    
    // Handle scroll animation
    function handleScrollAnimation() {
        animatedElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('animated');
            }
        });
        
        // Add smooth parallax effect
        animatedSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const scrollPercent = rect.top / window.innerHeight;
            if (Math.abs(scrollPercent) < 1) {
                section.style.transform = `translateY(${scrollPercent * -20}px)`;
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Trigger once on load
    setTimeout(handleScrollAnimation, 500);
}

// Utility: Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    const vertInView = (rect.top <= windowHeight * 0.85) && (rect.top + rect.height >= 0);
    const horInView = (rect.left <= windowWidth) && (rect.left + rect.width >= 0);
    
    return vertInView && horInView;
}

console.log('Animations module loaded');
