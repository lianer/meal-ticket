<template>
  <div>
    <router-view :transition="`vux-route-${direction}`"></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        api: 'http://192.168.0.101:4003',
        direction: 'current'
      }
    }
  }
</script>
