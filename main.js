document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide"); // همه‌ی اسلایدها
  const slidesContainer = document.getElementById("slides");
  let index = 0;

  setInterval(() => {
    index = (index + 1) % slides.length;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  }, 5000);
});


document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const productCards = document.querySelectorAll(".card");

  searchInput.addEventListener("keyup", () => {
    const searchValue = searchInput.value.trim().toLowerCase();

    productCards.forEach(card => {
      const nameElement = card.querySelector(".name");

      if (!nameElement) return;

      const productName = nameElement.textContent.trim().toLowerCase();

      if (productName.includes(searchValue)) {
        card.style.display = "flex"; // یا block بسته به استایل کارت
      } else {
        card.style.display = "none";
      }
    });
  });
});
 