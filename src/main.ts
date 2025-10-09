import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

//导入路由配置
import router from './router';
app.use(router);

//导入SVG依赖库，可以在页面上显示SVG图片（此处为新增）
import 'virtual:svg-icons-register';

//引用ElementPlus的CSS文件，否则MacOS系统会出现控件丢失样式
import 'element-plus/dist/index.css';
  
//导入ElementUI的消息通知组件，后续定义Ajax函数中需要用到弹窗展现提示信息
import ElementPlus from 'element-plus';
  
//为了让日历控件每周从星期一开始，所以要导入简体中文场景
import locale from 'element-plus/lib/locale/lang/zh-CN';

//应用到VUE框架上
app.use(ElementPlus, {
    locale
});

//为了可以使用ElementPlus自带的图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount('#app');
