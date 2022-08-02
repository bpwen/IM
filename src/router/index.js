import Vue from 'vue'
import { getToken } from '@/utils/auth'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component:  resolve => require(['@/views/login.vue'], resolve)
    },
    {
        path: '/index',
        name: 'index',
        component:  resolve => require(['@/views/index.vue'], resolve)
    }
]

const router = new VueRouter({
    routes
})

//页面头部进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
    easing: "ease", // 动画方式
    speed: 600, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    // trickleSpeed: 200, // 自动递增间隔
    // minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    const role = getToken()

    /** 设置页面 title 标题 */
    let { keywords, description } = ""
    if (to.meta.title) {
        document.title = keywords = description = to.meta.title
    }
    /** 设置 关键词 和 页面描述 */
    if (to.meta.content) {
        keywords = to.meta.content.keywords
        description = to.meta.content.description
    }
    document.querySelector('meta[name="keywords"]').setAttribute('content', keywords)
    document.querySelector('meta[name="description"]').setAttribute('content', description)

    /** 判断用户登录否相关跳转 */
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        role === "admin-token" ? next() : next('/403');
    } else {
        next(); 
    }
});

router.afterEach(() => {
    NProgress.done()
})

export default router
