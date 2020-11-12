<!--
 * @Author : 陈凯
 * @Date : 2020/07/30
 * @Content : 舆情热度趋势
-->
<template>
  <div class="chart-container flexOne">
    <div class="chart-header">
      <div class="chart-title">{{otherConfiguration.title}}</div>
      <div class="chart-edit">
        <label @click="onMaskTable">编辑</label>
      </div>
    </div>
    <div :id="eChartId" :style="chartStyle"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { handlerChartsOptionConfig } from "../utils/chartsOptionConfig";
import { handlerChartsData } from "../utils/handlerChartsData";

export default {
  props: {
    eChartId: {
      type: String,
      default: "myChart",
    },
    chartStyle: {
      type: String,
      default: "width:100%;height:454px;",
    },
    publicData: {
      type: Object,
    },
    themeColor: {
      type: String,
    },
    otherConfiguration: {
      type: Object
    }
  },
  data() {
    return {
      myChart: null,
      chartData: {
        modeOne: {
          fontSize: "18",
          titleText: "显示标题",
          legendTop: "0",
          legendLeft: "20",
          legendRight: "",
          legendData: ["全部", "负面"],
          xAxisData: [],
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
                        color: "#3699D2",
                      },
                    ]),
                  },
                },
              },
              areaStyle: {
                normal: {},
              },
              markPoint: {
                data: [
                  {
                    name: "最大值",
                    type: "max",
                  },
                ],
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
                        color: "#EB5974",
                      },
                    ]),
                  },
                },
              },
              areaStyle: {
                normal: {},
              },
              markPoint: {
                data: [
                  {
                    name: "最大值",
                    type: "max",
                  },
                ],
              },
              data: [],
            },
          ],
        },
        modeTwo: {
          color: ["#3699D2", "#EB5974"],
          fontSize: "18",
          titleText: "显示标题",
          legendTop: "0",
          legendLeft: "20",
          legendRight: "",
          legendData: ["全部", "负面"],
          xAxisData: [],
          seriesData: [
            {
              name: "全部",
              type: "line",
              data: [],
              smooth: true,
              markPoint: {
                data: [
                  {
                    name: "最大值",
                    type: "max",
                  },
                ],
              },
            },
            {
              name: "负面",
              type: "line",
              data: [],
              smooth: true,
              markPoint: {
                data: [
                  {
                    name: "最大值",
                    type: "max",
                  },
                ],
              },
            },
          ],
        },
      },
      // 编辑table的相关数据
      tableConfig: {
        // 回显的编辑table参数
        updateTable: [],
        // 图标数据表头
        columnTable: {
          xData: "时间",
          totalData: "全部",
          negData: "负面",
        },
      },
      // 配置调条件框配置
      formOptions: [
        {
          label: "样式",
          prop: "styleRadio",
          element: "el-radio-group",
          options: [
            { label: "模式一", value: "modeOne" },
            { label: "模式二", value: "modeTwo" },
          ],
        },
        {
          label: "隐藏网格",
          prop: "hideGrid",
          element: "el-switch",
        },
        {
          label: "图表数据 X",
          prop: "multiple",
          element: "el-input-number",
          min: 0.01,
          precision: '2'
        },
      ],
      // 回显编辑editFormData参数
      editFormData: {
        hideGrid: false,
        styleRadio: "modeOne",
        multiple: 1,
      },
    };
  },
  watch: {
    chartData: {
      handler(newValue, oldValue) {
        if (newValue) {
          this.chartData = newValue;
        } else if (oldValue) {
          this.chartData = oldValue;
        }
        this.initChart();
      },
      deep: true,
    },
    publicData: {
      handler(newValue, oldValue) {
        this.handlerPublic(newValue);
        this.initChartsOption();
        this.initChart();
      },
      deep: true,
    },
    themeColor(val) {
      this.editFormData.themeColor = val;
      this.initChartsOption();
    },
  },
  mounted() {},
  methods: {
    /**
     * 处理舆情接口数据
     */
    handlerPublic(newValue) {
      const timeLineEditable = [];
      for (let i = 0; i < newValue.totalHotDegree.countList.length; i++) {
        if (this.eChartId === "popularityTrend") {
          timeLineEditable.push({
            id: i,
            xData: newValue.negHotDegree.dateList[i],
            negData: newValue.negHotDegree.countList[i],
            totalData: newValue.totalHotDegree.countList[i],
            disabled: true,
          });
        } else {
          timeLineEditable.push({
            id: i,
            xData: newValue.total.dateList[i],
            negData: newValue.neg.countList[i],
            totalData: newValue.total.countList[i],
            disabled: true,
          });
        }
      }
      this.tableConfig.updateTable = timeLineEditable;
      this.chartData.modeOne.selected = this.otherConfiguration.selected
      this.chartData.modeTwo.selected = this.otherConfiguration.selected
    },
    initChartsOption() {
      this.chartData[
        this.editFormData.styleRadio
      ] = handlerChartsData.setLineParam(
        this.tableConfig,
        this.chartData[this.editFormData.styleRadio],
        this.editFormData
      );
    },
    // 初始化渲染charts
    initChart() {
      if (!this.myChart) {
        this.myChart = echarts.init(document.getElementById(this.eChartId));
      }
      this.renderingData(
        this.chartData[this.editFormData.styleRadio],
        this.editFormData.styleRadio
      );
    },
    // 渲染charts
    renderingData(chartData, type = "modeOne") {
      let option;
      option = handlerChartsOptionConfig.drawLineChart(chartData);
      // console.log(option, 11111)
      this.myChart.setOption(option, true);
    },
    /**
     * 弹框开启
     * 点击编辑,传父级参数
     */
    onMaskTable() {
      const param = {
        tableConfig: this.tableConfig,
        formOptions: this.formOptions,
        editFormData: this.editFormData,
        eChartId: this.eChartId,
      };
      this.$emit("openEidForm", param);
    },
    /**
     * 弹框退出
     * 父级组件回显传参
     */
    echoParentsData(updateTable, editFormData) {
      this.editFormData = editFormData;
      this.tableConfig.updateTable = updateTable;
      this.initChartsOption();
    },
  },
};
</script>
