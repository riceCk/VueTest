import echarts from "echarts";
import china from "echarts/map/json/china";

export class handlerChartsData {
  static colorType = {
    // 单色
    monochrome: ['#436299', '#5874A5', '#6C85B0', '#8196BB', '#96A7C6', '#ABB9D1', '#BFCADC', '#D4DBE8', '#E9ECF3', '#2F528F'],
    // 彩色
    multicolor: ['#82DEF1', '#E2A172', '#A7D28A', '#F5D86A', '#6B92D7', '#57B6ED', '#4CCA9B', '#5B949A', '#6AC6FB', '#E5A5D6'],
    // 冷色
    cool: ['#24448E', '#2D5E9E', '#3577AE', '#3D91BE', '#46AАСЕ', '#44AАСЕ', '#89CCCE', '#B3DDCC', '#DCECC9', '#1C2B7F'],
    // 暖色
    warm: ['#C74E29', '#E77033', '#EB893E', '#D97F3A', '#F0A04B', '#F5B857', '#F9D063', '#FDE86E', '#F5EDB9', '#9D4429'],
  }

  /**
   * 处理折线图
   * @param {*} tableConfig
   * @param {*} chartData
   * @param {*} formData
   */
  static setLineParam (tableConfig, chartData, formData) {
    const {smooth, multiple = 1, hideGrid, markPointTop, markPointBottom, seriesAreaStyle, themeColor = 'multicolor'} = formData
    const {legendData, seriesData, xAxisData,} = this.handelLineOrHistogramConfig(tableConfig, multiple)
    chartData.legendData = legendData
    chartData.seriesData = seriesData
    chartData.xAxisData = xAxisData
    chartData.color = this.colorType[themeColor]
    chartData.hideGrid = hideGrid
    chartData.seriesSmooth = smooth
    if (markPointTop || markPointBottom) {
      let data = []
      if (markPointTop) data.push({name: "最大值", type: "max"})
      if (markPointBottom) data.push({name: "最小值", type: "min"})
      chartData.seriesMarkPoint = {data}
    }
    if (seriesAreaStyle !== null) {
      chartData.seriesData.forEach((item, index) => {
        item.itemStyle = {
          normal: {
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  // 1代表上面
                  offset: 1,
                  color: "#F6FDFF",
                },
                {
                  offset: 0,
                  color: this.colorType[themeColor][index],
                },
              ]),
            },
          },
        }
      })
    }
    chartData.seriesData.forEach(item => {
      item.type = 'line'
    })
    return chartData
  }

  /**
   * 处理数据
   * @param tableConfig
   * @param chartData
   * @param multiple
   */
  static handelLineOrHistogramConfig (tableConfig, multiple) {
    const {tableColumn, tablePropData} = tableConfig
    let legendData = []
    let seriesData = []
    let xAxisData = []
    let propData = []
    let newTableColumn = tableColumn.filter(item => item.prop !== 'YData')
    newTableColumn.forEach(item => {
      xAxisData.push(item.label);
      propData.push(item.prop);
    })
    tablePropData.forEach(item => {
      legendData.push(item.YData)
      let data = []
      propData.forEach(it => {
        if (it !== 'YData') {
          if (isNaN(Number(item[it] * multiple))) {
            data.push(0)
          } else {
            data.push(item[it] * multiple)
          }
        }
      })
      seriesData.push({
        name: item.YData,
        data
      })
    })
    return {
      legendData,
      seriesData,
      xAxisData,
    }
  }

  /**
   * 舆情属性占比 饼状图
   * @param {*} tableConfig
   * @param {*} chartData
   * @param {*} formData
   */
  static setAttribute (tableConfig, chartData, formData) {
    const {tableColumn, tablePropData} = tableConfig
    const {multiple, formatterNumber, formatterPercentage, themeColor = 'multicolor'} = formData
    // 是否隐藏数值
    if (formatterPercentage || formatterNumber) {
      if (formatterPercentage) chartData.formatter = "{b} {d}%"
      if (formatterNumber) chartData.formatter = "{b} {d}%"
      if (formatterNumber && formatterPercentage) chartData.formatter = "{b} {c}条 \n {d}%"
    }
    console.log(tableColumn, tablePropData, 11111111111)
    chartData.seriesColor = this.colorType[themeColor]
    return chartData
  }

  /**
   * 柱状图
   * @param {*} tableConfig
   * @param {*} chartData
   * @param {*} formData
   */
  static setHistogram (tableConfig, chartData, formData) {
    const {multiple = 1, formatterNumber, hideGrid, themeColor = 'multicolor'} = formData
    const {xAxisData, seriesData, legendData} = this.handleHistogramConfig(tableConfig, multiple)
    chartData.xAxisData = xAxisData
    chartData.seriesData = seriesData
    chartData.legendData = legendData
    chartData.labelShow = formatterNumber
    chartData.seriesColor = this.colorType[themeColor]
    chartData.hideGrid = hideGrid
    return chartData
  }
  static handleHistogramConfig (tableConfig, multiple) {
    const {tableColumn, tablePropData} = JSON.parse(JSON.stringify(tableConfig))
    let xAxisData = []
    let seriesData = []
    let legendData = []
    let propData = []
    let newTableColumn = tableColumn.filter(item => item.prop !== 'YData')
    newTableColumn.forEach(item => {
      xAxisData.push(item.label);
      propData.push(item.prop);
    })
    tablePropData.forEach(item => {
      legendData.push(item.YData)
      delete item.YData
      let array = []
      propData.forEach(it => {
        if (it !== 'YData') {
          if (isNaN(Number(item[it] * multiple))) {
            array.push(0)
          } else {
            array.push(item[it] * multiple)
          }
        }
      })
      seriesData.push(array)
    })
    return {
      xAxisData,
      seriesData,
      legendData
    }
  }

  /**
   * 条形图 舆情属性占比
   * @param {*} tableConfig
   * @param {*} chartData
   * @param {*} formData
   */
  static setBarGraph (tableConfig, chartData, formData) {
    let {updateTable} = tableConfig
    const {multiple, hideGrid, showData, themeColor = 'multicolor'} = formData
    // let yAxisData = []
    // let seriesData = []
    // updateTable = updateTable.sort((item1, item2) => item2.value - item1.value)
    // updateTable.forEach(item => {
    //   yAxisData.push(item.name)
    //   seriesData.push(item.value * multiple)
    // })
    // chartData.yAxisData = yAxisData
    // chartData.seriesData = seriesData
    chartData.hideGrid = hideGrid
    chartData.showData = showData
    chartData.axisColor = this.colorType[themeColor]
    return chartData
  }

  /**
   * 关键词
   * @param {*} tableConfig
   * @param {*} chartData
   * @param {*} formData
   */
  static setKeyWord (tableConfig, chartData, formData) {
    const {updateTable} = tableConfig
    const {multiple, styleRadio, themeColor = 'multicolor'} = formData
    // chartData.seriesData = updateTable.map(item => {
    //   return {
    //     key: item.key,
    //     name: item.key || item.name,
    //     value: item.value * multiple
    //   }
    // })
    chartData.colorList = this.colorType[themeColor];
    return chartData
  }

  /**
   * 地图
   * @param tableConfig
   * @param charData
   * @param formData
   */
  static setMap (tableConfig, charData, formData) {
    const {themeColor = 'multicolor'} = formData
    echarts.registerMap('demo', china);
    charData.inRangeColor = ['#e0ffff', this.colorType[themeColor][0]]
    return charData
  }

  /**
   * 舆情传播路径  路径图
   */
  static setPath (tableConfig, chartData, editFormData) {
    const {updateTable} = tableConfig
    for (let i = 0; i < updateTable.length; i++) {
      updateTable[i].disabled = true;
      updateTable[i].id = i;
      if (
        updateTable[i].hasOwnProperty("children") &&
        updateTable[i].children.length
      ) {
        for (let j = 0; j < updateTable[i].children.length; j++) {
          updateTable[i].children[j].disabled = true;
          updateTable[i].children[j].id = i + "-" + j;
          if (
            updateTable[i].children[j].hasOwnProperty("children") &&
            updateTable[i].children[j].children.length
          ) {
            for (
              let k = 0;
              k < updateTable[i].children[j].children.length;
              k++
            ) {
              updateTable[i].children[j].children[k].disabled = true;
              updateTable[i].children[j].children[k].id =
                i + "-" + j + "-" + k;
              updateTable[i].children[j].children[k].children = [];
            }
          } else {
            updateTable[i].children[j].children = [];
          }
        }
      } else {
        updateTable[i].children = [];
      }
    }
    chartData.seriesData = updateTable[0]
    chartData.wordCount = editFormData.wordCount
    return chartData
  }
}