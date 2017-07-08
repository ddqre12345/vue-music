<template>
  <ul class="single-list">
     <v-single-card :data="data" v-for="(data, index) in songs" :key="index"></v-single-card>
  </ul>
</template>
<script>
  import vSingleCard from '../../card/searchCard/singleCard';
  export default {
    name: 'v-single-list',
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    components: {
      vSingleCard
    }
  };
</script>

