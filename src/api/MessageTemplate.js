/*
 * @Name: 快捷回复-接口
 * @Author: bpwen.cn
 * @Date: 2021-07-23 14:50:30
 * @LastEditors: VSCode
 * @LastEditTime: 2021-07-23 17:01:15
 */
import { post, get } from '@/utils/request'

/** 获取列表 */
export const msgList = params => {
    return get('/msg/list', params);
}

/** 添加数据 */
export const msgAdd = params => {
    return post('/msg/add', params);
}

/** 更新数据 */
export const msgUpdate = params => {
    return post('/msg/modify', params);
}

/** 删除数据 */
export const msgDel = (params) => {
    return get('/msg/remove', params);
}