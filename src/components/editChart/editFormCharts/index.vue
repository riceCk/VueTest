<!--
 * @Author : 陈凯
 * @Date : 2020/07/30
 * @Content : 编辑器
-->

<template>
  <div class="editCharts" v-show="dialogEdit">
    <section class="edit-frame">
      <header>
        <i class="close-icon" @click.stop="onClose"></i> 图表编辑
      </header>
      <section class="edit-content">
        <el-form ref="styleData" :model="formData" label-width>
          <h4>图表样式编辑</h4>
          <el-form-item
            v-for="(item, index) in formOptions"
            :key="newKeys[index]"
            :prop="item.prop"
            :label="item.label ? (item.label) : ''"
            :rules="item.rules"
          >
            <formItem v-model="formData[item.prop]" :itemOptions="item" />
          </el-form-item>
          <tree-editable
            v-if="editFormData.type && editFormData.type === 'treeEditable'"
            :editable-data="updateTable"
            @update="handleUpdate"
          ></tree-editable>
          <chart-editable
            v-else
            :editable-data="updateTable"
            :editable-column="tableConfig.columnTable"
            @update="handleUpdate"
          ></chart-editable>
          <div class="btn">
            <el-button type="primary" @click="onClose">确认</el-button>
          </div>
        </el-form>
      </section>
    </section>
    <section class="edit-mask"></section>
  </div>
</template>

<script>
import ChartEditable from "./chart-editable";
import TreeEditable from "./treeEditable.vue";
import formItem from "./formItem";
import { tools } from "../utils/tools";

export default {
  name: "editFormCharts",
  components: {
    ChartEditable,
    TreeEditable,
    formItem,
  },
  props: {
    value: {}, // 弹框开关属性
    // 表的表头和参数属性
    tableConfig: {
      type: Object,
      default() {
        return {
          updateTable: [], // 图表数据
          columnTable: {}, // 图标数据表头
        };
      },
    },
    // 条件配置js
    formOptions: {
      type: Array,
      default() {
        return [
          {
            label: "样式",
            prop: "styleRadio",
            element: "el-radio-group",
            options: [
              { label: "样式1", value: "1" },
              { label: "样式2", value: "1" },
            ],
          },
        ];
      },
    },
    // 参数配置
    editFormData: {
      type: Object,
    },
  },
  data() {
    return {
      dialogEdit: false,
      updateTable: [],
      formData: {},
    };
  },
  watch: {
    // 核心代码
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.dialogEdit = newVal;
        // 两个函数调用顺序不能换
        this.initEchoData();
      }
    },
  },
  computed: {
    newKeys() {
      return this.formOptions.map((v) => {
        return tools.createUniqueString();
      });
    },
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 回显参数以及表格数据
     */
    initEchoData() {
      this.updateTable = JSON.parse(
        JSON.stringify(this.tableConfig.updateTable)
      );
      this.formData = JSON.parse(JSON.stringify(this.editFormData));
    },
    /**
     * 关闭编辑器，返回数据
     */
    onClose() {
      this.$emit("closeEditForm", {
        formData: this.formData,
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
  z-index: 6;
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
        background-image: url("../image/close.png");
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
      .btn {
        text-align: center;
        margin-top: 20px;
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