import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const publicRoutes = [
  {
    path: '/login',
    name: 'StudentLogin',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: {
      title: 'Student Login',
    },
    props: {
      role: 'student',
    },
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import(/* webpackChunkName: "admin-login" */ '@/views/Login.vue'),
    meta: {
      title: 'Admin Login',
    },
    props: {
      role: 'admin',
    },
  },
  {
    path: '/registration',
    name: 'StudentRegistration',
    component: () => import(/* webpackChunkName: "registration" */ '@/views/Registration.vue'),
    meta: {
      title: 'Student Registration',
    },
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "dashboard-layout" */ '@/views/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/admin/Dashboard.vue'),
        meta: {
          title: 'Dashboard',
        },
      },
      {
        path: '/course',
        name: 'Course',
        component: () => import(/* webpackChunkName: "course" */ '@/views/admin/Course.vue'),
        meta: {
          title: 'Manage Course',
        },
      },
      {
        path: '/course/add',
        name: 'AddCourse',
        component: () => import(/* webpackChunkName: "course" */ '@/views/admin/AddCourse.vue'),
        meta: {
          title: 'Add Course',
        },
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue'),
        meta: {
          title: 'Profile',
        },
      },
    ],
  },
];

const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: publicRoutes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  },
});

const router = createRouter();

// reset all route
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
