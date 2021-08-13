<template>
  <Layout>
    <n-data-table
      :bordered="false"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      class="m-9"
      :row-key="data.id"
    />
    <n-modal
      v-model:show="showModal.showModalForEdit"
      :mask-closable="false"
      preset="dialog"
      title="确认"
      content="你确认"
      positive-text="确认"
      negative-text="算了"
      @positive-click="reviseArticle"
    />
    <n-modal
      v-model:show="showModal.showModalForDelete"
      :mask-closable="false"
      preset="dialog"
      title="确认"
      content="你确认"
      positive-text="确认"
      @positive-click="deleteArticle"
      negative-text="算了"
    />
  </Layout>
</template>


<script lang="ts">
import { h, defineComponent, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import {
  NTag,
  NButton,
  useMessage,
  NSpace,
  NDataTable,
  NModal,
} from "naive-ui";
import Layout from "../components/Layout.vue";
import api from "../api";

const createColumns = (showModal, deleteId, reviseId) => {
  return [
    {
      title: "标题",
      key: "title",
    },
    {
      title: "文章类型",
      key: "typeName",
      width: 100,
    },
    {
      title: "发布时间",
      key: "createTime",
      width: 100,
    },
    {
      title: "博客简介",
      key: "introduce",
    },

    {
      title: "操作",
      key: "actions",
      render(row) {
        return h(
          "div",
          {
            class: "flex justify-between",
          },
          [
            h(
              NButton,
              {
                size: "medium",
                onClick: () => {
                  showModal.showModalForEdit = true;
                  reviseId.value = row.id;
                },
              },
              { default: () => "修改" }
            ),
            h(
              NButton,
              {
                size: "medium",
                onClick: () => {
                  showModal.showModalForDelete = true;
                  deleteId.value = row.id;
                },
              },
              { default: () => "删除" }
            ),
          ]
        );
      },
    },
  ];
};

export default defineComponent({
  components: {
    NTag,
    NButton,
    NSpace,
    NDataTable,
    Layout,
    NModal,
  },
  setup() {
    const router = useRouter();
    const articles = ref([]);
    // 获取文章数据
    async function getArticles() {
      let res = await api.article.getArticleList();
      articles.value = res.data.data;
      console.log(res);
    }
    onMounted(() => {
      getArticles();
    });

    window.$message = useMessage();

    // 控制 Modal
    const showModalRef = reactive({
      showModalForEdit: false,
      showModalForDelete: false,
    });

    // 要删除的id
    const deleteId = ref(0);
    //  根据id删除文章
    async function deleteArticleById(id: number) {
      let res = await api.article.deleteArticle(id);
      console.log(res);
      getArticles();
    }

    const reviseId = ref(0);
    async function reviseArticleById(id: number) {
      router.push(`/revise/${id}`);
    }

    return {
      data: articles,
      columns: createColumns(showModalRef, deleteId, reviseId),
      pagination: {
        pageSize: 10,
      },
      showModal: showModalRef,
      deleteId,
      deleteArticle: () => deleteArticleById(deleteId.value),
      reviseArticle: () => reviseArticleById(reviseId.value),
    };
  },
});
</script>