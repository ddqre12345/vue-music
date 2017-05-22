### vue-music
希望它会成为用vue实现网易云音乐最全的webapp，我们的目标是更像，更快，更优雅

#### 网易云音乐（移动版）
- [api来源](https://github.com/Binaryify/NeteaseCloudMusicApi)(感谢Binaryify不断更新的网易云音乐接口，这也将是这个项目不断拓展下去的坚实依托)
- [源码地址](https://github.com/ddqre12345/vue-music)
- [项目预览](http://118.89.226.181:8080)（web端在chrome调试模式下效果更佳）
- 针对segmenfault类app暂时无法有效预览的问题，建议粘贴http://118.89.226.181:8080到手机其他浏览器体验
- 项目所提供请求地址希望仅供预览使用，项目后台已加入pm守护之光，如果需要可以直接调用，当然，因为接口不断变化，开发使用[api来源](https://github.com/Binaryify/NeteaseCloudMusicApi)最新代码，配置本地服务器代理。

#### 使用技术
- Vue2：采用最新Vue2的语法
- Vuex：主要实现非父子组件通讯
- vue-router：管理单页面应用路由
- axios：发起http请求
- stylus：css预处理语言
- Express：vue-cli使用Express做服务器。
- Webpack：自动化构建工具，主要配置由vue-cli脚手架提供。
- ES6：采用ES6语法。
- CSS3：CSS3动画及样式。

#### 项目进度
> 已完成

- 网易云（轮播，推荐歌单，独家放送，推荐MV，网友精选歌单（最新，最热），排行榜）
- 搜索（热门搜索，搜索结果包括单曲，歌手，专辑，歌单，用户及其滑动切换）
- 播放页面（歌词，碟片切换）
- 歌手，专辑，歌单，用户等详情展示
- 音乐播放功能（切歌，播放列表，播放进度显示）

> 效果图

![发现](https://github.com/ddqre12345/vue-music/blob/master/static/vue-music-1.gif?raw=true)
![搜索](https://github.com/ddqre12345/vue-music/blob/master/static/vue-music-2.gif?raw=true)
![详情](https://github.com/ddqre12345/vue-music/blob/master/static/vue-music-3.gif?raw=true)
![测试](https://github.com/ddqre12345/vue-music/blob/master/static/vue-music-4.gif?raw=true)
![歌词](https://github.com/ddqre12345/vue-music/blob/master/static/vue-music-5.gif?raw=true)

图片就到这里，[more >](http://118.89.226.181:8080)

> 下阶段计划

- MV播放，希望这个功能能走下去
- “我的”争取还是做出来吧，尽管可能没人敢用
- 完善各个页面的功能吧，持续优化

#### 安装运行（安装运行前请确定已安装node环境）
- git clone：https://github.com/ddqre12345/vue-music.git
- 环境安装：npm install
- 启动服务：npm run dev
- 发布代码：npm run build
- 代码检查：npm run lint

#### 项目构成
<pre>
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── static       	 // 放置静态资源
├── src                // 生产目录
│   ├── api        //  api请求
│   ├── assets         // 图片资源
│   ├── common          // 公共的css js images资源
│   ├── components     // 各种组件
│   ├── views          // 各个视图
│   ├── vuex           // vuex状态管理器
│   ├── App.vue         // 主页面
│   ├── router.js     // 路由配置器
│   └── main.js        // Webpack 预编译入口
</pre>

#### 最后
到这里，欢迎大家提issue，pr，star，如果喜欢可以watch，每周应该都会有些小更新，本项目仅供学习交流使用，切勿用于商业用途，如有侵犯第三方版权问题及时联系我













