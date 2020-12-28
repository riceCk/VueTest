<template>
  <!--<el-drawer-->
    <!--class="chart-edit"-->
    <!--:with-header="false"-->
    <!--:visible="dialogVisible"-->
    <!--size="85%"-->
    <!--@close="onClose"-->
  <!--&gt;-->
    <section class="chart-edit">
      <section class="chart-wrapper">
        <collapseLeft
          ref="collapseLeft"
          :optionConfig="optionConfig"
          :type="tableColumnAndProp.type"
          :formData="tableColumnAndProp.formData"
          :tableColumnAndProp="tableColumnAndProp">
        </collapseLeft>
        <collapseRight
          :tableColumnAndProp="tableColumnAndProp"
          @handleColumnAndData="handleColumnAndData"
          @handleCollapseRightConfig="handleCollapseRightConfig">
        </collapseRight>
      </section>
      <section>
        <el-button type="success" @click="onSave">保存</el-button>
        <el-button type="primary" @click="onClose">取消</el-button>
      </section>
    </section>

  <!--</el-drawer>-->

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
          return []
        }
      },
      tablePropData: {
        type: Object,
        default: () => {
          return {}
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
    },
    data () {
      return {
        eChartId: 'eChartId',
        myChart: '',
        tableColumnAndProp: {},
        optionConfig: null,
      }
    },
    computed: {},
    watch: {},
    created () {
      this.initData()
    },
    mounted () {
    },
    methods: {
      initData () {
        const tableColumnAndProp = {}
        tableColumnAndProp.tableColumn = this.tableColumn
        tableColumnAndProp.tablePropData = this.tablePropData
        tableColumnAndProp.type = this.type
        tableColumnAndProp.formData = this.formData
        this.tableColumnAndProp = JSON.parse(JSON.stringify(tableColumnAndProp))
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
        this.tableColumnAndProp.type = type
        this.tableColumnAndProp.formData = formData
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
        this.$emit('handleEditChart', {
          optionConfig: this.optionConfig,
          ...this.tableColumnAndProp,
          image: this.$refs.collapseLeft.myChart.getDataURL({})
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
