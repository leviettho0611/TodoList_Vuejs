<template>
  <button @click="logout" type="button">Logout</button>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const logout = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);
        await axios.post('http://10.20.14.45:8080/api/auth/signout',
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
        console.log('Logout successful');
      } catch (error) {
        console.error('Logout error:', error);
      }
    };
    return { logout };
  }
};


</script>
