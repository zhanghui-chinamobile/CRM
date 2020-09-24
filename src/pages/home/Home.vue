<template>
  <section>
    <div v-if="isCarChart == false">
      <el-row style="margin-top: 10px">
          <el-col :span="6" class="card-col">
            <el-card class="box-card">
                <chart1></chart1>
            </el-card>
          </el-col>
          <el-col :span="6" class="card-col">
              <el-card class="box-card">
                  <chart2></chart2>
              </el-card>
          </el-col>
          <el-col :span="6" class="card-col">
              <el-card class="box-card">
                  <chart3></chart3>
              </el-card>
          </el-col>
          <el-col :span="6" class="card-col">
              <el-card class="box-card" style="margin: 0">
                  <chart4></chart4>
              </el-card>
          </el-col>
      </el-row>
      <el-card class="box-card" style="height: 400px;margin-top: 20px;width: 100%;background-color: #fff">
        <el-col style="width: 70%" class="card-col">
            <chart5></chart5>
        </el-col>
        <el-col style="width: 30%" class="card-col">
            <rank1></rank1>
        </el-col>
      </el-card>
    </div>

    <div v-if="isCarChart == true">
      <el-row style="margin-top: 10px">
        <el-col :span="6" class="card-col">
          <el-card class="box-card">
            <car-chart1></car-chart1>
          </el-card>
        </el-col>
        <el-col :span="6" class="card-col">
          <el-card class="box-card">
            <car-chart2></car-chart2>
          </el-card>
        </el-col>
        <el-col :span="6" class="card-col">
          <el-card class="box-card">
            <car-chart3></car-chart3>
          </el-card>
        </el-col>
        <el-col :span="6" class="card-col">
          <el-card class="box-card" style="margin: 0">
            <car-chart4></car-chart4>
          </el-card>
        </el-col>
      </el-row>
      <el-card class="box-card" style="height: 400px;margin-top: 20px;width: 100%;background-color: #fff">
        <el-col style="width: 50%" class="card-col">
          <car-chart5></car-chart5>
        </el-col>
        <el-col style="width: 50%" class="card-col">
          <CarChart6></CarChart6>
        </el-col>
      </el-card>
    </div>
  </section>
</template>

<script>
  import {mapMutations} from 'vuex';
  import types from "../../store/mutation-types";
  import CardInfo from "./CardInfo";
  import Chart1 from '../../components/charts/chart1';
  import Chart2 from '../../components/charts/chart2';
  import Chart3 from '../../components/charts/chart3';
  import Chart4 from '../../components/charts/chart4';
  import Chart5 from '../../components/charts/chart5';
  import Rank1 from '../../components/charts/rank1';
  import CarChart1 from '../../components/charts/car-chart1';
  import CarChart2 from '../../components/charts/car-chart2';
  import CarChart3 from '../../components/charts/car-chart3';
  import CarChart4 from '../../components/charts/car-chart4';
  import CarChart5 from '../../components/charts/car-chart5';
  import CarChart6 from '../../components/charts/car-chart6';

  export default {
    components: {
      CardInfo,
      Chart1,
      Chart2,
      Chart3,
      Chart4,
      Chart5,
      Rank1,
      CarChart1,
      CarChart2,
      CarChart3,
      CarChart4,
      CarChart5,
      CarChart6
    },
    data() {
      return {
        visible:false,
        homeData:{},
        isCarChart:false,
      }
    },
    methods: {
      ...mapMutations({
        setBreadcrumbItems: types.SET_BREADCRUMB_ITEMS,
      }),
      clickToTask(routerType) {
        let router = "";
        if(routerType == "pass") {
          router = "/tasks/my-reviewed";
        } else if(routerType == "review") {
          router = "/tasks/my-review-waiting";
        } else if(routerType == "back") {
          router = "/tasks/my-reviewed"
        }
        this.$router.push(router);
      },
      goToAppItem(item) {
        this.$router.push({
          path: `/apps/${item.appId}/configs`,
        })
      },
      goToApp() {
        this.$router.push({
          path: `/apps`,
        })
      },
      getHomePageData() {
        this.$http.getHomePageData().then(res => {
          this.homeData = res.data.result;
          if(!res.data.result.appInfos) {
            this.homeData.appInfos = [];
          }
        }).catch(err => {
          console.log('err',err);
        })
      }
    },
    computed: {
      userInfo() {
        return this.$store.getters.userInfo;
      }
    },
    created() {
      //this.getHomePageData();
      let items = [
         {
          name:"主页",
          icon:"fa fa-home",
          path:"/home",
        }
      ];
      this.setBreadcrumbItems(items);

      if (this.userInfo.userType == 2){
        this.isCarChart = true;
      }
    },
    mounted() {

    }
  }
</script>

<style scoped lang="less">
  .card-col > .el-card {
    min-height: 200px;
      margin-right: 10px;
  }
  .card-col > .el-card /deep/ .el-card__header {
    background: #fffbe6;
  }

  .hover_click {
    color: rgba(0,0,0,.85);
    transition: all .3s;
    font-weight: 400;

  &:hover{
     cursor: pointer;
     color: #09A8FA;
   }
  }
</style>
