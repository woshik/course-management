import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'StudentDashboard',
    component: () => import(/* webpackChunkName: "student-dashboard" */ '@/views/student/Dashboard.vue'),
  },
  {
    path: '/login',
    name: 'StudentLogin',
    component: () => import(/* webpackChunkName: "student-login" */ '@/views/student/Login.vue'),
  },
  {
    path: '/registration',
    name: 'StudentRegistration',
    component: () => import(/* webpackChunkName: "student-registration" */ '@/views/student/Registration.vue'),
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import(/* webpackChunkName: "admin-dashboard" */ '@/views/admin/Dashboard.vue'),
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import(/* webpackChunkName: "admin-login" */ '@/views/admin/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
