<template>
  <div class="denuncias-page">
    <h2>🚨 Denuncias</h2>

    <!-- Formulario -->
    <div class="form-denuncia">
      <input
        v-model="nueva"
        @keyup.enter="enviar"
        placeholder="Describe tu denuncia..."
      />
      <button @click="enviar">Enviar</button>
    </div>

    <!-- Lista con animación -->
    <transition-group name="fade" tag="ul" class="lista-denuncias">
      <li v-for="d in denuncias" :key="d.id" class="denuncia-card">
        <div class="denuncia-text">
          <i class="fas fa-exclamation-circle text-danger"></i>
          {{ d.text }}
        </div>
        <div class="denuncia-fecha">
          {{ formatDate(d.date) }}
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Formatear fecha en español dd/mm/aaaa HH:MM
function formatDate(d) {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(d);
}

// Estado: dos denuncias iniciales con fecha
const denuncias = ref([
  { id: 1, text: "Fuga de agua", date: new Date("2025-06-01T10:15:00") },
  { id: 2, text: "Consumo de agua exagerado", date: new Date("2025-06-05T14:30:00") }
]);

const nueva = ref("");

function enviar() {
  const texto = nueva.value.trim();
  if (!texto) return;
  denuncias.value.unshift({
    id: Date.now(),        // ID único
    text: texto,
    date: new Date()
  });
  nueva.value = "";
}
</script>

<style scoped>
.denuncias-page {
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
}

/* Formulario */
.form-denuncia {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.form-denuncia input {
  flex: 1;
  padding: 0.6rem;
  border: 2px solid #e63946;
  border-radius: 4px;
  transition: border-color 0.2s;
}
.form-denuncia input:focus {
  border-color: #d62828;
  outline: none;
  box-shadow: 0 0 5px rgba(214, 40, 40, 0.4);
}
.form-denuncia button {
  background: #e63946;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}
.form-denuncia button:hover {
  background: #d62828;
}
.form-denuncia button:active {
  transform: scale(0.98);
}

/* Lista animada */
.lista-denuncias {
  list-style: none;
  padding: 0;
  margin: 0;
}
.denuncia-card {
  background: #ffe8e8;
  border-left: 4px solid #e63946;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.denuncia-text {
  font-weight: 500;
}
.denuncia-fecha {
  font-size: 0.85rem;
  color: #555;
}

/* Transición de entrada/salida */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
