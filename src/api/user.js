/*
 * @Name: 获取用户信息
 * @Author: bpwen.cn
 * @Date: 2021-07-22 16:45:23
 * @LastEditors: VSCode
 * @LastEditTime: 2021-07-26 13:43:29
 */
import { get } from '@/utils/request'

/** 基本信息获取用户信息 */
export const getUserInfo = params => {
    return get('/user/getUserInfo', params);
}

/** 查找会员等级设置 */
export const getUserGrade = params => {
    return get('/userLevelSet/findById', params);
}