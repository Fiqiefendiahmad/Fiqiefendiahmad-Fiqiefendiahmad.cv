// Project filtering functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get filter buttons and projects grid
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!filterBtns.length || !projectsGrid) {
        console.log('Project filtering elements not found');
        return;
    }
    
    console.log('Project filter initialized with', filterBtns.length, 'buttons');
    
    // Initialize - show all projects at start
    initializeProjects();
    
    // Add click event to each filter button
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            console.log('Filtering by:', filterValue);
            
            // Apply filter directly to each project card for reliability
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                } else {
                    const category = card.getAttribute('data-category');
                    card.style.display = (category === filterValue) ? 'flex' : 'none';
                }
            });
            
            // Animate the filtered items
            animateFilteredItems();
        });
    });
    
    function initializeProjects() {
        // Ensure all projects are visible initially
        const allProjects = document.querySelectorAll('.project-card');
        allProjects.forEach(project => {
            project.style.display = 'flex';
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
        });
    }
    
    function animateFilteredItems() {
        const visibleProjects = document.querySelectorAll('.project-card[style*="display: flex"]');
        console.log('Animating', visibleProjects.length, 'visible projects');
        
        visibleProjects.forEach((project, index) => {
            // Reset to invisible first
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            
            // Animate in with delay
            setTimeout(() => {
                project.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
});
