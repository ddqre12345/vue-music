import axios from 'axios'
import {
  LoginCellphoneResource,
  UserPlaylistResource,
  PlaylistDetailResource,
  MusicUrlResource,
  SearchResource,
  LyricResource,
  CommentResource,
  AlbumResource,
  RecommendResource,
  RecommendSongsResource,
  PersonalFmResource,
  DailySigninResource,
  LikeMusicResource,
  FmTrashResource,
  TopListResource
} from './resource'

export default {
  // 获取个人信息，注入cookies
  getLoginCellphoneResource (mobile, password) {
    return axios.get(LoginCellphoneResource, {
      params: {
        phone: mobile || '',
        password: password || ''
      }
    })
  },

  // 获取用户歌单, uid为用户id，登陆接口处获取
  getUserPlaylistResource (id) {
    return axios.get(UserPlaylistResource, {
      params: {
        uid: id
      }
    })
  },

  // 获取歌单详情, id 为歌单id
  getPlaylistDetailResource (id) {
    return axios.get(PlaylistDetailResource, {
      params: {
        id: id
      }
    })
  },

  // 获取音乐url， id为单曲id
  getMusicUrlResource (id) {
    return axios.get(MusicUrlResource, {
      params: {
        id: id
      }
    })
  },

  /**
   * @method 搜索音乐
   * @param keywords
   * @param type 1为单曲，10为专辑， 100为歌手， 1000为歌单， 1002为用户
   * @param limit 返回数据限制
   * @param offset 数据偏移量
   * @returns response  数据返回值
   */
  getSearchResource (keywords, type, limit, offset) {
    return axios.get(SearchResource, {
      params: {
        keywords: keywords,
        type: type,
        offset: offset || 0,
        limit: limit
      }
    })
  },

  // 获取歌词， id为单曲id
  getLyricResource (id) {
    return axios.get(LyricResource, {
      params: {
        id: id
      }
    })
  },

  // 获取评论， id为单曲id
  getCommentResource (id) {
    return axios.get(CommentResource, {
      params: {
        id: id
      }
    })
  },

  // 获取歌手专辑列表， id为歌手id
  getAlbumResource (id) {
    return axios.get(AlbumResource, {
      params: {
        id: id
      }
    })
  },

  // 获取每日推荐歌曲
  getRecommendResource () {
    return axios.get(RecommendResource)
  },

  // 获取每日推荐歌单
  getRecommendSongsResource () {
    return axios.get(RecommendSongsResource)
  },

  // 获取私人FM， id为歌曲id
  getPersonalFmResource () {
    return axios.get(PersonalFmResource)
  },

  /**
   * @method 签到
   * @param type 0为安卓签到，1为web/pc签到， 默认为安卓
   */
  getDailySigninResource (type) {
    return axios.get(DailySigninResource, {
      params: {
        type: type
      }
    })
  },

  // 添加喜欢歌曲， id为单曲id
  getLikeMusicResource (id) {
    return axios.get(LikeMusicResource, {
      params: {
        id: id
      }
    })
  },

  // 将单曲从私人FM中移除至垃圾桶， id为单曲id
  getFmTrashResource (id) {
    return axios.get(FmTrashResource, {
      params: {
        id: id
      }
    })
  },

  /**
   * @method 获取音乐排行榜
   * @param idx 0.云音乐新歌排行榜  1.云音乐热歌排行榜  2.网易原创歌曲排行榜
   * 3. 云音乐飙升榜  4.云音乐电音榜  5.UK排行榜周榜   6.美国billboard周榜
   * 7. KTV嗨榜   8.iTunes榜   9.Hit FM Top榜   10.日本Oricon周榜
   * 11.韩国Melon排行榜周榜   12.韩国Mnet排行榜周榜   13.韩国Melon原生周榜
   * 14.中国Top排行榜(港台榜) 15.中国Top排行榜(内地榜)  16.香港电台中文歌曲龙虎榜
   * 17.华语金曲榜 18.中国嘻哈榜  19.法国NRJ  EuroHot 30周榜  20.台湾Hito排行榜
   * 21.Beatport全球电子舞曲榜
   */
  getTopListResource (idx) {
    return axios.get(TopListResource, {
      params: {
        idx: idx
      }
    })
  }
}
