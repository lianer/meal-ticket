import Vue from 'vue'

// 全局过滤器
Vue.filter('reverse', function (list) {
  return list.slice().reverse()
})
