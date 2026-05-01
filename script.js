// Menu mobile toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Fermer le menu mobile après clic
            navLinks.classList.remove('active');
        }
    });
});

// Animation des statistiques
const stats = document.querySelectorAll('.stat-number');

const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const count = parseInt(stat.innerText);
        const increment = target / 100;

        if (count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(animateStats, 20);
        } else {
            stat.innerText = target + '+';
        }
    });
};

// Observer pour déclencher l'animation des stats
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// Filtrage des projets
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Gestion de la classe active
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Navbar changeante au scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Animation d'apparition au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeElements = document.querySelectorAll('.skill-card, .project-card, .stat, .contact-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// Formulaire de contact
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulation d'envoi
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerText = 'Message envoyé !';
            submitBtn.style.background = 'linear-gradient(135deg, #00d4ff, #00ff88)';
            
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 3000);
        }, 1500);
    });
}

console.log('Portfolio chargé avec succès!');
