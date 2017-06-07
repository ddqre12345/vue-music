/**
 * 整个app的路由设置
 */
const router = [{
  path: '/find',  //  引导页
  name: 'index',
  component (resolve) {
    require.ensure(['./views/index'], () => {
      resolve(require('./views/index'));
    });
  },
  children: [{
    path: '/find',  //  发现
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
  path: '/player/:id', //  单曲播放页
  name: 'player',
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
  path: '/ranking/:idx',  // 榜单详情页
  name: 'ranking',
  component (resolve) {
    require.ensure(['./views/detail/ranking/ranking'], () => {
      resolve(require('./views/detail/ranking/ranking'));
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/mv/:id',  // 视频播放
  name: 'mv',
  component (resolve) {
    require.ensure(['./views/detail/mvPlay/mvPlay'], () => {
      resolve(require('./views/detail/mvPlay/mvPlay'));
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/playListComment/:id',  // 歌单评论
  name: 'playListComment',
  component (resolve) {
    require.ensure(['./views/detail/playList/playListComment'], () => {
      resolve(require('./views/detail/playList/playListComment'));
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/albumComment/:id',  // 专辑评论
  name: 'albumComment',
  component (resolve) {
    require.ensure(['./views/detail/album/albumComment'], () => {
      resolve(require('./views/detail/album/albumComment'));
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/rankingComment/:id',  // 排行榜歌单评论
  name: 'rankingComment',
  component (resolve) {
    require.ensure(['./views/detail/ranking/rankingComment'], () => {
      resolve(require('./views/detail/ranking/rankingComment'));
    });
  },
  meta: { keepAlive: false }
}, {
  path: '*', redirect: '/find' //  url错误重回定向
}];
export default router;
