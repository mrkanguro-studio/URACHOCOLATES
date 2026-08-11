/*=====================================================
            CARRUSEL PRODUCTOS URACHOCOLATES
======================================================*/

const track = document.querySelector(".products-track");
const cards = document.querySelectorAll(".product-card");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const dots = document.querySelectorAll(".slider-dots .dot");

let currentPage = 0;
let cardsPerPage = 3;
let autoPlay;

/*======================================
        PRODUCTOS VISIBLES
=======================================*/

function updateCardsPerPage(){

    if(window.innerWidth <= 768){

        cardsPerPage = 1;

    }

    else if(window.innerWidth <= 992){

        cardsPerPage = 2;

    }

    else{

        cardsPerPage = 3;

    }

}

/*======================================
            ACTUALIZAR
=======================================*/

function updateSlider(){

    updateCardsPerPage();

    const totalPages = Math.ceil(cards.length / cardsPerPage);

    if(currentPage >= totalPages){

        currentPage = 0;

    }

    const wrapper = document.querySelector(".products-wrapper");

    const pageWidth = wrapper.offsetWidth;

    track.style.transform =
        `translateX(-${currentPage * pageWidth}px)`;

    dots.forEach(dot=>dot.classList.remove("active"));

    if(dots[currentPage]){

        dots[currentPage].classList.add("active");

    }

}

/*======================================
        SIGUIENTE
=======================================*/

function nextSlide(){

    const totalPages = Math.ceil(cards.length / cardsPerPage);

    currentPage++;

    if(currentPage >= totalPages){

        currentPage = 0;

    }

    updateSlider();

}

/*======================================
        ANTERIOR
=======================================*/

function prevSlide(){

    const totalPages = Math.ceil(cards.length / cardsPerPage);

    currentPage--;

    if(currentPage < 0){

        currentPage = totalPages-1;

    }

    updateSlider();

}

/*======================================
        EVENTOS
=======================================*/

nextBtn.addEventListener("click",()=>{

    nextSlide();

    restartAuto();

});

prevBtn.addEventListener("click",()=>{

    prevSlide();

    restartAuto();

});

/*======================================
        PUNTOS
=======================================*/

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentPage=index;

        updateSlider();

        restartAuto();

    });

});

/*======================================
        AUTOPLAY
=======================================*/

function startAuto(){

    autoPlay=setInterval(()=>{

        nextSlide();

    },4000);

}

function restartAuto(){

    clearInterval(autoPlay);

    startAuto();

}

/*======================================
        RESIZE
=======================================*/

window.addEventListener("resize",()=>{

    updateSlider();

});

/*======================================
        INICIAR
=======================================*/

updateSlider();

startAuto();