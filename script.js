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
backBtn.addEventListener('click' , () => {
    window.location.href = 'index.html'
})