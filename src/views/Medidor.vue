<template>
  <div class="bg-app">
    <!-- CONTENIDO -->
    <div class="denuncias-container">
      <div class="denuncias-header mb-3">
        <div>
          <h2 class="denuncias-title">
            <i class="fas fa-exclamation-triangle me-2"></i>
            Denuncias Administrativas - Sistema de Agua e IoT
          </h2>
          <div class="denuncias-subtitle">
            Gestión interna de incidencias relacionadas con el sistema de agua, dispositivos IoT o problemas de medición.
          </div>
        </div>
      </div>
      <div class="denuncias-content">
        <!-- GRAFICOS -->
        <section class="chart-section mb-4">
          <div class="row">
            <div class="col-md-6 mb-4 mb-md-0">
              <div class="chart-wrapper">
                <h5 class="chart-title">Tipos de Incidencias</h5>
                <div class="chart-container">
                  <canvas id="graficoTorta"></canvas>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="chart-wrapper">
                <h5 class="chart-title">Estado de Incidencias</h5>
                <div class="chart-container">
                  <canvas id="graficoBarras"></canvas>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- FORMULARIO SOLO PARA ADMIN SISTEMA DE AGUA E IOT -->
        <section class="form-section">
          <div class="card shadow-sm mb-4">
            <div class="card-header bg-primary text-white">
              <h5 class="mb-0">
                <i class="fas fa-plus-circle me-2"></i>
                Registrar Nueva Incidencia
              </h5>
            </div>
            <div class="card-body">
              <form class="needs-validation" novalidate>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="tipoIncidencia" class="form-label">Tipo de Incidencia</label>
                    <select class="form-select" id="tipoIncidencia" required>
                      <option value="" selected disabled>Seleccione...</option>
                      <option value="medidor">Falla en medidor</option>
                      <option value="fuga">Fuga de agua</option>
                      <option value="app">Problema con la App</option>
                      <option value="iot">Desconexión IoT</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label for="prioridad" class="form-label">Prioridad</label>
                    <select class="form-select" id="prioridad" required>
                      <option value="" selected disabled>Seleccione...</option>
                      <option value="alta">Alta</option>
                      <option value="media">Media</option>
                      <option value="baja">Baja</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="descripcion" class="form-label">Descripción detallada</label>
                  <textarea class="form-control" id="descripcion" rows="3" required></textarea>
                </div>
                <div class="mb-3">
                  <label for="evidencia" class="form-label">Subir evidencia (opcional)</label>
                  <input class="form-control" type="file" id="evidencia">
                </div>
                <button type="submit" class="btn btn-primary">
                  <i class="fas fa-paper-plane me-2"></i>Enviar Incidencia
                </button>
              </form>
            </div>
          </div>
        </section>

        <!-- MIS DENUNCIAS -->
        <section class="list-section">
          <div class="card shadow-sm">
            <div class="card-header bg-secondary text-white">
              <h5 class="mb-0">
                <i class="fas fa-list me-2"></i>
                Mis Incidencias Reportadas
              </h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tipo</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th>Prioridad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>INC-2023-001</td>
                      <td>Falla en medidor</td>
                      <td>15/06/2023</td>
                      <td><span class="badge bg-warning">En solución</span></td>
                      <td><span class="badge bg-danger">Alta</span></td>
                      <td>
                        <button class="btn btn-sm btn-outline-primary">
                          <i class="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>INC-2023-002</td>
                      <td>Problema con la App</td>
                      <td>10/06/2023</td>
                      <td><span class="badge bg-success">Cerrada</span></td>
                      <td><span class="badge bg-info">Media</span></td>
                      <td>
                        <button class="btn btn-sm btn-outline-primary">
                          <i class="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>INC-2023-003</td>
                      <td>Desconexión IoT</td>
                      <td>05/06/2023</td>
                      <td><span class="badge bg-primary">Asignada</span></td>
                      <td><span class="badge bg-warning">Baja</span></td>
                      <td>
                        <button class="btn btn-sm btn-outline-primary">
                          <i class="fas fa-eye"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center">
                  <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">Anterior</a>
                  </li>
                  <li class="page-item active"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#">Siguiente</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Chart from 'chart.js/auto'

// Datos para los gráficos
const chartData = {
  tiposIncidencia: {
    labels: ['Falla en medidor', 'Fuga de agua', 'Problema App', 'Desconexión IoT'],
    data: [5, 3, 2, 4]
  },
  estadosIncidencia: {
    labels: ['Recibidas', 'Asignadas', 'En solución', 'Cerradas'],
    data: [2, 3, 4, 1]
  }
}

// Variables para almacenar las instancias de los gráficos
let tortaChart = null
let barrasChart = null

onMounted(() => {
  renderCharts()
})

const renderCharts = () => {
  // Destruir gráficos existentes si los hay
  if (tortaChart) tortaChart.destroy()
  if (barrasChart) barrasChart.destroy()

  // Renderizar gráfico de torta
  const ctxTorta = document.getElementById('graficoTorta')
  if (ctxTorta) {
    tortaChart = new Chart(ctxTorta, {
      type: 'doughnut',
      data: {
        labels: chartData.tiposIncidencia.labels,
        datasets: [{
          data: chartData.tiposIncidencia.data,
          backgroundColor: ['#1d39c4', '#cf1322', '#d46b08', '#08979c'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { 
            position: 'bottom',
            labels: {
              padding: 20,
              boxWidth: 12,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            enabled: true
          }
        },
        cutout: '65%'
      }
    })
  }

  // Renderizar gráfico de barras
  const ctxBarras = document.getElementById('graficoBarras')
  if (ctxBarras) {
    barrasChart = new Chart(ctxBarras, {
      type: 'bar',
      data: {
        labels: chartData.estadosIncidencia.labels,
        datasets: [{
          label: 'Cantidad',
          data: chartData.estadosIncidencia.data,
          backgroundColor: '#1890ff',
          borderColor: '#096dd9',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { 
            display: false 
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              precision: 0
            }
          }
        }
      }
    })
  }
}

// Resto de la lógica del componente
const formData = {
  tipoIncidencia: '',
  prioridad: '',
  descripcion: '',
  evidencia: null
}

const denuncias = [
  {
    id: 'INC-2023-001',
    tipo: 'Falla en medidor',
    fecha: '15/06/2023',
    estado: 'En solución',
    prioridad: 'Alta'
  },
  {
    id: 'INC-2023-002',
    tipo: 'Problema con la App',
    fecha: '10/06/2023',
    estado: 'Cerrada',
    prioridad: 'Media'
  },
  {
    id: 'INC-2023-003',
    tipo: 'Desconexión IoT',
    fecha: '05/06/2023',
    estado: 'Asignada',
    prioridad: 'Baja'
  }
]

const submitForm = () => {
  // Lógica para enviar el formulario
  console.log('Formulario enviado:', formData)
}
</script>

<style scoped>
.bg-app {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
}

.denuncias-container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.denuncias-header {
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.denuncias-title {
  color: #333;
  font-weight: 600;
  margin-bottom: 5px;
}

.denuncias-subtitle {
  color: #666;
  font-size: 0.9rem;
}

.denuncias-content {
  padding: 20px;
}

.chart-section {
  margin-bottom: 30px;
}

.chart-wrapper {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  height: 100%;
}

.chart-title {
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 15px;
  text-align: center;
}

.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}

.form-section {
  margin-bottom: 30px;
}

.list-section {
  margin-bottom: 20px;
}

.badge {
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 4px;
}

.table {
  font-size: 0.9rem;
}

.table th {
  font-weight: 500;
  color: #555;
}

.card {
  border: none;
  border-radius: 8px;
}

.card-header {
  border-radius: 8px 8px 0 0 !important;
  font-weight: 500;
}

.btn-outline-primary {
  border-color: #1890ff;
  color: #1890ff;
}

.btn-outline-primary:hover {
  background-color: #1890ff;
  color: white;
}

@media (max-width: 768px) {
  .chart-container {
    height: 250px;
  }
}
</style>