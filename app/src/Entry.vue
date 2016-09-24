<template>
  <div>
    <x-header :left-options="{showBack: false}" style="background: #8dc128;">饭票</x-header>
    <group>
      <cell v-for="(id, team) in teams" :title="team.teamName" :link="`/${id}`"></cell>
    </group>
  </div>
</template>

<script>
  import xHeader from 'vux/src/components/x-header'
  import Group from 'vux/src/components/group'
  import Cell from 'vux/src/components/cell'
  import xInput from 'vux/src/components/x-input'

  export default {
    components: {
      Group,
      Cell,
      xHeader,
      xInput
    },
    data () {
      return {
        teams: []
      }
    },
    init: function () {
      var vm = this
      console.log(vm)
      vm.$http.get(locals.api + '/teams').then(({body}) => {
        vm.teams = body.data
      })
    }
  }
</script>

<style>
  @import '~vux/dist/vux.css';
</style>
