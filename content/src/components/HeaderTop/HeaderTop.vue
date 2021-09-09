<!--  -->
<template>
  <header class="header">
    <!-- 定义插槽调用组件(放大镜) -->
    <slot name="left"></slot>
    <span class="header_title">
      <span class="header_title_text ellipsis">{{ title }}</span>
    </span>
    <!-- 定义插槽调用组件(登录按钮) -->
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  props: {    //声明接收父组件数据
    title: { String }   //声明接收数据名title类型字符串
  },
  data() {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {}
}

</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
//引入公共样式
@import "../../common/stylus/minxns.styl"
.header { // 头部公共css
  background-color: #02a774;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 45px;

  .header_search {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 10%;
    height: 50%;

    .iconfont {
      font-size: 22px;
      color: #fff;
    }
  }

  .header_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    color: #fff;
    font-size: 22px;
    text-align: center;
  }
}
</style>
