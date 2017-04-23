<template>
    <transition name="fade">
      <div class="singerList">
        <ul>
          <li v-for="data in datas" @click="goSingerDetail()">
            <v-card :data="data"></v-card>
          </li>
        </ul>
      </div>
    </transition>
</template>

<script>
    import api from '../../../api/index';
    import vCard from '../../../components/card/singerCard.vue';
    export default {
        data() {
            return {
              imgId: '',
              datas: []
            };
        },

        mounted() {
            this.getSingerResource();
        },
        watch: {
            '$route.query.keywords' (to, from) {
              this.getSingerResource();
            }
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
            goSingerDetail() {
              console.log(111);
            }
        },
        components: {
          vCard
        }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'SingerList.styl';
</style>
