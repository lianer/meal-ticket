<template>
  <div :style="{'min-height': $root.clientHeight}">
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
        loadingVisible: false,
        clientHeight: 0
      }
    },
    created: function () {
      var vm = this
      var resizeTimer = -1

      window.gvm = vm

      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(function () {
          vm.clientHeight = document.documentElement.clientHeight + 'px'
        }, 50)
      })
      vm.clientHeight = document.documentElement.clientHeight + 'px'
    }
  }
</script>
