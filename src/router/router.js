import { createRouter, createWebHistory } from 'vue-router';

// Import các component mà bạn muốn sử dụng trong router
import TodoApp from '@/pages/TodoApp.vue';
import HomePage from '@/pages/HomePage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import checkLogin from '@/router/checkLogin.js';
// import LogoutPage from '@/pages/LogoutPage.vue';
// import DefaultLayout from '@/layouts/DefaultLayout.vue';

const routes = [
  {
    path:'/',
    name: 'HomePage',
    meta: {
      layout: "DefaultLayout"
    },
    component: HomePage
  },
  {
    path: '/TodoApp',
    name: 'TodoApp',
    meta: {
      layout: "DefaultLayout"
    },
    component: TodoApp
   
  },
  {
    path: '/login',
    name: 'LoginPage',
    meta: {
      layout: "DefaultLayout",
      requiresAuth: true
    },
    beforeEach: checkLogin,
    component: LoginPage
    
  },
  {
    path: '/register',
    name: 'RegisterPage',
    meta: {
      layout: "DefaultLayout",
      
    },
    component: RegisterPage
  },
  // {
  //   path: '/Logout',
  //   name: 'LogoutPage',
  //   component: LogoutPage
  // },
];

// router.beforeEach((to, from, next) => {
//     // Kiểm tra xem route có yêu cầu xác thực không
//     if (to.meta.requiresAuth) {
//         // Nếu cần xác thực, sử dụng middleware checkLogin để kiểm tra đăng nhập
//         checkLogin(to, from, next);
//     } else {
//         // Nếu không cần xác thực, cho phép tiếp tục điều hướng
//         next();
//     }
// });


const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;
