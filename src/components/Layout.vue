<template>
  <n-space vertical>
    <n-layout>
      <n-layout-header :inverted="inverted" bordered>
        <div class="h-16 flex justify-center items-center text-2xl">
          Ha0ran的博客后台管理
        </div>
      </n-layout-header>
      <n-layout has-sider>
        <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :native-scrollbar="false"
          :inverted="inverted"
        >
          <n-menu
            :inverted="inverted"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />

          <n-space justify="center">
            <n-switch v-model:value="inverted" class="mt-16" />
          </n-space>
        </n-layout-sider>
        <!-- 内容区 -->
        <slot></slot>
      </n-layout>
      <n-layout-footer :inverted="inverted" bordered>
        <div class="h-16 flex justify-center items-center">
          ©2021 Created by Ha0ran
        </div>
      </n-layout-footer>
    </n-layout>
  </n-space>
</template>

<script lang="ts" setup>
import { h, onMounted, ref, watch } from "vue";
import {
  NIcon,
  NLayout,
  NSpace,
  NSwitch,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutSider,
  NMenu,
} from "naive-ui";
import { BookOutline as BookIcon } from "@vicons/ionicons5";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: () => h("div", { onClick: () => router.push("/main") }, "工作台"),
    key: "workbench",
    icon: renderIcon(BookIcon),
  },
  {
    label: () =>
      h("div", { onClick: () => router.push("/articleLists") }, "文章列表"),
    key: "pinball-1973",
    icon: renderIcon(BookIcon),
  },
];

const inverted = ref(false);
</script>

<style scoped>
</style>
