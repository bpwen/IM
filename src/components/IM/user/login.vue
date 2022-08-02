<template>
    <div class="login-wrapper">
        <img class="logo" :src="logo" />
        <div class="title">客服系统登录</div>
        <el-form
            ref="login"
            :rules="rules"
            :model="form"
            label-width="0"
            style="width: 100%"
            @keydown.enter.native="submit"
        >
            <!-- 线上版本登录方式 -->
            <el-form-item prop="username">
                <el-input
                    v-model="form.username"
                    placeholder="请输入用户名"
                    type="text"
                    clearable
                    maxlength="11"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model="form.password"
                    placeholder="请输入密码"
                    type="password"
                    show-password
                    clearable
                ></el-input>
            </el-form-item>
        </el-form>
        <el-button
            type="primary"
            @click="submit"
            style="width: 100%; margin-top: 6px"
            :loading="loading"
            >登录</el-button
        >
    </div>
</template>

<script>
import { Form, FormItem, Select, Option } from "element-ui";
import logo from "@/assets/logo.png";
import { loginByUsername } from "@/api/login";

export default {
    name: "Login",
    components: {
        ElForm: Form,
        ElFormItem: FormItem,
        ElSelect: Select,
        ElOption: Option,
    },
    data() {
        const checkUserID = (rule, value, callback) => {
            if(!/^1[3456789]\d{9}$/.test(value)){
                callback(new Error('手机号码格式错误'))
            }else{
                callback()
            }
        };

        return {
            form: {
                username: "",
                password: ""
            },
            userID:'',
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur",},
                    { validator: checkUserID, trigger: "blur" },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                ],
            },
            logo: logo,
            registerVisible: false,
            loading: false,
        };
    },
    created() {
    if (process.env.NODE_ENV == "development") {
        this.form = {
            username: '13076158604',
            password: 'z123456'
        }
    }
  },
    methods: {
        submit() {
            this.$refs["login"].validate((valid) => {
                if (valid) {
                    this.$store.dispatch("LoginByUsername", this.form).then((res) => {
                        this.$router.push("/index");
                    }).catch((res) => {
                        this.$notify.error({
                            title: "提示",
                            message: res.msg
                        });
                    });
                }
            });
        }
    },
};
</script>

<style lang="stylus" scoped>
.title{
    font-size: 26px;
    font-weight: 400;
    margin: 20px auto 40px auto;
    text-align: center;
    font-weight: bold;
}
.login-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 450px;
    background: $white;
    color: $black;
    border-radius: 5px;
    box-shadow: 0 11px 20px 0 rgba(0, 0, 0, 0.3);

    .row-div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }

    .logo {
        width: 110px;
        height: 110px;
    }

    .loginBox {
        width: 320px;
        margin: 0 0 20px 0;

        .send-code {
            width: 112px;
        }

        .login-im-btn {
            width: 100%;
        }
    }

    .loginFooter {
        color: #8c8a8ac7;
        text-align: center;
        padding: 0 0 20px 0;
        cursor: pointer;
    }
}

.login-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 400px;
    padding: 20px 80px 50px;
    background: $white;
    color: $black;
    border-radius: 5px;
    box-shadow: 0 11px 20px 0 rgba(0, 0, 0, 0.3);

    .logo {
        margin-top: 20px;
        width: 130px;
        height: auto;
    }

    .register-button {
        width: 100%;
        margin: 6px 0 0 0;
    }

    .user-selector {
        width: 100%;
    }
}
</style>
