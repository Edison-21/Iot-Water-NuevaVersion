import { createRouter, createWebHistory } from "vue-router";

// Layout principal que envuelve todas las vistas con barra lateral
import Layout from "../views/Layout.vue";

// Vistas de autenticación
import Login      from "../views/Login.vue";
import Register   from "../views/Register.vue";

// Vistas del dashboard
import Dashboard        from "../views/Dashboard.vue";
import Gateway          from "../views/Gateway.vue";
import Usuario          from "../views/Usuario.vue";
import Medidor          from "../views/Medidor.vue";
import Cliente          from "../views/Cliente.vue";
import Crm              from "../views/Crm.vue";

// ----> Nuevas vistas
import Denuncias        from "../views/Denuncias.vue";
import GestionProblemas from "../views/Gestion-Problemas.vue";
import Personal         from "../views/Personal.vue";

const routes = [
  // Rutas públicas
  { path: "/",         name: "Login",  component: Login },
  { path: "/register", name: "Register", component: Register },

  // Rutas protegidas, envueltas en Layout.vue
  {
    path: "/dashboard",
    component: Layout,
    children: [
      { path: "",                   name: "Dashboard",        component: Dashboard },
      { path: "gateway",            name: "Gateway",          component: Gateway },
      { path: "usuario",            name: "Usuario",          component: Usuario },
      { path: "medidor",            name: "Medidor",          component: Medidor },
      { path: "cliente",            name: "Cliente",          component: Cliente },
      { path: "crm",                name: "Crm",              component: Crm },
      // ----> Aquí agregamos las nuevas secciones
      { path: "denuncias",          name: "Denuncias",        component: Denuncias },
      { path: "gestion-problemas",  name: "GestionProblemas", component: GestionProblemas },
      { path: "personal",           name: "Personal",         component: Personal }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Marcar todas las rutas hijas de /dashboard como protegidas
routes.forEach(route => {
  if (route.children) {
    route.children.forEach(child => {
      child.meta = { requiresAuth: true };
    });
  }
});

// Guard: si está en una ruta protegida y NO hay token, redirige al Login
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
