<template>
    <div class="card">
        <img v-lazy="albumImage" lazy="loading" class="albumImage"/>
        <div class="album-info">
            <p class="album-name">{{data.name}}<span class="trans">{{albumTrans}}</span></p>
            <p class="album-author">{{data.artist.name}}</p>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'v-card',
    props: {
      data: {
        type: Object
      }
    },
    computed: {
      albumImage() {
        return '' || this.data.picUrl;
      },
      albumTrans() {
        if (this.data.alias && this.data.alias[0]) {
          return '(' + this.data.alias[0] + ')';
        } else {
          return '';
        }
      }
    }
  };
</script>
