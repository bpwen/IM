import tim from '@/utils/IM/tim'

const user = {
    state: {
        currentUserProfile: {},
        isLogin: false,
        isSDKReady: false, // TIM SDK 是否 ready
        userID: 0,
        userSig: '',
        sdkAppID: 0,
    },
    mutations: {
        updateCurrentUserProfile(state, userProfile) {
            state.currentUserProfile = userProfile
        },
        toggleIsLogin(state, isLogin) {
            state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
        },
        toggleIsSDKReady(state, isSDKReady) {
            state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady
        },
        reset(state) {
            Object.assign(state, {
                currentUserProfile: {},
                isLogin: false,
                isSDKReady: false // TIM SDK 是否 ready
            })
        },
        GET_USER_INFO(state, payload) {
            state.userID = payload.userID
            state.userSig = payload.userSig
            state.sdkAppID = payload.sdkAppID
        },
    },
    actions: {
        login({ commit }, userID) {
            return new Promise((resolve, reject) => {
                tim.login({
                    userID: userID,
                    userSig: window.genTestUserSig(userID).userSig,
                }).then(() => {
                    commit("toggleIsLogin", true);
                    commit("startComputeCurrent");
                    commit({
                        type: "GET_USER_INFO",
                        userID: userID,
                        userSig: window.genTestUserSig(userID).userSig,
                        sdkAppID: window.genTestUserSig("").SDKAppID,
                    });
                    resolve('登录成功')
                }).catch((error) => {
                    reject(error)
                });
            })
        },
        logout(context) {
            return new Promise((resolve, reject) => {
                // 若有当前会话，在退出登录时已读上报
                store.dispatch("LogOut").then(() => {
                    if (context.rootState.conversation.currentConversation.conversationID) {
                        tim.setMessageRead({ conversationID: context.rootState.conversation.currentConversation.conversationID })
                    }
                    tim.logout().then(() => {
                        context.commit('toggleIsLogin')
                        context.commit('stopComputeCurrent')
                        context.commit('reset')
                        resolve('退出成功')
                    })
                }).catch((error) => {
                    reject(error)
                });
            })
        }
    }
}

export default user
