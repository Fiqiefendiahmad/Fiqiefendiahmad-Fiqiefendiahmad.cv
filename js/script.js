// Main script file - loads other modules

// Add console log to confirm script is loaded properly
console.log('CV Website main script loaded');

// Personal information shared across modules
const personalInfo = {
    // Basic info
    name: "AHMAD FIQI EFENDI",
    email: "ahmad12018214@webmail.uad.ac.id",
    phone: "085156462398",
    location: "Jakarta, Indonesia",
    
    // Social & web profiles
    linkedin: "fiqi-efendi",
    linkedinUrl: "https://www.linkedin.com/in/fiqi-efendi",
    
    // Professional summary
    summary: "I am an experienced professional with a strong background in both warehouse operations and Android app development, demonstrating a proven track record in the information technology and services industry. I am currently dedicated to a role in database administration, while concurrently focusing on multiple projects related to video editing and Android app development.",
    
    // Skills categories
    skills: {
        technical: ["Android Enterprise", "Microsoft Power BI", "Google Sheets", "Database Administration", "Video Editing", "Graphic Design"],
        programming: ["Java", "Android SDK", "SQL", "Motion Graphics"],
        soft: ["Project Management", "Client Collaboration", "Quality Assurance"]
    },
    
    // Professional certifications
    certifications: [
        "EF Set English",
        "Foundations of Project Management",
        "Foundations: Data, Data, Everywhere",
        "Android Enterprise Professional",
        "Android Enterprise Associate"
    ],
    
    // Work experience
    experience: [
        {
            company: "PT. INFOMEDIA NUSANTARA",
            title: "IT Database Administrator",
            period: "June 2023 - Present",
            location: "Jakarta, Indonesia",
            responsibilities: [
                "24/7 Performance Monitoring of database systems",
                "Comprehensive Reporting on database performance",
                "Job and Backup Oversight to safeguard data",
                "Anomaly Detection and Troubleshooting",
                "Collaboration with SME DBAs for specialized issues"
            ]
        },
        {
            company: "Self Employed",
            title: "Android Developer",
            period: "April 2020 - Present",
            location: "Lamongan, East Java, Indonesia",
            responsibilities: [
                "Code Review and Quality Assurance",
                "Mobile App Architecture design",
                "Performance Optimization",
                "SDK Integration with third-party libraries and APIs",
                "Testing and Debugging",
                "Continuous Learning of emerging technologies"
            ]
        },
        {
            company: "Self Employed",
            title: "Video Editor",
            period: "January 2019 - Present",
            location: "Lamongan, East Java, Indonesia",
            responsibilities: [
                "End-to-end video editing",
                "Content Creation and collaboration",
                "Post-Production editing",
                "Motion Graphics and Visual Effects",
                "Audio Editing and enhancement",
                "Color Correction and Grading",
                "Project Management"
            ]
        },
        {
            company: "Freelance",
            title: "Graphic Designer",
            period: "November 2013 - June 2023",
            location: "Indonesia",
            responsibilities: [
                "Creating designs for print and digital media",
                "Conceptualization of visual ideas",
                "Client Collaboration and feedback implementation",
                "Managing multiple projects simultaneously",
                "Staying updated with design trends"
            ]
        },
        {
            company: "Potret Pantura",
            title: "Video Editor",
            period: "January 2020 - October 2021",
            location: "Lamongan, East Java, Indonesia",
            responsibilities: [
                "Multimedia Content Creation",
                "Web Management",
                "Content Curation",
                "Project Leadership",
                "Visual and Audio Enhancements"
            ]
        },
        {
            company: "ReCharge Indonesia",
            title: "Warehouse Operative",
            period: "July 2019 - April 2020",
            location: "Yogyakarta, Indonesia",
            responsibilities: [
                "Warehouse Operations management",
                "Vending Machine Maintenance (Power Bank products)",
                "Daily Reporting of KPIs",
                "CRM Management",
                "Server-Side Android App Maintenance",
                "Logistic Distribution coordination"
            ]
        }
    ],
    
    // Education
    education: [
        {
            institution: "Ahmad Dahlan University",
            location: "Yogyakarta, Indonesia",
            degree: "S.Kom, Information Technology",
            period: "2012 - May 2019"
        }
    ]
};

// Instagram configuration
const instagramConfig = {
    username: "viqi_efendi", // Updated username
    feedCount: 12,
    containerSelector: '#instagram-feed',
    createFeedSection: true
};

// Add deployment configuration
const deploymentConfig = {
    // Automatically detect if running on production or local environment
    isProduction: window.location.hostname !== 'localhost' && 
                  window.location.hostname !== '127.0.0.1' &&
                  !window.location.hostname.includes('.local'),
    
    // CDN URLs for production (can be changed when deployed)
    cdnUrls: {
        profileImage: 'asset/profile.jpg', // Keep the same path for now
    }
};

// Initialize core functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Menu
    initMobileNavigation();
    
    // Add active class to nav links on scroll
    initScrollSpy();
    
    // Add header shadow on scroll
    initHeaderEffects();
    
    // Add background image to hero section
    initHeroBackground();
    
    // Initialize animations
    initScrollAnimations();
});

// Load all modules when page is fully loaded
window.addEventListener('load', function() {
    if (deploymentConfig.isProduction) {
        console.log('Running in production environment');
        
        // Add Google Analytics or other tracking if needed
        /*
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID';
        document.head.appendChild(gaScript);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'YOUR-GA-ID');
        */
    } else {
        console.log('Running in local development environment');
    }
    
    // Update personal info throughout the site
    updatePersonalInfo(personalInfo);
    
    // Render CV content from personal info
    if (typeof renderCVContent === 'function') {
        renderCVContent(personalInfo);
    }
    
    // Add LinkedIn profile integration
    addLinkedInProfile(personalInfo);
    
    // Create Instagram section and load feed
    if (instagramConfig.createFeedSection) {
        createInstagramSection(instagramConfig);
    }
    
    // Add Instagram feed
    loadInstagramFeed(instagramConfig);
    
    // Add scroll indicators
    addScrollIndicators();
    
    setTimeout(() => {
        console.log('CV Website fully loaded and ready to view');
        console.log(`CV for ${personalInfo.name} updated successfully`);
    }, 500);
});

// Load module scripts
document.write('<script src="js/navigation.js"></script>');
document.write('<script src="js/animations.js"></script>');
document.write('<script src="js/linkedin.js"></script>');
document.write('<script src="js/instagram.js"></script>');
document.write('<script src="js/ui-utils.js"></script>');
document.write('<script src="js/cv-content.js"></script>');
