import echarts from "echarts";

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
   * 舆情热度趋势和舆情发展态势参数处理
   * @param {*} tableConfig 
   * @param {*} chartData 
   * @param {*} formData 
   */
  static setLineParam (tableConfig, chartData, formData) {
    const { updateTable, columnTable } = tableConfig
    const { multiple, hideGrid, themeColor = 'multicolor' } = formData
    for (let key in columnTable) {
      const axisData = []
      let xAxisFlag = true
      updateTable.forEach(item => {
        if (!isNaN(item[key])) {
          axisData.push((item[key] * multiple).toFixed(2))
        } else {
          axisData.push(item[key])
        }
      })
      chartData.seriesData.forEach(item => {
        if (columnTable[key] === item.name) {
          item.data = JSON.parse(JSON.stringify(axisData))
          xAxisFlag = false
        }
        if (item.name !== '负面' && item.itemStyle) {
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
                    color: this.colorType[themeColor][0],
                  },
                ]),
              },
            },
          }

        }
      })
      if (xAxisFlag) {
        chartData.xAxisData = axisData
      }
    }
    chartData.color = [this.colorType[themeColor][0], '#EB5974']
    chartData.hideGrid = hideGrid
    return chartData
  }

  /**
   * 舆情属性占比 饼状图
   * @param {*} tableConfig 
   * @param {*} chartData 
   * @param {*} formData 
   */
  static setAttribute (tableConfig, chartData, formData) {
    let { updateTable } = tableConfig
    const { multiple, themeColor = 'multicolor' } = formData
    updateTable = updateTable.map(item => {
      return {
        name: item.name,
        value: item.value * multiple
      }
    })
    chartData.seriesData = updateTable.sort((item1, item2) => item2.value - item1.value)
    // 判断模式
    if (formData.styleRadio === 'modeTwo') {
      chartData.seriesRadius = "70%"
    } else {
      chartData.seriesRadius = ["40%", "55%"]
    }
    // 是否隐藏数值
    if (formData.hideData) {
      chartData.formatter = "{b} {d}%"
    } else {
      chartData.formatter = "{b} {c}条 \n {d}%"
    }
    chartData.seriesColor = this.colorType[themeColor]
    return chartData
  }
  /**
   * 柱状图 舆情属性占比 
   * @param {*} tableConfig 
   * @param {*} chartData 
   * @param {*} formData 
   */
  static setHistogram (tableConfig, chartData, formData) {
    let { updateTable } = tableConfig
    const { multiple, hideGrid, themeColor = 'multicolor' } = formData
    let xAxisData = []
    updateTable = updateTable.map(item => {
      xAxisData.push(item.name)
      return {
        name: item.name,
        value: item.value * multiple
      }
    })
    chartData.seriesData = updateTable.sort((item1, item2) => item2.value - item1.value)
    chartData.xAxisData = xAxisData
    chartData.seriesColor = this.colorType[themeColor]
    chartData.hideGrid = hideGrid
    return chartData
  }
  /**
   * 条形图 舆情属性占比 
   * @param {*} tableConfig 
   * @param {*} chartData 
   * @param {*} formData 
   */
  static setBarGraph (tableConfig, chartData, formData) {
    let { updateTable } = tableConfig
    const { multiple, themeColor = 'multicolor' } = formData
    let yAxisData = []
    let seriesData = []
    updateTable = updateTable.sort((item1, item2) => item2.value - item1.value)
    updateTable.forEach(item => {
      yAxisData.push(item.name)
      seriesData.push(item.value * multiple)
    })
    chartData.yAxisData = yAxisData
    chartData.seriesData = seriesData
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
    const { updateTable } = tableConfig
    const { multiple, styleRadio, themeColor = 'multicolor' } = formData
    const maskImage = new Image();
    maskImage.src = 'data:image/png;base64,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'
    chartData.seriesData = updateTable.map(item => {
      return {
        key: item.key,
        name: item.key || item.name,
        value: item.value * multiple
      }
    })
    chartData.colorList = this.colorType[themeColor]
    if (styleRadio === 'modeOne') {
      chartData.sizeRange = [12, 50]
      chartData.maskImage = ''
    } else if (styleRadio === 'modeTwo') {
      // chartData.maskImage = maskImage
      // console.log(maskImage, 12312)
      chartData.sizeRange = [22, 50]
    } else if (styleRadio === 'modeThree') {
      chartData.sizeRange = [25, 50]
      chartData.maskImage = ''
    }
    return chartData
  }
  /**
   * 舆情传播路径  路径图
   */
  static setPath (tableConfig, chartData, editFormData) {
    const { updateTable } = tableConfig
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