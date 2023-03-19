<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, defineProps, defineEmits, onBeforeMount } from 'vue';

const $q = useQuasar();

interface IProps {
    numberOfCircles: number;
    color: string;
}
const props = defineProps<IProps>();

interface IEmits {
    (eventName: 'show-result', generalReactionTime: number, mechanicalReactionTime: number): void;
}
const emits = defineEmits<IEmits>();

let randomDelay = ref();
let randomCircle = ref(0);
let isSpacePressed = ref(false);
let showCircles = ref(false);

let dateCircleAppears = ref();
let dateSpaceKeyUp = ref();
let dateKeyDown = ref();

let selectedCircleStyle = ref();

onBeforeMount(() => {
    randomCircle.value = generateRandomCircle();
    randomDelay.value = generateDelay();
    selectedCircleStyle.value = `background-color: ${props.color};`; 

    window.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            delayStart();
        }

        if (e.key === randomCircle.value.toString()) {
            onKeyDown();
        }
    });
    window.addEventListener('keyup', (e) => {
        if (e.key === ' ') {
            onSpaceKeyUp();
        }
    });
});

function generateDelay(): number {
    return Math.floor(Math.random() * 4 + 1);
}

function generateRandomCircle(): number {
    return Math.floor(Math.random() * props.numberOfCircles + 1);
}

function delayStart(): void {
    if (!isSpacePressed.value) {
        isSpacePressed.value = true;

        setTimeout(displayCircles, randomDelay.value * 1000);
    }
}

function onSpaceKeyUp(): void {
    if (!showCircles.value) {
        $q.notify({
            type: 'negative',
            message: `Too early. Try one more time.`,
            multiLine: true,
            position: 'top-right',
        });
    } else {
        dateSpaceKeyUp.value = new Date();
    }

    isSpacePressed.value = false;
}

function onKeyDown(): void {
    if (showCircles.value && !isSpacePressed.value) {
        dateKeyDown.value = new Date();
        showResults();
    }
}

function displayCircles(): void {
    if (isSpacePressed.value) {
        dateCircleAppears.value = new Date();
        showCircles.value = true;
    }
}

function showResults(): void {
    emits('show-result', dateKeyDown.value - dateCircleAppears.value, dateSpaceKeyUp.value - dateCircleAppears.value);

    clear();
}

function clear(): void {
    dateCircleAppears.value = null as unknown as number;
    dateSpaceKeyUp.value = null as unknown as number;
    dateKeyDown.value = null as unknown as number;
    randomDelay.value = null as unknown as number;
    isSpacePressed.value = false;
    showCircles.value = false;
}
</script>

<template>
    <h6 class="text-h2 text-center">
        {{ `Action Pane` }}
    </h6>
    <h6
        v-if="!isSpacePressed && !showCircles"
        class="text-h5 text-center"
    >
        {{ `Hold down the 'space' button before for circles appearing. Press "number of the circle, which change the color" after it.` }}
    </h6>
    <div v-if="showCircles" style="display:flex;">
        <div v-for="n in props.numberOfCircles" :key="n">
            <span v-if="n === randomCircle" class="circle" :style="selectedCircleStyle">{{ n }}</span>
            <span v-else class="q-mr-xl circle">{{ n }}</span>
        </div>
    </div>
</template>
<style scoped>
      span.circle {
        background: #e3e3e3;
        border-radius: 50%;
        display: inline-block;
        font-weight: bold;
        line-height: 75px;
        margin-right: 25px;
        text-align: center;
        width: 75px;
      }
</style>