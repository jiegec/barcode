import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      language: 'Select Language: ',
      title: 'EAN-13 Barcode Generator',
      input: 'Enter 13-digit number: ',
      steps: 'Steps:',
      step1: 'Step 1. Determine the encoding of the last 12 digits using the first digit:',
      step1_detail: 'The first digit is {first}, so the encoding of the last 12 digits are "{encoding}".',
      step2: 'Step 2. Encode the last 12 digits using L/G/R-code:',
      step3: 'Step 3. Add start(S)/center(C)/end(E) markers:',
      l_code: 'L-code:',
      g_code: 'G-code:',
      r_code: 'R-code:',
      code_desc: 'G-code and R-code are mirrored. L-code and R-code are complement.',
      result: 'Result:',
      profit: 'Profit!',
    },
    zh: {
      language: '切换语言：',
      title: 'EAN-13 条形码生成器',
      input: '输入 13 位数字：',
      steps: '步骤：',
      step1: '第一步，根据第一位数字决定后十二位数字的编码：',
      step1_detail: '第一位数字是 {first}，因此后十二位数字的编码是 "{encoding}"。',
      step2: '第二步，按照 L/G/R 三种方式编码后十二位数字：',
      step3: '第三步，添加起始（S）、中央（C）和结尾（E）标记：',
      l_code: 'L 编码：',
      g_code: 'G 编码：',
      r_code: 'R 编码：',
      code_desc: 'G 编码和 R 编码是镜像的关系。L 编码和 R 编码是互补的关系。',
      result: '结果：',
      profit: '成功！',
    }
  }
});

const app = createApp(App);

app.use(i18n);
app.mount('#app');
