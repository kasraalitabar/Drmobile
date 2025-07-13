function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("loginMessage");

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    message.textContent = "کاربری ثبت نشده است.";
    return;
  }

  if (username === savedUser.username && password === savedUser.password) {
    message.textContent = "ورود موفقیت‌آمیز بود!";
    // اینجا می‌تونی بری صفحه اصلی فروشگاه مثلاً:
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    message.textContent = "نام کاربری یا رمز اشتباه است.";
  }
}


function showResetPassword() {
  const username = document.getElementById("loginUsername").value;
  const message = document.getElementById("loginMessage");
  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!username) {
    message.textContent = "لطفاً ابتدا نام کاربری خود را وارد کنید.";
    return;
  }

  if (!savedUser || savedUser.username !== username) {
    message.textContent = "کاربری با این نام یافت نشد.";
    return;
  }

  // اگر کاربر پیدا شد، فرم ریست رمز را نشان بده
  document.getElementById("resetSection").style.display = "block";
  message.textContent = "رمز جدید خود را وارد کنید.";
}

function resetPassword() {
  const newPass = document.getElementById("newPassword").value;
  const username = document.getElementById("loginUsername").value;
  const message = document.getElementById("loginMessage");

  if (!newPass) {
    message.textContent = "لطفاً رمز عبور جدید را وارد کنید.";
    return;
  }

  let savedUser = JSON.parse(localStorage.getItem("user"));

  // تغییر رمز عبور
  if (savedUser && savedUser.username === username) {
    savedUser.password = newPass;
    localStorage.setItem("user", JSON.stringify(savedUser));
    message.textContent = "رمز جدید با موفقیت ذخیره شد. حالا می‌توانید وارد شوید.";
    document.getElementById("resetSection").style.display = "none";
  } else {
    message.textContent = "خطا در ذخیره رمز جدید.";
  }
}

