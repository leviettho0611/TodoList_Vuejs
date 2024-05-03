import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueAwesomePaginate from 'vue-awesome-paginate';
import 'vue-awesome-paginate/dist/style.css';
import axios from 'axios';


// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

axios.defaults.baseURL = 'http://10.20.14.45:8080/api/';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
axios.defaults.headers.common['content-type'] = 'application/json';
const app = createApp(App)
app.use(router)
app.use(VueAwesomePaginate)
app.mount('#app')
// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)
