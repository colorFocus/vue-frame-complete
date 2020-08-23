<template>
  <transition name="fade-transform" mode="out-in">
    <router-view :key="key" />
  </transition>
</template>
<script>
export default {
  name: "Layout",
  data() {
    return {};
  },
  computed: {
    //对于不同router指向同一个component的情况，采用标注key的方式，使得组件能够重新渲染触发钩子
    key() {
      return this.$route.fullPath;
    }
  },
  methods: {}
};
</script>