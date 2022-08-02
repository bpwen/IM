/*
 * @Name: 订单管理
 * @Author: bpwen.cn
 * @Date: 2021-07-26 13:57:26
 * @LastEditors: VSCode
 * @LastEditTime: 2021-07-26 13:58:32
 */

import { get } from '@/utils/request'

/** 基本信息获取用户信息 */
export const ApiOrderList = params => {
    return get('/order/list', params);
}