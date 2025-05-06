// CV Content Generation - Dynamically renders CV data to HTML sections

// Function to populate skills section
function renderSkills(skills) {
    const skillsContainer = document.querySelector('#skills .skills-container');
    if (!skillsContainer) return;
    
    // Clear existing content
    skillsContainer.innerHTML = '';
    
    // Add technical skills
    if (skills.technical && skills.technical.length) {
        const technicalSection = document.createElement('div');
        technicalSection.className = 'skills-category';
        technicalSection.innerHTML = `
            <h3>Technical Skills</h3>
            <div class="skills-list">
                ${skills.technical.map(skill => createSkillItem(skill, Math.floor(Math.random() * 20) + 80)).join('')}
            </div>
        `;
        skillsContainer.appendChild(technicalSection);
    }
    
    // Add programming skills
    if (skills.programming && skills.programming.length) {
        const programmingSection = document.createElement('div');
        programmingSection.className = 'skills-category';
        programmingSection.innerHTML = `
            <h3>Programming Skills</h3>
            <div class="skills-list">
                ${skills.programming.map(skill => createSkillItem(skill, Math.floor(Math.random() * 15) + 75)).join('')}
            </div>
        `;
        skillsContainer.appendChild(programmingSection);
    }
    
    // Add soft skills
    if (skills.soft && skills.soft.length) {
        const softSection = document.createElement('div');
        softSection.className = 'skills-category';
        softSection.innerHTML = `
            <h3>Soft Skills</h3>
            <div class="skills-list">
                ${skills.soft.map(skill => createSkillItem(skill, Math.floor(Math.random() * 10) + 85)).join('')}
            </div>
        `;
        skillsContainer.appendChild(softSection);
    }
    
    // Add animation delay to each skill for staggered entrance
    const allSkills = skillsContainer.querySelectorAll('.skill-item');
    allSkills.forEach((skill, index) => {
        skill.style.animationDelay = `${index * 0.1}s`;
    });
}

// Helper function to create skill item HTML
function createSkillItem(skillName, percentage) {
    return `
        <div class="skill-item">
            <div class="skill-info">
                <span class="skill-name">${skillName}</span>
                <span class="skill-percentage">${percentage}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: ${percentage}%"></div>
            </div>
        </div>
    `;
}

// Function to populate experience timeline
function renderExperience(experiences) {
    const experienceContainer = document.querySelector('#experience .timeline');
    if (!experienceContainer) return;
    
    // Clear existing content
    experienceContainer.innerHTML = '';
    
    // Create experience timeline items
    experiences.forEach((job, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h3 class="timeline-title">${job.title}</h3>
                <h4 class="timeline-company">${job.company}</h4>
                <p class="timeline-period">
                    <i class="fas fa-calendar-alt"></i> ${job.period}
                </p>
                <p class="timeline-location">
                    <i class="fas fa-map-marker-alt"></i> ${job.location}
                </p>
                <ul class="timeline-responsibilities">
                    ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
            </div>
        `;
        
        // Add animation delay for staggered entrance
        timelineItem.style.animationDelay = `${index * 0.2}s`;
        experienceContainer.appendChild(timelineItem);
    });
}

// Function to populate education section with a modern, redesigned look
function renderEducation(education) {
    console.log("Rendering education section with enhanced data");
    
    const educationContainer = document.querySelector('#education .container');
    if (!educationContainer) return;
    
    // Completely clear the education section including its title
    educationContainer.innerHTML = `
        <h2 class="section-title">Education</h2>
        <div class="education-container"></div>
    `;
    
    const modernEduContainer = educationContainer.querySelector('.education-container');
    
    // Add modern header section
    const headerDiv = document.createElement('div');
    headerDiv.className = 'education-modern-header';
    headerDiv.innerHTML = `
        <span class="edu-badge">Academic Background</span>
        <h2>My Educational Journey</h2>
        <div class="edu-header-line"></div>
        <p>Knowledge foundation and academic achievements that have shaped my professional expertise</p>
    `;
    modernEduContainer.appendChild(headerDiv);
    
    // Create container for education cards
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'education-modern-container';
    modernEduContainer.appendChild(cardsContainer);
    
    // Create detailed education card with information from LinkedIn
    const educationCard = document.createElement('div');
    educationCard.className = 'education-modern-item';
    educationCard.innerHTML = `
        <div class="education-modern-card">
            <div class="education-modern-header-banner">
                <div class="education-modern-degree">S.Kom, Information Technology</div>
            </div>
            
            <div class="education-modern-content">
                <div class="education-modern-school">
                    <div class="education-modern-logo">
                        <i class="fas fa-university"></i>
                    </div>
                    <div>
                        <h3>Ahmad Dahlan University</h3>
                        <span class="education-modern-period">2012 - May 2019</span>
                    </div>
                </div>
                
                <div class="education-modern-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Yogyakarta, Indonesia</span>
                </div>
                
                <div class="education-modern-details">
                    <div class="education-modern-tab active" data-tab="activities">Activities</div>
                    <div class="education-modern-tab" data-tab="description">Description</div>
                    <div class="education-modern-tab" data-tab="research">Research</div>
                </div>
                
                <div class="education-modern-tab-content active" id="activities-content">
                    <div class="education-modern-communities">
                        <div class="education-modern-community">
                            <i class="fas fa-laptop-code"></i>
                            <span>Android Community</span>
                        </div>
                        <div class="education-modern-community">
                            <i class="fab fa-linux"></i>
                            <span>Linux Community</span>
                        </div>
                        <div class="education-modern-community">
                            <i class="fas fa-database"></i>
                            <span>Database & Data Science Community</span>
                        </div>
                    </div>
                </div>
                
                <div class="education-modern-tab-content" id="description-content">
                    <p>During my university journey, I had the privilege of majoring in Informatic Engineering. One of the significant milestones of my academic career was the publication of my undergraduate thesis, which was a collaborative effort with my esteemed thesis adviser. This research endeavor allowed me to delve deep into the subject matter, conduct in-depth analysis, and contribute to the field of informatics.</p>
                </div>
                
                <div class="education-modern-tab-content" id="research-content">
                    <div class="education-modern-research">
                        <h4>Undergraduate Thesis Publication</h4>
                        <a href="https://doi.org/10.33505/jodis.v3i2.149" target="_blank" class="education-modern-research-link">
                            <i class="fas fa-external-link-alt"></i>
                            View Publication
                        </a>
                        <div class="education-modern-research-doi">
                            DOI: 10.33505/jodis.v3i2.149
                        </div>
                    </div>
                </div>
                
                <div class="education-modern-skills">
                    <h4 class="education-modern-skills-title">Skills Developed</h4>
                    <div class="education-modern-skills-container">
                        <span class="education-modern-skill-tag">Presentation Skills</span>
                        <span class="education-modern-skill-tag">Public Speaking</span>
                        <span class="education-modern-skill-tag">Databases</span>
                        <span class="education-modern-skill-tag">Java</span>
                        <span class="education-modern-skill-tag">Android SDK</span>
                        <span class="education-modern-skill-tag">OOP</span>
                        <span class="education-modern-skill-tag">Project Management</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    cardsContainer.appendChild(educationCard);
    
    // Setup tab switching functionality
    setTimeout(() => {
        document.querySelectorAll('.education-modern-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                const tabsContainer = this.parentElement;
                const cardContent = tabsContainer.parentElement;
                
                // Remove active class from all tabs
                tabsContainer.querySelectorAll('.education-modern-tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Hide all content panels
                cardContent.querySelectorAll('.education-modern-tab-content').forEach(c => {
                    c.classList.remove('active');
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show selected content panel
                cardContent.querySelector(`#${tabId}-content`).classList.add('active');
            });
        });
    }, 100);
    
    // Add modern styling if not already added
    if (!document.getElementById('modern-education-styles')) {
        const styleTag = document.createElement('style');
        styleTag.id = 'modern-education-styles';
        // Add the existing CSS styles here
        // ...existing CSS code for education section...
    }
}

// Function to render certifications
function renderCertifications(certifications) {
    console.log('Rendering certifications:', certifications);
    
    // Ensure certifications is an array with items
    if (!certifications || !Array.isArray(certifications) || certifications.length === 0) {
        console.error('No certifications to display or invalid format');
        return;
    }

    const certSection = document.querySelector('#certifications');
    if (!certSection) {
        console.log('Creating certifications section');
        
        // Create certifications section if it doesn't exist
        const experienceSection = document.querySelector('#experience');
        if (!experienceSection) return;
        
        const certificationsSection = document.createElement('section');
        certificationsSection.id = 'certifications';
        certificationsSection.innerHTML = `
            <div class="container">
                <h2 class="section-title">Licenses & Certifications</h2>
                <p class="section-description">Professional certifications and credentials</p>
                <div class="cert-container"></div>
            </div>
        `;
        
        // Insert after experience section
        experienceSection.parentNode.insertBefore(certificationsSection, experienceSection.nextSibling);
        
        // Add to navigation
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            const certLink = document.createElement('li');
            certLink.innerHTML = '<a href="#certifications">Certifications</a>';
            navLinks.appendChild(certLink);
        }
        
        // Add styling
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                #certifications {
                    padding: 100px 0;
                    background-color: #f9f9f9;
                }
                
                .cert-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 30px;
                    margin-top: 50px;
                }
                
                .cert-item {
                    background-color: white;
                    border-radius: 10px;
                    padding: 25px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border-top: 5px solid var(--primary-color);
                    display: flex;
                    flex-direction: column;
                }
                
                .cert-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                }
                
                .cert-item h3 {
                    color: #333;
                    margin-bottom: 8px;
                    font-size: 20px;
                }
                
                .cert-item .cert-issuer {
                    color: #666;
                    font-size: 16px;
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                .cert-item .cert-date {
                    color: #777;
                    font-size: 14px;
                    margin-top: 5px;
                    margin-bottom: 15px;
                }
                
                .cert-item .cert-id {
                    font-size: 14px;
                    color: #555;
                    margin-top: auto;
                    padding-top: 15px;
                    border-top: 1px solid #f0f0f0;
                }
                
                .cert-item .cert-link {
                    display: inline-flex;
                    align-items: center;
                    margin-top: 15px;
                    color: var(--primary-color);
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 15px;
                    gap: 5px;
                }
                
                .cert-item .cert-link:hover {
                    text-decoration: underline;
                }
                
                @media (max-width: 768px) {
                    .cert-container {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `);
    }
    
    // Fill certifications content
    const certContainer = document.querySelector('#certifications .cert-container');
    if (!certContainer) {
        console.error('Cannot find certification container');
        return;
    }
    
    // Clear existing content
    certContainer.innerHTML = '';
    
    // Add certification items
    certifications.forEach((cert, index) => {
        console.log('Processing certification:', cert);
        
        // Handle both string-only and object certifications
        const isObjectCert = typeof cert === 'object';
        const certName = isObjectCert ? cert.name : cert;
        
        const certItem = document.createElement('div');
        certItem.className = 'cert-item scroll-animation fade-in-up';
        certItem.style.animationDelay = `${index * 0.1}s`;
        
        if (isObjectCert) {
            // Detailed certification layout
            certItem.innerHTML = `
                <h3>${certName}</h3>
                ${cert.issuer ? `<div class="cert-issuer">
                    <i class="fas fa-building"></i> ${cert.issuer}
                </div>` : ''}
                ${cert.issueDate ? `<div class="cert-date">
                    <i class="fas fa-calendar-alt"></i> Issued: ${cert.issueDate}
                </div>` : ''}
                ${cert.credentialID ? `<div class="cert-id">
                    <strong>Credential ID:</strong> ${cert.credentialID}
                </div>` : ''}
                ${cert.credentialURL ? `<a href="${cert.credentialURL}" target="_blank" class="cert-link">
                    <i class="fas fa-external-link-alt"></i> See credential
                </a>` : ''}
            `;
        } else {
            // Simple certification layout
            certItem.innerHTML = `
                <h3>${certName}</h3>
                <div class="cert-issuer">
                    <i class="fas fa-award"></i> Professional Certification
                </div>
            `;
        }
        
        certContainer.appendChild(certItem);
    });
    
    console.log('Certifications rendered successfully');
}

// Function to update the about section with summary
function renderSummary(personalInfo) {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return;
    
    // Get or create the about-content container
    let aboutContent = aboutSection.querySelector('.about-content');
    if (!aboutContent) {
        aboutContent = document.createElement('div');
        aboutContent.className = 'about-content';
        aboutSection.querySelector('.container').appendChild(aboutContent);
    }
    
    // Clear existing content to rebuild it
    aboutContent.innerHTML = '';
    
    // Create a modern two-column layout
    aboutContent.innerHTML = `
        <div class="about-layout">
            <div class="about-image-column">
                <div class="about-image-container">
                    <div class="profile-image-wrapper">
                        <img src="asset/profile.jpg" alt="${personalInfo.name}" onerror="this.src='https://via.placeholder.com/400x500/f6f6f6/333333?text=${encodeURIComponent(personalInfo.name)}'" />
                        <div class="image-badge">
                            <span class="years-experience">${new Date().getFullYear() - 2019}+</span>
                            <span class="years-text">Years<br>Experience</span>
                        </div>
                    </div>
                    <div class="social-links-vertical">
                        <a href="${personalInfo.linkedinUrl}" target="_blank" aria-label="LinkedIn Profile">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://github.com/Fiqiefendiahmad" target="_blank" aria-label="GitHub Profile">
                            <i class="fab fa-github"></i>
                        </a>
                        <a href="https://play.google.com/store/apps/developer?id=AFN_Studio" target="_blank" aria-label="Play Store Developer Page">
                            <i class="fab fa-google-play"></i>
                        </a>
                        <a href="mailto:${personalInfo.email}" aria-label="Email Me">
                            <i class="far fa-envelope"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="about-content-column">
                <div class="about-header">
                    <h2 class="person-name">${personalInfo.name}</h2>
                    <h3 class="section-subtitle">About Me</h3>
                </div>
                
                <div class="key-details">
                    <div class="key-detail-item">
                        <div class="key-icon">
                            <i class="fas fa-map-marker-alt"></i>
                        </div>
                        <div class="key-content">
                            <h4>Location</h4>
                            <p>${personalInfo.location}</p>
                        </div>
                    </div>
                    
                    <div class="key-detail-item">
                        <div class="key-icon">
                            <i class="fas fa-briefcase"></i>
                        </div>
                        <div class="key-content">
                            <h4>Current Role</h4>
                            <p>${personalInfo.experience[0].title} at ${personalInfo.experience[0].company}</p>
                        </div>
                    </div>
                    
                    <div class="key-detail-item">
                        <div class="key-icon">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <div class="key-content">
                            <h4>Degree</h4>
                            <p>${personalInfo.education[0].degree}</p>
                        </div>
                    </div>
                    
                    <div class="key-detail-item">
                        <div class="key-icon">
                            <i class="fas fa-mobile-alt"></i>
                        </div>
                        <div class="key-content">
                            <h4>App Developer</h4>
                            <p>
                                <a href="https://play.google.com/store/apps/developer?id=AFN_Studio" target="_blank" 
                                   class="app-developer-link">AFN_Studio on Google Play</a>
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="expertise-areas">
                    <h3 class="expertise-title">Core Skills</h3>
                    <div class="expertise-tags">
                        ${personalInfo.skills.technical.concat(personalInfo.skills.programming).slice(0, 8).map(skill => 
                            `<span class="expertise-tag">${skill}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="cta-buttons">
                    <a href="#contact" class="btn btn-primary">Contact Me</a>
                    <a href="#skills" class="btn btn-outline">View All Skills</a>
                </div>
            </div>
        </div>
    `;
    
    // Add CSS for the enhanced about section with improved readability
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            /* About Section Styling */
            .about-layout {
                display: flex;
                gap: 50px;
                align-items: flex-start;
            }
            
            /* Image column styles */
            // ...existing code...
            
            .app-developer-link {
                color: var(--primary-color);
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                font-weight: 500;
                transition: all 0.2s ease;
            }
            
            .app-developer-link::after {
                content: "\\f35a";
                font-family: "Font Awesome 5 Free";
                font-weight: 900;
                margin-left: 5px;
                font-size: 14px;
                transition: transform 0.2s ease;
            }
            
            .app-developer-link:hover {
                text-decoration: underline;
            }
            
            .app-developer-link:hover::after {
                transform: translateX(3px);
            }
            
            // ...existing code...
        </style>
    `);
}

// Master function to render all CV content
function renderCVContent(personalInfo) {
    // Update the about section with enhanced design
    renderSummary(personalInfo);
    // Update the skills section
    renderSkills(personalInfo.skills);
    // Update the experience section
    renderExperience(personalInfo.experience);
    // Add console log to debug
    console.log('Rendering certifications section with:', personalInfo.certifications);
    // Update the certifications section
    renderCertifications(personalInfo.certifications);
    // Update the education section
    renderEducation(personalInfo.education);
}

// Register the rendering function to load with other modules
window.addEventListener('load', function() {
    renderCVContent(personalInfo);
});

console.log('CV Content module loaded');
