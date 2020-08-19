<template>
  <div class="editCharts" v-show="dialogEdit">
    <section class="edit-frame">
      <header>
        <i class="close-icon" @click.stop="onClose"></i> 图表编辑
      </header>
      <section class="edit-content">
        <el-form ref="styleData" :model="styleData" label-width>
          <h4>图表样式编辑</h4>
          <el-form-item label="样式">
            <el-radio-group v-model="styleData.styleRaido">
              <el-radio
                v-for="item in styleOption"
                :label="item.value"
                :key="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="item.label" v-for="item in hiddenType" :key="item.value">
            <el-switch v-model="styleData[item.value]"></el-switch>
          </el-form-item>
          <h4>图表数据编辑</h4>
          <el-form-item label="图标数据X">
            <el-input-number v-model="styleData.multiple" :min="1"></el-input-number>倍
          </el-form-item>
          <chart-editable
            type="lineChartData"
            :editable-data="updateTable"
            :editable-column="tableColumn"
            @update="handleUpdate"
          ></chart-editable>
        </el-form>
      </section>
    </section>
    <section class="edit-mask" @click.stop="onClose"></section>
  </div>
</template>

<script>
import ChartEditable from "./chartEditable";
export default {
  components: {
    ChartEditable,
  },
  props: {
    value: {}, // 弹框开关属性
    // 图表数据
    ediTableData: {
      type: Array,
    },
    // 图标数据表头
    tableColumn: {
      type: Object,
    },
    // 样式单选框
    styleOption: {
      type: Array,
    },
    // 隐藏类型
    hiddenType: {
      type: Array,
    },
    // 回显编辑form样式参数
    styleData: {
      type: Object,
    },
  },
  data() {
    return {
      dialogEdit: false,
      updateTable: [],
    };
  },
  watch: {
    // 核心代码
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.dialogEdit = newVal;
        this.handleTableData(this.chartData);
      }
    },
  },
  mounted() {},
  methods: {
    handleTableData(chartData) {
      this.updateTable = JSON.parse(JSON.stringify(this.ediTableData));
    },
    onClose() {
      this.$emit("handlerEditCharts", {
        styleData: this.styleData,
        updateTable: this.updateTable,
      });
    },
    handleUpdate(val) {
      this.updateTable = val.data;
    },
  },
};
</script>

<style lang="less" scoped>
.fixedBody {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
h4 {
  padding: 0;
  margin: 0;
}
.editCharts {
  .fixedBody;
  .edit-frame {
    position: absolute;
    right: 0;
    width: 600px;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 999;
    header {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      background-color: #1e91c2;
      .close-icon {
        float: left;
        margin-left: 20px;
        width: 20px;
        height: 17px;
        background-image: url("./image/close.png");
        background-size: 100% 100%;
        transform: translateY(50%);
      }
    }
    .edit-content {
      flex: 1;
      padding: 15px;
      text-align: left;
      background-color: #f8f9fd;
      h4 {
        margin-bottom: 22px;
      }
    }
  }
}
.edit-mask {
  .fixedBody;
  background: #333;
  opacity: 0.73;
  z-index: 998;
}
</style>