const data = JSON.parse(localStorage.getItem("selectedProduct"));
const root = document.getElementById("productDetail");

// تعیین فیلد اضافه (پارت نامبر یا سایز) بر اساس نوع محصول
let extraField = "";


if (data?.type === "watch") {
  extraField = `
    <label>سایز:</label>
    <select id="sizeSelect">
      ${data.sizeOptions.map(size => `<option>${size}</option>`).join("")}
    </select>
  `;
} else if (data?.type === "phone") {
  extraField = `
    <label>پارت نامبر :</label>
    <input list="partOptions" id="partNumberSelect" placeholder=" ZA">
    <datalist id="partOptions">
      <option value="ZA/A دو سیم کارت">
      <option value="CH/A دو سیم کارت">
    </datalist>
  `;
} else {
  extraField = ""; // مثلا برای AirPods هیچ چیز اضافه نمایش داده نشه
}

// نمایش محصول
if (data) {
  root.innerHTML = `
    <div class="both">
      <div class="left">
        <img src="${data.image}" id="mainImage" style="border-radius: 50px;" width="600px" alt="${data.name}" />
        <div class="thumbnail-gallery">
          ${data.gallery.map(img => `
            <img width="500px" src="${img}" class="thumbnail" onclick="changeMainImage('${img}')">
          `).join("")}
        </div>
      </div>

      <div class="right">
        <h1>${data.name}</h1>
        <hr/>
        <p>(Not Active)</p>
        <p>همراه با 18 ماه گارانتی شرکتی</p>

        <label>رنگ بندی:</label>
        <select id="colorSelect">
          ${data.colors.map(c => `<option>${c}</option>`).join("")}
        </select>
        <br><br>

        ${extraField}

        <p>قیمت: ${data.price.toLocaleString()} تومان</p>
        <br><br>
        <button onclick="addToCart()">افزودن به سبد خرید</button>
        <p>گوشی‌های آیفون موجود به همراه ۱۸ ماه گارانتی و کد رجیستری شرکتی می‌باشد</p>
      </div>
    </div>
  `;
} else {
  root.innerHTML = "<p>هیچ محصولی انتخاب نشده!</p>";
}

// تغییر تصویر اصلی با کلیک روی تصاویر کوچک
function changeMainImage(src) {
  document.getElementById("mainImage").src = src;
}

// نمایش پیام Toast و برگشت به صفحه اصلی
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = "toast-message";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);

  setTimeout(() => {
    window.location.href = "index.html";
  }, 2500);
}

// افزودن به سبد خرید
function addToCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const color = document.getElementById("colorSelect").value;
  let extraValue = "";

  if (data.type === "watch") {
    extraValue = document.getElementById("sizeSelect").value;
  } else {
    extraValue = document.getElementById("partNumberSelect").value;
  }

  const existing = cart.find(p =>
    p.id === data.id &&
    p.color === color &&
    ((data.type === "watch" && p.size === extraValue) ||
     (data.type !== "watch" && p.partNumber === extraValue))
  );

  if (existing) {
    existing.quantity++;
  } else {
    const item = {
      id: data.id,
      name: data.name,
      price: data.price,
      image: data.image,
      color,
      quantity: 1,
    };

    if (data.type === "watch") {
      item.size = extraValue;
    } else {
      item.partNumber = extraValue;
    }

    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast(`✅ محصول «${data.name}» با موفقیت به سبد خرید اضافه شد.`);
  document.getElementById("cart-count").textContent = cart.length;

  toggleCartModal();
  renderCartModal();
}
