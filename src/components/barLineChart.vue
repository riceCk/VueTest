<!--
 * @Author : 陈凯
 * @Date : 2020/06/30
 * @Content : 折线图和柱状图切换
-->
<template>
    <div :id="eChartId" :style="chartStyle"></div>
</template>

<script>
import echarts from "echarts";
import {drawLineChart} from './common/chartsOption'
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
        };
      }
    }
  },
  data() {
    return {
      myChart: null
    };
  },
  watch: {
    chartData: {
      handler(newValue, oldValue) {
        if (this.myChart) {
          if (newValue) {
            this.chartData = newValue;
          } else if (oldValue) {
            this.chartData = oldValue;
          }
          this.renderingData(this.chartData);
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
        this.renderingData(this.chartData);
      }
    },
    renderingData(chartData) {
      const option = drawLineChart({
          color: ["#F49D1A", "#E23030"],
          magicType: {type: ["bar", "line"]},
          fontSize: "18",
          titleText: "显示标题",
          legendTop: "0",
          legendLeft: "3",
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
      })
      this.myChart.setOption(option);
    },
  }
};
</script>