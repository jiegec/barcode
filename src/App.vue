<script setup lang="ts">
import Code from '@/components/Code.vue'
import { ref, computed } from 'vue'

// 13-digit data
// https://book.douban.com/subject/26912767/
const data = ref('9787111544937');

const int_data = computed(() => {
  let res: number[] = [];
  for (let element of data.value) {
    let val = parseInt(element);
    if (isNaN(val)) {
      break;
    }
    res.push(val);
  }

  // pad zeroes
  while (res.length < 13) {
    res.push(0);
  }
  return res;
})

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

const first_digit = computed(() => int_data.value[0]!);
const encoding = computed(() => first_digit_mapping[first_digit.value]!);

function code_at(i: number): string {
  const kind = encoding.value[i]!;
  const digit = int_data.value[i + 1]!;
  if (kind === 'L') return l_mapping[digit]!;
  if (kind === 'G') return g_mapping[digit]!;
  return r_mapping[digit]!;
}

function text_at(i: number): string {
  return int_data.value[i + 1]!.toString() + encoding.value[i]!;
}

</script>

<template>
  <h1>{{ $t('title') }}</h1>
  <form>
    <label for="locale-select">{{ $t('language') }}</label>
    <select id="locale-select" v-model="$i18n.locale">
      <option value="en">English</option>
      <option value="zh">简体中文</option>
    </select>
  </form>
  <div>
    {{ $t('input') }}
    <input v-model="data" />
  </div>
  <!-- https://en.wikipedia.org/wiki/International_Article_Number#Binary_encoding_of_data_digits_into_EAN-13_barcode -->
  <div>
    {{ $t('steps') }}
  </div>
  <div>
    {{ $t('step1') }}
  </div>
  <div>
    {{ $t('step1_detail', { first: first_digit, encoding }) }}
  </div>
  <div>
    {{ $t('step2') }}
  </div>
  <div>
    {{ $t('l_code') }}
  </div>
  <div>
    <Code v-for="i in Array(10).keys()" style="margin-left: 20px" :code="l_mapping[i]!"
      :text="i.toString()" :padding_left="true" :padding_right="true" />
  </div>
  <div>
    {{ $t('g_code') }}
  </div>
  <div>
    <Code v-for="i in Array(10).keys()" style="margin-left: 20px" :code="g_mapping[i]!"
      :text="i.toString()" :padding_left="true" :padding_right="true" />
  </div>
  <div>
    {{ $t('r_code') }}
  </div>
  <div>
    <Code v-for="i in Array(10).keys()" style="margin-left: 20px" :code="r_mapping[i]!"
      :text="i.toString()" :padding_left="true" :padding_right="true" />
  </div>
  <div>
    {{ $t('code_desc') }}
  </div>
  <div>
    {{ $t('result') }}
  </div>
  <div>
    <Code v-for="i in Array(12).keys()" :code="code_at(i)" :text="text_at(i)" :padding_left="true"
      :padding_right="true" />
  </div>
  <div>
    {{ $t('step3') }}
  </div>
  <div>
    <Code code="101" text="S" height="180" :padding_left="true" />
    <Code v-for="i in [0, 1, 2, 3, 4, 5]" :code="code_at(i)" :text="text_at(i)" />
    <Code code="01010" text="C" height="180" />
    <Code v-for="i in [6, 7, 8, 9, 10, 11]" :code="code_at(i)" :text="text_at(i)" />
    <Code code="101" text="E" height="180" :padding_right="true" />
  </div>
  <div>
    {{ $t('profit') }}
  </div>
</template>
