<template>
  <transition name="fade">
    <div class="singleList">

    </div>
  </transition>
</template>

<script>
    import api from '../../api/index';
    export default {
       name: 'v-single-list',
        mounted() {
          this.getSearchResource();
        },

        data() {
            return {
                singleList: {},
                imgId: ''
            };
        },

        methods: {
            goBack() {
              this.$router.go(-1);
            },
            getSearchResource() {
              api.getSearchResource(this.$route.query.keywords, 1, 20, 0)
                  .then((response) => {
                      console.log(response);
                      this.singleList = response.data;
                      console.log(this.singleList);
                      this.$nextTick(() => {
                          this.$store.commit('UPDATE_LOADING', false);
                      });
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
