<template>
      <div class="background">
        <div class="container">
          <h2 class="text-center mb-4">Login</h2>
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email or User Name</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-envelope-fill"></i></span>
                <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email or User Name">
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <div class="input-group">
                <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
                <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
              </div>
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Remember me</label>
            </div>
            <button @click="login" type="button" class="btn btn-outline-success">Submit</button>
          </form>
        </div>
      </div>
    <!-- </body> -->

    <!-- </div> -->
  </template>
  
  <!-- <script>
  import { ref } from 'vue';
  import axios from 'axios';
  export default {
    setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const login = async () => {
      try {
        const response = await axios('http://10.20.14.45:8080/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            usernameOrEmail: email.value,
            password: password.value
          })
        });

        
        if (!response.ok) {
          throw new Error('Login failed');
        }

      } catch (error) {
        errorMessage.value = 'Login failed. Please try again.';
      }
    };

    return { email, password, errorMessage, login };
  }
  };
  </script> -->
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');
      const router = useRouter();

      const login = async () => {
        try {
          const response = await axios.post('http://10.20.14.45:8080/api/auth/signin', {
            usernameOrEmail: email.value,
            password: password.value
          });
          if (response.status === 200) {
            localStorage.setItem('accessToken', response.data.accessToken);
            console.log(response.data.accessToken); 
            router.push('/TodoApp');
          } else {
            throw new Error('Login failed');
          }
        } catch (error) {
          errorMessage.value = 'Login failed. Please try again.';
        }
      };
      return { email, password, errorMessage, login };
    }
  };
</script>

<style scoped>

.background {
  background-image: url('https://img.thuthuatphanmem.vn/uploads/2018/09/27/wallpaper-4k_105912678.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background-color: rgba(255, 255, 255, 0.8); /* Màu nền của form */
  padding: 20px;
  border-radius: 10px;
  width: 400px; /* Độ rộng của form */
}


</style>