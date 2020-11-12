<!--
 * @Author : 陈凯
 * @Date : 2020/08/05
 * @Content : 活跃媒体分布
-->
<template>
  <div class="chart-container flexOne" v-loading="loading">
    <div class="chart-header">
      <div class="chart-title">活跃媒体分布</div>
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
      type: Array
    },
    themeColor: {
      type: String,
    },
  },
  data() {
    return {
      myChart: null,
      chartData: {
        modeOne: {
          xAxisData: [],
          seriesColor: [],
          seriesData: [],
        },
        modeTwo: {
          axisColor: [],
          yAxisData: [],
          seriesData: [],
          barWidth: 10,
        },
        modeThree: {
          promptFlag: false,
          titleText: "媒体来源分布",
          titleTop: 20,
          titleColor: "red",
          titleFontSize: "16",
          titleLeft: "right",
          legendRight: "0",
          legendBottom: "50",
          legendShow: true,
          legendData: [],
          seriesName: "",
          center: ["45%", "50%"],
          seriesColor: [],
          seriesRadius: ["50%", "70%"],
          labelFontSizeColor: "#333333",
          seriesData: [],
        },
      },
      // 编辑table的相关数据
      tableConfig: {
        // 回显的编辑table参数
        updateTable: [],
        // 图标数据表头
        columnTable: {
          name: "类型",
          value: "数值",
        },
      },
      // 配置调条件框配置
      formOptions: [
        {
          label: "样式",
          prop: "styleRadio",
          element: "el-radio-group",
          options: [
            { label: "柱状图", value: "modeOne" },
            { label: "条形图", value: "modeTwo" },
            { label: "环形图", value: "modeThree" },
          ],
        },
        {
          label: "隐藏网格",
          prop: "hideGrid",
          element: "el-switch",
        },
        {
          label: "隐藏数值",
          prop: "hideData",
          element: "el-switch",
        },
        {
          label: "图表数据 X",
          prop: "multiple",
          element: "el-input-number",
          min: 1,
        },
      ],
      // 回显编辑editFormData参数
      editFormData: {
        hideData: false,
        hideGrid: false,
        styleRadio: "modeOne",
        multiple: 1,
      },
      loading: false,
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
        this.echoParentsData(newValue, this.editFormData);
        this.initChart();
      },
      deep: true,
    },
    themeColor(val) {
      this.editFormData.themeColor = val;
      this.echoParentsData(this.tableConfig.updateTable, this.editFormData)
    },
  },
  created() {},
  methods: {
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
      if (type === "modeOne") {
        option = handlerChartsOptionConfig.drawHistogramChart(chartData);
      } else if (type === "modeTwo") {
        option = handlerChartsOptionConfig.drawBarGraphChart(chartData);
      } else if (type === "modeThree") {
        option = handlerChartsOptionConfig.drawPieChart(chartData);
      }
      this.myChart.clear();
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
      const chartConfig = this.chartData[this.editFormData.styleRadio];
      if (editFormData.styleRadio === "modeOne") {
        this.chartData.modeOne = handlerChartsData.setHistogram(
          this.tableConfig,
          chartConfig,
          editFormData
        );
      } else if (editFormData.styleRadio === "modeTwo") {
        this.chartData.modeTwo = handlerChartsData.setBarGraph(
          this.tableConfig,
          chartConfig,
          editFormData
        );
      } else if (editFormData.styleRadio === "modeThree") {
        this.chartData.modeThree = handlerChartsData.setAttribute(
          this.tableConfig,
          chartConfig,
          editFormData
        );
      }
    },
  },
};
</script>