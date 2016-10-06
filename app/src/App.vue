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
