<template>
  <div class="container">
    <h1>--vuex-当前count:{{ count }}</h1>
    <button @click="increment">加</button>
    <button @click="decrement">减</button>
    <button @click="incrementIfOdd">奇数增加</button>
    <button @click="incrementAsync">异步增加</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count>1?this.count--:6

    },
    incrementIfOdd() {
      if (this.count % 2 == 1) {
        this.count++
      }
    },
    incrementAsync() {
      setTimeout(() => {
        this.count++
      }, 6)
    },
  }
}
</script>

<style>
</style>