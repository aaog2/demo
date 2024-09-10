<!-- src/components/MobileAlert.vue -->  
<template>  
    <div class="mobile-alert">  
      <h1>Mobile Access Not Allowed</h1>  
      <p>This application is only available in desktop view. Please rotate your device or use a desktop computer.</p>  
    </div>  
  </template>  
  
  <script>  
  export default {  
    name: 'MobileAlert',  
  };  
  </script>  
  
  <style scoped>  
  .mobile-alert {  
    display: flex;  
    flex-direction: column;  
    justify-content: center;  
    align-items: center;  
    height: 100vh;  
    text-align: center;  
    background-color: #fff; /* Light red background */  
    color: #721c24; /* Dark red text */  
  }  
  </style>