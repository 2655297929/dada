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
  compted:{
    count(){
      return this.@store.store.count;t
    }
  },
  data() {
    return { 
    }
  },
  methods: {
    increment() {
      this.$store.dispatch(increment)
    },
    decrement() {
            this.$store.dispatch(decrement)
    },
    incrementIfOdd() {
       this.$store.dispatch(incrementIfOdd)
    },
    incrementAsync() {
       this.$store.dispatch(incrementAsync)
    },
  },
  mounted(){
    
  }
}
</script>

<style>
</style>