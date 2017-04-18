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
      }
    },
    {
      path: 'songList',
      component (resolve) {
        require.ensure(['./views/songList'], () => {
          resolve(require('./views/songList'));
        });
      }
    },
    {
      path: 'leaderBoard',
      component (resolve) {
        require.ensure(['./views/leaderBoard'], () => {
          resolve(require('./views/leaderBoard'));
        });
      }
    },
    {
      path: 'hotSinger',
      component (resolve) {
        require.ensure(['./views/hotSinger'], () => {
          resolve(require('./views/hotSinger'));
        });
      }
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
      }
    },
    {
      path: 'singerLists',
      name: 'v-singer-list',
      component (resolve) {
        require.ensure(['./components/List/SingerList'], () => {
          resolve(require('./components/List/SingerList'));
        });
      }
    },
    {
      path: 'albumLists',
      name: 'v-album-list',
      component (resolve) {
        require.ensure(['./components/List/AlbumList'], () => {
          resolve(require('./components/List/AlbumList'));
        });
      }
    },
    {
      path: 'playLists',
      name: 'v-play-list',
      component (resolve) {
        require.ensure(['./components/List/PlayList'], () => {
          resolve(require('./components/List/PlayList'));
        });
      }
    },
    {
      path: 'userLists',
      name: 'v-user-list',
      component (resolve) {
        require.ensure(['./components/List/UserList'], () => {
          resolve(require('./components/List/UserList'));
        });
      }
    }
  ]
}, {
  name: 'playerDetail',
  path: '/playerDetail/:id',
  component (resolve) {
    require.ensure(['./views/playerDetail'], () => {
      resolve(require('./views/playerDetail'));
    });
  }
}, {
  path: '/playListDetail/:id',
  name: 'playListDetail',
  component (resolve) {
    require.ensure(['./views/playListDetail'], () => {
      resolve(require('./views/playListDetail'));
    });
  }
}];
export default router;
