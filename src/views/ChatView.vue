<script setup>
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import {io} from "socket.io-client";
import {useRoute} from "vue-router";
import {useUserStore} from "@/stores/user.js";
import Upload from "@/components/Upload.vue";

const socket = io('http://localhost:8080/', {});

const route = useRoute();
const userStore = useUserStore();
const message = ref('');
const messages = ref([]);
const room = ref({
  title: '',
  members: []
});
const page = ref(1);
const lastPage = ref(false)

const load = async () => {
  const {data} = await axios.get(`rooms/${route.params.id}/messages?page=${page.value}`);
  room.value = data.room;
  messages.value = page.value === 1 ? data.messages : [...data.messages, ...messages.value];
  lastPage.value = data.messages.length === 0;
}

onMounted(() => load())

watch(page, () => load())

watch(route, () => {
  page.value = 1;
  lastPage.value = false;
  load()
})

socket.on('message', (msg, rm) => {
  if (parseInt(route.params.id) === parseInt(rm.id)) {
    messages.value = [...messages.value, msg]
  }
})

const submit = async () => {
  await axios.post(`rooms/${route.params.id}/messages`, {
    content: message.value
  })

  message.value = '';
}
</script>

<template>
  <div id="head" class="py-3 lh-sm border-bottom">
    <strong class="mb-1">Members: {{room.members.map(m => m.first_name + " " + m.last_name).join(", ")}}</strong>
  </div>

  <div id="conversation">
    <div class="text-center py-1" v-if="!lastPage">
      <a href="javascript:void(0)" class="alert-link" @click="page++">Load more recent</a>
    </div>

    <div class="row pt-2" v-for="msg of messages">
      <div class="col-6" v-if="msg.sender?.id === userStore.user.id"></div>
      <div class="col-6" v-if="msg.type ==='text'">
        <div class="alert d-inline-block" :class="(msg.sender?.id === userStore.user.id) ?'alert-primary float-end' : 'alert-success'" role="alert">
          {{ msg.content }}
        </div>
      </div>

      <div class="col-6" v-if="msg.type ==='image'">
        <img :src="msg.content" alt="image" class="w-100"/>
      </div>

      <div class="col-6" v-if="msg.sender?.id !== userStore.user.id"></div>
    </div>
  </div>

  <form id="reply" class="p-3 w-100" @submit.prevent="submit">
    <div class="input-group">
      <upload/>
      <input class="form-control" placeholder="Write a message" v-model="message"/>
    </div>
  </form>
</template>

<style scoped>

</style>
