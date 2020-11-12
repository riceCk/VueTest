<template>
  <div class="financialKPI">
    <gc-spread-sheets :host-class="hostClass"
                      @workbookInitialized="spreadInitHandle" />
  </div>
</template>
<script>
  import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css';
  import '@grapecity/spread-sheets-vue';

  export default {
    data() {
      return {
        hostClass: 'spread-host',
      };
    },
    methods: {
      spreadInitHandle(spread) {
        // eslint-disable-next-line no-underscore-dangle
        this._spread = spread;
      },
    },
  };
</script>
<style scoped>
  .financialKPI{
    width: 100%;
    height: 100%;
  }
  .spread-host {
    width: 100%;
    height: 100%;
    border: 1px solid lightgray;
  }

</style>