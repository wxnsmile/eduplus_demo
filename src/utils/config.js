import Vue from "vue";

Vue.prototype.setSg = (key,value) => {
    window.sessionStorage.setItem(key, value);
}
Vue.prototype.getSg = (key) => {
    return window.sessionStorage.getItem(key);
}
Vue.prototype.setLg = (key,value) => {
    window.localStorage.setItem(key, value);
}
Vue.prototype.getLg = (key) => {
   return window.localStorage.getItem(key);
}
Vue.prototype.removeLg = (key) => {
    window.localStorage.removeItem(key);
} 
Vue.prototype.removeSg = (key) => {
    window.sessionStorage.removeItem(key);
}