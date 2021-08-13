import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login"
  },

  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/main",
    name: "Layout",
    component: () => import("../views/AddArticle.vue"),
  },
  {
    path: "/articlelists",
    name: "articleLists",
    component: () => import("../views/ArticleList.vue")
  },
  {
    path: "/revise/:id",
    name: "reviseArticleById",
    component: () => import("../views/AddArticle.vue")
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
