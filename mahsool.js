const data = JSON.parse(localStorage.getItem("selectedProduct"));
const root = document.getElementById("productDetail");

if (data) {
  root.innerHTML = `
    <div class="both">
      <div class="left">
        <img src="${data.image}" id="mainImage" width="500px" alt="${data.name}" />
        <div class="thumbnail-gallery">
    ${data.gallery.map(img => `
      <img src="${img}" class="thumbnail" onclick="changeMainImage('${img}')">
    `).join("")}
  </div>
</div>
      </div>
      <div class="right">
        <h1>${data.name}</h1>
        <hr/>
        <p>(Not Active)<p/>
        <p>همراه با 18 ماه گارانتی شرکتی<p/>
        <label> رنگ بندی:</label>
        <select id="colorSelect">
        ${data.colors.map(c => `<option>${c}</option>`).join("")}
        </select>
        <br><br>
        <label>پارت نامبر :</label>
        <input list="partOptions" id="partNumberSelect"placeholder=" ZA">
        <datalist id="partOptions">
        <option value="ZA">
        <option value="CH">
        </datalist>
        <p>قیمت: ${data.price.toLocaleString()} تومان</p>
        <br><br>
        <button onclick="addToCart()">افزودن به سبد خرید</button>
      </div>
    </div>  
  
      <a href="cart.html" class="floating-cart">
        🛒
        <span id="cart-count">0</span>
      </a>
      `;
} else {
  root.innerHTML = "<p>هیچ محصولی انتخاب نشده!</p>";
}

function addToCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const color = document.getElementById("colorSelect").value;
    const partNumber = document.getElementById("partNumberSelect").value;
  const existing = cart.find(p => p.id === data.id && p.color === color);
  if (existing) {
    existing.quantity++;
  } else {
     const existing = cart.find(p => p.id === data.id && p.color === color && p.partNumber === partNumber);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: data.id,
      name: data.name,
      price: data.price,
      image: data.image,
      color,
      partNumber,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`محصول با رنگ ${color} و Part Number ${partNumber} به سبد خرید اضافه شد.`);
}
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("محصول با رنگ " + color + " به سبد خرید اضافه شد.");


const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
document.getElementById("cart-count").textContent = cart.length;

const CART = JSON.parse(localStorage.getItem("cart")) ?? [];

async function getIdProduct(id) {
  return await fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .catch(err => console.log(err));
}

function toggleCartModal() {
  const modal = document.getElementById("cartModal");
  modal.classList.toggle("hidden");
  if (!modal.classList.contains("hidden")) {
    renderCartModal();
  }
}

async function renderCartModal() {
  const container = document.getElementById("cartItemsContainer");
  container.innerHTML = "<p>در حال بارگذاری...</p>";

  if (CART.length === 0) {
    container.innerHTML = "<p>سبد خرید شما خالی است.</p>";
    return;
  }

  const items = await Promise.all(CART.map(async cartItem => {
    const product = await getIdProduct(cartItem.id);
    return `
      <div class="border p-2 rounded-md flex items-center gap-3">
        <img src="${product.image}" class="w-16 h-16 object-contain" />
        <div>
          <h4 class="text-sm font-bold">${product.title}</h4>
          <p class="text-sm">تعداد: ${cartItem.quantity}</p>
          <p class="text-sm">قیمت: ${product.price}$</p>
        </div>
      </div>
    `;
  }));

  container.innerHTML = items.join("");
}


function changeMainImage(src) {
  document.getElementById("mainImage").src = src;
}