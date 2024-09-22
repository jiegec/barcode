<script setup lang="ts">
const props = defineProps<{ code: string, text: string, height?: string, padding_left?: boolean, padding_right?: boolean }>();
const actual_height = props.height ? parseInt(props.height) : 150;
const actual_padding_left = props.padding_left ? 8 : 0;
const width = props.code.length * 8 + actual_padding_left + (props.padding_right ? 8 : 0);
</script>

<template>
  <svg :width="width" :height="220">
    <rect width="100%" height="100%" fill="white" />
    <line :x1="j * 8 + 4 + actual_padding_left" y1="10" :x2="j * 8 + 4 + actual_padding_left" :y2="actual_height"
      stroke-width="8" :stroke="parseInt(code[j]) ? `black` : `white`" v-for="j in Array(7).keys()" />
    <text :x="width / 2" :y="200" text-anchor="middle">{{ text }}</text>
    <text :x="width / 2" :y="210" text-anchor="middle" font-size="10px">{{ code }}</text>
  </svg>
</template>