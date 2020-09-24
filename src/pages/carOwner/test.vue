<template>
    <div>
      <input id="pic" type="file" name = 'pic' accept = "image/*" @change = "selectFile()"/>
      <div id = "result" v-if="isShow"></div>
    </div>
</template>
<script>
    export default {
        name: "imageShow",
        data() {
          return {
            file:null,
            isShow:false,
            fileData:null,
          }
        },
      methods: {
        selectFile() {
          var files = document.getElementById('pic').files;
          if(files.length == 0){
            return;
          }
          var file = files[0];
          var reader = new FileReader();
          reader.readAsBinaryString(file);
          reader.onload = function(f){
            var result = document.getElementById("result");
            var src = "data:" + file.type + ";base64," + window.btoa(this.result);
            result.innerHTML = '<img src ="'+src+'" style="height: 150px;width: 150px"/>';
          };
          let that = this;
          var reader2 = new FileReader();
          reader2.readAsDataURL(file);
          reader2.onload = function () {
            that.fileData = reader2.result;
          }

          this.file = file;
          this.isShow = true;
        },
        getImageInfo() {
          return this.fileData;
        }
      },
    }
</script>

<style scoped>
  #result{
    width: 100px;
    /*height:112px;*/
  }
  #result img{
    width: 100px;
    /*height: 100px;*/
  }
  input{
    width: 70px;
    margin-top: 10px;
  }
</style>
