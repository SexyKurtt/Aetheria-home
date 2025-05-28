// Projects Page JavaScript
// Handles project card interactions and navigation

document.addEventListener('DOMContentLoaded', function() {
    initializeProjectCards();
    initializeImageLoading();
    initializeKeyboardNavigation();
    initializeIntersectionObserver();
});

/**
 * Initialize project card click functionality
 */
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const projectUrl = card.getAttribute('data-url');
        
        if (projectUrl) {
            // Add click event
            card.addEventListener('click', function(e) {
                e.preventDefault();
                handleProjectClick(card, projectUrl);
            });
            
            // Add keyboard support
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Open ${card.querySelector('.project-name').textContent} project`);
            
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProjectClick(card, projectUrl);
                }
            });
            
            // Add hover effects
            card.addEventListener('mouseenter', function() {
                addHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', function() {
                removeHoverEffect(card);
            });
        }
    });
}

/**
 * Handle project card click
 */
function handleProjectClick(card, url) {
    // Add click animation
    card.classList.add('clicked');
    
    // Create ripple effect
    createClickRipple(card);
    
    // Open URL in new tab after short delay for animation
    setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
        card.classList.remove('clicked');
    }, 150);
    
    // Track analytics (placeholder)
    trackProjectClick(card.querySelector('.project-name').textContent, url);
}

/**
 * Create ripple effect on card click
 */
function createClickRipple(card) {
    const ripple = document.createElement('div');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = rect.width / 2 - size / 2;
    const y = rect.height / 2 - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('click-ripple');
    
    // Add ripple styles
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 102, 204, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'clickRipple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '10';
    
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Add hover effect to project card
 */
function addHoverEffect(card) {
    const overlay = card.querySelector('.project-overlay');
    const screenshot = card.querySelector('.project-screenshot');
    
    if (overlay) {
        overlay.style.opacity = '1';
    }
    
    if (screenshot) {
        screenshot.style.transform = 'scale(1.1)';
    }
}

/**
 * Remove hover effect from project card
 */
function removeHoverEffect(card) {
    const overlay = card.querySelector('.project-overlay');
    const screenshot = card.querySelector('.project-screenshot');
    
    if (overlay) {
        overlay.style.opacity = '0';
    }
    
    if (screenshot) {
        screenshot.style.transform = 'scale(1)';
    }
}

/**
 * Initialize image loading with fallbacks
 */
function initializeImageLoading() {
    const projectImages = document.querySelectorAll('.project-screenshot');
    
    projectImages.forEach(img => {
        // Add loading state
        img.addEventListener('loadstart', function() {
            this.parentElement.classList.add('loading');
        });
        
        // Handle successful load
        img.addEventListener('load', function() {
            this.parentElement.classList.remove('loading');
            this.parentElement.classList.add('loaded');
        });
        
        // Handle load error
        img.addEventListener('error', function() {
            this.parentElement.classList.remove('loading');
            this.parentElement.classList.add('error');
            
            // Create fallback content
            const fallback = document.createElement('div');
            fallback.className = 'image-fallback';
            fallback.innerHTML = `
                <i class="fas fa-image"></i>
                <span>Project Preview</span>
            `;
            
            this.parentElement.appendChild(fallback);
            this.style.display = 'none';
        });
    });
}

/**
 * Initialize keyboard navigation
 */
function initializeKeyboardNavigation() {
    const projectCards = document.querySelectorAll('.project-card');
    
    document.addEventListener('keydown', function(e) {
        const focusedCard = document.activeElement;
        
        if (focusedCard && focusedCard.classList.contains('project-card')) {
            const currentIndex = Array.from(projectCards).indexOf(focusedCard);
            let nextIndex = currentIndex;
            
            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    nextIndex = (currentIndex + 1) % projectCards.length;
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    nextIndex = (currentIndex - 1 + projectCards.length) % projectCards.length;
                    break;
                case 'Home':
                    e.preventDefault();
                    nextIndex = 0;
                    break;
                case 'End':
                    e.preventDefault();
                    nextIndex = projectCards.length - 1;
                    break;
            }
            
            if (nextIndex !== currentIndex) {
                projectCards[nextIndex].focus();
            }
        }
    });
}

/**
 * Initialize intersection observer for animations
 */
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
}

/**
 * Filter projects by technology/tag
 */
function filterProjects(filterTag) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => 
            tag.textContent.toLowerCase()
        );
        
        if (filterTag === 'all' || tags.includes(filterTag.toLowerCase())) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        }
    });
}

/**
 * Sort projects by name or date
 */
function sortProjects(sortBy) {
    const projectsGrid = document.querySelector('.projects-grid');
    const projectCards = Array.from(document.querySelectorAll('.project-card'));
    
    projectCards.sort((a, b) => {
        const nameA = a.querySelector('.project-name').textContent;
        const nameB = b.querySelector('.project-name').textContent;
        
        if (sortBy === 'name') {
            return nameA.localeCompare(nameB);
        }
        // Add more sorting options as needed
        return 0;
    });
    
    // Re-append sorted cards
    projectCards.forEach(card => {
        projectsGrid.appendChild(card);
    });
}

/**
 * Track project click for analytics
 */
function trackProjectClick(projectName, projectUrl) {
    // Placeholder for analytics tracking
    console.log(`Project clicked: ${projectName} - ${projectUrl}`);
    
    // Example: Google Analytics event
    // gtag('event', 'project_click', {
    //     'project_name': projectName,
    //     'project_url': projectUrl
    // });
}

/**
 * Get all unique technologies from projects
 */
function getProjectTechnologies() {
    const allTags = document.querySelectorAll('.tag');
    const technologies = new Set();
    
    allTags.forEach(tag => {
        technologies.add(tag.textContent.trim());
    });
    
    return Array.from(technologies).sort();
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes clickRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .project-card {
        position: relative;
        overflow: hidden;
    }
    
    .image-fallback {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: white;
        font-size: 1.2rem;
    }
    
    .image-fallback i {
        font-size: 3rem;
        margin-bottom: 0.5rem;
        display: block;
    }
    
    .project-image.loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(style);
