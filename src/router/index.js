import {createRouter, createWebHistory} from 'vue-router'
import ChatView from "@/views/ChatView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import Secure from "@/components/Secure.vue";
import AccountView from "@/views/AccountView.vue";
import Layout from "@/components/Layout.vue";
import RoomCreateView from "@/views/RoomCreateView.vue";

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
            path: '',
            component: Secure,
            children: [
                {
                    path: '/account',
                    component: AccountView
                },
                {
                    path: '/rooms/create',
                    component: RoomCreateView
                },
                {
                    path: '',
                    component: Layout,
                    children: [
                        {
                            path: '/rooms/:id',
                            component: ChatView
                        }
                    ]
                }
            ]
        }
    ]
})

export default router
