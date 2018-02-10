<template>
  <div>
   <upload-image></upload-image>
  </div>

</template>


<script>
  import  UploadImage from './file/UploadImage.vue'
  export default {
    components:{
      "upload-image":UploadImage
    },
    data() {
      return {
        visible2: false,
        lessonList:[{id:"12",visible2:false},{id:"13",visible2:false}],
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
    mounted(){

    }
    ,
    methods: {


    }
  }
</script>
