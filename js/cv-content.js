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

// Function to populate education section
function renderEducation(education) {
    const educationContainer = document.querySelector('#education .education-container');
    if (!educationContainer) return;
    
    // Clear existing content
    educationContainer.innerHTML = '';
    
    // Create education items
    education.forEach((edu, index) => {
        const educationItem = document.createElement('div');
        educationItem.className = 'education-item';
        educationItem.innerHTML = `
            <div class="education-icon">
                <i class="fas fa-graduation-cap"></i>
            </div>
            <div class="education-content">
                <h3>${edu.degree}</h3>
                <h4>${edu.institution}</h4>
                <p>
                    <i class="fas fa-calendar-alt"></i> ${edu.period}
                </p>
                <p>
                    <i class="fas fa-map-marker-alt"></i> ${edu.location}
                </p>
            </div>
        `;
        educationContainer.appendChild(educationItem);
    });
}

// Function to render certifications
function renderCertifications(certifications) {
    const certSection = document.querySelector('#certifications');
    if (!certSection) {
        // Create certifications section if it doesn't exist
        const aboutSection = document.querySelector('#about');
        if (!aboutSection) return;
        
        const certificationsSection = document.createElement('section');
        certificationsSection.id = 'certifications';
        certificationsSection.innerHTML = `
            <div class="container">
                <h2 class="section-title">Certifications</h2>
                <div class="cert-container"></div>
            </div>
        `;
        
        aboutSection.parentNode.insertBefore(certificationsSection, aboutSection.nextSibling);
        
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
                    gap: 20px;
                    margin-top: 50px;
                }
                
                .cert-item {
                    background-color: white;
                    border-radius: 8px;
                    padding: 25px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border-left: 4px solid var(--primary-color);
                }
                
                .cert-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                
                .cert-item h3 {
                    color: var(--primary-color);
                    margin-bottom: 15px;
                    font-size: 18px;
                }
                
                .cert-item .cert-icon {
                    margin-bottom: 15px;
                    font-size: 24px;
                    color: var(--primary-color);
                }
                
                @media (max-width: 768px) {
                    .cert-container {
                        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    }
                }
            </style>
        `);
    }
    
    // Fill certifications content
    const certContainer = document.querySelector('#certifications .cert-container');
    if (!certContainer) return;
    
    // Clear existing content
    certContainer.innerHTML = '';
    
    // Add certification items
    certifications.forEach((cert, index) => {
        const certItem = document.createElement('div');
        certItem.className = 'cert-item scroll-animation fade-in-up';
        certItem.style.animationDelay = `${index * 0.1}s`;
        certItem.innerHTML = `
            <div class="cert-icon">
                <i class="fas fa-certificate"></i>
            </div>
            <h3>${cert}</h3>
        `;
        certContainer.appendChild(certItem);
    });
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
                    </div>
                    <div class="social-links-vertical">
                        <a href="${personalInfo.linkedinUrl}" target="_blank" aria-label="LinkedIn Profile">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://www.instagram.com/${instagramConfig.username}/" target="_blank" aria-label="Instagram Profile">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="mailto:${personalInfo.email}" aria-label="Email Me">
                            <i class="far fa-envelope"></i>
                        </a>
                    </div>
                </div>
                <!-- Download and Contact Me buttons removed -->
            </div>
            <div class="about-content-column">
                <h3 class="section-subtitle">Who I Am</h3>
                <div class="about-summary">
                    <p>${personalInfo.summary}</p>
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
                            <i class="fas fa-laptop-code"></i>
                        </div>
                        <div class="key-content">
                            <h4>Focus Areas</h4>
                            <p>Database Administration, Android Development, Video Editing</p>
                        </div>
                    </div>
                </div>
                
                <div class="expertise-areas">
                    <h3 class="expertise-title">Expertise</h3>
                    <div class="expertise-tags">
                        ${personalInfo.skills.technical.concat(personalInfo.skills.programming).slice(0, 8).map(skill => 
                            `<span class="expertise-tag">${skill}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add CSS for the enhanced about section
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            /* Enhanced About Section Styling */
            #about {
                padding: 120px 0;
                background-color: #fcfcfc;
            }
            
            .about-layout {
                display: flex;
                gap: 50px;
                align-items: flex-start;
            }
            
            .about-image-column {
                flex: 0 0 300px;
            }
            
            .about-content-column {
                flex: 1;
            }
            
            .profile-image-wrapper {
                position: relative;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                margin-bottom: 25px;
                transition: transform 0.5s ease;
            }
            
            .profile-image-wrapper:hover {
                transform: translateY(-5px);
            }
            
            .profile-image-wrapper img {
                width: 100%;
                display: block;
            }
            
            .about-image-container {
                position: relative;
            }
            
            .social-links-vertical {
                position: absolute;
                top: 20px;
                right: -15px;
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .social-links-vertical a {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: var(--primary-color);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
            }
            
            .social-links-vertical a:hover {
                transform: translateY(-3px);
                background: var(--primary-dark);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
            }
            
            .about-actions {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .btn-outline {
                background: transparent;
                color: var(--primary-color);
                border: 2px solid var(--primary-color);
                transition: all 0.3s ease;
            }
            
            .btn-outline:hover {
                background: var(--primary-color);
                color: white;
            }
            
            .section-subtitle {
                font-size: 24px;
                color: var(--primary-color);
                margin-bottom: 20px;
                position: relative;
                padding-left: 15px;
            }
            
            .section-subtitle::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 5px;
                background: var(--primary-color);
                border-radius: 3px;
            }
            
            .about-summary {
                margin-bottom: 30px;
                font-size: 16px;
                line-height: 1.8;
            }
            
            .key-details {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 25px;
                margin-bottom: 30px;
            }
            
            .key-detail-item {
                display: flex;
                align-items: flex-start;
                gap: 15px;
            }
            
            .key-icon {
                width: 40px;
                height: 40px;
                border-radius: 8px;
                background: rgba(199, 0, 11, 0.1);
                color: var(--primary-color);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
            }
            
            .key-content h4 {
                font-size: 16px;
                margin: 0 0 5px 0;
                color: var(--secondary-color);
            }
            
            .key-content p {
                margin: 0;
                color: #666;
            }
            
            .expertise-title {
                font-size: 20px;
                margin-bottom: 15px;
                color: var(--secondary-color);
            }
            
            .expertise-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .expertise-tag {
                background: rgba(199, 0, 11, 0.1);
                color: var(--primary-color);
                padding: 8px 16px;
                border-radius: 50px;
                font-size: 14px;
                transition: all 0.3s ease;
            }
            
            .expertise-tag:hover {
                background: var(--primary-color);
                color: white;
                transform: translateY(-3px);
            }
            
            @media (max-width: 900px) {
                .about-layout {
                    flex-direction: column;
                }
                
                .about-image-column {
                    flex: 0 0 auto;
                    width: 100%;
                    max-width: 350px;
                    margin: 0 auto 40px;
                }
                
                .key-details {
                    grid-template-columns: 1fr;
                }
            }
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
    
    // Update the education section
    renderEducation(personalInfo.education);
    
    // Update the certifications section
    renderCertifications(personalInfo.certifications);
}

// Register the rendering function to load with other modules
window.addEventListener('load', function() {
    renderCVContent(personalInfo);
});

console.log('CV Content module loaded');
