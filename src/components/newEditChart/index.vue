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
                data2: 54,
                data1: 23,
                data3: 12,
              },
              {
                data2: 12,
                data1: 45,
                data3: 55,
              },
            ],
          },
          type: {
            label: '传统饼图',
            value: 'pie-1',
            father: 'pie',
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
            label: "微信",
            prop: "data1",
          },
          {
            label: "百度搜索",
            prop: "data2",
          },
          {
            label: "百度贴吧",
            prop: "data3",
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
          tableArrayData.push(this.filterData(item))
        })
        this.tableColumnAndProp.tablePropData.data = tableArrayData
      },
      filterData(data) {
        let newData = {};
        for(let key in data) {
          if(key.indexOf('.') != -1) {
            let arr = key.split('.');
            let obj = {};
            for(let i=0; i<arr.length-1; i++) {
              obj[arr[i]] = {};
            }
            obj[arr[arr.length - 1]] = data[key].content;
            let newObj = {};
            for(let i = arr.length - 1; i > 0; i--) {
              obj[arr[i-1]][arr[i]] = obj[arr[i]];
            }
            if (newData[arr[0]]) {
              Object.assign(newData[arr[0]], obj[arr[0]])
            } else {
              newData[arr[0]] = obj[arr[0]];
            }
          } else {
            newData[key] = data[key].content;
          }
        }
        return newData;
      }
    }
  }
</script>
<style type="text/less" lang="less">
  @import "style/index";
</style>
