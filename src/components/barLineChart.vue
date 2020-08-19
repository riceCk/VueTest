<!--
 * @Author : 陈凯
 * @Date : 2020/06/30
 * @Content : 分装charts
-->
<template>
  <div class="barLine" @click="onMaskTable">
    <div :id="eChartId" :style="chartStyle"></div>
    <edit-charts
      v-model="dialogEdit"
      :styleOption="styleOption"
      :hiddenType="hiddenType"
      :edi-table-data="updateTable"
      :styleData="styleData"
      :table-column="tableColumn"
      @handlerEditCharts="handlerEditCharts"
    ></edit-charts>
  </div>
</template>

<script>
import echarts from "echarts";
import { drawLineChart, histogramChart } from "./common/chartsOption.js";
import editCharts from "./common/editCharts";
import { CharlesData } from "./common/utils/charlesData";
export default {
  components: {
    editCharts,
  },
  props: {
    eChartId: {
      type: String,
      default: "myChart",
    },
    chartStyle: {
      type: String,
      default: "width:600px;height:300px;",
    },
    // eCharts外置数据
    chartData: {
      type: Object,
      default() {
        return {
          lineOption: {
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
                          color: "#F6FDFF",
                        },
                        {
                          offset: 0,
                          color: "#F49D1A",
                        },
                      ]),
                    },
                  },
                },
                areaStyle: {
                  normal: {},
                },
                data: [],
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
                          color: "#F6FDFF",
                        },
                        {
                          offset: 0,
                          color: "#f40",
                        },
                      ]),
                    },
                  },
                },
                areaStyle: {
                  normal: {},
                },
                data: [],
              },
            ],
          },
        };
      },
    },
    // 图表数据
    ediTableData: {
      type: Array,
    },
    // 图标数据表头
    tableColumn: {
      type: Object,
    },
    styleOption: {
      type: Array,
      default () {
        return [
        {
          value: "lineOption",
          label: "折线图",
        },
        {
          value: "pieOption",
          label: "柱状图",
        },
      ]
      }
    },
    hiddenType: {
      type: Array,
      default() {
        return [
          {
          value: "yAxisGrid",
          label: "隐藏网格",
        },
        {
          value: "param",
          label: "隐藏数据",
        },
        ]
      }
    },
  },
  data() {
    return {
      myChart: null,
      dialogEdit: false, // 回显开关
      // 回显的编辑table参数
      updateTable: [],
      // 回显编辑form样式参数
      styleData: {
        styleRaido: "lineOption",
        multiple: 1,
      },
      
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
          this.renderingData(this.chartData[this.styleData.styleRaido], this.styleData.styleRaido);
        } else {
          this.initChart();
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.initData();
    this.initChart();
  },
  methods: {
    initData() {
      this.updateTable = JSON.parse(JSON.stringify(this.ediTableData));
    },
    // 初始化渲染charts
    initChart() {
      this.myChart = echarts.init(document.getElementById(this.eChartId));
      if (this.chartData[this.styleData.styleRaido]) {
        this.renderingData(this.chartData[this.styleData.styleRaido], this.styleData.styleRaido);
      }
    },
    // 渲染charts
    renderingData(chartData, type = "lineOption") {
      let option;
      if (type === "lineOption") {
        option = drawLineChart(chartData);
      } else {
        option = histogramChart(chartData);
      }
      this.myChart.setOption(option, true);
    },
    // 点击编辑
    onMaskTable() {
      this.dialogEdit = true;
    },
    /**
     * 编辑退出
     * v: {updateTable, styleData}
     * @param updateTable  图表数据
     * @param styleData  图表样式
     */
    handlerEditCharts(v) {
      const { updateTable, styleData } = v;
      this.dialogEdit = false;
      this.updateTable = updateTable;
      this.$emit('handlerEditCharts', v)
    },
  },
};
</script>