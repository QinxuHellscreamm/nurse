<template>
    <div>
      <div>
        <span>选择医嘱类别</span>
        <el-select v-model="value" placeholder="选择医嘱类别" class="wayselect" @change="sel(value)">
          <el-option v-for="item in catdics" :key="item.ID" :label="item.NAME" :value="item.ID"></el-option>
        </el-select>
        <el-button type='primary' style="float:right; padding:12px 32px" @click="save">保存</el-button>
      </div>
      <div>
        <span class="advice-title1" style="margin-top:29px">用药途径</span>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class='custom-margin'>全选</el-checkbox>
        <div class="advice-list">
          <el-checkbox-group v-model="checkedways" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="item in usedics" :label="item.ID" :key="item.ID">{{item.NAME}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
              catdics: [],
              usedics: [],
              value: "",
              checkedways: [],  //勾选的
              checkAll: false,
              isIndeterminate: true,
              checkAllList: []
            }
        },

        mounted(){
          this.$nextTick(()=>{

            this.getSer("datacenter/hisadvice", {}, res=> {
              console.log(res)
              if(res.status=="200"){
                this.catdics=res.data;
              }
            });
            this.getSer("datacenter/druguse",{"page":1,"page_size":"1000"},res=>{
              if(res.status <= 400){
                this.usedics = res.data.items;
              }
              this.checkAllList = this.usedics.map(item => {return item.ID})
            });
          })
        },

        methods:{
          handleCheckAllChange(val) {
            //全选  val =true  为选择全部 val = false  为空数组
            this.checkedways = val ? this.checkAllList: [];
            this.isIndeterminate = false;
          },
          //多选
          handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.usedics.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.usedics.length;
          },
          save(){
              this.post("datacenter/hisadvice",
                {"his_advice_id" : this.value , "items" : JSON.stringify(this.checkedways)},res=>{
                  console.log(res.status);
                if(res.status == 201){
                    this.$message({type: 'success', message: '保存成功'});
                }else{
                  this.$message.error(res.data.message)
                }
              })
          },
          sel(id) {
            this.checkedways = []
            this.getSer("datacenter/hisadvice/"+id,{"id":id},res => {
              console.log(res);
              if(res.status == "200"){
                this.checkedways = res.data.id_arr;
              }
            })
            this.checkAll = false;
          }
        }
    }
</script>
<style scoped lang='stylus'>
  .btn-small
    margin-right 10px
  .advice-list .el-checkbox-group
    height auto
    overflow hidden
  .custom-margin
    margin-left 10px
</style>
