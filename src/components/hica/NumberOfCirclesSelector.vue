<script setup lang="ts">
import { ref, defineEmits } from 'vue';

interface IEmits {
    (eventName: 'number_of_circles-select', number_of_circles: number): void;
}
const emits = defineEmits<IEmits>();

let isSelected = ref(false);

function selectNumberOfCircles(number_of_circles: number) {
    emits('number_of_circles-select', number_of_circles);
}

</script>
<template>
    <h6 class="text-h2 text-center q-pt-md">
        {{ `Select the number of circles` }}
    </h6>
    <div class="q-pa-lg" style="display:flex; justify-content: center;">
        <div class="row q-gutter-xl">
            <q-btn
                v-model="isSelected"
                label="1"
                class="text-h4"
                padding="60px"
                rounded
                @click="selectNumberOfCircles(1)"
            />
            <q-btn
                v-model="isSelected"
                label="2"
                class="text-h4"
                padding="60px"
                rounded
                @click="selectNumberOfCircles(2)"
            />
            <q-btn
                v-model="isSelected"
                label="4"
                class="text-h4"
                padding="60px"
                rounded
                @click="selectNumberOfCircles(4)"
            />
            <q-btn
                v-model="isSelected"
                label="8"
                class="text-h4"
                padding="60px"
                rounded
                @click="selectNumberOfCircles(8)"
            />
        </div>
    </div>
</template>
