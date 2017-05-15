/**
 * 整个app的路由设置
 */
const router = [{
  path: '/index',  //  引导页
  name: 'index',
  component (resolve) {
    require.ensure(['./views/index'], () => {
      resolve(require('./views/index'));
    });
  },
  children: [{
    path: 'find',  //  发现
    name: 'find',
    component (resolve) {
      require.ensure(['./views/find/find'], () => {
        resolve(require('./views/find/find'));
      });
    },
    meta: { keepAlive: true }
  }],
  meta: { keepAlive: true }
}, {
  path: '/search',  //  搜索页
  name: 'search',
  component (resolve) {
    require.ensure(['./views/search/search'], () => {
      resolve(require('./views/search/search'));
    });
  },
  meta: { keepAlive: true }
}, {
  name: 'player', //  单曲播放页
  path: '/player/:id',
  component (resolve) {
    require.ensure(['./views/detail/player/player'], () => {
      resolve(require('./views/detail/player/player'));
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/playLists/:id',  //  歌单详情页
  name: 'playLists',
  component (resolve) {
    require.ensure(['./views/detail/playList/playlists'], () => {
      resolve(require('./views/detail/playList/playlists'));
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/singer/:id',  //  歌手详情页
  name: 'singer',
  component (resolve) {
    require.ensure(['./views/detail/singer/singer'], () => {
      resolve(require('./views/detail/singer/singer'));
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/album/:id',  // 专辑详情页
  name: 'album',
  component (resolve) {
    require.ensure(['./views/detail/album/album'], () => {
      resolve(require('./views/detail/album/album'));
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/user/:id',  // 用户详情页
  name: 'user',
  component (resolve) {
    require.ensure(['./views/detail/user/user'], () => {
      resolve(require('./views/detail/user/user'));
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/video',  // 视频播放
  name: 'video',
  component (resolve) {
    require.ensure(['./views/detail/mvPlay/mvPlay'], () => {
      resolve(require('./views/detail/mvPlay/mvPlay'));
    });
  },
  meta: { keepAlive: false }
}, {
  path: '*', redirect: '/video' //  初始化页面
}];
export default router;
