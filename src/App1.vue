<template>
  <div class="wrapper fixed">
    <imp-header></imp-header>
    <nav-side></nav-side>
    <div class="content-wrapper">
      <el-scrollbar tag="div" wrapClass="content-scrollbar">
        <section class="content">
          <div style="min-height: calc(100vh - 200px); ">
            <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
              <router-view></router-view>
            </transition>
          </div>
          <imp-footer style="margin-top: 20px"></imp-footer>
        </section>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
  import impHeader from "./components/Header1.vue"
  import impFooter from "./components/Footer.vue"
  import navSide from "./components/SideMenu2";
  import {mapGetters, mapActions,mapMutations} from 'vuex'
  import 'animate.css'
  export default {
    name: 'app',
    components: {
      impFooter,
      impHeader,
      navSide
    },
    //计算属性
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
        breadcrumbItems: 'breadcrumbItems',
      })
    },
    data: function () {
      return {
      }
    },
    methods: {
    },
    beforeMount () {
    },
    mounted () {
    },
    beforeCreate () {
    } ,
    created () {
    }
  }

</script>

<style scoped>
  .toolbar {
    background: #f2f2f2;
    margin: 65px 0px;
  }
  .breadcrumb_style {
    cursor: pointer;
  }

  .animated {
    animation-duration: .2s;
  }

  blockquote, body, dd, dl, dt, fieldset, figure, h1, h2, h3, h4, h5, h6, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {
    margin: 0;
    padding: 0;
  }

  *,:after, :before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }


  .content-wrapper {
    -webkit-transition: -webkit-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -moz-transition: -moz-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    -o-transition: -o-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
    padding-top: 50px;
  }

  .content-scrollbar{
    height: calc(100vh - 50px);
  }

  .content-wrapper .el-scrollbar__bar.is-vertical{
    display: none;
  }

</style>
