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
    require.ensure(['./views/searchPage/search'], () => {
      resolve(require('./views/searchPage/search'));
    });
  },
  meta: { keepAlive: true },
  children: [
    {
      path: 'singleList',
      component (resolve) {
        require.ensure(['./views/searchPage/list/SingleList'], () => {
          resolve(require('./views/searchPage/list/SingleList'));
        });
      },
      meta: { keepAlive: true }
    },
    {
      path: 'singerLists',
      component (resolve) {
        require.ensure(['./views/searchPage/list/SingerList'], () => {
          resolve(require('./views/searchPage/list/SingerList'));
        });
      },
      meta: { keepAlive: true }
    },
    {
      path: 'albumLists',
      component (resolve) {
        require.ensure(['./views/searchPage/list/AlbumList'], () => {
          resolve(require('./views/searchPage/list/AlbumList'));
        });
      },
      meta: { keepAlive: true }
    },
    {
      path: 'playLists',
      component (resolve) {
        require.ensure(['./views/searchPage/list/PlayList'], () => {
          resolve(require('./views/searchPage/list/PlayList'));
        });
      },
      meta: { keepAlive: true }
    },
    {
      path: 'userLists',
      component (resolve) {
        require.ensure(['./views/searchPage/list/UserList'], () => {
          resolve(require('./views/searchPage/list/UserList'));
        });
      },
      meta: { keepAlive: true }
    }
  ]
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
  path: '*', redirect: '/find/rage'
}];
export default router;
