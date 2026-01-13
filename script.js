// ============================================
// AEROSPACE PORTFOLIO JAVASCRIPT
// ============================================

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

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

// Observe all cards and timeline items
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.experience-card, .research-card, .volunteer-card, .award-category, .extracurricular-item, .timeline-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add more stars dynamically
function createStars() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'stars';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        heroBackground.appendChild(star);
    }
}

// Initialize stars on page load
window.addEventListener('load', createStars);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 500;
    }
});

// Add hover glow effect to cards
document.querySelectorAll('.experience-card, .research-card, .volunteer-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 5px 30px rgba(77, 159, 191, 0.5)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Mobile menu toggle
const createMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.nav-container');
    
    if (!navMenu || !navContainer) return;
    
    // Check if button already exists
    let menuButton = document.querySelector('.mobile-menu-toggle');
    if (!menuButton) {
        menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-toggle';
        menuButton.setAttribute('aria-label', 'Toggle menu');
        menuButton.innerHTML = '☰';
        navContainer.appendChild(menuButton);
    }
    
    // Toggle menu function
    const toggleMenu = (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        const isActive = navMenu.classList.contains('active');
        menuButton.innerHTML = isActive ? '✕' : '☰';
    };
    
    // Remove existing listeners and add new one
    const newButton = menuButton.cloneNode(true);
    menuButton.parentNode.replaceChild(newButton, menuButton);
    newButton.addEventListener('click', toggleMenu);
    
    // Close mobile menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                newButton.innerHTML = '☰';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            navMenu.classList.contains('active') &&
            !navContainer.contains(e.target)) {
            navMenu.classList.remove('active');
            newButton.innerHTML = '☰';
        }
    });
    
    // Show/hide mobile menu button based on screen size
    const checkScreenSize = () => {
        if (window.innerWidth <= 768) {
            newButton.style.display = 'block';
            if (!navMenu.classList.contains('active')) {
                navMenu.style.display = 'none';
            }
        } else {
            newButton.style.display = 'none';
            navMenu.style.display = 'flex';
            navMenu.classList.remove('active');
            newButton.innerHTML = '☰';
        }
    };
    
    // Initial check
    checkScreenSize();
    
    // Debounce resize event
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkScreenSize, 250);
    });
};

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', createMobileMenu);

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, var(--blue-accent), var(--blue-bright))';
    progressBar.style.zIndex = '10000';
    progressBar.style.transition = 'width 0.1s ease';
    progressBar.style.boxShadow = '0 0 10px var(--blue-glow)';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Add console message
console.log('%c🚀 Aerospace Portfolio', 'color: #3d7a9f; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to Shreyas Mathur\'s Portfolio', 'color: #b8d0e0; font-size: 14px;');

