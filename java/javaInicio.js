
/* ========================================= */
            /* BOTON PARA SUBIR */
/* ========================================= */

const btnSubir = document.getElementById('btnSubir');

// Mostrar/ocultar el botón según el scroll
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 100) { // Aparece después de 100px
        btnSubir.classList.add('mostrar');
    } else {
        btnSubir.classList.remove('mostrar');
    }
});

// Al hacer clic, subir suavemente
btnSubir.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


/* ========================================= */
       /* Animación al hacer scroll */
/* ========================================= */

const observerOptions = {
    threshold: 0.1, // Se activa cuando el 10% del elemento es visible
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todas las secciones
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.hero, .como-funciona, .ingredientes, aside');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});
/* ========================================= */