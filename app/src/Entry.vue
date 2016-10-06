<template>
  <div>
  
    <v-header :title="'报名'">
      <span slot="left"></span>
    </v-header>

    <div class="list" v-if="teams">
      <v-panel v-for="(id, team) in teams" :title="team.teamName" v-link="`/${id}`">
    </div>

    <!-- <group>
      <cell v-for="(id, team) in teams" :title="team.teamName" :link="`/${id}`"></cell>
    </group> -->
  </div>
</template>

<script>
  import vHeader from 'components/v-header.vue'
  import vPanel from 'components/v-panel.vue'

  export default {
    components: {
      vHeader,
      vPanel
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