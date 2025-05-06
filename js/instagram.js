// Instagram feed functionality

// Function to create Instagram feed section if it doesn't exist
function createInstagramSection(instagramConfig) {
    if (!document.querySelector('#instagram')) {
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            // Create Instagram section HTML
            const instagramSection = document.createElement('section');
            instagramSection.id = 'instagram';
            instagramSection.className = 'instagram';
            instagramSection.innerHTML = `
                <div class="container">
                    <h2 class="section-title">Instagram Feed</h2>
                    <p class="instagram-username">Follow me <a href="https://www.instagram.com/${instagramConfig.username}/" target="_blank">@${instagramConfig.username}</a></p>
                    <div id="instagram-feed" class="instagram-feed-container"></div>
                </div>
            `;
            
            // Insert after projects section
            projectsSection.parentNode.insertBefore(instagramSection, projectsSection.nextSibling);
            
            // Add Instagram feed styling
            document.head.insertAdjacentHTML('beforeend', `
                <style>
                    .instagram {
                        padding: 100px 0;
                        background-color: var(--light-color);
                    }
                    
                    .instagram-username {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    
                    .instagram-feed-container {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                        gap: 15px;
                        margin-top: 30px;
                    }
                    
                    .instagram-post {
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                        transition: transform 0.3s ease;
                    }
                    
                    .instagram-post:hover {
                        transform: translateY(-5px);
                    }
                    
                    .instagram-post img {
                        width: 100%;
                        height: 250px;
                        object-fit: cover;
                    }
                    
                    .instagram-post-overlay {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 120, 212, 0.4);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    
                    .instagram-post:hover .instagram-post-overlay {
                        opacity: 1;
                    }
                    
                    .instagram-post-caption {
                        padding: 15px;
                        background-color: white;
                    }
                    
                    @media (max-width: 768px) {
                        .instagram-feed-container {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }
                    
                    @media (max-width: 576px) {
                        .instagram-feed-container {
                            grid-template-columns: 1fr;
                        }
                    }
                </style>
            `);
            
            // Add to navigation
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                const instagramLink = document.createElement('li');
                instagramLink.innerHTML = '<a href="#instagram">Instagram</a>';
                navLinks.appendChild(instagramLink);
            }
        }
    }
}

// Function to load Instagram feed (combined function)
function loadInstagramFeed(instagramConfig) {
    try {
        loadInstagramEmbed(instagramConfig);
    } catch (error) {
        console.error('Failed to load Instagram embed, falling back to placeholders', error);
        loadPlaceholderPosts(instagramConfig);
    }
}

// Function to load Instagram feed using embed approach
function loadInstagramEmbed(instagramConfig) {
    const container = document.querySelector(instagramConfig.containerSelector);
    if (!container) return;
    
    // Create embed HTML for Instagram profile (ensure username is consistent)
    container.innerHTML = `
        <iframe
            src="https://www.instagram.com/${instagramConfig.username}/embed"
            width="100%"
            height="750"
            frameborder="0"
            scrolling="no"
            allowtransparency="true"
            style="display: block; margin: 0 auto; max-width: 540px;">
        </iframe>
    `;
}

// Fallback function to display placeholder posts
function loadPlaceholderPosts(instagramConfig) {
    const container = document.querySelector(instagramConfig.containerSelector);
    if (!container) return;
    
    const placeholderPosts = [
        {
            image: `https://via.placeholder.com/640x640/0078d4/ffffff?text=@${instagramConfig.username}`,
            caption: 'Working on exciting new projects! #coding #webdevelopment',
            link: `https://www.instagram.com/${instagramConfig.username}/`
        },
        {
            image: 'https://via.placeholder.com/640x640?text=Instagram+Post+2',
            caption: 'Sharing my professional journey #career #development',
            link: `https://www.instagram.com/${instagramConfig.username}/`
        },
        {
            image: 'https://via.placeholder.com/640x640?text=Instagram+Post+3',
            caption: 'Learning new skills every day #learning #growth',
            link: `https://www.instagram.com/${instagramConfig.username}/`
        },
        {
            image: 'https://via.placeholder.com/640x640?text=Instagram+Post+4',
            caption: 'Collaborating with amazing teams #teamwork #success',
            link: `https://www.instagram.com/${instagramConfig.username}/`
        },
        {
            image: 'https://via.placeholder.com/640x640?text=Instagram+Post+5',
            caption: 'My workspace setup #productivity #workfromhome',
            link: `https://www.instagram.com/${instagramConfig.username}/`
        },
        {
            image: 'https://via.placeholder.com/640x640?text=Instagram+Post+6',
            caption: 'Celebrating project milestones #achievement #progress',
            link: `https://www.instagram.com/${instagramConfig.username}/`
        }
    ];
    
    // Generate HTML for each post
    const postsHTML = placeholderPosts.slice(0, instagramConfig.feedCount).map(post => `
        <div class="instagram-post">
            <a href="${post.link}" target="_blank" rel="noopener">
                <div style="position: relative;">
                    <img src="${post.image}" alt="Instagram post" loading="lazy">
                    <div class="instagram-post-overlay">
                        <i class="fab fa-instagram" style="color: white; font-size: 2rem;"></i>
                    </div>
                </div>
                <div class="instagram-post-caption">
                    <p>${post.caption}</p>
                </div>
            </a>
        </div>
    `).join('');
    
    // Insert into container
    container.innerHTML = postsHTML;
}

console.log('Instagram module loaded');
