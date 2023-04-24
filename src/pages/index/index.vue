<template>
  <view class="content" @click="dome">
    {{ title }}
  </view>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
const title = ref('Hello22')

function dome() {
console.log(123);

  uni.scanCode({
    success: function (res) {
      console.log('条码类型：' + res.scanType)
      console.log('条码内容：' + res.result)
      // that.result1 = res.result;
    },
    fail() {},
  })
}
</script>

<style lang="scss"></style>
