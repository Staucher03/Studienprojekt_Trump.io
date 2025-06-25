document.getElementById("auswerten").addEventListener("click", function () {
  let summe = 0;
  const alleFragen = document.querySelectorAll('.Frage'); 
  const fragen = document.querySelectorAll('input[type="radio"]:checked'); 
  const ergebnisBox = document.getElementById("ergebnisBox");

  if (fragen.length < alleFragen.length) {
    ergebnisBox.innerHTML = `<p style="color:red;">Bitte beantworte alle ${alleFragen.length} Fragen, bevor du das Ergebnis anzeigen kannst.</p>`;
    return; 
  }

  fragen.forEach((antwort) => {
    summe += parseInt(antwort.value);
  });


  let interpretation = "";

  if (summe >= 16 && summe <= 28) {
    interpretation = " <strong>Sehr niedrige Populismus-Affinität:</strong><br>Von einfachen Lösungen und emotionaler Aufladung lässt du dich wenig beeinflussen.";
  } else if (summe >= 29 && summe <= 41) {
    interpretation = " <strong>Niedrige Populismus-Affinität:</strong><br>Du kannst gut differenzieren, dennoch findest du einfache populistische Argumente attraktiv.";
  } else if (summe >= 42 && summe <= 54) {
    interpretation = " <strong>Mittlere Populismus-Affinität:</strong><br>Populistische Rhetorik findest du teilweise ansprechend – emotionale Aufladung und Systemkritik manipulieren deine Einstellung.";
  } else if (summe >= 55 && summe <= 67) {
    interpretation = " <strong>Hohe Populismus-Affinität:</strong><br>Populistische Ideologien und Systemkritik sind dir sympathisch. Sie prägen mit ziemlicher Sicherheit dein Denken.";
  } else if (summe >= 68 && summe <= 80) {
    interpretation = " <strong>Sehr hohe Populismus-Affinität:</strong><br>Du sehnst dich nach einfachen Lösungen für systematische Probleme und durchsetzungsfähige Führungspersonen findest du sehr attraktiv. Dein Denken ist stark von populistischen Ideologien geprägt.";
  } else {
    interpretation = "Ergebnis außerhalb des erwarteten Bereichs.";
  }

  ergebnisBox.innerHTML = `<p><strong>Dein Ergebnis:</strong> ${summe} Punkte</p><p>${interpretation}</p>`;
});
