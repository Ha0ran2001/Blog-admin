<template>
  <div
    class="w-full h-screen flex flex-col justify-center items-center bg-linear"
  >
    <n-form-item class="text-4xl">博客后台管理系统</n-form-item>
    <n-form
      :label-width="80"
      :model="formValue"
      :rules="rules"
      size="medium"
      ref="formRef"
      label-placement="left"
      class="w-96 h-60 flex flex-col items-center justify-center mb-16"
    >
      <n-form-item path="username" class="w-72">
        <n-input
          v-model:value="formValue.username"
          placeholder="username"
        ></n-input>
      </n-form-item>
      <n-form-item path="password" class="w-72">
        <n-input
          v-model:value="formValue.password"
          placeholder="password"
        ></n-input>
      </n-form-item>
      <n-button type="info" class="w-72" @click="login">登录</n-button>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { NForm, NFormItem, NInput, NSpace, NButton } from "naive-ui";
import api from "../api";
import store from "../store";
import axios from "axios";

const router = useRouter();

let formValue = reactive({
  username: "",
  password: "",
});

const rules = {
  username: {
    required: true,
    message: "username",
    trigger: "blur",
  },
  password: {
    required: true,
    message: "password",
    trigger: "blur",
  },
};

const login = async () => {
  const res = await api.article.login(formValue);
  const result = res.data.data;
  console.log(result);

  if (result.success === "登录成功") {
    localStorage.setItem("token", result.token);
    store.commit("setToken", result.token);
    router.push("/main");
  }
};
</script>

<style scoped>
.bg-linear {
  background: linear-gradient(90deg, #fff1e6, #c5dedd, #bcd4e6),
    linear-gradient(225deg, #9bf6ff, #dee2ff);
}
</style>