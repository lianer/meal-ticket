<template>
  <div class="page-apply">
    <x-header :left-options="{showBack: true, backText: ''}" style="background: #8dc128;">报名</x-header>
    
    <group title="">
      <x-input :placeholder="'请输入姓名'" :value.sync="value" :required="false" @keydown.enter="submit">
        <icon type="search" @click="submit"></icon>
      </x-input>
    </group>
    
    <div class="count"><span>已报名{{member.length}}人</span></div>
    
    <group title="成员列表">
      <cell v-for="item in member" :title="item" :link="'/' + team + '/' + item">
        <icon type="clear" @click.stop="confirmRemove(item)"></icon>
      </cell>
    </group>
    
    <toast :show.sync="already" :type="'text'">该成员已存在</toast>
    
    <confirm :show.sync="confirm" title="确认删除？" @on-confirm="remove(true)" @on-cancel="remove(false)"></confirm>
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
        member: [],
        value: '',
        already: false,
        confirm: false
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
      submit: function () {
        var vm = this
        var value = vm.value.trim()
        if (!value) {
          return
        }
        if (vm.member.indexOf(value) > -1) {
          vm.already = true
          return
        }
        vm.member.splice(0, 0, value)
        vm.value = ''

        vm.$http({
          method: 'post',
          url: locals.api + '/team/apply',
          body: {
            teamId: vm.$route.params.team,
            userName: value
          }
        })
      },
      remove: function (ok) {
        var vm = this
        vm.$http({
          method: 'delete',
          url: locals.api + '/team/apply',
          body: {
            teamId: vm.$route.params.team,
            userName: vm.confirmTarget
          }
        })
        if (ok) {
          vm.member.$remove(vm.confirmTarget)
        }
        vm.confirmTarget = null
      },
      confirmRemove: function (item) {
        var vm = this
        vm.confirmTarget = item
        vm.confirm = true
      }
    },
    compiled: function () {
      var vm = this
      vm.$http({
        method: 'get',
        url: locals.api + '/team/apply',
        params: {
          teamId: vm.$route.params.team
        }
      }).then(function ({body}) {
        vm.member = body.data
      })
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