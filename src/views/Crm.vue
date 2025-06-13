<template>
  <div class="crm">
    <div class="crm-header">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-md-8">
            <h1 class="crm-title">CRM Inteligente <span class="whatsapp-brand"><i class="fab fa-whatsapp"></i> WhatsApp Business</span></h1>
            <p class="crm-subtitle">Centralice la atención al usuario con herramientas integradas</p>
          </div>
          <div class="col-md-4 text-end">
            <div class="text-white">
              <span id="current-time" class="me-3"></span>
              <span id="current-date"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <!-- Columna izquierda: Bandeja de entrada -->
        <div class="col-lg-4">
          <div class="card-crm">
            <div class="card-header-crm d-flex justify-content-between align-items-center">
              <span>Bandeja de Entrada</span>
              <span class="badge bg-primary">24 nuevos</span>
            </div>
            <div class="list-group list-group-flush">
              <div class="list-group-item inbox-item unread">
                <div class="d-flex justify-content-between">
                  <div class="d-flex align-items-center">
                    <div class="contact-avatar me-3">JL</div>
                    <div>
                      <h6 class="mb-1">Juan López</h6>
                      <p class="mb-0 text-muted message-preview">Hola, tengo un problema con mi factura...</p>
                    </div>
                  </div>
                  <div class="text-end">
                    <small class="text-muted">10:25 AM</small>
                    <div class="badge-status badge-new mt-1">Nuevo</div>
                  </div>
                </div>
              </div>
              <!-- Más items aquí -->
            </div>
          </div>
        </div>

        <!-- Columna central: Chat y detalles -->
        <div class="col-lg-5">
          <div class="card-crm">
            <div class="card-header-crm d-flex justify-content-between align-items-center">
              <div>
                <span class="me-2">Chat con: <strong>Juan López</strong></span>
                <span class="badge bg-secondary">Reclamo</span>
              </div>
              <div>
                <span class="badge bg-warning me-2">Tiempo: 12:45 min</span>
                <button class="btn btn-sm btn-success">Resolver</button>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="chat-container d-flex flex-column p-3" id="chatWindow">
                <!-- Mensajes aquí -->
              </div>
              <div class="p-3 border-top">
                <div class="input-group">
                  <textarea class="form-control" rows="2" placeholder="Escribe tu respuesta..."></textarea>
                  <button class="btn btn-primary" type="button">
                    <i class="fas fa-paper-plane"></i> Enviar
                  </button>
                </div>
                <div class="d-flex justify-content-between mt-2">
                  <div>
                    <button class="btn btn-sm btn-outline-secondary me-1">
                      <i class="fas fa-paperclip"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary me-1">
                      <i class="fas fa-tag"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary">
                      <i class="fas fa-robot"></i> IA
                    </button>
                  </div>
                  <div>
                    <button class="btn btn-sm btn-outline-danger me-1">
                      <i class="fas fa-arrow-up"></i> Escalar
                    </button>
                    <button class="btn btn-sm btn-success">
                      <i class="fas fa-check"></i> Resolver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna derecha: KPIs y estadísticas -->
        <div class="col-lg-3">
          <div class="card-crm">
            <div class="card-header-crm">KPIs de Atención</div>
            <div class="card-body">
              <div class="kpi-card">
                <div class="kpi-value">2.4 min</div>
                <div class="kpi-label">Tiempo promedio de respuesta</div>
                <div class="progress progress-thin mt-2">
                  <div class="progress-bar bg-success" style="width: 85%"></div>
                </div>
              </div>
              <!-- Más KPIs aquí -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Crm",
  mounted() {
    this.updateDateTime();
    setInterval(this.updateDateTime, 1000);
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      document.getElementById('current-time').textContent = now.toLocaleTimeString();
      document.getElementById('current-date').textContent = now.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    },
  },
};
</script>

<style scoped>
.crm-header {
  background: linear-gradient(135deg, #25D366, #075E54);
  color: white;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-crm {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  border: none;
}

.kpi-card {
  text-align: center;
  padding: 1.5rem;
}

.kpi-value {
  font-size: 2.5rem;
  font-weight: 700;
}

.kpi-label {
  font-size: 0.9rem;
  color: #6c757d;
}

.progress-thin {
  height: 8px;
}
</style>