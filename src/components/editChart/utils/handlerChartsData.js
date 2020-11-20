import echarts from "echarts";
import china from "echarts/map/json/china";

export class handlerChartsData {
  static colorType = {
    // 彩色
    multicolor: ['#2586DE', '#ED7D31', '#A5A5A5', '#FFC000', '#4472C4', '#70AD47', '#B835E3', '#5A9AD5'],
    // 单色
    monochrome: ['#FFAEB9', '#B11518', '#FFD9D7', '#F08277', '#DD6352', '#FE9E0B', '#FF5E56', '#F6C2AD'],
    // 冷色
    cool: ['#EAB103', '#FDEA04', '#CD7500', '#F5D788', '#AE4500', '#F6D56B', '#E6A75C', '#F8E4C6'],
    // 暖色
    warm: ['#4864F5', '#8899F5', '#B9C6FA', '#2ABDC9', '#007BFF', '#4FA2F3', '#2828F0', '#1DB3F4'],
  }

  /**
   * 处理折线图
   * @param {*} tableConfig
   * @param {*} chartData
   * @param {*} formData
   */
  static setLineParam (tableConfig, chartData, formData) {
    const {smooth, multiple = 1, chartTitle, hideGrid, markPointTop, markPointBottom, seriesAreaStyle, themeColor = 'multicolor'} = formData
    const {legendData, seriesData, xAxisData,} = this.handelLineOrHistogramConfig(tableConfig, multiple)
    chartData.legendData = legendData
    chartData.seriesData = seriesData
    chartData.xAxisData = xAxisData
    chartData.color = this.colorType[themeColor]
    chartData.hideGrid = hideGrid
    chartData.seriesSmooth = smooth
    chartData.chartTitle = chartTitle
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
   * 饼状图
   * @param {*} tableConfig
   * @param {*} chartData
   * @param {*} formData
   */
  static setAttribute (tableConfig, chartData, formData) {
    const {multiple, chartTitle, formatterNumber, formatterPercentage, themeColor = 'multicolor'} = formData
    const {seriesData, legendData} = this.handlePieConfig(tableConfig, multiple)
    chartData.seriesData = seriesData
    chartData.legendData = legendData
    chartData.chartTitle = chartTitle
    // 是否隐藏数值
    if (formatterPercentage || formatterNumber) {
      if (formatterPercentage) chartData.formatter = "{b} {d}%"
      if (formatterNumber) chartData.formatter = "{b} {d}%"
      if (formatterNumber && formatterPercentage) chartData.formatter = "{b} {c}条 \n {d}%"
    }
    chartData.seriesColor = this.colorType[themeColor]
    return chartData
  }

  /**
   * 处理饼图数据
   * @param tableConfig
   * @param multiple
   * @returns seriesData: [xxx, xxx]
   * @returns legendData: [{value: xxx, name: xxx}]
   */
  static handlePieConfig (tableConfig, multiple = 1) {
    const {tableColumn, tablePropData} = tableConfig
    let legendData = []
    let seriesData = []
    let propData = tablePropData[0]
    tableColumn.forEach(item => {
      if (item.label) {
        legendData.push(item.label)
        seriesData.push({
          value: propData[item.prop] * multiple || 0,
          name: item.label
        })
      }
    })
    return {seriesData, legendData}
  }

  /**
   * 柱状图
   * @param {*} tableConfig
   * @param {*} chartData
   * @param {*} formData
   */
  static setHistogram (tableConfig, chartData, formData) {
    const {multiple = 1, chartTitle, formatterNumber, hideGrid, themeColor = 'multicolor'} = formData
    const {xAxisData, seriesData, legendData} = this.handleHistogramConfig(tableConfig, multiple)
    chartData.xAxisData = xAxisData
    chartData.seriesData = seriesData
    chartData.legendData = legendData
    chartData.labelShow = formatterNumber
    chartData.seriesColor = this.colorType[themeColor]
    chartData.hideGrid = hideGrid
    chartData.chartTitle = chartTitle
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
   * 条形图
   * @param {*} tableConfig
   * @param {*} chartData
   * @param {*} formData
   */
  static setBarGraph (tableConfig, chartData, formData) {
    const {multiple, chartTitle, hideGrid, showData, themeColor = 'multicolor'} = formData
    const {yAxisData, seriesData} = this.handleBarConfig(tableConfig, multiple);
    chartData.yAxisData = yAxisData;
    chartData.seriesData = seriesData;
    chartData.hideGrid = hideGrid;
    chartData.showData = showData;
    chartData.axisColor = this.colorType[themeColor];
    chartData.chartTitle = chartTitle
    return chartData
  }

  /**
   * 处理单维条形图数据
   * @param tableConfig
   * @param multiple
   * @return yAxisData: [xxxxxx, xxxx]
   * @return seriesData: [22, 111]
   */
  static handleBarConfig (tableConfig, multiple = 1) {
    const {tableColumn, tablePropData} = tableConfig
    const propData = tablePropData[0];
    let yAxisData = []
    let seriesData = []
    tableColumn.forEach(item => {
      if (item.label && item.prop !== 'YData') {
        yAxisData.push(item.label);
        seriesData.push(propData[item.prop] * multiple || 0)
      }
    })
    return {yAxisData, seriesData}
  }

  /**
   * 关键词
   * @param {*} tableConfig
   * @param {*} chartData
   * @param {*} formData
   */
  static setKeyWord (tableConfig, chartData, formData) {
    const {multiple, chartTitle, themeColor = 'multicolor'} = formData
    chartData.seriesData = this.handleKeyWord(tableConfig, multiple)
    chartData.colorList = this.colorType[themeColor];
    chartData.chartTitle = chartTitle
    return chartData
  }
  static handleKeyWord (tableConfig, multiple = 1) {
    const {tableColumn, tablePropData} = tableConfig
    const propData = tablePropData[0]
    let seriesData = []
    tableColumn.forEach(item => {
      if (item.label && item.prop !== 'YData') {
        seriesData.push({
          key: item.label,
          name: item.label,
          value: propData[item.prop] * multiple || 0
        })
      }
    })
    return seriesData
  }

  /**
   * 地图
   * @param tableConfig
   * @param charData
   * @param formData
   */
  static setMap (tableConfig, chartData, formData) {
    echarts.registerMap('demo', china);
    const {multiple, chartTitle, themeColor = 'multicolor'} = formData
    const seriesData = this.handleKeyWord(tableConfig, multiple)
    chartData.seriesData = seriesData
    chartData.inRangeColor = ['#e0ffff', this.colorType[themeColor][0]]
    chartData.chartTitle = chartTitle
    return chartData
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