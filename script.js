// ========== Typing Effect ==========
const roles = [
    "Backend Developer",
    "Flutter Developer", 
    "IoT Enthusiast",
    "Creative Problem Solver"
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
    const current = roles[roleIndex];
    typingEl.textContent = current.substring(0, charIndex);

    if (!isDeleting && charIndex < current.length) {
        charIndex++;
        setTimeout(typeEffect, 80);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 40);
    } else if (!isDeleting) {
        setTimeout(() => { isDeleting = true; typeEffect(); }, 2000);
    } else {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
    }
}
typeEffect();

// ========== Navbar Scroll ==========
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 50);
    backToTop.classList.toggle('visible', scrollY > 500);
});

// ========== Mobile Nav Toggle ==========
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ========== Active Nav Link on Scroll ==========
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// ========== Back to Top ==========
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== Stat Counter Animation ==========
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(target * eased);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

// ========== Scroll Animations ==========
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in to elements
document.querySelectorAll(
    '.about-grid, .skill-category, .project-card, .contact-grid, .hero-stats'
).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ========== Project Filter ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            const show = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('hidden', !show);
            if (show) {
                card.style.animation = 'fadeIn 0.4s ease-out forwards';
            }
        });
    });
});

// ========== Contact Form ==========
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const originalHTML = btn.innerHTML;
    
    btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.disabled = false;
            this.reset();
        }, 3000);
    }, 1500);
});

// ========== Smooth scroll for anchor links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
