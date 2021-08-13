
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useMessage } from 'naive-ui';
import store from '../store/index';

const router = useRouter();


/**
 * 跳转登录页面
 * 携带当前路由，过期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.value.fullPath,
    }
  });
}

/**
 * 请求失败后的错误同意处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: number, other: any) => {
  const message = useMessage();
  switch (status) {
    // 401未登录，跳转至登录
    case 401:
      toLogin();
      break;

    // 403 token过期
    // 清楚 token 并跳转至登录页
    case 403:
      message.error('登录过期，重新登录', {
        duration: 3000,
        closable: true,
      });
      localStorage.removeItem('token');
      store.commit('setToken', null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    case 404:
      // message.info("请求资源不存在");
      console.log(message);

      break;
    default:
      console.log(other);
      break;
  }
}

// 创建axios实例
const instance = axios.create({ timeout: 1000 * 12 });
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


/**
 * 请求拦截器
 * 每次请求前，如果存在token就在请求头中加token
 */

instance.interceptors.request.use(
  config => {
    // 每次发送前判断是否存在token，如果存在，则在 headers 上加上token
    // 即使本地存在token，也可能是过期的，所以在响应拦截器中要对返回的状态进行判断。
    // const token = store.state.token;
    const token = localStorage.getItem('token');
    token && (config.headers.Authorization = "Bearer " + token);
    return config;
  }, error => Promise.reject(error));

// 响应拦截器

instance.interceptors.response.use(
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx范围内
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    }
  }
)

export default instance;




