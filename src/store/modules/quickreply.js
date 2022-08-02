/*
 * @Name: 快捷回复
 * @Author: bpwen.cn
 * @Date: 2021-07-23 17:18:10
 * @LastEditors: VSCode
 * @LastEditTime: 2021-07-23 17:35:09
 */
import { msgList } from '@/api/MessageTemplate'

const quickreply = {
    state: {
        list: []
    },

    mutations: {
        SET_LIST: (state, code) => {
            state.list = code
        }
    },

    actions: {
        // 获取快捷回复列表
        getQuickReplyList({ commit }) {
            return new Promise((resolve, reject) => {
                msgList().then((res) => {
                    if(res.code == 0){
                        commit('SET_LIST', res.data)
                        resolve()
                    }else{
                        reject()
                    }
                }).catch(() => {
                    reject()
                });
            })
        }
    }
}

export default quickreply
