// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and sections
    const tabButtons = document.querySelectorAll('.tab-button');
    const sections = document.querySelectorAll('.section');

    // Function to switch tabs with smooth transition
    function switchTab(targetSection) {
        // Remove active class from all tabs and sections
        tabButtons.forEach(btn => btn.classList.remove('active'));
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.opacity = '0';
        });

        // Find and activate the target tab button
        const targetButton = document.querySelector(`[data-section="${targetSection}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        }

        // Find and show the target section with fade-in effect
        const targetSectionElement = document.getElementById(targetSection);
        if (targetSectionElement) {
            // Small delay to ensure the fade-out completes
            setTimeout(() => {
                targetSectionElement.classList.add('active');
                // Trigger reflow to ensure transition works
                targetSectionElement.offsetHeight;
                targetSectionElement.style.opacity = '1';
                
                // Scroll to top of content smoothly
                targetSectionElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        }

        // Save the current tab to localStorage
        localStorage.setItem('activeTab', targetSection);

        // Update URL hash without scrolling
        if (history.pushState) {
            history.pushState(null, null, `#${targetSection}`);
        } else {
            window.location.hash = targetSection;
        }
    }

    // Add click event listeners to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            switchTab(targetSection);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            switchTab(hash);
        } else {
            switchTab('about');
        }
    });

    // Check for URL hash or saved tab on page load
    function initializeTab() {
        const hash = window.location.hash.substring(1);
        const savedTab = localStorage.getItem('activeTab');
        
        if (hash) {
            switchTab(hash);
        } else if (savedTab) {
            switchTab(savedTab);
        } else {
            // Set initial opacity for the about section
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.style.opacity = '1';
            }
        }
    }

    // Initialize the correct tab
    initializeTab();

    // Add smooth scroll behavior for project links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add entrance animations to elements as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for entrance animations
    const animatedElements = document.querySelectorAll(
        '.education-item, .job-item, .project-item, .publication-item, .interest-item, .skill-category'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Add hover effect for images - slight zoom on hover
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add keyboard navigation for tabs
    document.addEventListener('keydown', function(e) {
        const activeButton = document.querySelector('.tab-button.active');
        const allButtons = Array.from(tabButtons);
        const currentIndex = allButtons.indexOf(activeButton);

        // Left arrow key
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            e.preventDefault();
            allButtons[currentIndex - 1].click();
            allButtons[currentIndex - 1].focus();
        }
        
        // Right arrow key
        if (e.key === 'ArrowRight' && currentIndex < allButtons.length - 1) {
            e.preventDefault();
            allButtons[currentIndex + 1].click();
            allButtons[currentIndex + 1].focus();
        }
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });

    // Performance: Lazy load images for better page speed
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add smooth scroll to top button (appears after scrolling down)
    let scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2563eb, #1e40af);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    `;
    document.body.appendChild(scrollTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
        this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
        ripple.classList.add('ripple');

        const rippleElement = button.getElementsByClassName('ripple')[0];
        if (rippleElement) {
            rippleElement.remove();
        }

        button.appendChild(ripple);
    }

    const buttons = document.querySelectorAll('.tab-button, .social-link, .project-link a');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Add CSS for ripple effect dynamically
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .tab-button, .social-link, .project-link a {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Console message for developers
    console.log('%c👋 Welcome to Banibrata Ghosh\'s Portfolio!', 'font-size: 20px; color: #2563eb; font-weight: bold;');
    console.log('%cInterested in the code? Check out the repository!', 'font-size: 14px; color: #6b7280;');
});