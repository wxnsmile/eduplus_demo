<template>
  <div id="app">
    <el-header>
      <img class="logo" width=130 height=42 src="./assets/logo.png" alt=""/>
      <Header :menuList="menu" @tabClick="tabClick"/>
      <div class="login"><el-button @click="toLogin">登录</el-button></div> 
    </el-header>
    <el-container>
      <el-aside>
        <Aside v-if="choosedSubmenuList.length" :submenuList="choosedSubmenuList"/>
      </el-aside>
      <div class="container-right">
        <Breadcrumb/>
        <el-main>
          <router-view/>
        </el-main>
      </div>
    </el-container>
  </div>
</template>
<script>
import Header from '@/components/Header';
import Aside from '@/components/Aside';
import Breadcrumb from '@/components/Breadcrumb';
import md5 from "js-md5";
import qs from "qs";
export default {
  name: "app",
  components: {
    Header,
    Aside,
    Breadcrumb
  },
  data() {
    return {
      menu: [],
      choosedSubmenuList: []
    }
  },
  methods: {
    tabClick(index = 0) {
      this.choosedSubmenuList = this.menu[index].children || [];
    },
    async requireMenuData(curSchool, token) {
      let promise = await this.$http.post(
        '/bluewhale/rest/permission/queryMenu',
        {},
        qs.stringify({
          token: token,
          appCode: "eduplus_saas",
          schoolNo: "",
          orgId: '10001',
          menuFlag: 'zl',
          showXysOrg: 0
        }),
        "application/x-www-form-urlencoded"
      ).then(res => {
       this.menu = res.data ? res.data.menuDtoList : [];
        this.setSStorage("menu_list", this.menu);

        this.choosedSubmenuList = this.menu[0].children || [];
        console.log(this.choosedSubmenuList);
      }).catch(err => {
        this.$message('获取menuList失败');
      });
      return promise;
    },
    setSStorage(key, value) {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    async toLogin() {
      let data = {
        account: "13484620312",
        pwd: md5('000000'),
        sessionId: "",
        code: "ax7r",
        requestSource: "imeduplus"
      };
      let res = await this.$http.post('/zl_api/uc/user/saasLogin', {}, data)
        .catch(e => {
          this.$message('登录失败');
          this.loading = false;
        });
      if (res.rtnCode == "0000000") {//登录成功
        this.$message({message: '登录成功', type: 'success'});
        this.setSg("saas_token",res.bizData.token);

        this.requireMenuData({}, res.bizData.token);

      } else {
        this.$message({message: res.msg, type: 'success'});
      }
    }
  }
};
</script>
<style lang="scss" scope>
.logo {
  margin-right: 20px;
}
.login {
  margin-left: 20px;
}
</style>
