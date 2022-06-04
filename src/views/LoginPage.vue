<template>
  <div class="mianBox">
    <div class="img-box">
      <img src="../../public/界面研究.svg" />
    </div>
    <div class="tab-box">
      <a-typography-title :level="3">Welcome to Chart Editor</a-typography-title>

      <a-tabs v-model:activeKey="activeKey" animated>
        <a-tab-pane key="1" tab="Login">
          <a-form :model="formState" class="login-form" name="normal_login" @finish="submitForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="Account" name="account" :rules="[{ required: true, message: 'Please input your username!' }]">
              <a-input v-model:value="formState.account">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
              <a-input-password v-model:value="formState.password">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" class="login-form-button"> Login </a-button>
            </a-form-item>
          </a-form>
          <a>If you forget your password. Click here!</a>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Register">注册部分</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { postLogin } from "../apis/index";
import { message } from "ant-design-vue";
import router from "../router";

interface FormState {
  account: string;
  password: string;
}
const activeKey = ref("1");
const formState = reactive<FormState>({
  account: "",
  password: "",
});
// 登录按钮点击后触发
const submitForm = () => {
  // 向后端发送请求
  postLogin("/user/login", formState.account, formState.password)
    .then(({ data }) => {
      message.success(data.message).then((_) => {
        router.push({ name: "Home" });
      });
    })
    .catch(({ response }) => {
      message.error(response.data.message);
    });
};
</script>
<style lang="less" scoped>
.mianBox {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
  > .img-box {
    width: 500px;
    height: 500px;
  }
  > .tab-box {
    height: 300px;
    width: 300px;
    .login-form {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .login-form-button {
        width: 100px;
      }
    }
    .register-form {
    }
  }
}
</style>
