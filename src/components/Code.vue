<script setup lang="ts">
const props = defineProps<{ code: string, text: string, height?: string, padding_left?: boolean, padding_right?: boolean }>();
const actual_height = props.height ? parseInt(props.height) : 150;
const width = props.code.length * 4 + (props.padding_left ? 2 : 0) + (props.padding_right ? 2 : 0);
</script>

<template>
  <svg :width="width" :height="220">
    <rect width="100%" height="100%" fill="white" />
    <line :x1="j * 4 + 2 + (padding_left ? 2 : 0)" y1="10" :x2="j * 4 + 2 + (padding_left ? 2 : 0)" :y2="actual_height" stroke-width="4" :stroke="parseInt(code[j]) ? `black` : `white`" v-for="j in Array(7).keys()" />
    <text :x="width / 2" :y="200" text-anchor="middle">{{ text }}</text>
    <text :x="width / 2" :y="210" text-anchor="middle" font-size="5px">{{ code }}</text>
  </svg>
</template>