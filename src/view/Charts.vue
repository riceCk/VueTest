<template>
  <div class="year-chart">
    <div v-eCharts="optionConfiguration" class="chart">
    </div>
  </div>
</template>

<script>
import eCharts from '../components/echarts/vEcharts';

export default {
  methods: {
    optionConfiguration() {
      
    }
  },
  directives: { eCharts },
}
</script>