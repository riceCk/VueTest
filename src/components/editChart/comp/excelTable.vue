<template>
  <div id="excelTable">
    <div style="display: inline-block;float: left;margin-bottom: 10px">
      <el-button size="mini" type="primary" @click="consoleDatas">保存数据</el-button>
      <el-button size="mini" type="primary" @click="addRow">增加行</el-button>
      <el-popconfirm title="确定删除最后行吗？" @onConfirm="delLastRow">
        <el-button style="margin-left: 10px" slot="reference" type="primary" size="mini">删除指定行</el-button>
      </el-popconfirm>
    </div>
    <el-table :data="tableData"
              border style="width: 100%;margin-top:10px"
              @header-contextmenu="colRightClick"
              @selection-change="handleSelectionChange"
              max-height="250"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column v-if="tableCols.length > 0" type="index" :label="'编号'" :width="50"></el-table-column>
      <el-table-column v-for="(column, idx) in tableCols" :key="idx" :index="idx">
        <!--label-->
        <template slot="header" slot-scope="scope1">
          <el-input
            size="mini"
            v-model="column.txt">
          </el-input>
        </template>
        <!--prop-->
        <template slot-scope="scope">
          <el-input
            v-model="scope.row[column.col].content">
          </el-input>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="showMenu" id="contextmenu">
      <i class="el-icon-circle-close hideContextMenu" @click="showMenu=false"></i>
      <el-button size="mini" type="primary" @click="addColumn(curColumn)">前方插入一列</el-button>
      <el-button size="mini" type="primary" @click="addColumn(curColumn+1)">后方插入一列</el-button>
      <el-popconfirm title="确定删除该列吗？" @onConfirm="delColumn">
        <el-button slot="reference" type="primary" size="mini">删除当前列</el-button>
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
  import {tools} from '../utils/tools'

  export default {
    name: 'demo',
    data () {
      return {
        tableCols: [],
        tableData: [],
        count_col: 0,
        showMenu: false,
        curColumn: null,
      }
    },
    computed: {},
    watch: {
      '$attrs.tableColumnAndProp': {
        handler (newVal, oldVal) {
          const {tableColumn, tablePropData} = newVal
          this.tableCols = tableColumn.map(item => {
            return {
              col: item.prop,
              txt: item.label,
              show: true
            }
          })
          this.setTestData(tablePropData)
        },
        deep: true, // 对象内部的属性监听，也叫深度监听
      }
    },
    mounted () {
    },
    methods: {
      colRightClick (column, event) {
        const fatherDom = document.getElementById('dataEditing')
        const fatherClientRect = fatherDom.getBoundingClientRect()
        window.event.returnValue = false; //阻止浏览器自带的右键菜单弹出
        if (!column.index && column.index !== 0) return;
        this.curColumn = column.index
        this.showMenu = true
        let ele = document.getElementById('contextmenu')
        ele.style.top = event.clientY - fatherClientRect.y + 'px';
        ele.style.left = event.clientX - fatherClientRect.x + 'px';
        if (window.innerWidth - 140 < event.clientX) {
          ele.style.left = 'unset'
          ele.style.right = 0
        }
      },
      addRow () { // 新增行
        this.showMenu = false
        let obj = {}
        this.tableCols.map(p => {
          obj[p.col] = {content: '', show: true}
        })
        this.tableData.push(obj)
      },
      // 当row中存在一“主键”可唯一标识row的下标时（如：编号放在tableData内），可借此实现行的自由插入与删除
      addColumn (idx) { // 新增列
        this.showMenu = false
        let obj = {col: 'col_' + this.count_col++, txt: '', show: true}
        let tableCols = this.tableCols
        this.tableCols =[]
        this.$nextTick(() => {
          if (idx || idx === 0) tableCols.splice(idx, 0, obj);
          else tableCols.push(obj);
          this.tableCols = tableCols
        })
        let _this = this
        this.tableData.map(p => { // 新增的对象无法被vue监听到
          _this.$set(p, obj.col, {content: '', show: true})
        })
      },
      delColumn () { // 删除列
        this.showMenu = false
        let colKey = this.tableCols[this.curColumn].col;
        let tableCols = this.tableCols.filter(item => item.col !== colKey)
        this.tableCols = []
        this.$nextTick(() => {
          this.tableCols = tableCols
        })
        },
      delLastRow () { // 删除行
        this.showMenu = false
        let len = this.tableData.length;
        if (len > 0) {
          this.tableData = this.multipleSelection
        }
        else this.$message.error('没有可删除行');
      },
      // 保存數據
      consoleDatas () {
        this.$emit('handleColumnAndData', {
          tableCols: this.tableCols,
          tableData: this.tableData,
        })
      },
      // 处理tableData
      setTestData (propData) {
        if (this.tableData.length === 0) {
          const tablePropData = JSON.parse(JSON.stringify(propData.data))
          let obj = {}
          this.tableCols.forEach(item => {
            obj[item.col] = {
              content: '',
              show: true
            }
          })
          let testData = []
          tablePropData.forEach(item => {
            let keys = Object.keys(obj)
            let propData = JSON.parse(JSON.stringify(obj));
            keys.forEach(it => {
              propData[it].content = tools.getVal(item, it)
            })
            testData.push(propData)
          })
          this.tableData = testData
        }
      },
      // 选择框
      handleSelectionChange (val) {
        this.multipleSelection = this.tableData.filter((v) => { return val.indexOf(v) == -1 })
      }
    }
  }
</script>

<style>
  #dataEditing {
    position: relative;
  }

  #excelTable .el-table th,
  #excelTable .el-table td,
  #excelTable .el-table .cell {
    padding: 0;
  }

  #excelTable .el-input__inner,
  #excelTable .el-textarea__inner {
    border: 0;
    text-align: center;
  }

  #excelTable .el-table .cell p {
    height: 23px;
    cursor: text;
  }

  #contextmenu {
    position: absolute;
    top: 0;
    left: 0;
    height: auto;
    width: 120px;
    border-radius: 3px;
    border: 1px solid #999999;
    background-color: #f4f4f4;
    padding: 10px;
    z-index: 12;
  }

  #contextmenu button {
    display: block;
    margin: 0 0 5px;
  }

  .hideContextMenu {
    position: absolute;
    top: 5px;
    right: 5px;
  }
</style>
