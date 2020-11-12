<!--
 * @Author : 陈凯
 * @Date : 2020/08/05
 * @Content : 舆情传播路径
-->
<template>
  <div class="chart-container" v-loading="loading" :style="flexWidth" v-resize="resize">
    <div class="chart-header">
      <div class="chart-title">舆情传播路径</div>
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
import tableCompVue from '../../monitor/newSettings/eWList/tableComp.vue';

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
    publicData: {},
  },
  data() {
    return {
      myChart: null,
      chartData: {
        seriesData: {
          name: "一级标题",
          children: [
            {
              name: "二级一",
            },
            {
              name: "二级二",
            },
            {
              name: "二级三",
            },
          ],
        },
        wordCount: 10
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
          label: "宽度",
          prop: "width",
          element: "el-slider",
        },
        // {
        //   label: "节点限制字数限制",
        //   prop: "wordCount",
        //   element: "el-input-number",
        //   min: 1,
        // },
      ],
      // 回显编辑editFormData参数
      editFormData: {
        type: "treeEditable",
        width: 50,
        wordCount: 10
      },
      loading: false,
    };
  },
  directives: {
    // 使用局部注册指令的方式
    resize: {
      // 指令的名称
      bind(el, binding) {
        // el为绑定的元素，binding为绑定给指令的对象
        let width = "",height = "";
        function isReize() {
          const style = document.defaultView.getComputedStyle(el);
          if (width !== style.width || height !== style.height) {
            binding.value(); // 关键
          }
          width = style.width;
          height = style.height;
        }
        el.__vueSetInterval__ = setInterval(isReize, 300);
      },
      unbind(el) {
        clearInterval(el.__vueSetInterval__);
      },
    },
  },
  computed: {
    flexWidth() {
      return `width: ${this.editFormData.width}%;padding: 15px`;
    },
  },
  watch: {
    chartData: {
      handler (newValue) {
        if (newValue) {
          this.chartData = newValue;
        this.initChart();
        }
      },
      deep: true,
    },
    publicData: {
      handler(newValue, oldValue) {
        this.echoParentsData([newValue], this.editFormData);
        this.initChart();
      },
    },
    // flexWidth() {
    //   if (this.myChart) {
    //     this.myChart.resize();
    //   }
    // },
  },
  created() {},
  methods: {
    resize() {  // 当宽高变化时就会执行
      if (this.myChart) {
        this.myChart.resize();
      }
    },
    // 初始化渲染charts
    initChart() {
      if (!this.myChart) {
        this.myChart = echarts.init(document.getElementById(this.eChartId));
      } else {
        this.myChart.dispose()
        this.myChart = echarts.init(document.getElementById(this.eChartId));
      }
      this.renderingData(this.chartData);
    },
    // 渲染charts
    renderingData(chartData) {
      let option = handlerChartsOptionConfig.drawPathChart(chartData);
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
      let chartData = JSON.parse(JSON.stringify(this.chartData))
      chartData = handlerChartsData.setPath(
        this.tableConfig,
        chartData,
        editFormData
      );
      this.chartData = {...chartData}
    },
  },
};
</script>