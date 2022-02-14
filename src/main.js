import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
// 必要引用
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// // 根據 icon 的種類引用
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { faGooglePlus } from '@fortawesome/free-brands-svg-icons';

// 匯入 vee-validate 主套件
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
// 匯入 vee-validate 相關規則
import {
  required, email, min,
} from '@vee-validate/rules';
// 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n';
// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// 要在vee-validate之後
import App from './App.vue';
import router from './router';
import store from './store';

library.add(fas);

// 定義驗證規則
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
// defineRule('alpha_num', alpha_num);

// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

const app = createApp(App).use().use(store).use(router);

// 註冊 vee-validate 三個全域元件
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);

// fontawesome
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
