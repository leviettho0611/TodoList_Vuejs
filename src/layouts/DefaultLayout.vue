<template>
  <div>
    <HeaderPage></HeaderPage>
    <!-- <Router-view></Router-view> -->
    <Router-view></Router-view>
    <!-- <FooterPage></FooterPage> -->
  </div>
</template>
<script>
import HeaderPage from "@/components/HeaderPage.vue";
// import FooterPage from '@/components/Footer.vue';

export default {
  components: {
    HeaderPage,
    // FooterPage
  },
};
</script>

<style></style>
