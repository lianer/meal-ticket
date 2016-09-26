<template>
  <div>
    <router-view :transition="`vux-route-${direction}`"></router-view>
    <loading :show="loadingVisible" :text="loadingText"></loading>
  </div>
</template>

<script>
  import loading from 'vux/src/components/loading'
  export default {
    components: {
      loading
    },
    data () {
      return {
        direction: 'current',
        loadingText: 'loading...',
        loadingVisible: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .fadein-transition{
    transition: all .15s linear .15s;
    opacity: 1;
    // transform: scale(1);
  }
  .fadein-enter{
    opacity: 0;
    // transform: scale(1.5);
  }
  .fadein-leave{
    opacity: 0;
    // transform: scale(0.5);
  }
</style>
