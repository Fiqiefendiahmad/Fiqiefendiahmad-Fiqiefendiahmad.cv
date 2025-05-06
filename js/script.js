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
    linkedinUrl: "https://www.linkedin.com/in/yourprofile",
    githubUrl: "https://github.com/Fiqiefendiahmad",
    playStoreUrl: "https://play.google.com/store/apps/developer?id=AFN_Studio",
    
    // Professional summary
    summary: "I am an experienced professional with a strong background in both warehouse operations and Android app development, demonstrating a proven track record in the information technology and services industry. I am currently dedicated to a role in database administration, while concurrently focusing on multiple projects related to video editing and Android app development.",
    
    // Skills categories
    skills: {
        technical: ["Android Enterprise", "Microsoft Power BI", "Google Sheets", "Database Administration", "Video Editing", "Graphic Design"],
        programming: ["Java", "Android SDK", "SQL", "Motion Graphics"],
        soft: ["Project Management", "Client Collaboration", "Quality Assurance"]
    },
    
    // Professional certifications - ensure this format is correct
    certifications: [
        {
            name: "EF Set English",
            issuer: "EF Standard English Test",
            issueDate: "May 2023",
            credentialID: "ef-set-123456",
            credentialURL: "https://www.efset.org/cert/"
        },
        {
            name: "Foundations of Project Management",
            issuer: "Google",
            issueDate: "June 2022",
            credentialID: "pm-12345",
            credentialURL: "https://www.coursera.org/account/accomplishments/verify/"
        },
        {
            name: "Foundations: Data, Data, Everywhere", 
            issuer: "Google",
            issueDate: "April 2022",
            credentialID: "data-12345",
            credentialURL: "https://www.coursera.org/account/accomplishments/verify/"
        },
        {
            name: "Android Enterprise Professional",
            issuer: "Google",
            issueDate: "August 2021",
            credentialID: "aep-12345",
            credentialURL: "https://www.credential.net/"
        },
        {
            name: "Android Enterprise Associate",
            issuer: "Google",
            issueDate: "July 2021", 
            credentialID: "aea-12345",
            credentialURL: "https://www.credential.net/"
        }
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
        },
        {
            title: "Android App Developer",
            company: "AFN_Studio",
            period: "2020 - Present", 
            location: "Remote",
            responsibilities: [
                "Developed and published Android applications to Google Play Store",
                "Designed user interfaces focused on user experience and accessibility",
                "Maintained and updated applications based on user feedback"
            ]
        }
    ],
    
    // Education - updated from LinkedIn
    education: [
        {
            institution: "Ahmad Dahlan University",
            location: "Yogyakarta, Indonesia",
            degree: "S.Kom, Information Technology",
            period: "2012 - May 2019",
            activities: "Android community, Linux community, Database and data science community",
            description: "During my university journey, I had the privilege of majoring in Informatic Engineering. One of the significant milestones of my academic career was the publication of my undergraduate thesis, which was a collaborative effort with my esteemed thesis adviser. This research endeavor allowed me to delve deep into the subject matter, conduct in-depth analysis, and contribute to the field of informatics.",
            thesis: {
                title: "Undergraduate Thesis Publication",
                doi: "https://doi.org/10.33505/jodis.v3i2.149"
            },
            skills: [
                "Presentation Skills", "Public Speaking", "Databases", "Public Relations", 
                "Java", "Graph Databases", "Android SDK", "Object-Oriented Programming (OOP)", 
                "Customer Relationship Management (CRM)", "Android Testing", 
                "Presentations", "Project Management", "Android Studio"
            ]
        }
    ]
};

// Add deployment configuration
const deploymentConfig = {
    // Automatically detect if running on production or local environment
    isProduction: window.location.hostname !== 'localhost' && 
                  window.location.hostname !== '127.0.0.1' &&
                  !window.location.hostname.includes('.local'),
    
    // GitHub Pages configuration
    github: {
        username: 'Fiqiefendiahmad',
        repositoryName: 'Fiqiefendiahmad.github.io',
        url: 'https://fiqiefendiahmad.github.io/'
    },
    
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
document.write('<script src="js/ui-utils.js"></script>');
document.write('<script src="js/cv-content.js"></script>');
