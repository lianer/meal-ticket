<template>
  <div class="page-apply">
    <x-header :left-options="{showBack: true, backText: ''}">报名</x-header>

    <group title="" v-if="showInput">
      <x-input :placeholder="'请输入你的姓名，一天只能提交一次'" :value.sync="value" :required="false" @keyup.enter="confirmSubmit">
        <icon type="search" @click="confirmSubmit"></icon>
      </x-input>
    </group>
    
    <div class="count"><span>{{today}} 已报名{{member.length}}人</span></div>
    
    <group title="成员列表">
      <cell v-for="item in member" :title="item" :link="'/' + team + '/' + item">
        <!-- <icon type="clear" @click.stop="confirmRemove(item)"></icon> -->
      </cell>
    </group>
    
    <toast :show.sync="already" :type="'text'">该成员已存在</toast>
    
    <confirm :show.sync="confirm" title="确认删除？" @on-confirm="remove(true)" @on-cancel="remove(false)"></confirm>
    <confirm :show.sync="showConfirmSubmitModal" title="每天只有一次提交，确认提交？" @on-confirm="submit(true)" @on-cancel="submit(false)"></confirm>
  </div>
</template>

<script>
  import moment from 'moment'
  import store from 'store'

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
        member: [],
        value: '',
        already: false,
        confirm: false,
        today: moment().format('YYYY-MM-DD').toString(),
        timer: -1,
        showInput: true,
        showConfirmSubmitModal: false
      }
    },
    computed: {
      team () {
        return 'yypt'
        // debugger
        // console.log(this.$route.params.team)
        // return this.$route.params.team
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

        // keydown后同步修改vm.value，不会生效
        // 可能是插件监听keyup事件后重新赋值
        // 改成keyup解决了
        vm.value = ''

        vm.$http({
          method: 'post',
          url: locals.api + '/team/apply',
          body: {
            teamId: vm.$route.params.team,
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
              teamId: vm.$route.params.team,
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
            teamId: vm.$route.params.team
          }
        }).then(function ({body}) {
          vm.member = body.data
        })
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
        vm.$root.loadingVisible = true
        vm.update().then(function () {
          vm.$root.loadingVisible = false
          // 不知道什么原因，loading的动画，会被下一页的入场动画打断，导致loading的遮罩层永远不隐藏
          // 猜测可能是入场动画的transform导致loading的opacity的事件被打断
          transition.next()
          // setTimeout(() => transition.next(), 150)
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

<style lang='scss' scoped>
  .page-apply{
    .weui_cell{
      cursor: pointer;
    }
  }
</style>