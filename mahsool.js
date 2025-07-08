const data = JSON.parse(localStorage.getItem("selectedProduct"));
const root = document.getElementById("productDetail");

if (data) {
  root.innerHTML = `
  <div class="both">
      <div class="left">
        <img src="${data.image}" width="300px" alt="${data.name}" />
      <div/>
      <div class="right">
        <h1>${data.name}</h1>
              <hr/>

        <p>قیمت: ${data.price.toLocaleString()} تومان</p>
        <label> رنگ بندی:</label>
        <select id="colorSelect">
          ${data.colors.map(c => `<option>${c}</option>`).join("")}
        </select>
        <br><br>
        <button onclick="addToCart()">افزودن به سبد خرید</button>
      <div/>
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
  const existing = cart.find(p => p.id === data.id && p.color === color);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id: data.id, name: data.name, price: data.price, image: data.image, color, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("محصول با رنگ " + color + " به سبد خرید اضافه شد.");
}

 const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
  document.getElementById("cart-count").textContent = cart.length;

 