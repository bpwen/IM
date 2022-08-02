<!--
 * @Name: 基础信息
 * @Author: bpwen.cn
 * @Date: 2021-07-22 15:32:18
 * @LastEditors: VSCode
 * @LastEditTime: 2021-07-27 17:55:32
-->
<template>
    <div class="info">
        <div class="ui-flex">
            <div class="label">姓　名：</div>
            <div>{{user.nickname}}</div>
        </div>
        <div class="ui-flex">
            <div class="label">手机号：</div>
            <div>{{user.mobile}}</div>
        </div>
        <div class="ui-flex">
            <div class="label">身份：</div>
            <div>{{Grade}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            user:{
               type:[Object, Array],
               default: ()=>{}
            },
            Grade:{
               type:String,
               default: ''
            }
        }
    };
</script>

<style lang="less" scoped>
.info {
    padding: 20px;
    line-height: 30px;
    font-size: 14px;
    .label {
        width: 70px;
    }
}
</style>