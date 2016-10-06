<template>
  <div class="page-user">

    <v-header :title="userName"></v-header>

    <div class="avatar">
      <img :src="`/static/img/avatar/${info.avatar}.jpg`">
    </div>

    <div class="intro">
      {{info.intro}}
    </div>

    <div class="total">
      <span>{{teamName}} {{userName}} 已加班 {{count}} 天</span>
    </div>
  </div>
</template>

<script>
  import vHeader from 'components/v-header.vue'

  export default {
    components: {
      vHeader
    },
    data () {
      return {
        teamId: '',
        teamName: '',
        userName: '',
        count: 0,
        info: {}
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
          vm.info = body.data.info
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
  .page-user{
    background: #fff;
  }
  .avatar{
    img{
      display: block;
      width: 180px;
      height: 180px;
      margin: 24px auto;
      border-radius: 120px;
      object-fit: cover;
    }
  }
  .intro{
    text-align: center;
  }
  .total{
    margin: 12px 0;
    font-size: 12px;
    text-align: center;
  }
</style>
