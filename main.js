document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide"); // همه‌ی اسلایدها
  const slidesContainer = document.getElementById("slides");
  let index = 0;

  setInterval(() => {
    index = (index + 1) % slides.length;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  }, 5000);
});