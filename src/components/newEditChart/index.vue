<template>
  <el-drawer
    class="chart-edit"
    :with-header="false"
    :visible="dialogVisible"
    size="85%"
    @close="onClose"
  >
    <section class="chart-wrapper">
      <collapseLeft
        ref="collapseLeft"
        :optionConfig="optionConfig"
        :tableColumnAndProp="tableColumnAndProp">
      </collapseLeft>
      <collapseRight
        :tableColumnAndProp="tableColumnAndProp"
        @handleColumnAndData="handleColumnAndData"
        @handleOption="handleOption">
      </collapseRight>
    </section>
    <section>
      <el-button type="success" @click="onSave">保存</el-button>
      <el-button type="primary" @click="onClose">取消</el-button>
    </section>
  </el-drawer>

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
        type: Boolean
      },
      tableColumnAndProp: {
        type: Object,
        default () {
          return {
            tableColumn: [],
            tablePropData: {},
            type: {},
            formData: {},
          }
        }
      }
    },
    data () {
      return {
        eChartId: 'eChartId',
        myChart: '',
        /**option, type, formData**/
        optionConfig: null,
      }
    },
    computed: {},
    watch: {},
    created () {
    },
    mounted () {
    },
    methods: {
      // 数据回显
      /**
       * {option, type, formData}
       * @param optionConfig
       */
      handleOption (optionConfig) {
        this.optionConfig = optionConfig
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
      onSave () {
        this.$emit('handleEditChart', {
          tableColumnAndProp: this.tableColumnAndProp,
          optionConfig: this.optionConfig,
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
