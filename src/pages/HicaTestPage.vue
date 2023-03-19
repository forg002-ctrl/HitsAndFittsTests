<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';

const NumberOfCirclesSelector = defineAsyncComponent(() => import('@/components/hica/NumberOfCirclesSelector.vue'));
const ColorSelector = defineAsyncComponent(() => import('@/components/hica/ColorSelector.vue'));
const ActionPane = defineAsyncComponent(() => import('@/components/hica/ActionPane.vue'));
const ResultPane = defineAsyncComponent(() => import('@/components/hica/ResultPane.vue'));

let color = ref('');
let numberOfCircles = ref(0);
let isNumberOfCirclesSelected = ref(false);
let isColorSelected = ref(false);

let generalTime = ref();
let mechanicalTime = ref();

function numberOfCirclesSelection(number: number): void {
    numberOfCircles.value = number;
    isNumberOfCirclesSelected.value = true;
}

function colorSelection(selectedColor: string): void {
    color.value = selectedColor;
    isColorSelected.value = true;
}

function showResult(generalReactionTime: number, mechanicalReactionTime: number): void {
    generalTime.value = generalReactionTime;
    mechanicalTime.value = mechanicalReactionTime;

    isNumberOfCirclesSelected.value = false;
    isColorSelected.value = false;
}

function clear(): void {
    generalTime.value = null;
    mechanicalTime.value = null;
    isNumberOfCirclesSelected.value = false;
    isColorSelected.value = false;
}
</script>
<template>
    <NumberOfCirclesSelector
        v-if="!isNumberOfCirclesSelected &&  !isColorSelected && !generalTime && !mechanicalTime"
        @number_of_circles-select="numberOfCirclesSelection"
    />
    <ColorSelector
        v-if="isNumberOfCirclesSelected && !isColorSelected && !generalTime && !mechanicalTime"
        @color-select="colorSelection"
    />
    <ActionPane
        v-if="isNumberOfCirclesSelected && isColorSelected && !generalTime && !mechanicalTime"
        :number-of-circles="numberOfCircles"
        :color="color"
        @show-result="showResult"
    />
    <ResultPane
        v-if="generalTime && mechanicalTime"
        :general-reaction-time="generalTime"
        :mechanical-reaction-time="mechanicalTime"
        @clear="clear"
    />
</template>
