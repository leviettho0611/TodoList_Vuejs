<template>
  <div class="background">
    <div class="container">
      <h2 class="text-center mb-4">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Name</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-envelope-fill"></i></span>
            <input v-model="name" type="text" class="form-control" id="name" placeholder="Name">
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">UserName</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-envelope-fill"></i></span>
            <input v-model="username" type="text" class="form-control" id="username" placeholder="User Name">
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-envelope-fill"></i></span>
            <input v-model="email" type="email" class="form-control" id="email" placeholder="Email">
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
          </div>
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Remember me</label>
        </div>
        <button type="submit" class="btn btn-outline-success">Submit</button>
      </form>
    </div>
  </div>
</template>

<!-- <script>
import { ref } from 'vue';
import axios from 'axios';
  export default {
    setup(){
        const name = ref('');
        const username = ref('');
        const email = ref('');
        const password = ref('');
        const errorMessage = ref('');
        // const account = ref([]);

        const register = async () =>{
          // console.log('register');
            try{
                const response = await axios('http://10.20.14.45:8080/api/auth/signup',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        name: name.value,
                        username: username.value,
                        email: email.value,
                        password: password.value
                    })
                    
                });
                if (!response.ok) {
                  throw new Error('Register failed');
                }
                } catch (error) {
                    errorMessage.value = 'Register failed. Please try again.';
                }
            };
            return { name ,username, email, password, errorMessage, register };
        }
    };

  </script> -->
<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const name = ref('');
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const router = useRouter();
    const register = async () => {
      try {
        const response = await axios.post('http://10.20.14.45:8080/api/auth/signup', {
          name: name.value,
          username: username.value,
          email: email.value,
          password: password.value
        });
        if (response.status !== 200) {
          throw new Error('Register failed');
        }
        router.replace({ name: 'TodoApp' });
        // Xử lý dữ liệu trả về nếu cần
        console.log(response.data);
      } catch (error) {
        errorMessage.value = 'Register failed. Please try again.';
        console.error(error);
      }
    };
    return { name, username, email, password, errorMessage, register };
  }
};
</script>

<style scoped>
.background {
  background-image: url('https://i.pinimg.com/originals/3d/c4/49/3dc449b04d9ace524a0ecd247e1fdc83.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}
</style>