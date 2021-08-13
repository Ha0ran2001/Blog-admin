<template>
  <Layout>
    <n-space vertical class="w-full px-5">
      <div class="flex items-center my-5">
        <span class="whitespace-nowrap mr-10 text-lg">标题</span>
        <n-input
          type="text"
          class="w-full"
          placeholder="title"
          clearable
          v-model:value="title"
        />
        <n-select
          v-model:value="selectType"
          :options="options"
          class="w-64 ml-2"
          placeholder="选择类型"
        />
      </div>

      <div class="flex items-center mb-5">
        <span class="whitespace-nowrap mr-1 text-lg">文章简介</span>
        <n-input
          type="textarea"
          placeholder="introduce"
          round
          clearable
          class="w-full"
          v-model:value="introduce"
        />
      </div>
      <div class="flex items-center">
        <span class="whitespace-nowrap mr-1 text-lg">文章内容</span>
        <div id="vditor"></div>
      </div>

      <div class="flex items-center justify-between my-5">
        <div class="flex items-center">
          <span class="mr-1 text-lg">发布时间</span>
          <n-date-picker
            v-model:value="publishTime"
            type="datetime"
            :actions="['now']"
          />
        </div>
        <button
          class="
            border border-blue-400
            text-blue-500
            px-7
            py-3
            hover:bg-blue-500
            hover:text-white
          "
          @click="publishArticle"
        >
          发布文章
        </button>
      </div>
    </n-space>
  </Layout>
</template>
<script lang="ts">
import Vditor from "vditor";
import "vditor/dist/index.css";
import { NSpace, NInput, NSelect, NDatePicker, useMessage } from "naive-ui";
import api from "../api";
import store from "../store";
import Layout from "../components/Layout.vue";
import { useRoute } from "vue-router";

interface articleDataProps {
  id?: number;
  typeId: number;
  title: string;
  article_content: string;
  introduce: string;
  viewCount?: number;
  addTime: string;
}

export default {
  components: {
    NSpace,
    NInput,
    NSelect,
    NDatePicker,
    Layout,
  },
  data() {
    return {
      isNew: 0, // 如果是 0 则是新添加的文章
      title: "",
      selectType: null,
      introduce: "",
      articleContent: {},
      reviseArticleContent: "",
      publishTime: null,
      options: [
        {
          label: "开发阶段",
          value: 1,
        },
        {
          label: "React",
          value: 2,
        },
        {
          label: "Vue",
          value: 3,
        },
        {
          label: "VanillaJS",
          value: 4,
        },
        {
          label: "CSS",
          value: 5,
        },
        {
          label: "Node",
          value: 6,
        },

        {
          label: "Canvas",
          value: 7,
        },
      ],
    };
  },
  mounted() {
    // 初始化Vditor 并获取需要修改的内容
    this.articleContent = this.createVditor("");

    // 将需要修改的内容展示出来
    const route = useRoute();
    const id = parseInt(route.params.id);
    if (id) {
      this.getRevisedArticleById(id);
      this.isNew = id;
    }

    // 挂载 message
    window.$message = useMessage();
  },
  methods: {
    /**
     * 创建vidtor
     */
    createVditor(value: string) {
      return new Vditor("vditor", {
        height: "auto",
        width: "100%",
        placeholder: "aticle content",
        theme: "classic",
        outline: {
          enable: true,
        },
        counter: {
          enable: true,
          type: "markdown",
        },
        preview: {
          delay: 0,
          hljs: {
            style: "monokai",
            lineNumber: true,
          },
        },
        tab: "\t",
        typewriterMode: true,
        toolbarConfig: {
          pin: true,
        },
        cache: {
          enable: false,
        },
        // mode: "sv",
        toolbar: [
          "emoji",
          "headings",
          "bold",
          "italic",
          "strike",
          "link",
          "|",
          "list",
          "ordered-list",
          "check",
          "outdent",
          "indent",
          "|",
          "quote",
          "line",
          "code",
          "inline-code",
          "insert-before",
          "insert-after",
          "|",
          // 'record',
          "table",
          "|",
          "undo",
          "redo",
          "|",
          "edit-mode",
          // 'content-theme',
          "code-theme",
          "export",
          {
            name: "more",
            toolbar: [
              "fullscreen",
              "both",
              "preview",
              "info",
              "help",
              "outline",
            ],
          },
        ],
        after: () => {
          this.articleContent.setValue(value);
        },
      });
    },
    /**
     * 发布文章
     */
    async publishArticle() {
      const publishTime = this.publishTime;
      let articleData: articleDataProps = {
        title: this.title,
        typeId: this.selectType,
        introduce: this.introduce,
        content: this.articleContent.getValue(),
        createTime: publishTime.toString().slice(0, -3),
      };
      if (this.isNew === 0) {
        try {
          await api.article.addArticle(articleData).then((res) => {
            console.log(res);
            this.isNew = res.data.msg;
          });
          console.log(this.isNew);
          $message.success("添加成功");
          setTimeout(() => {
            this.$router.push("/articlelists");
          }, 500);
        } catch (err) {
          console.log(err);
          $message.error("失败！");
        }
      } else {
        articleData.id = this.isNew;
        try {
          await api.article.reviseArticle(articleData);
          $message.success("修改成功");
          setTimeout(() => {
            this.$router.push("/articlelists");
          }, 500);
        } catch (err) {
          console.log(err);
          $message.error("失败！");
        }
      }
    },
    /**
     * 获取需要修改的文章
     */
    async getRevisedArticleById(id: number) {
      const response = await api.article.modifyArticle(id);
      const result = response.data.data;

      this.title = result.title;
      this.introduce = result.introduce;
      this.articleContent = this.createVditor(result.content);
    },
  },
};
</script>

<style scoped>
</style>
