<template>
    <transition name="fade">
        <div class="PlayList">
            <ul>
                <li v-for="data in datas" @click="goPlayListDetail(data.id)">
                    <v-card :data="data"></v-card>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
  import api from '../../api/index';
  import vCard from '../card/playListCard.vue';
  export default {
    name: 'v-play-lists',
    data() {
      return {
        imgId: '',
        datas: []
      };
    },
    mounted() {
      this.getPlayListResource();
    },
    methods: {
      getPlayListResource() {
        api.getSearchResource(this.$route.query.keywords, 1000, 30, 0)
          .then((response) => {
            this.datas = response.data.result.playlists;
          })
          .catch((response) => {
            console.log(response);
          });
      },
      goPlayListDetail(id) {
        this.$router.push({
          path: '/playListDetail/' + id
        });
      }
    },

    components: {
      vCard
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import 'playLists.styl';
</style>
