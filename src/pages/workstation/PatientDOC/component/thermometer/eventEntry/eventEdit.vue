<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" append-to-body width='326px'>

    <div>
      <label>事件时间</label>
      <el-date-picker v-model="time" value-format='yyyy-MM-dd	HH:mm' format='yyyy-MM-dd	HH:mm' type="datetime" :clearable='!dialogFormVisible'></el-date-picker>
    </div>

    <div style='margin-top: 15px'>
      <label>事件类型</label>
      <el-select v-model="type" placeholder="请选择">
        <el-option v-for="item in options" :key="item.TYPE" :label="item.NAME" :value="item.TYPE"></el-option>
      </el-select>
    </div>

    <div slot="footer" class="dialog-footer">

      <el-button @click="save" type='primary'>确定</el-button>
      <el-button @click="dialogFormVisible = false" class='close'>取 消</el-button>

    </div>
  </el-dialog>
</template>

<script>
  import {_debounce,_YMDhms} from "@/global";

  export default {
        name: "eventEdit",

        props:['detile'],

        data(){
          return{
            dialogFormVisible : false,
            title : '',
            options:[],
            type:'',
            time:'',
            id:''
          }
        },

        methods:{

          add(){
            this.dialogFormVisible = true
            this.title = '新增事件'
            this.type = ''
            this.time = _YMDhms()
          },
          edit(row){
            console.log(row);
            this.dialogFormVisible = true
            this.title = '编辑事件'
            this.type = row.LABEL_TYPE
            this.time = row.START_TIME
            this.id = row.ID
          },
          save:_debounce(function () {
            if(!this.type){
              this.$message({type: 'warning', message: '请选择类型'})
              return
            }
            if(this.title =="新增事件"){
              this.post('datacenter/patient-label',{in_number:this.detile.INPATIENT_NUMBER,type:this.type,start:this.time},res=>{
                console.log(res);
                if(res.status<400){
                  console.log(this.$parent);
                  this.$parent.$parent.getList()
                  this.dialogFormVisible = false
                  this.$message({type: 'success', message: this.title+'成功'})
                }
              })
            }else{
              this._put('datacenter/patient-label/'+this.id,{id:this.id,type:this.type,start:this.time,in_number:this.detile.INPATIENT_NUMBER,},res=>{
                if(res.status<400){
                  console.log(this.$parent);
                  this.$parent.$parent.getList()
                  this.dialogFormVisible = false
                  this.$message({type: 'success', message: this.title+'成功'})
                }
              })
            }
          }),

        },


        mounted(){
          this.$nextTick(()=>{
            this.getSer('datacenter/patient-label/get-label',{tgroup:1},res=>{
              console.log(res);
              this.options = res.data.items
            })
          })
        }
    }
</script>

<style scoped lang='stylus'>
  label
    margin-right 10px
</style>
