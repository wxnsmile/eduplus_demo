<template>
  <el-tabs v-model="active" @tab-click="tabClick">
    <el-tab-pane v-for="(menu, index) in menuList" :label="menu.name" :key="index" :name="`${index}`">
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "Header",
  props: {
    menuList: Array
  },
  data() {
    return {
      active: '0',
    }
  },
  methods: {
    tabClick() {
      this.$emit('tabClick', this.active);
    }
  }
};
</script>

<style scoped lang="scss">

</style>
