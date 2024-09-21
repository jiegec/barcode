<script setup lang="ts">
import Code from './components/Code.vue'
import { ref } from 'vue'

// 13-digit data
// https://book.douban.com/subject/26912767/
const data = ref('9787111544937');

// first digit mapping
const first_digit_mapping = [
  'LLLLLLRRRRRR',
  'LLGLGGRRRRRR',
  'LLGGLGRRRRRR',
  'LLGGGLRRRRRR',
  'LGLLGGRRRRRR',
  'LGGLLGRRRRRR',
  'LGGGLLRRRRRR',
  'LGLGLGRRRRRR',
  'LGLGGLRRRRRR',
  'LGGLGLRRRRRR',
];

const l_mapping = [
  '0001101',
  '0011001',
  '0010011',
  '0111101',
  '0100011',
  '0110001',
  '0101111',
  '0111011',
  '0110111',
  '0001011'
];

const g_mapping = [
  '0100111',
  '0110011',
  '0011011',
  '0100001',
  '0011101',
  '0111001',
  '0000101',
  '0010001',
  '0001001',
  '0010111'
];

const r_mapping = [
  '1110010',
  '1100110',
  '1101100',
  '1000010',
  '1011100',
  '1001110',
  '1010000',
  '1000100',
  '1001000',
  '1110100'
];

</script>

<template>
  <h1>EAN-13 Barcode Generator</h1>
  <div>
    Enter 13-digit number:
    <input v-model="data" />
  </div>
  <!-- https://en.wikipedia.org/wiki/International_Article_Number#Binary_encoding_of_data_digits_into_EAN-13_barcode -->
  <div>
    Steps:
  </div>
  <div>
    Step 1. Determine the encoding of the last 12 digits using the first digit:
  </div>
  <div>
    The first digit is {{ data[0] }}, so the encoding of the last 12 digits are "{{ first_digit_mapping[data[0]] }}".
  </div>
  <div>
    Step 2. Encode the last 12 digits using L/G/R-code:
  </div>
  <div>
    L-code:
  </div>
  <div>
    <Code v-for="i in Array(10).keys()" style="margin-left: 20px" :code="l_mapping[i]" :text="i.toString()"
      :padding_left="true" :padding_right="true" />
  </div>
  <div>
    G-code:
  </div>
  <div>
    <Code v-for="i in Array(10).keys()" style="margin-left: 20px" :code="g_mapping[i]" :text="i.toString()"
      :padding_left="true" :padding_right="true" />
  </div>
  <div>
    R-code:
  </div>
  <div>
    <Code v-for="i in Array(10).keys()" style="margin-left: 20px" :code="r_mapping[i]" :text="i.toString()"
      :padding_left="true" :padding_right="true" />
  </div>
  <div>
    G-code and R-code are mirrored. L-code and R-code are complement.
  </div>
  <div>
    Result:
  </div>
  <div>
    <Code v-for="i in Array(12).keys()"
      :code="first_digit_mapping[data[0]][i] === 'L' ? l_mapping[data[i + 1]] : (first_digit_mapping[data[0]][i] === 'G' ? g_mapping[data[i + 1]] : r_mapping[data[i + 1]])"
      :text="data[i + 1].toString() + first_digit_mapping[data[0]][i]" :padding_left="true" :padding_right="true" />
  </div>
  <div>
    Step 3. Add start(S)/center(C)/end(E) markers:
  </div>
  <div>
    <Code code="101" text="S" height="180" :padding_left="true" />
    <Code v-for="i in [0, 1, 2, 3, 4, 5]"
      :code="first_digit_mapping[data[0]][i] === 'L' ? l_mapping[data[i + 1]] : (first_digit_mapping[data[0]][i] === 'G' ? g_mapping[data[i + 1]] : r_mapping[data[i + 1]])"
      :text="data[i + 1].toString() + first_digit_mapping[data[0]][i]" />
    <Code code="01010" text="C" height="180" />
    <Code v-for="i in [6, 7, 8, 9, 10, 11]"
      :code="first_digit_mapping[data[0]][i] === 'L' ? l_mapping[data[i + 1]] : (first_digit_mapping[data[0]][i] === 'G' ? g_mapping[data[i + 1]] : r_mapping[data[i + 1]])"
      :text="data[i + 1].toString() + first_digit_mapping[data[0]][i]" />
    <Code code="101" text="E" height="180" :padding_right="true" />
  </div>
  <div>
    Profit!
  </div>
</template>
