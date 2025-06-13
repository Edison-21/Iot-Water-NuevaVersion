<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Reportar Nuevo Incidente</h2>
        <button class="close-button" @click="$emit('close')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-row">
          <div class="form-group">
            <label for="title">Título del Incidente</label>
            <input type="text" id="title" placeholder="Describa brevemente el problema" />
          </div>
          <div class="form-group">
            <label for="category">Categoría</label>
            <select id="category">
              <option value="">Seleccionar categoría...</option>
              <option value="software">Software</option>
              <option value="hardware">Hardware</option>
              <option value="redes">Redes</option>
              <option value="seguridad">Seguridad</option>
              <option value="otros">Otros</option>
            </select>
          </div>
        </div>

        <div class="form-group full-width">
          <label for="description">Descripción Detallada</label>
          <textarea id="description" placeholder="Describa el problema con todos los detalles necesarios, incluyendo pasos para reproducirlo si es aplicable..."></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="priority">Prioridad</label>
            <select id="priority">
              <option value="">Seleccionar prioridad...</option>
              <option value="critico">Crítico</option>
              <option value="alto">Alto</option>
              <option value="medio">Medio</option>
              <option value="bajo">Bajo</option>
            </select>
          </div>
          <div class="form-group">
            <label for="department">Departamento Afectado</label>
            <select id="department">
              <option value="">Seleccionar departamento...</option>
              <option value="ti">TI</option>
              <option value="financiero">Financiero</option>
              <option value="administracion">Administración</option>
              <option value="ventas">Ventas</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
        </div>

        <div class="form-group full-width">
          <label>Adjuntar Evidencia (Opcional)</label>
          <div class="file-input-group">
            <button class="choose-file-button">Elegir archivos</button>
            <span class="no-file-selected">Sin archivos seleccionados</span>
          </div>
          <p class="file-tip">Puede adjuntar capturas de pantalla, logs o documentos relevantes</p>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input type="checkbox" checked /> Notificar inmediatamente al equipo técnico
          </label>
        </div>
      </div>
      <div class="modal-footer">
        <button class="cancel-button" @click="$emit('close')">Cancelar</button>
        <button class="report-button">Reportar Incidente</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// No se necesita lógica reactiva compleja aquí, solo emitir un evento al cerrar.
const emit = defineEmits(['close']);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 700px; /* Ajusta el ancho máximo según tu diseño */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.2em;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.8em;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
}

.close-button:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto; /* Permite el scroll si el contenido es largo */
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.form-group {
  flex: 1;
  margin-bottom: 10px;
}

.form-group.full-width {
  flex: none;
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 0.9em;
  color: #555;
}

.form-group input[type="text"],
.form-group select,
.form-group textarea {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9em;
  color: #333;
  outline: none;
  transition: border-color 0.2s;
}

.form-group input[type="text"]:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #007bff;
}

.form-group textarea {
  min-height: 80px;
  resize: vertical;
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
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-tip {
  font-size: 0.8em;
  color: #888;
  margin-top: 5px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  font-size: 0.9em;
  color: #555;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  margin-right: 8px;
  accent-color: #007bff;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  background-color: #f8f9fa;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-button:hover {
  background-color: #5a6268;
}

.report-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.report-button:hover {
  background-color: #0056b3;
}

/* Responsive adjustments for modal */
@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
    gap: 0; /* No gap between stacked items */
  }
  .form-group {
    margin-bottom: 15px; /* Add margin back if stacked */
  }
}
</style>