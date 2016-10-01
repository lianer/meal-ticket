<template>
  <div class="page-apply">

    <x-header :title="teamName"></x-header>

    <div class="search" v-show="1">
      <input type="search" 
        v-model="value" 
        :placeholder="placeholder" 
        @keyup.enter="confirmSubmit" 
        @keydown.tab.prevent="useLastApplyUserName"
      >
    </div>

    <div class="total"><span>{{today}} 已报名{{member.length}}人</span></span></div>

    <div class="list">
      <x-panel v-for="item in member" :title="item" v-link="'/' + teamId + '/' + item" :summary="'我为加班而自豪'">
        <span slot="left">
          <img :src="'/static/img/avatar/' + $index + '.jpg'">
        </span>
      </x-panel>
    </div>
    
    <toast :show.sync="already" :type="'text'">该成员已存在</toast>
    
    <confirm :show.sync="confirm" title="确认删除？" @on-confirm="remove(true)" @on-cancel="remove(false)"></confirm>
    <confirm :show.sync="showConfirmSubmitModal" title="每天只有一次提交，确认提交？" @on-confirm="submit(true)" @on-cancel="submit(false)"></confirm>
  </div>
</template>

<script>
  import moment from 'moment'
  import store from 'store'

  import toast from 'vux/src/components/toast'
  import confirm from 'vux/src/components/confirm'

  import xHeader from 'components/x-header.vue'
  import xPanel from 'components/x-panel.vue'

  export default {
    components: {
      toast,
      confirm,
      xHeader,
      xPanel
    },
    data () {
      return {
        member: [],
        value: '',
        already: false,
        confirm: false,
        today: moment().format('YYYY-MM-DD').toString(),
        timer: -1,
        showInput: true,
        showConfirmSubmitModal: false,
        teamId: '',
        teamName: '',
        lastApplyUserName: ''
      }
    },
    computed: {
      placeholder: function () {
        var vm = this
        if (vm.lastApplyUserName) {
          return vm.lastApplyUserName + '  [ tab ]'
        }
        return '请输入你的姓名，一天只能提交一次'
      }
    },
    methods: {
      confirmSubmit: function () {
        var vm = this
        var value = vm.value.trim()
        if (!value) {
          return
        }
        vm.showConfirmSubmitModal = true
      },
      submit: function (ok) {
        var vm = this
        var value = vm.value.trim()
        if (!ok) {
          return
        }
        if (!value) {
          return
        }
        if (vm.member.indexOf(value) > -1) {
          vm.already = true
          return
        }
        var date = 'date_' + moment().format('YYYY-MM-DD').toString()
        store.set(date, 1)
        vm.showInput = false

        store.set('lastApplyUserName', value)

        // keydown后同步修改vm.value，不会生效
        // 可能是插件监听keyup事件后重新赋值
        // 改成keyup解决了
        vm.value = ''

        vm.$http({
          method: 'post',
          url: locals.api + '/team/apply',
          body: {
            teamId: vm.teamId,
            userName: value
          }
        }).then(function () {
          vm.update()
        }, function () {
          store.set(date, 0)
        })
      },
      remove: function (ok) {
        var vm = this
        if (ok) {
          vm.member.$remove(vm.confirmTarget)
          vm.$http({
            method: 'delete',
            url: locals.api + '/team/apply',
            body: {
              teamId: vm.teamId,
              userName: vm.confirmTarget
            }
          }).then(function () {
            vm.update()
          })
        }
        vm.confirmTarget = null
      },
      confirmRemove: function (item) {
        var vm = this
        vm.confirmTarget = item
        vm.confirm = true
      },
      update: function () {
        var vm = this
        return vm.$http({
          method: 'get',
          url: locals.api + '/team/apply',
          params: {
            teamId: vm.teamId
          }
        }).then(function ({body}) {
          vm.member = body.data
        })
      },
      useLastApplyUserName: function () {
        var vm = this
        if (vm.lastApplyUserName) {
          vm.value = vm.lastApplyUserName
        }
      }
    },
    ready: function () {
      var vm = this
      var poll = async function () {
        await vm.update()
        vm.timer = setTimeout(poll, 2000)
      }
      vm.timer = setTimeout(poll, 1000)

      var date = 'date_' + moment().format('YYYY-MM-DD').toString()
      if (store.get(date)) {
        vm.showInput = false
      }
    },
    destroyed: function () {
      var vm = this
      clearTimeout(vm.timer)
    },
    route: {
      activate: function (transition) {
        var vm = this

        vm.teamId = vm.$route.params.team
        vm.$root.loadingVisible = true

        if (store.get('lastApplyUserName')) {
          vm.lastApplyUserName = store.get('lastApplyUserName')
        }

        vm.$http({
          method: 'get',
          url: locals.api + '/team/name',
          params: {
            teamId: vm.teamId
          }
        }).then(function ({body}) {
          vm.teamName = body.data.teamName
          // vm.$root.$refs.header.title = vm.teamName
        }).then(function () {
          return vm.update()
        }).then(function () {
          vm.$root.loadingVisible = false
          // 不知道什么原因，loading的动画，会被下一页的入场动画打断，导致loading的遮罩层永远不隐藏
          // 猜测可能是入场动画的transform导致loading的opacity的事件被打断
          transition.next()
        })
      }
    }
  }
</script>

<style lang='scss'>
  @import '~vux/dist/vux.css';
</style>

<style lang='scss' scoped>
  .total{
    margin: 12px 0;
    font-size: 12px;
    text-align: center;
  }
  .list{
    margin: 0 12px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, .1);
    img{
      display: inline-block;
      width: 40px;
      height: 40px;
      margin-right: 10px;
      border-radius: 100px;
    }
  }
  .page-apply{
    .weui_cell{
      cursor: pointer;
    }
  }
  .search{
    margin: 24px 12px;
    input{
      width: 100%;
      height: 32px;
      padding: 0 12px 0 12px;
      border: none;
      border-radius: 8px;
      background: #e2e2e2;
      outline: none;
      -webkit-appearance: none;
    }
  }
</style>
