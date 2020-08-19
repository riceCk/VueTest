export class CharlesData {
  static handlerLine (updateTable, tableColumn, chartData, multiple = 1) {
    for (let key in tableColumn) {
      const axisData = []
      let xAxisFlag = true
      updateTable.forEach(item => {
        if (!isNaN(item[key])) {
          axisData.push(item[key] * multiple)
        } else {
          axisData.push(item[key])
        }
      })
      chartData.seriesData.forEach(item => {
        if (tableColumn[key] === item.name) {
          item.data = JSON.parse(JSON.stringify(axisData))
          xAxisFlag = false
        }
      })
      if (xAxisFlag) {
        chartData.xAxisData = axisData
      }
    }
    console.log(chartData)
    return chartData
  }
}