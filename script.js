function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skillFill');
    const skillsSection = document.querySelector('.skills');
    
    if (!skillsSection) return;
    
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.7) {
        skillFills.forEach((fill, index) => {
            const skillLevel = fill.getAttribute('data-skill');
            
            setTimeout(() => {
                fill.style.width = skillLevel + '%';
            }, index * 200);
        });
        
        window.removeEventListener('scroll', animateSkillBars);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', animateSkillBars);

    animateSkillBars();
});

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

document.getElementById('projectCard1').addEventListener('click', () => {
    window.open('https://github.com/Kushal096/House_Rent/', '_blank')
})
document.getElementById('projectCard2').addEventListener('click', () => {
    window.open('https://github.com/Kushal096/IPL', '_blank')
})
document.getElementById('projectCard3').addEventListener('click', () => {
    window.open('https://github.com/Kushal096/ExpireEye-client', '_blank')
})


const contactForm = document.querySelector('.contactForm form');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;


        localStorage.setItem('formData', JSON.stringify({
            name,
            email,
            subject,
            message
        }));


        window.location.href = 'formDetails.html';
    });
}

const formData = JSON.parse(localStorage.getItem('formData'));
if (formData) {
    const nameValue = document.getElementById('nameValue');
    const emailValue = document.getElementById('emailValue');
    const subjectValue = document.getElementById('subjectValue');
    const messageValue = document.getElementById('messageValue');

    if (nameValue) nameValue.textContent = formData.name;
    if (emailValue) emailValue.textContent = formData.email;
    if (subjectValue) subjectValue.textContent = formData.subject;
    if (messageValue) messageValue.textContent = formData.message;
}

const backBtn = document.querySelector('.backBtn')
if (backBtn) {
    backBtn.addEventListener('click' , () => {
        window.location.href = 'index.html'
    })
}

// Dark/Light Mode Toggle - Enhanced Version
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle?.querySelector('i');

// Initialize theme on page load
function initializeTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        body.classList.remove('dark-mode');
        updateThemeIcon(false);
    }
}

// Update theme icon based on current theme
function updateThemeIcon(isDark) {
    if (themeIcon) {
        if (isDark) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

// Toggle theme with smooth transition
function toggleTheme() {
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        updateThemeIcon(false);
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon(true);
    }
    
    // Add a subtle animation feedback
    if (themeToggle) {
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 150);
    }
}

// Initialize theme when page loads
document.addEventListener('DOMContentLoaded', initializeTheme);

// Add theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    
    // Add keyboard support for accessibility
    themeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });
    
    // Ensure the button is focusable
    themeToggle.setAttribute('tabindex', '0');
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
}

// Canvas Drawing Functionality
const canvas = document.getElementById('interactiveCanvas');
const ctx = canvas?.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clearCanvas');
const patternButton = document.getElementById('drawPattern');

if (canvas && ctx) {
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 3;
        ctx.strokeStyle = colorPicker?.value || '#4F46E5';
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        [lastX, lastY] = [x, y];
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        isDrawing = true;
        [lastX, lastY] = [touch.clientX - rect.left, touch.clientY - rect.top];
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 3;
        ctx.strokeStyle = colorPicker?.value || '#4F46E5';
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        [lastX, lastY] = [x, y];
    });

    canvas.addEventListener('touchend', () => isDrawing = false);

    // Clear canvas
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    }

    // Draw pattern
    if (patternButton) {
        patternButton.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
            
            ctx.fillStyle = gradient;
            
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 8; j++) {
                    const x = i * 40 + 20;
                    const y = j * 37.5 + 20;
                    const radius = 15;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        });
    }
}

// Image Slider Functionality
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const indicators = document.querySelectorAll('.indicator');

if (slides.length > 0) {
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-play slider
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
}

// Back to Top Button Functionality
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    function toggleBackToTopButton() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    window.addEventListener('scroll', toggleBackToTopButton);
    backToTopButton.addEventListener('click', scrollToTop);

    // Show/hide on scroll
    toggleBackToTopButton();
}