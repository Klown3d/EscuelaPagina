document.addEventListener('DOMContentLoaded', function() {

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', e => {
        if (!navToggle?.contains(e.target) && !navMenu?.contains(e.target)) {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });


    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const offset = document.querySelector('.nav')?.offsetHeight || 0;
                window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
            }
        });
    });


    const animatedElements = document.querySelectorAll('.feature-card, .program-card, .facility-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.addEventListener('click', () => showAlert(`Más info sobre ${el.querySelector('h3')?.textContent} próximamente.`, 'info'));
    });

    function handleScrollAnimation() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && !el.classList.contains('animated')) {
                el.classList.add('animated');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });

        const heroStats = document.querySelector('.hero-stats');
        if (heroStats && heroStats.getBoundingClientRect().top < window.innerHeight && !heroStats.classList.contains('animated')) {
            heroStats.classList.add('animated');
            heroStats.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
                let current = 0;
                const suffix = stat.textContent.replace(/\d/g, '');
                const interval = setInterval(() => {
                    current += target / 100;
                    if (current >= target) { current = target; clearInterval(interval); }
                    stat.textContent = Math.floor(current) + suffix;
                }, 20);
            });
        }
    }

    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();


    document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const target = btn.textContent.includes('Programas') ? '#programas' : '#contacto';
            document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });


    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', e => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(contactForm).entries());
        if (validateForm?.(formData)) submitForm?.(formData);
    });
});




// Cambios de header al hacer scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    const scrolled = window.pageYOffset;
    if (nav) {
        nav.style.background = scrolled > 100 ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)';
        nav.style.boxShadow = scrolled > 100 ? '0 4px 6px -1px rgba(0,0,0,0.1)' : '0 1px 2px 0 rgba(0,0,0,0.05)';
    }
});
