<script>
  export default {
    name: 'table-comp',
    props: {
      loading: {
        type: Boolean,
        default: () => false
      },
      props: {// 对应El_Table Attributes
        required: true,
        type: Object
      },
      columns: {// 对应El-Table-column Attributes
        required: true,
        type: Array,
        default: () => []
      }
    },
    render (createElement) {
      const render = (h, data) => {

      }
      console.log(this)
      return createElement(
        'el-table',
        {
          class: 'config-table',
          props: {
            ...this.props
          },
          on: {
            ...this.$listeners
          },
          directive: [
            {
              name: 'loading',
              value: this.loading
            }
          ],
          ref: 'ref'
        },
      )
    }
  }
</script>