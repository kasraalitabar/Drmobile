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
  modal.classList.toggle("hidden");
  if (!modal.classList.contains("hidden")) {
    renderCartModal(); // برای نمایش سبد
  }
}



function renderCartModal() {
  const container = document.getElementById("cartItems");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    container.innerHTML = "<p class='text-center text-gray-600'>سبد خرید شما خالی است.</p>";
    return;
  }

  container.innerHTML = cart.map((item, index) => `
    <div class="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
      <div class="flex items-center gap-3">
        <img src="${item.image}" width="60" class="rounded-md border" />
        <div>
          <h4 class="font-semibold">${item.name}</h4>
          <p class="text-sm text-gray-600">رنگ: <span class="text-black">${item.color}</span></p>
          <p class="text-sm text-gray-600">پارت نامبر: <span class="text-black">${item.partNumber}</span></p>
          <p class="text-sm text-gray-600">تعداد: ${item.quantity}</p>
          <p class="text-sm font-bold text-blue-600">قیمت: ${item.price.toLocaleString()} تومان</p>
        </div>
      </div>
      <button onclick="removeFromCart(${index})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">حذف</button>
    </div>
  `).join("");
}
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}


function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // حذف آیتم با استفاده از index
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartModal(); // برای به‌روزرسانی لیست
  updateCartCount(); // تعداد سبد را آپدیت کن
}

function toggleCartModal() {
  const modal = document.getElementById("cartModal");
  modal.classList.toggle("hidden");
  if (!modal.classList.contains("hidden")) {
    renderCartModal();
  }
}


