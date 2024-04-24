<!-- <template>
  <button @click="logout" type="button">Logout</button>
</template>

<script>
import axios from 'axios';

export default {
  
  methods: {
    logout() {
      axios.post('http://10.20.14.45:8080/api/auth/signout')
        .then(() => {
          console.log('Logout successful');
          // Redirect to login page or any other action you want after logout
        })
        .catch(error => {
          console.error('Logout error:', error);
        });
    }
  }
}
</script> -->
