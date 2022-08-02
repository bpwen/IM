import Vue from 'vue'

//axios核心类库，ajax
import axios from 'axios'
//这时候如果在其它的组件中，是无法使用 axios 命令的。所以我们将 axios 改写为 Vue 的原型属性
Vue.prototype.$axios = axios