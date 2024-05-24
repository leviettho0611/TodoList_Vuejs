<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container">
      <router-link to="/home-page">
        <a class="navbar-brand me-auto" href="#">Logo</a>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
            <router-link to="/home-page">
              <li class="nav-item">
                <a class="nav-link mx-lg-5" aria-current="page" href="#">Home</a>
              </li>
            </router-link>
            <router-link to="/TodoApp">
              <li class="nav-item">
                <a class="nav-link mx-lg-5" href="#">TodoApp</a>
              </li>
            </router-link>
            <router-link to="/project-page">
              <li class="nav-item">
                <a class="nav-link mx-lg-5" href="#">ProjectPage</a>
              </li>
            </router-link>
            <li v-if="!isLoggedIn" class="nav-item">
              <router-link to="/register">
                <a class="nav-link mx-lg-5" href="#">Register</a>
              </router-link>
            </li>
            <li v-if="!isLoggedIn" class="nav-item">
              <router-link to="/login">
                <a class="nav-link mx-lg-5" href="#">Login</a>
              </router-link>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <a class="nav-link mx-lg-5" href="#" @handleLogout="handleLogout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  setup() {
    const isLoggedIn = ref(false);
    const router = useRouter();

    const handleLogout = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        await axios.post('auth/signout', {}, {
          headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          }
        });
        localStorage.removeItem('accessToken');
        // router.replace({ name: 'LoginPage' });
        router.push('/Login');
        toast.success('Logout successful', {
          position: 'top-right',
          duration: 1000,
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    onMounted(() => {
      isLoggedIn.value = localStorage.getItem('accessToken') ? true : false;
    });

    return {
      isLoggedIn,
      handleLogout
    };
  }
}
</script>




<style scoped>
.navbar {
  background-color: rgb(255, 255, 255);
  height: 60px;
  border-radius: 16px;
  padding: 0.5rem;
}

.navbar-brand {
  font-weight: 500;
  color: #009970;
  font-size: 24px;
  transition: 0.3s color;
}

.login-button {
  color: #009970;
  font-size: 14px;
  padding: 8px 20px;
  border-radius: 50px;
  border: 1px solid #009970;
  text-decoration: none;
  transition: 0.3s background-color;
}

.login-button:hover {
  background-color: #00b383;
}

.navbar-toggler {
  border: none;
  font-size: 1.25rem;
}

.navbar-toggler:focus {
  box-shadow: none;
  outline: none;
}

.navbar-toggler:focus,
.btn-close:focus {
  box-shadow: none;
  outline: none;
}

.nav-link {
  color: #666777;
  font-weight: 500;
  position: relative;
}

.nav-link:hover,
.nav-link.active {
  color: #000;
}

@media(min-width: 991px) {
  .nav-link::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: #009970;
    visibility: hidden;
    transition: 0.3s ease-in-out;
  }

  .nav-link:hover::before,
  .nav-link.active::before {
    width: 100%;
    visibility: visible;
  }

  a {
    text-decoration: none;
  }
}
</style>