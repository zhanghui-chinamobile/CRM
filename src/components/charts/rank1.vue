<template>
  <section>
    <div class="car-user-rank">
      <el-row style="margin: 0">
          <span style="font-weight: bold;font-size: 20px">成员数量排行榜</span>
      </el-row>
      <el-row>
        <el-col style="width: 50%">
          <div class="rank-num-icon">1</div>
          <span>MINI</span>
        </el-col>
        <el-col class="car-user-rank-col">
          <span>2390</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="width: 50%">
          <div class="rank-num-icon">2</div>
          <span>奥迪</span>
        </el-col>
        <el-col class="car-user-rank-col">
          <span>2220</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="width: 50%">
          <div class="rank-num-icon">3</div>
          <span>宝马</span>
        </el-col>
        <el-col class="car-user-rank-col">
          <span>2019</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="width: 50%">
          <div class="rank-num-icon1">4</div>
          <span>大众</span>
        </el-col>
        <el-col class="car-user-rank-col">
          <span>1980</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="width: 50%">
          <div class="rank-num-icon1">5</div>
          <span>别克</span>
        </el-col>
        <el-col class="car-user-rank-col">
          <span>1700</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="width: 50%">
          <div class="rank-num-icon1">6</div>
          <span>本田</span>
        </el-col>
        <el-col class="car-user-rank-col">
          <span>1598</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="width: 50%">
          <div class="rank-num-icon1">7</div>
          <span>现代</span>
        </el-col>
        <el-col class="car-user-rank-col">
          <span>1590</span>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
    export default {
        name: "rank1"
    }
</script>

<style scoped>
  .car-user-rank .el-row{
    margin-top: 20px;
  }

  .car-user-rank .el-row .el-col span{
    line-height: 20px;
  }

  .car-user-rank-col{
    text-align: right;
    width: 50%;
  }

  .rank-num-icon{
    width:20px;
    height:20px;
    line-height:20px;
    border-radius:10px;
    font-size:12px;
    background:#314659;
    color:#fff;
    text-align: center;
    display: inline-block;
    margin-right: 20px;
  }

  .rank-num-icon1{
    width:20px;
    height:20px;
    line-height:20px;
    border-radius:10px;
    font-size:12px;
    background:#f5f5f5;
    color:#000;
    text-align: center;
    display: inline-block;
    margin-right: 20px;
  }
</style>
