<script setup>

import axios from "axios";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";

const router = useRouter()

const users = ref([]);
const title = ref('');
const members = ref([]);

onMounted(async () => {
  const {data} = await axios.get('users');
  users.value = data;
})

const updateMembers = (e) => {
  if (e.target.checked) {
    members.value = [...members.value, e.target.value]
  } else {
    members.value = members.value.filter(m => m !== e.target.value)
  }
}

const submit = async () => {
  await axios.post('rooms', {
    title: title.value,
    members: members.value
  });
  await router.push('/');
}
</script>

<template>
  <main class="form-signin w-100 m-auto">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Create Room</h1>

      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input class="form-control" id="title" placeholder="Title" name="title" v-model="title"/>
      </div>

      <div class="mb-3">
        <p>Members</p>
        <div class="form-check" v-for="user of users">
          <input class="form-check-input" type="checkbox" name="members" :id="`check${user.id}`" :value="user.id"
                 @change="updateMembers"
          />
          <label class="form-check-label" :for="`check${user.id}`">{{ user.first_name }} {{ user.last_name }}</label>
        </div>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
  </main>
</template>

<style scoped>

</style>
