<!--
 * @Name: 快捷回复-添加修改
 * @Author: bpwen.cn
 * @Date: 2021-07-23 15:33:47
 * @LastEditors: VSCode
 * @LastEditTime: 2021-07-26 09:08:33
 * @url: 
-->

<template>
    <div class="p-40-lr">
        <el-form :model="form" ref="form" :rules="rules" label-position="top">
            <el-form-item label="回复内容" prop="content">
                <el-input type="textarea" :rows="10" v-model="form.content" maxlength="500" show-word-limit></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')" :loading="btn.loading">{{ btn.loading ? "提交中" : "保存" }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { msgAdd, msgUpdate } from '@/api/MessageTemplate'

    export default {
        name: "customerService_addEdit",
        props:{
            item:{
               type:[Object],
               default: () => {}
            }
        },
        data () {
            return {
                form: {
                    content: ""
                },
                rules:{
                    content: [
                        { required: true, message: '请输入客服昵称', trigger: 'blur' },
                        { min: 2, max: 500, message: '长度在 2 到 500 个字符', trigger: 'blur' }
                    ]
                },
                btn:{
                    loading: false
                }
            }
        },
        created () {
            if(!JSON.none(this.item)){
                this.form = {...this.item}
            }
        },
        methods: {
            /**
            * @name:  提交数据添加或修改
            */ 
            onSubmit(formName) {
               this.$refs[formName].validate((res) => {
                    if (res) {
                        this.btn.loading = true;
                        if(!JSON.none(this.item)){
                            this.onEdit()
                        }else{
                            this.onAdd()
                        }
                    }
                });
            },
            /**
            * @name:  添加数据
            */
            onAdd(){
                msgAdd(this.form).then((res) => {
                    if(res.code == 0){
                        this.btn.loading = false;
                        this.$message.success('保存成功');
                        this.$emit('callback')
                    }
                }).catch((res) => {
                    this.$message.error(res.msg);
                });
            },
            /**
            * @name:  修改数据
            */
            onEdit(){
                msgUpdate(this.form).then((res) => {
                    if(res.code == 0){
                        this.btn.loading = false;
                        this.$message.success('修改成功');
                        this.$emit('callback')
                    }
                }).catch((res) => {
                    this.$message.error(res.msg);
                });
            }
        }
    };
</script>