<template>
  <div>
    <group>
      <cell v-for="(id, team) in teams" :title="team.teamName" :link="`/${id}`"></cell>
    </group>
  </div>
</template>

<script>
  import Group from 'vux/src/components/group'
  import Cell from 'vux/src/components/cell'
  import xInput from 'vux/src/components/x-input'

  export default {
    components: {
      Group,
      Cell,
      xInput
    },
    data () {
      return {
        teams: []
      }
    },
    route: {
      activate: function (transition) {
        var vm = this

        vm.$root.loadingVisible = true
        vm.$root.$refs.header.leftOptions.showBack = false
        vm.$root.$refs.header.title = '报名'

        vm.$http.get(locals.api + '/teams').then(({body}) => {
          vm.teams = body.data
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
