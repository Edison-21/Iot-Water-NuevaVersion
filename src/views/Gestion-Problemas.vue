<template>
  <div class="problem-management-container">
    <header class="header">
      <div class="header-left">
        <span class="header-title">Gestión de Problemas</span>
        <span class="header-subtitle">Control de incidentes técnicos internos</span>
      </div>
      <div class="header-right">
        <button class="header-button primary" @click="showNewReportModal = true">
          <i class="icon-plus"></i> Nuevo Reporte
        </button>
        <button class="header-button">
          <i class="icon-export"></i> Exportar <i class="icon-arrow-down"></i>
        </button>
      </div>
    </header>

    <div class="dashboard-content">
      <div class="priority-indicators">
        <div class="indicator-card critical">
          <span class="count">3</span>
          <span class="label">Críticos</span>
        </div>
        <div class="indicator-card high">
          <span class="count">7</span>
          <span class="label">Altos</span>
        </div>
        <div class="indicator-card medium">
          <span class="count">12</span>
          <span class="label">Medios</span>
        </div>
        <div class="indicator-card low">
          <span class="count">5</span>
          <span class="label">Bajos</span>
        </div>
      </div>

      <div class="main-sections">
        <div class="reported-incidents-section">
          <div class="section-header">
            <h3>Incidentes Reportados</h3>
            <div class="search-filter-group">
              <div class="search-box">
                <i class="icon-search"></i>
                <input type="text" placeholder="Buscar incidente..." />
              </div>
              <button class="filter-dropdown-button"><i class="icon-filter"></i></button>
            </div>
          </div>

          <nav class="incident-tab-navigation">
            <button
              :class="{ 'tab-button': true, 'active': activeIncidentTab === 'all' }"
              @click="activeIncidentTab = 'all'"
            >
              Todos
            </button>
            <button
              :class="{ 'tab-button': true, 'active': activeIncidentTab === 'new' }"
              @click="activeIncidentTab = 'new'"
            >
              Nuevos
            </button>
            <button
              :class="{ 'tab-button': true, 'active': activeIncidentTab === 'assigned' }"
              @click="activeIncidentTab = 'assigned'"
            >
              Asignados
            </button>
            <button
              :class="{ 'tab-button': true, 'active': activeIncidentTab === 'in-progress' }"
              @click="activeIncidentTab = 'in-progress'"
            >
              En Progreso
            </button>
            <button
              :class="{ 'tab-button': true, 'active': activeIncidentTab === 'resolved' }"
              @click="activeIncidentTab = 'resolved'"
            >
              Resueltos
            </button>
          </nav>

          <div class="incident-list">
            <div v-if="activeIncidentTab === 'all' || activeIncidentTab === 'in-progress'">
              <div class="incident-item">
                <div class="incident-header-item">
                  <h4>Caída del servidor principal</h4>
                  <span class="incident-date">15 Jun 2023 - 10:15 AM</span>
                </div>
                <div class="status-badge critical-status">Crítico</div>
                <div class="status-badge progress-status">En Progreso</div>
                <p>El servidor principal ha dejado de responder, afectando todos los servicios críticos de la organización. Error 500 en todos los endpoints.</p>
                <div class="reporter-info">
                  <img src="" alt="Avatar" class="avatar" />
                  <span>Reportado por: Carlos Méndez</span>
                  <span class="department">Departamento de TI</span>
                </div>
                <div class="incident-tags">
                  <span class="tag"><i class="icon-server"></i> Servidores</span>
                  <span class="tag urgent-tag"><i class="icon-alert"></i> Urgente</span>
                  <button class="details-button">Ver Detalles</button>
                </div>
              </div>
            </div>

            <div v-if="activeIncidentTab === 'all' || activeIncidentTab === 'assigned'">
              <div class="incident-item">
                <div class="incident-header-item">
                  <h4>Error en módulo de facturación</h4>
                  <span class="incident-date">14 Jun 2023 - 3:45 PM</span>
                </div>
                <div class="status-badge high-status">Alto</div>
                <div class="status-badge assigned-status">Asignado</div>
                <p>Los clientes no pueden generar facturas desde el portal. Error "Referencia no válida" al intentar procesar el pago.</p>
                <div class="reporter-info">
                  <img src="" alt="Avatar" class="avatar" />
                  <span>Reportado por: Laura Sánchez</span>
                  <span class="department">Departamento Financiero</span>
                </div>
                <div class="incident-tags">
                  <span class="tag"><i class="icon-billing"></i> Facturación</span>
                  <span class="tag"><i class="icon-frontend"></i> Frontend</span>
                  <button class="details-button">Ver Detalles</button>
                </div>
              </div>
            </div>

            <div v-if="activeIncidentTab === 'all' || activeIncidentTab === 'new'">
              <div class="incident-item">
                <div class="incident-header-item">
                  <h4>Problema con impresora central</h4>
                  <span class="incident-date">14 Jun 2023 - 9:30 AM</span>
                </div>
                <div class="status-badge medium-status">Medio</div>
                <div class="status-badge new-status">Nuevo</div>
                <p>La impresora del área administrativa no responde y muestra error "Tóner bajo" aunque se reemplazó recientemente.</p>
                <div class="reporter-info">
                  <img src="" alt="Avatar" class="avatar" />
                  <span>Reportado por: Juan Pérez</span>
                  <span class="department">Administración</span>
                </div>
                <div class="incident-tags">
                  <span class="tag"><i class="icon-hardware"></i> Hardware</span>
                  <span class="tag"><i class="icon-office"></i> Oficina</span>
                  <button class="details-button">Ver Detalles</button>
                </div>
              </div>
            </div>

            <div v-if="activeIncidentTab === 'new'">
              <div class="incident-item">
                <div class="incident-header-item">
                  <h4>Fallo de conexión en sucursal A</h4>
                  <span class="incident-date">13 Jun 2023 - 01:00 PM</span>
                </div>
                <div class="status-badge low-status">Bajo</div>
                <div class="status-badge new-status">Nuevo</div>
                <p>Usuarios de la sucursal A reportan intermitencia en la conexión a internet y sistemas internos.</p>
                <div class="reporter-info">
                  <img src="" alt="Avatar" class="avatar" />
                  <span>Reportado por: Soporte Sucursal A</span>
                  <span class="department">Redes</span>
                </div>
                <div class="incident-tags">
                  <span class="tag"><i class="icon-network"></i> Red</span>
                  <span class="tag"><i class="icon-location"></i> Sucursal A</span>
                  <button class="details-button">Ver Detalles</button>
                </div>
              </div>
            </div>

            <div v-if="activeIncidentTab === 'assigned'">
              <div class="incident-item">
                <div class="incident-header-item">
                  <h4>Actualización de base de datos fallida</h4>
                  <span class="incident-date">12 Jun 2023 - 09:40 AM</span>
                </div>
                <div class="status-badge critical-status">Crítico</div>
                <div class="status-badge assigned-status">Asignado</div>
                <p>La última actualización programada de la base de datos principal ha fallado, afectando la disponibilidad de datos históricos.</p>
                <div class="reporter-info">
                  <img src="" alt="Avatar" class="avatar" />
                  <span>Reportado por: Equipo DBA</span>
                  <span class="department">Sistemas</span>
                </div>
                <div class="incident-tags">
                  <span class="tag"><i class="icon-database"></i> Base de Datos</span>
                  <span class="tag"><i class="icon-update"></i> Actualización</span>
                  <button class="details-button">Ver Detalles</button>
                </div>
              </div>
            </div>

            <div class="pagination">
              <button class="pagination-button">Anterior</button>
              <button class="pagination-button active">1</button>
              <button class="pagination-button">2</button>
              <button class="pagination-button">3</button>
              <button class="pagination-button">Siguiente</button>
            </div>
          </div>
        </div>

        <div class="right-panel">
          <div class="tech-team-section card">
            <h3>Equipo Técnico Disponible</h3>
            <div class="tech-member">
              <img src="" alt="Roberto Jiménez" class="tech-avatar" />
              <div class="tech-info">
                <span class="tech-name">Ing. Roberto Jiménez</span>
                <span class="tech-role">Especialista en Servidores</span>
              </div>
              <span class="status-badge assigned-status">Asignado</span>
            </div>
            <div class="tech-member">
              <img src="" alt="Daniela Ríos" class="tech-avatar" />
              <div class="tech-info">
                <span class="tech-name">Lic. Daniela Ríos</span>
                <span class="tech-role">Desarrolladora Backend</span>
              </div>
            </div>
            <div class="tech-member">
              <img src="" alt="Luis Mendoza" class="tech-avatar" />
              <div class="tech-info">
                <span class="tech-name">Téc. Luis Mendoza</span>
                <span class="tech-role">Soporte Hardware</span>
              </div>
            </div>
            <div class="tech-member">
              <img src="" alt="Sofía Castro" class="tech-avatar" />
              <div class="tech-info">
                <span class="tech-name">Ing. Sofía Castro</span>
                <span class="tech-role">DBA - Administradora de Bases</span>
              </div>
            </div>
            <button class="assign-button"><i class="icon-user-plus"></i> Asignar Personal</button>
            <div class="critical-incident-warning">
              <i class="icon-warning"></i> El incidente crítico requiere atención inmediata
            </div>
          </div>

          <div class="notifications-section card">
            <h3>Notificaciones <span class="notification-count">3</span></h3>
            <div class="notification-options">
              <label><input type="checkbox" checked /> Usuario que reportó</label>
              <label><input type="checkbox" /> Prensa / Comunicación (Nota pública)</label>
              <label><input type="checkbox" checked /> Equipo técnico</label>
              <label><input type="checkbox" checked /> Supervisores</label>
            </div>
            <div class="message-input">
              <label>Mensaje personalizado</label>
              <textarea placeholder="Agregue un mensaje adicional para las notificaciones..."></textarea>
            </div>
            <button class="send-notifications-button"><i class="icon-send"></i> Enviar Notificaciones</button>
          </div>

          <div class="case-log-section card">
            <h3>Bitácora del Caso</h3>
            <div class="log-entry">
              <span class="log-dot report-dot"></span>
              <div class="log-content">
                <span class="log-title">Incidente reportado</span>
                <span class="log-date">15 Jun 2023 - 10:15 AM</span>
                <p>Carlos Méndez reportó la caída del servidor principal.</p>
              </div>
            </div>
            <div class="log-entry">
              <span class="log-dot priority-dot"></span>
              <div class="log-content">
                <span class="log-title">Prioridad asignada</span>
                <span class="log-date">15 Jun 2023 - 10:30 AM</span>
                <p>El incidente fue marcado como CRÍTICO por el supervisor.</p>
              </div>
            </div>
            <div class="log-entry">
              <span class="log-dot technician-dot"></span>
              <div class="log-content">
                <span class="log-title">Técnico asignado</span>
                <span class="log-date">15 Jun 2023 - 10:45 AM</span>
                <p>Ing. Roberto Jiménez fue asignado para resolver el incidente.</p>
              </div>
            </div>

            <div class="add-log-entry">
              <label>Agregar entrada a bitácora</label>
              <textarea placeholder="Registre actualizaciones o comentarios..."></textarea>
            </div>
            <div class="attach-files">
              <label>Adjuntar archivos</label>
              <div class="file-input-group">
                <button class="choose-file-button">Elegir archivos</button>
                <span class="no-file-selected">Sin archivos seleccionados</span>
              </div>
              <p class="file-tip">Puede adjuntar imágenes, logs o documentos relevantes</p>
            </div>
            <button class="add-to-log-button"><i class="icon-plus"></i> Agregar a Bitácora</button>
          </div>
        </div>
      </div>
    </div>

    <NewReportModal v-if="showNewReportModal" @close="showNewReportModal = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NewReportModal from '../components/NewReportModal.vue'; // Asegúrate de que la ruta sea correcta

const activeIncidentTab = ref('all'); // Pestaña activa por defecto
const showNewReportModal = ref(false); // Controla la visibilidad del modal

// Nota: Para una aplicación real, los datos de los incidentes
// se cargarían desde una API y se filtrarían según activeIncidentTab.
// Aquí se usan v-if directamente sobre los elementos para simularlo.
</script>

<style scoped>
/* General Layout */
.problem-management-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f2f5;
  color: #333;
}

/* Header */
.header {
  background-color: #fff;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid #eee;
}

.header-left {
  display: flex;
  flex-direction: column;
}

.header-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.header-subtitle {
  font-size: 14px;
  color: #777;
}

.header-right .header-button {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  color: #555;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s ease;
}

.header-right .header-button:hover {
  background-color: #e0e0e0;
  border-color: #ccc;
}

.header-right .header-button.primary {
  background-color: #007bff; /* Azul */
  color: white;
  border-color: #007bff;
}

.header-right .header-button.primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

/* Dashboard Content */
.dashboard-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Priority Indicators */
.priority-indicators {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.indicator-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
}

.indicator-card:hover {
  transform: translateY(-3px);
}

.indicator-card .count {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 5px;
}

.indicator-card .label {
  font-size: 16px;
  color: #666;
}

.indicator-card.critical .count { color: #dc3545; } /* Rojo */
.indicator-card.high .count { color: #fd7e14; } /* Naranja */
.indicator-card.medium .count { color: #ffc107; } /* Amarillo */
.indicator-card.low .count { color: #28a745; } /* Verde */

/* Main Sections Layout */
.main-sections {
  display: flex;
  gap: 20px;
}

.reported-incidents-section {
  flex: 2; /* Takes more space */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
}

.right-panel {
  flex: 1; /* Takes less space */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
}

/* Section Header (Incidents) */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.section-header h3 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.search-filter-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.search-box {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: #f9f9f9;
}

.search-box input {
  border: none;
  outline: none;
  padding: 5px;
  background-color: transparent;
}

.search-box i {
  color: #999;
  margin-right: 5px;
}

.filter-dropdown-button {
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.filter-dropdown-button:hover {
  background-color: #dee2e6;
}

/* Incident Tab Navigation */
.incident-tab-navigation {
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.incident-tab-navigation .tab-button {
  background-color: transparent;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 15px;
  color: #666;
  position: relative;
  transition: color 0.3s ease;
}

.incident-tab-navigation .tab-button.active {
  color: #007bff;
  font-weight: bold;
}

.incident-tab-navigation .tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #007bff;
  border-radius: 2px 2px 0 0;
}

.incident-tab-navigation .tab-button:hover:not(.active) {
  color: #333;
}

/* Incident List Item */
.incident-item {
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.incident-item:hover {
  border-color: #cce5ff;
  box-shadow: 0 2px 5px rgba(0, 123, 255, 0.1);
}

.incident-header-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.incident-header-item h4 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.incident-date {
  font-size: 13px;
  color: #777;
}

.status-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  margin-right: 8px;
  margin-bottom: 8px;
}

.critical-status { background-color: #f8d7da; color: #721c24; } /* Rojo */
.high-status { background-color: #ffe5cc; color: #854f00; } /* Naranja */
.medium-status { background-color: #fff3cd; color: #856404; } /* Amarillo */
.low-status { background-color: #d4edda; color: #155724; } /* Verde */
.progress-status { background-color: #cfe2ff; color: #0747a6; } /* Azul claro */
.assigned-status { background-color: #e0e0e0; color: #444; } /* Gris */
.new-status { background-color: #e0f2f7; color: #007bff; } /* Azul suave */

.incident-item p {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  margin-bottom: 10px;
}

.reporter-info {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
}

.reporter-info .avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: #ddd; /* Placeholder */
}

.reporter-info .department {
  margin-left: 10px;
  font-style: italic;
  color: #888;
}

.incident-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-top: 10px;
}

.tag {
  background-color: #e9ecef;
  color: #555;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.tag.urgent-tag {
  background-color: #dc3545;
  color: white;
}

.details-button {
  margin-left: auto; /* Push to the right */
  background-color: transparent;
  border: 1px solid #007bff;
  color: #007bff;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;
}

.details-button:hover {
  background-color: #007bff;
  color: white;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 5px;
}

.pagination-button {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.pagination-button:hover:not(.active) {
  background-color: #e0e0e0;
}

/* Right Panel - Team Section */
.tech-team-section {
  padding-bottom: 10px; /* Adjust spacing */
}

.tech-team-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
}

.tech-member {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.tech-member:last-of-type {
  border-bottom: none;
  margin-bottom: 15px;
}

.tech-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
  background-color: #cce5ff; /* Placeholder color */
  border: 1px solid #aaddff;
}

.tech-info {
  flex-grow: 1;
}

.tech-name {
  font-weight: bold;
  display: block;
  font-size: 15px;
}

.tech-role {
  font-size: 13px;
  color: #777;
}

.assign-button {
  width: 100%;
  background-color: #6c757d; /* Gris oscuro */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s ease;
}

.assign-button:hover {
  background-color: #5a6268;
}

.critical-incident-warning {
  background-color: #fff3cd; /* Amarillo claro */
  border: 1px solid #ffc107; /* Amarillo */
  color: #856404;
  padding: 10px 15px;
  border-radius: 5px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: bold;
}

/* Notifications Section */
.notifications-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
}

.notification-count {
  background-color: #dc3545; /* Rojo */
  color: white;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.notification-options label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
  cursor: pointer;
}

.notification-options input[type="checkbox"] {
  margin-right: 8px;
  accent-color: #007bff; /* Color del checkbox */
}

.message-input {
  margin-top: 20px;
}

.message-input label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
}

.message-input textarea {
  width: calc(100% - 20px);
  min-height: 80px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
}

.send-notifications-button {
  width: 100%;
  background-color: #28a745; /* Verde */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s ease;
}

.send-notifications-button:hover {
  background-color: #218838;
}

/* Case Log Section */
.case-log-section h3 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.log-entry {
  display: flex;
  margin-bottom: 20px;
  position: relative;
}

.log-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  left: -25px; /* Adjust to align with the list */
  top: 5px;
}

.log-dot.report-dot { background-color: #007bff; }
.log-dot.priority-dot { background-color: #dc3545; }
.log-dot.technician-dot { background-color: #ffc107; }

.log-content {
  margin-left: 10px; /* Space from the dot */
  padding-left: 15px; /* Visual line space */
  border-left: 2px solid #eee;
}

.log-entry:last-child .log-content {
  border-left: none; /* No line for the last entry */
}

.log-title {
  font-weight: bold;
  font-size: 15px;
  display: block;
  margin-bottom: 3px;
}

.log-date {
  font-size: 12px;
  color: #777;
  margin-bottom: 5px;
  display: block;
}

.log-entry p {
  font-size: 14px;
  color: #555;
  margin: 0;
}

.add-log-entry {
  margin-top: 25px;
}

.add-log-entry label, .attach-files label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
}

.add-log-entry textarea {
  width: calc(100% - 20px);
  min-height: 60px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
}

.attach-files {
  margin-top: 20px;
}

.file-input-group {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.choose-file-button {
  background-color: #e9ecef;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  flex-shrink: 0;
  transition: background-color 0.2s;
}

.choose-file-button:hover {
  background-color: #dee2e6;
}

.no-file-selected {
  flex-grow: 1;
  padding: 8px 10px;
  background-color: #f9f9f9;
  color: #666;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-tip {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}

.add-to-log-button {
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s ease;
}

.add-to-log-button:hover {
  background-color: #0056b3;
}

/* Icons (Placeholder - you'd replace with actual icon font/SVG) */
.icon-plus::before { content: '✚'; }
.icon-export::before { content: '⤓'; }
.icon-arrow-down::before { content: '▼'; font-size: 0.8em;}
.icon-search::before { content: '🔍'; }
.icon-filter::before { content: ' Filters'; } /* Not a standard Unicode icon, might need FontAwesome */
.icon-server::before { content: '💻'; }
.icon-alert::before { content: '❗'; }
.icon-billing::before { content: '💳'; }
.icon-frontend::before { content: '🌐'; }
.icon-hardware::before { content: '⚙️'; }
.icon-office::before { content: '🏢'; }
.icon-network::before { content: '🔗'; }
.icon-location::before { content: '📍'; }
.icon-database::before { content: '🗄️'; }
.icon-update::before { content: '🔄'; }
.icon-user-plus::before { content: '👤+'; }
.icon-warning::before { content: '⚠️'; }
.icon-send::before { content: '✉️'; }

/* Responsive Adjustments */
@media (max-width: 992px) {
  .main-sections {
    flex-direction: column;
  }
  .reported-incidents-section,
  .right-panel {
    flex: none;
    width: 100%;
  }
  .priority-indicators {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

@media (max-width: 576px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .header-right {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .header-right .header-button {
    flex: 1;
    margin-left: 0;
    justify-content: center;
  }
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .search-filter-group {
    width: 100%;
  }
  .search-box {
    flex-grow: 1;
  }
  .incident-tab-navigation {
    flex-wrap: wrap;
  }
  .incident-tab-navigation .tab-button {
    flex-basis: calc(50% - 10px); /* 2 buttons per row */
    margin-bottom: 10px;
  }
}
</style>