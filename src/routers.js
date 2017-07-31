/**
 * 整个app的路由设置
 */
const router = [{
  path: '/find',  //  引导页
  name: 'index',
  component: (resolve) => {
    import('views/index').then((module) => {
      resolve(module);
    });
  },
  children: [{
    path: '/find',  //  发现
    name: 'find',
    component: (resolve) => {
      import('views/find/find').then((module) => {
        resolve(module);
      });
    }
  }]
}, {
  path: '/search',  //  搜索页
  name: 'search',
  component: (resolve) => {
    import('views/search/search').then((module) => {
      resolve(module);
    });
  }
}, {
  path: '/player/:id', //  单曲播放页
  name: 'player',
  component: (resolve) => {
    import('views/detail/player/player').then((module) => {
      resolve(module);
    });
  }
}, {
  path: '/playLists/:id',  //  歌单详情页
  name: 'playLists',
  component: (resolve) => {
    import('views/detail/playList/playlists').then((module) => {
      resolve(module);
    });
  }
}, {
  path: '/singer/:id',  //  歌手详情页
  name: 'singer',
  component: (resolve) => {
    import('views/detail/singer/singer').then((module) => {
      resolve(module);
    });
  }
}, {
  path: '/album/:id',  // 专辑详情页
  name: 'album',
  component: (resolve) => {
    import('views/detail/album/album').then((module) => {
      resolve(module);
    });
  }
}, {
  path: '/user/:id',  // 用户详情页
  name: 'user',
  component: (resolve) => {
    import('views/detail/user/user').then((module) => {
      resolve(module);
    });
  }
}, {
  path: '/ranking/:idx',  // 榜单详情页
  name: 'ranking',
  component: (resolve) => {
    import('views/detail/ranking/ranking').then((module) => {
      resolve(module);
    });
  }
}, {
  path: '/mv/:id',  // 视频播放
  name: 'mv',
  component: (resolve) => {
    import('views/detail/mvPlay/mvPlay').then((module) => {
      resolve(module);
    });
  }
}, {
  path: '/playListComment/:id',  // 歌单评论
  name: 'playListComment',
  component: (resolve) => {
    import('views/detail/playList/playListComment').then((module) => {
      resolve(module);
    });
  }
}, {
  path: '/albumComment/:id',  // 专辑评论
  name: 'albumComment',
  component: (resolve) => {
    import('views/detail/album/albumComment').then((module) => {
      resolve(module);
    });
  }
}, {
  path: '/rankingComment/:id',  // 排行榜歌单评论
  name: 'rankingComment',
  component: (resolve) => {
    import('views/detail/ranking/rankingComment').then((module) => {
      resolve(module);
    });
  }
}, {
  path: '*', redirect: '/find' //  url错误重回定向
}];
export default router;
