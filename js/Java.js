const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let index = 1; // започваме от първия реален слайд
let isTransitioning = false;

// клонираме първи и последен
const firstClone = slide[0].cloneNode(true);
const lastClone = slide[slide.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

slides.appendChild(firstClone);
slides.insertBefore(lastClone, slide[0]);

const allSlides = document.querySelectorAll(".slide");
const slideWidth = 100; // всеки слайд е 100%

slides.style.transform = `translateX(${-slideWidth * index}%)`;

// функция за показване
function showSlide(i) {
  if (isTransitioning) return;
  isTransitioning = true;

  slides.style.transition = "transform 0.5s ease-in-out";
  index = i;
  slides.style.transform = `translateX(${-slideWidth * index}%)`;

  slides.addEventListener("transitionend", () => {
    if (allSlides[index].id === "first-clone") {
      slides.style.transition = "none";
      index = 1;
      slides.style.transform = `translateX(${-slideWidth * index}%)`;
    }
    if (allSlides[index].id === "last-clone") {
      slides.style.transition = "none";
      index = allSlides.length - 2;
      slides.style.transform = `translateX(${-slideWidth * index}%)`;
    }
    isTransitioning = false;
  }, { once: true });

  // точки
  dots.forEach(dot => dot.classList.remove("active"));
  dots[(index - 1 + dots.length) % dots.length].classList.add("active");
}

function nextSlide() {
  if (index >= allSlides.length - 1) return;
  showSlide(index + 1);
}

function prevSlide() {
  if (index <= 0) return;
  showSlide(index - 1);
}

// автоматично
setInterval(nextSlide, 5000);

// бутони
document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);

// първоначално
showSlide(index);
