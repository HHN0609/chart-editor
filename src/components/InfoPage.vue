<template>
  <div class="container">
    <a-form
      :model="formState"
      v-bind="layout"
      class="info_form"
      :validate-messages="validateMessages" 
      @finish="onFinish"
    >
      <a-form-item :name="['user', 'userName']" label="Name" :rules="[{ required: true }]">
        <a-input v-model:value="formState.user.userName" :maxlength="15" />
      </a-form-item>
      <a-form-item :name="['user', 'account']" label="Account">
        <a-input v-model:value="formState.user.account" disabled />
      </a-form-item>
      <a-form-item :name="['user', 'newPassword']" label="New Password">
        <a-input v-model:value="formState.user.newPassword" :maxlength="15" />
      </a-form-item>
      <a-form-item :name="['user', 'confirmPassword']" label="Confirm Password">
        <a-input v-model:value="formState.user.confirmPassword" :maxlength="15" />
      </a-form-item>
      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit">保存修改</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { message } from "ant-design-vue";
import { nextTick, onMounted, reactive } from "vue";
import { getUserInfo, putUserInfo } from "@/apis";
import router from "@/router";
import userInfo from "@/stores/userInfo";
const store = userInfo();
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

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
const onFinish = () => {
  // 调用修改用户信息的接口
  putUserInfo("/user/info", store.account, formState.user.userName, formState.user.newPassword)
    .then(async (value) => {
      // 修改了密码要重新登陆
      if (formState.user.newPassword) {
        localStorage.removeItem("token");
        message.success(value.data.message, 0.5);
        message.info("Please Login Again", 0.5).then(() => {
          router.replace({ name: "Login" });
        });
        return;
      }
      let { account, name, is_admin } = (await getUserInfo("/user/info")).data;
      store.$patch({
        account: account,
        userName: name,
        isAdmin: is_admin,
      });
    })
    .catch((reason) => {
      console.log(reason);
    });
};
onMounted(() => {
  formState.user.userName = store.userName;
  formState.user.account = store.account;
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
