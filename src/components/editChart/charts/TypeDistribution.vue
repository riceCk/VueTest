<!--
 * @Author : 陈凯
 * @Date : 2020/08/05
 * @Content : 舆情类型分布
-->
<template>
  <div class="chart-container">
    <div class="chart-header">
      <div class="chart-title">舆情类型分布<span class="prompt-title">(请手动维护数据)</span></div>
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
    }
  },
  data() {
    return {
      myChart: null,
      chartData: {
        promptFlag: false,
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
        seriesColor: ["#3699D2", "#EB5974"],
        seriesRadius: ["50%", "70%"],
        labelFontSizeColor: "#333333",
        seriesData: [],
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
  },
  created() {},
  methods: {
    // 初始化渲染charts
    initChart() {
      if (!this.myChart) {
        this.myChart = echarts.init(document.getElementById(this.eChartId));
      }
      this.renderingData(
        this.chartData,
        this.editFormData.styleRadio
      );
    },
    // 渲染charts
    renderingData(chartData, type = "modeOne") {
      let option = handlerChartsOptionConfig.drawPieChart(chartData);
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
      this.chartData = handlerChartsData.setAttribute(
        this.tableConfig,
        this.chartData,
        editFormData
      );
    },
  },
};
</script>