<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import messageModel from '@/models/message';
import { v4 as uuidv4 } from 'uuid';

export default {
  created() {
    this.$options.sockets.onmessage = this.onMessage;

    const oldUserId = localStorage.getItem('sc_userId');
    if (oldUserId) {
      this.$store.dispatch('setUserId', oldUserId);
    } else {
      const newUserId = uuidv4();
      this.$store.dispatch('setUserId', newUserId);
      localStorage.setItem('sc_userId', newUserId);
    }
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
  },
  methods: {
    onMessage(recievedMessage) {
      if (typeof recievedMessage.data !== 'string') {
        return;
      }
      const data = JSON.parse(recievedMessage.data);
      console.log(data);

      if (data.text) {
        const ownMessage = data.userId === this.userId;
        this.$store.dispatch('addMessage', messageModel(
          data.text,
          ownMessage,
          data.userName,
          data.userId,
          data.users,
        ));
        if (!ownMessage) {
          this.sendNotification('New Message', data.text);
        }
      } else if (data.user) {
        this.$store.dispatch('setUsername', data.user.username);
        if (data.user.messages) {
          this.$store.dispatch('setMessages', data.user.messages.map((message) => messageModel(
            message.text,
            message.userId === this.userId,
            message.userName,
            message.userId,
            message.users,
          )));
        }
      } else if (data.users) {
        this.$store.dispatch('setUsers', data.users);
        const selectedUser = data.users.find(
          (user) => user.selected_by.includes(this.userId),
        );
        if (selectedUser) {
          this.$store.dispatch('setSelectedUser', selectedUser.userId);
        }
      }
    },
    sendNotification(title, body) {
      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          const notification = new Notification(title, {
            body,
            icon: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2Fb%2Fb2%2FSJ_AB_logo.svg%2F1280px-SJ_AB_logo.svg.png&f=1&nofb=1',
          });
          notification.send();
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              const notification = new Notification(title, {
                body,
                icon: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2Fb%2Fb2%2FSJ_AB_logo.svg%2F1280px-SJ_AB_logo.svg.png&f=1&nofb=1',
              });
              notification.send();
            }
          });
        }
      }
    },
  },
};
</script>

<style lang="scss">
  @import "@/assets/defaults.scss";

  html, body, #app {
    margin: 0;
    height: 100%;
    width: 100%;
    font-family: 'Jost', sans-serif;
    background-color: $c_grey--light;
    color: $c_primary;
    position: relative;
  }

  .logo {
    &__container {
      text-align: center;
      padding: 50px;
    }

    &__image {
      height: 100px;
    }
  }
</style>
