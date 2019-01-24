<template>
    <el-dialog :title="name" :visible.sync="popshow" width='556px'>

      <el-table :data="EVENTS" style="width: 100%" border>
        <el-table-column  label="名称"  min-width="80">
          <template slot-scope="scope" v-if='scope.row.TYPE!="DEL"'>
            <span>事件{{scope.$index+1 | chineseNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="操作"  min-width="80">
          <template slot-scope="scope" v-if='scope.row.TYPE!="DEL"'>
            <event :item='scope.row' :eventIndex='scope.$index' :name='name' :opations="OPTION_LIST" :nursingMeasures='nursingMeasures'></event>
            <el-button @click="deleteEvent(scope.row,scope.$index)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button style='float: left' @click='addEvent' class='add-event'> <i class='el-icon-circle-plus-outline'></i><span>添加事件</span></el-button>
        <el-button @click="popshow=false" class='close'>取 消</el-button>
        <el-button @click="save" class='save'>确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
  import event from './event'
  import { _debounce } from "@/global"
    export default {
        name: "edit",

        components:{event},

        props:['nursingMeasures'],

        data(){
          return{
            name : '',
            popshow : false,
            EVENTS : [],
            count : 0,
            id : '',
            tid:'',
            OPTION_LIST:'',//传给event组件use
            deleteEventArr:[]
          }
        },

        methods : {
          setData(data){
            this.id = data.ID
            this.name = data.NAME
            this.tid = data.TID
            this.code = data.CODE
            this.OPTION_LIST = data.OPTION_LIST
            this.getSer('datacenter/vsitem/'+this.id,{id:this.id,tid:this.tid,code:data.CODE},res=>{
              this.EVENTS = res.data.items

              this.EVENTS.forEach(event=>{
                let arr = []
                event.NURSING_MEASURES.forEach((item,i)=>{
                  // arr[i] = {id:item,content:this.nursingMeasures[item]}
                  this.nursingMeasures.forEach(conent=>{
                    item == conent.ID ? arr[i] = { id : item , content : conent.CONTENT } : null
                  })
                })
                event.NURSING_MEASURES = arr
                console.log(arr);
              })

            })

            this.popshow = true
          },
          addEvent(){
            var obj = {
              TYPE:"ADD",
              EVENT_ID:"",
              TRIGGER_TYPE:1,
              TRIGGER_ID:this.id,
              CONDITIONS:{
                type:"AND",
                items:[]
                  // {"symbol":">","val":3,input_type:2},
                  // {"symbol":"<","val":6}
              },
              CODE:this.code,
              TEMP_ID:this.tid,
              NURSING_MEASURES:[]
                // {"id":1,"content":"\u7269\u7406\u964d\u6e29"},
                // {"id":2,"content":"\u51b0\u6577"},
                // {"id":3,"content":"\u5347\u6e29"}
            }
            this.EVENTS.push(obj)
          },
          deleteEvent(row,index){
            if(row.TYPE == 'ADD'){
              this.EVENTS.splice(index,1)
            }else{
              row.TYPE = 'DEL'
              this.deleteEventArr.push(row)
              this.EVENTS.splice(index,1)
            }

          },
          save: _debounce(function(){
            let flag = true
            // if (this.EVENTS.length == 0){
            //
            //   this.$message({
            //     type: 'error',
            //     message: '请填入!',
            //   });
            //   return
            // }
            this.EVENTS.forEach(item =>{
              if(item.CONDITIONS.items.length==0) flag = false
              if (item.NURSING_MEASURES.length == 0) flag = false
            })
            if(!flag){
              this.$message({type: 'error', message: '事件中护理措施和触发条件不能为空!'})
              return
            }

            var obj = [...this.EVENTS,...this.deleteEventArr]
            console.log(obj);
            console.log(JSON.stringify(obj));
            this.post('datacenter/vsitem',{ data:JSON.stringify(obj) },res => {
              console.log(res);
              if(res.status<400){
                this.$message({ type: 'success', message : '编辑成功'})
                this.popshow = false
                this.$parent.getData()
              }
            })
          })


        }
    }
</script>

<style scoped lang='stylus'>
  .add-event
    position relative
    padding 12px 15px 12px 35px
    background-color #F9F9FB
    .el-icon-circle-plus-outline
      position absolute
      font-size 20px
      color #11C462
      left 14px
      top 10px
  .el-table
    &>>>.el-table__body-wrapper
      td
        padding 0
    &>>>.el-table__header-wrapper
      th
        padding 5px 0
        background-color #DDEFF9
        border-color #A5DDEA
  .close
    background-color #DDEFF9
    color #00B3DC
    padding 12px 31px
  .save
    padding 12px 53px
    background-color #00B3DC
    color #FFFFFF
</style>
