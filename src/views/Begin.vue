<template>
  <div class="begin">
    <h4>UI规范以及代码规范</h4>
    <h5>一、对接方式</h5>
    <ul>
      <li>1. 对接学加家方式为使用iframe对接。</li>
      <li>2. Vue+ElementUI对接方式</li>
      <li>3. 导航栏通过蓝鲸平台配置动态下发。</li>
      
    </ul>
    <h5>二、UI规范</h5>
    <ul>
      <li>1. 去掉头部和左边导航栏，使用学加家容器。</li>
      <li>2. 系统主题色、按钮、背景色和学加家容器保持一致，目前的主题色和文字颜色如下:</li>
      <img src="../assets/colors.png" width=300 height=400 alt="">
    </ul>

    <h5>三、接口调用</h5>
      示例dome操作顺序：
     <ul>
      <li>1. 通过点击页面的登录按钮，调用登录接口（zl_api/uc/user/saasLogin），获取到用户token，保存到sessionStorage中的sass_token</li>
      <li>2. 调用获取导航栏下发接口（bluewhale/rest/permission/queryMenu）</li>
      <li>3. 目前demo只有tab标签的第一个可使用，里面包括：开发规范的定义、获取列表数据的一个demo、iframe接入辰知示例</li>
    </ul>

    <h5>四、使用Vue+ElementUL时的代码规范</h5>
      <ul>
        <li>1. views文件夹：存放单页应用</li>
        <li>2. assets文件夹：存放静态资源以及字体图标库</li>
        <li>3. common文件夹：公共逻辑</li>
        <li>4. components：业务公共组件</li>
        <li>5. http：封装的http请求相关内容</li>
        <li>6. router：路由配置</li>
        <li>5. styles：存放公共样式，其中包括网站主题色以及常用字体颜色的变量声明文件；重写ElementUI样式的文件</li>
      </ul>
      <em>注意：第三方应用的所有文件命名都需要增加前缀，例如cz-**</em>
  </div>
</template>

<script>
export default {
  name: "Begin",
  data(){
    return {

    }
  }
};
</script>
<style lang="scss" scoped>
h5 {
  margin-top: 16px;
  margin-bottom: 8px;
}
</style>
