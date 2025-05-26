// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Smooth cursor follower
function updateFollower() {
    const speed = 0.2;
    followerX += (mouseX - followerX) * speed;
    followerY += (mouseY - followerY) * speed;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(updateFollower);
}
updateFollower();

// Cursor effects on hover
document.querySelectorAll('a, button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Smooth scrolling for navigation links
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

// Enhanced navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(13, 17, 23, 0.95)';
        navbar.style.borderBottom = '1px solid rgba(33, 38, 45, 0.8)';
        navbar.style.backdropFilter = 'blur(25px) saturate(200%)';
    } else {
        navbar.style.background = 'rgba(13, 17, 23, 0.85)';
        navbar.style.borderBottom = '1px solid rgba(33, 38, 45, 0.5)';
        navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate stats numbers
            if (entry.target.classList.contains('stat-number')) {
                animateNumber(entry.target);
            }
        }
    });
}, observerOptions);

// Apply animations to elements
document.querySelectorAll('.about-text, .tech-grid, .project-card, .contact-text, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Animate numbers
function animateNumber(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
    }, 16);
}

// Particle system for hero background
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#ffffff';
        particle.style.opacity = Math.random() * 0.5;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `particleFloat ${5 + Math.random() * 10}s linear infinite`;
        
        particlesContainer.appendChild(particle);
    }
}

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.5;
        }
        90% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// Project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const image = card.querySelector('.project-image');
        image.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        const image = card.querySelector('.project-image');
        image.style.transform = 'scale(1)';
    });
});

// Form submission
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            e.target.reset();
        }, 2000);
    }, 1500);
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Add mobile nav styles
const mobileNavStyle = document.createElement('style');
mobileNavStyle.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: var(--dark-bg);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: left 0.3s ease;
        }
        
        .nav-links.active {
            left: 0;
            display: flex;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(mobileNavStyle);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Enhanced loading animation with preloader
window.addEventListener('load', () => {
    // Create preloader
    const preloader = document.createElement('div');
    preloader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #010409 0%, #0d1117 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.8s ease;
        ">
            <div style="
                text-align: center;
                color: #f0f6fc;
                font-family: 'Inter', sans-serif;
            ">
                <div style="
                    width: 50px;
                    height: 50px;
                    border: 3px solid rgba(255, 107, 107, 0.3);
                    border-top: 3px solid #ff6b6b;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                "></div>
                <div style="font-size: 1.2rem; font-weight: 600;">LOADING NEXUS</div>
            </div>
        </div>
    `;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(preloader);
    
    // Remove preloader after delay
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 800);
    }, 1500);
});

console.log('🚀 NEXUS website loaded successfully!');
console.log('Built with cutting-edge web technologies');