// Personal Portfolio JavaScript
// Enhanced interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactions
    initializeAnimations();
    initializeSocialLinks();
    initializeImagePlaceholder();
    initializeNavigation();
    initializeThemeSystem();
    initializeEasterEgg();
});

/**
 * Initialize smooth animations and transitions
 */
function initializeAnimations() {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-content p');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Enhanced social media link interactions
 */
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        // Add ripple effect on click
        link.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });

        // Add hover sound effect (optional - can be enabled later)
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Create ripple effect on social link click
 */
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Add ripple styles
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 102, 204, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Image placeholder interactions
 */
function initializeImagePlaceholder() {
    const imagePlaceholder = document.querySelector('.image-placeholder');
    const animatedBorder = document.querySelector('.animated-border');
    const profileImage = document.querySelector('.profile-image');
    const fallbackIcon = document.querySelector('.fallback-icon');

    if (imagePlaceholder && animatedBorder) {
        // Handle image loading
        if (profileImage) {
            profileImage.addEventListener('load', function() {
                imagePlaceholder.classList.add('has-image');
                fallbackIcon.style.display = 'none';
            });

            profileImage.addEventListener('error', function() {
                imagePlaceholder.classList.remove('has-image');
                profileImage.classList.add('error');
                fallbackIcon.style.display = 'block';
            });

            // Check if image is already loaded (cached)
            if (profileImage.complete) {
                if (profileImage.naturalWidth > 0) {
                    imagePlaceholder.classList.add('has-image');
                    fallbackIcon.style.display = 'none';
                } else {
                    imagePlaceholder.classList.remove('has-image');
                    profileImage.classList.add('error');
                    fallbackIcon.style.display = 'block';
                }
            }
        }

        // Add click interaction to image placeholder
        imagePlaceholder.addEventListener('click', function() {
            // Trigger a special animation on click
            animatedBorder.style.animationDuration = '0.5s';

            setTimeout(() => {
                animatedBorder.style.animationDuration = '2.5s';
            }, 1000);
        });

        // Add hover effect to pause/resume animation
        imagePlaceholder.addEventListener('mouseenter', function() {
            animatedBorder.style.animationPlayState = 'paused';
        });

        imagePlaceholder.addEventListener('mouseleave', function() {
            animatedBorder.style.animationPlayState = 'running';
        });
    }
}

/**
 * Utility function to add CSS animation keyframes dynamically
 */
function addRippleKeyframes() {
    if (!document.querySelector('#ripple-keyframes')) {
        const style = document.createElement('style');
        style.id = 'ripple-keyframes';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add ripple keyframes when script loads
addRippleKeyframes();

/**
 * Smooth typing effect for name (optional enhancement)
 */
function typeWriterEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
}

/**
 * Performance optimization: Reduce animations on low-end devices
 */
function optimizeForPerformance() {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition', 'none');

        // Disable complex animations
        const animatedBorder = document.querySelector('.animated-border');
        if (animatedBorder) {
            animatedBorder.style.animation = 'none';
            animatedBorder.style.background = 'var(--primary-blue)';
        }
    }
}

// Initialize performance optimizations
optimizeForPerformance();

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (hamburger && navMenu &&
            !hamburger.contains(event.target) &&
            !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Update active nav link based on current page
    updateActiveNavLink();
}

/**
 * Update active navigation link based on current page
 */
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage ||
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize theme system
 */
function initializeThemeSystem() {
    const themeToggle = document.getElementById('themeToggle');
    const pinkIcon = document.querySelector('.pink-icon');

    // Load saved theme and pink unlock status
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    const pinkUnlocked = localStorage.getItem('portfolio-pink-unlocked') === 'true';

    // Show pink icon if unlocked
    if (pinkUnlocked && pinkIcon) {
        pinkIcon.style.display = 'block';
    }

    // Apply saved theme
    applyTheme(savedTheme);

    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            cycleTheme();
        });

        // Keyboard support
        themeToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                cycleTheme();
            }
        });

        themeToggle.setAttribute('tabindex', '0');
        themeToggle.setAttribute('role', 'button');
        themeToggle.setAttribute('aria-label', 'Toggle theme');
    }
}

/**
 * Cycle through available themes
 */
function cycleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const pinkUnlocked = localStorage.getItem('portfolio-pink-unlocked') === 'true';

    let nextTheme;
    if (currentTheme === 'light') {
        nextTheme = 'dark';
    } else if (currentTheme === 'dark') {
        nextTheme = pinkUnlocked ? 'pink' : 'light';
    } else if (currentTheme === 'pink') {
        nextTheme = 'light';
    } else {
        nextTheme = 'light';
    }

    applyTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
}

/**
 * Apply theme to document
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    // Update theme toggle aria-label
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeNames = {
            light: 'Light theme active',
            dark: 'Dark theme active',
            pink: 'Pink theme active'
        };
        themeToggle.setAttribute('aria-label', themeNames[theme] || 'Toggle theme');
    }

    // Update scrollbar colors
    updateScrollbarColors(theme);
}

/**
 * Update scrollbar colors based on theme
 */
function updateScrollbarColors(theme) {
    const root = document.documentElement;

    if (theme === 'dark') {
        root.style.setProperty('--scrollbar-thumb', 'rgba(255, 255, 255, 0.3)');
        root.style.setProperty('--scrollbar-thumb-hover', 'rgba(255, 255, 255, 0.5)');
    } else if (theme === 'pink') {
        root.style.setProperty('--scrollbar-thumb', 'rgba(233, 30, 99, 0.3)');
        root.style.setProperty('--scrollbar-thumb-hover', 'rgba(233, 30, 99, 0.5)');
    } else {
        root.style.setProperty('--scrollbar-thumb', 'rgba(0, 102, 204, 0.3)');
        root.style.setProperty('--scrollbar-thumb-hover', 'rgba(0, 102, 204, 0.5)');
    }
}

/**
 * Initialize Easter Egg functionality
 */
function initializeEasterEgg() {
    const secretInput = document.getElementById('secretInput');
    const notification = document.getElementById('easterEggNotification');
    const pinkIcon = document.querySelector('.pink-icon');

    if (secretInput) {
        secretInput.addEventListener('input', function(e) {
            const value = e.target.value.toLowerCase();

            if (value === 'pembe') {
                unlockPinkTheme();
                e.target.value = '';
                e.target.blur();
            } else if (value === 'yılan') {
                activateSnakeGame();
                e.target.value = '';
                e.target.blur();
            }
        });

        // Clear input on blur
        secretInput.addEventListener('blur', function(e) {
            setTimeout(() => {
                e.target.value = '';
            }, 100);
        });
    }

    // Keyboard shortcut: Ctrl+Shift+P
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'P') {
            e.preventDefault();
            if (secretInput) {
                secretInput.focus();
            }
        }
    });
}

/**
 * Unlock pink theme
 */
function unlockPinkTheme() {
    const notification = document.getElementById('easterEggNotification');
    const pinkIcon = document.querySelector('.pink-icon');

    // Save unlock status
    localStorage.setItem('portfolio-pink-unlocked', 'true');

    // Show pink icon
    if (pinkIcon) {
        pinkIcon.style.display = 'block';
    }

    // Show notification
    if (notification) {
        notification.classList.add('show');

        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Apply pink theme
    applyTheme('pink');
    localStorage.setItem('portfolio-theme', 'pink');

    // Add sparkle effect
    createSparkleEffect();
}

/**
 * Activate Snake Game Easter Egg
 */
function activateSnakeGame() {
    // Create transition effect
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'var(--background)';
    overlay.style.zIndex = '10000';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.flexDirection = 'column';
    overlay.style.color = 'var(--text-primary)';
    overlay.style.fontSize = '2rem';
    overlay.style.fontWeight = 'bold';

    overlay.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;"></div>
            <div>Loading</div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Fade in overlay
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
    });

    // Redirect to snake game after animation
    setTimeout(() => {
        window.location.href = 'snake-game.html';
    }, 1500);
}

/**
 * Create sparkle effect for easter egg unlock
 */
function createSparkleEffect() {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.style.position = 'fixed';
    sparkleContainer.style.top = '0';
    sparkleContainer.style.left = '0';
    sparkleContainer.style.width = '100%';
    sparkleContainer.style.height = '100%';
    sparkleContainer.style.pointerEvents = 'none';
    sparkleContainer.style.zIndex = '9999';

    document.body.appendChild(sparkleContainer);

    // Create multiple sparkles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createSparkle(sparkleContainer);
        }, i * 100);
    }

    // Remove container after animation
    setTimeout(() => {
        document.body.removeChild(sparkleContainer);
    }, 3000);
}

/**
 * Create individual sparkle
 */
function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = Math.random() * 20 + 15 + 'px';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
    sparkle.style.pointerEvents = 'none';

    container.appendChild(sparkle);

    // Remove sparkle after animation
    setTimeout(() => {
        if (container.contains(sparkle)) {
            container.removeChild(sparkle);
        }
    }, 2000);
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 0;
            transform: translateY(0) rotate(0deg) scale(0);
        }
        50% {
            opacity: 1;
            transform: translateY(-50px) rotate(180deg) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) rotate(360deg) scale(0);
        }
    }
`;
document.head.appendChild(sparkleStyle);
