import { loginByUsername, logout } from '@/api/login'
import { getToken, setToken, removeToken, setCookies, removeCookies } from '@/utils/auth'

const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: getToken(),
        Account:"",
        name: '',
        avatar: '',
        introduction: '',
        roles: [],
        perms: [],
        setting: {
            articlePlatform: []
        }
    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_ACCOUNT: (state, str) => {
            state.Account = str
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PERMS: (state, perms) => {
            state.perms = perms
        }
    },

    actions: {
        // 用户名登录
        LoginByUsername({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginByUsername(userInfo).then((res) => {
                    if (res.code == 0) {
                        let data = res.data
                        const token = data.token
                        const Account = data.Im_Account
                        commit('SET_TOKEN', token)
                        commit('SET_ACCOUNT', Account)
                        setToken(token)
                        setCookies('ACCOUNT', Account)
                        resolve(Account)
                    } else {
                        reject(res)
                    }
                }).catch(() => {
                    reject(res)
                });
            })
        },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('SET_PERMS', [])
                    removeToken()
                    removeCookies('ACCOUNT')
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user
