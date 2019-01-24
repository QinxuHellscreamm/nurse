<template>
  <el-dialog :visible.sync="popshow" append-to-body title='体温单配置' width='313px'>
    <el-table :data='tableList' border @row-click="handleSelectionChange" class='custom-table'>
      <el-table-column label="体征项目" min-width="150">
        <template slot-scope="{row}">
          <el-autocomplete
            class="inline-input auto"
            v-model="row.NAME"
            :fetch-suggestions="querySearch_project"
            placeholder="请输入内容"
            @select="handleSelect_project"
          ></el-autocomplete>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="一天几次" min-width="80">
        <template slot-scope="{row}">
          <el-input v-model='row.NUMBER_OF_TIMES' type='tel' :disabled='row.NUMBER_OF_TIMES_REVISABILITY  == 1'></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="" min-width="40">
        <template slot-scope="scope">
          <i class="el-icon-delete" style="color:#E63922" @click='del(scope.$index)'></i>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="add" type='success'>新增</el-button>
      <el-button @click="application" type='primary'>应用</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {

        name : "thermometerOpation",

        props : ['TEMPLATE_ID','detile','date'],

        data(){
          return{
            popshow : false,
            LIST : [],
            obj : {},
            tableList : []
          }
        },

        methods : {
          handleSelectionChange(vals){
            this.obj = vals
          },
          querySearch_project(queryString,cb) {
            console.log(queryString)
            var restaurants = this.LIST
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
            cb(results)
          },
          createFilter(queryString) {
            return (restaurant) => {
              return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
          },
          handleSelect_project(item){
            console.log(this.tableList);
            console.log(item)
            this.obj.SIGN_ID = item.ID
            this.obj.NUMBER_OF_TIMES = item.NUMBER_OF_TIMES
            this.obj.ITEM_TYPE = item.type
            this.obj.NUMBER_OF_TIMES_REVISABILITY = item.NUMBER_OF_TIMES_REVISABILITY
          },
          del(index){
            console.log(index);
            this.tableList.splice(index,1)
          },
          add(){
            this.tableList.push({ NUMBER_OF_TIMES:'' })
          },
          setData(tableList){
            this.tableList = [...tableList]
            console.log(tableList)
          },
          application(){

            let arr = []
            this.tableList.forEach(item=>{
              arr.push({ id : item.SIGN_ID , num : item.NUMBER_OF_TIMES , type: item.ITEM_TYPE , time_lock : 2})
            })
            this._put('datacenter/twtemplateuser/'+ this.TEMPLATE_ID,{
              id : this.TEMPLATE_ID ,
              inpatient_number : this.detile.INPATIENT_NUMBER ,
              data : JSON.stringify(arr),
              date : this.date
            },res=>{
              console.log(res);
              if(res.status<400){
                this.$message({ type: 'success', message : '应用成功'})
                this.popshow = false
                console.log(this);
                this.$parent.getData()
                this.$parent.$parent.getData()
              }else {
                this.$message({type : 'warning',message : '体征项目不能为空'});
                return
              }
            })
          }
        },

        mounted(){
          this.$nextTick(()=>{
            this.getSer("datacenter/twtemplate/termlist",{}, res =>{
              console.log('体征关联')
              console.log(res)
              this.LIST = res.data.items
              this.LIST.forEach((item,i) =>{
                this.LIST[i] = {...this.LIST[i] , value : this.LIST[i].NAME}
              })
            })
          })
        }
    }
</script>

<style scoped lang='stylus'>
  .custom-table
    &>>>th
      line-height 40px
    &>>>td
      padding 0
    &>>>.cell
      padding 0 !important
      text-align center
      .el-input
        width 100%
        color #FFFFFF
        .el-input__inner
          border none
          width 100%

</style>
