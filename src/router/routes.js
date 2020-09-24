import home from "../pages/home/Home.vue";
import NotFoundView from "../components/NotFound.vue";
import app from "../App.vue";
import login from "../pages/system/Login.vue";
import register from "../pages/system/Register.vue";
import MemberManage from "../pages/system/MemberManage.vue";
import query from "../pages/show/Billing.vue"
import CleanCache from "../pages/system/CleanCache.vue";
import ResetPassword from "../pages/system/ResetPassword.vue";
import UserRelation from "../pages/organization/UserRelation";
import AddRole from "../pages/system/AddRole";
import SIMManage from "../pages/sim/SIMManage";
import SIMActivate from "../pages/sim/SIMActivate";
import SIMRecovery from "../pages/sim/SIMRecovery";
import AddSim from "../pages/sim/AddSim";
import CarEnterpriseManage from "../pages/system/carenterprisemanage/Manage";
import CarEnterpriseRuleManage from "../pages/system/CarEnterpriseRuleManage";
import ApiManager from "../pages/task/ApiManager.vue";
import SimMenuList from "../pages/sim/SimMenuList";

import Login1 from "../pages/carOwner/login";
import App1 from "../App1";
import StateQuery from "../pages/carOwner/stateQuery";
import InfoAuth from "../pages/carOwner/infoAuth";
import BindAccount from "../pages/carOwner/bindAccount";
import CarInfoAuth from "../pages/carOwner/carInfoAuth";
import CarInfoAuth2 from "../pages/carOwner/carInfoAuth2";
import Test from "../pages/carOwner/test";
import ManagerReportView from "../pages/dataview/ManagerReportView"
import CarReportView from "../pages/dataview/CarReportView"
import CarDataReportView from "../pages/dataview/CarDataReportView"
import RoleManage from "../pages/system/RoleManage";
import SysUserManage from "../pages/system/UserManage";
import PeimissionManage from "../pages/system/PermissionManage";
import PoolManage from "../pages/system/ManagePool.vue";
import PackageAllowanceReport from '../pages/report/PackageAllowanceReport.vue'
import CompanyOrderManage from "../pages/system/carenterprisemanage/OrderManage";
import RoleQuery from "../pages/system/carenterprisemanage/RoleQuery";
import APNManage from "../pages/sim/APNManage";
import ServiceManage from "../pages/sim/ServiceManage";
import OrderDataPool from '../pages/datapool/OrderDataPool'
import DataPoolManage from '../pages/datapool/DataPoolManage'
import NewReport from "../pages/dataview/NewReport"
// import UserManage from '../pages/system/carenterprisemanage/UserOrderManage';
import EnterpriseBusinessList from "../pages/enterprise/EnterpriseBusinessList";
import UserManage from '../pages/system/carenterprisemanage/UserOrderManage';
import UpDataPoolManager from '../pages/system/UpDataPoolManager';
import AssignRoles from  "../pages/system/AssignRoles";
import UpDataUnitMapManager from '../pages/system/UpDataUnitMapManager';
import CarEnterpriseCertification from '../pages/system/carenterprisemanage/CarEnterpriseCertification';
import CarUserCertification from '../pages/system/carenterprisemanage/CarUserCertification';
import EnterpriseAPNManage from "../pages/enterprise/APNManager";
import Payment from "../pages/system/Payment";
import Recharge from "../pages/system/Recharge";
import UserManagerReportView from "../pages/dataview/UserManagerReportView";

// Routes
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: login

  },
  {
    path: '/login1',
    component: Login1
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/resetPass',
    component: ResetPassword
  },
  // {
  //   path: '',
  //   component:App1,
  //   redirect: '/stateQuery',
  //   children: [
  //     // {path: '/home1', component: Home1, name: '首页'},
  //     {path: '/stateQuery',component:StateQuery,name:'实名状态查询'},
  //     {path: '/authInfo',component:InfoAuth,name:'实名认证'},
  //     {path:'/bindAccount',component:BindAccount,name:'账号绑定'},
  //     {path:'/carInfoAuth',component:CarInfoAuth,name:'车企账号'},
  //     // {path:'/carInfoAuth/carInfoAuth2',component:CarInfoAuth2,name:'车企实名认证'},
  //     {path:'/imageTest',component:Test,name:'图片'}
  //   ]
  // },
  {
    path: '',
    component: app,
    meta: {auth: true},
    children: [
      {path: '/home', component: home, name: '首页'},

      {path: '/user-manage', component:MemberManage, name:'成员管理'},

      //路由跳转的中间组件
      {path: '/clean-cache', component:CleanCache, name:'清除缓存'},
      {path: '/user-relation', component:UserRelation, name:'人员组织关系'},
      {path:'/add-role',component:AddRole,name:'添加用户'},
      {path: '/system/sim-manage', component:SIMManage, name:'SIM管理'},
      {path: '/system/sim-recovery', component:SIMRecovery, name:'SIM卡回收'},
      {path: '/system/sim-activate', component:SIMActivate, name:'SIM卡激活'},
      {path: '/system/add-sim', component:AddSim, name:'SIM卡添加'},
      {path: '/sim/apn-manage', component:APNManage, name:'APN管理'},
      {path: '/sim/business-manage', component:ServiceManage, name:'业务管理'},

      {path: '/system/car_enterprise_manage', component:CarEnterpriseManage, name:'车企管理'},
        {path: '/system/car_enterprise_certification', component:CarEnterpriseCertification, name:'车企实名认证页面'},
        {path: '/system/car_user_certification', component:CarUserCertification, name:'车主实名认证'},
      {path: '/enterprise/business-list', component:EnterpriseBusinessList, name: '车企套餐订购'},
      {path: '/enterprise/apn-manager', component:EnterpriseAPNManage, name: '车企APN管理'},

      {path: '/tasks/api-manager', component:ApiManager, name: 'API管理'},
      {path: '/sim/sim_menu_list', component:SimMenuList, name: 'SIM套餐列表'},
      {path: '/role-manage', component:RoleManage, name: '角色管理'},
      {path: '/sys-user-manage', component:SysUserManage, name: '用户管理'},
      {path: '/peimission-manage', component:PeimissionManage, name: '权限管理'},
      {path: '/assign-roles', component:AssignRoles, name: '角色分配'},
      {path: '/manager-report-view', component:ManagerReportView, name: '运营商视图业务统计'},
      {path: '/user-manager-report-view', component:UserManagerReportView, name: '车主通信业务统计'},

      {path: '/car-report-view', component:CarReportView, name: '车企视图总数据统计'},
        {path: '/manage-data-report-view', component:CarDataReportView, name: '运营商视图流量统计'},
       {path: '/system/data-pool-manage', component:DataPoolManage, name: '流量池管理'},
      {path: '/system/pool-order', component:UpDataPoolManager, name: '流量池订购'},
        {path: '/system/order-data-pool', component:OrderDataPool, name: '新增流量池订购'},

      {path: '/info-auth', component:CarInfoAuth,name:'车企实名认证'},
      {path: '/info-auth/car-auth',component:CarInfoAuth2,name:'车企实名认证步骤'},
      {path: '/report/package-allowance', component:PackageAllowanceReport, name:'套餐余量统计'},

        //套餐管理
        {path: '/system', component:query, name:'套餐管理'},
        {path: '/system/company-order-manage', component: CompanyOrderManage, name: '车企套餐管理'},
        {path: '/system/pool-manage', component:PoolManage, name: '车企流量池管理'},
        {path: '/system/car_enterprise_rule_manage', component:CarEnterpriseRuleManage, name:'车企套餐规则管理'},
        {path: '/system/user-order-manage', component: UserManage, name: '车主套餐管理'},
        {path: '/system/payment', component: Payment, name: '缴费'},
        {path: '/system/recharge', component: Recharge, name: '充值'},

      {path: '/system/role-query', component: RoleQuery, name: '规则查询'},


        {path: '/stateQuery',component:StateQuery,name:'实名状态查询'},
        {path: '/authInfo',component:InfoAuth,name:'实名认证'},
        {path:'/bindAccount',component:BindAccount,name:'账号绑定'},
        {path:'/carInfoAuth',component:CarInfoAuth,name:'车企账号'},
        {path:'/imageTest',component:Test,name:'图片'},
        {path: '/report/newReport', component:NewReport, name: '业务使用分析'},
        {path: '/system/data-unit-map', component:UpDataUnitMapManager, name: '套餐计量映射管理'},
    ]
  },
  {path: '*', component: NotFoundView}
];


export default routes
