<template>
  <div class="personal-page-kanban">
    <h2>🧑‍🔧 Personal Técnico</h2>

    <div class="kanban-board">
      <!-- Columna Disponibles -->
      <div class="column">
        <h3>🟢 Disponibles ({{ disponiblesList.length }})</h3>
        <transition-group name="move" tag="div" class="column-list">
          <div
            v-for="p in disponiblesList"
            :key="p.id"
            class="card"
            @click="toggle(p.id)"
            title="Click para marcar en misión"
          >
            <i class="fas fa-user-check icon-available"></i>
            <div class="info">
              <span class="name">{{ p.name }}</span>
              <small>{{ formatDate(p.updated) }}</small>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Columna En misión -->
      <div class="column">
        <h3>🚀 En misión ({{ busyList.length }})</h3>
        <transition-group name="move" tag="div" class="column-list">
          <div
            v-for="p in busyList"
            :key="p.id"
            class="card busy"
            @click="toggle(p.id)"
            title="Click para marcar disponible"
          >
            <i class="fas fa-user-clock icon-busy"></i>
            <div class="info">
              <span class="name">{{ p.name }}</span>
              <small>{{ formatDate(p.updated) }}</small>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Datos iniciales
const personal = ref([
  { id: 1, name: 'Carlos Gutiérrez', status: 'Disponible', updated: new Date('2025-06-12T08:00:00') },
  { id: 2, name: 'Luisa Pérez',      status: 'En misión',   updated: new Date('2025-06-12T07:45:00') },
  { id: 3, name: 'Miguel Torres',    status: 'Disponible', updated: new Date('2025-06-12T07:30:00') }
])

// Formatea la fecha
function formatDate(d) {
  return new Intl.DateTimeFormat('es-ES', {
    year:   'numeric', month: '2-digit', day: '2-digit',
    hour:   '2-digit', minute: '2-digit'
  }).format(d)
}

// Alterna el estado y actualiza timestamp
function toggle(id) {
  const p = personal.value.find(x => x.id === id)
  if (!p) return
  p.status = p.status === 'Disponible' ? 'En misión' : 'Disponible'
  p.updated = new Date()
}

// Listas filtradas
const disponiblesList = computed(() =>
  personal.value.filter(x => x.status === 'Disponible')
)
const busyList = computed(() =>
  personal.value.filter(x => x.status === 'En misión')
)
</script>

<style scoped>
.personal-page-kanban {
  padding: 1.5rem;
  background: #f0f4f8;
  border-radius: 8px;
}
h2 {
  margin-bottom: 1rem;
  color: #333;
}

/* Contenedor Kanban */
.kanban-board {
  display: flex;
  gap: 1rem;
}

/* Cada columna */
.column {
  flex: 1;
  background: #fff;
  border-radius: 6px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.column h3 {
  margin-top: 0;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: #555;
}

/* Lista dentro de columna */
.column-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

/* Animación entrada/salida */
.move-enter-active,
.move-leave-active {
  transition: all 0.3s ease;
}
.move-enter-from,
.move-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Tarjeta */
.card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #fafafa;
  border-left: 4px solid #28a745;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.card.busy {
  border-left-color: #ffc107;
  background: #fff8e1;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.08);
}

/* Iconos */
.icon-available {
  color: #28a745;
  font-size: 1.5rem;
}
.icon-busy {
  color: #ffc107;
  font-size: 1.5rem;
}

/* Texto */
.info {
  display: flex;
  flex-direction: column;
}
.name {
  font-weight: 600;
  color: #333;
}
small {
  font-size: 0.8rem;
  color: #666;
}
</style>
