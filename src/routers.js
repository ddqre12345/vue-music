// require.ensure 是 Webpack 的特殊语法，用来设置组件路径
/**
 * 1.定义路由，每个路由应该映射一个组件
 * path : 浏览器的显示的路径
 * name ： 路由的名字
 * component : 路由的组件路径
 */

const routers = [
  {
    path: '/music-list',
    name: 'MusicList',
    component(resolve) {
      require.ensure(['./components/MusicList/MusicList.vue'], () => {
        resolve(require('./components/MusicList/MusicList.vue'));
      });
    }
  },
  {
    path: '/find',
    name: 'Find',
    component(resolve) {
      require.ensure(['./components/Find/Find.vue'], () => {
        resolve(require('./components/Find/Find.vue'));
      });
    }
  },
  {
    path: '/social',
    name: 'Social',
    component(resolve) {
      require.ensure(['./components/Social/Social.vue'], () => {
        resolve(require('./components/Social/Social.vue'));
      });
    }
  }];

export default routers;
