const data = JSON.parse(localStorage.getItem("selectedProduct"));
const root = document.getElementById("productDetail");

if (data) {
  root.innerHTML = `
    <div class="both">
      <div class="left">
        <img src="${data.image}" id="mainImage" width="500px" alt="${data.name}" />
        <div class="thumbnail-gallery">
    ${data.gallery.map(img => `
      <img width="500px" src="${img}" class="thumbnail" onclick="changeMainImage('${img}')">
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
        <option value="ZA/A دو سیم کارت">
        <option value="CH/A دو سیم کارت">
        </datalist>
        <p>قیمت: ${data.price.toLocaleString()} تومان</p>
        <br><br>
        <button onclick="addToCart()">افزودن به سبد خرید</button>
        <p> گوشی های ایفون  موجود به همراه ۱۸ ماه گارانتی و کد رجیستری شرکتی می باشد</p>
      </div>
    </div>  
  
      
      `;
} else {
  root.innerHTML = "<p>هیچ محصولی انتخاب نشده!</p>";
}

function changeMainImage(src) {
  document.getElementById("mainImage").src = src;
}


function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = "toast-message";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
  // بعد از 3 ثانیه برگشت به صفحه اصلی
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2500);

}
function addToCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const color = document.getElementById("colorSelect").value;
  const partNumber = document.getElementById("partNumberSelect").value;

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
// بروزرسانی تعداد سبد خرید
  localStorage.setItem("cart", JSON.stringify(cart));

  showToast(`✅ محصول «${data.name}»  با موفقیت به سبد خرید اضافه شد.`);


  
  document.getElementById("cart-count").textContent = cart.length;

  // باز کردن modal و نمایش سبد خرید
  toggleCartModal();
  renderCartModal();
}





