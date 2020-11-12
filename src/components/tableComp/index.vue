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
        data = Array.isArray(data) ? data : [data]
        return data.map(col => {
          const {children} = col;
          const props = {
            ...col
          }
          const hasChildren = Array.isArray(children) && children.length
          const hasCellRender = typeof col.renderCell === 'function';
          let cS = [];
          if (hasChildren) {
            cS = render(h, children)
          }
          const colProps = {
            props
          }
          if (hasCellRender) {
            colProps.scopedSlots = {
              default (ps) {
                return col.renderCell(h, ps)
              }
            }
          }
          return h('el-table-column', colProps, hasChildren ? cS : [])
        })
      }
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
        render(createElement, this.columns).concat(createElement('template', {slot: 'append'}, this.$slots.append))
      )
    }
  }
</script>