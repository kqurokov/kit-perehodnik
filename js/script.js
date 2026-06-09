document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const carousel = document.querySelector('.carousel-container');
    
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            const link = card.getAttribute('data-link');
            if (link) window.open(link, '_blank');
        });
    });
    
    if (carousel) {
        let isScrolling = false;
        
        carousel.addEventListener('scroll', () => {
            if (!isScrolling) {
                isScrolling = true;
                setTimeout(() => {
                    isScrolling = false;
                }, 100);
            }
        });
    }
    
    const modal = document.getElementById('imageModal');
    const portrait = document.getElementById('portrait');
    const closeBtn = document.querySelector('.modal-close');
    
    if (portrait) {
        portrait.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    const elements = document.querySelectorAll('.carousel-container, .about, .portrait');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(22px)';
        el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        observer.observe(el);
    });
});