<template>
  <div class="chart-db-col-left">
    <div v-show="type.father !== 'excel'" :id="eChartId" style="width:100%;height:500px;"></div>
    <report-table
            v-show="type.father === 'excel' || formData.showTable"
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
                handler (val) {
                    this.initChart(val)
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
            },
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
