<script setup>

import axios from "axios";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user.js";

const router = useRouter()
const userStore = useUserStore();

const submit = async (e) => {
  const form = new FormData(e.target);
  const inputs = Object.fromEntries(form.entries());
  await axios.put('user', inputs);
  await router.push('/');
}
</script>

<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please update your info</h1>

      <div class="mb-3">
        <label for="first_name" class="form-label">First Name</label>
        <input class="form-control" id="first_name" placeholder="First Name" name="first_name" v-model="userStore.user.first_name"/>
      </div>

      <div class="mb-3">
        <label for="last_name" class="form-label">Last Name</label>
        <input class="form-control" id="last_name" placeholder="Last Name" name="last_name" v-model="userStore.user.last_name"/>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" placeholder="name@example.com" name="email"  v-model="userStore.user.email"/>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input id="password" type="password" class="form-control" name="password"/>
      </div>

      <div class="mb-3">
        <label for="password_confirm" class="form-label">Password Confirm</label>
        <input id="password_confirm" type="password" class="form-control" name="password_confirm"/>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
  </main>
</template>

<style scoped>

</style>
