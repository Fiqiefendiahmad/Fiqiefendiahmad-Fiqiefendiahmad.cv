// Navigation functionality

// Mobile navigation menu
function initMobileNavigation() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    // Toggle menu when button is clicked
    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close menu when a nav link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Add CSS for mobile menu
    addMobileMenuStyles();
}

// ScrollSpy - highlight current section in navigation
function initScrollSpy() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Add header effects on scroll
function initHeaderEffects() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (!header) return;
        
        if(window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Add mobile menu styles
function addMobileMenuStyles() {
    document.head.insertAdjacentHTML('beforeend', `
    <style>
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 80px;
            right: -100%;
            width: 70%;
            height: calc(100vh - 80px);
            background-color: white;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 40px;
            transition: right 0.3s ease;
            box-shadow: -5px 0 15px rgba(0,0,0,0.1);
        }
        
        .nav-links.active {
            right: 0;
        }
        
        .nav-links li {
            margin: 15px 0;
        }
        
        header.scrolled {
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .nav-links a.active {
            color: var(--primary-color);
        }
        
        .nav-links a.active::after {
            width: 100%;
        }
    }
    </style>
    `);
}

console.log('Navigation module loaded');
