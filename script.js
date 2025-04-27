document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
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
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form .form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            fetch('contact_form.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                if (data.includes('Thank You')) {
                    this.reset();
                }
            })
            .catch(error => {
                alert('Error: ' + error);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Theme switching functionality
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switcher';

    const themes = [
        { name: 'light', class: 'light', label: 'Light Theme' },
        { name: 'dark', class: 'dark', label: 'Dark Theme' },
        { name: 'earthy', class: 'earthy', label: 'Earthy Theme' },
        { name: 'cool', class: 'cool', label: 'Cool Theme' }
    ];

    themes.forEach(theme => {
        const btn = document.createElement('button');
        btn.className = `theme-btn ${theme.class}`;
        btn.title = theme.label;
        btn.setAttribute('aria-label', theme.label);
        btn.addEventListener('click', () => {
            document.documentElement.setAttribute('data-theme', theme.name);
            localStorage.setItem('theme', theme.name);
        });
        themeSwitcher.appendChild(btn);
    });

    document.body.appendChild(themeSwitcher);

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Rest of your existing JavaScript...
});