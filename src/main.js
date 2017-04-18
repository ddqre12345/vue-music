import Vue from 'vue';
import store from './store';
import VueRouter from 'vue-router';
import infiniteScroll from 'vue-infinite-scroll';  // 引入滑动模块
import VueLazyload from 'vue-lazyload';  // 引入图片懒加载模块
import App from './App';
import routes from './routers';
import {loadFromlLocal} from './common/js/store'; // 公共方法：本地缓存
// 注册为全局组件
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'assets/theme.less';
Vue.use(VueRouter);
Vue.use(MuseUI);
Vue.use(infiniteScroll);
// error，loading是图片路径, 用require引入
Vue.use(VueLazyload, {
    error: require('./assets/404.png'),
    loading: require('./assets/loading.jpg'),
    attempt: 1
  }
);

const router = new VueRouter({
  mode: 'history',
  'linkActiveClass': 'active',
  routes // （缩写）相当于 routes: routes
});
/**
 * 创建和挂载根实例。
 * 记得要通过 router 配置参数注入路由，
 * 从而让整个应用都有路由功能
 */
const routerApp = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

/**
 * loadFromlLocal()是读取本地缓存数据，具体common/js/store.js 查看
 *
 *
 */
if (!loadFromlLocal('music', 'find', false)) {
  router.push('/find');
}

export default routerApp;
