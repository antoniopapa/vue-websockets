<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {io} from "socket.io-client";
import {useRoute} from "vue-router";
import {useUserStore} from "@/stores/user.js";

const socket = io('http://localhost:8080/', {});

const route = useRoute();
const userStore = useUserStore();
const message = ref('');
const messages = ref([]);


onMounted(async () => {
  const {data} = await axios.get(`users/${route.params.id}/messages`);
  messages.value = data.messages;
})

socket.on('message', (msg) => {
  messages.value = [...messages.value, msg]
})

const submit = async () => {
  await axios.post('messages', {
    receiver_id: route.params.id,
    content: message.value
  })

  message.value = '';
}
</script>

<template>
  <div id="head" class="py-3 lh-sm border-bottom">
    <strong class="mb-1">Members: </strong>
  </div>

  <div id="conversation">
    <div class="row pt-2" v-for="msg of messages">
      <div class="col-6" v-if="msg.sender?.id === userStore.user.id"></div>
      <div class="col-6">
        <div class="alert d-inline-block" :class="(msg.sender?.id === userStore.user.id) ?'alert-primary float-end' : 'alert-success'" role="alert">
          {{ msg.content }}
        </div>
      </div>
      <div class="col-6" v-if="msg.sender?.id !== userStore.user.id"></div>
    </div>
  </div>

  <form id="reply" class="p-3 w-100" @submit.prevent="submit">
    <div class="input-group">
      <input class="form-control" placeholder="Write a message" v-model="message"/>
    </div>
  </form>
</template>

<style scoped>

</style>
