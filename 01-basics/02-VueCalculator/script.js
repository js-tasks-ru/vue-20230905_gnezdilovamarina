import { first } from 'lodash';
import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение

const App = defineComponent({
  name: 'App',
  data() {
    return {
      firstOperand: null,
      secondOperand: null,
      operator: '',
    };
  },
  computed: {
 // не понимаю как реализовать вариант, где не вызывается метод в шаблоне. Можете подсказать, пжд, как реализовать такое решение
    res() {
      if (this.operator === 'sum') {
        return +this.firstOperand + +this.secondOperand;
      }
      if (this.operator === 'subtract') {
        return this.firstOperand - this.secondOperand;
      }
      if (this.operator === 'multiply') {
        return this.firstOperand * this.secondOperand;
      }
      if (this.operator) {
        return this.firstOperand / this.secondOperand;
      } else {
        return ' ';
      }
    },   
  },
  methods: {
    
  }
});

const app = createApp(App);
const vm = app.mount('#app');

window.vm = vm;
