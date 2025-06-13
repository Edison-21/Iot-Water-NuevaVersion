<template>
  <div class="dashboard-bg">
    <!-- Header -->
    <div class="dmq-header mb-4">
      <div class="dmq-header-content">
        <div>
          <h1 class="dmq-title mb-0">Visualización Territorial del Consumo Hídrico</h1>
          <div class="dmq-subtitle">Distrito Metropolitano de Quito - Monitoreo por zonas y parroquias</div>
        </div>
        <div class="dmq-header-clock">
          <span>{{ time }}</span>
          <span class="ms-3">{{ date }}</span>
        </div>
      </div>
    </div>

    <div class="dashboard-container">
      <!-- Sidebar -->
      <aside class="sidebar shadow-sm">
        <div class="sidebar-section mb-4">
          <h2 class="sidebar-title">Filtros y Controles</h2>
          <div class="mb-3">
            <label class="form-label">Administración Zonal</label>
            <select class="form-select" v-model="zoneSelect" @change="onZoneChange">
              <option value="all">Todas las zonas (9)</option>
              <option value="centro">Centro</option>
              <option value="norte">Norte</option>
              <option value="sur">Sur</option>
              <option value="valle">Valle de Los Chillos</option>
              <option value="tumbaco">Tumbaco</option>
              <option value="quito">Quitumbe</option>
              <option value="cumbaya">Cumbayá</option>
              <option value="eloy">Eloy Alfaro</option>
              <option value="manuela">Manuela Sáenz</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Tipo de Parroquia</label>
            <select class="form-select" v-model="parishType">
              <option value="all">Todas (65 parroquias)</option>
              <option value="urban">Urbanas (32)</option>
              <option value="rural">Rurales (33)</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Período de Tiempo</label>
            <select class="form-select" v-model="period">
              <option value="day">Últimas 24 horas</option>
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
              <option value="year">Último año</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Rango de Consumo (m³)</label>
            <div class="d-flex justify-content-between">
              <span>0</span>
              <span>50,000</span>
            </div>
            <input type="range" class="form-range" min="0" max="50000" v-model="consumoRango" />
          </div>
          <button class="btn btn-primary w-100 mb-3">
            <span style="margin-right:8px;">&#x1f4e5;</span> Exportar Datos
          </button>
          <div class="legend card p-3 mb-2">
            <h6 class="mb-2">Leyenda de Consumo</h6>
            <div class="legend-item"><span class="legend-color bg-green"></span> Bajo (0-5,000 m³)</div>
            <div class="legend-item"><span class="legend-color bg-yellow"></span> Medio (5,001-15,000 m³)</div>
            <div class="legend-item"><span class="legend-color bg-orange"></span> Alto (15,001-30,000 m³)</div>
            <div class="legend-item"><span class="legend-color bg-red"></span> Muy Alto (&gt;30,000 m³)</div>
          </div>
        </div>
        <div class="sidebar-section">
          <h2 class="sidebar-title">Resumen General</h2>
          <div class="stats-grid mb-3">
            <div class="stat-card">
              <div class="stat-value">1,248,450</div>
              <div class="stat-label">m³ Consumidos</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">+5.2%</div>
              <div class="stat-label">Variación mensual</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">32</div>
              <div class="stat-label">Parroquias urbanas</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">33</div>
              <div class="stat-label">Parroquias rurales</div>
            </div>
          </div>
          <h6 class="mt-4">Zonas con Mayor Consumo</h6>
          <div class="list-group">
            <span class="list-group-item d-flex justify-content-between align-items-center">
              Centro Histórico <span class="badge bg-danger">42,780 m³</span>
            </span>
            <span class="list-group-item d-flex justify-content-between align-items-center">
              Norte <span class="badge bg-warning">38,450 m³</span>
            </span>
            <span class="list-group-item d-flex justify-content-between align-items-center">
              Valle de Los Chillos <span class="badge bg-warning">36,120 m³</span>
            </span>
          </div>
        </div>
      </aside>
      <!-- Main content -->
      <section class="dashboard-main">
        <div class="main-map-area shadow-sm">
          <div id="map"></div>
          <div class="map-overlay-custom card shadow-sm">
            <h6 class="fw-bold mb-2">Zona Seleccionada: {{ selectedZone.name }}</h6>
            <div class="mb-1"><span class="fw-bold">Consumo:</span> {{ selectedZone.consumption.toLocaleString() }} m³</div>
            <div class="mb-1"><span class="fw-bold">Variación:</span>
              <span :class="selectedZone.variation > 0 ? 'text-danger' : 'text-success'">
                {{ selectedZone.variation > 0 ? '+' : '' }}{{ selectedZone.variation }}%
              </span>
            </div>
            <div class="mb-1"><span class="fw-bold">Parroquias:</span>
              <span v-for="parish in selectedZone.parishes" :key="parish" class="parish-badge-custom">{{ parish }}</span>
            </div>
            <div class="consumption-meter mt-2">
              <div class="consumption-fill" :style="{width: fillWidth+'%'}"></div>
            </div>
            <small id="consumption-level">Nivel de consumo: {{ nivelConsumo }}</small>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-6">
            <div class="card-dmq">
              <div class="card-header-dmq">Consumo por Administración Zonal</div>
              <div class="card-body">
                <div class="chart-container">
                  <canvas id="zoneChart"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card-dmq">
              <div class="card-header-dmq">Variación Temporal</div>
              <div class="card-body">
                <div class="chart-container">
                  <canvas id="trendChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-12">
            <div class="card-dmq">
              <div class="card-header-dmq">Distribución por Parroquia</div>
              <div class="card-body">
                <div class="chart-container" style="height: 300px;">
                  <canvas id="parishChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <footer class="text-center py-3 mt-4 border-top">
      <small>&copy; 2025 Municipio Agua. Todos los derechos reservados.</small>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

const time = ref('')
const date = ref('')
const zoneSelect = ref('centro')
const parishType = ref('all')
const period = ref('month')
const consumoRango = ref(20000)

const zones = {
  centro: {
    name: 'Centro Histórico',
    coordinates: [[-0.235, -78.520], [-0.210, -78.495]],
    consumption: 42780,
    variation: 3.8,
    parishes: ['El Sagrario', 'San Blas', 'San Sebastián', 'La Magdalena']
  },
  norte: {
    name: 'Norte',
    coordinates: [[-0.180, -78.490], [-0.140, -78.470]],
    consumption: 38450,
    variation: 2.1,
    parishes: ['Iñaquito', 'Jipijapa', 'Kennedy', 'Ponceano']
  },
  sur: {
    name: 'Sur',
    coordinates: [[-0.310, -78.540], [-0.270, -78.490]],
    consumption: 32150,
    variation: 4.5,
    parishes: ['Chillogallo', 'Guamaní', 'Quitumbe', 'Turubamba']
  },
  valle: {
    name: 'Valle de Los Chillos',
    coordinates: [[-0.320, -78.440], [-0.280, -78.410]],
    consumption: 36120,
    variation: 6.2,
    parishes: ['La Merced', 'San Juan', 'Alangasí', 'Conocoto']
  },
  tumbaco: {
    name: 'Tumbaco',
    coordinates: [[-0.210, -78.420], [-0.180, -78.380]],
    consumption: 28760,
    variation: 1.8,
    parishes: ['Tumbaco', 'Píntag', 'El Quinche', 'Yaruquí']
  },
  quito: {
    name: 'Quitumbe',
    coordinates: [[-0.290, -78.530], [-0.260, -78.500]],
    consumption: 31240,
    variation: -0.5,
    parishes: ['Quitumbe', 'Chillogallo', 'Guamaní', 'Solanda']
  },
  cumbaya: {
    name: 'Cumbayá',
    coordinates: [[-0.190, -78.440], [-0.160, -78.410]],
    consumption: 29870,
    variation: 2.7,
    parishes: ['Cumbayá', 'Tumbaco', 'Píntag']
  },
  eloy: {
    name: 'Eloy Alfaro',
    coordinates: [[-0.150, -78.530], [-0.110, -78.490]],
    consumption: 35680,
    variation: 5.3,
    parishes: ['Eloy Alfaro', 'Jipijapa', 'Mariscal Sucre']
  },
  manuela: {
    name: 'Manuela Sáenz',
    coordinates: [[-0.250, -78.530], [-0.220, -78.500]],
    consumption: 27450,
    variation: 1.2,
    parishes: ['Manuela Sáenz', 'La Mena', 'San Bartolo']
  }
}
const selectedZoneKey = ref('centro')
const selectedZone = computed(() => zones[selectedZoneKey.value])
const fillWidth = computed(() => Math.min(100, (selectedZone.value.consumption / 50000) * 100))
const nivelConsumo = computed(() => {
  const v = selectedZone.value.consumption
  if (v < 15000) return 'Bajo'
  if (v < 25000) return 'Medio'
  if (v < 35000) return 'Alto'
  return 'Muy Alto'
})

function onZoneChange() {
  if (zoneSelect.value !== 'all') {
    selectedZoneKey.value = zoneSelect.value
  }
}

function updateDateTime() {
  const now = new Date()
  time.value = now.toLocaleTimeString()
  date.value = now.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  updateDateTime()
  setInterval(updateDateTime, 1000)
  nextTick(() => {
    // Usar CDN de Leaflet/Chart.js o instalar vía npm e importar
    // eslint-disable-next-line no-undef
    const map = L.map('map').setView([-0.2295, -78.5249], 11)
    // eslint-disable-next-line no-undef
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
    Object.keys(zones).forEach(zoneKey => {
      const zone = zones[zoneKey]
      const color = getColor(zone.consumption)
      // eslint-disable-next-line no-undef
      const rectangle = L.rectangle(zone.coordinates, {
        color: color,
        weight: 2,
        fillColor: color,
        fillOpacity: 0.4
      }).addTo(map)
      const center = [
        (zone.coordinates[0][0] + zone.coordinates[1][0]) / 2,
        (zone.coordinates[0][1] + zone.coordinates[1][1]) / 2
      ]
      // eslint-disable-next-line no-undef
      L.marker(center, {
        icon: L.divIcon({
          className: 'zone-label-custom',
          html: `<div>${zone.name}</div>`,
          iconSize: [110, 28]
        })
      }).addTo(map)
      rectangle.on('click', () => {
        selectedZoneKey.value = zoneKey
        rectangle.setStyle({ fillOpacity: 0.7 })
      })
      rectangle.on('mouseout', () => {
        rectangle.setStyle({ fillOpacity: 0.4 })
      })
      rectangle.on('mouseover', () => {
        rectangle.setStyle({ fillOpacity: 0.6 })
      })
    })

    // Chart.js inicialización
    // eslint-disable-next-line no-undef
    new Chart(document.getElementById('zoneChart'), {
      type: 'bar',
      data: {
        labels: Object.values(zones).map(z => z.name),
        datasets: [{
          label: 'Consumo (m³)',
          data: Object.values(zones).map(z => z.consumption),
          backgroundColor: Object.values(zones).map(z => getColor(z.consumption)),
          borderColor: Object.values(zones).map(z => getColor(z.consumption)),
          borderWidth: 1
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, title: { display: true, text: 'm³ de agua' } } } }
    })
    // eslint-disable-next-line no-undef
    new Chart(document.getElementById('trendChart'), {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        datasets: [{
          label: 'Consumo Mensual (miles de m³)',
          data: [120, 118, 125, 130, 128, 132, 135, 142, 138, 140, 145, 148],
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          borderWidth: 3,
          tension: 0.3,
          fill: true
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { title: { display: true, text: 'miles de m³' } } } }
    })
    // eslint-disable-next-line no-undef
    new Chart(document.getElementById('parishChart'), {
      type: 'doughnut',
      data: {
        labels: ['Parroquias Urbanas', 'Parroquias Rurales'],
        datasets: [{
          data: [32, 33],
          backgroundColor: ['#3498db', '#2ecc71'],
          borderWidth: 0
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
    })
  })
})

function getColor(consumption) {
  if (consumption < 15000) return '#2ecc71'
  if (consumption < 25000) return '#f1c40f'
  if (consumption < 35000) return '#e67e22'
  return '#e74c3c'
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
.dashboard-bg {
  background: #f5f7fa !important;
  min-height: 100vh;
}
.dmq-header {
  background: linear-gradient(90deg, #22609e 0%, #ffe45e 100%);
  color: #fff;
  border-radius: 0.5em;
  margin: 20px 20px 0 20px;
  padding: 18px 38px 18px 38px;
}
.dmq-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dmq-title {
  font-weight: 700;
  font-size: 2.1rem;
  margin-bottom: .2em;
}
.dmq-subtitle {
  font-weight: 400;
  font-size: 1.07rem;
  color: #e6e6e6;
}
.dmq-header-clock {
  font-size: 1rem;
  color: #ffeaaa;
  font-weight: 400;
}
.dashboard-container {
  display: flex;
  gap: 22px;
  padding: 0 20px 0 20px;
  margin-top: 12px;
}
.sidebar {
  width: 320px;
  min-width: 270px;
  max-width: 340px;
  background: #fff;
  padding: 24px 16px 20px 16px;
  border-radius: 12px;
  margin-bottom: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.sidebar-section {
  margin-bottom: 32px;
}
.sidebar-title {
  font-size: 1.12rem;
  font-weight: 600;
  color: #fff;
  background: #22609e;
  border-radius: 8px;
  padding: 8px 14px 8px 14px;
  margin-bottom: 18px;
}
.legend {
  font-size: 0.98em;
}
.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  gap: 6px;
}
.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  display: inline-block;
  margin-right: 3px;
}
.bg-green { background: #2ecc71; }
.bg-yellow { background: #f1c40f; }
.bg-orange { background: #e67e22; }
.bg-red { background: #e74c3c; }
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 6px;
}
.stat-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 10px 3px;
  text-align: center;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}
.stat-value {
  font-size: 1.54rem;
  font-weight: 700;
  color: #22609e;
}
.stat-label {
  font-size: 0.92rem;
  color: #333a;
}
.dashboard-main {
  flex: 1 1 0%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.main-map-area {
  position: relative;
  border-radius: 13px;
  overflow: hidden;
  min-height: 540px;
  background: #fff;
  margin-bottom: 12px;
}
#map {
  width: 100%;
  height: 540px;
  border-radius: 13px;
  z-index: 1;
}
.map-overlay-custom {
  position: absolute;
  top: 23px;
  right: 23px;
  z-index: 1000;
  background: #fff;
  border-radius: 11px;
  padding: 18px 18px 12px 18px;
  min-width: 280px;
  box-shadow: 0 2px 14px rgba(60,90,130,0.10);
  font-size: 1.01em;
}
.parish-badge-custom {
  display: inline-block;
  padding: 0.22em 0.7em;
  font-size: 0.93em;
  font-weight: 600;
  border-radius: 0.25rem;
  margin: 0.11em 0.09em 0 0;
  background: #1b8be0;
  color: #fff;
}
.consumption-meter {
  height: 7px;
  background: #eee;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 5px;
}
.consumption-fill {
  height: 100%;
  background: linear-gradient(90deg, #2ecc71, #e74c3c);
}
.zone-label-custom {
  background: rgba(255,255,255,0.98);
  color: #1a5276;
  font-size: 1em;
  font-weight: 600;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(60,90,130,0.13);
  border: 1.5px solid #ddd;
  padding: 2px 16px;
  text-align: center;
}
.card-dmq {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  overflow: hidden;
}
.card-header-dmq {
  background-color: #22609e;
  color: white;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  font-size: 1.1rem;
}
.card-body {
  padding: 1.5rem;
}
.chart-container {
  position: relative;
  height: 250px;
  width: 100%;
}
@media (max-width: 1300px) {
  .dashboard-container {
    flex-direction: column;
    gap: 0;
  }
  .sidebar {
    width: 100%;
    max-width: 100vw;
    margin-bottom: 30px;
  }
  .dashboard-main { width: 100%; }
}
@media (max-width: 900px) {
  .main-map-area, #map { height: 340px; min-height: 340px; }
  .map-overlay-custom { min-width: 90vw; right: 2vw; left: 2vw; }
}
@media (max-width: 600px) {
  .dmq-header { padding: 13px 3vw 13px 3vw; margin: 8px 0 0 0; font-size: 0.95em;}
  .dashboard-container { padding: 0 1vw 0 1vw; }
  .main-map-area, #map { height: 220px; min-height: 220px; }
  .map-overlay-custom { padding: 10px; font-size: 0.99em; }
}
</style>