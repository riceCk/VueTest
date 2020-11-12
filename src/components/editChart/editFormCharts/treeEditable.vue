<!--
* @Author : LuoJie
* @Date :  2020/4/28
* @Version : 1.0
* @Content :
-->

<template>
  <div class="tree-editable">
    <el-collapse>
      <el-collapse-item v-for="(item, key) in editableTreeData" :key="key">
        <template slot="title">
          <span class="show-name" v-if="item.disabled">{{ item.name }}</span>
          <el-input class="editable-name" v-else v-model="item.name" @click.native.prevent.stop></el-input>
          <div class="editable-btns">
            <el-button v-if="item.disabled" type="info" size="mini" @click.prevent.stop="editTree(item)">编辑</el-button>
            <el-button type="primary" size="mini" @click.prevent.stop="addTree(item)">新增</el-button>
            <el-button type="success" size="mini" @click.prevent.stop="saveTree">保存</el-button>
          </div>
        </template>
        <div v-show="item.children">
          <el-collapse>
            <el-collapse-item v-for="(item1, key1) in item.children" :key="key1">
              <template slot="title">
                <span class="show-name" v-if="item1.disabled">{{ item1.name }}</span>
                <el-input class="editable-name" v-else v-model="item1.name" @click.native.prevent.stop></el-input>
                <div class="editable-btns">
                  <el-button v-if="item1.disabled" type="info" size="mini" @click.prevent.stop="editTree(item1)">编辑</el-button>
                  <el-button type="primary" size="mini" @click.prevent.stop="addTree(item1)">新增</el-button>
                  <el-button type="danger" size="mini" @click.prevent.stop="removeTree(item.children, key1)">删除</el-button>
                </div>
              </template>
              <div v-show="item1.children">
                <div v-for="(item2, key2) in item1.children" :key="key2">
                  <div class="child-item">
                    <span class="show-name" v-if="item2.disabled">{{ item2.name }}</span>
                    <el-input class="editable-name" v-else v-model="item2.name" @click.native.prevent.stop></el-input>
                    <div class="editable-btns">
                      <el-button v-if="item2.disabled" type="info" size="mini" @click.prevent.stop="editTree(item2)">编辑</el-button>
                      <el-button type="danger" size="mini" @click.prevent.stop="removeTree(item1.children, key2)">删除</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  export default {
    name: 'tree-editable',
    components: {},
    props: {
      // 可编辑的图表类型
      type: {
        type: String,
        default: 'tree'
      },
      // 列表数据
      editableData: {
        type: Array,
        default() {
          return [];
        }
      },
    },
    data() {
      return {
        editableTreeData: JSON.parse(JSON.stringify(this.editableData)),
      }
    },
    computed: {},
    watch: {
      editableData(val){
        this.editableTreeData = JSON.parse(JSON.stringify(val));
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      saveTree(){
        this.initTreeData();
        // console.log(this.editableTreeData);
        if(JSON.stringify(this.editableTreeData) != JSON.stringify(this.editableData)) {
          // console.log('saveTree');
          this.$emit('update', {type: this.type, data: this.editableTreeData});
        }
      },
      // 初始化树图数据
      initTreeData(){
        for(let i=0; i<this.editableTreeData.length; i++) {
          this.editableTreeData[i].disabled = true;
          if(this.editableTreeData[i].children.length){
            for(let j=0; j<this.editableTreeData[i].children.length; j++){
              this.editableTreeData[i].children[j].disabled = true;
              if(this.editableTreeData[i].children[j].children && this.editableTreeData[i].children[j].children.length) {
                for(let k=0; k<this.editableTreeData[i].children[j].children.length; k++) {
                  this.editableTreeData[i].children[j].children[k].disabled = true;
                }
              }
            }
          }
        }
      },
      editTree(data){
        let res = data;
        res.disabled = false;
        return res;
      },
      addTree(data){
        // console.log(data);
        let res = data;
        res.children.push({
          id: '',
          name: 'test',
          children: [],
          disabled: false
        });
        return res;
      },
      removeTree(parent, index){
        // console.log(parent, index);
        let res = parent.splice(index, 1);
        return res;
      },
    }
  }
</script>

<style type="text/less" lang="less">
  .tree-editable .el-collapse {
    .show-name {
      flex: 1;
      line-height: 24px;
    }
    .el-collapse-item__header {
      display: flex;
      align-items: center;
    }
    .editable-name {
      flex: 1;
      padding: 0 10px;
      max-width: 800px;
    }
    .editable-btns {
      float: right;
      .el-button:last-child {
        margin-right: 10px;
      }
    }
    .child-item {
      display: flex;
      align-items: center;
    }
  }
</style>
