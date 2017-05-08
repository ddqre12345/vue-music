# vue-music
> 这个项目真的会长期进行更新，如果api还能用的话。

>*  [api来源](https://github.com/Binaryify/NeteaseCloudMusicApi)(感谢Binaryify不断更新的网易云音乐接口，这也将是这个项目不断拓展下去的坚实依托)
>*  [源码地址](https://github.com/ddqre12345/vue-music)
>*  [项目预览](http://118.89.226.181:8080)（web端在chrome调试模式下效果更佳）
>*  star，fork是我前进的动力

### 技术细节
***
*  vue
*  vue-cli
*  vue-router
*  vuex
*  axios
*  stylus
*  express
*  webpack

### 安装
***
项目地址：（`git clone`）
```shell
git clone ddqre12345/vue-music
```
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](Node.js))
```
npm install
```
启动服务(http://localhost:8081)
```
npm run dev
```
发布代码
```
npm run build
```
### 目录结构
***
<pre>
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // 图片资源
│   ├── assets         // 图片资源
│   ├── common          // 公共的css js 资源
│   ├── components     // 各种组件
│   ├── views          // 各个视图
│   ├── App.vue         // 主页面
│   ├── vuex           // vuex状态管理器
│   ├── router.js     // 路由配置器
│   └── main.js        // Webpack 预编译入口
</pre>

### 最后

感谢开源社区 ，本项目仅供学习交流使用，切勿用于商业用途，如有侵犯第三方版权问题及时联系我












