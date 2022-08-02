import Vue from 'vue'
import Avatar from '@/components/IM/avatar.vue'
import store from './store/index'
import tim from '@/utils/IM/tim'
import TIM from 'tim-js-sdk'
import TWebLive from 'tweblive'
import VueClipboard from 'vue-clipboard2'
import './assets/IM/icon/iconfont.css'
import './assets/IM/icon/tim.css'
import './assets/IM/css/animate.css'
import './assets/IM/css/main.styl'

import trtcCalling from '@/utils/IM/trtc-calling'
import TRTCCalling from 'trtc-calling-js'

window.tim = tim
window.TIM = TIM
window.TRTCCalling = TRTCCalling
window.trtcCalling = trtcCalling
window.store = store
Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。
Vue.prototype.tim = tim
Vue.prototype.TIM = TIM
Vue.prototype.TWebLive = TWebLive
Vue.prototype.$store = store
Vue.prototype.trtcCalling = trtcCalling
Vue.prototype.TRTCCalling = TRTCCalling
Vue.use(VueClipboard)
Vue.component('avatar', Avatar)