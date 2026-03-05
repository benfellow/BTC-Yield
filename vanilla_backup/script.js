document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission mock
    const form = document.getElementById('lead-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.querySelector('.submit-btn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('email').value;
            
            // Simple validation
            if (emailInput && emailInput.includes('@')) {
                // Button loading state
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Verifying...';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.8';

                // Mock API call delay
                setTimeout(() => {
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    
                    formMessage.classList.remove('hidden');
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formMessage.classList.add('hidden');
                    }, 5000);
                }, 1500);
            }
        });
    }

    // Intersection Observer for subtle reveal animations (optional enhancement)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add simple fade-in classes via JS to elements that should animate
    const cards = document.querySelectorAll('.engine-card, .fee-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
        card.style.transitionDelay = `${index * 0.15}s`;
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.pointerEvents = 'auto'; // ensure hover effects work
                }
            });
        }, observerOptions);
        
        cardObserver.observe(card);
    });
});
