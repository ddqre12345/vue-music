<template>
  <div class="card">
    <img v-lazy="avatarImage" lazy="loading" class="avatar"/>
    <p class="singer-name">
      <span class="name">{{data.name}}</span>
      <span class="trans">{{data.trans}}</span>
    </p>
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
      avatarImage() {
        return '' || this.data.picUrl;
      }
    }
  };
</script>
