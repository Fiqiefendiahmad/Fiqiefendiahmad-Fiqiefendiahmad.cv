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

console.log('UI utilities module loaded');
