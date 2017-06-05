<template>
  <ul class="single-list">
     <v-single-card :data="data" v-for="data in songs"></v-single-card>
  </ul>
</template>
<script>
  import vSingleCard from '../../card/searchCard/singleCard';
  export default {
    name: 'v-single-list',
    components: {
      vSingleCard
    },
    props: {
      songs: {
        type: Array
      }
    }
  };
</script>

