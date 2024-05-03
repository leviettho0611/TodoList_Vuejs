<template>

  <DefaultLayout/>
  <p v-if="isConnected"></p>
    <p v-else></p>
    <ToastContainer :position="top-right" />
</template>

<script>

import DefaultLayout from './layouts/DefaultLayout.vue';
import { ref, onMounted } from 'vue';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'App',
  components: {
    DefaultLayout
  },
  setup() {
    const accessToken = localStorage.getItem('accessToken');
    const stompClient = ref(null);
    const isConnected = ref(false);
    const receivedMessages = ref([]);

    const connectWebSocket = () => {
      const url = `http://10.20.14.45:8080/ws/?access_token=${accessToken}`;
      const socket = new SockJS(url);
      const stomp = new Client({
        brokerURL: url,
        connectHeaders: {
          "content-type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        webSocketFactory: () => socket,
      });

      stomp.onConnect = () => {
        isConnected.value = true;
        console.log('Connected to WebSocket');
        stomp.subscribe('/topic/tasks', (message) => {
          receivedMessages.value.push(message.body);
          toast.warning(message.body, {
            position: 'top-right',
            duration: 5000, 
          });
        });
      };

      stomp.onDisconnect = () => {
        isConnected.value = false;
        console.log('Disconnected from WebSocket');
      };

      stomp.activate();
      stompClient.value = stomp;
    };

    onMounted(() => {
      connectWebSocket();
    });

    return {
      isConnected,
      receivedMessages,
    };
  },
};
</script>

<style></style>
