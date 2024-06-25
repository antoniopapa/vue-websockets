<script setup>

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";

const router = useRouter();
const user = ref(null);

onMounted(async () => {
  try {
    const {data} = await axios.get('user');
    user.value = data
  } catch (e) {
    await router.push('/login');
  }
})

</script>

<template>
  <header class="d-flex justify-content-end py-3">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link to="/account" class="nav-link active">{{ user?.first_name }} {{ user?.last_name }}</router-link>
      </li>
    </ul>
  </header>

  <router-view/>
</template>

<style scoped>

</style>
