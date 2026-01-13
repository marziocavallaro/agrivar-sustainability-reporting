/* ============================================
   COLORI PRINCIPALI AGRIVAR
   ============================================ */
// Variabili colore principali da usare nei grafici
const PRIMARY_GREEN = '#2f6447';    // Verde Agrivar principale
const LIGHT_GREEN   = '#8fcf88';    // Verde chiaro per dettagli
const ACCENT_ORANGE = '#ff9500';    // Arancione per highlights (es. stage)

// ============================================
// GRAFICI CHART.JS
// ============================================

// 1) Superficie per tipo di coltura (bar chart)
new Chart(document.getElementById('chartColture'), {
    type: 'bar',
    data: { 
        labels: ['Oliveti', 'Vigneti/Frutteti', 'Altro'], // Etichette sull'asse X
        datasets: [{
            label: 'ha',                   // Etichetta dataset
            data: [242, 14, 0],            // Valori in ettari
            backgroundColor: PRIMARY_GREEN // Colore barre
        }] 
    },
    options: { 
        responsive: true,                 // Grafico responsivo
        plugins: {
            title: {
                display: true,
                text: '242 ha oliveti su 256 totali' // Titolo del grafico
            },
            legend: { display: false }     // Nasconde legenda
        },
        scales: {
            y: {
                beginAtZero: true,        // Y parte da zero
                max: 256                  // Limite massimo y per proporzione
            }
        }
    }
});

// 2) Consumo idrico annuo (bar chart)
new Chart(document.getElementById('chartAcqua'), {
    type: 'bar',
    data: { 
        labels: ['2023'],                  // Etichetta asse X
        datasets: [{
            label: 'm³ acqua',            // Etichetta dataset
            data: [33000],                // Consumo in metri cubi
            backgroundColor: PRIMARY_GREEN
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: '33.000 m³ consumati nel 2023'
            },
            legend: { display: false }
        },
        scales: { y: { beginAtZero: true } } // Y parte da zero
    }
});

// 3) Dipendenti per categoria (bar chart)
new Chart(document.getElementById('chartInvestimenti'), {
    type: 'bar',
    data: {
        labels: ['Impiegati', 'Operai', 'Stage'], // Categorie
        datasets: [{
            data: [3, 42, 4],                        // Numero di dipendenti
            backgroundColor: [LIGHT_GREEN, PRIMARY_GREEN, ACCENT_ORANGE] // Colori diversi
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: '42+ dipendenti totali'
            },
            legend: { display: false }
        },
        scales: { y: { beginAtZero: true, max: 50 } } // Massimo asse Y per proporzione
    }
});

// 4) Percentuale terreni biologici vs convenzionali (doughnut chart)
new Chart(document.getElementById('chartCO2'), {
    type: 'doughnut',
    data: {
        labels: ['Biologico', 'Convenzionale'],
        datasets: [{
            data: [61, 39],                     // Percentuali
            backgroundColor: [LIGHT_GREEN, '#ddd'] // Verde biologico / grigio convenzionale
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,            // Per adattarsi meglio alla colonna
        plugins: {
            title: {
                display: true,
                text: '61% terreni biologici'
            },
            legend: {
                position: 'bottom'            // Legenda in basso
            }
        }
    }
});

// ============================================
// DOWNLOAD FILE BUTTON
// ============================================
// Aggiunge evento click a tutti i pulsanti con classe .download-btn
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const link = document.createElement('a');  // Crea elemento <a> temporaneo
        link.href = btn.dataset.file;             // Path del file da scaricare
        link.download = btn.dataset.type;         // Nome del file per download
        document.body.appendChild(link);          // Inserisce nel DOM
        link.click();                              // Simula click per scaricare
        document.body.removeChild(link);          // Rimuove link temporaneo
    });
});

// ============================================
// DARK MODE TOGGLE
// ============================================

// Bottone floating per attivare/disattivare dark mode
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'btn btn-sm btn-dark position-fixed';
darkModeToggle.style = `
    bottom:20px;
    right:20px;
    width:50px;
    height:50px;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
`;
darkModeToggle.innerHTML = '<i class="bi bi-moon-stars"></i>'; // Icona iniziale luna
document.body.appendChild(darkModeToggle);

// Logo nella navbar
const logo = document.getElementById('logo');

// Legge preferenza dark mode da localStorage
let darkMode = localStorage.getItem('darkMode') === 'true';
if (darkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="bi bi-brightness-high"></i>'; // Icona sole
    logo.src = 'assets/img/Logo2.png'; // Cambia logo per dark mode (chiaro)
}

// Evento click toggle
darkModeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);             // Attiva/disattiva class
    darkModeToggle.innerHTML = darkMode ? '<i class="bi bi-brightness-high"></i>' : '<i class="bi bi-moon-stars"></i>'; // Icona
    logo.src = darkMode ? 'assets/img/Logo2.png' : 'assets/img/Logo.png'; // Cambia logo
    localStorage.setItem('darkMode', darkMode);                        // Salva preferenza
});

// ============================================
// SMOOTH SCROLLING PER ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        // Controlla se esiste l'elemento target
        if (document.querySelector(a.getAttribute('href'))) {
            e.preventDefault(); // Previene comportamento default
            document.querySelector(a.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',  // Scroll fluido
                block: 'start'       // Allinea in alto
            });
        }
    });
});
