<script setup>

import {onMounted, ref, watch} from "vue";
import axios from "axios";

const users = ref([]);
const search = ref('')

const load = async () => {
  const {data} = await axios.get(`users?name=${search.value}`);
  users.value = data;
}

onMounted(() => load());

watch(search, () => load());

</script>

<template>
  <div class="row">
    <div class="col-3 vh-100">
      <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
        <div class="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
          <input class="form-control" placeholder="Search..." v-model="search" />
        </div>

        <div class="list-group list-group-flush border-bottom scrollarea">
          <router-link v-for="user of users" :to="`/users/${user.id}`" class="list-group-item list-group-item-action py-3 lh-sm">
            <div class="d-flex w-100 align-items-center justify-content-between">
              <strong class="mb-1">{{user.first_name}} {{user.last_name}}</strong>
              <small class="text-body-secondary"></small>
            </div>
            <div class="col-10 mb-1 small"></div>
          </router-link>
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
