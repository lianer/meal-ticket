<template>
  <div :style="{'min-height': $root.clientHeight}">
    <v-header :title="'报名'">
      <span slot="left"></span>
    </v-header>

    <div class="list" v-if="teams">
      <v-panel v-for="(id, team) in teams" :title="team.teamName" v-link="`/${id}`">
    </div>
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

        vm.$http.get(locals.api + '/teams').then(({body}) => {
          vm.teams = body.data
          vm.$root.loadingVisible = false
          transition.next()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .list{
    margin: 0 12px;
    border-radius: 8px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, .1);
  }
</style>
