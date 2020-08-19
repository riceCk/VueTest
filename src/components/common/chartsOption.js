
/**
 * 配置折线图
 * @param color 折线图颜色
 * @param magicType 切换柱状图和折线图属性
 * magicType: { type: ["bar", "line"] }
 * @param legendLeft 提示标签位置可选
 * @param legendTop 提示标签位置可选
 * @param legendRight 提示标签位置可选
 * @param legendData 提示标签显示内容
 * @param fontSize 字体大小可选
 * @param xAxisData x轴类容
 * @param seriesData 整体y轴样式
 * @param yAxisGrid 是否去网格线
 */
export function drawLineChart ({
  color = ["#F49D1A", "#E23030"], 
  magicType,
  legendLeft = 0, 
  legendTop = 0,
  legendRight = 0,
  legendData = ["全部", "负面"],
  fontSize,
  xAxisData = ["06/07", "06/08", "06/09", "06/10", "06/11"],
  seriesData,
  yAxisGrid = true
}) {
  return {
    color,
    tooltip: {
      trigger: "axis"
    },
    toolbox: {
      feature: {
        saveAsImage: {
          title: "下载"
        },
        magicType,
        restore: {}
      }
    },
    legend: {
      show: true,
      left: legendLeft,
      top: legendTop,
      right: legendRight,
      icon: "circle",
      data: legendData
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            fontSize: fontSize || "16"
          }
        },
        data: xAxisData || []
      }
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: yAxisGrid
        },
        splitArea: { show: false }, //去除网格区域
        axisLabel: {
          textStyle: {
            fontSize: "18"
          }
        }
      }
    ],
    series: seriesData
  };
}
/**
 * 配置饼图图
 * @param name 标题可选
 * @param legendData 标签种类
 * @param seriesRadius 两个圆大小可选
 * ["50%", "70%"]
 * @param seriesData 具体数值
 */
export function drawPieChart ({
  name,
  legendData = ["直接访问", "邮件营销"],
  seriesRadius,
  seriesData 
}) {
  return {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      left: 10,
      data: legendData
    },
    series: [
      {
        name,
        type: "pie",
        radius: seriesRadius,
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center"
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "30",
            fontWeight: "bold"
          }
        },
        labelLine: {
          show: false
        },
        data: seriesData
      }
    ]
  };
}

/**
 * 柱状图
 * @param xAxisData 
 * @param seriesColor 柱状图颜色
 * @param seriesData 柱状图数据
 */
export function histogramChart ({
  xAxisData = ["微信", "百度搜索", "百度贴吧"],
  seriesColor = ['#F49D1A', '#F49D1A','#F49D1A'],
  seriesData = [{
    name: "微信",
    value: 21327
  },{
    name: "百度搜索",
    value: 32423
  },{
    name: "百度贴吧",
    value: 12153
  },]
}) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {
          title: '下载'
        }
      }
    },
    grid: {
      left: '2%',
      right: '2%',
      top: '5%',
      bottom: 30,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          interval: 0,
          textStyle: {
            fontSize: '18',
          },
          formatter (val) {
            if (!val) {
              return val;
            }
            return val.length > 8 ? val.substring(0, 8).split('').join('\n') + '\n...' : val.split('').join('\n');
          }
        }
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          textStyle: {
            fontSize: '18',
          },
        }
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: 20,
        data: seriesData || [],
        itemStyle: {
          normal: {
            color (params) {
              const colorList = seriesColor || ['#F49D1A'];
              return colorList[params.dataIndex];
            }
          }
        }
      }
    ]
  }
}