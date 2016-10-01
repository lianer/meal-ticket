<template>
  <div class="page-user">

    <x-header :title="userName"></x-header>

    <div class="avatar">
      <img src="/static/img/avatar/0.jpg">
    </div>

    <div class="total">
      <span>{{teamName}} {{userName}} 已加班 {{count}} 天</span>
    </div>

    <!-- <div class="count">
      <span>{{teamName}} {{userName}} 已加班 {{count}} 天</span>
    </div> -->
  </div>
</template>

<script>
  import xHeader from 'components/x-header.vue'

  export default {
    components: {
      xHeader
    },
    data () {
      return {
        teamId: '',
        teamName: '',
        userName: '',
        count: 0
      }
    },
    route: {
      activate: function (transition) {
        var vm = this

        vm.teamId = vm.$route.params.team
        vm.userName = vm.$route.params.user
        vm.$root.loadingVisible = true

        vm.$http({
          method: 'get',
          url: locals.api + '/team/name',
          params: {
            teamId: vm.teamId
          }
        }).then(function ({body}) {
          vm.teamName = body.data.teamName
        })

        vm.$http({
          method: 'get',
          url: locals.api + '/user',
          params: {
            teamId: vm.teamId,
            userName: vm.userName
          }
        }).then(function ({body}) {
          vm.count = body.data.count.length
          vm.$root.loadingVisible = false
          transition.next()
        })
      }
    }
  }
</script>

<style>
  @import '~vux/dist/vux.css';
</style>

<style lang='scss' scoped>
  .avatar{
    img{
      display: block;
      width: 120px;
      height: 120px;
      margin: 24px auto;
      border-radius: 120px;
      box-shadow: 0 0 8px 1px rgba(0, 0, 0, .1);
    }
  }
  .total{
    margin: 12px 0;
    font-size: 12px;
    text-align: center;
  }
</style>
