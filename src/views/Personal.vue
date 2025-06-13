<template>
  <div class="employee-management-system">
    <!-- Header -->
    <div class="container-fluid py-4">
      <div class="row mb-4">
        <div class="col-md-6">
          <h2 class="mb-0"><i class="fas fa-users-cog me-2"></i>Gestión de Personal</h2>
          <p class="text-muted mb-0">Control de todos los perfiles internos</p>
        </div>
        <div class="col-md-6 d-flex align-items-center justify-content-end">
          <button class="btn btn-primary me-2" @click="showNewEmployeeModal = true">
            <i class="fas fa-user-plus me-1"></i> Nuevo Empleado
          </button>
          <button class="btn btn-outline-secondary">
            <i class="fas fa-cog me-1"></i> Configuración
          </button>
        </div>
      </div>

      <div class="row">
        <!-- Listado de personal -->
        <div class="col-lg-4">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Equipo</h5>
              <div class="search-box">
                <i class="fas fa-search"></i>
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Buscar personal..." 
                  v-model="searchQuery"
                  @input="filterEmployees"
                >
              </div>
            </div>
            <div class="card-body">
              <ul class="nav nav-tabs mb-3" id="teamTabs" role="tablist">
                <li class="nav-item" role="presentation">
                  <button 
                    class="nav-link" 
                    :class="{active: activeTab === 'all'}"
                    @click="setActiveTab('all')"
                  >
                    Todos
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button 
                    class="nav-link" 
                    :class="{active: activeTab === 'technical'}"
                    @click="setActiveTab('technical')"
                  >
                    Técnico
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button 
                    class="nav-link" 
                    :class="{active: activeTab === 'admin'}"
                    @click="setActiveTab('admin')"
                  >
                    Administrativo
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button 
                    class="nav-link" 
                    :class="{active: activeTab === 'service'}"
                    @click="setActiveTab('service')"
                  >
                    Atención al Cliente
                  </button>
                </li>
              </ul>
              
              <div class="employee-list">
                <div 
                  v-for="employee in filteredEmployees" 
                  :key="employee.id"
                  class="card team-card mb-3"
                  :class="{
                    'technical': employee.role === 'technical',
                    'admin': employee.role === 'admin',
                    'service': employee.role === 'service',
                    'border-primary': selectedEmployee?.id === employee.id
                  }"
                  @click="selectEmployee(employee)"
                >
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <img :src="employee.photo" class="user-avatar me-3">
                      <div>
                        <h5 class="mb-1">{{ employee.name }}</h5>
                        <span 
                          class="role-badge me-2"
                          :class="{
                            'role-technical': employee.role === 'technical',
                            'role-admin': employee.role === 'admin',
                            'role-service': employee.role === 'service'
                          }"
                        >
                          {{ getRoleName(employee.role) }}
                        </span>
                        <span class="text-muted small">{{ employee.position }}</span>
                        <div class="mt-2">
                          <span class="badge bg-light text-dark">
                            <i class="fas fa-star me-1 text-warning"></i> {{ employee.rating }}
                          </span>
                          <span class="badge bg-light text-dark ms-1">
                            <i class="fas fa-calendar me-1 text-primary"></i> {{ employee.experience }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <nav aria-label="Page navigation" class="mt-3">
                <ul class="pagination justify-content-center">
                  <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a>
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
        </div>
        
        <!-- Ficha personal detallada -->
        <div class="col-lg-8" v-if="selectedEmployee">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Ficha Personal</h5>
              <div>
                <button class="btn btn-sm btn-outline-primary me-1">
                  <i class="fas fa-edit me-1"></i> Editar
                </button>
                <button class="btn btn-sm btn-outline-secondary">
                  <i class="fas fa-print me-1"></i> Imprimir
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="row mb-4">
                <div class="col-md-3 text-center">
                  <img :src="selectedEmployee.photo" class="user-avatar mb-3">
                  <h4>{{ selectedEmployee.name }}</h4>
                  <span 
                    class="role-badge"
                    :class="{
                      'role-technical': selectedEmployee.role === 'technical',
                      'role-admin': selectedEmployee.role === 'admin',
                      'role-service': selectedEmployee.role === 'service'
                    }"
                  >
                    {{ getRoleName(selectedEmployee.role) }}
                  </span>
                </div>
                <div class="col-md-9">
                  <div class="row">
                    <div class="col-md-6">
                      <table class="table table-sm">
                        <tr>
                          <th>ID Empleado:</th>
                          <td>{{ selectedEmployee.employeeId }}</td>
                        </tr>
                        <tr>
                          <th>Departamento:</th>
                          <td>{{ selectedEmployee.department }}</td>
                        </tr>
                        <tr>
                          <th>Posición:</th>
                          <td>{{ selectedEmployee.position }}</td>
                        </tr>
                        <tr>
                          <th>Fecha Ingreso:</th>
                          <td>{{ selectedEmployee.startDate }}</td>
                        </tr>
                      </table>
                    </div>
                    <div class="col-md-6">
                      <table class="table table-sm">
                        <tr>
                          <th>Email:</th>
                          <td>{{ selectedEmployee.email }}</td>
                        </tr>
                        <tr>
                          <th>Teléfono:</th>
                          <td>{{ selectedEmployee.phone }}</td>
                        </tr>
                        <tr>
                          <th>Ubicación:</th>
                          <td>{{ selectedEmployee.location }}</td>
                        </tr>
                        <tr>
                          <th>Estado:</th>
                          <td><span class="badge bg-success">Activo</span></td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              
              <ul class="nav nav-tabs mb-4" id="profileTabs" role="tablist">
                <li class="nav-item" role="presentation">
                  <button 
                    class="nav-link" 
                    :class="{active: activeProfileTab === 'roles'}"
                    @click="activeProfileTab = 'roles'"
                  >
                    Roles y Permisos
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button 
                    class="nav-link" 
                    :class="{active: activeProfileTab === 'history'}"
                    @click="activeProfileTab = 'history'"
                  >
                    Historial
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button 
                    class="nav-link" 
                    :class="{active: activeProfileTab === 'interaction'}"
                    @click="activeProfileTab = 'interaction'"
                  >
                    Interacción
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button 
                    class="nav-link" 
                    :class="{active: activeProfileTab === 'ai'}"
                    @click="activeProfileTab = 'ai'"
                  >
                    Entrenamiento IA
                  </button>
                </li>
              </ul>
              
              <div class="tab-content" id="profileTabsContent">
                <!-- Roles y Permisos -->
                <div v-if="activeProfileTab === 'roles'" class="tab-pane fade show active" role="tabpanel">
                  <h5 class="mb-3">Permisos del Sistema</h5>
                  <div class="mb-4">
                    <div class="permission-item" v-for="permission in permissions" :key="permission.id">
                      <div class="form-check form-switch me-3">
                        <input 
                          class="form-check-input" 
                          type="checkbox" 
                          :id="permission.id"
                          v-model="permission.enabled"
                        >
                      </div>
                      <label class="form-check-label" :for="permission.id">{{ permission.label }}</label>
                    </div>
                  </div>
                  
                  <h5 class="mb-3">Habilidades Técnicas</h5>
                  <div class="mb-3">
                    <span 
                      class="skill-badge" 
                      v-for="skill in selectedEmployee.skills" 
                      :key="skill"
                    >
                      {{ skill }}
                    </span>
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Nivel de Acceso</label>
                    <div class="progress">
                      <div 
                        class="progress-bar bg-primary" 
                        role="progressbar" 
                        :style="`width: ${accessLevel}%;`" 
                        :aria-valuenow="accessLevel" 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      >
                        {{ accessLevel }}%
                      </div>
                    </div>
                    <small class="text-muted">Nivel de acceso basado en permisos asignados</small>
                  </div>
                </div>
                
                <!-- Historial -->
                <div v-if="activeProfileTab === 'history'" class="tab-pane fade" role="tabpanel">
                  <h5 class="mb-3">Historial de Acciones</h5>
                  <div class="table-responsive">
                    <table class="table table-sm">
                      <thead>
                        <tr>
                          <th>Fecha/Hora</th>
                          <th>Acción</th>
                          <th>Módulo</th>
                          <th>Detalles</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="action in employeeHistory" :key="action.id">
                          <td>{{ action.date }}</td>
                          <td>{{ action.type }}</td>
                          <td>{{ action.module }}</td>
                          <td>{{ action.details }}</td>
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
                      <li class="page-item">
                        <a class="page-link" href="#">Siguiente</a>
                      </li>
                    </ul>
                  </nav>
                </div>
                
                <!-- Interacción -->
                <div v-if="activeProfileTab === 'interaction'" class="tab-pane fade" role="tabpanel">
                  <div class="row">
                    <div class="col-md-6">
                      <h5 class="mb-3">Nivel de Interacción con Clientes</h5>
                      <div class="interaction-chart mb-4">
                        <canvas ref="interactionChart"></canvas>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Satisfacción del Cliente</label>
                        <div class="progress mb-2">
                          <div 
                            class="progress-bar bg-success" 
                            role="progressbar" 
                            :style="`width: ${selectedEmployee.customerSatisfaction}%;`" 
                            :aria-valuenow="selectedEmployee.customerSatisfaction" 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          >
                            {{ selectedEmployee.customerSatisfaction }}%
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Tiempo de Respuesta</label>
                        <div class="progress mb-2">
                          <div 
                            class="progress-bar bg-info" 
                            role="progressbar" 
                            :style="`width: ${selectedEmployee.responseTime}%;`" 
                            :aria-valuenow="selectedEmployee.responseTime" 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          >
                            {{ selectedEmployee.responseTime }}%
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Casos Resueltos</label>
                        <div class="progress">
                          <div 
                            class="progress-bar bg-primary" 
                            role="progressbar" 
                            :style="`width: ${selectedEmployee.resolvedCases}%;`" 
                            :aria-valuenow="selectedEmployee.resolvedCases" 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          >
                            {{ selectedEmployee.resolvedCases }}%
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <h5 class="mb-3">Métricas Clave</h5>
                      <div class="card mb-3">
                        <div class="card-body">
                          <div class="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 class="mb-0">Interacciones Totales</h6>
                              <small class="text-muted">Últimos 30 días</small>
                            </div>
                            <h3 class="mb-0 text-primary">{{ selectedEmployee.totalInteractions }}</h3>
                          </div>
                        </div>
                      </div>
                      <div class="card mb-3">
                        <div class="card-body">
                          <div class="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 class="mb-0">Promedio de Calificación</h6>
                              <small class="text-muted">De clientes</small>
                            </div>
                            <h3 class="mb-0 text-warning">{{ selectedEmployee.averageRating }}</h3>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-body">
                          <div class="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 class="mb-0">Tiempo Promedio</h6>
                              <small class="text-muted">Resolución de casos</small>
                            </div>
                            <h3 class="mb-0 text-success">{{ selectedEmployee.averageResolutionTime }}h</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Entrenamiento IA -->
                <div v-if="activeProfileTab === 'ai'" class="tab-pane fade" role="tabpanel">
                  <h5 class="mb-3">Entrenamiento del Chatbot</h5>
                  <p class="mb-4">El sistema utiliza las interacciones reales de {{ selectedEmployee.firstName }} para entrenar al chatbot de servicio al cliente, mejorando sus respuestas basadas en su experiencia y conocimiento.</p>
                  
                  <div class="card ai-training-card mb-4">
                    <div class="card-body text-center">
                      <i class="fas fa-robot fa-3x mb-3 text-primary"></i>
                      <h5>Modelo de IA Actual</h5>
                      <p class="text-muted">Versión 2.3.5 - Actualizado hace 3 días</p>
                      <button class="btn btn-primary" @click="updateAIModel">
                        <i class="fas fa-sync-alt me-1"></i> Actualizar con Nuevos Datos
                      </button>
                    </div>
                  </div>
                  
                  <h6 class="mb-3">Contribuciones Recientes al Modelo</h6>
                  <div class="table-responsive">
                    <table class="table table-sm">
                      <thead>
                        <tr>
                          <th>Fecha</th>
                          <th>Tipo</th>
                          <th>Interacciones</th>
                          <th>Mejora</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="contribution in aiContributions" :key="contribution.id">
                          <td>{{ contribution.date }}</td>
                          <td>{{ contribution.type }}</td>
                          <td>{{ contribution.interactions }}</td>
                          <td>{{ contribution.improvement }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div class="alert alert-info mt-4">
                    <i class="fas fa-info-circle me-2"></i> El sistema aprende automáticamente de las interacciones exitosas para mejorar las respuestas del chatbot.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Nuevo Empleado -->
    <div v-if="showNewEmployeeModal" class="modal fade show" tabindex="-1" style="display: block; background: rgba(0,0,0,0.5)">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Registrar Nuevo Empleado</h5>
            <button type="button" class="btn-close" @click="showNewEmployeeModal = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addNewEmployee">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="firstName" class="form-label">Nombre</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="firstName" 
                    v-model="newEmployee.firstName"
                    required
                  >
                </div>
                <div class="col-md-6">
                  <label for="lastName" class="form-label">Apellido</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="lastName" 
                    v-model="newEmployee.lastName"
                    required
                  >
                </div>
              </div>
              
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="email" class="form-label">Email</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    id="email" 
                    v-model="newEmployee.email"
                    required
                  >
                </div>
                <div class="col-md-6">
                  <label for="phone" class="form-label">Teléfono</label>
                  <input 
                    type="tel" 
                    class="form-control" 
                    id="phone" 
                    v-model="newEmployee.phone"
                  >
                </div>
              </div>
              
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="department" class="form-label">Departamento</label>
                  <select 
                    class="form-select" 
                    id="department" 
                    v-model="newEmployee.department"
                    required
                  >
                    <option value="" selected disabled>Seleccionar...</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="Servicio al Cliente">Servicio al Cliente</option>
                    <option value="Operaciones">Operaciones</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="position" class="form-label">Posición</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    id="position" 
                    v-model="newEmployee.position"
                    required
                  >
                </div>
              </div>
              
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="role" class="form-label">Rol</label>
                  <select 
                    class="form-select" 
                    id="role" 
                    v-model="newEmployee.role"
                    required
                  >
                    <option value="" selected disabled>Seleccionar...</option>
                    <option value="technical">Técnico</option>
                    <option value="admin">Administrativo</option>
                    <option value="service">Atención al Cliente</option>
                    <option value="management">Gerencial</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="startDate" class="form-label">Fecha de Ingreso</label>
                  <input 
                    type="date" 
                    class="form-control" 
                    id="startDate" 
                    v-model="newEmployee.startDate"
                    required
                  >
                </div>
              </div>
              
              <div class="mb-3">
                <label for="photo" class="form-label">Foto de Perfil (Opcional)</label>
                <input 
                  class="form-control" 
                  type="file" 
                  id="photo" 
                  accept="image/*"
                  @change="handlePhotoUpload"
                >
              </div>
              
              <div class="mb-3">
                <label class="form-label">Permisos del Sistema</label>
                <div class="border rounded p-3">
                  <div class="form-check mb-2" v-for="permission in newEmployee.permissions" :key="permission.id">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      :id="'new-' + permission.id"
                      v-model="permission.enabled"
                    >
                    <label class="form-check-label" :for="'new-' + permission.id">
                      {{ permission.label }}
                    </label>
                  </div>
                </div>
              </div>
              
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="showNewEmployeeModal = false">
                  Cancelar
                </button>
                <button type="submit" class="btn btn-primary">
                  Guardar Empleado
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

export default {
  setup() {
    // Estado de la aplicación
    const employees = ref([
      {
        id: 1,
        name: "María Rodríguez",
        firstName: "María",
        lastName: "Rodríguez",
        photo: "https://randomuser.me/api/portraits/women/32.jpg",
        role: "technical",
        position: "Ingeniera de Sistemas",
        rating: 4.8,
        experience: "3 años",
        employeeId: "EMP-2020-032",
        department: "Tecnología",
        startDate: "15 Mar 2020",
        email: "maria.rodriguez@empresa.com",
        phone: "+1 555 123 4567",
        location: "Oficina Central",
        skills: ["JavaScript", "Python", "SQL", "AWS", "Docker", "Análisis de Datos"],
        customerSatisfaction: 92,
        responseTime: 85,
        resolvedCases: 88,
        totalInteractions: 147,
        averageRating: 4.8,
        averageResolutionTime: 2.4
      },
      {
        id: 2,
        name: "Carlos Méndez",
        firstName: "Carlos",
        lastName: "Méndez",
        photo: "https://randomuser.me/api/portraits/men/45.jpg",
        role: "admin",
        position: "Gerente Financiero",
        rating: 4.5,
        experience: "5 años",
        employeeId: "EMP-2018-015",
        department: "Finanzas",
        startDate: "10 Ene 2018",
        email: "carlos.mendez@empresa.com",
        phone: "+1 555 987 6543",
        location: "Oficina Central",
        skills: ["Contabilidad", "Finanzas", "Excel", "Análisis Financiero"],
        customerSatisfaction: 85,
        responseTime: 75,
        resolvedCases: 90,
        totalInteractions: 92,
        averageRating: 4.5,
        averageResolutionTime: 3.2
      },
      {
        id: 3,
        name: "Laura Sánchez",
        firstName: "Laura",
        lastName: "Sánchez",
        photo: "https://randomuser.me/api/portraits/women/68.jpg",
        role: "service",
        position: "Supervisora de Servicio",
        rating: 4.9,
        experience: "2 años",
        employeeId: "EMP-2021-078",
        department: "Servicio al Cliente",
        startDate: "20 May 2021",
        email: "laura.sanchez@empresa.com",
        phone: "+1 555 456 7890",
        location: "Oficina Central",
        skills: ["Comunicación", "Resolución de Problemas", "CRM", "Ventas"],
        customerSatisfaction: 95,
        responseTime: 90,
        resolvedCases: 92,
        totalInteractions: 215,
        averageRating: 4.9,
        averageResolutionTime: 1.8
      },
      {
        id: 4,
        name: "Juan Pérez",
        firstName: "Juan",
        lastName: "Pérez",
        photo: "https://randomuser.me/api/portraits/men/22.jpg",
        role: "technical",
        position: "Desarrollador Senior",
        rating: 4.7,
        experience: "4 años",
        employeeId: "EMP-2019-042",
        department: "Tecnología",
        startDate: "12 Ago 2019",
        email: "juan.perez@empresa.com",
        phone: "+1 555 789 0123",
        location: "Oficina Central",
        skills: ["Java", "Spring", "React", "Microservicios", "Kubernetes"],
        customerSatisfaction: 89,
        responseTime: 80,
        resolvedCases: 85,
        totalInteractions: 132,
        averageRating: 4.7,
        averageResolutionTime: 2.7
      }
    ]);

    const permissions = ref([
      { id: "dashboardAccess", label: "Acceso al Dashboard", enabled: true },
      { id: "reportsAccess", label: "Generar Reportes", enabled: true },
      { id: "settingsAccess", label: "Configuración del Sistema", enabled: false },
      { id: "userManagement", label: "Gestión de Usuarios", enabled: false },
      { id: "technicalAccess", label: "Acceso Técnico", enabled: true }
    ]);

    const employeeHistory = ref([
      { id: 1, date: "15 Jun 2023 - 10:15", type: "Login", module: "Sistema", details: "Inicio de sesión exitoso" },
      { id: 2, date: "15 Jun 2023 - 10:30", type: "Actualización", module: "Incidentes", details: "Actualizó estado de INC-2023-1567" },
      { id: 3, date: "14 Jun 2023 - 15:45", type: "Creación", module: "Documentación", details: "Creó nuevo manual técnico" },
      { id: 4, date: "14 Jun 2023 - 11:20", type: "Reporte", module: "Errores", details: "Generó reporte de errores mensual" },
      { id: 5, date: "13 Jun 2023 - 09:10", type: "Configuración", module: "Sistema", details: "Actualizó parámetros de red" }
    ]);

    const aiContributions = ref([
      { id: 1, date: "14 Jun 2023", type: "Solución Técnica", interactions: 27, improvement: "+12% precisión" },
      { id: 2, date: "10 Jun 2023", type: "Flujo de Trabajo", interactions: 15, improvement: "+8% eficiencia" },
      { id: 3, date: "5 Jun 2023", type: "Respuestas FAQ", interactions: 42, improvement: "+15% relevancia" }
    ]);

    const newEmployee = ref({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      role: "",
      startDate: "",
      photo: null,
      permissions: [
        { id: "dashboardPerm", label: "Acceso al Dashboard", enabled: false },
        { id: "reportsPerm", label: "Generar Reportes", enabled: false },
        { id: "settingsPerm", label: "Configuración del Sistema", enabled: false },
        { id: "usersPerm", label: "Gestión de Usuarios", enabled: false }
      ]
    });

    // Estado de la UI
    const selectedEmployee = ref(employees.value[0]);
    const activeTab = ref("all");
    const activeProfileTab = ref("roles");
    const searchQuery = ref("");
    const showNewEmployeeModal = ref(false);
    const interactionChart = ref(null);

    // Computed properties
    const filteredEmployees = computed(() => {
      let filtered = employees.value;
      
      // Filtrar por rol
      if (activeTab.value !== "all") {
        filtered = filtered.filter(emp => emp.role === activeTab.value);
      }
      
      // Filtrar por búsqueda
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(emp => 
          emp.name.toLowerCase().includes(query) || 
          emp.position.toLowerCase().includes(query) ||
          emp.department.toLowerCase().includes(query)
        );
      }
      
      return filtered;
    });

    const accessLevel = computed(() => {
      const enabledCount = permissions.value.filter(p => p.enabled).length;
      return Math.round((enabledCount / permissions.value.length) * 100);
    });

    // Métodos
    const getRoleName = (role) => {
      const roles = {
        technical: "Técnico",
        admin: "Administrativo",
        service: "Atención al Cliente"
      };
      return roles[role] || role;
    };

    const selectEmployee = (employee) => {
      selectedEmployee.value = employee;
    };

    const setActiveTab = (tab) => {
      activeTab.value = tab;
    };

    const handlePhotoUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newEmployee.value.photo = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const addNewEmployee = () => {
      const newId = Math.max(...employees.value.map(e => e.id)) + 1;
      
      const employee = {
        id: newId,
        name: `${newEmployee.value.firstName} ${newEmployee.value.lastName}`,
        firstName: newEmployee.value.firstName,
        lastName: newEmployee.value.lastName,
        photo: newEmployee.value.photo || "https://randomuser.me/api/portraits/lego/1.jpg",
        role: newEmployee.value.role,
        position: newEmployee.value.position,
        rating: 4.5,
        experience: "0 años",
        employeeId: `EMP-${new Date().getFullYear()}-${String(newId).padStart(3, '0')}`,
        department: newEmployee.value.department,
        startDate: new Date(newEmployee.value.startDate).toLocaleDateString('es-ES', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }),
        email: newEmployee.value.email,
        phone: newEmployee.value.phone,
        location: "Oficina Central",
        skills: [],
        customerSatisfaction: 85,
        responseTime: 75,
        resolvedCases: 80,
        totalInteractions: 0,
        averageRating: 0,
        averageResolutionTime: 0
      };
      
      employees.value.push(employee);
      selectEmployee(employee);
      showNewEmployeeModal.value = false;
      resetNewEmployeeForm();
    };

    const resetNewEmployeeForm = () => {
      newEmployee.value = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        position: "",
        role: "",
        startDate: "",
        photo: null,
        permissions: [
          { id: "dashboardPerm", label: "Acceso al Dashboard", enabled: false },
          { id: "reportsPerm", label: "Generar Reportes", enabled: false },
          { id: "settingsPerm", label: "Configuración del Sistema", enabled: false },
          { id: "usersPerm", label: "Gestión de Usuarios", enabled: false }
        ]
      };
    };

    const updateAIModel = () => {
      alert("Modelo de IA actualizado con éxito con los nuevos datos del empleado");
    };

    const initInteractionChart = () => {
      if (interactionChart.value) {
        const ctx = interactionChart.value.getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
              label: 'Interacciones',
              data: [120, 190, 170, 200, 210, 195],
              borderColor: '#4361ee',
              backgroundColor: 'rgba(67, 97, 238, 0.1)',
              fill: true,
              tension: 0.3
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    };

    // Watchers y lifecycle hooks
    watch(selectedEmployee, () => {
      activeProfileTab.value = 'roles';
    });

    onMounted(() => {
      initInteractionChart();
    });

    return {
      employees,
      permissions,
      employeeHistory,
      aiContributions,
      newEmployee,
      selectedEmployee,
      activeTab,
      activeProfileTab,
      searchQuery,
      showNewEmployeeModal,
      interactionChart,
      filteredEmployees,
      accessLevel,
      getRoleName,
      selectEmployee,
      setActiveTab,
      handlePhotoUpload,
      addNewEmployee,
      updateAIModel
    };
  }
};
</script>

<style>
:root {
  --primary-color: #4361ee;
  --secondary-color: #3f37c9;
  --technical-color: #4cc9f0;
  --admin-color: #7209b7;
  --service-color: #f72585;
  --light-color: #f8f9fa;
  --dark-color: #212529;
}

.employee-management-system {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fb;
  min-height: 100vh;
}

.card {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  margin-bottom: 20px;
}

.card-header {
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  font-weight: 600;
  border-radius: 10px 10px 0 0 !important;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}

.role-badge {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.role-technical {
  background-color: rgba(76, 201, 240, 0.1);
  color: var(--technical-color);
}

.role-admin {
  background-color: rgba(114, 9, 183, 0.1);
  color: var(--admin-color);
}

.role-service {
  background-color: rgba(247, 37, 133, 0.1);
  color: var(--service-color);
}

.search-box {
  position: relative;
}

.search-box i {
  position: absolute;
  top: 12px;
  left: 12px;
  color: #adb5bd;
}

.search-box input {
  padding-left: 35px;
  border-radius: 20px;
  border: 1px solid #e9ecef;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-tabs .nav-link {
  border: none;
  color: #495057;
  font-weight: 500;
  padding: 10px 15px;
}

.nav-tabs .nav-link.active {
  color: var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  background-color: transparent;
}

.progress {
  height: 8px;
  border-radius: 4px;
}

.progress-bar {
  border-radius: 4px;
}

.skill-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 5px;
  margin-bottom: 5px;
  background-color: #f0f2f5;
}

.action-btn {
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.05);
  color: #495057;
  transition: all 0.3s ease;
  border: none;
}

.action-btn:hover {
  background-color: rgba(67, 97, 238, 0.1);
  color: var(--primary-color);
}

.team-card {
  transition: all 0.3s ease;
  border-left: 4px solid;
  cursor: pointer;
}

.team-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.team-card.technical {
  border-left-color: var(--technical-color);
}

.team-card.admin {
  border-left-color: var(--admin-color);
}

.team-card.service {
  border-left-color: var(--service-color);
}

.interaction-chart {
  height: 200px;
  background-color: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-weight: 500;
}

.ai-training-card {
  border: 1px dashed #6c757d;
  background-color: rgba(108, 117, 125, 0.05);
  transition: all 0.3s ease;
}

.ai-training-card:hover {
  background-color: rgba(108, 117, 125, 0.1);
  border-color: var(--primary-color);
}

.permission-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f2f5;
}

.permission-item:last-child {
  border-bottom: none;
}

.modal {
  background: rgba(0, 0, 0, 0.5);
}

.employee-list {
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 5px;
}

/* Scrollbar styling */
.employee-list::-webkit-scrollbar {
  width: 6px;
}

.employee-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.employee-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.employee-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

@media (max-width: 992px) {
  .employee-list {
    max-height: 40vh;
  }
}
</style>