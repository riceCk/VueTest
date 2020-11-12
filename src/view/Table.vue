<template>
  <div class="table">
    <table-comp :columns="tableColumns"
                :loading="loading"
                :props="tableProps" />
  </div>
</template>

<script>
  import tableComp from '../components/tableComp/index'
  export default {
    components: {
      tableComp
    },
    data () {
      return {
        loading: false,
        tableProps: {
          'show-summary': true,
          'highlight-current-row': true,
          data: [
            {
              a: '123',
              b: '哈喽',
              c: '高层',
              d: 'm²',
              e: 234,
              f: 11.1,
              g: 12345
            },
            {
              a: 'tyhj',
              b: '中国',
              c: '中层',
              d: 'kilo',
              e: 1111,
              f: 33.3,
              g: 456
            }
          ]
        },
        tableColumns: [
          {
            type: 'selection',
            width: 100
          },
          {
            label: '项目编码',
            prop: 'a',
          }, {
            label: '项目名称',
            prop: 'b',
          }, {
            label: '项目特征',
            prop: 'c',
          }, {
            label: '单位',
            prop: 'd',
            minWidth: '200px',
            formatter: (row, column) => `单位：${row[column.property]}`,
            renderHeader: (h, d) => `我是${d.column.label}`, // 对应El-Table-column Attributes render-header
            // 优先级高于formatter，相当于el-table-column中作用域插槽
            renderCell: (h, props) => h('span', `${props.column.label}ing：${props.row[props.column.property]}`) // 这是自定义的El-Table-column Attributes，对应scopedSlot!!!
          }, {
            label: '基准模型',
            prop: '',
            render: null,
            data: null,
            children: [
              {
                label: '工程量',
                prop: 'e',
              }, {
                label: '综合单价',
                prop: 'f',
              }, {
                label: '综合合价',
                prop: 'g',
              }
            ]
          }
        ],
      }
    }
  }
</script>