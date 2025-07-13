function register() {
  const fname = document.getElementById("Fname").value;
  const lname = document.getElementById("Lname").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const message = document.getElementById("message");

  if (!fname || !lname || !username || !password || !confirmPassword) {
    message.textContent = "لطفاً همه فیلدها را پر کنید.";
    return;
  }

  if (password !== confirmPassword) {
    message.textContent = "رمزها یکسان نیستند.";
    return;
  }

  // ذخیره اطلاعات در localStorage
  const user = {
    fname,
    lname,
    username,
    password
  };

  localStorage.setItem("user", JSON.stringify(user));
  message.textContent = "ثبت‌نام با موفقیت انجام شد!";
  setTimeout(() => {
    window.location.href = "rej.html"; // میره به صفحه ورود
  }, 1500);
}
