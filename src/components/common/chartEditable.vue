<!--
* @Author : LuoJie
* @Date :  2020/4/24
* @Version : 1.0
* @Content :
-->

<template>
  <div class="chart-editable">
    <div class="chart-header">
      <el-button type="primary" size="mini" @click="addCell">新增</el-button>
      <el-button v-if="editFlag" type="primary" size="mini" @click="saveCell">保存</el-button>
    </div>
    <el-table
      :data="tableData"
      highlight-current-row
      :max-height="editableMaxHeight"
      :show-header="showHeader"
      @cell-click="clickCell"
      @header-click="hideCellEditable"
    >
      <el-table-column v-for="(item, key) in editableColumn" :key="key" :label="item">
        <template slot-scope="scope">
          <span v-if="scope.row.disabled">{{ scope.row[key] }}</span>
          <el-input v-else v-model="scope.row[key]"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90px">
        <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteCell(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "chart-editable",
  components: {},
  props: {
    // 可编辑的图表类型
    type: {
      type: String,
      default: "line",
    },
    // 列表数据
    editableData: {
      type: Array,
      default() {
        return [];
      },
    },
    // 列表显示列
    editableColumn: {
      type: Object,
      default() {
        return {};
      },
    },
    // 显示表头
    showHeader: {
      type: Boolean,
      default: true,
    },
    // 默认添加列数据
    editableCellData: {
      type: Object,
      default() {
        return {
          id: "",
          name: "默认",
          value: 0,
          disabled: true,
        };
      },
    },
    // 列表最大显示高度
    editableMaxHeight: {
      type: Number,
      default() {
        return 210;
      },
    },
  },
  data() {
    return {
      editFlag: false,
      tableData: JSON.parse(JSON.stringify(this.editableData)),
      tableColumn: [].concat(this.editableColumn),
    };
  },
  computed: {},
  watch: {
    editableData(val) {
      this.tableData = JSON.parse(JSON.stringify(val));
    },
    editableColumn: {
      handler(newValue, oldValue) {
        this.tableColumn = JSON.parse(JSON.stringify(newValue));
      },
      deep: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    // 初始化可编辑字段
    initCellDisabled() {
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].disabled = true;
      }
    },
    // 单元格点击展示编辑功能
    clickCell(row, column, cell, event) {
      this.editFlag = true;
      this.initCellDisabled();
      if (column.label !== "操作") {
        row.disabled = false;
      }
    },
    // 保存
    saveCell() {
      this.editFlag = false;
      this.initCellDisabled();
      if (JSON.stringify(this.tableData) != JSON.stringify(this.editableData)) {
        this.$emit("update", { type: this.type, data: this.tableData });
      }
    },
    // 新增
    addCell() {
      this.editFlag = true;
      this.tableData.push(Object.assign({}, this.editableCellData));
    },
    // 删除
    deleteCell(index, data) {
      this.editFlag = true;
      data.splice(index, 1);
    },
    // 表头点击事件
    hideCellEditable() {
      this.initCellDisabled();
    },
  },
};
</script>

<style type="text/less" lang="less" scoped>
.chart-editable {
  padding: 0 10px;
  .chart-header {
    margin-bottom: 10px;
  }
}
</style>
