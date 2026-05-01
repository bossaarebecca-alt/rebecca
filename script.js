// ========================================
// PORTFOLIO EXCEPTIONNEL - JAVASCRIPT
// ========================================

// Curseur personnalisé
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Effet hover sur les liens et boutons
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursorFollower.style.width = '70px';
            cursorFollower.style.height = '70px';
            cursorFollower.style.opacity = '0.3';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.opacity = '0.5';
        });
    });
}

// Création des particules
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Menu mobile toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animation au scroll avec Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animation des barres de compétences
            const skillBars = entry.target.querySelectorAll('.skill-bar');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            
            // Animation des compteurs de statistiques
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                if (!isNaN(target) && !stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateCounter(stat, target);
                }
            });
        }
    });
}, observerOptions);

// Appliquer l'animation aux éléments
document.querySelectorAll('.skill-card, .project-card, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Compteur animé pour les statistiques
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
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
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Effet Tilt sur les cartes
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des données
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Validation simple
        if (!name || !email || !message) {
            showAlert('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showAlert('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        // Simulation d'envoi
        showAlert('Message envoyé avec succès ! Je vous répondrai bientôt.', 'success');
        this.reset();
    });
}

// Fonction de validation d'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fonction pour afficher les alertes
function showAlert(message, type) {
    // Supprimer les anciennes alertes
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Créer l'alerte
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        font-weight: 500;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(alert);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alert.remove(), 300);
    }, 5000);
}

// Ajouter les animations CSS pour les alertes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Effet de parallaxe sur le hero
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

// Animation du cube au survol
const cubeContainer = document.querySelector('.cube-container');
if (cubeContainer) {
    cubeContainer.addEventListener('mousemove', (e) => {
        const rect = cubeContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const rotateY = (x / rect.width - 0.5) * 60;
        const rotateX = (0.5 - y / rect.height) * 60;
        
        const cube = cubeContainer.querySelector('.cube');
        if (cube) {
            cube.style.animation = 'none';
            cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });
    
    cubeContainer.addEventListener('mouseleave', () => {
        const cube = cubeContainer.querySelector('.cube');
        if (cube) {
            cube.style.animation = 'cubeRotate 15s linear infinite';
        }
    });
}

console.log('Portfolio exceptionnel chargé avec succès ! 🚀✨');
