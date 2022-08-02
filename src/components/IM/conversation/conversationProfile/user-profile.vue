<!--
 * @Name: 右边相关信息
 * @Author: bpwen.cn
 * @Date: 2021-07-13 18:37:49
 * @LastEditors: VSCode
 * @LastEditTime: 2021-07-29 15:09:13
-->
<template>
    <div class="tabs">
        <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="basic">
                <BasicInformation :user="user" :Grade="Grade"></BasicInformation>
                <h5>订单信息</h5>
                <div class="p-15 list">
                    <div
                        v-for="(item, index) in order.list"
                        :key="index"
                        class="m-10-b p-10-b ui-hx"
                    >
                        <!--
                        <div class="ui-flex ">
                            <div class="w-30-b m-10-r">
                                <el-image :src="item.src" fit="fill"></el-image>
                            </div>
                            <div class="w-70-b ui-flex-wrap">
                                <div class="w-100-b ui-text-xd">{{ item.title }}</div>
                                <div class="w-100-b ui-ali-r">￥{{ item.Price }}</div>
                            </div>
                        </div>
                        -->

                        <div class="ui-flex">
                            <div class="label">订单：</div>
                            <div class="orderSn">{{ item.orderSn }}</div>
                        </div>
                        <div class="ui-flex-center">
                            <div class="ui-flex">
                                <div class="label">状态：</div>
                                <div>{{ item.orderStatus | orderStatusFilter }}</div>
                            </div>
                            <div class="ui-flex">
                                <div class="label">金额：</div>
                                <div class="Price">￥{{ item.orderPrice }}</div>
                            </div>
                        </div>
                        <div class="ui-flex ui-ali-r">
                            <div class="label">时间：</div>
                            <div>{{ item.addTime }}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="快捷回复" name="quick">
                <BasicInformation :user="user" :Grade="Grade"></BasicInformation>
                <h5 class="ui-flex-center">
                    <div>快捷回复</div>
                    <div><el-button size="mini" @click="onMis">管理</el-button></div>
                </h5>
                <div class="p-15 list">
                    <div
                        v-for="(item, index) in table.list"
                        :key="index"
                        class="ui-flex-center m-20-b p-20-b ui-hx"
                    >
                        <div class="ui-text-xd ui-text-xd-3">
                            {{item.content}}
                        </div>
                        <div>
                            <el-button type="primary" size="mini" @click="onSendOut(item)">发送</el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

        <el-dialog
        v-if="dialog.visible"
        :title="dialog.title"
        width="1000px"
        :visible.sync="dialog.visible"
        :close-on-click-modal="false"
        :close-on-press-escape="false">
            <ReplyList></ReplyList>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BasicInformation from './BasicInformation'
import ReplyList from './reply-list'
import { getUserInfo, getUserGrade } from '@/api/user'
import { msgList } from '@/api/MessageTemplate'
import { ApiOrderList } from '@/api/order'

const statusMap = {
  101: "未付款",
  102: "用户取消",
  103: "系统取消",
  201: "已付款",
  202: "申请退款",
  203: "已退款",
  301: "已发货",
  401: "用户收货",
  402: "系统收货",
};

export default {
    components:{
        BasicInformation,
        ReplyList
    },
    props: {
        userProfile: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            activeName: "basic",
            messageContent: "",
            dialog:{
                visible: false,
                title: '快捷回复管理'
            },
            user:{},
            Grade:"",
            table:{
                list:[]
            },
            order:{
                list:[]
            }
        };
    },
    filters: {
        orderStatusFilter(status) {
            return statusMap[status];
        },
    },
    watch:{
        toAccount: {
            immediate: true,
            handler: function (v) {
                this.onUserInfo()
            }
        },
        'quickreply.list': {
            deep: true,
            handler: function (v) {
                this.table.list = v
            }
        },
    },
    computed: {
        ...mapState(['quickreply']),
        ...mapGetters(['toAccount', 'currentConversationType']),
    },
    mounted(){
        this.onmsgList()
    },
    methods: {
        /* 快捷回复按钮事件 */
        onSendOut(item){
            this.$confirm("确定要发送："+ item.content, "提示", {
                confirmButtonText: "确定发送",
                cancelButtonText: "取消发送",
                type: "warning"
            }).then(() => {
                this.messageContent = item.content
                this.sendTextMessage()
            })
        },
        /* 快捷回复按钮发送信息 */
        sendTextMessage() {
            if (this.messageContent === "" || this.messageContent.trim().length === 0) {
                this.messageContent = "";
                this.$store.commit("showMessage", {
                    message: "不能发送空消息哦！",
                    type: "info",
                });
                return;
            }
            const message = this.tim.createTextMessage({
                to: this.toAccount,
                conversationType: this.currentConversationType,
                payload: { text: this.messageContent },
            });
            this.$store.commit("pushCurrentMessageList", message);
            this.$bus.$emit("scroll-bottom");
            this.tim.sendMessage(message).catch((error) => {
                this.$store.commit("showMessage", {
                    type: "error",
                    message: error.message,
                });
            });
            this.messageContent = "";
        },
        onMis(){
            this.dialog.visible = true
        },
        /* 获取用户信息 */
        onUserInfo(){
            getUserInfo({
                imAccount: this.toAccount
            }).then((res) => {
                if(res.code == 0 && res.data){
                    this.user = res.data
                    if(this.user.userLevel != 0){
                        this.onUserGrade(this.user.userLevel)
                    }else{
                        this.Grade = '普通用户'
                    }
                    this.onOrderList(this.user.id)
                }else{
                    this.user = {}
                    this.Grade = ''
                }
            }).catch((res) => {
                this.user = {}
                this.Grade = ''
            });
        },
        /* 查找会员等级 */
        onUserGrade(id){
            getUserGrade({
                id: id
            }).then((res) => {
                if(res.code == 0){
                    this.Grade = res.data.levelName
                }
            }).catch((res) => {
                this.user = {}
            });
        },
        /* 获取快捷回复 */
        onmsgList(){
            this.$store.dispatch('getQuickReplyList')
        },
        /* 获取订单信息 */
        onOrderList(id){
            console.log(id)
            ApiOrderList({
                id: id
            }).then((res) => {
                if(res.code == 0){
                    this.order.list = res.data.items;
                }else{
                    this.order.list = []
                }
            }).catch((res) => {
                this.order.list = []
            });
        }
    },
};
</script>

<style lang="less" scoped>
h5 {
    height: 45px;
    line-height: 45px;
    background: #f5f5f5;
    border-top: 1px solid #e7e7e7;
    border-bottom: 1px solid #e7e7e7;
    padding: 0px 15px;
    margin: 0px;
}
.list {
    font-size: 14px;
    line-height: 30px;
    height: 515px;
    overflow: hidden;
    &:hover {
        overflow-y: overlay;
    }
    .orderSn{
        color: #5cadff;
    }
    .Price{
        color: #f00;
    }
}
.tabs {
    /deep/.el-tabs {
        .el-tabs__header {
            margin: 0px;
            .el-tabs__item {
                width: 50%;
                height: 50px;
                line-height: 50px;
                padding: 0px;
                text-align: center;
            }
            .el-tabs__nav {
                width: 100%;
            }
        }
    }
}
</style>