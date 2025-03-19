// error404.vue
<template>
  <div class="main-wrapper">
    <div class="wscn-http404-container">
      <div class="wscn-http404">
        <div class="bullshit">
          <div class="bullshit__oops">404 No Found ...</div>
          <div @click="handleBack" class="bullshit__return-home">返回</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page404",
  computed: {
    message() {
      return "没有找到你要访问的页面。。。";
    },
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.main-wrapper{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.wscn-http404-container{
    width: 400px;
}
.bullshit__oops{
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}
.bullshit__return-home {
  display: block;
  float: left;
  width: 110px;
  height: 36px;
  background: #1482f0;
  border-radius: 100px;
  text-align: center;
  color: #ffffff;
  font-size: 14px;
  line-height: 36px;
  cursor: pointer;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-delay: 0.3s;
  animation-fill-mode: forwards;
}
</style>
