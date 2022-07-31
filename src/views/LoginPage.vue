<template>
  <div class="mianBox">
    <div class="img-box">
      <img src="@/assets/LoginPageImg.svg" />
    </div>
    <div class="tab-box">
      <TypographyTitle :level="3">Welcome to Chart Editor</TypographyTitle>

      <Tabs v-model:activeKey="activeKey" @change="cleanForm" animated>
        <TabPane key="1" tab="Login">
          <Form :model="formState" class="login-form" name="normal_login" @finish="submitForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <FormItem label="Account" name="account" :rules="[{ required: true, message: 'Please input your username!' }]">
              <Input v-model:value="formState.account" :maxlength="15">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </Input>
            </FormItem>

            <FormItem label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
              <InputPassword v-model:value="formState.password" :maxlength="15">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </InputPassword>
            </FormItem>

            <FormItem style="justify-content: center">
              <Button type="primary" html-type="submit" class="login-form-button"> Login </Button>
            </FormItem>
          </Form>

          <a>If you forget your password. Click here!</a>
        </TabPane>

        <TabPane key="2" tab="Register">
          <Form :model="formState" class="login-form" name="normal_login" @finish="submitRegister" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <FormItem label="Name" name="name" :rules="[{ required: true, message: 'Please input your username!' }]">
              <Input v-model:value="formState.name" :maxlength="15">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </Input>
            </FormItem>

            <FormItem label="Account" name="account" :rules="[{ required: true, message: 'Please input your username!' }]">
              <Input v-model:value="formState.account" :maxlength="15">
                <template #prefix>
                  <UserOutlined class="site-form-item-icon" />
                </template>
              </Input>
            </FormItem>

            <FormItem label="Password" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
              <InputPassword v-model:value="formState.password" :maxlength="15">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </InputPassword>
            </FormItem>

            <FormItem
              label="Confirm"
              name="confirm"
              :rules="[
                {
                  required: true,
                  validator: validatePassword,
                },
              ]"
            >
              <InputPassword v-model:value="formState.confirm">
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </InputPassword>
            </FormItem>

            <FormItem style="justify-content: center">
              <Button type="primary" html-type="submit" class="login-form-button"> Register </Button>
            </FormItem>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { postUserLogin, postUserRegister } from "@/apis/index";
import { message , Tabs, TabPane, Form, FormItem, Button, Input, InputPassword, TypographyTitle} from "ant-design-vue";
import router from "@/router/index";
import { Rule } from "ant-design-vue/lib/form";

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
  postUserLogin("/user/login", formState.account, formState.password).then(({ data }) => {
    message.success(data.message, 0.5).then(() => {
      router.push({ name: "MyProject" });
    });
  });
};

// 注册表单密码验证部分
const validatePassword = async (_rule: Rule, value: string) => {
  if (formState.password && formState.confirm !== formState.password) {
    return Promise.reject("Two passwords are not match!");
  } else {
    return Promise.resolve();
  }
};

// 注册部分
const submitRegister = () => {
  postUserRegister("/user/info", formState.account, formState.name, formState.password).then(({ data }) => {
    message.success(data.message, 0.5);
    // 切换到登录框
    activeKey.value = "1";
  });
};

// 切换选项卡片时候清空输入框
const cleanForm = () => {
  formState.account = "";
  formState.confirm = "";
  formState.name = "";
  formState.password = "";
}

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
  }
}
</style>
