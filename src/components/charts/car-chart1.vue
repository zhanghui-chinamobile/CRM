<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart">
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    props: {
      className: {
        type: String,
        default: 'yourClassName'
      },
      id: {
        type: String,
        default: 'yourID'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '180px'
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart();
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$refs.myEchart);
        // 把配置和数据放这里
        this.chart.setOption({
          title: {
            text: '按天流量使用'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: ['11-1', '11-2', '11-3', '11-4', '11-5', '11-6', '11-7'],
          },
          yAxis: {
            type: 'value',
            name: '流量',
            axisLabel: {
              formatter: '{value} M'
            }
          },
          series: [{
            name: '流量',
            data: [200, 230, 100, 500, 400, 450, 370],
            type: 'line'
          }]
        })
      }
    }
  }
</script>
