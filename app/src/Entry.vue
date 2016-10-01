<template>
  <div>
  
    <x-header :title="'报名'">
      <span slot="left"></span>
    </x-header>

    <div class="list">
      <x-panel v-for="(id, team) in teams" :title="team.teamName" v-link="`/${id}`">
    </div>

    <!-- <group>
      <cell v-for="(id, team) in teams" :title="team.teamName" :link="`/${id}`"></cell>
    </group> -->
  </div>
</template>

<script>
  import Group from 'vux/src/components/group'
  import Cell from 'vux/src/components/cell'
  import xInput from 'vux/src/components/x-input'

  import xHeader from 'components/x-header.vue'
  import xPanel from 'components/x-panel.vue'

  export default {
    components: {
      Group,
      Cell,
      xInput,
      xHeader,
      xPanel
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
        // vm.$root.$refs.header.leftOptions.showBack = false
        // vm.$root.$refs.header.title = '报名'

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

<style lang="scss" scoped>
  .list{
    margin: 0 12px;
    border-radius: 8px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, .1);
  }
</style>