<template>
    <transition name="fade">
      <div class="singerList">
        <ul>
          <li v-for="data in datas" @click="goSingerDetail(data.id)">
            <v-card :data="data"></v-card>
          </li>
        </ul>
      </div>
    </transition>
</template>

<script>
    import api from '../../api/index';
    import vCard from '../card/singerCard.vue';
    export default {
        name: 'v-singer-list',
        data() {
            return {
              imgId: '',
              datas: []
            };
        },

        mounted() {
            this.getSingerResource();
        },
        methods: {
            goBack() {
              this.$router.go(-1);
            },
            getSingerResource() {
              api.getSearchResource(this.$route.query.keywords, 100, 30, 0)
                  .then((response) => {
                      this.datas = response.data.result.artists;
                  })
                  .catch((response) => {
                      console.log(response);
                  });
            },
            goSingerDetail(id) {
              this.$router.push({
                path: '/singer/' + id
              });
            }
        },
        components: {
          vCard
        }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'singerList.styl';
</style>
