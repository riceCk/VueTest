<template>
  <div id="container" style="width: 100%;height: 200px"></div>
</template>

<script>
  import * as monaco from 'monaco-editor'
  export default {
    name: 'xx-xx',
    components: {},
    props: {},
    data() {
      return {
        editor:null,//文本编辑器
      }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted(){
      this.initEditor();
    },
    methods:{
      initEditor(){
        // 初始化编辑器，确保dom已经渲染
        this.editor = monaco.editor.create(document.getElementById('container'), {
          value:'',//编辑器初始显示文字
          language:'sql',//语言支持自行查阅demo
          automaticLayout: true,//自动布局
          theme:'vs-dark' //官方自带三种主题vs, hc-black, or vs-dark
      });
      },
      getValue(){
        this.editor.getValue(); //获取编辑器中的文本
      }
    }
  }
</script>