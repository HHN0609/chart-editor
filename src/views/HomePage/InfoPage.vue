<template>
  <div class="container">
    <Form class="info_form" :model="formState" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }" :validate-messages="validateMessages" @finish="onFinish">
      <FormItem :name="['user', 'userName']" label="Name" :rules="[{ required: true }]">
        <Input v-model:value="formState.user.userName" :maxlength="15" />
      </FormItem>

      <FormItem :name="['user', 'account']" label="Account">
        <Input v-model:value="formState.user.account" disabled />
      </FormItem>

      <FormItem :name="['user', 'newPassword']" label="New Password">
        <Input v-model:value="formState.user.newPassword" :maxlength="15" />
      </FormItem>

      <FormItem
        :name="['user', 'confirmPassword']"
        label="Confirm Password"
        :rules="[
          {
            required: formState.user.newPassword,
            validator: validatePassword,
          },
        ]"
      >
        <Input v-model:value="formState.user.confirmPassword" :maxlength="15" />
      </FormItem>

      <FormItem :wrapper-col="{ span: 16, offset: 8 }">
        <Button type="primary" html-type="submit">Save</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script lang="ts" setup>
import { message, Form, FormItem, Input, Button } from "ant-design-vue";
import { onMounted, reactive, watch } from "vue";
import { getUserInfo, putUserInfo } from "@/apis";
import router from "@/router";
import userInfo from "@/stores/userInfo";
import { Rule } from "ant-design-vue/lib/form";
import { clearAllCookies } from "@/utils";
const store = userInfo();

const validateMessages = {
  required: "${label} is required!",
};

const formState = reactive({
  user: {
    userName: "",
    account: "",
    newPassword: "",
    confirmPassword: "",
  },
});

// 两次密码一致性的验证
const validatePassword = async (_rule: Rule, value: string) => {
  if (formState.user.newPassword && value !== formState.user.newPassword) {
    return Promise.reject("newPassword and confirmPassword are not match!");
  } else {
    return Promise.resolve();
  }
};

const onFinish = () => {
  // 调用修改用户信息的接口
  putUserInfo("/user/info", store.account, formState.user.userName, formState.user.newPassword).then(async (value) => {
    // 修改了密码要重新登陆
    if (formState.user.newPassword) {
      localStorage.removeItem("token");
      clearAllCookies();
      message.success(value.data.message, 0.5);
      message.info("Please Login Again", 0.5).then(() => {
        router.replace({ name: "Login" });
      });
      return;
    }
    let { account, name, is_admin } = (await getUserInfo("/user/info", store.account)).data;
    store.$patch({
      account: account,
      userName: name,
      isAdmin: is_admin,
    });
  });
};

watch(
  () => store.getAccount,
  () => {
    formState.user.userName = store.getUserName;
    formState.user.account = store.getAccount;
  }
);

onMounted(() => {
  formState.user.userName = store.getUserName;
  formState.user.account = store.getAccount;
});
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .info_form {
    min-width: 400px;
  }
}
</style>
