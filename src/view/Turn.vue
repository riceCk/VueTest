<template>
  <div class="manual-wrap active" @touchmove.prevent v-show="showData">
    <turn 
      :width="turnwidth" 
      ref="turn" 
      :height="turnheight" 
      :data="recentlsit"
    >
    </turn>
  </div>
</template>

<script>
import turn from "vue-flip-page";
export default {
  name: "xx-xx",
  components: { turn },
  props: {},
  data() {
    return {
      showData: true,
      turnwidth: 375,
      turnheight: 667,
      recentlsit: [
        {
          picture_image:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2600216442,2384386498&fm=15&gp=0.jpg",
        },
        {
          picture_image:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580807703833&di=0ab054549c3ea050dc0bd49e146b20e9&imgtype=0&src=http%3A%2F%2Fwww.thatsmags.com%2Fimage%2Fview%2F201703%2Fvue-cover.jpg",
        },
         {
          picture_image:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580807703833&di=0ab054549c3ea050dc0bd49e146b20e9&imgtype=0&src=http%3A%2F%2Fwww.thatsmags.com%2Fimage%2Fview%2F201703%2Fvue-cover.jpg",
        },
         {
          picture_image:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580807703833&di=0ab054549c3ea050dc0bd49e146b20e9&imgtype=0&src=http%3A%2F%2Fwww.thatsmags.com%2Fimage%2Fview%2F201703%2Fvue-cover.jpg",
        },
         {
          picture_image:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1580807703833&di=0ab054549c3ea050dc0bd49e146b20e9&imgtype=0&src=http%3A%2F%2Fwww.thatsmags.com%2Fimage%2Fview%2F201703%2Fvue-cover.jpg",
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleTurnChange () {
      console.log(111111111)
    },
    handleToggleControl () {

    },
    handleTurning () {

    },
    handleTurnPrev () {

    },
    handleTurnNext () {

    },
    handleSwitchManual(index) { 
      if (index === this.currentIndex) return; 
      this.$refs["turn"].toPage(index); 
      this.currentIndex = index; 
      this.goods_id = this.manuals[this.currentIndex].goods_id; 
      this.show = false; 
    },
  },
};
</script>

<style type="text/less" lang="less">
.manual-wrap {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
  -webkit-transition: opacity ease 0.5s;
  transition: opacity ease 0.5s;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -o-user-select: none;
}

.manual-wrap.active {
  -webkit-transform: scale(1);
  transform: scale(1);
  opacity: 1;
}
</style>