
<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item><a href="/">开发前必读</a></el-breadcrumb-item>
        <el-breadcrumb-item>信息展示</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    msg: String,
  },
  data() {
    return {
    }
  }
}