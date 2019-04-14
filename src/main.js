import Vue from 'vue';
import store from './vuex';
import VueRouter from 'vue-router';
import VueLazyload from 'vue-lazyload';  // 引入图片懒加载模块
import App from './App';
import routes from './routers';

const isDebug_mode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

// 注册为全局组件
Vue.use(VueRouter);
// error，loading是图片路径, 用require引入
Vue.use(VueLazyload, {
    error: 'https://raw.githubusercontent.com/ddqre12345/ddqre12345.github.io/master/project/vue-music/404.png',
    loading: 'https://raw.githubusercontent.com/ddqre12345/ddqre12345.github.io/master/project/vue-music/loading.jpg',
    attempt: 1
  }
);

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition;
  } else {
    let position = {};
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash;
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0;
      position.y = 0;
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position;
  }
};

const router = new VueRouter({
  // mode: 'history',
  'linkActiveClass': 'active',
  routes, // （缩写）相当于 routes: routes
  scrollBehavior
});

/**
 * 创建和挂载根实例。
 * 记得要通过 router 配置参数注入路由，
 * 从而让整个应用都有路由功能
 */
const routerApp = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

export default routerApp;
