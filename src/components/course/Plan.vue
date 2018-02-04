<template>
  <div>
    <vue-markdown>i am a ~~tast~~ **test**.</vue-markdown>
  </div>

</template>
<script>
  import VueMarkdown from 'vue-markdown';
  export default {
    components: {
      'vue-markdown': VueMarkdown
    }
  }
</script>
