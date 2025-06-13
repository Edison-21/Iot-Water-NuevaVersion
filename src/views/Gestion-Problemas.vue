<template>
  <div class="gestion-page">
    <h2>🛠 Gestión de Problemas Técnicos</h2>

    <!-- Formulario -->
    <div class="form-problema">
      <input
        v-model="nuevo"
        @keyup.enter="agregar"
        placeholder="Describe el problema técnico..."
      />
      <button @click="agregar">Reportar</button>
    </div>

    <!-- Filtros -->
    <div class="filtros">
      <button
        v-for="f in filtros"
        :key="f"
        :class="{ active: filtro === f }"
        @click="filtro = f"
      >{{ f }}</button>
    </div>

    <!-- Conteos -->
    <div class="contadores">
      <span class="badge badge-pending">Pendientes: {{ pendientes }}</span>
      <span class="badge badge-solved">Solucionados: {{ solucionados }}</span>
    </div>

    <!-- Grid de tarjetas -->
    <div class="problemas-grid">
      <div
        v-for="p in filteredProblemas"
        :key="p.id"
        class="card"
        :class="{ solved: p.solved }"
      >
        <div class="card-header">
          <i
            :class="[
              'fas',
              p.solved ? 'fa-check-circle text-success' : 'fa-exclamation-triangle text-warning'
            ]"
          ></i>
          <span class="status">
            {{ p.solved ? 'Solucionado' : 'Pendiente' }}
          </span>
        </div>
        <div class="card-body">
          {{ p.text }}
        </div>
        <div class="card-footer">
          <small>{{ formatDate(p.date) }}</small>
          <button class="toggle" @click="toggleStatus(p.id)">
            {{ p.solved ? 'Marcar Pendiente' : 'Marcar Solucionado' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Estado inicial con dos ejemplos
const problemas = ref([
  { id: 1, text: "Sensor 3 sin respuesta",       date: new Date("2025-06-10T10:00:00"), solved: false },
  { id: 2, text: "Anomalía detectada en caudal", date: new Date("2025-06-11T16:45:00"), solved: true  }
]);

const nuevo = ref("");
const filtro = ref("Todos");
const filtros = ["Todos", "Pendientes", "Solucionados"];

// Formatea fecha en español
function formatDate(d) {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit"
  }).format(d);
}

// Agrega un nuevo problema (siempre pendiente)
function agregar() {
  const t = nuevo.value.trim();
  if (!t) return;
  problemas.value.unshift({
    id: Date.now(),
    text: t,
    date: new Date(),
    solved: false
  });
  nuevo.value = "";
}

// Alterna estado
function toggleStatus(id) {
  const p = problemas.value.find(x => x.id === id);
  if (p) p.solved = !p.solved;
}

// Filtrado según pestaña
const filteredProblemas = computed(() => {
  if (filtro.value === "Pendientes")
    return problemas.value.filter(x => !x.solved);
  if (filtro.value === "Solucionados")
    return problemas.value.filter(x => x.solved);
  return problemas.value;
});

// Conteos
const solucionados = computed(() =>
  problemas.value.filter(x => x.solved).length
);
const pendientes = computed(() =>
  problemas.value.filter(x => !x.solved).length
);
</script>

<style scoped>
.gestion-page {
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
}

/* Formulario */
.form-problema {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.form-problema input {
  flex: 1;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form-problema button {
  background: #0275d8;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
}
.form-problema button:hover {
  background: #025aa5;
}

/* Pestañas de filtro */
.filtros {
  margin-bottom: 0.75rem;
}
.filtros button {
  background: transparent;
  border: 1px solid #ccc;
  padding: 0.3rem 0.75rem;
  margin-right: 0.5rem;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.filtros button.active {
  background: #0275d8;
  border-color: #0275d8;
  color: white;
}
.filtros button:hover {
  border-color: #0275d8;
}

/* Contadores */
.contadores {
  margin-bottom: 1rem;
}
.badge {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  margin-right: 0.5rem;
  font-size: 0.9rem;
}
.badge-pending {
  background: #fff3cd;
  color: #856404;
}
.badge-solved {
  background: #d4edda;
  color: #155724;
}

/* Grid de tarjetas */
.problemas-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
.card {
  background: white;
  border-left: 4px solid #ffc107;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
.card.solved {
  border-left-color: #28a745;
  opacity: 0.85;
}
.card-header {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.status {
  font-weight: 600;
}
.card-body {
  padding: 1rem;
  flex: 1;
}
.card-footer {
  padding: 0.75rem 1rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.toggle {
  background: transparent;
  border: none;
  color: #0275d8;
  cursor: pointer;
  font-size: 0.85rem;
}
.toggle:hover {
  text-decoration: underline;
}
</style>
