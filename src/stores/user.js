import {defineStore} from "pinia";
import {computed, ref} from "vue";


export const useUserStore = defineStore('user', () => {
    const user = ref({
        first_name: '',
        last_name: '',
        email: '',
    });

    const full_name = computed(() => user.value.first_name + " " + user.value.last_name)

    const setUser = (usr) => {
        user.value = usr;
    }

    return {user, full_name, setUser}
})
