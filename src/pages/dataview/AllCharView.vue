<template>
  <section>
    <el-row>
      <el-col :span="6">
        <el-row>
          <div id="voice" class="char_pine"></div>
        </el-row>
        <el-row>
          <div id="data" class="char_pine"></div>
        </el-row>
        <el-row>
          <div id="message" class="char_pine"></div>
        </el-row>
      </el-col>
      <el-col :span="18">
        <div id="bar" class="char_bar"></div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons');
    export default {
        name: "CharView",
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
          this.drawBarChar('bar')
          this.drawPine("voice",'#5AC7F4',"分钟")
          this.drawPine("data",'#FF8F8F',"M")
          this.drawPine("message",'#7ED321',"条")
        },
          drawBarChar(id){
          this.charts = echarts.init(document.getElementById(id),'macarons')
          this.charts.setOption({
              title : {
                  text: '数据统计',
              },
              tooltip : {
                  trigger: 'axis'
              },
              legend: {
                  data:[
                      '语音总量','流量总数','短信总量','',
                      '语音使用','流量使用','短信使用'
                  ]
              },
              calculable : true,
              grid: {y: 70, y2:30, x2:20},
              xAxis : [
                  {
                      type : 'category',
                      data : this.viewData.bar.unit,
                  },
                  {
                      type : 'category',
                      axisLine: {show:false},
                      axisTick: {show:false},
                      axisLabel: {show:false},
                      splitArea: {show:false},
                      splitLine: {show:false},
                      data : this.viewData.bar.unit
                  }
              ],
              yAxis : [
                  {
                      type : 'value',
                      axisLabel:{formatter:'{value}'}
                  }
              ],
              series : [

                  {
                      name:'语音总量',
                      type:'bar',
                      xAxisIndex:1,
                      itemStyle: {normal: {color:'rgba(139,134,130,0.2)', label:{show:true,position: 'top',color:'black'}}},
                      data:this.viewData.bar.voice.total,
                  },
                  {
                      name:'流量总数',
                      type:'bar',
                      xAxisIndex:1,
                      itemStyle: {normal: {color:'rgba(139,134,130,0.2)', label:{show:true,position: 'top',color:'black'}}},
                      data:this.viewData.bar.data.total
                  },
                  {
                      name:'短信总量',
                      type:'bar',
                      xAxisIndex:1,
                      itemStyle: {normal: {color:'rgba(139,134,130,0.2)', label:{show:true,position: 'top',color:'black'}}},
                      data:this.viewData.bar.message.total
                  },
                  {
                      name:'语音使用',
                      type:'bar',
                      itemStyle: {normal: {color:'#5AC7F4', label:{show:true,position: 'inside',color:'black'}}},
                      data:this.viewData.bar.voice.use
                  },
                  {
                      name:'流量使用',
                      type:'bar',
                      itemStyle: {normal: {color:'#FF8F8F', label:{show:true,position: 'inside',color:'black'}}},
                      data:this.viewData.bar.data.use
                  },
                  {
                      name:'短信使用',
                      type:'bar',
                      itemStyle: {normal: {color:'#7ED321', label:{show:true,position: 'inside',color:'black'}}},
                      data:this.viewData.bar.message.use
                  }
              ]
          })
        },
        drawPine(id,color,unit){
          this.charts = echarts.init(document.getElementById(id))
          this.charts.setOption({
            title: {
              text: this.viewData.pine[id].title,
              x: 'center',
              y: 'center',
              itemGap: 20,
              textStyle : {
                color : 'rgba(30,144,255,0.8)',
                fontFamily : '微软雅黑',
                fontSize : 15,
                fontWeight : 'bolder'
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c}"+unit+" ({d}%)"
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data:['未使用','已使用']
            },
            series: [
              {
                name:'流量',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },

                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:[
                    {value:this.viewData.pine[id].notuse, name:'未使用'},
                    {value:this.viewData.pine[id].use, name:'已使用'}
                ],
                color:['#f2f2f2',color]
              }
            ],
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
    .char_bar{
        height: 600px;
    }
    .char_pine{
        height: 200px;
    }
</style>
