// Education section fix - directly initializes the education section

// Force education section to update when page loads
window.addEventListener('DOMContentLoaded', function() {
    console.log("Education fix script loaded");
    
    // Try to initialize immediately
    initializeEducationSection();
    
    // Also try after a delay to ensure everything is loaded
    setTimeout(initializeEducationSection, 1000);
});

function initializeEducationSection() {
    console.log("Attempting to initialize education section");
    
    // Check if personalInfo is available
    if (typeof personalInfo === 'undefined' || !personalInfo.education) {
        console.error("Personal info or education data not available");
        return;
    }
    
    // Find the education section
    const educationSection = document.getElementById('education');
    if (!educationSection) {
        console.error("Education section not found in the DOM");
        return;
    }
    
    // Ensure container exists or create it
    let educationContainer = educationSection.querySelector('.education-container');
    if (!educationContainer) {
        console.log("Creating education container");
        educationContainer = document.createElement('div');
        educationContainer.className = 'education-container';
        
        // Find the container element or create it
        let container = educationSection.querySelector('.container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'container';
            educationSection.appendChild(container);
        }
        
        container.appendChild(educationContainer);
    }
    
    console.log("Education container found or created, now rendering content");
    
    // Clear the container and rebuild it
    educationContainer.innerHTML = '';
    
    // Create modern education layout
    createModernEducationLayout(personalInfo.education, educationContainer);
}

function createModernEducationLayout(education, container) {
    // Add modern header
    const header = document.createElement('div');
    header.className = 'education-modern-header';
    header.innerHTML = `
        <span class="edu-badge">Academic Background</span>
        <h2>My Educational Journey</h2>
        <div class="edu-header-line"></div>
        <p>Knowledge foundation and academic achievements that have shaped my professional expertise</p>
    `;
    container.appendChild(header);
    
    // Create container for education items
    const modernContainer = document.createElement('div');
    modernContainer.className = 'education-modern-container';
    container.appendChild(modernContainer);
    
    // Add education cards
    education.forEach((edu, index) => {
        const card = document.createElement('div');
        card.className = 'education-modern-item';
        card.innerHTML = `
            <div class="education-modern-card">
                <div class="education-modern-header-banner">
                    <div class="education-modern-degree">${edu.degree}</div>
                </div>
                
                <div class="education-modern-content">
                    <div class="education-modern-school">
                        <div class="education-modern-logo">
                            <i class="fas fa-university"></i>
                        </div>
                        <div>
                            <h3>${edu.institution}</h3>
                            <span class="education-modern-period">${edu.period}</span>
                        </div>
                    </div>
                    
                    <div class="education-modern-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${edu.location}</span>
                    </div>
                    
                    <div class="education-modern-details">
                        <div class="education-modern-tab active" data-tab="activities">Activities</div>
                        <div class="education-modern-tab" data-tab="description">Description</div>
                        <div class="education-modern-tab" data-tab="research">Research</div>
                    </div>
                    
                    <div class="education-modern-tab-content active" id="activities-content-${index}">
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
                    
                    <div class="education-modern-tab-content" id="description-content-${index}">
                        <p>During my university journey, I had the privilege of majoring in Informatic Engineering. This comprehensive program developed my technical expertise in software development, database management, and system architecture.</p>
                    </div>
                    
                    <div class="education-modern-tab-content" id="research-content-${index}">
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
                </div>
            </div>
        `;
        
        modernContainer.appendChild(card);
        
        // Setup tabs for this card
        setupTabsForCard(card, index);
    });
    
    // Add modern education styling
    addModernEducationStyles();
}

function setupTabsForCard(card, index) {
    setTimeout(() => {
        const tabs = card.querySelectorAll('.education-modern-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                
                // Remove active class from all tabs in this card
                card.querySelectorAll('.education-modern-tab').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Hide all content panels in this card
                card.querySelectorAll('.education-modern-tab-content').forEach(c => {
                    c.classList.remove('active');
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show selected content
                card.querySelector(`#${tabId}-content-${index}`).classList.add('active');
            });
        });
    }, 100);
}

function addModernEducationStyles() {
    // Check if styles already added
    if (document.getElementById('education-modern-styles')) return;
    
    const styleTag = document.createElement('style');
    styleTag.id = 'education-modern-styles';
    styleTag.innerHTML = `
        /* Modern Education Section Styling */
        #education {
            background-color: #f8f9fa;
            padding: 120px 0;
            position: relative;
            overflow: hidden;
        }
        
        #education::before {
            content: '';
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: linear-gradient(45deg, rgba(199,0,11,0.05), rgba(199,0,11,0.1));
            top: -100px;
            left: -100px;
            z-index: 0;
        }
        
        #education::after {
            content: '';
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: linear-gradient(45deg, rgba(199,0,11,0.05), rgba(199,0,11,0.1));
            bottom: -50px;
            right: -50px;
            z-index: 0;
        }
        
        .education-container {
            position: relative;
            z-index: 1;
            max-width: 1000px;
            margin: 0 auto;
        }
        
        .education-modern-header {
            text-align: center;
            margin-bottom: 60px;
        }
        
        .edu-badge {
            background-color: rgba(199,0,11,0.1);
            color: var(--primary-color);
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            padding: 8px 15px;
            border-radius: 50px;
            display: inline-block;
            margin-bottom: 20px;
        }
        
        .education-modern-header h2 {
            font-size: 36px;
            margin-bottom: 20px;
            color: #333;
        }
        
        .edu-header-line {
            width: 80px;
            height: 4px;
            background-color: var(--primary-color);
            margin: 0 auto 20px;
            border-radius: 2px;
        }
        
        .education-modern-header p {
            max-width: 600px;
            margin: 0 auto;
            color: #555;
            font-size: 17px;
            line-height: 1.7;
        }
        
        .education-modern-container {
            display: flex;
            flex-direction: column;
            gap: 40px;
        }
        
        .education-modern-card {
            background-color: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
            overflow: hidden;
            transition: all 0.3s ease;
            position: relative;
            margin-bottom: 30px;
        }
        
        .education-modern-card:hover {
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
            transform: translateY(-5px);
        }
        
        .education-modern-header-banner {
            padding: 20px 30px;
            background: linear-gradient(45deg, var(--primary-color), #e91e63);
            color: white;
            position: relative;
        }
        
        .education-modern-header-banner::after {
            content: '';
            position: absolute;
            bottom: -15px;
            left: 30px;
            width: 30px;
            height: 30px;
            background: var(--primary-color);
            transform: rotate(45deg);
        }
        
        .education-modern-degree {
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 0.5px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .education-modern-content {
            padding: 30px;
        }
        
        .education-modern-school {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .education-modern-logo {
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            background-color: #f8f9fa;
            color: var(--primary-color);
            font-size: 24px;
            flex-shrink: 0;
            box-shadow: 0 5px 15px rgba(199,0,11,0.1);
        }
        
        .education-modern-school h3 {
            font-size: 20px;
            margin: 0 0 5px 0;
            color: #333;
        }
        
        .education-modern-period {
            font-size: 14px;
            color: #777;
        }
        
        .education-modern-location {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background-color: #f8f9fa;
            padding: 8px 15px;
            border-radius: 30px;
            color: #555;
            font-size: 14px;
            margin-bottom: 25px;
        }
        
        .education-modern-details {
            display: flex;
            border-bottom: 1px solid #eee;
            margin-bottom: 20px;
        }
        
        .education-modern-tab {
            padding: 12px 20px;
            cursor: pointer;
            color: #666;
            font-weight: 500;
            transition: all 0.2s ease;
            position: relative;
        }
        
        .education-modern-tab:hover {
            color: var(--primary-color);
        }
        
        .education-modern-tab.active {
            color: var(--primary-color);
        }
        
        .education-modern-tab.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: var(--primary-color);
            border-radius: 10px 10px 0 0;
        }
        
        .education-modern-tab-content {
            display: none;
            padding: 20px 0;
            animation: eduFadeIn 0.5s ease forwards;
        }
        
        .education-modern-tab-content.active {
            display: block;
        }
        
        .education-modern-communities {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
        }
        
        .education-modern-community {
            display: flex;
            align-items: center;
            gap: 8px;
            background-color: #f8f9fa;
            padding: 10px 15px;
            border-radius: 8px;
            color: #444;
            font-size: 14px;
            transition: all 0.3s ease;
            cursor: default;
        }
        
        .education-modern-community:hover {
            background-color: #f0f0f0;
            transform: translateY(-2px);
        }
        
        .education-modern-community i {
            color: var(--primary-color);
        }
        
        .education-modern-research {
            background-color: rgba(199,0,11,0.03);
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid var(--primary-color);
        }
        
        .education-modern-research h4 {
            font-size: 16px;
            color: #333;
            margin: 0 0 15px 0;
        }
        
        .education-modern-research-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: var(--primary-color);
            color: white !important;
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 15px;
            transition: all 0.3s ease;
        }
        
        .education-modern-research-link:hover {
            background: #e91e63;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(199,0,11,0.2);
        }
        
        .education-modern-research-doi {
            font-size: 13px;
            color: #777;
            font-style: italic;
        }
        
        .education-modern-tab-content p {
            color: #555;
            line-height: 1.8;
            margin: 0;
            font-size: 15px;
        }
        
        @keyframes eduFadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
            .education-modern-header h2 {
                font-size: 28px;
            }
            
            .education-modern-content {
                padding: 20px;
            }
            
            .education-modern-details {
                overflow-x: auto;
                padding-bottom: 5px;
            }
            
            .education-modern-tab {
                padding: 10px 15px;
                white-space: nowrap;
                font-size: 14px;
            }
            
            .education-modern-communities {
                flex-direction: column;
                gap: 8px;
            }
            
            .education-modern-community {
                width: 100%;
            }
        }
    `;
    
    document.head.appendChild(styleTag);
}
