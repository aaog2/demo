<template>
  <div id="app">
    <MobileAlert v-if="isMobile"/>
   <div v-else>
    <LoginPage></LoginPage>
   <router-view/>
   </div>
  </div>
</template>

<script>  
import MobileAlert from './components/MobileAlert.vue';  

export default {  
  components: {  
    MobileAlert,  
  },  
  data() {  
    return {  
      isMobile: false,  
    };  
  },  
  mounted() {  
    this.checkScreenSize();  
    window.addEventListener('resize', this.checkScreenSize); // Optional: check on resize  
  },  
  beforeDestroy() {  
    window.removeEventListener('resize', this.checkScreenSize); // Clean up the event listener  
  },  
  methods: {  
    checkScreenSize() {  
      const minWidth = 1024; // Set your minimum width for desktop  
      this.isMobile = window.innerWidth < minWidth;  
    },  
  },  
};  
</script>  

<style>

  @font-face {
    font-family: "Pyidaungsu-Regular";
    src: local("Pyidaungsu-Regular"),
    url(./assets/font/Pyidaungsu-2.5.3_Regular.ttf) format(truetype);
  }
</style>
