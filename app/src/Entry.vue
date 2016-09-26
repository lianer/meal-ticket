<template>
  <div>
    <x-header :left-options="{showBack: false}">饭票</x-header>
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
    route: {
      activate: function (transition) {
        var vm = this

        vm.$root.loadingVisible = true

        vm.$http.get(locals.api + '/teams').then(({body}) => {
          vm.teams = body.data
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
