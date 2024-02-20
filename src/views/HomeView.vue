<template>
<login></login>
</template>

<script>
import Layout_Main from '../components/Layout_Main'
import HelloWorld from '../components/HelloWorld'
import Login from '@/components/login.vue';


  export default {
    name: 'Home',

    components: {
      HelloWorld,
        Layout_Main,
        Login
        
        
    },
  }
</script>
