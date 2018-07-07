import './main.css';

import Vue from 'vue';
import App from './vue/App.vue';

const vue = new Vue({ el: '#root', render: h => h(App) });

export default vue;
