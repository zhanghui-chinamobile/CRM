<template>
  <section>
  <el-col :span="24" class="toolbar">
    <el-row style="background: #f2f2f2;">
      <el-form :inline="true" :model="conditions" ref="conditions" size="small"  style="padding-top: 20px;padding-left: 10px">
        <el-form-item label="套餐名称" prop="offerName">
          <el-input v-model="conditions.offerName" placeholder="请输入套餐名称" ref="inputOfferName"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <c-select :select="selectTypeData" v-model="conditions.offerType"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="addOffer">新增套餐</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </el-col>
  <tree-table :data="data" :columns="columns"  :table="tableData"  @onHandleSelectChange="handleSelected" >
    <template  slot-scope="props" slot="button-operation">
         <el-form size="mini">
          <el-form-item>
            <el-button type="primary" size="mini" @click="suspend" >暂停/恢复</el-button>
            <el-button type="primary" size="mini">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini">规则映射</el-button>
            <el-button type="primary" size="mini">修改</el-button>
          </el-form-item>
         </el-form>
    </template>
   </tree-table>
  </section>
</template>
<script>
  import treeTable from "./TreeGrid"
  import {timestampToFullDate} from "../../common/date";
  import CTable from '../../components/Table.vue';
  import CSelect from '../../components/Select.vue';
  import {mapMutations} from 'vuex';
  import types from "../../store/mutation-types";
  import CTaskFlow from "../task/TaskFlow";

  export default {
    components: {
      treeTable,
      CTable,
      CSelect,
      CTaskFlow
    },
    data() {
      return {
        conditions: {
          offerName: '',
          offerType:'',
        },

        selectTypeData: {
          options:[
            {
              value:"1",
              text:"语音套餐",
            },{
              value:"2",
              text:"流量套餐",
            },{
              value:"3",
              text:"优惠套餐",
            }
          ],
          clearable:true,
          placeholder:"请选择套餐类型",
        },


        columns: [
          {
            text: "业务名称",
            value: "busiName",
            width: 200
          },
          {
            text: "类型",
            value: "offerType"
          },
          {
            text: "生效时间",
            value: "effectiveTime"
          },
          {
            text: "失效时间",
            value: "expireTime"
          },
          {
            text: "状态",
            value: "state"
          }
        ],
        data: [
          {
            offerType: "套餐",
            busiName: "优惠套餐1",
            effectiveTime: "2018/11/15 00:00:00",
            expireTime: "2099/12/21 23:59:59",
            state: "正常",
            children: [
              {
                offerType: "产品",
                busiName: "产品1",
                effectiveTime: "2018/11/15 00:00:00",
                expireTime: "2099/12/21 23:59:59",
                state: "正常",
                children: [
                  {
                    offerType: "属性",
                    busiName: "属性1",
                    effectiveTime: "2018/11/15 00:00:00",
                    expireTime: "2099/12/21 23:59:59",
                    state: "正常",
                  },
                  {
                    offerType: "属性",
                    busiName: "属性2",
                    effectiveTime: "2018/11/15 00:00:00",
                    expireTime: "2099/12/21 23:59:59",
                    state: "正常",
                  }
                ]
              }
            ]
          }
        ],

        tableData: {
          loading:false,
          hasSelect:false,
          data:[
            {
              apiCode:'query',
              apiType:'查询',
              effectiveTime: '2018-11-14',
              expireTime: '2099-12-31',
              bindType:'',
              secretKey:'AAAAAAAAAAAAAAAAA',
              operation:''
            },
            {
              apiCode:'modify',
              apiType:'修改',
              effectiveTime: '2018-11-14',
              expireTime: '2099-12-31',
              bindType:'',
              secretKey:'BBBBBBBBBBBBBBB',
              operation:''
            }
          ],
          columns:[
            {
              label:"API编码",
              props:"apiCode",
              show:true
            },
            {
              label:"API类型",
              props:"apiType",
              show: true,
              width: 150
            },
            {
              label:"状态",
              props:"bindType",
              show:true,
              width:120
            },
            {
              label:"生效时间",
              props:"effectiveTime",
              show:true,
              width:170
            },
            {
              label:"失效时间",
              props:"expireTime",
              show:true,
              width:170
            },
            {
              label:"密钥（可点击查看详情）",
              props:"secretKey",
              show: true,
              width: 120
            }
          ],
          hasOperation: true,
          hasOperationTemplate: true,
          operation: {
            label:"操作",
            id:"1",
            data:[
            ]
          }
        },
        operateRow:""/*对数据进行增删改下载时需要用到的id是一个数组*/
      };
    },

    methods: {
      suspend(){
        return;
      },
      addOffer() {
        return;
      },

      handleSelected(row, event, column) {
        this.operateRow = row;
        //alert(this.operateRow.offerType);
/*        alert(column.id);
        this.operateRow=[];
        if(selectedRow.length>0)
        {
          for (let i=0;i<row.length;i++) {
            /!*获取选中数据行的id*!/
            alert(row[i].id);
            this.operateRow[i] = row[i];
          }
        }*/
      },

      ...mapMutations({
        setBreadcrumbItems: types.SET_BREADCRUMB_ITEMS,
      })
    },
    mounted() {
      let itmes = [
        {
          name:"车主套餐管理",
          icon:"fa fa-tasks",
          path:"/tasks/my-reviewed",
        },
      ];
      this.setBreadcrumbItems(itmes);
    }
  }

</script>
<style>


</style>
