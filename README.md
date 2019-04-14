# 网易云音乐

它会成为用vue实现网易云音乐最全的webapp，我们的目标是更像，更快，更优雅

友情提示：老用户更新可能需要重新npm install，开启webpack2新征程

### vue网易云音乐webapp版

> Star，Star，Star，这是对我最大的鼓励，重要的话说三遍，广告就要放在最显眼的地方，哈哈。

- [api来源](https://github.com/Binaryify/NeteaseCloudMusicApi)(再次感谢Binaryify不断更新的网易云音乐接口，这也将是这个项目不断拓展下去的坚实依托，看着他的star蹭蹭蹭的往上涨，我必须厚着脸皮说有我一份功劳)
- [源码地址](https://github.com/ddqre12345/vue-music)
- [项目预览](http://192.144.180.20:8080)（web端在chrome调试模式下效果更佳）
- 针对segmenfault类app暂时无法有效预览的问题，建议粘贴 [http://192.144.180.20:8080](http://192.144.180.20:8080) 到手机其他浏览器体验
- 项目所提供请求地址希望仅供预览使用，本地开发建议参考[api来源](https://github.com/Binaryify/NeteaseCloudMusicApi)，配置本地服务器代理
- 这是个连载的故事，预知前事如何，请跳转[网易云音乐v1.0](https://segmentfault.com/a/1190000009339117?_ea=2099626),现在我主要讲的是这个版本的更新内容

#### 技术栈

- Vue2：采用最新Vue2的语法
- Vuex：管理公共组件状态量
- vue-router：管理单页面应用路由
- axios：发起http请求
- stylus：css预处理语言
- Express：vue-cli使用Express做服务器。
- Webpack：自动化构建工具，主要配置vue-cli脚手架提供。
- ES6：采用ES6语法。
- CSS3：CSS3动画及样式。

#### 功能介绍
> v1.0 | 2017.05.09

- 网易云（轮播，推荐歌单，独家放送，推荐MV，网友精选歌单（最新，最热），排行榜）
- 搜索（热门搜索，搜索结果包括单曲，歌手，专辑，歌单，用户及其滑动切换）
- 播放页面（歌词，碟片切换）
- 歌手，专辑，歌单，用户等详情展示
- 音乐播放功能（切歌，播放列表，播放进度显示）

> v2.0 | 2017.07.01

- 新增功能
    - mv播放详情页，包括mv播放，mv介绍，相似mv，mv评论，相似mv播放切换
    - 歌手详情页：歌手mv
    - 专辑详情页：专辑评论，专辑介绍详情
    - 歌单详情页：歌单评论，歌单介绍详情
    - 个性推荐增加最新音乐，主播电台
    - 排行榜增加全球榜
    - 排行榜榜单详情页，包括歌曲排名，歌单评论
    - 上滑歌单组件歌单循环，单曲，随机播放切换，歌曲播放效果增加
- 功能优化
    - 转场效果优化
    - 播放展示效果优化
- 组件优化
- UI框架统一为vux（历史遗留问题）

> v2.1 | 2017.07.08

  - webpack1.x->webpack2.6
  - 模块，组件基础优化

> 新增功能效果图


![mv播放机mv评论](https://github.com/ddqre12345/ddqre12345.github.io/blob/master/images/img1.gif?raw=true)
![歌单排行榜全球版及评论](https://github.com/ddqre12345/ddqre12345.github.io/blob/master/images/img2.gif?raw=true)
![点击播放全部,歌曲循环，随机，单曲切换，专辑歌单详情，评论等](https://github.com//ddqre12345/ddqre12345.github.io/blob/master/images/img3.gif?raw=true)

图片就到这里，[more](http://192.144.180.20:8080)

> v2.2 | 2019.04.15
  - webpack2.6->3.4
  - 图片等静态资源从项目中迁移到第三方站点
  - webpack打包优化（dll + happypack）
  - 部分样式优化

> v3.0 | 规划ing

对于关注这个项目的朋友，我要很抱歉的说一声功能性的迭代大概就此打住了，但是，后续会在这个项目实践更多前沿的技术方案，和大伙探讨最优解，好了，暂时就这样。

#### 安装运行（安装运行前请确定已安装node环境）

- 环境安装：npm install
- 启动服务：npm run dev
- 发布代码：npm run build
- 代码检查：npm run lint

#### 项目构成

<pre>
├── build                    // 构建服务和webpack配置
├── config            		 // 项目不同环境的配置
├── dist               		 // 项目build目录
├── index.html          	 // 项目入口文件
├── package.json      		 // 项目配置文件
├── static       			 // 放置静态资源
├── src                		 // 生产目录
│   ├── api       			// api请求
│   ├── assets              // 图片资源
│   ├── common          	// 公共的css js images资源
│   ├── components     		// 各种组件
│   ├── views          		// 各个视图
│   ├── vuex           	    // vuex状态管理器
│   ├── App.vue         	// 主页面
│   ├── router.js     		// 路由配置器
│   └── main.js       	    // Webpack 预编译入口
</pre>
### 最后！！！！！

1.感谢[github](https://github.com/),感谢同样在分享的你，让我能站在巨人的肩膀上

2.感谢[Binaryify](https://github.com/Binaryify)对接口文档的不断维护与更新。

3.后续会有一个关于dll + happypack，期望能给你们一些帮助

到这里，欢迎大家提issue，输出pr，点star，如果喜欢更可以watch，如果你有什么建议或者看到了项目中的那些不足之处你一定要在[小黑板板](https://github.com/ddqre12345/vue-music/projects?query=is%3Aopen)上留言。本项目仅供学习交流使用，切勿用于商业用途，如有侵犯第三方版权问题及时联系我
