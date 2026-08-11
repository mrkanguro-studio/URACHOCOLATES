/*=====================================================
        ANIMACIONES DE APARICION AL HACER SCROLL
        URACHOCOLATES
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const elementos = document.querySelectorAll(
        ".about-content, .history-content, .history-img, .products-header, .product-card, .page-hero-content, .valor-card, .blog-card, .contacto-info, .contacto-form, .libro-form, .terminos-bloque"
    );

    elementos.forEach(el => el.classList.add("reveal"));

    const observer = new IntersectionObserver((entradas) => {

        entradas.forEach(entrada => {

            if(entrada.isIntersecting){

                entrada.target.classList.add("reveal-visible");
                observer.unobserve(entrada.target);

            }

        });

    }, { threshold: 0.15 });

    elementos.forEach(el => observer.observe(el));

});
