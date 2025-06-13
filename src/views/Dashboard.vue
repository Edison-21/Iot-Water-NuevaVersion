<template>
  <div class="dashboard-bg">
    <main class="container pt-4">
      <!-- DASHBOARD HEADER -->
      <div class="dashboard-header shadow mb-4">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start">
          <div>
            <h1 class="dashboard-title mb-1">Dashboard de Monitoreo Hídrico</h1>
            <p class="dashboard-subtitle mb-0">Métricas en tiempo real del sistema</p>
          </div>
          <div class="dashboard-datetime text-md-end text-white mt-3 mt-md-0">
            <span class="me-3">{{ time }}</span>
            <span>{{ date }}</span>
          </div>
        </div>
      </div>

      <!-- KPIs principales -->
      <div class="row g-3 mb-3">
        <div class="col-12 col-md-6 col-xl-3" v-for="card in metricCards" :key="card.title">
          <div class="dashcard-kpi shadow-sm">
            <div class="fw-semibold mb-1">{{ card.title }}</div>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="dashcard-kpi-value" v-html="card.value"></span>
            </div>
            <div>
              <span v-if="card.statusClass" :class="'dot ' + card.statusClass"></span>
              <span :class="card.changeClass">{{ card.change }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Consumo y Sectores -->
      <div class="row g-3 mb-3">
        <div class="col-lg-8">
          <div class="dashcard shadow-sm h-100">
            <div class="d-flex justify-content-between align-items-center px-3 pt-3">
              <div class="fw-semibold">Consumo de Agua (m³)</div>
              <div class="consumption-tabs">
                <div
                  v-for="tab in tabs"
                  :key="tab"
                  :class="['consumption-tab', { active: tab === activeTab }]"
                  @click="setActiveTab(tab)"
                >
                  {{ tab }}
                </div>
              </div>
            </div>
            <div class="p-3 pb-0">
              <div class="chart-container">
                <canvas id="consumptionChart"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="dashcard shadow-sm h-100">
            <div class="fw-semibold px-3 pt-3">Sectores de Alto Consumo</div>
            <div class="p-3 pb-0">
              <div class="chart-container">
                <canvas id="sectorsChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Válvulas y Recaudación -->
      <div class="row g-3 mb-3">
        <div class="col-md-6 col-lg-4">
          <div class="dashcard shadow-sm h-100">
            <div class="fw-semibold px-3 pt-3">Válvulas</div>
            <div class="p-3 pt-2">
              <div class="row">
                <div class="col-6 text-center">
                  <div class="valv-label">Activas</div>
                  <div class="valv-num text-success">{{ valvulasActivas }}</div>
                </div>
                <div class="col-6 text-center">
                  <div class="valv-label">Con Fallas</div>
                  <div class="valv-num text-danger">{{ valvulasFalla }}</div>
                </div>
              </div>
              <div class="progress mt-3" style="height: 8px;">
                <div
                  class="progress-bar bg-success"
                  :style="{ width: valvulasPorcentaje + '%' }"
                  role="progressbar"
                  :aria-valuenow="valvulasPorcentaje"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
                <div
                  class="progress-bar bg-danger"
                  :style="{ width: (100 - valvulasPorcentaje) + '%' }"
                  role="progressbar"
                  :aria-valuenow="100 - valvulasPorcentaje"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div class="d-flex justify-content-between mt-1 small text-secondary">
                <span>Activas: {{ valvulasActivas }}</span>
                <span>Con Fallas: {{ valvulasFalla }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="dashcard shadow-sm h-100">
            <div class="fw-semibold px-3 pt-3">Recaudación</div>
            <div class="p-3 pt-2">
              <div class="row">
                <div class="col-6 text-center">
                  <div class="recaud-label">Recaudado</div>
                  <div class="recaud-num text-success">${{ recaudadoMonto.toLocaleString() }}</div>
                </div>
                <div class="col-6 text-center">
                  <div class="recaud-label">Pendiente</div>
                  <div class="recaud-num text-warning">${{ recaudadoPendiente.toLocaleString() }}</div>
                </div>
              </div>
              <div class="progress mt-3" style="height: 8px;">
                <div
                  class="progress-bar bg-success"
                  :style="{ width: recaudadoPorcentaje + '%' }"
                  role="progressbar"
                  :aria-valuenow="recaudadoPorcentaje"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
                <div
                  class="progress-bar bg-warning"
                  :style="{ width: (100 - recaudadoPorcentaje) + '%' }"
                  role="progressbar"
                  :aria-valuenow="100 - recaudadoPorcentaje"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div class="d-flex justify-content-between mt-1 small text-secondary">
                <span>Recaudado: ${{ recaudadoMonto.toLocaleString() }}</span>
                <span>Pendiente: ${{ recaudadoPendiente.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 d-none d-lg-block"></div>
      </div>

      <!-- Eficiencia hídrica -->
      <div class="row g-3 mb-3">
        <div class="col-12">
          <div class="dashcard shadow-sm h-100">
            <div class="fw-semibold px-3 pt-3">Eficiencia Hídrica</div>
            <div class="p-3 pt-2 d-flex flex-column align-items-center">
              <div class="efficiency-num mb-2">{{ eficiencia }}%</div>
              <div class="text-secondary mb-3">Porcentaje de pérdidas por fugas: {{ 100 - eficiencia }}%</div>
              <div class="chart-container" style="height: 190px; width: 280px; max-width:95vw;">
                <canvas id="efficiencyChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mapa de Sensores -->
      <div class="row g-3">
        <div class="col-12">
          <div class="dashcard shadow-sm">
            <div class="fw-semibold px-3 pt-3">📍 Mapa de Sensores</div>
            <div class="p-3 pb-3">
              <div id="map" style="height: 300px; width: 100%;"></div>
            </div>
          </div>
        </div>
      </div>

    </main>
    <footer class="text-center py-3 mt-4 border-top">
      <small>&copy; 2025 Municipio Agua. Todos los derechos reservados.</small>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import Chart from "chart.js/auto";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const time = ref("");
const date = ref("");
function updateDateTime() {
  const now = new Date();
  time.value = now.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  date.value = now.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

onMounted(() => {
  updateDateTime();
  setInterval(updateDateTime, 1000);
  nextTick(() => {
    renderCharts();
    initMap();
  });
});

// --- KPIs ---
const metricCards = [
  {
    title: "Gateways Activos",
    value: '12 <span class="text-secondary">/15</span>',
    change: "3 inactivos",
    statusClass: "dot-blue",
    changeClass: "text-secondary"
  },
  {
    title: "Nodos (Medidores)",
    value: "1,248",
    change: "+12 nuevos hoy",
    statusClass: "dot-blue",
    changeClass: "text-primary"
  },
  {
    title: "Medidores con Fallas",
    value: "28",
    change: "+5 desde ayer",
    statusClass: "dot-red",
    changeClass: "text-danger"
  },
  {
    title: "Usuarios Registrados",
    value: "4,372",
    change: "+24 este mes",
    statusClass: "dot-green",
    changeClass: "text-success"
  }
];

// --- Consumo dinámico ---
const tabs = ["Día", "Semana", "Mes", "Año"];
const activeTab = ref("Día");

function setActiveTab(tab) {
  activeTab.value = tab;
  nextTick(renderCharts);
}

// Datos de ejemplo
const consumoData = {
  "Día":   [120,  90, 150, 210, 340, 280, 200, 180],
  "Semana":[800, 910, 1020, 980, 860, 920, 1050],
  "Mes":   [4200, 3900, 4500, 4700, 4300, 4800, 5000, 5100, 4950, 5200, 5300, 5400],
  "Año":   [34000, 36000, 38000, 39000, 41000, 43000, 45000, 44000, 46000, 47000, 48000, 49000]
};
const consumoLabels = {
  "Día":    ['00:00','03:00','06:00','09:00','12:00','15:00','18:00','21:00'],
  "Semana": ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
  "Mes":    ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  "Año":    ['2021','2022','2023','2024','2025','2026','2027','2028','2029','2030','2031','2032']
};

// --- Válvulas ---
const valvulasActivas = ref(156);
const valvulasFalla   = ref(9);
const valvulasTotal    = computed(() => valvulasActivas.value + valvulasFalla.value);
const valvulasPorcentaje = computed(() =>
  valvulasTotal.value > 0
    ? Math.round((valvulasActivas.value * 100) / valvulasTotal.value)
    : 0
);

// --- Recaudación ---
const recaudadoMonto     = ref(128450);
const recaudadoPendiente = ref(42780);
const recaudadoPorcentaje = computed(() =>
  (recaudadoMonto.value + recaudadoPendiente.value) > 0
    ? Math.round((recaudadoMonto.value * 100) / (recaudadoMonto.value + recaudadoPendiente.value))
    : 0
);

// --- Eficiencia ---
const eficiencia = ref(87);

// --- Graficar ---
let consumptionChart, sectorsChart, efficiencyChart;

function renderCharts() {
  // Consumo dinámico
  const ctx = document.getElementById("consumptionChart");
  if (ctx) {
    if (consumptionChart) consumptionChart.destroy();
    const data = consumoData[activeTab.value];
    const labels = consumoLabels[activeTab.value];
    consumptionChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: `Consumo (${activeTab.value})`,
          data,
          borderColor: "#2094e9",
          backgroundColor: "rgba(52, 152, 219, 0.10)",
          borderWidth: 2.5,
          pointBackgroundColor: "#2094e9",
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: "#eaeaea" } },
          x: { grid: { color: "#eaeaea" } }
        }
      }
    });
  }

  // Sectores
  const sectorsEl = document.getElementById("sectorsChart");
  if (sectorsEl) {
    if (sectorsChart) sectorsChart.destroy();
    sectorsChart = new Chart(sectorsEl, {
      type: "bar",
      data: {
        labels: ['Residencial','Comercial','Industrial','Público','Agrícola'],
        datasets: [{
          data: [450,320,580,210,390],
          backgroundColor: ['#2094e9','#9b59b6','#2ecc71','#f1c40f','#e67e22'],
          borderRadius: 6,
          barPercentage: 0.65
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: "#eaeaea" } },
          x: { grid: { color: "#eaeaea" } }
        }
      }
    });
  }

  // Eficiencia
  const effEl = document.getElementById("efficiencyChart");
  if (effEl) {
    if (efficiencyChart) efficiencyChart.destroy();
    efficiencyChart = new Chart(effEl, {
      type: 'doughnut',
      data: {
        labels: ['Eficiencia','Pérdidas'],
        datasets: [{
          data: [eficiencia.value, 100 - eficiencia.value],
          backgroundColor: ['#2ecc71','#e74c3c'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: { legend: { display: false } }
      }
    });
  }
}

// --- Mapa Leaflet ---
function initMap() {
  const map = L.map("map").setView([-0.2100, -78.4928], 14);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const positions = [
    [-0.2105, -78.4925],
    [-0.2095, -78.4900],
    [-0.2120, -78.4930],
    [-0.2110, -78.4915]
  ];
  positions.forEach(pos => {
    L.marker(pos).addTo(map);
  });
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.dashboard-bg { background-color: #f5f7fa; min-height: 100vh; font-family: 'Roboto', Arial, sans-serif; }
.dashboard-header {
  background: linear-gradient(135deg, #2094e9 0%, #217dbb 100%);
  color: #fff; border-radius: 12px; padding: 32px 38px 18px 38px;
  margin-bottom: 28px; box-shadow: 0 4px 20px rgba(32,148,233,0.10);
}
.dashboard-title { font-size: 2.3rem; font-weight:700; letter-spacing:-1px; margin-bottom:0; }
.dashboard-subtitle { font-size:1.07rem; font-weight:400; opacity:0.97; }
.dashboard-datetime { font-size:1.05rem; }

/* KPIs */
.dashcard-kpi { background:#fff; border-radius:12px; padding:20px; border:1px solid #e7e8eb; box-shadow:0 2px 9px rgba(52,73,94,0.09); min-height:108px;}
.dashcard-kpi-value { font-size:2.15rem; font-weight:700; color:#222; }
.dot { display:inline-block; width:13px; height:13px; border-radius:50%; margin-right:7px;}
.dot-blue { background:#2094e9; } .dot-red { background:#e74c3c; } .dot-green { background:#2ecc71; }

/* Dashcards */
.dashcard { background:#fff; border-radius:12px; border:1px solid #e7e8eb; box-shadow:0 2px 9px rgba(52,73,94,0.09); margin-bottom:0;}
.fw-semibold { font-weight:500; font-size:1.08rem; }

/* Tabs Consumo */
.consumption-tabs { display:flex; gap:10px; background:#f6fafd; border-radius:9px; padding:4px 7px; }
.consumption-tab { padding:2px 18px; border-radius:7px; cursor:pointer; color:#2094e9; font-weight:500; background:transparent; transition:0.18s; user-select:none;}
.consumption-tab.active { background:#2094e9; color:#fff; }
.consumption-tab:hover { background:#2094e9; color:#fff; }

/* Chart containers */
.chart-container { position:relative; height:180px; width:100%; }

/* Labels */
.valv-label, .recaud-label { font-size:1.02rem; color:#666; }
.valv-num, .recaud-num { font-size:2rem; font-weight:700; }
.progress { background:#e4e8ef; }
.progress-bar { transition:width 0.6s cubic-bezier(.4,0,.2,1); }

/* Efficiency */
.efficiency-num { font-size:3rem; font-weight:700; color:#2ecc71; text-align:center; }

/* Leaflet attribution overrides */
.leaflet-container { z-index:0; }

/* Responsive tweaks */
@media (max-width:900px){ .dashboard-header{padding:19px 8px;} }
@media (max-width:700px){ .dashboard-header{border-radius:0;} .container{padding:0 2px;} }
</style>
