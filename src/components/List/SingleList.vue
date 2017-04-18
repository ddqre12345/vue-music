<template>
    <!--<div class="singleList" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">-->
    <div class="singleList">
        <ul>
            <li>
                <p title="name">告白气球</p>
                <p title="source">告白气球</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import api from '../../api/index';
    export default {
        data() {
            return {
              singleList: {},
              imgId: ''
            };
        },

        mounted() {
            this.getSearchResource();
        },

        methods: {
            goBack() {
              this.$router.go(-1);
            },
            getSearchResource() {
              console.log('请求单曲数据');
              api.getSearchResource(this.$route.query.keywords, 1, 20, 0)
                  .then((response) => {
                      this.singleList = response.data.result;
                  })
                  .catch((response) => {
                      console.log(response);
                  });
            }
        },

        components: {
        }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'SingleList.styl';
</style>
