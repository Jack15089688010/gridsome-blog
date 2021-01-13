// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
// import mavonEditor from 'mavon-editor'
import store from './store'
import util from './utils/util'

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { appOptions, router, head, isClient }) {
  // Set default layout as a global component
  Vue.use(ElementUI)
  Vue.use(Vuex)
  appOptions.store = new Vuex.Store(store)

  // Vue.use(mavonEditor)
  // Vue.prototype.$markdown = function (value) {
  //   return mavonEditor.markdownIt.render(value)
  // }
  Vue.prototype.$util = util
  Vue.component('Layout', DefaultLayout)
}
