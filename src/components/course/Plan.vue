<template>
  <div>
    <textarea v-model="txt"></textarea>

    <vue-markdown :source="txt1"></vue-markdown>
  </div>

</template>
<script>
  import VueMarkdown from 'vue-markdown';
  export default {
    data(){
      return{
        txt:'',
        txt1:'adfafd'
      }
    },
    watch:{
      txt:function(val){
        console.log(val)
        this.txt1 = val
      }
    },
    components: {
      'vue-markdown': VueMarkdown
    }
  }


</script>
