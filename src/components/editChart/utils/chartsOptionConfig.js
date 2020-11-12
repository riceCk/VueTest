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
   * @param hideGrid 是否去网格线
   * @param selected {Object} 默认不展示
   */
  static drawLineChart (
    {
      color = ["#3699D2", "#EB5974"],
      legendLeft = 20,
      legendTop = 0,
      legendRight = 0,
      legendData = ["全部", "负面"],
      fontSize,
      xAxisData = ["06/07", "06/08", "06/09", "06/10", "06/11"],
      seriesData,
      hideGrid = true,
      selected
    }) {
    return {
      color,
      tooltip: {
        trigger: "axis"
      },
      grid: {
        left: '5%',
        right: '5%',
        top: 80,
        bottom: 30,
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {
            title: "下载"
          },
        }
      },
      legend: {
        show: true,
        left: legendLeft,
        top: legendTop,
        right: legendRight,
        icon: "circle",
        data: legendData,
        selected: selected
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
            show: !hideGrid
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
   * @param formatter 是否隐藏数值
   * @param seriesData 具体数值
   */
  static drawPieChart (
    {
      titleTop = 20,
      titleColor = "red",
      titleFontSize = "16",
      titleLeft = "right",
      legendRight = "0",
      legendBottom = "50",
      legendShow = true,
      legendData = ["直接访问", "邮件营销"],
      center = ["45%", "50%"],
      seriesColor = ["#EFB358", "#F49D1A"],
      seriesRadius = ["45%", "65%"],
      formatter = '{b} {c}条 \n {d}%',
      labelFontSizeColor = '#333333',
      seriesData = [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" }
      ],
    }) {
    return {
      title: {
        top: titleTop || 30,
        textStyle: {
          color: titleColor || "red",
          fontWeight: "bold",
          fontSize: titleFontSize || 16
        },
        left: titleLeft || "right"
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)"
      },
      toolbox: {
        feature: {
          saveAsImage: {
            title: '下载'
          }
        }
      },
      legend: {
        show: legendShow,
        orient: "vertical",
        icon: "circle",
        bottom: legendBottom || 50,
        right: legendRight || 0,
        data: legendData || ["直接访问", "邮件营销"],
        formatter: function (name) {
          // 获取legend显示内容
          let data = option.series[0].data;
          let total = 0;
          let tarValue = 0;
          for (let i = 0, l = data.length; i < l; i++) {
            total += data[i].value;
            if (data[i].name == name) {
              tarValue = data[i].value;
            }
          }
          return `${name}`;
        }
      },
      series: [
        {
          type: "pie",
          center: center || ["45%", "50%"],
          radius: seriesRadius,
          color: seriesColor || ["#000", "#000"],
          label: {
            normal: {
              color: labelFontSizeColor,
              fontWeight: 'bolder', // 如10%
              trigger: "item",
              show: true,
              formatter: formatter,
              textStyle: {
                fontSize: 18    //文字的字体大小
              },
            }
          },
          labelLine: {
            normal: {
              length: 15,
              length2: 20,
              lineStyle: {
                color: labelFontSizeColor ? '#999' : null,
                fontWeight: 'bolder'
              }
            }
          },
          data: seriesData
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
   */
  static drawHistogramChart (
    {
      hideGrid,
      xAxisData = ["微信", "百度搜索", "百度贴吧"],
      seriesColor = ['#F49D1A', '#F49D1A', '#F49D1A'],
      seriesData = [{
        name: "微信",
        value: 21327
      }, {
        name: "百度搜索",
        value: 32423
      }, {
        name: "百度贴吧",
        value: 12153
      },]
    }
  ) {
    return {
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
        top: '10%',
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
          splitLine: {
            show: !hideGrid
          },
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
              show: true,
              fontSize: 18,
              color: '#333',
              position: 'top',
            }
          },
        }
      ]
    }
  }
  /**
   * 条形图
   * @param barWidth 柱子的宽度
   * @param axisColor 颜色
   * @param yAxisData 文本数值 []
   * @param seriesData 数值 []
   */
  static drawBarGraphChart (
    {
      barWidth,
      axisColor,
      yAxisData = ["网易号", "百度搜索", "一点资讯", "搜狐新闻App", "腾讯新闻", "新闻_检索", "百家号", "今日头条", "新浪微博", "微信"],
      seriesData = [311, 364, 407, 412, 702, 737, 765, 1813, 6050, 6858]
    }
  ) {
    const maxNum = Math.max(...seriesData)
    let backGroundData = []
    for (let i = 0; i < seriesData.length; i++) {
      backGroundData.push(maxNum * 1.1)
    }
    console.log(backGroundData, 1231)
    const option = {
      toolbox: {
        feature: {
          saveAsImage: {
            title: '下载'
          }
        }
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
        show: false,
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      },
      yAxis: [{
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
      }, {
        type: 'category',
        inverse: true,
        axisTick: 'none',
        axisLine: 'none',
        show: true,
        axisLabel: {
          textStyle: {
              color: '#333',
              fontSize: '12'
          },
        },
        data:seriesData
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
              color: (params) => {
                let colors = axisColor
                return colors[params.dataIndex]
              }, //每个数据的颜色
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
      maskImage
    }
  ) {
    const option = {
      tooltip: {
        show: true
      },
      toolbox: {
        feature: {
          saveAsImage: {
            title: "下载"
          }
        }
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
  static drawPathChart ({
    seriesData,
    wordCount
  }) {
    const option = {
      tooltip: {
        trigger: "item",
        triggerOn: "mousemove"
      },
      toolbox: {
        feature: {
          saveAsImage: {
            title: "下载"
          }
        }
      },
      series: [
        {
          type: "tree",
          data: [seriesData],
          top: '1%',       //距离上
          left: '20%',      //左
          bottom: '1%',    //下
          right: '8%',    //右的距离
          initialTreeDepth:1,//展开层级为一层
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
                    if (strs.length >  10) {
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
