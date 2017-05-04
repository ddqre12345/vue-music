<template>
    <div class="loader" v-show="show"></div>
</template>
<script>
    export default {
        name: 'v-loading',
        props: {
            show: {
                type: Boolean
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './loading.styl';
</style>
