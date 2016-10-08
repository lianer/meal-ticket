import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import './filters.js'

import 'assets/scss/common.scss'

import App from './App.vue'
import Entry from './Entry.vue'
import Apply from './Apply.vue'
import User from './User.vue'
import Test from './Test.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.mixin({
  data () {
    return {
      locals: locals  // locals 是通过 ProvidePlugin 插件定义的全局变量，可全局访问
    }
  }
})

const router = new VueRouter({
  // hashbang: false,
  // abstract: true,
  history: true
})

// 路由跳转处理，包括动效控制
// var historyStack = []
// router.beforeEach(function (transition) {
//   var fromPath = transition.from.path
//   var toPath = transition.to.path
//   var direction
//   var index = historyStack.length - 1

//   if (!fromPath) {
//     // 首次进入
//     direction = 'current'
//     historyStack.push(toPath)
//   } else if (toPath === historyStack[index]) {
//     // 刷新
//     direction = 'current'
//   } else if (toPath === historyStack[index - 1]) {
//     // 后退
//     direction = 'back'
//     historyStack.splice(index, 1)
//   } else {
//     // 前进
//     direction = 'forward'
//     historyStack.push(toPath)
//   }

//   router.app.direction = direction

//   Vue.nextTick(() => transition.next())
// })

var getPathLength = function (str) {
  var arr = str.split('/').filter(function (str) {
    return str !== ''
  })
  return arr.length
}

// 新路由跳转逻辑
router.beforeEach(function (transition) {
  var fromPath = transition.from.path
  var toPath = transition.to.path
  var direction

  if (!fromPath) {
    direction = 'current'
  } else if (getPathLength(fromPath) < getPathLength(toPath)) {
    direction = 'forward'
  } else if (getPathLength(fromPath) > getPathLength(toPath)) {
    direction = 'back'
  } else {
    direction = 'current'
  }

  router.app.direction = direction

  Vue.nextTick(() => transition.next())
})

router.map({
  '/': {
    component: Entry
  },
  '/:team': {
    component: Apply
  },
  '/:team/:user': {
    component: User
  },
  '/test': {
    component: Test
  }
})

router.start(App, '#app')
