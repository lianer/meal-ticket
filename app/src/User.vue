<template>
  <div class="page-user" :style="{'min-height': $root.clientHeight}">
    <div class="page-wrap" :style="{'min-height': $root.clientHeight}">
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

    <div class="page-sticky-footer" v-if="showDeleteUser">
      <span @click="confirmDeleteUser">取消报名</span>
    </div>

    <confirm :show.sync="showConfirmDeleteUser" @on-confirm="deleteUser" title="每日只能报名一次，取消后将不能再次报名，确定？"></confirm>
  </div>
</template>

<script>
  import moment from 'moment'
  import store from 'store'
  import _ from 'lodash'

  import confirm from 'vux/src/components/confirm'

  import vHeader from 'components/v-header.vue'

  export default {
    components: {
      confirm,
      vHeader
    },
    data () {
      return {
        teamId: '',
        teamName: '',
        userName: '',
        count: 0,
        info: {},
        showDeleteUser: false,
        showConfirmDeleteUser: false
      }
    },
    methods: {
      confirmDeleteUser: function () {
        var vm = this
        vm.showConfirmDeleteUser = true
      },
      deleteUser: function () {
        var vm = this
        vm.$root.loadingVisible = true
        vm.$http({
          method: 'delete',
          url: locals.api + '/team/apply',
          body: {
            teamId: vm.teamId,
            userName: vm.userName
          }
        }).then(function () {
          vm.$root.loadingVisible = false
          window.history.back()
        })
      }
    },
    route: {
      activate: function (transition) {
        var vm = this

        vm.teamId = vm.$route.params.team
        vm.userName = vm.$route.params.user
        vm.$root.loadingVisible = true

        var whoami = {
          date: moment().format('YYYY-MM-DD'),
          teamId: vm.teamId,
          userName: vm.userName
        }
        if (_.isEqual(store.get('whoami'), whoami)) {
          vm.showDeleteUser = true
        }

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
  $page-sticky-footer-height: 60px;
  $page-sticky-footer-padding: 12px;
  .page-wrap{
    margin-bottom: -$page-sticky-footer-height;
    &:after{
      content: "";
      display: block;
      height: $page-sticky-footer-height;
    }
  }
  .page-sticky-footer{
    padding: $page-sticky-footer-padding;
    span{
      display: block;
      width: 100%;
      height: $page-sticky-footer-height - $page-sticky-footer-padding * 2;
      background: #f7446c;
      font-size: 14px;
      text-align: center;
      line-height: $page-sticky-footer-height - $page-sticky-footer-padding * 2;
      color: #fff;
      border-radius: 8px;
    }
  }
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
    margin: 12px 0 0;
    font-size: 12px;
    text-align: center;
  }
</style>
