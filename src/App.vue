<script setup>
import 'bootstrap/dist/css/bootstrap.min.css';
import {ref} from "vue";
import axios from "axios";
import {io} from "socket.io-client";

const socket = io('http://localhost:8080/', {});

const message = ref('');
const messages = ref([]);

socket.on('message', (msg) => {
  messages.value = [...messages.value, msg]
})

const submit = async () => {
  await axios.post('http://localhost:8000/api/message', {
    message: message.value
  })

  message.value = '';
}
</script>

<template>

  <div class="container">
    <div class="row">
      <div class="col-3 vh-100">
        <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary">
          <div class="list-group list-group-flush border-bottom scrollarea">
            <a href="#" class="list-group-item list-group-item-action py-3 lh-sm">
              <div class="d-flex w-100 align-items-center justify-content-between">
                <strong class="mb-1">Jane Smith</strong>
                <small class="text-body-secondary">Tues</small>
              </div>
              <div class="col-10 mb-1 small">Last Message</div>
            </a>
          </div>
        </div>
      </div>
      <div class="col-9 border">
        <div id="head" class="py-3 lh-sm border-bottom">
          <strong class="mb-1">John Doe, Jane Smith</strong>
        </div>

        <div id="conversation">
          <div class="row pt-2" v-for="msg of messages">
            <div class="col-6">
              <div class="alert alert-success d-inline-block" role="alert">
                {{ msg }}
              </div>
            </div>
            <div class="col-6"></div>
          </div>

          <!--          <div class="row pt-2">-->
          <!--            <div class="col-6"></div>-->
          <!--            <div class="col-6">-->
          <!--              <div class="alert alert-primary d-inline-block float-end" role="alert">-->
          <!--                Hello There-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>

        <form id="reply" class="p-3 w-100" @submit.prevent="submit">
          <div class="input-group">
            <input class="form-control" placeholder="Write a message" v-model="message"/>
          </div>
        </form>
      </div>
    </div>

  </div>

</template>

<style scoped>

</style>
