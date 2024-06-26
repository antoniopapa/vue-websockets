<script setup>

import {onMounted, ref, watch} from "vue";
import axios from "axios";

const rooms = ref([]);
const search = ref('')

const load = async () => {
  const {data} = await axios.get(`rooms?name=${search.value}`);
  rooms.value = data;
}

onMounted(() => load());

watch(search, () => load());

const showDate = (last_message) => {
  if (last_message === null){
    return ""
  }

  return new Date(last_message.created_at).toLocaleDateString('en-US', {
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric'
  })
}

const showLastMessage = (last_message) => {
  if (last_message === null){
    return ""
  }

  if (last_message.type === 'image'){
    return "image";
  }

  return last_message.content;
}

</script>

<template>
  <div class="row">
    <div class="col-3 vh-100">
      <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
        <div class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
          <input class="form-control" placeholder="Search..." v-model="search" />
        </div>

        <div class="list-group list-group-flush border-bottom scrollarea">
          <router-link v-for="room of rooms" :to="`/rooms/${room.id}`" class="list-group-item list-group-item-action py-3 lh-sm">
            <div class="d-flex w-100 align-items-center justify-content-between">
              <strong class="mb-1">{{room.title}}</strong>
              <small class="text-body-secondary">{{showDate(room.last_message)}}</small>
            </div>
            <div class="col-10 mb-1 small">{{showLastMessage(room.last_message)}}</div>
          </router-link>

          <router-link to="/rooms/create" class="btn btn-primary my-2">Create Room</router-link>
        </div>
      </div>
    </div>

    <div class="col-9 border">
      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>
