<script setup lang="ts">
import { ref, defineEmits } from 'vue';

interface IEmits {
    (eventName: 'size_of_circle-select', size_of_circle: number): void;
}
const emits = defineEmits<IEmits>();

let isSelected = ref(false);

function selectSizeOfCircle(size_of_circle: number) {
    emits('size_of_circle-select', size_of_circle);
}

</script>
<template>
    <h6 class="text-h2 text-center q-pt-md">
        {{ `Select the size of cicle` }}
    </h6>
    <div class="q-pa-lg" style="display:flex; justify-content: center;">
        <div class="row q-gutter-xl">
            <q-btn
                v-model="isSelected"
                class="text-h4"
                label="5mm"
                padding="60px"
                rounded
                @click="selectSizeOfCircle(10)"
            />
            <q-btn
                v-model="isSelected"
                class="text-h4"
                label="20mm"
                padding="60px"                
                rounded
                @click="selectSizeOfCircle(40)"
            />
        </div>
    </div>
</template>
