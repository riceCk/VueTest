<template>
  <div class="reportTable" style="">
    <table
      width="600px"
      v-loading="loading"
      :id="dragId"
      cellspacing="0"
      cellpadding="2"
      border="1"
      rules="all"
    >
      <tbody>
      <tr style="height: 15.2pt" :style="props['header-cell-style']">
        <td
          v-for="(item, index) in columns"
          class="table-harder"
          style="min-width: 60px"
          :style="{ width: item.width + 'px' }"
          :key="index"
        >
          {{ item.label }}
        </td>
      </tr>
      <template v-if="props.data.length > 0">
        <tr v-for="(it, idx) in props.data" :key="idx">
          <td
            class="table-content"
            style="word-wrap:break-word;word-break:break-all;"
            width="100px"
            v-for="(item, index) in columns"
            :key="idx + index"
            v-html="setTableTd(item, it, idx)"
          ></td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td :colspan="columns.length">暂无数据</td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>

</template>


<script>
  import $ from "jquery";

  export default {
    name: "reportTable",
    components: {},
    props: {
      dragId: {
        type: String,
        default: ''
      },
      loading: {
        type: Boolean,
        default: () => false,
      },
      props: {
        // 对应El-Table Attributes
        required: true,
        type: Object,
      },
      columns: {
        // 对应El-Table-column Attributes
        required: true,
        type: Array,
        default: () => [],
      },
    },
    data () {
      return {};
    },
    computed: {},
    watch: {},
    created () {
    },
    mounted () {
      this.drag();
    },
    methods: {
      drag () {
        let tTD; //用来存储当前更改宽度的Table Cell,避免快速移动鼠标的问题
        let table = document.getElementById(this.dragId);
        for (let j = 0; j < table.rows[0].cells.length; j++) {
          table.rows[0].cells[j].onmousedown = function () {
            //记录单元格
            tTD = this;
            if (event.offsetX > tTD.offsetWidth - 10) {
              tTD.mouseDown = true;
              tTD.oldX = event.x;
              tTD.oldWidth = tTD.offsetWidth;
            }
            //记录Table宽度
            //table = tTD; while (table.tagName != ‘TABLE') table = table.parentElement;
            //tTD.tableWidth = table.offsetWidth;
          };
          table.rows[0].cells[j].onmouseup = function () {
            //结束宽度调整
            if (tTD == undefined) tTD = this;
            tTD.mouseDown = false;
            tTD.style.cursor = "default";
          };
          table.rows[0].cells[j].onmousemove = function () {
            //更改鼠标样式
            if (event.offsetX > this.offsetWidth - 10)
              this.style.cursor = "col-resize";
            else this.style.cursor = "default";
            //取出暂存的Table Cell
            if (tTD == undefined) tTD = this;
            //调整宽度
            if (tTD.mouseDown != null && tTD.mouseDown == true) {
              tTD.style.cursor = "default";
              if (tTD.oldWidth + (event.x - tTD.oldX) > 0)
                tTD.width = tTD.oldWidth + (event.x - tTD.oldX);
              //调整列宽
              tTD.style.width = tTD.width;
              tTD.style.cursor = "col-resize";
              //调整该列中的每个Cell
              table = tTD;
              while (table.tagName != "TABLE") table = table.parentElement;
              for (let j = 0; j < table.rows.length; j++) {
                table.rows[j].cells[tTD.cellIndex].width = tTD.width;
              }
              //调整整个表
              //table.width = tTD.tableWidth + (tTD.offsetWidth – tTD.oldWidth);
              //table.style.width = table.width;
            }
          };
        }
      },
      setTableTd (column, obj, index) {
        if (column && column.type === "index") {
          return index + 1;
        }
        if (column && column.type !== "index" && !column.renderCell) {
          return this.getVal(obj, column.prop);
        }
        if (column && column.type !== "index" && column.renderCell) {
          const renderCell = column.renderCell;
          if (renderCell.tag === "a") {
            return `<a href="${this.getVal(
              obj,
              renderCell.prop
            )}"  target="_blank"> ${this.getVal(obj, column.prop)}</a>`;
          }
          if (renderCell.formatData) {
            return renderCell.formatData(this.getVal(obj, column.prop));
          }
        }
      },
      getVal (val, name) {
        let array = name.split(".");
        let newVal = {...val};
        array.forEach((item) => {
          newVal = newVal[item];
        });
        return newVal;
      },
    },
  };
</script>

<style type="text/less" lang="less">
  .reportTable {
    width: 100%;
    overflow: auto;
    table {
      word-wrap: break-word;
      width: 100%;
    }
    td {
      text-align: center;
      font-family: '仿宋', FangSong;
      padding: 8pt 5.4pt 8pt 5.4pt;
    }
    td a {
      color: #0000ee;
      word-break: break-word;
      cursor: pointer;
    }
  }

</style>
