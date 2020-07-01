<template>
  <div class="grid">
    <grid-layout
      :layout.sync="layout"
      :col-num="4"
      :row-height="50"
      :is-draggable="true"
      :is-resizable="false"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      @layout-updated="layoutUpdatedEvent"
    >
      <grid-item
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
      >
        <div :id="item.i" :style="{width: '300px', height: '300px'}"></div>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data() {
    return {
      myChart1: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      myChart5: null,
      myChart6: null,
      layout: [
        { x: 0, y: 0, w: 2, h: 5, i: "myChart1" },
        { x: 2, y: 0, w: 2, h: 5, i: "myChart2" },
        { x: 0, y: 1, w: 2, h: 5, i: "myChart3" },
        { x: 2, y: 1, w: 2, h: 5, i: "myChart4" },
        { x: 0, y: 2, w: 2, h: 5, i: "myChart5" },
        { x: 2, y: 2, w: 2, h: 5, i: "myChart6" }
      ]
    };
  },
  async mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      var echarts = require("echarts");
      // this.myChart = echarts.init(document.getElementById("myChart"));
      this.layout.forEach(item => {
        console.log(item.i, 123123)
        let name = item.i
        console.log(name, this[name])
        this[name] = echarts.init(document.getElementById(name));
        // console.log(this.item.i, 12321)
        this.setChartsOption(this[name])
      })
    },
    setChartsOption(myChart) {
      myChart.setOption({
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    },
    layoutUpdatedEvent: function(newLayout) {
      console.log("Updated layout: ", newLayout);
    }
  }
};
</script>

<style scoped>
.vue-grid-item {
  background-color: #ccc;
}
</style>