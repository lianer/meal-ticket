<template>
  <div>
    <router-view :transition="`vux-route-${direction}`"></router-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        direction: 'current'
      }
    }
  }
</script>
