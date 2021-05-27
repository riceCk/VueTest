<template>
  <div>
    <vue-msg ref="msg"></vue-msg>
    <vue-button type="warn">警告</vue-button>
    <vue-button type="error">错误</vue-button>
    <vue-button type="warn">默认</vue-button>
    <newEditChart
      @handleEditChart="handleEditChart"
      :tableColumn="tableColumn"
      :tablePropData="tablePropData"
      :authorityMenu="authorityMenu"
      :type="type"
      :formData="formData"
      :dialogVisible.sync="dialogVisible">
    </newEditChart>
  </div>
</template>


<script>
  import newEditChart from '../components/newEditChart/index'
  export default {
    name: 'charts',
    components: {
      newEditChart
    },
    props: {},
    data() {
      return {
        activeName: '1',
        eChartId: 'eChartId',
        dialogVisible: false,
        tableColumn: [
          {
            label: "地域",
            prop: "name",
          },
          {
            label: "非敏感",
            prop: "data1",
          },
          {
            label: "敏感",
            prop: "data2",
          },
          {
            label: "总机",
            prop: "data3",
          },
        ],
        tablePropData: {
          "header-cell-style": {},
          data:  [
            {
              YData: '',
              data2: 54,
              data1: 23,
              data3: 12,
            },
            {
              YData: '',
              data2: 54,
              data1: 23,
              data3: 12,
            },
            {
              YData: '',
              data2: 54,
              data1: 23,
              data3: 12,
            },
          ],
        },
        type: {
          label: '折线图',
          value: 'line-1',
          father: 'line',
        },
        authorityMenu: [],
        formData: {
          chartTitle: '飞花禁忌'
        }
      }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {

    },
    methods: {
      handleEditChart (editChartData) {
        console.log(editChartData)
      }
    }
  }
</script>