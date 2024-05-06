<template>
  <div class="container">
      <!-- <h2 class="text-center mb-4">Logout</h2> -->
      <!-- <button @click="logout" type="button">Logout</button> -->
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  setup() {
    const router = useRouter();

    const logout = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        await axios.post('auth/signout',
        {
              headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
              }
            }
      );
        // Xóa accessToken khỏi localStorage
        localStorage.removeItem('accessToken');
        // Chuyển hướng người dùng đến trang đăng nhập
        router.replace({ name: 'LoginPage' });
        toast.success('Logout successful', {
            position: 'top-right',
            duration: 5000,
          });
        // console.log('Logout successful');
      } catch (error) {
        console.error('Logout error:', error);
      }
    };
    return  logout ;
  }
};


</script>
