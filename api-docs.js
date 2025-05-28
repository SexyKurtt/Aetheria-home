// API Documentation JavaScript
// Handles expandable/collapsible API cards

document.addEventListener('DOMContentLoaded', function() {
    initializeApiCards();
    initializeSearchFunctionality();
    initializeKeyboardNavigation();
});

/**
 * Initialize API card expand/collapse functionality
 */
function initializeApiCards() {
    const apiCards = document.querySelectorAll('.api-card');
    
    apiCards.forEach(card => {
        const header = card.querySelector('.api-header');
        const content = card.querySelector('.api-content');
        const expandIcon = card.querySelector('.expand-icon');
        
        if (header && content && expandIcon) {
            // Add click event to header
            header.addEventListener('click', function() {
                toggleApiCard(card);
            });
            
            // Add keyboard support
            header.setAttribute('tabindex', '0');
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', 'false');
            
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleApiCard(card);
                }
            });
            
            // Add smooth animation setup
            content.style.maxHeight = '0px';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.4s ease, padding 0.4s ease';
        }
    });
}

/**
 * Toggle API card expanded state
 */
function toggleApiCard(card) {
    const content = card.querySelector('.api-content');
    const header = card.querySelector('.api-header');
    const isExpanded = card.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse the card
        collapseApiCard(card);
    } else {
        // Expand the card
        expandApiCard(card);
    }
    
    // Update ARIA attribute
    header.setAttribute('aria-expanded', !isExpanded);
    
    // Add ripple effect
    createHeaderRipple(header);
}

/**
 * Expand API card
 */
function expandApiCard(card) {
    const content = card.querySelector('.api-content');
    
    card.classList.add('expanded');
    
    // Calculate the full height needed
    content.style.maxHeight = 'none';
    const fullHeight = content.scrollHeight;
    content.style.maxHeight = '0px';
    
    // Trigger reflow and animate
    requestAnimationFrame(() => {
        content.style.maxHeight = fullHeight + 'px';
    });
    
    // Clean up after animation
    setTimeout(() => {
        if (card.classList.contains('expanded')) {
            content.style.maxHeight = 'none';
        }
    }, 400);
    
    // Scroll card into view if needed
    setTimeout(() => {
        scrollCardIntoView(card);
    }, 200);
}

/**
 * Collapse API card
 */
function collapseApiCard(card) {
    const content = card.querySelector('.api-content');
    
    // Set explicit height before collapsing
    content.style.maxHeight = content.scrollHeight + 'px';
    
    requestAnimationFrame(() => {
        content.style.maxHeight = '0px';
        card.classList.remove('expanded');
    });
}

/**
 * Scroll card into view if it's partially hidden
 */
function scrollCardIntoView(card) {
    const rect = card.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if card is partially below viewport
    if (rect.bottom > windowHeight - 50) {
        card.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }
}

/**
 * Create ripple effect on header click
 */
function createHeaderRipple(header) {
    const ripple = document.createElement('span');
    const rect = header.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = rect.width / 2 - size / 2;
    const y = rect.height / 2 - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('header-ripple');
    
    // Add ripple styles
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 102, 204, 0.2)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    header.style.position = 'relative';
    header.style.overflow = 'hidden';
    header.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Initialize search functionality (future enhancement)
 */
function initializeSearchFunctionality() {
    // Placeholder for search functionality
    // Can be implemented to filter API cards based on search terms
    console.log('Search functionality initialized (placeholder)');
}

/**
 * Initialize keyboard navigation
 */
function initializeKeyboardNavigation() {
    const apiCards = document.querySelectorAll('.api-card');
    
    document.addEventListener('keydown', function(e) {
        // ESC key to collapse all cards
        if (e.key === 'Escape') {
            apiCards.forEach(card => {
                if (card.classList.contains('expanded')) {
                    collapseApiCard(card);
                    const header = card.querySelector('.api-header');
                    header.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        // Ctrl/Cmd + A to expand all cards
        if ((e.ctrlKey || e.metaKey) && e.key === 'a' && e.shiftKey) {
            e.preventDefault();
            apiCards.forEach(card => {
                if (!card.classList.contains('expanded')) {
                    expandApiCard(card);
                    const header = card.querySelector('.api-header');
                    header.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });
}

/**
 * Utility function to expand all API cards
 */
function expandAllCards() {
    const apiCards = document.querySelectorAll('.api-card');
    apiCards.forEach(card => {
        if (!card.classList.contains('expanded')) {
            expandApiCard(card);
            const header = card.querySelector('.api-header');
            header.setAttribute('aria-expanded', 'true');
        }
    });
}

/**
 * Utility function to collapse all API cards
 */
function collapseAllCards() {
    const apiCards = document.querySelectorAll('.api-card');
    apiCards.forEach(card => {
        if (card.classList.contains('expanded')) {
            collapseApiCard(card);
            const header = card.querySelector('.api-header');
            header.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Filter API cards based on search term
 */
function filterApiCards(searchTerm) {
    const apiCards = document.querySelectorAll('.api-card');
    const term = searchTerm.toLowerCase();
    
    apiCards.forEach(card => {
        const apiName = card.querySelector('.api-name').textContent.toLowerCase();
        const apiDescription = card.querySelector('.api-description p').textContent.toLowerCase();
        const endpoints = Array.from(card.querySelectorAll('.endpoint')).map(ep => 
            ep.textContent.toLowerCase()
        ).join(' ');
        
        const isMatch = apiName.includes(term) || 
                       apiDescription.includes(term) || 
                       endpoints.includes(term);
        
        if (isMatch) {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .api-header {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
