<template>
  <div class="chart-db-col-left">
    <div v-show="editType.father !== 'excel'" :id="eChartId" :style="chartStyle"></div>
    <report-table
      v-show="editType.father === 'excel' || editFormData.showTable"
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
      chartStyle: {
        type: String,
        default: "width: 100%;height:500px;",
      },
      eChartId: {
        type: String,
        default: 'eChartId'
      },
      optionConfig: {
        type: Object,
        default () {
          return {}
        }
      },
      editType: {
        type: Object,
        default: () => {
          return {}
        }
      },
      editFormData: {
        type: Object,
        default: () => {
          return {}
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
        myChart: ''
      }
    },
    computed: {},
    watch: {
      optionConfig: {
        handler (val, oldVal) {
          this.initChart(val)
        },
        deep: true // 对象内部的属性监听，也叫深度监听
      },
      tableColumnAndProp: {
        handler (val) {
          if (JSON.stringify(val) === '{}') return
          const {tableColumn, tablePropData} = val
          this.tableColumn = tableColumn
          let newTablePropData = JSON.parse(JSON.stringify(tablePropData))
          if (this.editType.father  === 'excel') {
            newTablePropData['header-cell-style'] = {
              background: "red",
              color: "#fff",
            }
          }
          if (this.editFormData.showTable) {
            newTablePropData['header-cell-style'] = {
              color: "#606266",
            }
          }
          this.tablePropData = newTablePropData
        },
        deep: true,
        immediate: true
      },
    },
    created () {
    },
    mounted () {},
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
        setTimeout(() => {
          const chartImgUrl = this.myChart.getDataURL()
          this.$emit('handleChartImage', chartImgUrl)
        }, 2000)
      },
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .chart-db-col-left {
    width: 100%;
    overflow: auto;
    padding: 30px 0;
    flex: 1;
    margin-right: 30px;
    border: 1px solid #EBEDF0;
    .el-button {
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }
</style>