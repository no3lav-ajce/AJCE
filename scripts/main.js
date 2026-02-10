// Main JavaScript Entry Point

document.addEventListener('DOMContentLoaded', () => {
    console.log('AJCE Website Loaded');

    initStickyHeader();
    initStatsCounter();
    initMobileMenu();
    initScrollAnimations();
});

function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav-links');

    if (btn && nav) {
        btn.addEventListener('click', () => {
            const isVisible = nav.style.display === 'flex';

            nav.classList.toggle('active');

            if (isVisible) {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'flex';
                // Inline styles for mobile menu behavior
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = 'white';
                nav.style.padding = '1rem';
                nav.style.boxShadow = 'var(--shadow-lg)';
                nav.style.zIndex = '999';
            }
        });
    }
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.card, .hero-content, .section h2, .section p, .stat-card');

    // Add initial class
    elements.forEach(el => el.classList.add('fade-up'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}


function initStickyHeader() {
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
            header.style.height = '70px'; // Slightly smaller on scroll
        } else {
            header.style.boxShadow = 'none';
            header.style.height = 'var(--header-height)';
        }
    });
}

function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCount(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateCount(el, target) {
    let current = 0;
    const increment = target / 50; // Adjust speed
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.ceil(current);
        }
    }, 30);
}

