import axios from "axios";
import vue from "vue";
import '../utils/config';
// import store from "@/vuex/store";
const VUE = new vue();
const instance = axios.create({
  timeout: 60000
});

const jointParams = (params, isContains) => {
  let res = isContains ? "&" : "?";
  for (let key in params) {
    res += `${key}=${params[key]}&`;
  }
  return res.substr(0, res.length - 1);
};

// 请求前拦截
instance.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.resolve(err);
  }
);

// 返回后拦截
instance.interceptors.response.use(
  res => {
    let bizRes = res.data;
    if ( bizRes.status === 0 ||  bizRes.rtnCode == "0000000" ||  bizRes.rtnCode == "0100030" ||  bizRes.rtnCode == "0100010" || bizRes.status == "42" ) {
      return res.data;
    }else if (  bizRes.rtnCode == "6666666" ||  bizRes.status == "100003" ||  bizRes.status === "0000" ) {// 身份过期
      window.sessionStorage.clear();
      window.localStorage.clear();
      window.webapp.$router.push("/login");
      return Promise.reject(bizRes);
    } else if (bizRes.status == "100001") {// 用户不存在  100001
      window.sessionStorage.clear();
      window.localStorage.clear();
      window.webapp.$router.push("/login");
      return Promise.reject(bizRes);
    } else if (bizRes.rtnCode == "4444444" || bizRes.rtnCode == "1000212") { // 没有登录权限
      return Promise.reject(bizRes);
    } else if (bizRes.rtnCode != "0000000" && !bizRes.status) {
      return Promise.reject(bizRes);
    }

    //store.commit("unloading");
    return res.data;
  },
  err => {
    let message = {};
    if (!err.response) {
      message.content = "网络错误，请求超时";
      message.state = err.code;
    } else {
      let enumError = {
        "500": "服务器错误",
        "401": "请重新登录",
        "403": "您没有权限",
        "404": "获取资源错误404"
      };
      message.content =
        enumError[err.response.status] || "网络不给力,请稍后再试~";
    }
    return Promise.reject(err);
  }
);

export default {
  /**
   * post请求
   * @param {*} url 请求地址
   */
  post(url, params = {}, data, contentType) {
    //url后缀存在参数
    let isContains = url.includes("?");
    //知了
    if (url.indexOf("zl_api") != -1) {
      data = {
        style: "",
        clientInfo: {},
        data: data
      };
      let schoolId = params.schoolId; //部分接口传schoolId且与缓存不一致
      if (schoolId) {
        params.schoolId = schoolId;
      }
      let token = params.token;

      params =
        token &&
        Object.assign({}, params, {
          token: token
        });

      url += jointParams(params, isContains);
    }

    return instance.request({
      method: "post",
      url,
      data,
      headers: {
        "Content-Type": contentType || "application/json"
      }
    });
  },
  /**
   * get请求
   * @param {*} url 请求地址
   * @param {*} params 参数
   */
  get(url, params = {}) {
    // return instance.request({
    //   method: "get",
    //   url,
    //   params
    // });
    return new Promise((resolve,reject) => {
      axios.get(url,{
        params:params
      })
      .then((response) => {
        resolve( response.data );
      })
      .catch((error) => {
        reject( error );
      });
    })
  },

  /**
   * post from data 请求
   * @param {*} url 请求地址
   */
  postFormData(url, params) {
    let res = "";
    for (let key in params) {
      if (res) {
        res += "&";
      }
      res += `${key}=${params[key]}`;
    }

    return instance.request({
      method: "post",
      url,
      data: res,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }
};