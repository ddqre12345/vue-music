<template>
    <div class="singleList">
        <ul>
            <li v-for="data in datas" @click="playMusic()">
              <v-card :data="data"></v-card>
            </li>
        </ul>
    </div>
</template>

<script>
    import api from '../../api/index';
    import vCard from '../card/singleCard.vue';
    export default {
        data() {
            return {
              imgId: '',
              datas: []
            };
        },

        mounted() {
            this.getSingleResource();
        },

        methods: {
            goBack() {
              this.$router.go(-1);
            },
            getSingleResource() {
              api.getSearchResource(this.$route.query.keywords, 1, 30, 0)
                  .then((response) => {
                      this.datas = response.data.result.songs;
                  })
                  .catch((response) => {
                      console.log(response);
                  });
            },

            playMusic() {
              console.log(111);
            }
        },

        components: {
          vCard
        }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'SingleList.styl';
</style>
