<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface IProps {
    reactionTime: number;
}
const props = defineProps<IProps>();

interface IEmits {
    (eventName: 'clear'): void;
}
const emits = defineEmits<IEmits>();

function clear(): void {
    emits('clear');
}
</script>

<template>
    <h6 class="text-h2 text-center">
        {{ `Results` }}
    </h6>
    <h6 class="text-h5 text-center">
        {{ `Reaction Time: ${props.reactionTime}` }}
    </h6>
    <div class="q-pa-lg" style="display:flex; justify-content: center;">
        <q-btn
            label="Try one more time"
            size="lg"
            @click="clear"
        />
    </div>
</template>
