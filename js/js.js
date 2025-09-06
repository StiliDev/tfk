const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let index = 0;

function showSlide(i) {
  // ако сме извън диапазона, връщаме към началото
  if (i >= slide.length) index = 0;
  if (i < 0) index = slide.length - 1;

  slides.style.transform = `translateX(${-index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

function nextSlide() {
  index++;
  showSlide(index);
}

function prevSlide() {
  index--;
  showSlide(index);
}

// автоматично превъртане
setInterval(nextSlide, 5000);

// бутони
document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);



// показваме първия слайд при зареждане
showSlide(index);



