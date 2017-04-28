/**
 * 整个app的路由设置
 */
const router = [{
  path: '/find',
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
  path: '/search',
  component (resolve) {
    require.ensure(['./views/search/search'], () => {
      resolve(require('./views/search/search'));
    });
  },
  meta: { keepAlive: true }
}, {
  name: 'playerDetail',
  path: '/playerDetail/:id',
  component (resolve) {
    require.ensure(['./views/playerDetail'], () => {
      resolve(require('./views/playerDetail'));
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/playListDetail/:id',
  name: 'playListDetail',
  component (resolve) {
    require.ensure(['./views/detail/playList/playListDetail'], () => {
      resolve(require('./views/detail/playList/playListDetail'));
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/singer/:id',
  name: 'singer',
  component (resolve) {
    require.ensure(['./views/detail/singer/singer'], () => {
      resolve(require('./views/detail/singer/singer'));
    });
  },
  meta: { keepAlive: false }
}, {
  path: '*', redirect: '/find/rage'
}];
export default router;
