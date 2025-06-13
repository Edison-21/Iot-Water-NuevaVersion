<template>
  <div class="bg-main">
    <div class="crm-container">
      <!-- Header -->
      <header class="crm-header d-flex justify-content-between align-items-center">
        <div>
          <h1 class="crm-title mb-0">
            CRM Inteligente
            <span class="whatsapp-brand ms-2">
              <i class="fab fa-whatsapp"></i> WhatsApp Business
            </span>
          </h1>
          <div class="crm-subtitle">Centralice la atención al usuario con herramientas integradas</div>
        </div>
        <div class="crm-date text-end">
          <div class="crm-time">{{ time }}</div>
          <div>{{ date }}</div>
        </div>
      </header>

      <!-- Main 3 columns -->
      <div class="row gx-3">
        <!-- Left: Inbox -->
        <div class="col-12 col-md-4 col-lg-3">
          <div class="crm-card mb-3">
            <div class="crm-card-header">Bandeja de Entrada</div>
            <div>
              <div
                v-for="(item, idx) in filteredInbox"
                :key="item.id"
                class="crm-inbox-item"
                :class="{ selected: selectedInbox === idx, unread: item.unread, pulse: item.pulse }"
                @click="selectInbox(idx)"
              >
                <div class="d-flex align-items-center">
                  <div class="crm-avatar me-3">{{ item.avatar }}</div>
                  <div class="flex-grow-1">
                    <div class="fw-semibold d-flex align-items-center">
                      {{ item.name }}
                      <span v-if="item.unread" class="crm-badge bg-blue ms-2">Nuevo</span>
                    </div>
                    <div class="crm-inbox-preview">{{ item.preview }}</div>
                  </div>
                  <div class="text-end ps-2">
                    <div class="crm-inbox-time">{{ item.time }}</div>
                    <span class="crm-badge" :class="item.statusClass">{{ item.status }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="crm-card">
            <div class="crm-card-header">Filtrar Conversaciones</div>
            <div class="crm-card-body">
              <label class="crm-label mb-1">Estado</label>
              <select class="crm-select mb-2" v-model="filtros.estado">
                <option>Todos</option>
                <option>Nuevo</option>
                <option>En proceso</option>
                <option>Escalado</option>
                <option>Resuelto</option>
              </select>

              <label class="crm-label mb-1">Etiquetas</label>
              <select class="crm-select mb-2" v-model="filtros.etiqueta">
                <option>Todas</option>
                <option>Facturación</option>
                <option>Reclamo</option>
                <option>Consulta</option>
                <option>Fugas</option>
              </select>

              <label class="crm-label mb-1">Buscar</label>
              <div class="input-group">
                <input type="text" class="crm-input" v-model="filtros.busqueda" placeholder="Buscar conversaciones..." />
              </div>
            </div>
          </div>
        </div>

        <!-- Center: Chat -->
        <div class="col-12 col-md-8 col-lg-6">
          <div class="crm-card mb-3">
            <div class="crm-card-header d-flex align-items-center">
              <span>
                Chat con: <span class="fw-bold">{{ chat.name }}</span>
                <span class="crm-badge bg-tag ms-2">{{ chat.tag }}</span>
                <span class="crm-badge bg-time ms-2">{{ chat.time }}</span>
              </span>
              <button class="crm-btn crm-btn-green ms-auto" @click="resolverCaso">Resolver</button>
            </div>
            <div class="crm-chat-window" ref="chatWindow">
              <div
                v-for="(msg, idx) in chat.messages"
                :key="idx"
                :class="['crm-chat-bubble', msg.in ? 'crm-in' : 'crm-out']"
              >
                <div v-if="msg.name" class="fw-semibold mb-1" :style="{ color: msg.in ? '#222' : '#218838' }">
                  {{ msg.name }}
                  <span v-if="msg.ia" class="crm-badge bg-ia ms-1">{{ msg.ia }}</span>
                </div>
                <div>{{ msg.text }}</div>
                <div class="crm-chat-time">{{ msg.time }}</div>
              </div>
            </div>
            <div class="d-flex flex-column flex-md-row align-items-center gap-2 p-3 border-top">
              <textarea class="crm-input flex-grow-1" rows="1" v-model="respuesta" placeholder="Escribe tu respuesta..." @keyup.enter="enviarMensaje"></textarea>
              <div class="d-flex gap-2 mt-2 mt-md-0">
                <button class="crm-btn crm-btn-gray" title="Adjuntar" @click="adjuntarArchivo"><i class="fas fa-paperclip"></i></button>
                <button class="crm-btn crm-btn-gray" title="Etiquetar" @click="etiquetarConversacion"><i class="fas fa-tag"></i></button>
                <button class="crm-btn crm-btn-gray" title="IA" @click="respuestaIA"><i class="fas fa-robot"></i> IA</button>
                <button class="crm-btn crm-btn-red" title="Escalar" @click="escalarCaso"><i class="fas fa-arrow-up"></i> Escalar</button>
                <button class="crm-btn crm-btn-green" title="Resolver" @click="resolverCaso"><i class="fas fa-check"></i> Resolver</button>
                <button class="crm-btn crm-btn-blue" title="Enviar" @click="enviarMensaje"><i class="fas fa-paper-plane"></i> Enviar</button>
              </div>
            </div>
          </div>
          <div class="crm-card">
            <div class="crm-card-header">Detalles del Caso</div>
            <div class="crm-card-body row">
              <div class="col-12 col-md-6 mb-2 mb-md-0">
                <div class="fw-semibold mb-2">Información del Cliente</div>
                <div>Nombre: <b>{{ chat.name }}</b></div>
                <div>ID Cliente: <b>458792</b></div>
                <div>Plan: <b>Residencial Plus</b></div>
                <div>Zona: <b>Sector Norte</b></div>
              </div>
              <div class="col-12 col-md-6">
                <div class="fw-semibold mb-2">Historial Reciente</div>
                <div><i class="fas fa-check-circle text-success me-1"></i> Consulta facturación - Resuelto (15/05)</div>
                <div><i class="fas fa-check-circle text-success me-1"></i> Cambio de titular - Resuelto (02/04)</div>
                <div><i class="fas fa-exclamation-triangle text-warning me-1"></i> Reclamo por fuga - Escalado (12/03)</div>
              </div>
              <div class="col-12 mt-3">
                <div class="fw-semibold mb-1">Notas Internas</div>
                <textarea class="crm-input w-100" rows="2" v-model="notasInternas"></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: KPIs -->
        <div class="col-12 col-lg-3 mt-3 mt-lg-0">
          <div class="crm-card mb-3">
            <div class="crm-card-header">KPIs de Atención</div>
            <div class="crm-kpi-block">
              <div class="crm-kpi-value main">2.4 min</div>
              <div class="crm-kpi-label">Tiempo promedio de respuesta</div>
              <div class="crm-kpi-bar">
                <div class="crm-kpi-bar-fill bg-green" style="width: 85%"></div>
              </div>
              <div class="crm-kpi-meta">Meta: &lt;2 min</div>
              <div class="crm-kpi-value">78%</div>
              <div class="crm-kpi-label">Casos resueltos en primera respuesta</div>
              <div class="crm-kpi-bar">
                <div class="crm-kpi-bar-fill bg-blue" style="width: 78%"></div>
              </div>
              <div class="crm-kpi-value crm-kpi-nps">62</div>
              <div class="crm-kpi-label">Net Promoter Score (NPS)</div>
              <div class="crm-kpi-bar">
                <div class="crm-kpi-bar-fill bg-yellow" style="width: 62%"></div>
              </div>
              <div class="crm-kpi-meta">Promedio industria: 45</div>
              <div class="crm-kpi-value">94%</div>
              <div class="crm-kpi-label">Satisfacción del cliente</div>
              <div class="crm-kpi-bar">
                <div class="crm-kpi-bar-fill bg-green" style="width: 94%"></div>
              </div>
            </div>
          </div>
          <div class="crm-card mb-3">
            <div class="crm-card-header">Estadísticas de Chatbot</div>
            <div class="crm-card-body">
              <div class="mb-2">
                <div class="fw-semibold mb-1">Resolución Automática</div>
                <div class="d-flex justify-content-between"><span>68% de consultas</span><span>1,240/mes</span></div>
                <div class="crm-kpi-bar">
                  <div class="crm-kpi-bar-fill bg-green" style="width:68%"></div>
                </div>
              </div>
              <div class="mb-2">
                <div class="fw-semibold mb-1">Precisión de Respuestas</div>
                <div class="d-flex justify-content-between"><span>92% de aciertos</span><span>+3% vs mes anterior</span></div>
                <div class="crm-kpi-bar">
                  <div class="crm-kpi-bar-fill bg-green" style="width:92%"></div>
                </div>
              </div>
              <div>
                <div class="fw-semibold mb-1">Temas más Consultados</div>
                <div>Facturación <span class="float-end">42%</span></div>
                <div class="crm-kpi-bar"><div class="crm-kpi-bar-fill bg-blue" style="width:42%"></div></div>
                <div>Cortes programados <span class="float-end">23%</span></div>
                <div class="crm-kpi-bar"><div class="crm-kpi-bar-fill bg-cyan" style="width:23%"></div></div>
                <div>Fugas reportadas <span class="float-end">18%</span></div>
                <div class="crm-kpi-bar"><div class="crm-kpi-bar-fill bg-yellow" style="width:18%"></div></div>
              </div>
            </div>
          </div>
          <div class="crm-card">
            <div class="crm-card-header">Etiquetas y Categorías</div>
            <div class="crm-card-body">
              <span class="crm-badge bg-blue me-1 mb-1">Facturación</span>
              <span class="crm-badge bg-blue me-1 mb-1">Reclamo</span>
              <span class="crm-badge bg-blue me-1 mb-1">Consulta</span>
              <span class="crm-badge bg-blue me-1 mb-1">Fugas</span>
              <span class="crm-badge bg-blue me-1 mb-1">Corte</span>
              <span class="crm-badge bg-blue me-1 mb-1">Pago</span>
              <span class="crm-badge bg-blue me-1 mb-1">Medidor</span>
              <span class="crm-badge bg-blue me-1 mb-1">Técnico</span>
            </div>
          </div>
        </div>
      </div>
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
const selectedInbox = ref(0)
const respuesta = ref('')
const notasInternas = ref('Cliente con posible fuga no detectada. Solicitar revisión técnica.')
const filtros = ref({
  estado: 'Nuevo',
  etiqueta: 'Reclamo',
  busqueda: ''
})
const inbox = ref([
  {
    id: 1,
    avatar: 'JL',
    name: 'Juan López',
    preview: 'Hola, tengo un problema con mi factura...',
    time: '10:25 AM',
    status: 'Nuevo',
    statusClass: 'bg-blue',
    tag: 'Reclamo',
    unread: true,
    pulse: true,
    messages: [
      {
        in: true,
        name: 'Juan López',
        time: '10:25 AM',
        text: 'Hola, tengo un problema con mi factura. Me llegó un monto mucho más alto de lo normal y no entiendo por qué.'
      },
      {
        in: true,
        name: 'Chatbot IA',
        ia: 'Automatizado',
        time: '10:26 AM',
        text: 'Hola Juan, gracias por contactarnos. He detectado que tu consulta es sobre facturación. ¿Podrías confirmarme tu número de cliente para ayudarte mejor?'
      },
      {
        in: true,
        name: null,
        time: '10:27 AM',
        text: 'Mi número de cliente es 458792'
      },
      {
        in: false,
        name: 'Agente: Tú',
        time: '10:30 AM',
        text: 'Gracias Juan. Revisando tu historial veo que hubo un consumo inusual el mes pasado. ¿Hubo algún cambio en tu uso de agua?'
      },
      {
        in: true,
        name: null,
        time: '10:32 AM',
        text: 'No, todo normal. Incluso estuvimos 10 días fuera de casa de vacaciones.'
      },
      {
        in: false,
        name: 'Agente: Tú',
        time: '10:35 AM',
        text: 'Entiendo. Voy a escalar este caso al área técnica para verificar posible fuga. Mientras tanto, ¿te gustaría que generemos una factura provisional con tu consumo promedio?'
      },
      {
        in: true,
        name: null,
        time: '10:39 AM',
        text: 'Sí, por favor. La factura provisional me ayudaría mucho.'
      }
    ]
  },
  {
    id: 2,
    avatar: 'MP',
    name: 'María Pérez',
    preview: 'El chatbot no resolvió mi consulta sobre...',
    time: '09:42 AM',
    status: 'En proceso',
    statusClass: 'bg-yellow',
    tag: 'Consulta',
    unread: false,
    pulse: false,
    messages: [
      {
        in: true,
        name: 'María Pérez',
        time: '09:42 AM',
        text: 'El chatbot no resolvió mi consulta sobre cambio de titularidad.'
      }
    ]
  },
  {
    id: 3,
    avatar: 'RA',
    name: 'Roberto Álvarez',
    preview: 'Reclamo formal por corte de servicio...',
    time: 'Ayer',
    status: 'Escalado',
    statusClass: 'bg-red',
    tag: 'Reclamo',
    unread: false,
    pulse: false,
    messages: [
      {
        in: true,
        name: 'Roberto Álvarez',
        time: 'Ayer',
        text: 'Reclamo formal por corte de servicio sin aviso.'
      }
    ]
  },
  {
    id: 4,
    avatar: 'CS',
    name: 'Carlos Sánchez',
    preview: 'Gracias por resolver mi problema!',
    time: 'Ayer',
    status: 'Resuelto',
    statusClass: 'bg-green',
    tag: 'Felicitación',
    unread: false,
    pulse: false,
    messages: [
      {
        in: true,
        name: 'Carlos Sánchez',
        time: 'Ayer',
        text: 'Gracias por resolver mi problema!'
      }
    ]
  },
  {
    id: 5,
    avatar: 'AG',
    name: 'Ana González',
    preview: 'Consulta sobre fechas de pago...',
    time: 'Hoy',
    status: 'Nuevo',
    statusClass: 'bg-blue',
    tag: 'Consulta',
    unread: true,
    pulse: false,
    messages: [
      {
        in: true,
        name: 'Ana González',
        time: 'Hoy',
        text: 'Consulta sobre fechas de pago...'
      }
    ]
  }
])

const filteredInbox = computed(() => {
  let result = inbox.value
  if (filtros.value.estado && filtros.value.estado !== "Todos") {
    result = result.filter(i => i.status === filtros.value.estado)
  }
  if (filtros.value.etiqueta && filtros.value.etiqueta !== "Todas") {
    result = result.filter(i => i.tag === filtros.value.etiqueta)
  }
  if (filtros.value.busqueda) {
    const busq = filtros.value.busqueda.toLowerCase()
    result = result.filter(i => i.name.toLowerCase().includes(busq) || i.preview.toLowerCase().includes(busq))
  }
  return result
})

const chat = computed(() => {
  // Mapea el inbox filtrado y fallback al inbox global si el filtro reduce a cero
  const realList = filteredInbox.value.length ? filteredInbox.value : inbox.value
  return realList[selectedInbox.value] || inbox.value[0]
})

function updateDateTime() {
  const now = new Date()
  time.value = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  date.value = now.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function selectInbox(idx) {
  selectedInbox.value = idx
  // Marcar como leído y quitar animación de "nuevo"
  const realList = filteredInbox.value.length ? filteredInbox.value : inbox.value
  if (realList[idx]) {
    realList[idx].unread = false
    realList[idx].pulse = false
  }
  nextTick(scrollChatToBottom)
}

function enviarMensaje() {
  if (!respuesta.value.trim()) return
  const now = new Date()
  const hora = now.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
  chat.value.messages.push({
    in: false,
    name: 'Agente: Tú',
    time: hora,
    text: respuesta.value
  })
  chat.value.preview = respuesta.value
  chat.value.time = hora
  respuesta.value = ''
  nextTick(scrollChatToBottom)
}

function scrollChatToBottom() {
  const el = document.querySelector('.crm-chat-window')
  if (el) el.scrollTop = el.scrollHeight
}

// Simular mensaje nuevo automático en la última conversación
setInterval(() => {
  const idx = inbox.value.findIndex(i => i.id === 5) // Ana González
  const conv = inbox.value[idx]
  if (conv) {
    const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    conv.messages.push({
      in: true,
      name: 'Ana González',
      time: hora,
      text: '¿Podrían confirmarme la fecha del próximo pago?'
    })
    conv.preview = '¿Podrían confirmarme la fecha del próximo pago?'
    conv.time = hora
    if (selectedInbox.value !== idx) {
      conv.unread = true
      conv.pulse = true
    }
  }
}, 20000)

// Acciones simuladas para los botones
function adjuntarArchivo() {
  alert("Funcionalidad de adjuntar archivo (demo).")
}
function etiquetarConversacion() {
  alert("Funcionalidad de etiquetar conversación (demo).")
}
function respuestaIA() {
  respuesta.value = "Esta es una respuesta sugerida automáticamente por IA."
}
function escalarCaso() {
  alert("El caso ha sido escalado a soporte técnico.")
}
function resolverCaso() {
  alert("El caso ha sido marcado como resuelto.")
}

onMounted(() => {
  updateDateTime()
  setInterval(updateDateTime, 1000)
  nextTick(scrollChatToBottom)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.bg-main {
  background: #f5f7fa;
  min-height: 100vh;
}
.crm-container {
  max-width: 1250px;
  margin: 32px auto 0;
  padding: 0 12px;
}
.crm-header {
  background: #169c84;
  color: #fff;
  border-radius: 9px 9px 10px 10px;
  padding: 30px 36px 18px 36px;
  margin-bottom: 24px;
  box-shadow: 0 2px 9px rgba(0,0,0,0.07);
}
.crm-title {
  font-size: 2.3rem;
  font-weight: bold;
  letter-spacing: -1px;
}
.crm-subtitle {
  font-size: 1.13rem;
  font-weight: 400;
  opacity: 0.93;
  margin-top: 4px;
}
.whatsapp-brand {
  background: #25d366;
  color: #fff;
  border-radius: 14px;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 2px 16px;
  display: inline-flex;
  align-items: center;
}
.crm-date {
  font-size: 1.03rem;
}
.crm-time {
  font-size: 1.09rem;
  font-weight: 500;
}
.crm-card {
  background: #fff;
  border-radius: 10px;
  padding: 0;
  box-shadow: 0 2px 8px rgba(52, 73, 94, 0.06);
  margin-bottom: 18px;
  border: 1px solid #e7e8eb;
}
.crm-card-header {
  font-weight: 500;
  font-size: 1.08rem;
  background: #fff;
  border-bottom: 1px solid #f0f1f2;
  padding: 14px 18px;
  border-radius: 10px 10px 0 0;
}
.crm-card-body {
  padding: 18px;
}
.crm-inbox-item {
  padding: 17px 18px;
  border-bottom: 1px solid #f0f1f2;
  cursor: pointer;
  background: #fff;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  position: relative;
}
.crm-inbox-item.selected,
.crm-inbox-item:hover {
  background: #e7f3fb;
}
.crm-inbox-item.unread {
  background: #e5f1fa;
  font-weight: 600;
}
.crm-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #e0e1e7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #4a4a4a;
  font-size: 1.15rem;
}
.crm-inbox-preview {
  font-size: 0.97rem;
  color: #646b74;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}
.crm-inbox-time {
  font-size: 0.97rem;
  color: #9ca3af;
  margin-bottom: 4px;
}
.crm-badge {
  display: inline-block;
  font-size: 0.9em;
  font-weight: 600;
  border-radius: 7px;
  padding: 1px 11px;
  margin-top: 4px;
  color: #fff;
  vertical-align: middle;
}
.bg-blue { background: #2094e9; }
.bg-green { background: #28b35c; }
.bg-yellow { background: #f39c12; }
.bg-red { background: #e74c3c; }
.bg-tag { background: #b8b8b8 !important; color: #fff; }
.bg-time { background: #ffeea2 !important; color: #555; }
.bg-ia { background: #858585 !important; color: #fff; font-size: .8em; padding: 1.5px 7px;}
.bg-cyan { background: #1bc6d4; }
.crm-select, .crm-input {
  width: 100%;
  padding: 7px 10px;
  border-radius: 7px;
  border: 1px solid #e1e2ea;
  background: #f7f8fb;
  margin-bottom: 8px;
  font-size: 1.03rem;
  color: #353535;
}
.crm-label {
  font-size: .98rem; color: #666; font-weight: 500;
}
.crm-chat-window {
  background: #f5f5f5;
  height: 350px;
  overflow-y: auto;
  padding: 19px 22px 12px 22px;
  border-bottom: 1px solid #f0f1f2;
  display: flex;
  flex-direction: column;
}
.crm-chat-bubble {
  max-width: 75%;
  margin-bottom: 13px;
  padding: 11px 17px;
  border-radius: 14px;
  font-size: 1.04rem;
  background: #fff;
  align-self: flex-start;
  box-shadow: 0 1px 3px rgba(27, 55, 81, 0.02);
  position: relative;
}
.crm-chat-time {
  font-size: .81rem;
  color: #a5a5a7;
  margin-top: 2px;
}
.crm-chat-bubble.crm-in {
  background: #fff;
  border-top-left-radius: 0;
}
.crm-chat-bubble.crm-out {
  background: #daf6e4;
  border-top-right-radius: 0;
  align-self: flex-end;
}
.crm-btn {
  border: none;
  border-radius: 7px;
  padding: 7px 14px;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  transition: background 0.14s;
  box-shadow: none;
}
.crm-btn-blue { background: #2094e9; color: #fff; }
.crm-btn-green { background: #28b35c; color: #fff; }
.crm-btn-red { background: #e74c3c; color: #fff; }
.crm-btn-gray { background: #e5e6ea; color: #444; }
.crm-btn:active { filter: brightness(92%); }
.crm-kpi-block {
  padding: 22px 20px 12px 20px;
}
.crm-kpi-value {
  font-size: 2.0rem;
  font-weight: 700;
  color: #28b35c;
}
.crm-kpi-value.main {
  font-size: 2.2rem;
}
.crm-kpi-nps { color: #e8b20d;}
.crm-kpi-label { font-size: 1.03rem; color: #7a8090; margin-bottom: 5px;}
.crm-kpi-meta { font-size: .97rem; color: #8d979c; margin-bottom: 15px;}
.crm-kpi-bar {
  width: 100%;
  height: 6px;
  border-radius: 5px;
  background: #e4e8ef;
  margin-bottom: 7px;
  overflow: hidden;
}
.crm-kpi-bar-fill {
  height: 100%;
  border-radius: 5px;
}
.bg-green { background: #28b35c; }
.bg-blue { background: #2094e9; }
.bg-yellow { background: #f8c72f; }
.bg-cyan { background: #1bc6d4; }

/* Pulse Animation for new/unread items */
.pulse {
  animation: pulse 1.6s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 #2094e922; }
  70% { box-shadow: 0 0 0 8px #2094e91a; }
  100% { box-shadow: 0 0 0 0 #2094e900; }
}

@media (max-width: 900px) {
  .crm-container { max-width: 99vw; }
  .crm-header { padding: 15px 8px; }
}
@media (max-width: 700px) {
  .crm-header { border-radius: 0; }
  .crm-container { padding: 0 2px; }
}
</style>