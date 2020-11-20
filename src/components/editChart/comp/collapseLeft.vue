<template>
  <div class="chart-db-col-left">
    <div v-show="activeChart.father !== 'excel'" :id="eChartId" style="width:100%;height:500px;"></div>
    <report-table
      v-show="activeChart.father === 'excel' || formData.showTable"
      style="width:80%;margin: 0 auto;"
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
      optionConfig: {
        type: Object,
        default () {
          return {
            option: null,
            type: '',
            formData: ''
          }
        }
      },
      tableColumnAndProp: {
        type: Object,
      },
    },
    data () {
      return {
        tableColumn: [],
        tablePropData: {
          "header-cell-style": {
            background: "red",
            color: "#fff",
          },
          data: [],
        },
        formData: {},
        activeChart: {},
        myChart: ''
      }
    },
    computed: {},
    watch: {
      optionConfig: {
        handler (val) {
          const {option, type, formData} = val;
          this.formData = formData
          this.activeChart = type
          this.initChart(option)
        },
        deep: true // 对象内部的属性监听，也叫深度监听
      },
      tableColumnAndProp: {
        handler (val) {
          const {tableColumn, tablePropData} = val
          this.tableColumn = tableColumn
          this.tablePropData = tablePropData
        },
        deep: true,
        immediate: true
      }
    },
    created () {

    },
    mounted () {

    },
    methods: {
      // 初始化渲染
      initChart (option) {
        if (!this.myChart) {
          this.myChart = echarts.init(document.getElementById(this.eChartId));
        }
        if (option) {
          this.renderingDta(option)
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