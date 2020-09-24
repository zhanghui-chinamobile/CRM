<template>
    <el-table :data="data" :row-style="showTr">
        <el-table-column v-for="(column, index) of columns"
                         :key="column.dataIndex"
                         :label="column.text">
            <template slot-scope="scope">
        <span v-if="spaceIconShow(index)"
              v-for="(space, levelIndex) of scope.row._level"
              class="ms-tree-space"
              :key="levelIndex">
        </span>
        <span v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)" style="font-size: 13px">
          <i v-if="!scope.row._expanded" class="fa fa-plus-square-o" aria-hidden="true"></i>
          <i v-if="scope.row._expanded" class="fa fa-minus-square-o" aria-hidden="true"></i>
        </span>
        <span v-else-if="index===0" class="ms-tree-space"></span>
                {{
                transform(column,
                scope.row[(column.dataIndex)],
                scope.row._level)
                }}
      </template>
    </el-table-column>
    <el-table-column align="left" label="操作" v-if="treeType === 'normal'">
      <template slot-scope="props">
        <el-button type="success" size="small" @click="handleAdd(props.row)" :disabled="canAdd(props.row)">添加</el-button>
        <el-button type="primary" size="small" @click="handleEdit(props.row)">编辑</el-button>
        <el-button type="danger" size="small" @click="handleDelete(props.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  import Utils from './tree';
  export default {
    name: "TableTree",
    props: {
      //对父组件传过来的数据进行树形格式化
      treeStructure: {
        type: Boolean,
        default() {
          return false
        }
      },
      //展示对应的字段
      columns: {
        type: Array,
        default() {
          return []
        }
      },
      //数据源
      dataSource: {
        type: Array,
        default () {
          return []
        }
      },
      //是否展示操作列
      treeType: {
        type: String,
        default () {
          return 'normal'
        }
      },
      //是否默认展示所有树
      defaultExpandAll: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data () {
      return {}
    },
    computed: {
      //格式化数据源
      data() {
        if (this.treeStructure) {
          return Utils.treeToArray(this.dataSource, null,null, this.defaultExpandAll);
        }
        return this.dataSource
      }
    },
    methods: {
        //显示行
        showTr(row, index) {
            let show = (row.row._parent ? (row.row._parent._expanded && row.row._parent._show) : true);
            row.row._show = show;
            return show ? '' : 'display:none;'
        },
        //展开下级
        toggle(trIndex) {
            let record = this.data[trIndex]
            record._expanded = !record._expanded
        },
        //显示层级关系空格和图标
        spaceIconShow(index) {
            return !!(this.treeStructure && index === 0);
        },
        //点开展示和关闭的时候,图标的切换
        toggleIconShow(index, record) {
            return !!(this.treeStructure && index === 0 && record.children && record.children.length > 0);
        },
        //编辑
        handleEdit(row) {
            const level = row._level;
            this.$emit('edit', row, level);
        },
        //删除
        handleDelete(row) {
            if (row && row.children && row.children.length > 0) {
                this.$confirm(`该套餐下还存在子产品，确认删除？`)
                    .then(() => {
                        this.$emit('delete', row);
                    })
                    .catch(_ => {
                    });
            } else {
                this.$emit('delete', row);
            }
        },
        handleAdd(row) {
            this.$emit('add', row);
        },
        statusToTag(val) {

        },
        canAdd(row) {
            if (row && row._level && row._level > 1) {
                return true;
            }
            return false;
        },
        transform(colum,data,levelIndex){
            if(colum.mapping){
                return colum.mapping(data,levelIndex);
            }else{
                return data;
            }

        }
    }
  }
</script>
<style scoped>
    .ms-tree-space {
        position: relative;
        top: 1px;
        display: inline-block;
        font-family: 'Glyphicons Halflings';
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        width: 18px;
        height: 14px;
    }

    .ms-tree-space::before {
        content: ""
    }

    table td {
        line-height: 26px;
    }
</style>
