import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const publicRoutes = [
  {
    path: '/login',
    name: 'UserLogin',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: {
      title: 'User Login',
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
    component: () => import(/* webpackChunkName: "dashboard-layout" */ '@/views/Panel.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "AdminDashboard" */ '@/views/admin/Dashboard.vue'),
        meta: {
          title: 'Dashboard',
          active: 'Dashboard',
        },
      },
      {
        path: '/course',
        name: 'Course',
        component: () => import(/* webpackChunkName: "Course" */ '@/views/admin/Course.vue'),
        meta: {
          title: 'Manage Course',
          active: 'Course',
        },
      },
      {
        path: '/course/add',
        name: 'AddCourse',
        component: () => import(/* webpackChunkName: "CourseForm" */ '@/views/admin/CourseForm.vue'),
        meta: {
          title: 'Add Course',
          active: 'Course',
        },
      },
      {
        path: '/course/edit/:id',
        name: 'EditCourse',
        component: () => import(/* webpackChunkName: "courseForm" */ '@/views/admin/CourseForm.vue'),
        meta: {
          title: 'Edit Course',
          active: 'Course',
        },
      },
      {
        path: '/student',
        name: 'Student',
        component: () => import(/* webpackChunkName: "Student" */ '@/views/admin/Student.vue'),
        meta: {
          title: 'Manage Student',
          active: 'Student',
        },
      },
      {
        path: '/student/add',
        name: 'AddStudent',
        component: () => import(/* webpackChunkName: "StudentForm" */ '@/views/admin/StudentForm.vue'),
        meta: {
          title: 'Add Student',
          active: 'Student',
        },
      },
      {
        path: '/student/edit/:id',
        name: 'EditStudent',
        component: () => import(/* webpackChunkName: "StudentForm" */ '@/views/admin/StudentForm.vue'),
        meta: {
          title: 'Edit Student',
          active: 'Student',
        },
      },
      {
        path: '/schedule',
        name: 'Schedule',
        component: () => import(/* webpackChunkName: "StudentForm" */ '@/views/admin/Schedule.vue'),
        meta: {
          title: 'Manage Schedule',
          active: 'Schedule',
        },
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Profile" */ '@/views/Profile.vue'),
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
