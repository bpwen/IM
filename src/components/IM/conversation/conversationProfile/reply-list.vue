<!--
 * @Name: 快捷回复管理
 * @Author: bpwen.cn
 * @Date: 2021-07-22 16:05:19
 * @LastEditors: VSCode
 * @LastEditTime: 2021-07-23 18:01:30
-->

<template>
    <div class="app-container">
        <!-- 查询和其他操作 -->
        <div class="m-15-b ui-ali-r">
            <el-button
                type="primary"
                icon="el-icon-edit"
                @click="onAdd"
                >新增</el-button
            >
        </div>

        <!-- 查询结果 -->
        <el-table
            v-loading="table.Loading"
            :data="table.list"
            element-loading-text="正在查询中。。。"
            border
            fit
            highlight-current-row
        >
            <el-table-column
                width="100"
                align="center"
                prop="id"
                label="ID"
            ></el-table-column>

            <el-table-column
                prop="content"
                label="内容"
                :show-overflow-tooltip="true"
            ></el-table-column>

            <el-table-column label="操作" width="160" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="onEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="onDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
        width="1000px"
        v-if="dialog.visible"
        :title="dialog.title.name[dialog.title.index]"
        :visible.sync="dialog.visible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :modal="false"
        >
            <AddEdit @callback="onAddCallback" :item="dialog.item"></AddEdit>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { msgDel } from '@/api/MessageTemplate'
import AddEdit from './add-reply-list'

export default {
    name: "communication",
    components:{
        AddEdit
    },
    data() {
        return {
            query: {
                fromAccount: "",
                fromName:'',
                page: 1,
                limit: 10
            },
            table:{
                Loading: true,
                list:[]
            },
            dialog:{
                visible: false,
                title:{
                    name:['新增模板', '修改模板'],
                    index: 0
                },
                item:{}
            }
        };
    },
    watch:{
        'quickreply.list': {
            deep: true,
            immediate: true,
            handler: function (v) {
                this.table.list = v
                this.table.Loading = false;
            }
        },
    },
    computed: {
        ...mapState(['quickreply'])
    },
    methods: {
        /**
         * @name: 添加数据按钮绑定事件
         */  
        onAdd(){
            this.dialog.title.index = 0;
            this.dialog.visible = true;
            this.dialog.item = {}
        },
        /**
         * @name: 修改数据按钮绑定
         */  
        onEdit(row){
            this.dialog.title.index = 1;
            this.dialog.visible = true;
            this.dialog.item = row;
        },
        /**
         * @name: 添加和修改数据成功后回调操作
         */  
        onAddCallback(){
            this.dialog.visible = false;
            this.onmsgList()
        },
        /**
         * @name: 删除数据按钮绑定
         */  
        onDel(row){
            this.$confirm("确定要删除吗？", "提示", {
                confirmButtonText: "确定删除",
                cancelButtonText: "我再想想",
                type: "warning"
            }).then(() => {
                msgDel({id:row.id}).then((res) => {
                    if(res.code == 0){
                        this.$message.success('删除成功');
                        this.onmsgList()
                    }
                }).catch(() => {
                    this.$message.error('删除数据异常,请联系管理员');
                });
            })
        },
        /* 获取快捷回复 */
        onmsgList(){
            this.$store.dispatch('getQuickReplyList')
        }
    }
};
</script>