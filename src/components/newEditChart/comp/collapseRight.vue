<template>
  <div class="chart-db-col-right">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="数据编辑" name="1">
        <excel-table :tableColumnAndProp="tableColumnAndProp" v-on="$listeners"></excel-table>
      </el-collapse-item>
      <el-collapse-item title="修改属性" name="2">
        <el-tabs v-model="activeAttributes" type="card">
          <el-tab-pane label="图表选择" name="first">
            <div class="chart-selection">
              <ul class="navMenu">
                <li
                  v-for="(item, index) in navMenuList"
                  :key="index"
                  @click="handleTypeCharts(item)"
                  :class="{active: item.value === activeNav}">
                  {{item.label}}
                </li>
              </ul>
              <ul class="chart-content">
                <li class="menu-item"
                    @click="handleChart(item)"
                    v-for="(item, index) in activeChildren"
                    :key="index">
                  <img :src="item.imgUrl" alt="">
                  {{item.label}}
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="属性设置" name="second">
            <el-form ref="styleData" :model="formData" label-width="100px" class="formClass">
              <el-form-item
                v-for="(item, index) in formOptions"
                :key="newKeys[index]"
                :prop="item.prop"
                :label="item.label ? (item.label) : ''"
                :rules="item.rules"
              >
                <formItem
                  v-model="formData[item.prop]"
                  :itemOptions="item"/>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="主题颜色" name="third">
            <ul class="themeColor">
              <p>默认主题颜色</p>
              <li @click="handleChartColor('multicolor')">
                <span v-for="item in colorType.monochrome" class="boxColor" :style="{backgroundColor: item}"></span>
              </li>
              <p>系统主题颜色</p>
              <li v-if="key !== 'multicolor'" v-for="(item, key) in colorType" @click="handleChartColor(key)">
                <span class="boxColor" :style="{backgroundColor: it}" v-for="it in item"></span>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import wordcloud from "echarts-wordcloud";
  import navMenuList from '../utils/navMenuList';
  import {handlerChartsOptionConfig} from '../utils/chartsOptionConfig';
  import {handlerChartsData} from '../utils/handlerChartsData';
  import excelTable from './excelTable'
  import formItem from "./formItem";
  import {tools} from "../utils/tools";

  export default {
    name: 'collapseRight',
    components: {
      formItem,
      excelTable,
    },
    props: {
      // YData 是第一列，用于多维
      tableColumnAndProp: {
        type: Object,
      },
    },
    data () {
      return {
        activeName: '2',
        activeAttributes: 'first',
        activeNav: 'all',
        chartType: null,
        navMenuList: navMenuList,
        colorType: handlerChartsData.colorType,
        /**折线图数据**/
        lineConfig: {
          color: ["#3699D2", "#EB5974"],
          legendLeft: 20,
          legendTop: 0,
          legendRight: 0,
          legendData: [],
          fontSize: 16,
          xAxisData: [],
          seriesSmooth: true,
          seriesMarkPoint: {},
          seriesData: [],
          hideGrid: true,
        },
        /**柱状图**/
        histogramConfig: {
          hideGrid: '',
          xAxisData: ["微信", "百度搜索", "百度贴吧"],
          seriesColor: [],
          legendData: [],
          seriesData: [],
        },
        /**条形图**/
        barGraphConfig: {
          barWidth: 10,
          axisColor: [],
          yAxisData: [],
          seriesData: []
        },
        /**关键词云**/
        keywordConfig: {
          colorList: ['#82DEF1', '#E2A172', '#A7D28A', '#F5D86A', '#6B92D7', '#57B6ED', '#4CCA9B'],
          seriesData: [{
            key: "应急管理组织指标",
            name: "应急管理组织指标",
            value: 22
          }],
          sizeRange: [22, 50],
        },
        /**饼图**/
        pieConfig: {
          titleTop: 20,
          titleColor: "red",
          titleFontSize: "16",
          titleLeft: "right",
          legendRight: "0",
          legendBottom: "50",
          legendShow: true,
          legendData: [],
          center: ["45%", "50%"],
          seriesColor: ["#EFB358", "#F49D1A"],
          seriesRadius: ["45%", "65%"],
          formatter: '',
          labelFontSizeColor: '#333333',
          seriesData: [],
        },
        optionConfig: null,
        // 配置调条件框配置
        formOptions: null,
        /**
         * 平滑曲线：smooth
         * 显示网格: hideGrid
         * 图表名称：chartTitle
         * 显示峰值: markPointTop
         * 显示谷值: markPointBottom
         * 显示数量：formatterPercentage
         * 显示数据表: showTable
         * 平滑数值:smoothedData
         * 显示数值:showData
         */
        formData: {
          multiple: 1
        }, // 修改属性表单
        tableConfig: {
          tableColumn: [],
          tablePropData: [],
          type: {}
        }, // 表格数据
      }
    },
    computed: {
      activeChildren () {
        let children = []
        this.navMenuList.forEach(item => {
          if (item.children && (this.activeNav === 'all' || item.value === this.activeNav)) {
            children.push(...item.children)
          }
          if (item.value === this.activeNav) {
            this.formOptions = item.formOptions
          }
        })
        return children
      },
      newKeys () {
        return this.formOptions.map((v) => {
          return tools.createUniqueString();
        });
      },
    },
    watch: {
      optionConfig: {
        handler (val) {
          this.$emit('handleOption', {
            option: val,
            type: this.chartType,
            formData: this.formData
          })
        },
        deep: true // 对象内部的属性监听，也叫深度监听
      },
      formData: {
        handler (newVal, oldVal) {
          if (this.chartType) {
            this.handleChart(this.chartType)
          }
        },
        deep: true // 对象内部的属性监听，也叫深度监听
      },
      // 监听父级传过来的数据
      tableColumnAndProp: {
        handler (val) {
          const {tableColumn, tablePropData, type} = val
          this.tableConfig.tableColumn = tableColumn
          this.tableConfig.tablePropData = tablePropData && tablePropData.data
          this.handleChart(this.chartType || type)
        },
        deep: true // 对象内部的属性监听，也叫深度监听
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      // 获取echarts类型
      handleTypeCharts (item) {
        this.activeNav = item.value
        this.formData = {}
        this.chartType = ''
      },
      // 具体charts类型
      handleChart (item) {
        this.formOptions = this.navMenuList.filter(it => it.value === item.father)[0].formOptions || {}
        switch (item.value.split('-')[0]) {
          case 'excel':
            this.optionConfig = null
            break;
          case 'line':
            this.handleLineConfig(item)
            break;
          case 'histogram':
            this.handleHistogramConfig(item)
            break;
          case 'barGraph':
            this.handleBarGraphConfig(item)
            break;
          case 'pie':
            this.handlePieChart(item)
            break;
          case 'lineArea':
            this.handleLineConfig(item)
            break;
          case 'map':
            this.handleMapConfig(item)
            break;
          case 'keyword':
            this.handleKeywordChart(item)
            break;
        }
        this.chartType = item
      },
      // 处理折线图
      handleLineConfig (type) {
        let lineConfig = JSON.parse(JSON.stringify(this.lineConfig))
        let formData = JSON.parse(JSON.stringify(this.formData))
        // 1.折线图
        if (type.value === 'line-1') {
          formData.seriesAreaStyle = null
        }
        // 2.面积图
        if (type.value === 'lineArea-1') {
          formData.seriesAreaStyle = {}
        }
        lineConfig = handlerChartsData.setLineParam(this.tableConfig, lineConfig, formData)
        this.optionConfig = handlerChartsOptionConfig.drawLineChart(lineConfig)
      },
      // 处理饼图
      handlePieChart (type) {
        let pieConfig = JSON.parse(JSON.stringify(this.pieConfig))
        // 1.传统饼图
        if (type.value === 'pie-1') {
          pieConfig.seriesRadius = "70%"
        }
        if (type.value === 'pie-2') {
          pieConfig.seriesRadius = ["40%", "55%"]
        }
        if (type.value === 'pie-3') {
          pieConfig.roseType = 'radius'
          pieConfig.seriesRadius = "70%"
        }
        pieConfig = handlerChartsData.setAttribute(this.tableConfig, pieConfig, this.formData);
        this.optionConfig = handlerChartsOptionConfig.drawPieChart(pieConfig)
      },
      // 处理柱状图
      handleHistogramConfig (type) {
        let histogramConfig = JSON.parse(JSON.stringify(this.histogramConfig));
        if (type.value === 'histogram-1') {
          histogramConfig = handlerChartsData.setHistogram(this.tableConfig, histogramConfig, this.formData);
          this.optionConfig = handlerChartsOptionConfig.drawHistogramChart(histogramConfig)
        }
        if (type.value === 'histogram-2') {
        }
      },
      // 处理条形图
      handleBarGraphConfig (type) {
        let barGraphConfig = JSON.parse(JSON.stringify(this.barGraphConfig));
        barGraphConfig = handlerChartsData.setBarGraph(this.tableConfig, barGraphConfig, this.formData);
        this.optionConfig = handlerChartsOptionConfig.drawBarGraphChart(barGraphConfig)
      },
      // 处理关键词云
      handleKeywordChart (type) {
        let keywordConfig = JSON.parse(JSON.stringify(this.keywordConfig));
        keywordConfig = handlerChartsData.setKeyWord(this.tableConfig, keywordConfig, this.formData);
        this.optionConfig = handlerChartsOptionConfig.drawKeywordChart(keywordConfig)
      },
      // 处理地图
      handleMapConfig (item) {
        let mapConfig = {
          seriesData: []
        }
        mapConfig = handlerChartsData.setMap(this.tableConfig, mapConfig, this.formData)
        this.optionConfig = handlerChartsOptionConfig.drawMapChart(mapConfig)
      },
      // 处理主题颜色
      handleChartColor (item) {
        this.$set(this.formData, 'themeColor', item)
      },
    }
  }
</script>

<style type="text/less" lang="less">


</style>