<template>
  <div id="app">
    <!-- 组件站位符 -->
    <router-view></router-view>
    <!-- 调用底部组件 -->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>
<script>
// 引入底部导航栏
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  components: {
    FooterGuide
  }
}
</script>
<style>
#app{
  width: 100%;
  height:100%;
  background: #f5f5f5;
}
</style>