<template>
  <div>
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
            label: "",
            prop: "YData",
          },
          {
            label: "11/11",
            prop: "data1",
          },
          {
            label: "11/12",
            prop: "data2",
          },
          {
            label: "11/13",
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