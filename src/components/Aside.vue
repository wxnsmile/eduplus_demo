 <template>
    <!-- @open="handleOpen"
      @close="handleClose" -->
        <!-- :default-active="$route.path" -->
      <!-- default-active="/farmSecurity" -->

   <el-menu
      :default-active="$route.path"
      :unique-opened="true"
      :default-openeds="indexPath"
      :router="true"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      >
      <el-submenu v-for="(submenu,index) in submenuList" :key="index" :index="`${index}`">
        <template slot="title">
          <i :class="submenu.icon"></i>
          <span>{{submenu.name}}</span>
        </template>
          <el-menu-item v-for="item in submenu.children" :key="item.id" :index="item.path">
              <i class="iconfont icon-dot"></i>
              {{item.name}} 
          </el-menu-item>
      </el-submenu>
   </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    submenuList: Array,
  },
  data() {
    return {
      indexPath: ['0']
    }
  },
  methods: {
    handleOpen(index, indexPath) {
      this.indexPath = indexPath;
    }
  }
}
</script>
<style lang="scss" scoped>
.iconfont {
    margin: 0 5px;
    vertical-align: bottom;
}
</style>
