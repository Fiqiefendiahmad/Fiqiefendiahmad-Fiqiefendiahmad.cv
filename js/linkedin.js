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

// LinkedIn API Integration

// LinkedIn API credentials - replace with your own
const linkedInConfig = {
    clientId: 'YOUR_LINKEDIN_CLIENT_ID', // Replace with your actual client ID
    redirect: window.location.origin + '/linkedin-callback.html',
    scope: 'r_liteprofile r_emailaddress',
    state: Math.random().toString(36).substring(2)
};

// Function to initialize LinkedIn integration
function addLinkedInProfile(personalInfo) {
    console.log('LinkedIn integration initializing...');
    
    // Check if we already have LinkedIn data in session storage
    const linkedInData = sessionStorage.getItem('linkedInProfileData');
    
    if (linkedInData) {
        // Use cached data if available
        processLinkedInData(JSON.parse(linkedInData), personalInfo);
    } else {
        // Try to fetch from API if user is authenticated
        tryFetchLinkedInProfile(personalInfo);
    }
    
    // Add a small LinkedIn badge to profile section
    addLinkedInBadge(personalInfo.linkedinUrl);
}

// Attempt to fetch LinkedIn profile if authenticated
function tryFetchLinkedInProfile(personalInfo) {
    // Check if we have an access token in localStorage
    const accessToken = localStorage.getItem('linkedInAccessToken');
    
    if (accessToken) {
        fetch('https://api.linkedin.com/v2/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('LinkedIn API request failed');
            }
            return response.json();
        })
        .then(data => {
            // Cache the data
            sessionStorage.setItem('linkedInProfileData', JSON.stringify(data));
            // Process the data
            processLinkedInData(data, personalInfo);
        })
        .catch(error => {
            console.warn('Could not fetch LinkedIn profile:', error);
            // Fallback to static data
            console.log('Using static LinkedIn data as fallback');
        });
    } else {
        console.log('No LinkedIn access token available, using static data');
    }
}

// Process LinkedIn data and update the UI
function processLinkedInData(data, personalInfo) {
    // Only update if we have actual data
    if (data && data.firstName) {
        console.log('LinkedIn data received, updating profile...');
        
        // Extract relevant information from LinkedIn data
        // Note: This is based on LinkedIn API v2 response structure
        const fullName = `${data.firstName.localized.en_US} ${data.lastName.localized.en_US}`;
        
        // Update UI elements if needed
        document.querySelectorAll('.linkedin-name').forEach(el => {
            el.textContent = fullName;
        });
        
        // Dispatch event for other components to use
        const event = new CustomEvent('linkedInProfileLoaded', { detail: data });
        document.dispatchEvent(event);
    }
}

// Add LinkedIn badge to profile section
function addLinkedInBadge(linkedinUrl) {
    const profileSection = document.querySelector('.profile-links') || document.querySelector('.social-links');
    
    if (profileSection && linkedinUrl) {
        const badgeContainer = document.createElement('a');
        badgeContainer.href = linkedinUrl;
        badgeContainer.target = '_blank';
        badgeContainer.rel = 'noopener noreferrer';
        badgeContainer.classList.add('linkedin-badge');
        
        badgeContainer.innerHTML = `
            <i class="fab fa-linkedin"></i>
            <span>View LinkedIn Profile</span>
        `;
        
        profileSection.appendChild(badgeContainer);
    }
}

// Add login with LinkedIn button to settings or profile section
function addLinkedInLoginButton() {
    const settingsSection = document.querySelector('.settings-section');
    
    if (settingsSection) {
        const loginButton = document.createElement('button');
        loginButton.classList.add('linkedin-login-btn', 'btn', 'btn-outline');
        loginButton.innerHTML = '<i class="fab fa-linkedin"></i> Login with LinkedIn';
        
        loginButton.addEventListener('click', initiateLinkedInLogin);
        
        settingsSection.appendChild(loginButton);
    }
}

// Initiate LinkedIn OAuth flow
function initiateLinkedInLogin() {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedInConfig.clientId}&redirect_uri=${encodeURIComponent(linkedInConfig.redirect)}&state=${linkedInConfig.state}&scope=${encodeURIComponent(linkedInConfig.scope)}`;
    
    window.open(authUrl, '_blank', 'width=600,height=600');
}

console.log('LinkedIn module loaded');
