<template>
  <section class="chart-edit">
    <section class="chart-wrapper">
      <collapseLeft
        ref="collapseLeft"
        :chartStyle="chartStyle"
        :optionConfig="optionConfig"
        :editType="editType"
        :editFormData="editFormData"
        :tableColumnAndProp="tableColumnAndProp">
      </collapseLeft>
      <collapseRight
        :tableColumnAndProp="tableColumnAndProp"
        :editType="editType"
        :editFormData="editFormData"
        @handleColumnAndData="handleColumnAndData"
        @handleCollapseRightConfig="handleCollapseRightConfig">
      </collapseRight>
    </section>
    <section style="text-align: center">
      <el-button type="success" @click="onSave">保存</el-button>
      <el-button type="primary" @click="onClose">取消</el-button>
    </section>
  </section>
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
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      tableColumn: {
        type: Array,
        default: () => {
          return [{
            label: "",
            prop: "YData",
          }, {
            label: "A",
            prop: "data1",
          }, {
            label: "B",
            prop: "data2",
          },]
        }
      },
      tablePropData: {
        type: Object,
        default: () => {
          return {
            "header-cell-style": {
              background: "red",
              color: "#fff",
            },
            data: [{
              YData: '类型',
              data2: 54,
              data1: 23,
            }],
          }
        }
      },
      type: {
        type: Object,
        default: () => {
          return {}
        }
      },
      formData: {
        type: Object,
        default: () => {
          return {}
        }
      },
      authorityMenu: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data () {
      return {
        eChartId: 'eChartId',
        myChart: '',
        tableColumnAndProp: {},
        optionConfig: null,
        editType: {},
        editFormData: {},
        chartStyle: 'width: 100%;height:500px;'
      }
    },
    computed: {},
    watch: {
      dialogVisible (val) {
        if (val) {
          this.initData()
          this.$nextTick(() => {
            this.setMychart()
          })
        }
      }
    },
    created () {
    },
    mounted () {
      this.initData()
    },
    methods: {
      setMychart () {
        //获取父元素
        let echarts = this.$refs.collapseLeft.$el
        //获取父元素宽高
        if (echarts) {
          let echartsWidth = this.getStyle(echarts, 'width');
          this.chartStyle = `width: ${echartsWidth};height:500px;`
        }

      },
      getStyle (obj, attr) {
        if (obj.currentStyle) {
          return obj.currentStyle[attr];
        } else {
          return document.defaultView.getComputedStyle(obj, null)[attr];
        }
      },
      initData () {
        const tableColumnAndProp = {}
        tableColumnAndProp.tableColumn = this.tableColumn
        tableColumnAndProp.tablePropData = this.tablePropData
        tableColumnAndProp.authorityMenu = this.authorityMenu
        this.tableColumnAndProp = JSON.parse(JSON.stringify(tableColumnAndProp))
        this.editType = this.type
        this.editFormData = this.formData
      },
      // 数据回显
      /**
       * {option, type, formData}
       * @param optionConfig
       */
      /**
       * 优化tableColumnAndProp赋值
       */
      handleCollapseRightConfig (optionConfig) {
        const {option, type, formData} = optionConfig
        this.editType = type
        this.editFormData = formData
        this.optionConfig = option
      },
      // 孙级组件传表格参数
      /**
       * 优化tableColumnAndProp赋值
       * @param data
       */
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
      onSave () {
        const tableColumnAndProp = {
          ...this.tableColumnAndProp,
          type: this.editType,
          formData: this.editFormData,
          image: this.$refs.collapseLeft.myChart && this.$refs.collapseLeft.myChart.getDataURL({})
        }
        this.$emit('handleEditChart', {
          optionConfig: this.optionConfig,
          tableColumnAndProp: tableColumnAndProp,
        })
        this.onClose()
      },
      onClose () {
        this.$emit('update:dialogVisible', false)
      }
    }
  }
</script>
<style type="text/less" lang="less">
  @import "style/index";
</style>
