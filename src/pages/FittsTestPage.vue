<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';

const SizeSelector = defineAsyncComponent(() => import('@/components/fitts/SizeSelector.vue'));
const ActionPane = defineAsyncComponent(() => import('@/components/fitts/ActionPane.vue'));
const ResultPane = defineAsyncComponent(() => import('@/components/fitts/ResultPane.vue'));

let color = ref('');
let sizeOfCircle = ref(0);
let isSizeOfCircleSelected = ref(false);

let reactionTime = ref();

function sizeOfCircleSelection(size_of_circle: number): void {
    sizeOfCircle.value = size_of_circle;
    isSizeOfCircleSelected.value = true;
}

function showResult(time: number): void {
    reactionTime.value = time;

    isSizeOfCircleSelected.value = false;
}

function clear(): void {
    reactionTime.value = null;
    isSizeOfCircleSelected.value = false;

}
</script>
<template>
    <SizeSelector
        v-if="!isSizeOfCircleSelected && !reactionTime"
        @size_of_circle-select="sizeOfCircleSelection"
    />
    <ActionPane
        v-if="isSizeOfCircleSelected && !reactionTime"
        :sizeOfCirlce="sizeOfCircle"
        @show-result="showResult"
    />
    <ResultPane
        v-if="reactionTime"
        :reaction-time="reactionTime"
        @clear="clear"
    />
</template>
