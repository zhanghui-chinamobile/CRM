<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item :index="(index + 1).toString()" v-for="(item,index) in routerData" :key="index + 1">
        <router-link :to="item.link" style="text-decoration: none">
          {{item.name}}
        </router-link>
      </el-menu-item>
    </el-menu>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item  v-for="(item,index) in routerData" :key="index + 1" :index="(index+1).toString()">
          <router-link :to="item.link" style="text-decoration: none">
            {{item.name}}
          </router-link>
        </el-menu-item>
    </el-menu>
  </div>

</template>
<script>
  import ElSubmenu from "element-ui/packages/menu/src/submenu";
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        routerData:[
          {
            name:'个人中心',
            link:'/stateQuery',
          },
          {
            name:'账号绑定',
            link:'/bindAccount',
          },
        ],
      };
    },
    components: {
      ElSubmenu

    },
    computed: {
    },
    mounted () {

    },
    created() {
      console.log(123);
      console.log('this.$router',this.$router.history.current.fullPath);
      for(let i=0;i<this.routerData.length;i++) {
        if(this.$router.history.current.fullPath.indexOf(this.routerData[i].link) != -1) {
          this.activeIndex = (i + 1).toString();
          this.activeIndex2 = (i + 1).toString();
          console.log(12309);
          break;
        }
      }

    },
    methods: {
      handleSelect(key, keyPath) {
      }
    }
  }
</script>
<style>
</style>
