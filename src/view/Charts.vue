<template>
  <div class="charts">
    <bar-line-chart eChartId="barLineChart" />
    <pie-line-chart eChartId="pieBarChart" />
  </div>
</template>

<script>
import BarLineChart from '../components/barLineChart'
import pieLineChart from '../components/pieLineChart'
export default {
  components: {
    BarLineChart,
    pieLineChart
  },
}
</script>

<style>
  .charts {
    display: flex;
  }
</style>