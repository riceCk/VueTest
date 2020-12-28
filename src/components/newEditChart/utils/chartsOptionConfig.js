export class handlerChartsOptionConfig {
  /**
   * 配置折线图
   * @param color 折线图颜色
   * @param magicType 切换柱状图和折线图属性
   * @param legendLeft 提示标签位置可选
   * @param legendTop 提示标签位置可选
   * @param legendRight 提示标签位置可选
   * @param legendData 提示标签显示内容
   * @param fontSize 字体大小可选
   * @param xAxisData x轴类容
   * @param seriesData 整体y轴样式
   * @param seriesData 整体y轴是否平滑
   * @param seriesData 整体y轴显示峰值
   * @param hideGrid 是否去网格线
   * @param selected {Object} 默认不展示
   */
  static drawLineChart (
    {
      color = ["#3699D2", "#EB5974"],
      legendLeft = 20,
      legendRight = 0,
      legendData = ["全部", "负面"],
      fontSize,
      xAxisData = ["06/07", "06/08", "06/09", "06/10", "06/11"],
      seriesData,
      seriesSmooth = false,
      seriesMarkPoint = {},
      selected,
      hideGrid = false,
      chartTitle,
    }) {
    seriesData.forEach(item => {
      item.smooth = seriesSmooth
      item.markPoint = seriesMarkPoint
    })
    return {
      color,
      tooltip: {
        trigger: "axis"
      },
      title: {
        left: 'center',
        text: chartTitle,
      },
      grid: {
        left: '5%',
        right: '5%',
        top: 120,
        bottom: 30,
        containLabel: true
      },
      legend: {
        show: true,
        left: legendLeft,
        top: 30,
        right: legendRight,
        icon: "circle",
        data: legendData,
        selected: selected
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          nameTextStyle: {
            fontSize: 14,
          },
          axisLine: {
            lineStyle: {
              color: "#9298A2",
            },
          },
          data: xAxisData || []
        }
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            show: hideGrid
          },
          splitArea: {show: false}, //去除网格区域
          nameTextStyle: {
            fontSize: 14,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#9298A2",
            },
          },
          axisLabel: {
            formatter: function (v) {
              return v > 0 ? v : -v;
            },
          },
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
   * @param formatter 是否隐藏数值
   * @param seriesData 具体数值
   * @param roseType 玫瑰
   */
  static drawPieChart (
    {
      titleTop = 20,
      titleFontSize = "16",
      legendRight = "5%",
      legendTop = "40",
      legendShow = true,
      legendData = ["直接访问", "邮件营销"],
      center = ["45%", "50%"],
      seriesColor = ["#EFB358", "#F49D1A"],
      seriesRadius = ["45%", "65%"],
      formatter = '{b} {c}条 \n {d}%',
      labelFontSizeColor = '#999',
      roseType = '',
      chartTitle,
      seriesData = [
        {value: 335, name: "直接访问"},
        {value: 310, name: "邮件营销"}
      ],
    }) {
    return {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)"
      },
      grid: {
        left: "5%",
        right: "5%",
      },
      title: {
        top: titleTop || 30,
        text: chartTitle,
        left: 'center',
      },
      legend: {
        show: legendShow,
        orient: "vertical",
        icon: "circle",
        top: legendTop || 20,
        right: legendRight || '5%',
        data: legendData || ["直接访问", "邮件营销"],
      },
      series: [
        {
          animation: false,
          type: "pie",
          center: center || ["45%", "50%"],
          radius: seriesRadius,
          color: seriesColor || ["#000", "#000"],
          label: {
            normal: {
              trigger: "item",
              show: !!formatter,
              formatter: formatter,
              padding: [10, 0],
              fontSize: 16,
            }
          },
          labelLine: {
            normal: {
              length: 10,
              length2: 10,
              lineStyle: {
                fontWeight: 'bolder'
              }
            }
          },
          data: seriesData,
          roseType: roseType
        },
      ]
    };
  }

  /**
   * 柱状图
   * @param xAxisData
   * @param seriesColor 柱状图颜色
   * @param seriesData 柱状图数据
   * @param hideGrid 是否去网格
   * @param labelShow 是否显示数据
   */
  static drawHistogramChart (
    {
      hideGrid = false,
      labelShow = false,
      legendData = [],
      xAxisData = [],
      seriesColor = ['#F49D1A', '#F49D1A', '#F49D1A'],
      seriesData = [],
      chartTitle
    }
  ) {
    let series = []
    seriesData.forEach((item, index) => {
      let val = item.map(item => ({value: item}))
      series.push({
        name: legendData[index],
        type: 'bar',
        barWidth: 20,
        data:  val,
        itemStyle: {
          normal: {
            color (params) {
              return seriesColor[index];
            },
            barBorderRadius: [30, 30, 0, 0],
            shadowBlur: 10,
            shadowColor: 'rgba(0, 103, 255, 0.2)',
            shadowOffsetX: -5,
            shadowOffsetY: 5,
          }
        },
        label: {
          normal: {
            show: labelShow,
            fontSize: 14,
            color: '#9298A2',
            position: 'top',
          }
        },
      })
    })
    return {
      title: {
        left: 'center',
        text: chartTitle,
      },
      color: seriesColor,
      tooltip: {
        trigger: 'axis',
        // axisPointer: { // 坐标轴指示器，坐标轴触发有效
        //   type: 'line' // 默认为直线，可选为：'line' | 'shadow'
        // }
      },
      legend: {
        data: legendData
      },
      grid: {
        left: '2%',
        right: '2%',
        top: '10%',
        bottom: 30,
        containLabel: true
      },
      xAxis: [
        {
          nameTextStyle: {
            color: '#9298A2',
            fontSize: 14,
          },
          color: "#59588D",
          type: 'category',
          data: xAxisData,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: '#9298A2',
            },
          },
          axisLabel: {
            margin: 15,
            color: '#9298A2',
            interval: 0,
            rotate: 40,
            textStyle: {
              fontSize: 14,
              fontFamily: "微软雅黑",
            },
            // formatter (val) {
            //   return val.length > 8 ? val.substring(0, 8).split('').join('\n') + '\n...' : val.split('').join('\n');
            // }
          }
        },
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            show: hideGrid,
          },
          axisLabel: {
            formatter: "{value}",
            color: '#9298A2',
            textStyle: {
              fontSize: 14
            },
          },
          axisLine: {//y轴线的颜色以及宽度
            lineStyle: {
              color: '#9298A2',
            },
          },
        }
      ],
      series: series
    }
  }

  /**
   * 条形图
   * @param barWidth 柱子的宽度
   * @param axisColor 颜色
   * @param hideGrid 是否显示网格
   * @param showData 是否显示数据
   * @param yAxisData 文本数值 []
   * @param seriesData 数值 []
   */
  static drawBarGraphChart (
    {
      barWidth,
      axisColor,
      hideGrid = false,
      showData = false,
      chartTitle,
      yAxisData = ["网易号", "百度搜索", "一点资讯", "搜狐新闻App", "腾讯新闻", "新闻_检索", "百家号", "今日头条", "新浪微博", "微信"],
      seriesData = [311, 364, 407, 412, 702, 737, 765, 1813, 6050, 6858]
    }
  ) {
    const maxNum = Math.max(...seriesData)
    let backGroundData = []
    for (let i = 0; i < seriesData.length; i++) {
      backGroundData.push(maxNum * 1.1)
    }
    const option = {
      title: {
        left: 'center',
        text: chartTitle,
      },
      width: "90%",
      grid: {
        left: '5%',
        right: '5%',
        top: '5%',
        bottom: 30,
        containLabel: true
      },
      tooltip: {
        show: false
      },
      xAxis: {
        type: "value",
        show: hideGrid,
        splitLine: {
          show: false
        },
        axisTick: {
          show: hideGrid
        },
        axisLine: {
          show: hideGrid
        }
      },
      yAxis: [
        {
          type: 'category',
          inverse: true,
          axisLine: {
            show: false //坐标线
          },
          axisTick: {
            show: false //小横线
          },
          axisLabel: {
            color: '#999' //坐标轴字颜色
          },
          data: yAxisData
        },
        {
          type: 'category',
          inverse: true,
          axisTick: 'none',
          axisLine: 'none',
          show: showData,
          axisLabel: {
            textStyle: {
              color: '#333',
              fontSize: '12'
            },
          },
          data: seriesData
        }],
      series: [
        {
          name: '值',
          type: 'bar',
          zlevel: 1,
          barWidth: barWidth || 20,
          showBackground: false,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.4)',
            barBorderRadius: [30, 30, 30, 30] //圆角大小
          },
          itemStyle: {
            normal: {
              color: axisColor[0], //每个数据的颜色
              barBorderRadius: [30, 30, 30, 30], //圆角大小
              shadowBlur: 10,
              shadowColor: 'rgba(0, 103, 255, 0.2)',
              shadowOffsetX: -5,
              shadowOffsetY: 5,
            },
          },
          data: seriesData
        },
        {
          name: '背景',
          type: 'bar',
          barWidth: barWidth || 20,
          barGap: '-100%',
          data: backGroundData,
          itemStyle: {
            normal: {
              color: '#f8f8f8',
              barBorderRadius: 30,
            }
          },
        },
      ]
    };
    return option
  }

  /**
   * 关键词云
   * @param colorList {Array} 颜色数组
   * @param seriesData {Array} 内容
   * [{
   *  key: "应急管理组织指标",
      name: "应急管理组织指标",
      value: 22}]
   */
  static drawKeywordChart (
    {
      colorList,
      seriesData,
      sizeRange,
      maskImage,
      chartTitle
    }
  ) {
    const option = {
      title: {
        left: 'center',
        text: chartTitle,
      },
      tooltip: {
        show: true
      },
      series: [{
        type: "wordCloud",
        sizeRange: sizeRange,
        rotationRange: [0, 0],
        maskImage: maskImage,
        width: "90%",
        textPadding: 0,
        autoSize: {
          enable: true,
          minSize: 14
        },
        textStyle: {
          normal: {
            color: function () {
              let color = colorList[
              Math.floor(Math.random() * colorList.length + 1) - 1
                ]
              return color
            }
          },
          emphasis: {
            shadowBlur: 12,
            shadowColor: "#333"
          }
        },
        data: seriesData,
      }]
    };
    return option
  }

  /**
   * 地图
   * @param seriesData 数据
   */
  static drawMapChart (
    {
      chartTitle,
      seriesData = [],
      inRangeColor = ["#e0ffff", "#006edd"]
    }
  ) {
    const Max = Math.max.apply(Math, seriesData.map(function (o){return o.value}))
    return {
      title: {
        left: 'center',
        text: chartTitle,
      },
      dataRange: {
        min: 0, //颜色区间的最小值
        max: Max + 10, //颜色区间的最大值，和data中的最大值一致
        x: "left",
        y: "bottom",
        text: ["高", "低"], // 文本，默认为数值文本
        calculable: true,
        inRange: {
          //颜色区间
          color: inRangeColor,
        },
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: '',
          type: "map",
          map: "demo",
          itemStyle: {
            normal: { label: { show: true } },
            emphasis: { label: { show: true } },
          },
          data: seriesData,
        },
      ],
    }
  }

  /**
   * 路径图
   * @param titleText {strting}
   * @param titleText {object}
   * {
      name: "一级标题",
      children: [{
          name: "二级一"
        },
        {
          name: "二级二"
        },
        {
          name: "二级三"
        }]
      }
   */
  static drawPathChart (
    {
      seriesData,
      wordCount
    }
  ) {
    const option = {
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove"
      },
      series: [
        {
          type: "tree",
          data: [seriesData],
          top: '1%',       //距离上
          left: '20%',      //左
          bottom: '1%',    //下
          right: '8%',    //右的距离
          initialTreeDepth: 1,//展开层级为一层
          label: {         //每个节点所对应的标签的样式
            normal: {
              position: 'left',       //标签的位置
              verticalAlign: 'middle',//文字垂直对齐方式，默认自动。可选：top，middle，bottom
              align: 'right',         //文字水平对齐方式，默认自动。可选：top，center，bottom
              fontSize: 16,             //标签文字大小
              textStyle: {
                fontSize: 16,
                fontWeight: 'BOLD',
              },
            },
          },
          lineStyle: {
            normal: {
              opacity: 0.9,
              color: "#D8D8D8",
              width: 2
            }
          },
          itemStyle: {
            normal: {
              color: "#20A0FF",
              borderWidth: 2,
              borderColor: "#20A0FF",
              label: {
                show: true,
                formatter: function (val) {
                  if (val.name) {
                    let strs = val.name.split(''); //字符串数组
                    if (strs.length > 10) {
                      strs = strs.slice(0, 10)
                      strs.push('...')
                    }
                    let str = ''
                    for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
                      str += s;
                    }
                    return str
                  }
                }
              },
              labelLine: {
                show: true,
                length: 40,
                lineStyle: {
                  color: "#3B86FF"
                }
              }
            }
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        }
      ]
    }
    return option
  }
}
