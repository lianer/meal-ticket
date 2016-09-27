<template>
  <div>
    <x-header v-ref:header :title="" :left-options="{showBack: false, backText: ''}"></x-header>
    <router-view :transition="`vux-route-${direction}`"></router-view>
    <loading :show="loadingVisible" :text="loadingText"></loading>
  </div>
</template>

<script>
  import xHeader from 'vux/src/components/x-header'
  import loading from 'vux/src/components/loading'
  export default {
    components: {
      xHeader,
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
