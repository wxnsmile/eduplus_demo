<template>
  <div class="home">
    <el-button @click="getData">获取数据</el-button>
    <el-table
      v-if="list && list.bizData && list.bizData.allSchool.length > 0"
      :data="list.bizData.allSchool"
      style="width: 100%">
      <el-table-column
        prop="schoolName"
        label="学校名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="creator"
        label="创建者">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      list: {}
    }
  },
  methods: {
    async getData() {
      this.list = await this.$http.post(`/zl_api/kidscare/user/getUserAllSchool?token=${this.getSg('saas_token')}`, {}, {})
      .catch(e => {
        console.log('登录失败')
        this.loading = false;
      });
    }
  }
};
</script>
