import {ref} from 'vue';

export function useCounter(initValue = 0) {
    const count = ref<number>(initValue)

    const increament = () => {
        count.value++;
    }

    const decreament = () => {
        count.value--;
    }

    const clean = () => {
        count.value = 0;
    }

    return {
        count,increament,decreament,clean
    }
}