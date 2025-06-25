// Diagramm 1 – Nur erstellen, wenn Element existiert
const canvas1 = document.getElementById('chart1');
if (canvas1) {
  const ctx1 = canvas1.getContext('2d');
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ['Trump I', 'Trump II'],
      datasets: [
        {
          label: 'Amtszeit',
          data: [491, 1685],
          backgroundColor: "#BF0A30",
          borderColor: "#BF0A30",
          borderWidth: 1
        },
        {
          label: 'Wahlkampf',
          data: [1373, 4356],
          backgroundColor: '#0A3161',
          borderColor: '#0A3161',
          borderWidth: 1,
          hoverBackgroundColor: '#1E90FF',
          hoverBorderColor: '#000' 
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          enabled: true
        }
      },
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,

            font: {
              size: 18
            }
          },
          ticks:{
            font:{
              size:18
            }
          }
        },
        y: {
          stacked: true,
          beginAtZero: true,
          title: {
            display: true,
            text: 'Posts',
            font: {
              size: 16
            }
          }
        }
      }
    }
  });
}


// Diagramm 2 – Nur erstellen, wenn Element existiert
const canvas2 = document.getElementById('Wahlkampf');
if (canvas2) {
  const ctx2 = canvas2.getContext('2d');

  const rawData = [
    { label: 'Kat. 17 - Herunterspielen der Gegner', value: 132 },
    { label: 'Kat. 15 - Wir gegen Die', value: 109 },
    { label: 'Kat. 13 - Angst/Wutmache', value: 48 },
    { label: 'Kat. 10 - Heilsbringer', value: 38 },
    { label: 'Kat. 14 - Opferrolle', value: 33 },
    { label: 'Kat. 9 - Für einfache Bürger', value: 18 },
    { label: 'Kat. 16 - Veränderung!', value: 18 },
    { label: 'Kat. 11 - Komplexes Thema -> Einfache Lösung', value: 14 },
    { label: 'Kat. 2 - Anti-Minderheiten', value: 19 },
    { label: 'Kat. 1 - Anti-Elitismus', value: 8 },
    { label: 'Kat. 4 - Anti-Internationalisierung', value: 7 },
    { label: 'Kat. 12 - Schwarz-Weiß-Denken', value: 2 },
    { label: 'Kat. 5 - Anti-Nachbarländer', value: 1 },
    { label: 'Kat. 7 - Autokratieliebe', value: 1 },
    { label: 'Kat. 3 - Anti-Verfassung', value: 0 },
    { label: 'Kat. 6 - Anti-Gewaltenteilung', value: 0 },
    { label: 'Kat. 8 - Anti-Wissenschaft', value: 0 }
  ];



  // Nach Wert absteigend sortieren
  const sorted = rawData.sort((a, b) => b.value - a.value);

  const labels = sorted.map(item => item.label);
  const dataValues = sorted.map(item => item.value);

  const top5Indexes = dataValues
    .map((val, idx) => ({ val, idx }))
    .slice(0, 5)
    .map(item => item.idx);

  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Anzahl Nennungen',
          data: dataValues,
          backgroundColor: dataValues.map((_, i) =>
            top5Indexes.includes(i) ? '#BF0A30' : '#0A3161'
          ),
          borderColor: '#000',
          borderWidth: 1,
          hoverOffset: 20
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label}: ${context.parsed.x}`;
            }
          }
        },
        legend: {
          labels: {
            font: {
              size: 18
            }
          }
        },
        title: {
          display: true,
          text: 'Häufigkeit der Kategorien im Wahlkampf',
          font: {
            size: 18
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Anzahl der Posts',
            font: {
              size: 16
            }
          },
          ticks: {
            font: {
              size: 18
            }
          }
        },
        y: {
          title: {
            display: true,
            text: 'Kategorien',
            font: {
              size: 18
            }
          },
          ticks: {
            font: {
              size: 14
            },
            autoSkip: false
          }
        }
      }
    }
  });
}
// Diagramm 3 – AllSoc2 Chart

const canvasAllSoc = document.getElementById('AllSoc');
if (canvasAllSoc) {
  const ctxAllSoc = canvasAllSoc.getContext('2d');

  const labels = [
    'Kat. 1', 'Kat. 2', 'Kat. 3', 'Kat. 4', 'Anti-Nachbarländer', 'Kat. 6',
    'Kat. 7', 'Kat. 8', 'Kat. 9', 'Heilsbringer', 'Kat. 11', 'Kat. 12',
    'Angst und Wutmache', 'Kat. 14', 'Wir gegen Die!', 'Veränderung!', 'Herunterspielen der Gegner'
  ];
  const data = [
    9, 13, 11, 2, 58, 53, 2, 21, 17,
    196, 53, 25, 130, 0, 68, 169, 95
  ];

  const threshold = 58;
  let othersSum = 0;
  const filteredItems = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i] < threshold) {
      othersSum += data[i];
    } else {
      filteredItems.push({ label: labels[i], value: data[i] });
    }
  }

filteredItems.sort((a, b) => b.value - a.value);

// Add "Others" last
if (othersSum > 0) {
  filteredItems.push({ label: 'Others', value: othersSum });
}

  // Separate labels and data again
  const filteredLabels = filteredItems.map(item => item.label);
  const filteredData = filteredItems.map(item => item.value);

  const uniqueColors = [
    '#8B0000', // Dunkelrot (Burgundy)
    '#B22234', // Dunkelrot
    
    '#FF4C4C', // Hellrot
    
    '#3C3B6E', // Dunkelblau
    '#5A5ACD', // Mittelblau
    '#1E90FF', // Blau
    '#A9A9A9', // Dunkelgrau (für Others)
    '#6495ED', // Hellblau
    '#DC143C', // Kräftiges Rot
    '#00008B', // Navy
    '#B03060', // Dunkles Pink-Rot
    '#4682B4', // Stahlblau
    '#FF6347', // Tomatenrot
    '#0000CD', // Mittelblau
    '#C71585', // Medium Violet Red
    '#7B68EE', // Medium Slate Blue
    '#778899'  // Lichtgrau-Blau (falls mehr als 16 Segmente)
  ];

  const colors = filteredLabels.map(label =>
    label === 'Others' ? '#A9A9A9' : uniqueColors.shift()
  );

  // Fill colors alternating red and blue for non-Others
  let colorToggle = 0;
  for (let i = 0; i < colors.length; i++) {
    if (colors[i] === null) {
      colors[i] = colorToggle % 2 === 0 ? red : blue;
      colorToggle++;
    }
  }

  new Chart(ctxAllSoc, {
    type: 'pie',
    data: {
      labels: filteredLabels,
      datasets: [{
        label: 'Gesamtanzahl Posts nach Kategorie',
        data: filteredData,
        backgroundColor: colors,
        borderColor: '#fff',
        borderWidth: 1,
        hoverOffset: 20
      }]
    },
    options: {
      responsive: true,
      rotation: -Math.PI / 4, // Start at top right (-45 degrees)
      plugins: {
        title: {
          display: true,
          text: 'Kategorisierte Beiträge Trump II',
          font: {
            size: 20
          }
        },
        legend: {
          display: true, 
          position:"top",
          labels: {
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              return `${label}: ${value}`;
            }
          }
        }
      }
    }
  });
}

// Diagramm 4 – Überblick
const canvas4 = document.getElementById('socialMediaChart');
if (canvas4) {
  const ctx = canvas4.getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'Wahlzeit',
        'Amtszeit',
        'Amtszeit Trump',
        'Amtszeit sonstige',
        'Eintragungen insgesamt',
        'Eintragungen Archiv: insgesamt',
        'Eintragungen Archiv: Wahlkampf',
        'Eintragungen Archiv: Amtszeit'
      ],
      datasets: [{
        label: 'Anzahl',
        data: [182, 1267, 363, 904, 976, 7019, 5361, 1658],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Posts in der zweiten Regierungsperiode'
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            precision: 0
          }
        }
      }
    }
  });
}



//diagramm 5 Musk
document.addEventListener("DOMContentLoaded", function () {
  const canvasMusk = document.getElementById('Musk');
  if (!canvasMusk) {
    console.error("Canvas mit ID 'Musk' nicht gefunden!");
    return;
  }

  const ctxMusk = canvasMusk.getContext('2d');

  const labels = [
    'Kat. 1', 'Anti-Minderheiten', 'Kat. 3', 'Kat. 4', 'Kat. 5', 'Kat. 6',
    'Kat. 7', 'Kat. 8', 'Für einfache Bürger', 'Heilsbringer', 'Komplexes Thema -> Einfache Lösung', 'Kat. 12',
    'Kat. 13', 'Kat. 14', 'Kat. 15', 'Veränderung!', 'Diskreditieren der Gegner'
  ];
  const data = [0, 59, 8, 8, 2, 7, 16, 6, 111, 158, 29, 9, 17, 9, 19, 40, 32];

  const threshold = 32;
  let othersSum = 0;
  const filteredItems = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i] < threshold) {
      othersSum += data[i];
    } else {
      filteredItems.push({ label: labels[i], value: data[i] });
    }
  }

  if (othersSum > 0) {
    filteredItems.push({ label: 'Others', value: othersSum });
  }

  // Sort descending
  filteredItems.sort((a, b) => {
  if (a.label === 'Others') return 1;
  if (b.label === 'Others') return -1;
  return b.value - a.value;
});

  const filteredLabels = filteredItems.map(item => item.label);
  const filteredData = filteredItems.map(item => item.value);

  const uniqueColors = [
        '#8B0000', // Dunkelrot (Burgundy)
    '#B22234', // Dunkelrot
    
    '#FF4C4C',  '#3C3B6E', '#5A5ACD', '#1E90FF',
    '#A9A9A9', '#6495ED', '#DC143C', '#00008B', '#B03060', '#4682B4',
    '#FF6347', '#0000CD', '#C71585', '#7B68EE', '#778899'
  ];

  const colors = filteredLabels.map(label =>
    label === 'Others' ? '#A9A9A9' : uniqueColors.shift()
  );

  new Chart(ctxMusk, {
    type: 'pie',
    data: {
      labels: filteredLabels,
      datasets: [{
        label: 'Gesamtanzahl Posts nach Kategorie',
        data: filteredData,
        backgroundColor: colors,
        borderColor: '#fff',
        borderWidth: 1,
        hoverOffset: 20
      }]
    },
    options: {
      responsive: true,
      rotation: -Math.PI / 4,
      plugins: {
        title: {
          display: true,
          text: 'Kategorisierte Beiträge Musk',
          font: { size: 18 }
        },
        legend: {
          position: 'top',
          labels: { font: { size: 14 } }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              return `${label}: ${value}`;
            }
          }
        }
      }
    }
  });
});


// Diagramm 6 – AllSoc1 Chart

const canvasAllSoc1 = document.getElementById('AllSoc1');
if (canvasAllSoc1) {
  const ctxAllSoc1 = canvasAllSoc1.getContext('2d');

  const labels = [
    'Kat. 1', 'Kat. 2', 'Kat. 3', 'Kat. 4', 'Anti-Nachbarländer', 'Anti-Gewaltenteilung',
    'Kat. 7', 'Kat. 8', 'Kat. 9', 'Heilsbringer', 'Kat. 11', 'Kat. 12',
    'Angst und Wutmache', 'Opferrolle', 'Wir gegen Die!', 'Veränderung!', 'Herunterspielen der Gegner'
  ];
  const data = [12, 32, 7, 32, 15, 78, 2, 4, 68, 114, 40, 24, 134, 120, 173, 65, 202];

  const combined = labels.map((label, index) => ({
    label,
    value: data[index]
  }));

  // Sort descending by value
  combined.sort((a, b) => b.value - a.value);

  const topItems = combined.slice(0, 6);
  const otherItems = combined.slice(6);
  const othersSum = otherItems.reduce((sum, item) => sum + item.value, 0);

  if (othersSum > 0) {
    topItems.push({ label: 'Others', value: othersSum });
  }

  const filteredLabels = topItems.map(item => item.label);
  const filteredData = topItems.map(item => item.value);

  const uniqueColors = [
       '#8B0000', // Dunkelrot (Burgundy)
    '#B22234', // Dunkelrot
    
    '#FF4C4C',  '#3C3B6E', '#5A5ACD', '#1E90FF',
    '#A9A9A9' // für "Others"
  ];

  const colors = filteredLabels.map(label =>
    label === 'Others' ? '#A9A9A9' : uniqueColors.shift()
  );

  new Chart(ctxAllSoc1, {
    type: 'pie',
    data: {
      labels: filteredLabels,
      datasets: [{
        label: 'Gesamtanzahl Posts nach Kategorie',
        data: filteredData,
        backgroundColor: colors,
        borderColor: '#fff',
        borderWidth: 1,
        hoverOffset: 20
      }]
    },
    options: {
      responsive: true,
      rotation: -Math.PI / 4,
      plugins: {
        title: {
          display: true,
          text: 'Kategorisierte Beiträge Trump I',
          font: {
            size: 20
          }
        },
        legend: {
          position: "top",
          labels: {
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              return `${label}: ${value}`;
            }
          }
        }
      }
    }
  });
}


// Diagramm 7 JD Vance Postverteilung
const JDV = document.getElementById('JDV');
let ctxJDV;

if (JDV) {
  ctxJDV = JDV.getContext('2d');

const data = {
  labels: ['20.01.2025', '21.02.2025', '23.03.2025', '24.04.2025'],
  datasets: [{
    label: 'Monatliche Anzahl Posts',
    data: [66, 55, 35, 29],
    borderColor: "#960018",
    backgroundColor: 'rgba(150, 0, 24, 0.2)',
    fill: true,
    tension: 0.3,
    pointRadius: 5,
    pointHoverRadius: 7
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            return `Wert: ${context.parsed.y}`;
          }
        }
      },
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Datum'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Posts'
        },
        beginAtZero: true
      }
    }
  }
};
 
new Chart(ctxJDV, config);}
else {
  console.error("Canvas mit ID 'JDV' wurde nicht gefunden.");
}

//Diagramm 8 Trump 2 Kat
const Trump2 = document.getElementById('Trump2Kat');
if (Trump2) {
  const ctxTrump2 = Trump2.getContext('2d');

  const rawData = [
    { label: 'Kat. 17 - Herunterspielen der Gegner', value: 151 },
    { label: 'Kat. 15 - Wir gegen Die', value: 169 },
    { label: 'Kat. 13 - Angst/Wutmache', value: 130 },
    { label: 'Kat. 10 - Heilsbringer', value: 196 },
    { label: 'Kat. 14 - Opferrolle', value: 68 },
    { label: 'Kat. 9 - Für einfache Bürger', value: 17 },
    { label: 'Kat. 16 - Veränderung!', value: 95 },
    { label: 'Kat. 11 - Komplexes Thema -> Einfache Lösung', value: 53 },
    { label: 'Kat. 2 - Anti-Minderheiten', value: 13 },
    { label: 'Kat. 1 - Anti-Elitismus', value: 9 },
    { label: 'Kat. 4 - Anti-Internationalisierung', value: 2 },
    { label: 'Kat. 12 - Schwarz-Weiß-Denken', value: 25 },
    { label: 'Kat. 5 - Anti-Nachbarländer', value: 58 },
    { label: 'Kat. 7 - Autokratieliebe', value: 2 },
    { label: 'Kat. 3 - Anti-Verfassung', value: 11 },
    { label: 'Kat. 6 - Anti-Gewaltenteilung', value: 53 },
    { label: 'Kat. 8 - Anti-Wissenschaft', value: 21 }
  ];



  // Nach Wert absteigend sortieren
  const sorted = rawData.sort((a, b) => b.value - a.value);

  const labels = sorted.map(item => item.label);
  const dataValues = sorted.map(item => item.value);

  const top5Indexes = dataValues
    .map((val, idx) => ({ val, idx }))
    .slice(0, 5)
    .map(item => item.idx);

  new Chart(ctxTrump2, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Anzahl Posts',
          data: dataValues,
          backgroundColor: dataValues.map((_, i) =>
            top5Indexes.includes(i) ? '#BF0A30' : '#0A3161'
          ),
          borderColor: '#000',
          borderWidth: 1,
          hoverOffset: 20
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label}: ${context.parsed.x}`;
            }
          }
        },
        legend: {
          labels: {
            font: {
              size: 18
            }
          }
        },
        title: {
          display: true,
          text: 'Häufigkeit der Kategorien Wahlkampf/Amtszeit II',
          font: {
            size: 18
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          min: 0,
          max:250,
          ticks: {
            stepSize:50,
            font: {
              size: 18
            }
          },
          title: {
            display: true,
            text: 'Anzahl der Posts',
            font: {
              size: 16
            }
          },
          ticks: {
            font: {
              size: 18
            }
          }
        },
        y: {
          title: {
            display: true,
            text: 'Kategorien',
            font: {
              size: 18
            }
          },
          ticks: {
            font: {
              size: 14
            },
            autoSkip: false
          }
        }
      }
    }
  });
}


//Diagramm 8 Trump 1 Kat
const Trump1 = document.getElementById('Trump1Kat');
if (Trump1) {
  const ctxTrump1 = Trump1.getContext('2d');

  const rawData = [
    { label: 'Kat. 17 - Herunterspielen der Gegner', value: 202 },
    { label: 'Kat. 15 - Wir gegen Die', value: 173 },
    { label: 'Kat. 13 - Angst/Wutmache', value: 134 },
    { label: 'Kat. 10 - Heilsbringer', value: 114 },
    { label: 'Kat. 14 - Opferrolle', value: 120 },
    { label: 'Kat. 9 - Für einfache Bürger', value: 68 },
    { label: 'Kat. 16 - Veränderung!', value: 65 },
    { label: 'Kat. 11 - Komplexes Thema -> Einfache Lösung', value: 40 },
    { label: 'Kat. 2 - Anti-Minderheiten', value: 32 },
    { label: 'Kat. 1 - Anti-Elitismus', value: 12 },  
    { label: 'Kat. 4 - Anti-Internationalisierung', value: 32 },
    { label: 'Kat. 12 - Schwarz-Weiß-Denken', value: 24 },
    { label: 'Kat. 5 - Anti-Nachbarländer', value: 15 },
    { label: 'Kat. 7 - Autokratieliebe', value: 2 },
    { label: 'Kat. 3 - Anti-Verfassung', value: 7 },
    { label: 'Kat. 6 - Anti-Gewaltenteilung', value: 78 },
    { label: 'Kat. 8 - Anti-Wissenschaft', value: 4 }
  ];



  // Nach Wert absteigend sortieren
  const sorted = rawData.sort((a, b) => b.value - a.value);

  const labels = sorted.map(item => item.label);
  const dataValues = sorted.map(item => item.value);

  const top5Indexes = dataValues
    .map((val, idx) => ({ val, idx }))
    .slice(0, 5)
    .map(item => item.idx);

  new Chart(ctxTrump1, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Anzahl Posts',
          data: dataValues,
          backgroundColor: dataValues.map((_, i) =>
            top5Indexes.includes(i) ? '#BF0A30' : '#0A3161'
          ),
          borderColor: '#000',
          borderWidth: 1,
          hoverOffset: 20
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label}: ${context.parsed.x}`;
            }
          }
        },
        legend: {
          labels: {
            font: {
              size: 18
            }
          }
        },
        title: {
          display: true,
          text: 'Häufigkeit der Kategorien Wahlkampf/Amtszeit I',
          font: {
            size: 18
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Anzahl der Posts',
            font: {
              size: 16
            }
          },
          ticks: {
            font: {
              size: 18
            }
          }
        },
        y: {
          title: {
            display: true,
            text: 'Kategorien',
            font: {
              size: 18
            }
          },
          ticks: {
            font: {
              size: 14
            },
            autoSkip: false
          }
        }
      }
    }
  });
}

// Diagramm - JD Vance
document.addEventListener('DOMContentLoaded', () => {
  const BASE_COLORS = [
    '#8B0000', '#B22234', '#FF4C4C', '#3C3B6E', '#5A5ACD', '#1E90FF',
    '#A9A9A9', '#6495ED', '#DC143C', '#00008B', '#B03060', '#4682B4',
    '#FF6347', '#0000CD', '#C71585', '#7B68EE', '#778899'
  ];

  function getTop6PlusOthers(labels, data) {
    const sorted = labels.map((l, i) => ({ l, v: data[i] }))
                         .sort((a, b) => b.v - a.v);
    const top6 = sorted.slice(0, 6);
    const others = sorted.slice(6);
    const othersVal = others.reduce((s, o) => s + o.v, 0);

    return {
      labels: [...top6.map(o => o.l), 'Others'],
      data: [...top6.map(o => o.v), othersVal]
    };
  }

  // JD Vance Diagramm
  const cvsVance = document.getElementById('Vance');
  if (cvsVance) {
    const ctxVance = cvsVance.getContext('2d');
    const rawLabelsVance = [
      'Anti-Minderheiten','Anti-Nachbarländer','Anti-Gewaltenteilung',
      'Heilsbringer','Komplexes Thema --> Einfache Lösung','Angst- und Wutmache',
      'Opferrolle','"Wir gegen Die"','Aufruf zur Veränderung'
    ];
    const rawDataVance = [4, 2, 2, 9, 5, 9, 9, 20, 1];
    const { labels, data } = getTop6PlusOthers(rawLabelsVance, rawDataVance);
    const colors = labels.map((_, i) => i < 6 ? BASE_COLORS[i] : '#808080');

    new Chart(ctxVance, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors,
          borderColor: '#fff',
          borderWidth: 1,
          hoverOffset: 20
        }]
      },
      options: {
        responsive: true,
        rotation: -Math.PI / 2,
        plugins: {
          title: { display: true, text: 'Kategorisierte Beiträge Vance', font: { size: 18 } },
          legend: { position: 'top', labels: { font: { size: 14 } } },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.label}: ${ctx.parsed}`
            }
          }
        }
      }
    });
  } else {
    console.error("Canvas 'Vance' nicht gefunden");
  }

  // Weißes Haus Diagramm
  const cvsHaus = document.getElementById('Haus');
  if (cvsHaus) {
    const ctxHaus = cvsHaus.getContext('2d');
    const rawLabelsHaus = [
      'Anti-Minderheiten','Anti-Verfassung','Anti-Internationalisierung','Anti-Nachbarländer',
      'Anti-Gewaltenteilung','Autokratieliebe','Anti-Wissenschaft','Für "einfache Bürger"',
      'Heilsbringer','Komplexes Thema --> Einfache Lösung','Schwarz-Weiß-Denken',
      'Angst- und Wutmache','Opferrolle','"Wir gegen Die"','Aufruf zur Veränderung',
      'Herunterspielen und Diskreditieren der Gegner:innen'
    ];
    const rawDataHaus = [59,8,8,2,7,16,6,111,158,29,9,17,9,19,40,32];
    const { labels, data } = getTop6PlusOthers(rawLabelsHaus, rawDataHaus);
    const colors = labels.map((_, i) => i < 6 ? BASE_COLORS[i] : '#808080');

    new Chart(ctxHaus, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors,
          borderColor: '#fff',
          borderWidth: 1,
          hoverOffset: 20
        }]
      },
      options: {
        responsive: true,
        rotation: -Math.PI / 2,
        plugins: {
          title: { display: true, text: 'Kategorisierte Beiträge Weißes Haus', font: { size: 18 } },
          legend: { position: 'top', labels: { font: { size: 14 } } },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.label}: ${ctx.parsed}`
            }
          }
        }
      }
    });
  } else {
    console.error("Canvas 'Haus' nicht gefunden");
  }
});
