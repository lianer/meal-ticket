Vue.component('group', vuxGroup)
Vue.component('cell', vuxCell)
Vue.component('checklist', vuxChecklist)

Vue.use(VueResource)

new Vue({
  el: '#app',
  data: {
    member: [],
    selectedMember: []
  },
  methods: {
    change: function (val) {
      var vm = this
      vm.$http.post('/fed/change', {
        member: vm.selectedMember
      })
    }
  },
  init: function () {
    var vm = this
    vm.$http.get('/fed/member').then(function (res) {
      vm.member = res.body.member
      vm.selectedMember = res.body.selectedMember
    })
  }
})
