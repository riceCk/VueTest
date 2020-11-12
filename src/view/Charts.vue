<template>
  <newEditChart></newEditChart>
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
        eChartId: 'eChartId'
      }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {

    },
    methods: {

    }
  }
</script>