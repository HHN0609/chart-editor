import { defineStore } from "pinia";

type stateType = {
  userName: string;
  account: string;
  isAdmin: number;
};

export default defineStore("user", {
  state: (): stateType => {
    return {
      userName: "",
      account: "",
      isAdmin: 0,
    };
  },
  getters: {
    getUserName: (state) => {
      return state.userName;
    },
    getAccount: (state) => {
      return state.account;
    },
    getIsAdmin: (state) => {
      return state.isAdmin;
    },
  },
});
