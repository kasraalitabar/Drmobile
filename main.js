var slideIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {slideIndex = 1}
  x[slideIndex-1].style.display = "block";
  setTimeout(carousel, 5000); // Change image every 2 seconds
}
function goToProduct(product) {
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "product.html";
}


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

document.querySelector('.mySlides').addEventListener('click', () => {
  const target = document.querySelector('.card');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
});

const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
document.getElementById("cart-count").textContent = cart.length;



function toggleCartModal() {
  const modal = document.getElementById("cartModal");
  modal.classList.toggle("show");
  renderCartModal();
}
