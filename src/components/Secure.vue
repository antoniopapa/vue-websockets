<script setup>

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import {useUserStore} from "@/stores/user.js";

const router = useRouter();
const userStore = useUserStore();

onMounted(async () => {
  try {
    const {data} = await axios.get('user');
    userStore.setUser(data);
  } catch (e) {
    await router.push('/login');
  }
})

</script>

<template>
  <header class="d-flex justify-content-end py-3">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link to="/account" class="nav-link active">{{ userStore.full_name }}</router-link>
      </li>
    </ul>
  </header>

  <router-view/>
</template>

<style scoped>

</style>
