// LinkedIn integration functionality

// Add LinkedIn styling
document.head.insertAdjacentHTML('beforeend', `
<style>
    /* LinkedIn branding */
    .linkedin-color {
        color: #0077b5;
    }
    
    .linkedin-btn {
        background-color: #0077b5;
        color: white;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        border-radius: 4px;
        transition: all 0.3s ease;
        font-weight: 500;
        text-decoration: none;
    }
    
    .linkedin-btn:hover {
        background-color: #005582;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 119, 181, 0.4);
        color: white;
    }
    
    .social-link.linkedin {
        background-color: #0077b5;
    }
    
    .social-link.linkedin:hover {
        background-color: #005582;
    }
</style>
`);

// Function to add LinkedIn profile to the website
function addLinkedInProfile(personalInfo) {
    // Add LinkedIn to social links in contact section
    const contactSocial = document.querySelector('.contact-social .social-links');
    if (contactSocial) {
        const linkedinLink = document.createElement('a');
        linkedinLink.href = personalInfo.linkedinUrl;
        linkedinLink.className = 'social-link linkedin';
        linkedinLink.target = '_blank';
        linkedinLink.innerHTML = '<i class="fab fa-linkedin-in"></i>';
        linkedinLink.setAttribute('aria-label', 'LinkedIn Profile');
        contactSocial.appendChild(linkedinLink);
    }
    
    // Add LinkedIn to contact info
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        const linkedinContact = document.createElement('div');
        linkedinContact.className = 'contact-item';
        linkedinContact.innerHTML = `
            <i class="fab fa-linkedin"></i>
            <div>
                <h3>LinkedIn</h3>
                <p><a href="${personalInfo.linkedinUrl}" target="_blank">@${personalInfo.linkedin}</a></p>
            </div>
        `;
        contactInfo.appendChild(linkedinContact);
    }
    
    // Add LinkedIn button to hero section
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        const linkedinBtn = document.createElement('a');
        linkedinBtn.href = personalInfo.linkedinUrl;
        linkedinBtn.className = 'btn linkedin-btn';
        linkedinBtn.target = '_blank';
        linkedinBtn.innerHTML = '<i class="fab fa-linkedin-in"></i> Connect on LinkedIn';
        heroButtons.appendChild(linkedinBtn);
    }
    
    // Add LinkedIn to about section
    const personalInfoSection = document.querySelector('.personal-info');
    if (personalInfoSection) {
        const linkedinInfo = document.createElement('div');
        linkedinInfo.className = 'info-item';
        linkedinInfo.innerHTML = `
            <span class="info-title">LinkedIn:</span>
            <span class="info-value"><a href="${personalInfo.linkedinUrl}" target="_blank">@${personalInfo.linkedin}</a></span>
        `;
        personalInfoSection.appendChild(linkedinInfo);
    }
}

console.log('LinkedIn module loaded');
