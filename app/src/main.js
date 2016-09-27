import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import './filters.js'

import 'assets/scss/common.scss'

import App from './App.vue'
import Entry from './Entry.vue'
import Apply from './Apply.vue'
import User from './User.vue'

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
var historyStack = []
router.beforeEach(function (transition) {
  var fromPath = transition.from.path
  var toPath = transition.to.path
  var direction
  var index = historyStack.length - 1

  // console.log(toPath, historyStack, index)
  if (!fromPath) {
    // 首次进入
    direction = 'current'
    historyStack.push(toPath)
  } else if (toPath === historyStack[index]) {
    // 刷新
    direction = 'current'
  } else if (toPath === historyStack[index - 1]) {
    // 后退
    direction = 'back'
    historyStack.splice(index, 1)
  } else {
    // 前进
    direction = 'forward'
    historyStack.push(toPath)
  }

  router.app.direction = direction

  router.app.$refs.header.leftOptions = {
    backText: '',
    preventGoBack: false,
    showBack: true
  }
  router.app.$refs.header.rightOptions = {
    showMore: false
  }
  router.app.$refs.header.title = ''
  router.app.$refs.header.transition = ''

  // Vue.nextTick(function () {
  //   router.app.$refs.header.transition = `vux-route-header-${direction}`
  //   Vue.nextTick(function () {
  //     transition.next()
  //   })
  // })

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
  }
})

router.start(App, '#app')
