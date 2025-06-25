document.addEventListener("DOMContentLoaded", () => {
  fetch("./public/navbar.html")
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
