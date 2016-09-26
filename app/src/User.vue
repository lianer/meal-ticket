<template>
  <div class="page-user">
    <x-header :left-options="{showBack: true, backText: ''}">{{userName}}</x-header>
    <div class="count">
      <span>{{teamName}} {{userName}} 已加班 {{count}} 天</span>
    </div>
  </div>
</template>

<script>
  import xHeader from 'vux/src/components/x-header'
  import Group from 'vux/src/components/group'
  import Cell from 'vux/src/components/cell'
  import xInput from 'vux/src/components/x-input'
  import icon from 'vux/src/components/icon'
  import toast from 'vux/src/components/toast'
  import confirm from 'vux/src/components/confirm'

  export default {
    components: {
      Group,
      Cell,
      xHeader,
      xInput,
      icon,
      toast,
      confirm
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

        vm.$root.loadingVisible = true
        vm.teamId = vm.$route.params.team
        vm.userName = vm.$route.params.user

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
          // transition.next()
          setTimeout(() => transition.next(), 150)
        })
      }
    }
  }
</script>

<style>
  @import '~vux/dist/vux.css';
</style>

<style lang='scss' scoped>
  .count{
    padding-top: 30px;
    font-size: 12px;
    text-align: center;
    color: #666;
    span{
      display: inline-block;
      background: #eee;
      padding: 2px 30px;
      border-radius: 20px;
    }
  }
</style>
