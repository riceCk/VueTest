<template>
  <div class="chart-db-col-left">
    <div :id="eChartId" style="width:100%;height:454px;"></div>
    <report-table
      style="width:80%"
      :dragId="`${eChartId}-table`"
      :columns="tableColumn"
      :props="tablePropData"
    ></report-table>
  </div>
</template>

<script>
  import echarts from "echarts";
  import reportTable from './reportTable'
  export default {
    name: 'collapseLeft',
    components: {
      reportTable,
    },
    props: {
      eChartId: {
        type: String,
        default: 'eChartId'
      },
      optionConfig: {},
      tableColumnAndProp: {
        type: Object,
      },
    },
    data() {
      return {
        tableColumn: [],
        tablePropData: {
          "header-cell-style": {
            background: "red",
            color: "#fff",
          },
          data: [],
        },
      }
    },
    computed: {},
    watch: {
      optionConfig: {
        handler (val) {
          this.initChart()
        },
        deep: true // 对象内部的属性监听，也叫深度监听
      },
      tableColumnAndProp: {
        handler (val) {
          const {tableColumn, tablePropData} = val
          this.tableColumn = tableColumn
          this.tablePropData = tablePropData
        },
        deep: true
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      // 初始化渲染
      initChart () {
        if (!this.myChart) {
          this.myChart = echarts.init(document.getElementById(this.eChartId));
        }
        if (this.optionConfig) {
          this.renderingDta(this.optionConfig)
        }
        window.onresize = () => {
          this.myChart.resize()
        }
      },
      // eCharts 图重置
      renderingDta (option) {
        this.myChart.clear();
        this.myChart.setOption(option);
      },
    }
  }
</script>