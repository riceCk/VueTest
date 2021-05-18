<template>
  <div class="about">
    <el-select
      v-model="value"
      placeholder="请选择"
      filterable
      multiple
      v-el-select-loadmore="loadmore"
    >
      <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  directives: {
    "el-select-loadmore": {
      bind(el, binding) {
        // 获取element-ui定义好的scroll盒子
        const SELECTWRAP_DOM = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        );
        SELECTWRAP_DOM.addEventListener("scroll", function() {
          /**
           * scrollHeight 获取元素内容高度(只读)
           * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
           * clientHeight 读取元素的可见高度(只读)
           * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
           * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
           */
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
  },
  data() {
      return {
        userItems: [], //下拉数组
        formData: {
          //下拉参数
          pageIndex: 1,
          pageSize: 20
        },
        users: [] //总数组
      };
    },
  mounted() {
    this.getList(this.formData);
  },
  methods: {
    loadmore() {
      this.formData.pageIndex++;
      this.getList(this.formData);
    },
    getList(formData) {
      // 这里是接口请求数据, 带分页条件
      const _res = [1, 2, 3]; // 请求得到的数据
      this.options = [...this.options, ..._res];
    }
  }
};
</script>