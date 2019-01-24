<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
<script>
  import './assets/css/public.css'
  export default{
    data() {
      return {

      }
    },
    created(){
      this.$route.name == 'inPatients' ? document.body.style.height = 'auto' : document.body.style.height = '100%'
    },
    watch : {
      '$route.name' : function () {
        this.$route.name == 'inPatients' ? document.body.style.height = 'auto' : document.body.style.height = '100%'
      }
    }
  }
</script>
<style>
  * {
    padding: 0;
    margin: 0;
    font-size: 12px;

  }
  html, body {
    min-width:1000px;
    height: 100%;
    background-color: #f3f3f8;
    font-family: MicrosoftYaHei, 'Avenir', Helvetica, Arial, sans-serif;
    color: #2B3A50;
    overflow: auto;
  }

  a {
    text-decoration: none;
    border: none;
  }

  ul {
    list-style: none;
  }
  input,img,button{
    border:none;
    outline:none;
  }
  button,input[type=submit]{
    cursor:pointer;
  }
  .container{
    height:100%;
    background:#E6EBF0;
  }
  .container>div{
    height:100%;
  }
</style>
