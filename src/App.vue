<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <div id="app"> -->
  <!-- <nav class="navbar navbar-light bg-light">
    <form class="container-fluid justify-content-start">
      <router-link to="/Login">
      <button class="btn btn-outline-secondary me-2" type="button">Login</button>
      </router-link>
      <router-link to="/Register">
      <button class="btn btn-outline-secondary me-2" type="button">Register</button>
      </router-link>
      <router-link to="/TodoApp">

      <button class="btn btn-outline-secondary me-2" type="button">TodoApp</button>

    </router-link>
    </form>
  </nav> -->
<DefaultLayout></DefaultLayout>
  <!-- <Router-view></Router-view> -->
  <!-- <LoginPage></LoginPage>
  <HomePage></HomePage>
  <TodoApp></TodoApp> -->
</template>

<script>
// import TodoApp from './components/TodoApp.vue';
// import LoginPage from './components/pages/LoginPage.vue';
// import HomePage from './components/pages/HomePage.vue';

import DefaultLayout from './layouts/DefaultLayout.vue';
export default {
  name: 'App',
  components: {
    DefaultLayout
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

</style>
