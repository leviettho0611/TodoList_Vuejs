import { createRouter, createWebHistory } from 'vue-router';

import TodoApp from '@/pages/TodoApp.vue';
import HomePage from '@/pages/HomePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
// import DefaultLayout from '@/layouts/DefaultLayout.vue';
import LogoutPage from '@/pages/LogoutPage.vue';
import MyTasks from '@/pages/MyTasks.vue'

const routes = [
  {
    // component: DefaultLayout,
    children: [
      {
        path:'/HomePage',
        name: 'HomePage',
        component: HomePage
      },
      {
        path: '/TodoApp',
        name: 'TodoApp',
        meta: {
          requiresAuth: true
        },
        component: TodoApp
      },
      // {
      //   path:'/Assign_tasks',
      //   name: 'HomePage',
      //   component: HomePage
      // },
      {
        path:'/MyTasks',
        name: 'MyTasks',
        component: MyTasks
      },
      {
        path: '/Login',
        name: 'LoginPage',
        component: LoginPage
      },
      {
        path: '/Register',
        name: 'RegisterPage',
        component: RegisterPage
      },
      {
        path:'/Logout',
        name: 'LogoutPage',
        component: LogoutPage
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('accessToken');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'LoginPage' });
  } else if (to.name === 'LoginPage' && isAuthenticated) {
    next({ name: 'TodoApp' });
  } else {
    next();
  }
});
export default router;




// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('authToken') !== null
//   console(isAuthenticated);
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isAuthenticated) {
//       next({ name: 'Sign-In' })
//     } else {
//       next()
//     }
//   } else if (to.matched.some(record => record.meta.requiresGuest)) {
//     if (isAuthenticated) {
//       next({ name: 'Main' })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// });


// export default router;
