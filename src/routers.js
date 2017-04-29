/**
 * 整个app的路由设置
 */
const router = [{
  path: '/find',  //  发现页
  name: 'find',
  component (resolve) {
    require.ensure(['./views/find/find'], () => {
      resolve(require('./views/find/find'));
    });
  },
  children: [
    {
      path: 'rage',
      component (resolve) {
        require.ensure(['./views/rage'], () => {
          resolve(require('./views/rage'));
        });
      },
      meta: { keepAlive: true }
    },
    {
      path: 'songList',
      component (resolve) {
        require.ensure(['./views/songList'], () => {
          resolve(require('./views/songList'));
        });
      },
      meta: { keepAlive: true }
    },
    {
      path: 'leaderBoard',
      component (resolve) {
        require.ensure(['./views/leaderBoard'], () => {
          resolve(require('./views/leaderBoard'));
        });
      },
      meta: { keepAlive: true }
    },
    {
      path: 'hotSinger',
      component (resolve) {
        require.ensure(['./views/hotSinger'], () => {
          resolve(require('./views/hotSinger'));
        });
      },
      meta: { keepAlive: true }
    }
  ]
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
  path: '*', redirect: '/find/rage' //  初始化页面
}];
export default router;
