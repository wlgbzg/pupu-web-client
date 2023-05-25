<template>
    <div class="login-container">
        <!-- 背景 -->
        <BgLogin/>

        <!-- 登录框 -->
        <div class="login-box">

            <div class="login-form">
                <h2>{{ appConfigStore.appConfig.welcomeTitle }}</h2>
                <div class="translucent-60">{{ appConfigStore.appConfig.welcomeSubTitle }}</div>
                <div class="form-box" v-if="formIndex === 1">
                    <el-form ref="codeFormRef" :rules="codeRules" label-position="top" label-width="100px" :model="codeForm" style="max-width: 460px">
                        <el-form-item label="手机号码" prop="phone">
                            <el-input v-model="codeForm.phone" maxlength="11" oninput="value=value.replace(/\D/g,'')" clearable/>
                        </el-form-item>
                        <el-form-item label="短信验证码" prop="code">
                            <div class="code-box">
                                <el-input class="code-box-left" v-model="codeForm.verifyCode" maxlength="6" oninput="value=value.replace(/\D/g,'')" clearable/>
                                <el-button :disabled="codeBtnStore.disable" @click="submitSendCodeForm(codeFormRef)"><span v-if="codeBtnStore.counter == 0">发送验证码</span> <span v-if="codeBtnStore.counter != 0"> 重新发送 ({{codeBtnStore.counter }})</span></el-button>
                            </div>
                        </el-form-item>
                        <el-form-item label="">
                            <el-button link type="primary">忘记密码？</el-button>
                        </el-form-item>
                        <el-form-item label="">
                            <el-button class="login-btn" type="primary" @click="submitCodeForm(codeFormRef)">
                                注册或登录
                            </el-button>
                        </el-form-item>
                        <el-form-item label="" class="form">
                            <el-button link class="btn-change" type="primary" @click="changeFormIndex(2)">使用密码登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <div class="form-box" v-if="formIndex === 2">
                    <el-form ref="passwordFormRef" :rules="passwordRules" label-position="top" label-width="100px" :model="passwordForm" style="max-width: 460px">
                        <el-form-item label="手机号码" prop="phone">
                            <el-input v-model="passwordForm.phone" maxlength="11" oninput="value=value.replace(/\D/g,'')" clearable/>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="passwordForm.password" show-password clearable/>
                        </el-form-item>
                        <el-form-item label="">
                            <el-button link type="primary">忘记密码？</el-button>
                        </el-form-item>
                        <el-form-item label="">
                            <el-button class="login-btn" type="primary" @click="submitPasswordForm(passwordFormRef)">登录</el-button>
                        </el-form-item>
                        <el-form-item label="" class="form">
                            <el-button link class="btn-change" type="primary" @click="changeFormIndex(1)">使用短信验证码登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="login-qrcode-box">
                <div class="qrcode">
                    <qrcode-vue value="通过Discord手机App扫描二维码。" size="176" margin="2"></qrcode-vue>
                </div>
                <h2>通过二维码登录</h2>
                <div class="qrcode-sub-title translucent-60">通过 {{ appConfigStore.appConfig.appName }} 手机App扫描二维码，便可即时登录。</div>
            </div>

        </div>

    </div>
</template>

<style scoped lang="less">
@import "@/assets/less/base.less";

::v-deep .el-form-item__label {
  opacity: 0.8;
  color: white;
}

.login-container {
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: royalblue;
  display: flex;
  justify-content: center;
  align-items: center;
  color: aliceblue;

  .login-box {
    background-color: @login-form-background;
    width: 800px;
    height: 400px;
    border-radius: 6px;
    display: flex;


    .login-form {
      margin-top: 10px;
      flex: 3;
      text-align: center;
      padding-top: 20px;
      line-height: 2em;

      .form-box {
        margin: 5px 40px;

        .code-box {
          display: flex;
          justify-content: space-between;
          width: 100%;

          .code-box-left {
            margin-right: 30px;
          }
        }

        .login-btn {
          width: 100%;
          height: 45px;
        }

        .btn-change {
          margin-top: 10px;
          position: absolute;
          right: 0;
        }
      }
    }

    .login-qrcode-box {
      flex: 2;
      width: 176px;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .qrcode {
        width: 176px;
        height: 176px;
        background-color: white;
        overflow: hidden;
        border-radius: 5px;
      }

      h2 {
        margin-top: 20px;
      }

      .qrcode-sub-title {
        margin-top: 10px;
        width: 220px;
        text-align: center;
      }
    }
  }
}

</style>
<script setup lang="ts">
import httpRequest from "@/utils/httpRequest";
import QrcodeVue from "qrcode.vue";
import {reactive, ref} from "vue";
import type {FormInstance, FormRules} from "element-plus";
import {ElMessage} from "element-plus";
import {useAppConfigStore} from "@/stores/appConfig";
import BgLogin from "@/components/background/BgLogin.vue";
import {useUserTokenStore} from "@/stores/userToken";


// 配置信息获取
const appConfigStore = useAppConfigStore();
const userStore = useUserTokenStore()
const loadLoginConfig = () => {
    httpRequest.request({
        url: "/api/v1/app/config",
        method: "post"
    }).then(data => {
        appConfigStore.updateAppConfig(data)
    }).catch(error => {
        console.error("请求失败1：", error);
    });
};
loadLoginConfig();


// 切换登录界面
const formIndex = ref(1);
const changeFormIndex = (index) => {
    formIndex.value = index;
};

// 短信验证码登录
const codeBtnStore = reactive({
    disable: false,
    timer: -1,
    counter: 0
});
const codeFormRef = ref<FormInstance>();
const codeForm = reactive({
    phone: "",
    phonePrefix: "+86",
    verifyCode: "",
});
const codeRules = reactive<FormRules>({
    phone: [
        {required: true, message: "手机号不能为空", trigger: "blur"},
        {min: 11, max: 11, message: "手机号长度错误", trigger: "blur"}
    ],
    verifyCode: [
        {required: true, message: "短信验证码不能为空", trigger: "blur"}
    ]
});
const submitSendCodeForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validateField("phone", (errorMessage) => {
        if (!errorMessage) {
            return
        }
        let wait = 60;
        if (codeBtnStore.timer === -1) {
            codeBtnStore.counter = wait;
            codeBtnStore.disable = true;
            codeBtnStore.timer = setInterval(() => {
                if (codeBtnStore.counter > 0) {
                    codeBtnStore.counter--;
                } else {
                    codeBtnStore.disable = false;
                    clearInterval(codeBtnStore.timer);
                    codeBtnStore.timer = -1;
                }
            }, 1000);
        }

        httpRequest.request({
            url: "/api/v1/auth/phone-verification",
            method: "post",
            data: codeForm
        }).then(data => {
            ElMessage({
                showClose: true,
                message: "短信验证码已发送",
                type: "success"
            });
        }).catch(error => {
            console.log('error', error)
            ElMessage({
                showClose: true,
                message: "发送失败",
                type: "error"
            });
        })
    });
};
const submitCodeForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (!valid) {
            return
        }
        httpRequest.request({
            url: "/api/v1/auth/verify-code-login",
            method: "post",
            data: codeForm
        }).then(data => {
            ElMessage({
                showClose: true,
                message: "登录成功",
                type: "success"
            });
            userStore.updateUserToken(data)
        }).catch(error => {
            ElMessage({
                showClose: true,
                message: "短信验证码错误，登录失败",
                type: "error"
            });
        })
    });
};

// 密码登录
const passwordFormRef = ref<FormInstance>();
const passwordForm = reactive({
    phone: "",
    password: ""
});
const passwordRules = reactive<FormRules>({
    phone: [
        {required: true, message: "手机号不能为空", trigger: "blur"},
        {min: 11, max: 11, message: "手机号长度错误", trigger: "blur"}
    ],
    password: [
        {required: true, message: "密码不能为空", trigger: "blur"}
    ]
});
const submitPasswordForm = async (formEl: FormInstance | undefined) => {

    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log("submit!");
        } else {
            console.log("error submit!", fields);
        }
    });
};
</script>