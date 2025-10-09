import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

//导入路由配置
import router from './router';
app.use(router);

//引用ElementPlus的CSS文件，否则MacOS系统会出现控件丢失样式
import 'element-plus/dist/index.css';

//导入ElementUI组件库
import ElementPlus from 'element-plus';

//为了让日历控件每周从星期一开始，所以要导入简体中文场景
import locale from 'element-plus/lib/locale/lang/zh-CN';

//把ElementUI组件库整合到VUE框架上
app.use(ElementPlus, {
    locale
});

//为了可以使用ElementPlus自带的图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount('#app');
