/**
 * 整个app的路由设置
 */
const router = [{
  path: '/find',  //  引导页
  name: 'index',
  component (resolve) {
    require.ensure(['@/views/index'], () => {
      resolve(require('@/views/index'));
    });
  },
  children: [{
    path: '/find',  //  发现
    name: 'find',
    component (resolve) {
      require.ensure(['@/views/find/find'], () => {
        resolve(require('@/views/find/find'));
      });
    },
    meta: { keepAlive: true }
  }],
  meta: { keepAlive: true }
}, {
  path: '/search',  //  搜索页
  name: 'search',
  component: (resolve) => {
    import('@/views/search/search').then((module) => {
      resolve(module);
    });
  },
  meta: { keepAlive: true }
}, {
  path: '/player/:id', //  单曲播放页
  name: 'player',
  component: (resolve) => {
    import('@/views/detail/player/player').then((module) => {
      resolve(module);
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/playLists/:id',  //  歌单详情页
  name: 'playLists',
  component: (resolve) => {
    import('@/views/detail/playList/playlists').then((module) => {
      resolve(module);
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/singer/:id',  //  歌手详情页
  name: 'singer',
  component: (resolve) => {
    import('@/views/detail/singer/singer').then((module) => {
      resolve(module);
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/album/:id',  // 专辑详情页
  name: 'album',
  component: (resolve) => {
    import('@/views/detail/album/album').then((module) => {
      resolve(module);
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/user/:id',  // 用户详情页
  name: 'user',
  component: (resolve) => {
    import('@/views/detail/user/user').then((module) => {
      resolve(module);
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/ranking/:idx',  // 榜单详情页
  name: 'ranking',
  component: (resolve) => {
    import('@/views/detail/ranking/ranking').then((module) => {
      resolve(module);
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/mv/:id',  // 视频播放
  name: 'mv',
  component: (resolve) => {
    import('@/views/detail/mvPlay/mvPlay').then((module) => {
      resolve(module);
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/playListComment/:id',  // 歌单评论
  name: 'playListComment',
  component: (resolve) => {
    import('@/views/detail/playList/playListComment').then((module) => {
      resolve(module);
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/albumComment/:id',  // 专辑评论
  name: 'albumComment',
  component: (resolve) => {
    import('@/views/detail/album/albumComment').then((module) => {
      resolve(module);
    });
  },
  meta: { keepAlive: false }
}, {
  path: '/rankingComment/:id',  // 排行榜歌单评论
  name: 'rankingComment',
  component: (resolve) => {
    import('@/views/detail/ranking/rankingComment').then((module) => {
      resolve(module);
    });
  },
  meta: { keepAlive: false }
}, {
  path: '*', redirect: '/find' //  url错误重回定向
}];
export default router;
