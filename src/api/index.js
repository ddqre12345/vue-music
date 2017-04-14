import axios from 'axios';

import {
    RecommendActicleListResource,
    ColumnArticleListResource,
    ColumnListResource,
    ArticleDetailResource,
    RecommendColumnsResource
} from './resource';

export default {
    getRecommendActicleList(size, offset) {
        return axios.get(RecommendActicleListResource, {
            params: {
                limit: size || 6,
                offset: offset || 0
            }
        });
    },

    getPersonalInfo(columnId) {
        return axios.get(ColumnArticleListResource + columnId);
    },

    getColumnArticleList(columnId, size, offset) {
        return axios.get(ColumnArticleListResource + columnId + '/posts?limit=' + size + '&offset=' + offset);
    },

    getColumnList(columnId, size, offset) {
        return axios.get(ColumnListResource + columnId + '/posts?limit=' + size + '&offset=' + offset);
    },

    getArticleDetail(articleId) {
        return axios.get(ArticleDetailResource + articleId);
    },

    getRecommendationsColumns(size, offset) {
        return axios.get(RecommendColumnsResource, {
            params: {
                limit: size || 6,
                offset: offset || 0
            }
        });
    }
};
