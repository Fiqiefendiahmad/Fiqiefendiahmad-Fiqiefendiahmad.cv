// Google Play Store Apps Data for AFN_Studio
const playStoreApps = {
    developer: "AFN_Studio",
    developerUrl: "https://play.google.com/store/apps/developer?id=AFN_Studio",
    apps: [
        {
            name: "BiziDigi: Digital Business Card",
            description: "Create professional digital business cards easily. Share your contact info, social profiles & portfolio instantly.",
            icon: "asset/projects/bizidigi.webp",
            url: "https://play.google.com/store/apps/details?id=com.afnstudio.bizidigi",
            category: "Business",
            tags: ["Digital Cards", "Networking", "Marketing"],
            installs: "1K+"
        },
        {
            name: "Mantra Sukses",
            description: "Kumpulan kata-kata motivasi dan mantra sukses untuk menginspirasi kehidupan sehari-hari.",
            icon: "asset/projects/mantra-sukses.webp",
            url: "https://play.google.com/store/apps/details?id=com.afnstudio.mantrasukses",
            category: "Lifestyle",
            tags: ["Motivation", "Inspiration", "Self-Development"],
            installs: "5K+"
        },
        {
            name: "Zawia - Quranic Healing",
            description: "App for Quranic healing with beautiful recitations and comprehensive guides for physical and spiritual well-being.",
            icon: "asset/projects/zawia.webp",
            url: "https://play.google.com/store/apps/details?id=com.afnstudio.zawia",
            category: "Lifestyle",
            tags: ["Spiritual", "Wellbeing", "Religion"],
            installs: "10K+"
        },
        {
            name: "Ide Usaha Sampingan",
            description: "Aplikasi berisi ratusan ide bisnis dan usaha sampingan yang bisa dilakukan untuk mendapatkan penghasilan tambahan.",
            icon: "asset/projects/ide-usaha.webp",
            url: "https://play.google.com/store/apps/details?id=com.afnstudio.ideusahasampingan",
            category: "Business",
            tags: ["Entrepreneurship", "Business Ideas", "Indonesian"],
            installs: "50K+"
        },
        {
            name: "Mimpi Tafsir & Arti",
            description: "Aplikasi tafsir mimpi berdasarkan Al-Quran dan Sunnah dengan ribuan interpretasi mimpi umum.",
            icon: "asset/projects/mimpi.webp",
            url: "https://play.google.com/store/apps/details?id=com.afnstudio.mimpi",
            category: "Lifestyle",
            tags: ["Dreams", "Interpretation", "Islamic"],
            installs: "100K+"
        }
    ]
};

// Function to load apps into projects section
function loadPlayStoreApps() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) {
        console.error('Projects grid not found');
        return;
    }
    
    // Clear any existing content
    projectsGrid.innerHTML = '';
    
    // Try to fetch from Play Store API first
    fetchPlayStoreApps()
        .then(apps => {
            if (apps && apps.length > 0) {
                // Update our static apps data with fresh data
                playStoreApps.apps = apps;
                console.log('Loaded Play Store apps dynamically:', apps.length);
            } else {
                console.log('Using fallback static app data');
            }
            
            // Add apps to grid (either dynamic or static)
            playStoreApps.apps.forEach((app, index) => {
                // Only show first 4 apps in grid to maintain layout
                if (index < 4) {
                    const appCard = createAppCard(app);
                    projectsGrid.appendChild(appCard);
                }
            });
            
            // Update view all link with accurate count
            updateViewAllLink();
        })
        .catch(error => {
            console.error('Failed to load Play Store apps dynamically:', error);
            
            // Fallback to static data
            playStoreApps.apps.forEach((app, index) => {
                if (index < 4) {
                    const appCard = createAppCard(app);
                    projectsGrid.appendChild(appCard);
                }
            });
            
            updateViewAllLink();
        });
}

// Function to fetch apps from Play Store
async function fetchPlayStoreApps() {
    try {
        // Since direct access to Play Store API requires authorization and a backend,
        // we'll use a proxy service or our own backend API that handles the authentication
        const response = await fetch('https://your-backend-api.com/play-store-apps?developer=AFN_Studio');
        
        if (!response.ok) {
            throw new Error('Failed to fetch Play Store apps');
        }
        
        const data = await response.json();
        
        // Transform the API response to match our app structure
        return data.apps.map(app => ({
            name: app.title,
            description: app.description || app.summary,
            icon: app.icon || `asset/projects/${app.packageName}.webp`,
            url: `https://play.google.com/store/apps/details?id=${app.packageName}`,
            category: app.category || 'App',
            tags: app.tags || [app.category],
            installs: app.installs || 'New'
        }));
    } catch (error) {
        console.warn('Error fetching Play Store apps:', error);
        return null; // Return null to indicate failure
    }
}

// Function to create an app card
function createAppCard(app) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', 'android');
    
    // Use placeholder if image fails to load
    const placeholderUrl = `https://via.placeholder.com/512/f5f5f5/555555?text=${encodeURIComponent(app.name)}`;
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${app.icon || placeholderUrl}" alt="${app.name}" 
                 onerror="this.src='${placeholderUrl}'">
            <div class="project-type-badge">
                <i class="fab fa-android"></i> ${app.category}
            </div>
        </div>
        <div class="project-content">
            <h3>${app.name}</h3>
            <p>${app.description}</p>
            <div class="project-tags">
                ${app.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${app.url}" target="_blank" class="project-link">
                    <i class="fab fa-google-play"></i> View on Play Store
                </a>
                ${app.installs ? `<span class="installs-badge"><i class="fas fa-download"></i> ${app.installs}</span>` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Update the View All link with accurate count
function updateViewAllLink() {
    const viewAllContainer = document.querySelector('.view-all-container');
    if (!viewAllContainer) return;
    
    viewAllContainer.innerHTML = `
        <a href="${playStoreApps.developerUrl}" target="_blank" class="btn btn-outline">
            <i class="fab fa-google-play"></i> View All ${playStoreApps.apps.length} Apps on Google Play
        </a>
    `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadPlayStoreApps);
