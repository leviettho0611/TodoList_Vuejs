<!-- <template>
  <div>
    <h2>Trang Home</h2>
    <button id="connect" class="btn btn-default" type="submit" :disabled="connected" @click.prevent="tickleConnection">Connect</button>
    <button id="disconnect" class="btn btn-default" type="submit" :disabled="!connected" @click.prevent="tickleConnection">Disconnect</button>
    <button id="send" class="btn btn-default" type="submit" @click.prevent="send">Send</button>
    <table>
      <tbody>
        <tr v-for="(item, index) in received_messages" :key="index">
          <td>{{ item }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

export default {
  setup() {
    const received_messages = ref([]);
    const send_message = ref(null);
    const connected = ref(false);
    let socket = null;
    let stompClient = null;

    const send = () => {
      console.log("Send message:" + send_message.value);
      if (stompClient && stompClient.connected) {
        const msg = { name: send_message.value };
        stompClient.send("/api/tasks", JSON.stringify(msg), {});
      }
    };

    const connect = () => {
      socket = new SockJS("http://10.20.14.45:8080/ws/");
      stompClient = Stomp.over(socket);
      stompClient.connect(
        {},
        frame => {
          connected.value = true;
          console.log(frame);
          stompClient.subscribe("/api/tasks", tick => {
            console.log(tick);
            received_messages.value.push(JSON.parse(tick.body).content);
          });
        },
        error => {
          console.log(error);
          connected.value = false;
        }
      );
    };

    const disconnect = () => {
      if (stompClient) {
        stompClient.disconnect();
      }
      connected.value = false;
    };

    const tickleConnection = () => {
      connected.value ? disconnect() : connect();
    };

    const mounted = () => {
      connect();
    };

    return {
      received_messages,
      send_message,
      connected,
      send,
      connect,
      disconnect,
      tickleConnection,
      mounted
    };
  }
};
</script> -->
<template>
  <div>
    <h2>Trang Home</h2>
    <p v-if="isConnected">Connected to WebSocket</p>
    <p v-else>Connecting...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export default {
  setup() {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    const stompClient = ref(null);
    const isConnected = ref(false);
    // var endpoint = '/ws/?access_token=' + auth.access_token;
// var socket = new SockJS(endpoint);
// var stompClient = Stomp.over(socket);
    // Function to connect to WebSocket and subscribe to a topic
    const connectWebSocket = () => {
      const url = 'http://10.20.14.45:8080/ws/?access_token=' + accessToken ; 
      const socket = new SockJS(url);
      const stomp = new Client({
        brokerURL: url,
        connectHeaders: {
          // Add any connect headers if required
          "content-type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
            // "Referer": 'http://10.20.14.45:8080'
        },
        webSocketFactory: () => socket,
      });

      stomp.activate();
      // stompClient = Stomp.over(socket);
      stomp.onConnect = () => {
        isConnected.value = true;
        console.log('Connected to WebSocket');
        stomp.subscribe('/api/tasks', (message) => {
          handleMessage(message);
        });
      };

      stomp.onDisconnect = () => {
        isConnected.value = false;
        console.log('Disconnected from WebSocket');
      };

      stompClient.value = stomp;
    };

    const handleMessage = (message) => {
      console.log('Received message:', message.body);
      // Process the incoming message as needed
    };

    onMounted(() => {
      connectWebSocket();
    });

    return {
      isConnected,
    };
  },
};
</script>
