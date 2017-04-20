/**
 * 整个app的路由设置
 */
const router = [{
  path: '/index',
  component (resolve) {
    require.ensure(['./views/index'], () => {
      resolve(require('./views/index'));
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
  path: '/find',
  component (resolve) {
    require.ensure(['./components/find/find'], () => {
      resolve(require('./components/find/find'));
    });
  },
  children: [
    {
      path: 'singleList',
      name: 'v-single-list',
      component (resolve) {
        require.ensure(['./components/List/SingleList'], () => {
          resolve(require('./components/List/SingleList'));
        });
      },
      meta: { keepAlive: true }
    },
    {
      path: 'singerLists',
      name: 'v-singer-list',
      component (resolve) {
        require.ensure(['./components/List/SingerList'], () => {
          resolve(require('./components/List/SingerList'));
        });
      },
      meta: { keepAlive: true }
    },
    {
      path: 'albumLists',
      name: 'v-album-list',
      component (resolve) {
        require.ensure(['./components/List/AlbumList'], () => {
          resolve(require('./components/List/AlbumList'));
        });
      },
      meta: { keepAlive: true }
    },
    {
      path: 'playLists',
      name: 'v-play-list',
      component (resolve) {
        require.ensure(['./components/List/PlayList'], () => {
          resolve(require('./components/List/PlayList'));
        });
      },
      meta: { keepAlive: true }
    },
    {
      path: 'userLists',
      name: 'v-user-list',
      component (resolve) {
        require.ensure(['./components/List/UserList'], () => {
          resolve(require('./components/List/UserList'));
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
    require.ensure(['./views/playListDetail'], () => {
      resolve(require('./views/playListDetail'));
    });
  },
  meta: { keepAlive: true }
}];
export default router;
