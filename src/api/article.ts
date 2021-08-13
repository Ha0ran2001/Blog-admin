/**
 * 文章模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '../utils/axios'; // 导入封装过的axios实例

const article = {
  // 登录
  login(body: any) {
    return axios.post(`${base.login}/login`, body);
  },
  // 文章列表
  getArticleList() {
    return axios.get(`${base.articles}/articles`);
  },
  // 获取文章类型
  getArticleType() {
    return axios.get(`${base.articleTypes}/articleTypes`);
  },
  // 发布文章
  addArticle(body: any) {
    return axios.post(`${base.articles}/createArticle`, body);
  },
  // 发布后觉得不好继续修改
  reviseArticle(body: any) {
    return axios.put(`${base.articles}/update`, body);
  },
  // 删除文章
  deleteArticle(id: number) {
    return axios.delete(`${base.articles}/deleteArticle/${id}`);
  },
  // 获取要修改的文章
  modifyArticle(id: number) {
    return axios.get(`${base.articles}/updateArticle/${id}`);
  }
}

export default article;