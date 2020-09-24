<template>
  <section>
      <el-row>
        <el-col :span="6">
            <div id="left" class="char_left"></div>
        </el-col>
        <el-col :span="18">
            <div id="right" class="char_right"></div>
        </el-col>
    </el-row>
  </section>
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons');
    export default {
        name: "DataCharView",
        computed:{
        },
        data(){
          return {
            viewData:this.parentViewData
          }
        },
        mounted(){
          this.$nextTick(this.drawAll)
        },
        methods:{
          drawAll(){
            this.drawBarLeft()
            this.drawBarRight()
          },
          drawBarLeft(){
            this.charts = echarts.init(document.getElementById("left"),'macarons')
            this.charts.setOption({
                title: {
                    text: '上下行总流量',
                },
                tooltip: {
                    trigger: 'item'
                },
                calculable: true,
                grid: {
                    borderWidth: 0,
                    y: 80,
                    y2: 60
                },
                xAxis: [
                    {
                        type: 'category',
                        show: true,
                        data: ['已使用上行流量', '已使用下行流量']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        show: true
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList = [
                                        '#FF6666','#99CC33',
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{c}M'
                                }
                            }
                        },
                        data: [this.viewData.left.up,this.viewData.left.down],
                    }
                ]
            })
          },
          drawBarRight(){
            this.charts = echarts.init(document.getElementById("right"))
            this.charts.setOption({
                title : {
                    text: '分类统计',
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['上行流量','下行流量']
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : this.viewData.right.unit
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'上行流量',
                        type:'bar',
                        data: this.viewData.right.up,
                        itemStyle: {normal: {color:'#FF6666', label: {show: true, position: 'top',color:'black'}}},

                    },
                    {
                        name:'下行流量',
                        type:'bar',
                        data:this.viewData.right.down,
                        itemStyle: {normal: {color:'#99CC33', label: {show: true, position: 'top',color:'black'}}},
                    }
                ]
            })
          }
        },
        props:[
          'parentViewData'
        ],
        watch:{
          parentViewData:function(newEditObjId){
            this.viewData = newEditObjId;
            this.drawAll();
          }
        }
    }
</script>

<style>
  .char_left{
    height: 600px;
  }
  .char_right{
    height: 600px;
  }
  .table-form{
    padding-top: 20px;
  }
</style>
