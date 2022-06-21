<template>
  <div class="container">
    <a-table class="table" :data-source="datasource" :columns="columns" bordered>
      <template #bodyCell="{column, record}">
        <template v-if="column.key === 'account'">

        </template>
        <template v-else-if="column.key === 'name'">

        </template>
        <template v-else-if="column.key === 'is_admin'">
          <a-select
            v-if="editingAccount === record.account"
            v-model:value="selectedAuth"
            style="width: 150px;"
            size="small"
          >
            <a-select-option
              v-for="item in authMap"
              :key="item"
              :value="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
          <a-tooltip v-else placement="bottom">
            <template #title>
              <span>{{authMap[record.is_admin]}}</span>
            </template>
            <a-tag
              :color="tagColors[record.is_admin]"
            >
              {{ record.is_admin ? true: false }}
            </a-tag>
          </a-tooltip>
        </template>

        <template v-else-if="column.key === 'action'">
          <div v-if="editingAccount === record.account" class="btnBox">
            <a-typography-link @click="saveChange(record.account)">Save</a-typography-link>
            <a-typography-link @click="cancelChange">Cancel</a-typography-link>
          </div>
          <div v-else class="btnBox">
            <a-button type="primary"
              :disabled="!canDelete(record.is_admin)"
              @click="enterEditMode(record)"
              size="small"
            >
              edit
            </a-button>
  
            <a-popconfirm
              title="Sure to delete?"
              :disabled="!canDelete(record.is_admin)"
              @confirm="deleteUser(record)"
            >
                <template #icon>
                  <question-circle-outlined style="color: red" />
                </template>
                <a-button type="danger" :disabled="!canDelete(record.is_admin)" size="small" >delete</a-button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { getAllUsersInfo, deleteUserInfo, putUserAuth } from "@/apis";
import userInfo from "@/stores/userInfo";
import { onMounted, reactive, ref } from "vue";
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { message } from "ant-design-vue";
const store = userInfo();
const tagColors = ["green", "blue", "pink"];
const datasource = reactive([]);
const columns = [
  {title: "Account", dataIndex: "account", key: "account"},
  {title: "Name", dataIndex: "name", key: "name"},
  {title: "IsAdmin", dataIndex: "is_admin", key: "is_admin", width: '180px'},
  {title: "Action", key: "action"}
];
const authMap = [
  "Ordinary users",
  "Ordinary adminer",
  "Super adminer",
]
// 记录要修改的账户
const editingAccount = ref<string>("");
const selectedAuth = ref<string>("");
const enterEditMode = ({account, is_admin}) => {
  console.log(account, is_admin);
  editingAccount.value = account;
  selectedAuth.value = authMap[is_admin];
}

const cancelChange = () => {
  editingAccount.value = "";
  selectedAuth.value = "";
};

const saveChange = (account: string) => {
  const newAuth = authMap.indexOf(selectedAuth.value);
  putUserAuth("/admin/usersInfo", account, newAuth)
    .then(({data}) => {
      message.success(data.message, 0.5);
      for(let data of datasource){
        if(data.account === account){
          data.is_admin = newAuth;
        }
      }
      cancelChange();
    });
};


const getIndex = (account: string): number => {
  return datasource.findIndex((data) => {
    return data.account === account;
  });
};

const deleteUser = ({ account }) => {
  return new Promise((resolve, reject) => {
    deleteUserInfo("/admin/usersInfo", account)
      .then((value) => {
        resolve(value);
        datasource.splice(getIndex(account), 1);
        message.success(value.data.message, 0.5);
      })
      .catch((reason) => {
        reject(reason)
      });
  })
};

// 根据操作用户的权级和被操作用户的权级来判断能不能删除
// record_admin是被操作用户的权级
const canDelete = (record_admin: number): boolean => {
  if(record_admin === 2) return false;
  if(record_admin === 1 && store.isAdmin === 1) return false;
  return true;
};

onMounted(() => {
  getAllUsersInfo("/admin/usersInfo")
   .then(({ data }) => {
      datasource.splice(0);
      datasource.push(...data);
   })
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
  justify-content: center;
  > .table {
    max-width: 700px;
    width: 80%;
    .btnBox {
      display: flex;
      justify-content: space-evenly;
    }
  }
}
</style>
