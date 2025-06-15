document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('translate-x-full');
        mobileMenuOverlay.classList.toggle('opacity-0');
        mobileMenuOverlay.classList.toggle('invisible');
        document.body.classList.toggle('menu-open');
    }

    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    mobileMenuClose.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking on links
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

    function setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
        updateToggleIcons();
    }

    function updateToggleIcons() {
        const isDark = document.documentElement.classList.contains('dark');
        document.querySelectorAll('.theme-icon').forEach(icon => {
            icon.classList.toggle('hidden', 
                (icon.classList.contains('fa-moon') && isDark) || 
                (icon.classList.contains('fa-sun') && !isDark)
            );
        });
    }

    function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
    }

    // Initialize theme
    function initializeTheme() {
        const storedTheme = localStorage.getItem('color-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            setTheme(prefersDark ? 'dark' : 'light');
        }
    }

    themeToggle.addEventListener('click', toggleTheme);
    mobileThemeToggle.addEventListener('click', toggleTheme);

    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('color-theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Sticky navbar on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('shadow-md');
            navbar.classList.remove('shadow-sm');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.add('shadow-sm');
        }
    });

    // Scroll to top button
    const scrollTopButton = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopButton.classList.remove('opacity-0', 'invisible');
            scrollTopButton.classList.add('opacity-100', 'visible');
        } else {
            scrollTopButton.classList.add('opacity-0', 'invisible');
            scrollTopButton.classList.remove('opacity-100', 'visible');
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

   // Notification functions
function showNotification(type, title, message) {
    const notification = document.getElementById('global-notification');
    const titleElement = document.getElementById('notification-title');
    const contentElement = document.getElementById('notification-content');
    
    // Set notification content
    titleElement.textContent = title;
    contentElement.textContent = message;
    
    // Set notification type
    notification.className = `notification ${type} p-4 rounded-lg shadow-lg flex items-start`;
    
    // Show notification
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('show');
    }, 50);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

function hideNotification() {
    const notification = document.getElementById('global-notification');
    notification.classList.remove('show');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 500);
}

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Set loading state
    submitButton.disabled = true;
    submitButton.innerHTML = `
        <span class="inline-flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
        </span>
    `;
    
    try {
        // Prepare form data
        const formData = new FormData(form);
        
        // Here you would normally make your API call
        // Example for Formspree:
        // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //     method: 'POST',
        //     body: formData,
        //     headers: {
        //         'Accept': 'application/json'
        //     }
        // });
        
        // Simulate API call (remove in production)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success notification
        showNotification(
            'success',
            'Message Sent!',
            'Thank you for contacting me. I will get back to you soon.'
        );
        
        // Reset form
        form.reset();
        
    } catch (error) {
        // Show error notification
        showNotification(
            'error',
            'Sending Failed',
            'There was an error sending your message. Please try again later.'
        );
        
    } finally {
        // Restore button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    function setupScrollAnimations() {
        const animateElements = document.querySelectorAll(
            '.project-card, .tech-icon, #about > div, #skills > div, #contact > div'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('project-card')) {
                        entry.target.classList.add('animate-fade-up');
                    } else if (entry.target.classList.contains('tech-icon')) {
                        entry.target.classList.add('animate-pop-in');
                    } else {
                        entry.target.classList.add('animate-fade-in');
                    }
                    
                    if (entry.target.id === 'skills') {
                        animateSkillBars();
                    }
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Animate skill bars
    function animateSkillBars() {
        document.querySelectorAll('.skill-bar').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
    }

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Initialize everything
    initializeTheme();
    updateToggleIcons();
    setupScrollAnimations();
});





