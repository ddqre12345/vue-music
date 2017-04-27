<template>
    <transition name="fade">
        <div class="singleList">
            <ul>
                <li v-for="data in datas" @click="playMusic(data)">
                  <v-card :data="data"></v-card>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
    import api from '../../api/index';
    import vCard from '../card/singleCard.vue';
    import { mapGetters } from 'vuex';
    export default {
        name: 'v-single-list',
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
              console.log(1111);
              api.getSearchResource(this.$route.query.keywords, 1, 30, 0)
                  .then((response) => {
                      this.datas = response.data.result.songs;
                  })
                  .catch((response) => {
                      console.log(response);
                  });
            },
            playMusic(song) {
              document.getElementById('audioPlay').pause();
              this.$store.commit('pause');
              let audio = {};
              audio.id = song.id;
              audio.location = song.mp3Url;
              audio.singer = song.artists[0].name;// 演唱者
              audio.albumPic = song.album.picUrl;
              audio.name = song.name;
              // 通过Vuex改变状态
              this.$store.commit('addToList', audio);
              this.$store.dispatch('getSong', audio.id);
              this.$store.commit('play');
            }
        },
        computed: {
            ...mapGetters([
              'songList'
            ])
        },
        components: {
          vCard
        }
    };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import 'singleList.styl';
</style>
