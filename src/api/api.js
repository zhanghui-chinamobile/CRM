import axios from "../common/axios";

//写绝对地址
let base = '/iov';

//登录
export const requestLogin = params => { return axios.post(`${base}/oa/login`, params) };
//登出
export const requestLogout = params => { return axios.post(`${base}/oa/logout`, params) };
//菜单
export const getMenuList = params => { return axios.post(`${base}/oa/menu-tree`, params) };

//获取下拉框的数据
export const getSelectData = (params) => { return axios.get(`${base}/data/getSelectData?key=${params}`) };

//用户管理
//获得所有的用户
export const getUserListPage = params => { return axios.post(`${base}/user/getUserInfoAndRole`, params) };
//注册
export const postRegister = params => { return axios.post(`${base}/user/register`, params) };
//注销账户
export const closeAccount = params => { return axios.post(`${base}/user/closeAccount`, params) };
//审核用户
export const auditAccount = params => { return axios.post(`${base}/user/auditAccount`, params) };
//获取验证码
export const getAuthCode = params => { return axios.get(`${base}/user/getAuthCode` + params) };
//清理缓存
export const cleanCache = params => { return axios.post(`${base}/data/cleanCache`, params) };

//获取所有用户列表
export const getUserList = params => { return axios.post(`${base}/user/getUserList`, params) };

//更新基本信息
export const updateUserInfo = params => { return axios.post(`${base}/user/updateUserInfo`, params) };
//更新密码
export const updatePassword = params => { return axios.post(`${base}/user/updatePassword`, params) };
//重置密码
export const resetPassword = params => { return axios.post(`${base}/user/resetPassword`, params) };

//获取用户操作日志
export const getOperateLog = params => { return axios.post(`${base}/log/getOperateLog`, params) };

//应用管理
//应用的新增
export const createApp = params => { return axios.post(`${base}/app/createApp`, params) };
//获取应用
export const getMyApps = params => { return axios.post(`${base}/app/getMyApps`, params) };
//删除应用POST /center/app/delApp
export const deleteApp = params => { return axios.post(`${base}/app/delApp`, params) };
//应用的修改POST /center/app/modApp
export const updateApp = params => {return axios.post(`${base}/app/modApp`, params)};
//应用添加用户/center/app/addUser
export const appAddUser = params => {return axios.post(`${base}/app/addUser`, params)};
//应用修改用户角色/center/app/modUser
export const appModUser = params => {return axios.post(`${base}/app/modUser`, params)};

//环境管理
//环境的新增POST /center/appEnv/createAppEnv
export const createAppEnv = params => {return axios.post(`${base}/appEnv/createAppEnv`, params)};
//获取环境POST /center/appEnv/getAppEnv
export const getAppEnvs = params => {return axios.post(`${base}/appEnv/getAppEnv`,params)};
//删除环境POST /center/appEnv/deleteAppEnv
export const deleteAppEnv = params => {return axios.post(`${base}/appEnv/deleteAppEnv`,params)};
//修改环境POST /center/appEnv/updateAppEnv
export const updateAppEnv = params => {return axios.post(`${base}/appEnv/updateAppEnv`, params)};

//消息处理
//消费消息
export const consumeNotification = params => { return axios.post(`${base}/notify/consumeNotification`, params) };
//获取消息
export const getNotificationInfo = params => { return axios.post(`${base}/notify/getNotificationInfo`, params) };

//应用人员的管理
//获取人员POST /center/app/getAppUsers
export const getAppUsers = params => {return axios.post(`${base}/app/getAppUsers`, params)};
//删除对应的人员POST /center/app/delUser
export const deleteAppUser = params => {return axios.post(`${base}/app/delUser`, params)};


//配置文件的管理
//配置文件列表的查询/center/configFile/getConfigFiles
export const getFileConfigs = params => {return axios.post(`${base}/configFile/getConfigFiles`,params)};
//单个配置文件的删除/center/configFile/delConfigFile
export const deleteConfigFile = params => {return axios.post(`${base}/configFile/delConfigFile`,params)};
//替换配置文件/center/configFile/upConfigFileAndUpdate
export const upConfigFileAndUpdate = params => {return axios.post(`${base}/configFile/upConfigFileAndUpdate`,params)};
//复制配置文件/center/configFile/copyConfigFile
export const copyConfigFile = params => {return axios.post(`${base}/configFile/copyConfigFile`,params)};
//批量配置文件的删除/center/configFile/
export const batchDeleteConfigFile = params => {return axios.post(`${base}/configFile/delConfigFile`,params)};
//单个文件上传/center/configFile/upConfigFileAndCreate
export const uploadConfigFile = params => {return axios.post(`${base}/configFile/upConfigFileAndCreate`,params)};
//压缩文件上传/center/configFile/upConfigFileZipAndCreate
export const uploadConfigFileYaSuo = params => {return axios.post(`${base}/configFile/upConfigFileZipAndCreate`,params)};
//获取配置文件的内容POST /center/configFile/getConfigFilesContent
export const getConfigFilesContent = params => { return axios.post(`${base}/configFile/getConfigFilesContent`, params)};
//在线编辑配置文件保存 POST /center/configFile/saveConfigFileContent
export const saveConfigFileContent = params => { return axios.post(`${base}/configFile/saveConfigFileContent`, params)};
//获取配置文件历史版本信息POST /center/configFile/getFileHis
export const getFileHistory = params => { return axios.post(`${base}/configFile/getFileHis`, params)};
//获取指定配置文件最新版本内容
export const getConfigFileLastVersion = params => { return axios.post(`${base}/configFile/getLastVersion`, params)};
//获取临时配置文件
export const getTempFileContent = params =>{ return axios.post(`${base}/configFile/getTempFileContent`, params) };
//获取压缩包配置文件center/configFile/getAllConfigFile
export const getAllConfigFile = params =>{ return axios.get(`${base}/configFile/getAllConfigFile?envId=`+ params) };
//修改配置文件策略/center/configFile/changeStrategy
export const changeStrategy = params =>{ return axios.post(`${base}/configFile/changeStrategy`, params) };


//实例的管理
//实例的查询POST /center/ins/getIns
export const getInstances = params => {return axios.post(`${base}/ins/getIns`, params)};
//查看实例的文件POST /center/ins/getInsConfigInfo
export const getInstancesConfigInfo = params => {return axios.post(`${base}/ins/getInsConfigInfo`,params)};
//移除断开的实例POST /center/ins/deleteIns
export const deleteInstance = params => {return axios.post(`${base}/ins/deleteIns`, params)};

//配置管理
//上传文件的接口
export const uploadFile = params => {return axios.post(`${base}/configFile/uploadConfigFile`,params)};
//配置项查询
export const getConfigItems = params => { return axios.post(`${base}/configItem/getConfigItems`, params) };
//配置项新增
export const addConfigItem = params =>{ return axios.post(`${base}/configItem/addConfigItem`, params)};
//配置项删除
export const delConfigItem = params =>{ return axios.post(`${base}/configItem/delConfigItem`, params)};
//配置项修改
export const modConfigItem = params =>{ return axios.post(`${base}/configItem/modConfigItem`, params)};
//配置项复制
export const copyConfigItem = params =>{ return axios.post(`${base}/configItem/copyConfigItem`, params)};
//获取历史配置项
export const getConfigItemHis = params =>{ return axios.post(`${base}/configItem/getConfigItemHis`, params) };
//获取指定版本配置项
export const getVersionContent = params =>{ return axios.post(`${base}/configItem/getVersionContent`, params) };
//根据配置查询实例POST /center/ins/getInsByConfig
export const getInsByConfig = params => {return axios.post(`${base}/ins/getInsByConfig`, params)};


//待提交任务
//获取用户当前环境下的待提交任务POST /center/task/getConfigTask
export const getConfigTaskDetail = params => {return axios.post(`${base}/task/getConfigTaskDetail`, params)};
export const getPushTaskDetail = params => {return axios.post(`${base}/task/getPushTaskDetail`, params)};
//获取下一审核节点所有可选审核人信息/center/task/getNextOperatorInfo
export const getNextOperatorInfo = params => {return axios.post(`${base}/task/getNextOperatorInfo`, params)};
//提交任务POST /center/task/submitTask
export const submitTask = params => {return axios.post(`${base}/task/submitTask`, params)};
//获取我提交的所有任务
export const getSubmitTask = params => {return axios.post(`${base}/task/getSubmitTask`, params)};
//获取等待审核的所有任务
export const getInReviewTask = params => {return axios.post(`${base}/task/getInReviewTask`, params)};
//获取所有已审核任务
export const getReviewedTask = params => {return axios.post(`${base}/task/getReviewedTask`, params)};

export const queryAllApis = params => {return axios.post(`${base}/api/queryAllApis`, params)};
export const saveCarApiRels = params => {return axios.post(`${base}/api/saveCarApiRels`, params)};
//审核任务
export const dealTask = params => {return axios.post(`${base}/task/dealTask`, params)};
//获取任务流程
export const getTaskFlow = params => {return axios.get(`${base}/task/getTaskFlow` + params)};
//撤销待提交任务 POST /center/task/rollbackTask
export const rollbackTask = params => {return axios.post(`${base}/task/rollbackTask`, params)};
//撤销修改文件方式POST /center/task/rollbackTaskDetail
export const rollbackTaskDetail = params => {return axios.post(`${base}/task/rollbackTaskDetail`, params)};
//获取配置策略变更任务详情
export const getStrategyChangeDetail = params => {return axios.get(`${base}/task/getStrategyChangeDetail` + params)};
//获取配置内容变更任务详情
export const getConfigChangeDetail = params => {return axios.get(`${base}/task/getConfigChangeDetail` + params)};
//getTaskTimeAndIns
export const getTaskTimeAndIns= params => {return axios.post(`${base}/task/getTaskTimeAndIns`, params)};

//刷新策略
//创建更新策略POST /center/strategy/createUpdateStrategy
export const createUpdateStrategy = params => {return axios.post(`${base}/strategy/createUpdateStrategy`, params)};
//创建更新策略(构造器) POST /center/strategy/createStrategyConstructor
export const createStrategyConstructor = params => {return axios.post(`${base}/strategy/createStrategyConstructor`, params)};
//创建更新策略(类变量)POST /center/strategy/createStrategyField
export const createStrategyField = params => {return axios.post(`${base}/strategy/createStrategyField`, params)};
//创建更新策略(方法)POST /center/strategy/createStrategyMethod
export const createStrategyMethod = params => {return axios.post(`${base}/strategy/createStrategyMethod`, params)};
//更新策略步骤（步数、参数值）POST /center/strategy/POST /center/strategy/updateStrategyStepNums
export const updateStrategyStepNums = params => {return axios.post(`${base}/strategy/updateStrategyStepNums`, params)};
//查询策略POST /center/strategy/queryStrategy
export const queryStrategy = params => {return axios.post(`${base}/strategy/queryStrategy`,params)};
//根据策略主键查询策略所有信息(包括步骤)POST /center/strategy/getUpdateStrategyAllInfo
export const getUpdateStrategyAllInfo = params => {return axios.post(`${base}/strategy/getUpdateStrategyAllInfo`,params)};
//删除策略POST /center/strategy/deleteConfigUpdateStrategy
export const deleteConfigUpdateStrategy = params => {return axios.post(`${base}/strategy/deleteConfigUpdateStrategy`,params)};
//删除策略步骤POST /center/strategy/deleteStrategyStep
export const deleteStrategyStep = params => {return axios.post(`${base}/strategy/deleteStrategyStep`,params)};
//center/strategy/getStrategyName
export const getStrategyName = params => {return axios.post(`${base}/strategy/getStrategyName`,params)};
//查询用户是否有新增更新策略的权限GET /center/strategy/checkUserPermission
export const checkUserPermission = params => {return axios.post(`${base}/strategy/checkUserPermission`,params)};
export const getSimMachineInfo = params => {return axios.post(`${base}/order/getSimMachineInfo`, params)};

//推送配置 POST /center/push/pushConfig
export const pushConfig = params => {return axios.post(`${base}/push/pushConfig`,params)};
//获取所有一级组织数据GET /center/org/getLevelOneOrg
export const getAllLevelOneOrg = params => {return axios.post(`${base}/org/getLevelOneOrg`,params)};
//获取当前组织（无权限）
export const getCompanyList = params => { return axios.post(`${base}/org/getAllLevelOneOrg`, params) };
//增加组织POST /center/org/addOrg
export const addOrg = params => {return axios.post(`${base}/org/addOrg`,params)};
//修改组织POST /center/org/modOrg
export const modOrg = params => {return axios.post(`${base}/org/modOrg`,params)};
//删除组织POST /center/org/delOrg
export const delOrg = params => {return axios.post(`${base}/org/delOrg`,params)};
//post /center/org/queryUsers
export const queryUsers  = params => {return axios.post(`${base}/org/queryUsers`,params)};
//post /center/org/moveUser
export const moveUser   = params => {return axios.post(`${base}/org/moveUser`,params)};
//修改组织内用户角色 POST /center/org/modUserRole
export const modUserRole = params => { return axios.post(`${base}/org/modUserRole`, params) };
//获取组织的详细信息GET /center/org/getOrgInfo
export const getOrgInfo = params => {return axios.post(`${base}/org/getOrgInfo?orgId=${params}`)};
//根据组织ID获取组织内所有人员GET /center/org/getOrgUsers
export const getOrgUsers = params => {return axios.post(`${base}/org/getOrgUsers?orgId=${params}`)};
//获取所有组织角色 GET /center/org/getOrgRole
export const getOrgRole = params => { return axios.post(`${base}/org/getOrgRole`, params) };

//审核策略
//获取环境审核策略POST /center/audit/getAuditStrategy
export const getAuditStrategy = params => { return axios.post(`${base}/audit/getAuditStrategy`, params)};
//获取所有组织对应的组织树 POST /center/audit/getOrgTree
export const getOrgTree = params => {return axios.post(`${base}/audit/getOrgTree`, params)};
//增加审核策略步骤POST /center/audit/addAuditStrategyStep
export const addAuditStrategyStep = params => {return axios.post(`${base}/audit/addAuditStrategyStep`, params)};
//判断用户是否有修改权限POST /center/audit/checkPermission
export const checkPermission = params => {return axios.post(`${base}/audit/checkPermission`, params)};
//修改审核策略步骤POST /center/audit/modAuditStrategyStep
export const modAuditStrategyStep = params => {return axios.post(`${base}/audit/modAuditStrategyStep`, params)};
//删除审核策略步骤POST /center/audit/delAuditStrategyStep
export const delAuditStrategyStep = params => {return axios.post(`${base}/audit/delAuditStrategyStep`, params)};

//首页POST /center/home/getHomePageData
export const getHomePageData = params => {return axios.post(`${base}/home/getHomePageData`, params)};
//添加用户最近访问应用POST /center/home/addRecentApp
export const addRecentApp = params => {return axios.post(`${base}/home/addRecentApp`,params)};
//获取角色信息
export const getRoleInfo = params => {return axios.post(`${base}/Role/getRoleInfo`,params)};
//获取当前用户角色
export const getUserRole = params => {return axios.post(`${base}/Role/getUserRole`,params)};
export const updateUserRole = params => {return axios.post(`${base}/Role/updateUserRole`,params)};
export const delUserRole = params => {return axios.post(`${base}/Role/delUserRole`,params)};

//新增角色
export const addRole = params => {return axios.post(`${base}/Role/addRole`,params)};
//删除角色
export const delRole = params => {return axios.post(`${base}/Role/delRole`,params)};
//查询角色权限绑定关系
export const getRolePermissionRel = params => {return axios.post(`${base}/Role/getRolePermissionRel`,params)};
//查询角色未绑定权限
export const getNoRolePermissionRel = params => {return axios.post(`${base}/Role/getNoRolePermissionRel`,params)};
//添加角色权限绑定关系
export const addRolePermissionRel = params => {return axios.post(`${base}/Role/addRolePermissionRel`,params)};
//删除角色权限绑定关系
export const delRolePermissionRel = params => {return axios.post(`${base}/Role/delRolePermissionRel`,params)};

//用户获取业务统计数据
/*export const getUserDataView = params => {return axios.post(`${base}/Role/getUserDataView`,params)}*/

export const constUserData = {
    pine:{
      voice:{
        title:"语音(分钟)",
        use:"1419",
        notuse:"881"
      },
      data:{
        title:"语音(分钟)",
        use:"950",
        notuse:"800"
      },
      message:{
        title:"语音(分钟)",
        use:"950",
        notuse:"1050"
      }
    },
  bar:{
    unit:["CMIOTGEELYINTRA.SH","CMIOTZEBRAONE.SH","CMIOTB2CVWGCOM.SH","CMIOTFORDONE.SH","CMIOTWULINGONE.SH","CMIOTQOROSONE.SH","CMIOT"],
    voice:{
      total:[200,300,400,200,300,400,500,],
      use:[100,150,200,244,215,254,256,]
    },
    data:{
      total:[100,200,300,400,500,150,100,],
      use:[50,200,150,200,250,50,50,]
    },
    message:{
      total:[100,200,300,400,500,400,100,],
      use:[50,100,150,250,250,100,50,]
    }
  }
}

export const constUserData2 = {
  pine:{
    voice:{
      title:"语音(分钟)",
      use:"1825",
      notuse:"1825"
    },
    data:{
      title:"语音(分钟)",
      use:"1747",
      notuse:"377"
    },
    message:{
      title:"语音(分钟)",
      use:"2157",
      notuse:"87"
    }
  },
  bar:{
    unit:["222100001","222100002","222100003","222100004","222100005","222100006","222100007","222100008","222100009","222100010","222100011","222100012"],
    voice:{
      total:[100,200,300,400,500,600,500,400,300,200,100,50],
      use:[50,100,150,200,250,300,250,200,150,100,50,25]
    },
    data:{
      total:[70,90,40,140,290,175,144,152,634,247,132,10],
      use:[40,80,30,50,50,541,244,231,254,12,214,1]
    },
    message:{
      total:[80,100,50,150,300,185,154,162,644,257,142,20],
      use:[40,150,100,300,50,541,244,231,254,12,214,21]
    }
  }
}

function getBar_serviceCode(){
  return {
    unit:["CMIOTGEELYINTRA.SH","CMIOTZEBRAONE.SH","CMIOTB2CVWGCOM.SH","CMIOTFORDONE.SH","CMIOTWULINGONE.SH","CMIOTQOROSONE.SH","CMIOT"],
    voice:{
      total:[1000,1100,1200,1300,1400,1500,1600],
      use:[900,1000,1000,1100,1200,1100,900]
    },
    data:{
      total:[],
      use:[]
    },
    message:{
      total:[],
      use:[]
    }
  }
}

function getBar_apn(){
  return {
    unit:["222100001","222100002","222100003","222100004","222100005","222100006","222100007","222100008","222100009","222100010","222100011","222100012"],
    voice:{
      total:[1000,1100,1200,1300,1400,1500,1400,1300,1200,1100,1000,900],
      use:[900,1000,1000,1100,1200,1100,900,900,800,750,700,750]
    },
    data:{
      total:[],
      use:[]
    },
    message:{
      total:[],
      use:[]
    }
  }
}


export const empty_static_data = {
  pine:{
    voice:{
      title:"语音",
      use:"0",
      notuse:"0"
    },
    data:{
      title:"语音",
      use:"0",
      notuse:"0"
    },
    message:{
      title:"语音",
      use:"0",
      notuse:"0"
    }
  },
  bar:{
    unit:[],
    voice:{
      total:[],
      use:[]
    },
    data:{
      total:[],
      use:[]
    },
    message:{
      total:[],
      use:[]
    }
  }
}

export const static_data = (num,type) =>{
  let result = {
    pine:{
      voice:{
        title:"",//9000分钟=900M
        use:"",
        notuse:""
      },
      data:{
        title:"",
        use:"",
        notuse:""
      },
      message:{
        title:"",
        use:"",
        notuse:""
      }
    },
    bar:{

    }
  }
  if(type == 1 || type =="1"){//serviceCode
    result.bar = getBar_serviceCode();
  }else{
    result.bar = getBar_apn();
  }
  let voiceTotal = 0;
  let dataTotal = 0;
  let messageTotal = 0;
  let voiceUsed = 0;
  let dataUsed = 0;
  let messageUsed = 0;
  let temp1 = [];
  result.bar.voice.total.forEach(item =>{
    temp1.push(item+num);
    voiceTotal = voiceTotal + item+num;
    dataTotal = dataTotal+item+200+num;
    messageTotal = messageTotal+item+400+num;
    result.bar.data.total.push(item+200+num)
    result.bar.message.total.push(item+400+num)
  })
  result.bar.voice.total = temp1
  let temp2 = [];
  result.bar.voice.use.forEach(item =>{
    temp2.push(item+num);
    voiceUsed = voiceUsed+item+num;
    dataUsed = dataUsed+item+200+num;
    messageUsed = messageUsed+item+400+num;
    result.bar.data.use.push(item+200+num)
    result.bar.message.use.push(item+400+num)
  })
  result.bar.voice.use = temp2
  result.pine.voice.title = voiceTotal+'分钟='+(voiceTotal/10)+'M'
  result.pine.data.title = voiceTotal+'条='+(voiceTotal/10)+'M'
  result.pine.message.title = voiceTotal+'M'

  result.pine.voice.use = voiceUsed
  result.pine.data.use = dataUsed
  result.pine.message.use = messageUsed

  result.pine.voice.notuse = voiceTotal-voiceUsed
  result.pine.data.notuse = dataTotal-dataUsed
  result.pine.message.notuse = messageTotal-messageUsed
  return result;
}

function getStatic_data_up_down_apn(){
  return {
    unit:["CMIOTGEELYINTRA.SH","CMIOTZEBRAONE.SH","CMIOTB2CVWGCOM.SH","CMIOTFORDONE.SH","CMIOTWULINGONE.SH","CMIOTQOROSONE.SH","CMIOT"],
    up:[1100,1200,1300,1400,1300,1200,1100],
    down:[1200,1300,1400,1500,1400,1300,1200]
  }
}

function getStatic_data_up_down_serviceCode(){
  return {
    unit:["222100001","222100002","222100003","222100004","222100005","222100006","222100007","222100008","222100009","222100010","222100011","222100012"],
    up:[1200,1300,1400,1500,1600,1700,1600,1500,1400,1300,1200,1100],
    down:[1400,1500,1600,1700,1800,1900,1800,1700,1600,1500,1400,1300]
  }
}


export const static_data_up_down_empty = {
  left:{
    up:'',
    down:''
  },
  right:{
    unit:[],
    up:[],
    down:[]
  }
}
export const static_data_up_down = (num,type)=>{
  let result = {
    left:{
      up:'',
      down:''
    },
    right:{
      unit:[],
      up:[],
      down:[]
    }
  }
  if(type == 1 || type=='1'){
    result.right = getStatic_data_up_down_apn();
  }else{
    result.right = getStatic_data_up_down_serviceCode();
  }
  let upTotal = 0
  let downTotal = 0;
  let temp1 = [];
  result.right.up.forEach(item =>{
    temp1.push(item+num)
    upTotal = upTotal+item+num;
  })
  result.right.up = temp1;
  let temp2 = [];
  result.right.down.forEach(item =>{
    temp2.push(item+num);
    downTotal = downTotal+item+num;
  })
  result.right.down = temp2;
  result.left.up =upTotal;
  result.left.down =downTotal;
  return result;
}

export const dataCharView = {
    left:{
        up:1200,
        down:1150
    },
    right:{
        unit:["CMIOTGEELYINTRA.SH","CMIOTZEBRAONE.SH","CMIOTB2CVWGCOM.SH","CMIOTFORDONE.SH","CMIOTWULINGONE.SH","CMIOTQOROSONE.SH","CMIOT"],
        up:[100,200,50,400,200,150,100],
        down:[200,300,100,300,100,50,100]
    }
}

export const dataCharView2 = {
  left:{
    up:2244,
    down:2175
  },
  right:{
    unit:["222100001","222100002","222100003","222100004","222100005","222100006","222100007","222100008","222100009","222100010","222100011","222100012"],
    up:[80,100,50,150,300,185,154,162,644,257,142,20],
    down:[40,150,100,300,50,541,244,231,254,12,214,21]
  }
}

//获取车主用户信息
export const getCarEnterprise = params => {return axios.post(`${base}/enterprise/getCarEnterprise`,params)};
//更改车企信息
export const updateCarEnterprise = params => {return axios.post(`${base}/enterprise/updateCarEnterprise`,params)};
//保存车企实名制信息
export const saveCarEnterprise = params => {return axios.post(`${base}/enterprise/saveEnterpriseInfo`,params)};
//获取车企订购套餐列表
export const getEnterpriseOfferList = params => {return axios.post(`${base}/enterprise/getEnterpriseOfferList`,params)};
//解除绑定
export const cancelTie = params => {return axios.post(`${base}/enterprise/untie`,params)};

//车企管理
//新增车企
export const newInfo = params => {return axios.post(`${base}/enterprise/newInfo`, params)};
//修改车企信息
export const updateInfo = params => {return axios.post(`${base}/enterprise/updateInfo`, params)};
//根据营业执照、车企名称获取车企信息
export const getCarEnterpriseList = params => {return axios.post(`${base}/enterprise/getCarEnterpriseList`, params)};
//获取车主列表
export const getSimList = params => { return axios.post(`${base}/sim/getSimList`, params) };

export const getUserDataReport = params => {return axios.post(`${base}/report/getUserDataReport`, params)}

//sim卡管理
//根据sim卡号、手机号码、sim状态查询sim卡信息
export const getSimInfo = params => {return axios.post(`${base}/sim/getSimInfo`, params)};
//更新sim卡状态
export const updateSimInfo = params => {return axios.post(`${base}/sim/updateSimInfo`, params)};
//根据sim卡号获取套餐信息
export const getSimOffer = params => {return axios.post(`${base}/sim/getSimOffer`, params)};
//变更成员与车企绑定关系
export const changeBind = params => {return axios.post(`${base}/sim/changeBind`, params)};

//车主实名制
//获取当前登录帐号sim信息
export const getSingleSimData = params => {return axios.post(`${base}/sim/getSingleSimData`, params)};
//当前登录帐号解除实名绑定
export const removeAuthInfo = params => {return axios.post(`${base}/sim/removeAuthInfo`, params)};
//更新实名信息
export const updateAuthInfo = params => {return axios.post(`${base}/sim/updateAuthInfo`, params)};

//车主帐号绑定第三方帐号
export const getThirdAccount = params => {return axios.post(`${base}/bindAccount/getThirdAccount`, params)};
//当前登录帐号解除实名绑定
export const bindThirdAccount = params => {return axios.post(`${base}/bindAccount/bindThirdAccount`, params)};
//解除第三方帐号绑定
export const removeThirdAccount = params => {return axios.post(`${base}/bindAccount/removeThirdAccount`, params)};

//获取套餐使用情况
export const getSimOfferUseDetail = params => {return axios.post(`${base}/sim/getSimOfferUseDetail`, params)};

//根据套餐名称查询套餐信息
export const getUpOffersByName = params => {return axios.post(`${base}/sim/getUpOffersByName`, params)};

export const getUpProdsByOfferId = params => {return axios.post(`${base}/sim/getUpProdsByOfferId`, params)};


export const getManagerReportViewData = params => {return axios.post(`${base}/report/getUserDataReport`, params)}


export const orderSimOffer = params => {return axios.post(`${base}/sim/orderSimOffer`, params)};

//apn管理  业务管理
export const getAPNDataList = params => {return axios.post(`${base}/apn/getAPNDataList`, params)};

export const getServiceCodeDataList = params => {return axios.post(`${base}/sim/getServiceDataList`, params)};

export const getUpServiceCodeListList = params => {return axios.post(`${base}/sim/getUpServiceCodeList`, params)};

export const changeAttributeStatus = params => {return axios.post(`${base}/sim/changeAttributeStatus`, params)};


export const updateSimOffer = params => {return axios.post(`${base}/sim/updateSimOffer`, params)};

//获取流量池列表
export const getDataPoolList = params => {return axios.post(`${base}/data-pool/getDataPoolList`, params)};

export const orderDataPool = params =>{return axios.post(`${base}/data-pool/orderDataPool`, params) }
export const getApiByVehicles = params => {return axios.post(`${base}/apiBind/getApiByVehicles`, params)};

export const removeBind = params => {return axios.post(`${base}/api/removeBind`, params)};

export const modifyCarApiRels = params => {return axios.post(`${base}/api/modifyCarApiRels`, params)};

export const getUsers = params => {return axios.post(`${base}/sim/getUsers`, params)};

//车企管理
export const delCarRuleByName = params =>{ return axios.get(`${base}/delCarRuleByName`, params) };
export const getAllRule = params =>{ return axios.get(`${base}/getAllRule`, params)};

export const addNewOffer = params => { return axios.post(`${base}/offer/addOffer`, params)};
export const delOffer = params => {return axios.post(`${base}/offer/deleteOffer`, params)};
export const getOfferList = params => {return axios.post(`${base}/offer/getOfferList`, params)};

//获取车企订购的流量池列表
export const getUserDataPoolList = params => {return axios.post(`${base}/data-pool/getUserDataPoolList`, params)};
//获取车企成员订购的流量池列表
export const getUserMemberDataPoolList = params => {return axios.post(`${base}/data-pool/getUserMemberDataPoolList`, params)};

export const getDataPoolById = params => {return axios.post(`${base}/data-pool/getDataPoolById`, params) }

export const createDataPool = params => {return axios.post(`${base}/data-pool/createDataPool`, params)}

export const editDataPool = params => {return axios.post(`${base}/data-pool/editDataPool`, params)}
//获取套餐余量
export const getOfferSurplus = params => {return axios.post(`${base}/attribute/getOfferSurplus`, params)};

//权限管理
export const getPermission = params => {return axios.post(`${base}/permission/getPermission`, params)};
export const delPermission = params => {return axios.post(`${base}/permission/delPermission`, params)};
export const addPermission = params => {return axios.post(`${base}/permission/addPermission`, params)};
export const getPermissionEntityRel = params => {return axios.post(`${base}/permission/getPermissionEntityRel`, params)};
export const getNoPermissionEntityRel = params => {return axios.post(`${base}/permission/getNoPermissionEntityRel`, params)};
export const addPermissionEntityRel = params => {return axios.post(`${base}/permission/addPermissionEntityRel`, params)};
export const delPermissionEntityRel = params => {return axios.post(`${base}/permission/delPermissionEntityRel`, params)};
// 新增用户
export const addUser = params => {return axios.post(`${base}/Role/saveSysUserInfo`,params)};
// 删除用户
export const delUser = params => {return axios.post(`${base}/Role/delSysUser`,params)};
// 查询用户
export const getUserInfo = params => {return axios.post(`${base}/Role/getSysUserInfo`,params)};
// 修改用户
export const modifyUser = params => {return axios.post(`${base}/Role/modifyUser`,params)};


//获取套餐计量映射列表
export const getUpDataUnitMapList = params => {return axios.post(`${base}/data-unit-map/getUpDataUnitMapList`, params)};
//保存套餐计量映射
export const saveUpDataUnitMap = params => {return axios.post(`${base}/data-unit-map/saveUpDataUnitMap`, params)};
//删除套餐计量映射
export const deleteUpDataUnitMap = params => {return axios.post(`${base}/data-unit-map/deleteUpDataUnitMap`, params)};

//充值缴费
export const getEnterpriseFeeInfos = params => {return axios.post(`${base}/enterprise/getEnterpriseFeeInfos`, params)};
export const payMoney= params => {return axios.post(`${base}/enterprise/payMoney`, params)};
export const repaidMoney= params => {return axios.post(`${base}/enterprise/repaidMoney`, params)};
export const getItemInfo= params => {return axios.post(`${base}/enterprise/getItemInfo`, params)};
export const getEnterpriseNameByLoginNo= params => {return axios.post(`${base}/enterprise/getEnterpriseNameByLoginNo`, params)};

//订单
export const orderOffers = params => {return axios.post(`${base}/order/orderOffers`, params)};
export const getOrderOfferList = params => {return axios.post(`${base}/order/getOrderOfferList`, params)};
export const changeOffer = params => {return axios.post(`${base}/order/changeOffer`, params)};
export const unSubscribeOffers = params => {return axios.post(`${base}/order/unSubscribeOffers`, params)};

export const getUserByCcIdAndDataId = params =>{return axios.post(`${base}/sim/getUserByCcIdAndDataId`, params)}

export const addDataPoolMember = params=>{return axios.post(`${base}/data-pool/addDataPoolMember`, params)}

export const addDataPoolMemberBySimId = params=>{return axios.post(`${base}/data-pool/addDataPoolMemberBySimIds`, params)}

export const getServiceCodeWithCondition = params=>{return axios.post(`${base}/up/getServiceCodeWithCondition`, params)}

export const addServiceCodeAttribute = params =>{return axios.post(`${base}/attribute/addSCAttribute`, params)}

//发起制卡请求
export const submitSimRequest= params=>{return axios.post(`${base}/sim/submitSimRequest`, params)}

export const downloadSim= params=>{return axios.post(`${base}/sim/downloadSim`, params)}
export const batchUpdateSimStatus= params=>{return axios.post(`${base}/sim/batchUpdateSimStatus`, params)}
export const purchaseMoreService= params=>{return axios.post(`${base}/sim/purchaseMoreService`, params)}


