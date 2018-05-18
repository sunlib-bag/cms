<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .picture-inner{
    border: none !important;
  }
  .picture-inner .picture-inner-text{
    font-size: 24px !important;
  }

  body {
    margin: 0;
  }
  /*.markdown-preview-container h2{*/
    /*display:inline-block;*/
    /*background: green;*/
    /*position: relative;*/
    /*padding-left: 10px;*/
  /*}*/
  /*.markdown-preview-container  h2::before{*/

  /*}*/

  /*.markdown-preview-container h1{*/
    /*display:inline-block;*/
    /*position: relative;*/
    /*padding-left: 30px;*/
  /*}*/
  /*.markdown-preview-container  h1::after{*/
    /*position: absolute;*/
    /*content: " ";*/
    /*top: 0;*/
    /*right: -20px;*/
    /*height: 100%;*/
    /*width: 20px;*/
    /*background-image: url('/static/folder.png');*/
    /*background-size: cover;*/
  /*}*/
  /*.markdown-preview-container  h1::before{*/
    /*position: absolute;*/
    /*content: " ";*/
    /*top: 0;*/
    /*left: 0;*/
    /*height: 100%;*/
    /*background-size: cover;*/
    /*width: 20px;*/
    /*background-image: url('/static/folder.png');*/
  /*}*/



  /*.markdown-preview-container  h2::after{*/
    /*position: absolute;*/
    /*content: " ";*/
    /*top: 0px;*/
    /*right: -10px;*/
    /*height: 100%;*/
    /*width: 20px;*/
    /*background: green;*/
    /*border-radius: 0 100% 100% 0;*/
  /*}*/



</style>
