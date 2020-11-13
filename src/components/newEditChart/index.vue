<template>
  <div class="chart-wrapper">
    <collapseLeft
      :optionConfig="optionConfig"
      :tableColumnAndProp="tableColumnAndProp">
    </collapseLeft>
    <collapseRight
      :tableColumnAndProp="tableColumnAndProp"
      @handleColumnAndData="handleColumnAndData"
      @handleOption="handleOption">
    </collapseRight>
  </div>
</template>

<script>
  import echarts from "echarts";
  import collapseRight from './comp/collapseRight'
  import collapseLeft from './comp/collapseLeft'
  import {tools} from './utils/tools'

  export default {
    name: 'newEditChart',
    components: {
      collapseRight,
      collapseLeft
    },
    props: {},
    data () {
      return {
        eChartId: 'eChartId',
        myChart: '',
        optionConfig: null,
        tableColumnAndProp: {
          tableColumn: [],
          tablePropData: {
            "header-cell-style": {
              background: "red",
              color: "#fff",
            },
            data: [
              {
                YData: '12312asdf',
                data2: 54,
                data1: 23,
                data3: 12,
              },
            ],
          },
          type: {
            label: '折线图',
            value: 'line-1',
            father: 'line',
          },
        },
      }
    },
    computed: {},
    watch: {},
    created () {
    },
    mounted () {
      setTimeout(() => {
        this.tableColumnAndProp.tableColumn = [
          {
            label: "上海",
            prop: "data1",
          },
          {
            label: "江苏",
            prop: "data2",
          },
          {
            label: "北京",
            prop: "data3",
          },
          {
            label: "sadf",
            prop: "YData",
          },
        ]
      })
    },
    methods: {
      // 数据回显
      handleOption (option) {
        this.optionConfig = option
      },
      // 孙级组件传表格参数
      handleColumnAndData (data) {
        const {tableCols, tableData} = data
        this.tableColumnAndProp.tableColumn = tableCols.map(item => {
          return {
            label: item.txt,
            prop: item.col
          }
        })
        let tableArrayData = []
        tableData.forEach(item => {
          tableArrayData.push(tools.unFlatten(item))
        })
        this.tableColumnAndProp.tablePropData.data = tableArrayData
      },
    }
  }
</script>
<style type="text/less" lang="less">
  @import "style/index";
</style>
