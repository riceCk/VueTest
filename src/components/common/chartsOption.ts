import {lineOption, pieOption} from './chartsInterface'

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
 * 
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
  seriesData
}: lineOption) {
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
        splitLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            fontSize: fontSize || "16"
          }
        },
        splitArea: { show: false }, //去除网格区域
        data: xAxisData || []
      }
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: false
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
}: pieOption) {
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