/**
 * @param formOptions
 * 平滑曲线：smooth
 * 显示网格: hideGrid
 * 图表名称：chartTitle
 * 显示峰值: markPointTop
 * 显示谷值: markPointBottom
 * 显示数量：formatterNumber
 * 显示占比：formatterPercentage
 * 显示数据表: showTable
 * 平滑数值:smoothedData
 * 显示数值:showData
 */
export default [
  {
    label: '全部',
    value: 'all',
    formOptions: null
  },
  {
    label: '表格',
    value: 'excel',
    formOptions: null,
    children: [
      {
        label: '表格',
        value: 'excel-1',
        father: 'excel'
      }
    ]
  },
  {
    label: '折线图',
    value: 'line',
    formOptions: [
      {
        label: "平滑曲线",
        prop: "smooth",
        element: "el-switch",
      },
      {
        label: "显示网格",
        prop: "hideGrid",
        element: "el-switch",
      },
      {
        label: "图表名称",
        prop: "chartTitle",
        element: "el-input",
      },
      {
        label: "图表数据 X",
        prop: "multiple",
        element: "el-input-number",
        min: 1,
      },
      {
        label: "显示峰值",
        prop: "markPointTop",
        element: "el-switch",
      },
      {
        label: "显示谷值",
        prop: "markPointBottom",
        element: "el-switch",
      },
    ],
    children: [
      {
        label: '折线图',
        value: 'line-1',
        father: 'line',
      }
    ]
  },
  {
    label: '面积图',
    value: 'lineArea',
    formOptions: [
      {
        label: "平滑曲线",
        prop: "smooth",
        element: "el-switch",
      },
      {
        label: "显示网格",
        prop: "hideGrid",
        element: "el-switch",
      },
      {
        label: "图表名称",
        prop: "chartTitle",
        element: "el-input",
      },
      {
        label: "图表数据 X",
        prop: "multiple",
        element: "el-input-number",
        min: 1,
      },
      {
        label: "显示峰值",
        prop: "markPointTop",
        element: "el-switch",
      },
      {
        label: "显示谷值",
        prop: "markPointBottom",
        element: "el-switch",
      },
    ],
    children: [
      {
        label: '面积图',
        value: 'lineArea-1',
        father: 'lineArea',
      },
    ]
  },
  {
    label: '饼图',
    value: 'pie',
    formOptions: [
      {
        label: "显示数量",
        prop: "formatterNumber",
        element: "el-switch",
      },
      {
        label: "显示占比",
        prop: "formatterPercentage",
        element: "el-switch",
      },
      {
        label: "图表名称",
        prop: "chartTitle",
        element: "el-input",
      },
      {
        label: "图表数据 X",
        prop: "multiple",
        element: "el-input-number",
        min: 1,
      },
    ],
    children: [
      {
        label: '传统饼图',
        value: 'pie-1',
        father: 'pie',
      },
      {
        label: '环形图',
        value: 'pie-2',
        father: 'pie',
      },
      {
        label: '玫瑰图',
        value: 'pie-3',
        father: 'pie',
      }
    ]
  },
  {
    label: '柱状图',
    value: 'histogram',
    formOptions:  [
      {
        label: "显示数量",
        prop: "formatterNumber",
        element: "el-switch",
      },
      {
        label: "显示网格",
        prop: "hideGrid",
        element: "el-switch",
      },
      {
        label: "显示数据表",
        prop: "showTable",
        element: "el-switch",
      },
      {
        label: "图表名称",
        prop: "chartTitle",
        element: "el-input",
      },
      {
        label: "图表数据 X",
        prop: "multiple",
        element: "el-input-number",
        min: 1,
      },
    ],
    children: [
      {
        label: '柱状图',
        value: 'histogram-1',
        father: 'histogram',
      },
    ]
  },
  {
    label: '条形图',
    value: 'barGraph',
    formOptions:  [
      {
        label: "平滑数值",
        prop: "showData",
        element: "el-switch",
      },
      {
        label: "显示网格",
        prop: "hideGrid",
        element: "el-switch",
      },
      {
        label: "显示数据表",
        prop: "showTable",
        element: "el-switch",
      },
      {
        label: "图表名称",
        prop: "chartTitle",
        element: "el-input",
      },
      {
        label: "图表数据 X",
        prop: "multiple",
        element: "el-input-number",
        min: 1,
      },
    ],
    children: [
      {
        label: '条形图',
        value: 'barGraph-1',
        father: 'barGraph',
      },
    ]
  },
  {
    label: '词云图',
    value: 'keyword',
    formOptions: [
      {
        label: "图表名称",
        prop: "chartTitle",
        element: "el-input",
      },
    ],
    children: [
      {
        label: '词云图',
        value: 'keyword-1',
        father: 'keyword',
      },
    ]
  },
  {
    label: '地图',
    value: 'map',
    formOptions: [
      {
        label: "显示数值",
        prop: "showData",
        element: "el-switch",
      },
      {
        label: "图表名称",
        prop: "chartTitle",
        element: "el-input",
      },
      {
        label: "图表数据 X",
        prop: "multiple",
        element: "el-input-number",
        min: 1,
      },
    ],
    children: [
      {
        label: '地图',
        value: 'map-1',
        father: 'map',
      },
    ]
  },
]

