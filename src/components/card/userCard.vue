<template>
    <div class="card">
        <img v-lazy="avatarImage" lazy="loading" class="avatarImage"/>
        <div class="avatar-info">
            <p class="avatar-name">
                {{data.nickname}}
                <span class="gender-female"><i class="female-icon"></i></span>
                <span class="gender-man"><i class="man-icon"></i></span>
            </p>
            <p class="avatar-intro">{{data.signature}}</p>
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
      avatarImage() {
        return '' || this.data.avatarUrl;
      }
    }
  };
</script>
