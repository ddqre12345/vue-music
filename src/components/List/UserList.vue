<template>
    <transition name="fade">
        <div class="UserList">
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
  import vCard from '../card/userCard.vue';
  export default {
    data() {
      return {
        imgId: '',
        datas: []
      };
    },
    mounted() {
      this.getAlbumResource();
    },
    watch: {
      '$route.query.keywords' (to, from) {
        this.getAlbumResource();
      }
    },
    methods: {
      getAlbumResource() {
        api.getSearchResource(this.$route.query.keywords, 1002, 30, 0)
          .then((response) => {
            this.datas = response.data.result.userprofiles;
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
    @import 'UserList.styl';
</style>
