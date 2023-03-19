<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, defineProps, defineEmits, onBeforeMount, watch } from 'vue';

const $q = useQuasar();

interface IProps {
    sizeOfCirlce: number;
}
const props = defineProps<IProps>();

interface IEmits {
    (eventName: 'show-result', reactionTime: number): void;
}
const emits = defineEmits<IEmits>();

let randomDelay = ref();
let isHover = ref(false);
let showCircle = ref(false);

let dateCircleAppears = ref();
let dateKeyDown = ref();

let circleSize = ref();

onBeforeMount(() => {
    randomDelay.value = generateDelay();

    circleSize.value = `${props.sizeOfCirlce}px`; 
});

function generateDelay(): number {
    return Math.floor(Math.random() * 4 + 1);
}

function onKeyPress(): void {
    if (showCircle.value && !isHover.value) {
        dateKeyDown.value = new Date();
        showResults();
    }
}

function displayCircle(): void {
    if (isHover.value) {
        dateCircleAppears.value = new Date();
        showCircle.value = true;
    }
}

function showResults(): void {
    emits('show-result', dateKeyDown.value - dateCircleAppears.value);

    clear();
}

function clear(): void {
    dateCircleAppears.value = null as unknown as number;
    dateKeyDown.value = null as unknown as number;
    randomDelay.value = null as unknown as number;
}

watch(isHover, (newValue, oldValue) => {
    if (newValue === true) {
        setTimeout(displayCircle, randomDelay.value * 1000);
    }
    if (newValue === false && !showCircle.value) {
        $q.notify({
            type: 'negative',
            message: `Too early. Try one more time.`,
            multiLine: true,
            position: 'top-right',
        });
    }
});
</script>

<template>
    <h6 class="text-h2 text-center">
        {{ `Action Pane` }}
    </h6>
    <h6 class="text-h5 text-center">
        {{ `Hold the cursor on the blue circle before for red circle's appearing. Press the red circle after it.` }}
    </h6>
    <div class="box">
        <div id="bottom-left" class="q-pa-sm">
            <q-btn color="blue" round size="10px">
                <q-tooltip v-model="isHover">Wait</q-tooltip>
            </q-btn>
        </div>
        <div v-if="showCircle" id="bottom-right" class="q-pa-sm">
            <q-btn color="red" round :size="circleSize" @click="onKeyPress"/>
        </div>
    </div>
</template>
<style scoped>
    #bottom-left {
        position: absolute;
        bottom: 0;
        left: 0;
    }
    #bottom-right {
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .box {
        width: 100%;
    }
</style>