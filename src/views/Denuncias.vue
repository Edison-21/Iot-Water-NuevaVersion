<template>
  <div class="device-management-container">
    <header class="header">
      <div class="header-left">
        <span class="header-title">Gestión de Dispositivos</span>
        <img src="" alt="LoRaWAN Logo" class="lorawan-logo" />
      </div>
      <div class="header-right">
        <button class="header-button"><i class="icon-refresh"></i> Actualizar</button>
        <button class="header-button primary"><i class="icon-plus"></i> Agregar Dispositivo</button>
      </div>
    </header>

    <div class="content-area">
      <aside class="sidebar">
        <div class="sidebar-header">
          <span>Dispositivos Conectados</span>
          <span class="device-count">1,240</span>
        </div>
        <div class="sidebar-filters">
          <select class="filter-select">
            <option>Todos los tipos</option>
            <option>Medidores</option>
            <option>Valvulas</option>
            <option>Gateways</option>
            <option>Sensores</option>
          </select>
          <select class="filter-select">
            <option>Activos</option>
            <option>Inactivos </option>
            <option>En Sesion </option>
            
          </select>
          <div class="search-box">
            <input type="text" placeholder="Buscar dispositivos..." />
            <button><i class="icon-search"></i></button>
          </div>
        </div>
        <div class="device-list">
          <div class="device-item active">
            <div class="device-info">
              <span class="device-name">Medidor #WTR-4587-23</span>
              <span class="device-sn">SN: LORA-MD-7845-2294</span>
            </div>
            <div class="device-status">
              <span class="status-label">Sector Norte</span>
              <span class="status-indicator active-status">Activo</span>
            </div>
            <span class="monitoring-status">Bajo monitoreo</span>
          </div>
          <div class="device-item">
            <div class="device-info">
              <span class="device-name">Válvula #VLV-1254-87</span>
              <span class="device-sn">SN: LORA-VL-4512-8874</span>
            </div>
            <div class="device-status">
              <span class="status-label">Sector Centro</span>
              <span class="status-indicator unstable-status">Inestable</span>
            </div>
            <span class="monitoring-status">En revisión</span>
          </div>
          <div class="device-item">
            <div class="device-info">
              <span class="device-name">Gateway #GTW-0012-45</span>
              <span class="device-sn">SN: LORA-GW-0012-4578</span>
            </div>
            <div class="device-status">
              <span class="status-label">Torre Este</span>
              <span class="status-indicator active-status">Activo</span>
            </div>
          </div>
          <div class="device-item">
            <div class="device-info">
              <span class="device-name">Medidor #WTR-7845-12</span>
              <span class="device-sn">SN: LORA-MD-7845-1234</span>
            </div>
            <div class="device-status">
              <span class="status-label">Sector Sur</span>
              <span class="status-indicator inactive-status">Inactivo</span>
            </div>
            <span class="monitoring-status replaced">Reemplazado</span>
          </div>
          <div class="device-item">
            <div class="device-info">
              <span class="device-name">Válvula #VLV-7845-32</span>
              <span class="device-sn">SN: LORA-VL-7845-3298</span>
            </div>
            <div class="device-status">
              <span class="status-label">Sector Oeste</span>
              <span class="status-indicator active-status">Activo</span>
            </div>
          </div>
        </div>
      </aside>

      <main class="main-content">
        <div class="device-header-details">
          <h2 class="device-name-main">Medidor #WTR-4587-23</h2>
          <div class="device-actions">
            <span class="status-indicator active-status connected">Conectado</span>
            <button class="action-button edit-button"><i class="icon-edit"></i> Editar</button>
            <button class="action-button delete-button"><i class="icon-delete"></i></button>
          </div>
        </div>

        <nav class="tab-navigation">
          <button
            :class="{ 'tab-button': true, 'active': activeTab === 'details' }"
            @click="activeTab = 'details'"
          >
            Detalles
          </button>
          <button
            :class="{ 'tab-button': true, 'active': activeTab === 'maintenance' }"
            @click="activeTab = 'maintenance'"
          >
            Mantenimiento
          </button>
          <button
            :class="{ 'tab-button': true, 'active': activeTab === 'logs' }"
            @click="activeTab = 'logs'"
          >
            Logs Técnicos
          </button>
          <button
            :class="{ 'tab-button': true, 'active': activeTab === 'location' }"
            @click="activeTab = 'location'"
          >
            Ubicación
          </button>
        </nav>

        <div class="tab-content">
          <div v-if="activeTab === 'details'" class="details-tab-content">
            <div class="info-section">
              <h3>Información Básica</h3>
              <div class="info-grid">
                <div class="info-item"><span>Número de Serie:</span><span>LORA-MD-7845-2294</span></div>
                <div class="info-item"><span>Tipo:</span><span>Medidor de Agua Inteligente</span></div>
                <div class="info-item"><span>Modelo:</span><span>AquaMeasure Pro X2</span></div>
                <div class="info-item"><span>Fabricante:</span><span>HydroTech Solutions</span></div>
                <div class="info-item"><span>Fecha Instalación:</span><span>15/03/2023</span></div>
              </div>
            </div>

            <div class="info-section">
              <h3>Ubicación y Asignación</h3>
              <div class="info-grid">
                <div class="info-item"><span>Sector:</span><span>Sector Norte</span></div>
                <div class="info-item"><span>Dirección:</span><span>Calle Principal #123, Manzana 5</span></div>
                <div class="info-item"><span>Cliente Asociado:</span><span>Juan López (ID: 458792)</span></div>
                <div class="info-item"><span>Gateway Principal:</span><span>GTW-0012-45 (Torre Este)</span></div>
                <div class="info-item"><span>Coordenadas:</span><span>12.3456° N, 45.6789° W</span></div>
              </div>
            </div>

            <div class="info-section">
              <h3>Estado Técnico</h3>
              <div class="info-grid">
                <div class="info-item"><span>Estado:</span><span class="status-indicator active-status">Activo <button class="status-button">Bajo monitoreo</button></span></div>
                <div class="info-item"><span>Batería:</span><span>78% ~2 años restantes</span></div>
                <div class="info-item"><span>Señal LoRa:</span><span>Buena (RSSI: -87 dBm)</span></div>
                <div class="info-item"><span>Última Comunicación:</span><span>Hoy, 10:24 AM</span></div>
              </div>
            </div>

            <div class="info-section">
              <h3>Configuración</h3>
              <div class="info-grid">
                <div class="info-item"><span>Frecuencia Reporte:</span><span>1 hora</span></div>
                <div class="info-item"><span>Umbral Alerta:</span><span>50 m³/día</span></div>
                <div class="info-item"><span>Versión Firmware:</span><span>v2.4.1 <button class="firmware-update-button">Actualización disponible</button></span></div>
                <div class="info-item"><span>Configuración Personalizada:</span><button class="view-params-button">Ver Parámetros</button></div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'maintenance'" class="maintenance-tab-content">
            <div class="maintenance-history">
              <h3>Historial de Mantenimiento</h3>
              <button class="register-maintenance-button"><i class="icon-plus"></i> Registrar Mantenimiento</button>
              <div class="maintenance-item">
                <h4>Reemplazo de batería</h4>
                <p>Batería principal reemplazada por modelo LT-2450</p>
                <p class="maintenance-meta">Técnico: María González • Duración: 45 min</p>
                <span class="maintenance-date">15/05/2023</span>
              </div>
              <div class="maintenance-item">
                <h4>Actualización de firmware</h4>
                <p>Actualizado a versión v2.3.4 (remota)</p>
                <p class="maintenance-meta">Por: Sistema Automático</p>
                <span class="maintenance-date">02/03/2023</span>
              </div>
              <div class="maintenance-item">
                <h4>Instalación inicial</h4>
                <p>Dispositivo instalado en ubicación actual</p>
                <p class="maintenance-meta">Técnico: Carlos Mendoza • Duración: 1h 20min</p>
                <span class="maintenance-date">15/03/2023</span>
              </div>
            </div>
            <div class="upcoming-maintenance">
              <p class="warning-message">
                <i class="icon-warning"></i> Revisión programada para el 15/11/2023 (cada 6 meses)
              </p>
            </div>
          </div>

          <div v-if="activeTab === 'logs'" class="logs-tab-content">
            <div class="log-header">
              <h3>Registro de Actividad</h3>
              <select class="log-filter-select">
                <option>Todos los evento</option>
                <option>Alertas</option>
                <option>Comunicaciones</option>
                <option>Configuraciones</option>
              </select>
            </div>
            <div class="log-entries">
              <div class="log-item alert">
                <h4>Alerta: Consumo inusual</h4>
                <p>Consumo reportado: 62 m³ en las últimas 24 horas (umbral: 50 m³)</p>
                <span class="log-timestamp">Hoy, 07:24 AM</span>
              </div>
              <div class="log-item">
                <h4>Reporte periódico</h4>
                <p>Lectura: 4587 m³ totales • 1.2 m³ en última hora</p>
                <span class="log-timestamp">Hoy, 07:24 AM</span>
              </div>
              <div class="log-item">
                <h4>Cambio de configuración</h4>
                <p>Umbral de alerta ajustado de 40 m³ a 50 m³/día</p>
                <p class="log-meta">Por: Admin (vía consola)</p>
                <span class="log-timestamp">Ayer, 03:15 PM</span>
              </div>
              <div class="log-item">
                <h4>Reconexión</h4>
                <p>Dispositivo reconectado después de 12 minutos sin comunicación</p>
                <span class="log-timestamp">Ayer, 02:58 PM</span>
              </div>
              <div class="log-item">
                <h4>Pérdida de señal</h4>
                <p>Dispositivo no respondió a 3 intentos de comunicación</p>
                <span class="log-timestamp">Ayer, 02:46 PM</span>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'location'" class="location-tab-content">
            <div class="map-section">
              <h3>Mapa de Ubicación</h3>
              <div class="map-placeholder">
                <i class="icon-map"></i> Mapa interactivo mostraría aquí la ubicación exacta
              </div>
              <div class="location-details">
                <div class="info-item"><span>Dirección:</span><span>Calle Principal #123, Manzana 5</span></div>
                <div class="info-item"><span>Coordenadas:</span><span>12.3456° N, 45.6789° W</span></div>
                <div class="info-item"><span>Sector:</span><span>Sector Norte</span></div>
                <div class="info-item"><span>Gateway más cercano:</span><span>GTW-0012-45 (1.2 km)</span></div>
              </div>
            </div>
            <div class="nearby-devices-section">
              <h3>Dispositivos Cercanos</h3>
              <div class="nearby-device-item">
                <span>Válvula #VLV-1254-87</span>
                <span>150 m</span>
                <span class="status-indicator unstable-status">En revisión</span>
              </div>
              <div class="nearby-device-item">
                <span>Medidor #WTR-4587-24</span>
                <span>320 m</span>
                <span class="status-indicator active-status">Activo</span>
              </div>
              <div class="nearby-device-item">
                <span>Sensor de Presión #PRS-0045-12</span>
                <span>450 m</span>
                <span class="status-indicator active-status">Activo</span>
              </div>
            </div>
            <div class="zone-statistics">
              <h3>Estadísticas de Zona</h3>
              <div class="info-item"><span>Dispositivos en sector:</span><span>148</span></div>
              <div class="info-item"><span>Activos:</span><span>142 (95.9%)</span></div>
              <div class="info-item"><span>Con alertas:</span><span>6</span></div>
              <div class="info-item"><span>Consumo promedio:</span><span>1,240 m³/día</span></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('details'); // Pestaña activa por defecto
</script>

<style scoped>
/* Disposición General */
.device-management-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  color: #333;
}

/* Encabezado */
.header {
  background-color: #6a0dad; /* Púrpura */
  color: white;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
}

.header-title {
  font-size: 24px;
  font-weight: bold;
  margin-right: 15px;
}

.lorawan-logo {
  height: 30px; /* Ajustar según sea necesario */
  vertical-align: middle;
}

.header-right .header-button {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s ease;
}

.header-right .header-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.header-right .header-button.primary {
  background-color: #fff;
  color: #6a0dad;
}

.header-right .header-button.primary:hover {
  background-color: #f0f0f0;
}

/* Área de Contenido */
.content-area {
  display: flex;
  flex: 1;
  padding: 20px;
  gap: 20px;
}

/* Barra Lateral */
.sidebar {
  width: 300px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 18px;
}

.sidebar-header .device-count {
  background-color: #6a0dad;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
}

.sidebar-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-select {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
}

.search-box {
  display: flex;
  flex: 2;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.search-box input {
  border: none;
  padding: 8px;
  flex: 1;
  outline: none;
}

.search-box button {
  background-color: #f8f8f8;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
}

.device-list .device-item {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #eee;
  cursor: pointer;
  transition: all 0.2s ease;
}

.device-list .device-item:hover {
  background-color: #f0f0f0;
}

.device-list .device-item.active {
  background-color: #e0f7fa; /* Azul claro */
  border-color: #00bcd4; /* Cian */
  box-shadow: 0 0 5px rgba(0, 188, 212, 0.3);
}

.device-info {
  margin-bottom: 5px;
}

.device-info .device-name {
  font-weight: bold;
  display: block;
  margin-bottom: 3px;
}

.device-info .device-sn {
  font-size: 12px;
  color: #666;
}

.device-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.status-indicator {
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
  display: inline-block;
  margin-left: 5px;
}

.active-status {
  background-color: #e8f5e9; /* Verde claro */
  color: #4caf50; /* Verde */
}

.unstable-status {
  background-color: #fffde7; /* Amarillo claro */
  color: #ffc107; /* Ámbar */
}

.inactive-status {
  background-color: #ffebee; /* Rojo claro */
  color: #f44336; /* Rojo */
}

.monitoring-status {
  font-size: 11px;
  color: #999;
  margin-top: 5px;
}

.monitoring-status.replaced {
  background-color: #e3f2fd;
  color: #2196f3;
  padding: 2px 6px;
  border-radius: 5px;
  display: inline-block;
}

/* Contenido Principal */
.main-content {
  flex: 1;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
}

.device-header-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.device-name-main {
  font-size: 22px;
  margin: 0;
}

.device-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-indicator.connected {
  background-color: #e8f5e9;
  color: #4caf50;
  padding: 5px 10px;
  border-radius: 20px;
}

.action-button {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: #e0e0e0;
}

.action-button.edit-button {
  color: #3f51b5; /* Índigo */
}

.action-button.delete-button {
  background-color: #f44336; /* Rojo */
  color: white;
  border-color: #f44336;
}

.action-button.delete-button:hover {
  background-color: #d32f2f;
}

/* Navegación por Pestañas */
.tab-navigation {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.tab-button {
  background-color: transparent;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  position: relative;
  transition: color 0.3s ease;
}

.tab-button.active {
  color: #6a0dad;
  font-weight: bold;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #6a0dad;
  border-radius: 2px 2px 0 0;
}

.tab-button:hover:not(.active) {
  color: #333;
}

/* Contenido de las Pestañas */
.tab-content {
  padding-top: 10px;
}

/* Pestaña de Detalles */
.info-section {
  margin-bottom: 30px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  background-color: #fcfcfc;
}

.info-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #6a0dad;
  font-size: 18px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px 25px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
}

.info-item span:first-child {
  font-weight: bold;
  color: #555;
  min-width: 120px; /* Alinear etiquetas */
}

.status-button, .firmware-update-button, .view-params-button {
  background-color: #e0e0e0;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  margin-left: 10px;
  transition: background-color 0.2s ease;
}

.firmware-update-button {
  background-color: #ffeb3b; /* Ámbar */
  color: #333;
}

.firmware-update-button:hover {
  background-color: #fdd835;
}

.view-params-button {
  background-color: #2196f3; /* Azul */
  color: white;
}

.view-params-button:hover {
  background-color: #1976d2;
}


/* Pestaña de Mantenimiento */
.maintenance-history {
  margin-bottom: 30px;
  position: relative;
}

.maintenance-history h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #6a0dad;
  font-size: 18px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.register-maintenance-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  position: absolute;
  right: 0;
  top: 0;
}

.register-maintenance-button:hover {
  background-color: #43a047;
}

.maintenance-item {
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  position: relative;
}

.maintenance-item h4 {
  margin-top: 0;
  margin-bottom: 5px;
  color: #333;
  font-size: 16px;
}

.maintenance-item p {
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

.maintenance-meta {
  font-size: 12px;
  color: #777;
}

.maintenance-date {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 13px;
  color: #888;
}

.upcoming-maintenance {
  background-color: #fff3e0; /* Naranja claro */
  border: 1px solid #ff9800; /* Naranja */
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.warning-message {
  color: #ff9800;
  font-weight: bold;
  margin: 0;
}

/* Pestaña de Registros (Logs) */
.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.log-header h3 {
  margin: 0;
  color: #6a0dad;
  font-size: 18px;
}

.log-filter-select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
}

.log-entries {
  max-height: 400px; /* Ejemplo de altura fija para el scroll */
  overflow-y: auto;
  padding-right: 10px; /* Para la barra de desplazamiento */
}

.log-item {
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  position: relative;
}

.log-item.alert {
  background-color: #ffebee; /* Rojo claro para alertas */
  border-color: #f44336; /* Rojo */
}

.log-item h4 {
  margin-top: 0;
  margin-bottom: 5px;
  color: #333;
  font-size: 16px;
}

.log-item p {
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

.log-meta {
  font-size: 12px;
  color: #777;
}

.log-timestamp {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 13px;
  color: #888;
}

/* Pestaña de Ubicación */
.map-section {
  margin-bottom: 30px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  background-color: #fcfcfc;
}

.map-section h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #6a0dad;
  font-size: 18px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.map-placeholder {
  background-color: #e0e0e0;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 14px;
}

.map-placeholder i {
  font-size: 40px;
  margin-bottom: 10px;
}

.location-details .info-item {
  margin-bottom: 8px;
}

.nearby-devices-section, .zone-statistics {
  margin-bottom: 30px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  background-color: #fcfcfc;
}

.nearby-devices-section h3, .zone-statistics h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #6a0dad;
  font-size: 18px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.nearby-device-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed #eee;
  font-size: 15px;
}

.nearby-device-item:last-child {
  border-bottom: none;
}

/* Iconos (Marcador de posición - deberías reemplazar con una fuente de iconos real/SVG) */
.icon-refresh::before { content: '↻'; }
.icon-plus::before { content: '+'; }
.icon-search::before { content: '🔍'; }
.icon-edit::before { content: '✎'; }
.icon-delete::before { content: '🗑'; }
.icon-warning::before { content: '⚠'; }
.icon-map::before { content: '🗺'; }

/* Ajustes básicos de responsividad si es necesario */
@media (max-width: 768px) {
  .content-area {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    margin-bottom: 20px;
  }
  .info-grid {
    grid-template-columns: 1fr;
  }
  .tab-navigation {
    flex-wrap: wrap;
  }
  .tab-button {
    flex-basis: 50%; /* Ejemplo para pantallas más pequeñas */
    margin-bottom: 5px;
  }
}
</style>