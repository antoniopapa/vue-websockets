import {createRouter, createWebHistory} from 'vue-router'
import ChatView from "@/views/ChatView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/register',
            component: RegisterView
        },
        {
            path: '/login',
            component: LoginView
        },
        {
            path: '/',
            component: ChatView
        }
    ]
})

export default router
