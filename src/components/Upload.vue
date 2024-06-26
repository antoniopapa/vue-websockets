<script setup>

import {useRoute} from "vue-router";
import axios from "axios";

const route = useRoute();
const upload = async (files) => {
  if (files === null) return;
  const file = files.item(0);

  const formData = new FormData();
  formData.append("image", file);

  await axios.post(`rooms/${route.params.id}/images`, formData);
}

</script>

<template>
  <div class="input-group-prepend">
    <input type="file" class="d-none" id="inputFile" @change="upload($event.target.files)" />
    <label class="input-group-text" for="inputFile">Choose File</label>
  </div>
</template>

<style scoped>

</style>
