import axios from 'axios';
import qs from "qs";
import store from '@/store'
import { getToken } from '@/utils/auth'
import { MessageBox } from 'element-ui'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 1000 * 60 * 10,
    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
});

service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['X-Yxd-Admin-Token'] = getToken()
        }
        return config;
    },
    error => {
        return Promise.reject();
    }
);

let openAlert = true
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            const res = response.data
            if (res.code === 501) {
                if(openAlert){
                    openAlert = false

                    MessageBox.alert('系统未登录，请重新登录', '错误', {
                        confirmButtonText: '确定',
                        type: 'error'
                    }).then(() => {
                        store.dispatch('FedLogOut').then(() => {
                            location.reload()
                        })
                    })

                    onSetTimeout()

                    return Promise.reject('error')
                }
            } else if (res.code === 502) {
                if(openAlert){
                    openAlert = false
                    if(!response.request.responseURL.includes('/login;JSESSIONID=')){
                        MessageBox.alert(res.msg, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        })
                    }else{
                        MessageBox.alert('登录超时，请重新登录', '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        }).then(() => {
                            store.dispatch('FedLogOut').then(() => {
                                location.reload()
                            })
                        })
                        return Promise.reject('error')
                    }
                    return Promise.reject('error')
                }
            }else{
                return response;
            }
        } else {
            if(openAlert){
                openAlert = false

                MessageBox.alert('登录超时，请重新登录', '错误', {
                    confirmButtonText: '确定',
                    type: 'error'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload()
                    })
                })
                onSetTimeout()
                
                return Promise.reject('error')
            }
        }
    },
    error => {
        if(openAlert){
            openAlert = false
        
            MessageBox.alert('登录连接超时（后台不能连接，请联系系统管理员）', {
                confirmButtonText: '确定',
                type: 'error',
                duration: 5 * 1000
            }).then(() => {
                store.dispatch('FedLogOut').then(() => {
                    location.reload()
                })
            })

            onSetTimeout()
            
            return Promise.reject(error)
        }
    }
);

function onSetTimeout(){
    setTimeout(() => {
        openAlert = true           
    },1000)
}

export function post(url, data) {
    return new Promise((resolve, reject) => {
        service({
            method: 'post',
            url,
            data
        })
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        });
    })
}

export function postForm(url, data) {
    return new Promise((resolve, reject) => {
        service({
            method: 'post',
            url,
            data: qs.stringify(data)
        })
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        });
    })
}

export function get(url, data) {
    return new Promise((resolve, reject) => {
        service({
            method: 'get',
            url,
            params: data
        })
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
    })
}

export default service;
