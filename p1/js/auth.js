function login() {

  const id = document.getElementById("userId").value;
  const pass = document.getElementById("password").value;

  if (id === "admin" && pass === "admin123") {

    localStorage.setItem("adminLogged", true);

    window.location.href = "dashboard.html";

  } else {

    document.getElementById("error").innerText = "Invalid credentials";

  }
}