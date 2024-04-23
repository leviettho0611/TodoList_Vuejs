import { createRouter, createWebHistory } from 'vue-router';

// Import các component mà bạn muốn sử dụng trong router
import TodoApp from '@/components/TodoApp.vue';
import LoginPage from '@/components/pages/LoginPage.vue';
import HomePage from '@/components/pages/HomePage.vue';
import RegisterPage from '@/components/pages/RegisterPage.vue';

const routes = [
  {
    path: '/TodoApp',
    name: 'TodoApp',
    component: TodoApp
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/homepage',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
