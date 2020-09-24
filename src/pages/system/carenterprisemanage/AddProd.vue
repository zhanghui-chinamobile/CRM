<template>
  <section>
    <el-row>
      <el-form
        ref="prodFrom"
        :model="prodFrom"
        :rules="rules"
        :status-icon="true"
        :inline="true"
        size="small">
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="prodFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="type" placeholder="请选择产品类型">
          <el-select v-model="prodFrom.type">
            <el-option label="功能产品" value="1"></el-option>
            <el-option label="资费产品" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生效时间" prop="effectDate">
          <el-date-picker
            v-model="prodFrom.effectDate"
            type="date"
            placeholder="选择生效时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="失效时间" prop="outDate">
          <el-date-picker
            v-model="prodFrom.outDate"
            type="date"
            placeholder="选择失效时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产品描述" prop="description">
          <el-input type="textarea" v-model="prodFrom.description"></el-input>
        </el-form-item>

      </el-form>
      <el-button @click="onSubmit('prodFrom')" style="float: right">提交</el-button>
    </el-row>
  </section>
</template>

<script>
  export default {
    name: "AddNewProd",
      props:['offerData'],
    data(){
      return{
        prodFrom: {
            name: '',
          prodName: '',
          effectDate: '',
          outDate: '',
          description: '',
            type: ''
        },
        rules: {
          OfferName: [
            {require: true, type: 'string', message: '请输入套餐名称！', trigger: 'blur'}
          ],
          prodName: [
            {require: true, type: 'string', message: '请输入产品名称！', trigger: 'blur'}
          ],
          effectDate: [
            {require: true, type: 'date',message: '请选择生效时间！', trigger: 'blur'}
          ],
          outDate: [
            {require: true, type: 'date',message: '请选择失效时间！', trigger: 'blur'}
          ],
          ruleId: [
            {require: true, type: 'number', message: '请选择关联规则', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmit(prodFrom){
        this.$refs[prodFrom].validate((valid) => {
          if (valid) {
            let params = {
                parentId:this.$props.offerData.id,
              addLevel: 2,
              name: this.prodFrom.name,
              description: this.prodFrom.description,
                type: this.prodFrom.type,
                status:1
            };
            this.$http.addNewOffer(params).then(() => {
              this.$message({
                message: '套餐添加成功',
                type: 'success'
              })
                this.$emit("queryOrder", true);
                this.$emit("closeHandleAdd",true)
            }).catch(error => {
              console.log(error)
            })
          } else {
            this.$message({
              message: '请正确填写表单！',
              type: "warring"
            })
          }
        });
      }
    },

  }
</script>

<style scoped>

</style>
