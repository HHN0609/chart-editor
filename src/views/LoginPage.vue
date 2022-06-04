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

            <a-form-item style="justify-content: center">
              <a-button type="primary" html-type="submit" class="login-form-button"> Login </a-button>
            </a-form-item>
          </a-form>

          <a>If you forget your password. Click here!</a>
        </a-tab-pane>

        <a-tab-pane key="2" tab="Register">
          <a-form :model="formState" class="login-form" name="normal_login" @finish="submitRegister" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-form-item label="Name" name="name" :rules="[{ required: true, message: 'Please input your username!' }]">
              <a-input v-model:value="formState.name">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </a-input>
            </a-form-item>

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

            <a-form-item label="Confirm" name="confirm" :rules="[{ required: true, message: 'Please input your password!' }]">
              <a-input-password v-model:value="formState.confirm">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item style="justify-content: center">
              <a-button type="primary" html-type="submit" class="login-form-button"> Register </a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { postUserLogin, postUserRegister } from "../apis/index";
import { message } from "ant-design-vue";
import router from "../router";
import userInfo from "../stores/userInfo";
const store = userInfo();
interface FormState {
  account: string;
  password: string;
  confirm?: string;
  name?: string;
}
const activeKey = ref("1");
const formState = reactive<FormState>({
  account: "",
  password: "",
  confirm: "",
  name: "",
});
// 登录按钮点击后触发
const submitForm = () => {
  // 向后端发送请求
  postUserLogin("/user/login", formState.account, formState.password)
    .then(({ data }) => {
      message.success(data.message, 0.5).then((_) => {
        store.$patch({
          userName: data.username,
          account: data.account,
          isAdmin: data.isAdmin,
        });
        router.push({ name: "Home" });
      });
    })
    .catch(({ response }) => {
      console.log(response);
      message.error(response.data.message);
    });
};
const submitRegister = () => {
  if (formState.password !== formState.confirm) {
    message.error("两次密码不一致", 0.5);
    return;
  }
  postUserRegister("/user/info", formState.account, formState.name, formState.password)
    .then(() => {
      message.success("注册成功", 0.5);
      activeKey.value = "1";
    })
    .catch(({ response }) => {
      message.error(response.message, 0.5);
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
      .login-form-button {
        margin: 0 auto;
        width: 100%;
      }
    }
    .register-form {
    }
  }
}
</style>
