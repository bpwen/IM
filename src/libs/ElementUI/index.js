/*
 * @文件类型:  Element UI 框架
 * @地址:  https://element.eleme.cn/#/zh-CN
 * @作者: 鹏家公子 
 * @日期: 2020-09-01 12:51:52 
 * @上次修改人:   鹏家公子 
 * @上次修改时间: 2020-09-01 12:51:52 
 */
import Vue from 'vue'
import Cookies from 'js-cookie'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, {
    size: Cookies.get('size') || 'medium'
})