import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import conversation from './modules/IM/conversation'
import group from './modules/IM/group'
import userim from './modules/IM/user'
import video from './modules/IM/video'
import friend from './modules/IM/friend'
import blacklist from './modules/IM/blacklist'
import groupLive from './modules/IM/groupLive'
import {Message} from 'element-ui'

import user from './modules/user'
import quickreply from './modules/quickreply'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current: Date.now(), // 当前时间
    intervalID: 0,
    message: undefined
  },
  getters,
  mutations: {
    startComputeCurrent(state) {
      state.intervalID = setInterval(() => {
        state.current = Date.now()
      }, 500)
    },
    stopComputeCurrent(state) {
      clearInterval(state.intervalID)
      state.intervalID = 0
    },
    showMessage(state, options) {
      if (state.message) {
        state.message.close()
      }
      state.message = Message({
        message: options.message,
        type: options.type || 'success',
        duration: options.duration || 2000,
        offset: 40
      })
    }
  },
  modules: {
    conversation,
    group,
    friend,
    blacklist,
    userim,
    video,
    groupLive,
    user,
    quickreply
  }
})
