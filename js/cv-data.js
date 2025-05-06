// CV Data population functionality

// Function to populate detailed CV sections
function populateDetailedCV(personalInfo) {
    // Populate professional summary
    populateSummary(personalInfo.summary);
    
    // Populate skills section
    populateSkills(personalInfo.skills);
    
    // Populate experience section
    populateExperience(personalInfo.experience);
    
    // Populate education section
    populateEducation(personalInfo.education);
    
    // Populate certifications
    populateCertifications(personalInfo.certifications);
}

// Populate professional summary
function populateSummary(summary) {
    const summaryElements = document.querySelectorAll('.about-text p, .summary, .professional-summary');
    summaryElements.forEach(el => {
        if (el && el.textContent.includes('Lorem ipsum') || el.textContent.includes('short description')) {
            el.textContent = summary;
        }
    });
}

// Populate skills section with categorized skills
function populateSkills(skills) {
    const skillsSection = document.querySelector('.skills-list, #skills-list');
    
    if (skillsSection) {
        // Clear existing skills if any
        skillsSection.innerHTML = '';
        
        // Add technical skills
        if (skills.technical && skills.technical.length) {
            const technicalCategory = document.createElement('div');
            technicalCategory.className = 'skills-category';
            technicalCategory.innerHTML = `<h3>Technical Skills</h3>`;
            
            const skillsList = document.createElement('ul');
            skills.technical.forEach(skill => {
                const skillItem = document.createElement('li');
                skillItem.innerHTML = `
                    <div class="skill-item">
                        <h4>${skill}</h4>
                        <div class="skill-progress-bg">
                            <div class="skill-progress" style="width: 90%"></div>
                        </div>
                    </div>
                `;
                skillsList.appendChild(skillItem);
            });
            
            technicalCategory.appendChild(skillsList);
            skillsSection.appendChild(technicalCategory);
        }
        
        // Add programming skills
        if (skills.programming && skills.programming.length) {
            const progCategory = document.createElement('div');
            progCategory.className = 'skills-category';
            progCategory.innerHTML = `<h3>Programming & Technical</h3>`;
            
            const skillsList = document.createElement('ul');
            skills.programming.forEach(skill => {
                const skillItem = document.createElement('li');
                skillItem.innerHTML = `
                    <div class="skill-item">
                        <h4>${skill}</h4>
                        <div class="skill-progress-bg">
                            <div class="skill-progress" style="width: 85%"></div>
                        </div>
                    </div>
                `;
                skillsList.appendChild(skillItem);
            });
            
            progCategory.appendChild(skillsList);
            skillsSection.appendChild(progCategory);
        }
        
        // Add soft skills
        if (skills.soft && skills.soft.length) {
            const softCategory = document.createElement('div');
            softCategory.className = 'skills-category';
            softCategory.innerHTML = `<h3>Soft Skills</h3>`;
            
            const skillsList = document.createElement('ul');
            skills.soft.forEach(skill => {
                const skillItem = document.createElement('li');
                skillItem.innerHTML = `
                    <div class="skill-item">
                        <h4>${skill}</h4>
                        <div class="skill-progress-bg">
                            <div class="skill-progress" style="width: 92%"></div>
                        </div>
                    </div>
                `;
                skillsList.appendChild(skillItem);
            });
            
            softCategory.appendChild(skillsList);
            skillsSection.appendChild(softCategory);
        }
    }
}

// Populate experience section with work history
function populateExperience(experience) {
    const experienceSection = document.querySelector('.experience-list, .timeline, #experience-list');
    
    if (experienceSection) {
        // Clear existing experience items
        experienceSection.innerHTML = '';
        
        // Add each job experience
        experience.forEach(job => {
            const experienceItem = document.createElement('div');
            experienceItem.className = 'timeline-item';
            
            experienceItem.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <h3>${job.title}</h3>
                    <h4>${job.company}</h4>
                    <p class="timeline-date">${job.period} | ${job.location}</p>
                    <ul class="responsibilities">
                        ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            experienceSection.appendChild(experienceItem);
        });
    }
}

// Populate education section
function populateEducation(education) {
    const educationSection = document.querySelector('.education-list, #education-list, .timeline.education');
    
    if (educationSection) {
        // Clear existing education items
        educationSection.innerHTML = '';
        
        // Add each education entry
        education.forEach(edu => {
            const eduItem = document.createElement('div');
            eduItem.className = 'timeline-item';
            
            eduItem.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <h3>${edu.degree}</h3>
                    <h4>${edu.institution}</h4>
                    <p class="timeline-date">${edu.period} | ${edu.location}</p>
                </div>
            `;
            
            educationSection.appendChild(eduItem);
        });
    }
}

// Populate certifications
function populateCertifications(certifications) {
    const certSection = document.querySelector('.certifications, #certifications');
    
    if (certSection) {
        // If it's empty or has placeholder content, replace it
        const certList = document.createElement('ul');
        certList.className = 'cert-list';
        
        certifications.forEach(cert => {
            const certItem = document.createElement('li');
            certItem.innerHTML = `
                <div class="cert-item">
                    <i class="fas fa-certificate"></i>
                    <span>${cert}</span>
                </div>
            `;
            certList.appendChild(certItem);
        });
        
        certSection.appendChild(certList);
    }
}

console.log('CV data module loaded');
