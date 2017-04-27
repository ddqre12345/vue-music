<template>
    <transition name="fade">
        <div class="AlbumList">
            <ul>
                <li v-for="data in datas" @click="goAlbumDetail()">
                    <v-card :data="data"></v-card>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
  import api from '../../api/index';
  import vCard from '../card/albumCard.vue';
  export default {
    name: 'v-album-list',
    data() {
      return {
        imgId: '',
        datas: []
      };
    },

    mounted() {
      this.getAlbumResource();
    },

    methods: {
      getAlbumResource() {
        api.getSearchResource(this.$route.query.keywords, 10, 30, 0)
          .then((response) => {
            this.datas = response.data.result.albums;
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
    @import 'albumList.styl';
</style>
