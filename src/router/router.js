import { createRouter, createWebHistory } from 'vue-router';

// import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Login from '@/auth/auth-login.page.vue';
import Register from '@/auth/auth-register.page.vue';
import Logout from '@/auth/auth-logout.page.vue';
import HomePage from '@/todolist/todolist-home.page.vue';
import MyTasks from '@/todolist/todolist-mytask.page.vue'
import ProjectPage from '@/todolist/todolist-project.page.vue'
import Tasks from '@/todolist/todolist-tasks.page.vue'

const routes = [
  {
    // component: DefaultLayout,
    children: [
      {
        path:'/home-page',
        name: 'home-page',
        component: HomePage
      },
      {
        path: '/tasks/:projectId',
        // path: '/TodoApp',
        name: 'tasks',
        meta: {
          // requiresAuth: true
        },
        component: Tasks
      },
      // {
      //   path:'/Assign_tasks',
      //   name: 'HomePage',
      //   component: HomePage
      // },
      {
        path:'/project-page',
        name: 'project-page',
        meta: {
          // requiresAuth: true
        },
        component: ProjectPage
      },
      {
        path:'/my-tasks',
        name: 'my-tasks',
        component: MyTasks
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path:'/logout',
        name: 'logout',
        component: Logout
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
