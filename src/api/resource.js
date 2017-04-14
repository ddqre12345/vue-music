import {
    API_ROOT
} from './config.js';

const apiZhihu = {
    recommendActicleList: '/api/recommendations/posts',  // 获取推荐文章
    columnArticleList: '/api/columns/',  // 获取专栏文章列表
    columnList: '/api/columns/',  // 获取专栏列表
    articleDetail: '/api/posts/', // 获取文章详情
    recommendColumns: '/api/recommendations/columns'  // 获取推荐专栏
};

export const RecommendActicleListResource = API_ROOT.concat(apiZhihu.recommendActicleList);
export const ColumnArticleListResource = API_ROOT.concat(apiZhihu.columnArticleList);
export const ColumnListResource = API_ROOT.concat(apiZhihu.columnList);
export const ArticleDetailResource = API_ROOT.concat(apiZhihu.articleDetail);
export const RecommendColumnsResource = API_ROOT.concat(apiZhihu.recommendColumns);
