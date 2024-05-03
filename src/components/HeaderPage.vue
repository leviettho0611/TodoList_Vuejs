<template>
  
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container">
      <router-link to="/HomePage">
      <a class="navbar-brand me-auto" href="#">Logo</a>
    </router-link>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link mx-lg-2 active" aria-current="page" href="#">Home</a>
            </li>
            <router-link to="/HomePage">
            <li class="nav-item">
              <a class="nav-link mx-lg-2 " aria-current="page" href="#">Home</a>
            </li>
          </router-link>
          <router-link to="/TodoApp">
            <li class="nav-item">
              <a class="nav-link mx-lg-2" href="#">TodoApp</a>
            </li>
          </router-link>
          <router-link to="/Register">
            <li class="nav-item">
              <a class="nav-link mx-lg-2" href="#">Register</a>
            </li>
          </router-link>
          <router-link to="/Logout">
            <li class="nav-item">
              <a class="nav-link mx-lg-2" href="#">Logout</a>
            </li>
          </router-link>
          </ul>

        </div>
      </div>
      <a class="login-button" href="#">Login</a>
      <button class="navbar-toggler pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>

  <!-- <div class="background">

    <form class="container-fluid justify-content-start">
      <router-link to="/HomePage">
        <button class="btn btn-outline-secondary me-2" type="button">Home</button>
      </router-link>
      <router-link to="/Login">
        <button class="btn btn-outline-secondary me-2" type="button">Login</button>
      </router-link>
      <router-link to="/Register">
        <button class="btn btn-outline-secondary me-2" type="button">Register</button>
      </router-link>
      <router-link to="/TodoApp">
        <button class="btn btn-outline-secondary me-2" type="button">TodoApp</button>
      </router-link>
      <router-link to="/Logout">
        <button class="btn btn-outline-secondary me-2" type="button">Logout</button>
      </router-link>
    </form>

  </div> -->
</template>


<style scoped="">
/* .background {
  background-color: rgb(76, 83, 84);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
} */
.navbar{
  background-color: #fff;
  height: 80px;
  border-radius: 16px;
  padding: 0.5rem;
}
.navbar-brand{
  font-weight: 500;
  color: #009970;
  font-size: 24px;
  transition: 0.3s color;
}
.login-button {
  background-color: #009970;
  color: #fff;
  font-size: 14px;
  padding: 8px 20px;
  border-radius: 50px;
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
}
</style>