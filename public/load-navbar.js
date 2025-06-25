// load-navbar.js
document.addEventListener("DOMContentLoaded", () => {
  const prefix = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' ? 'public/' : '';
  fetch(`${prefix}navbar.html`)
    .then(res => {
      if (!res.ok) throw new Error("Navbar konnte nicht geladen werden");
      return res.text();
    })
    .then(data => {
      document.getElementById("navbar-container").innerHTML = data;
    })
    .catch(err => {
      console.error("Fehler beim Laden der Navbar:", err);
    });
});
