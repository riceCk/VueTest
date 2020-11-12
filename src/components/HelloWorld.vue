<template>
  <div class="wrapper">
    <section class="ueditor">
      <vue-ueditor-wrap @ready="ready" v-model="msg" :config="myConfig"></vue-ueditor-wrap>
    </section>
    <section class="edie">
      <button @click="onIframe">插入代码</button>
      <button @click="onPreview">浏览</button>
      <button @click="onCleardoc">清空内容</button>
    </section>
  </div>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";
export default {
  name: "HelloWorld",
  components: {
    VueUeditorWrap,
  },
  data() {
    return {
      myChart: null,
      editorInstance: null,
      color: "#ff0000",
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: true,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: "90%",
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: "http://35.201.165.105:8000/controller.php",
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: "/UEditor/"
      },
      msg: ""
    };
  },
  watch: {
    msg(val) {
      console.log(val);
    }
  },
  async mounted() {
  },
  methods: {
    onCleardoc() {
      this.editorInstance.execCommand("cleardoc");
    },
    onPreview() {
      this.editorInstance.execCommand("preview");
    },
    ready(editorInstance) {
      this.editorInstance = editorInstance;
      console.log(`编辑器实例${editorInstance.key}: `, editorInstance);
    },
    onBtn(href) {
      let url =
        href ||
        "https://dss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1174684483,4165900549&fm=202&mola=new&crop=v1";
      this.editorInstance.execCommand("insertimage", [
        {
          src: url,
          width: 100,
          height: 100
        }
      ]);
    },
    base64ToBlob(code) {
      let parts = code.split(";base64,");
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;

      let uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    },
    onIframe(val) {
      console.log(val, 13123);
      this.editorInstance.execCommand(
        "insertHtml",
        '<iframe src="http://localhost:8080/" frameborder="0">12312312</iframe>'
      );
    },
    saveAsImage() {
      let content = this.myChart.getDataURL();
      let blob = this.base64ToBlob(content);
      const href = URL.createObjectURL(blob);
      this.onBtn(href);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this charts only -->
<style scoped>
.wrapper {
  display: flex;
}
.ueditor {
  flex: 0 0 60%;
}
.edie {
  flex: 0 0 40%;
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
