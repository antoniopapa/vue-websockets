<script setup>

import axios from "axios";
import {useRouter} from "vue-router";

const router = useRouter()

const submit = async (e) => {
  const form = new FormData(e.target);
  const inputs = Object.fromEntries(form.entries());
  const {data} = await axios.post('login', inputs);
  localStorage.setItem("token", data["jwt"]);
  axios.defaults.headers["Authorization"] = `Bearer ${data["jwt"]}`;
  await router.push('/');
}
</script>

<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please Login</h1>

      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" placeholder="name@example.com" name="email"/>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input id="password" type="password" class="form-control" name="password"/>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
  </main>
</template>

<style scoped>

</style>
