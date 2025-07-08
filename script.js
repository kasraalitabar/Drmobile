function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  // اطلاعات ورود نمونه
  const correctUsername = "kasra";
  const correctPassword = "12345";

  if (username === correctUsername && password === correctPassword) {
    message.style.color = "green";
    message.textContent = "ورود موفقیت‌آمیز بود!";
    // هدایت به صفحه دیگر
    setTimeout(() => {
      window.location.href = "dashboard.html"; // صفحه فرضی
    }, 1000);
  } else {
    message.style.color = "red";
    message.textContent = "نام کاربری یا رمز عبور اشتباه است.";
  }
}

function goToProduct(name, img) {
  const url = `product.html?name=${encodeURIComponent(name)}&img=${encodeURIComponent(img)}`;
  window.location.href = url;
}