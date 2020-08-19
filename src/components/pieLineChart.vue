<!--
 * @Author : 陈凯
 * @Date : 2020/06/30
 * @Content : 饼图和折线图的切换
-->

<template>
  <div class="pielineChart">
    <el-switch v-model="switchFlag" active-text="折线图/饼图" @change="onSwitchBtn"></el-switch>
    <div :id="eChartId" :style="chartStyle"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import {drawPieChart, drawLineChart} from './common/chartsOption.js'
export default {
  props: {
    eChartId: {
      type: String,
      default: "myChart"
    },
    chartStyle: {
      type: String,
      default: "width:400px;height:300px;"
    },
    // eCharts外置数据
    chartData: {
      type: Object,
      default() {
        return {
          lineOptionConfig: {
            color: ["#F49D1A", "#E23030"],
            fontSize: "18",
            titleText: "显示标题",
            legendTop: "0",
            legendLeft: "3",
            legendRight: "",
            legendData: ["全部", "负面"],
            xAxisData: ["06/07", "06/08", "06/09", "06/10", "06/11"],
            seriesData: [
              {
                name: "全部",
                type: "line",
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          // 1代表上面
                          offset: 1,
                          color: "#F6FDFF"
                        },
                        {
                          offset: 0,
                          color: "#F49D1A"
                        }
                      ])
                    }
                  }
                },
                areaStyle: {
                  normal: {}
                },
                data: [300, 200, 150, 60, 256]
              },
              {
                name: "负面",
                type: "line",
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          // 1代表上面
                          offset: 1,
                          color: "#F6FDFF"
                        },
                        {
                          offset: 0,
                          color: "#f40"
                        }
                      ])
                    }
                  }
                },
                areaStyle: {
                  normal: {}
                },
                data: [265, 255, 300, 105, 52]
              }
            ]
          },
          pieOptionConfig: {
            legendData: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
            seriesRadius: ["50%", "70%"],
            seriesData: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        };
      }
    }
  },
  data() {
    return {
      myChart: null,
      switchFlag: true
    };
  },
  watch: {
    "chartData.lineOptionConfig": {
      handler(newValue, oldValue) {
        if (this.myChart) {
          if (newValue) {
            this.chartData.lineOptionConfig = newValue;
          } else if (oldValue) {
            this.chartData.lineOptionConfig = oldValue;
          }
          this.onSwitchBtn(this.switchFlag);
        } else {
          this.initChart();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(document.getElementById(this.eChartId));
      if (this.chartData) {
        this.onSwitchBtn(this.switchFlag);
      }
    },
    onSwitchBtn(falg) {
      let config = null;
      if (falg) {
        config = this.chartData.lineOptionConfig;
        this.myChart.setOption(drawLineChart(config), true);
      } else {
        config = this.chartData.pieOptionConfig;
        this.myChart.setOption(drawPieChart(config), true);
      }
    },
  }
};
</script>
