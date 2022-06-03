import { defineStore } from "pinia";
export default defineStore("user", {
  state: () => {
    return {
      userName: "hehaonan",
      account: "",
      isAdmin: false,
    };
  },
});
