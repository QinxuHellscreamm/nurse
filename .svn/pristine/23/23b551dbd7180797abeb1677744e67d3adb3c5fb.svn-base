<template>
    <el-dialog append-to-body width='787px' title='班次管理' :visible.sync="popshow">
      <el-table :data='shiftList' border>
        <el-table-column  label="序号" min-width="58">
          <template slot-scope="{row}">
            <el-input v-model='row.SORT' type='number'></el-input>
          </template>
        </el-table-column>
        <el-table-column  label="名称" min-width="118">
          <template slot-scope="{row}">
            <el-input v-model='row.NAME'></el-input>
          </template>
        </el-table-column>
        <el-table-column  label="开始时间" min-width="168">
          <template slot-scope="{row}">
            <el-time-select v-model="row.BEGINT_TIME" prefix-icon='1' :picker-options="{start: '00:00',step: '00:30',end: '23:30'}" placeholder="选择时间"></el-time-select>
          </template>
        </el-table-column>
        <el-table-column  label="结束时间" min-width="168">
          <template slot-scope="{row}">
            <el-time-select v-model="row.END_TIME" prefix-icon='1' :picker-options="{start: '00:00',step: '00:30',end: '23:30'}" placeholder="选择时间"></el-time-select>
          </template>
        </el-table-column>
        <el-table-column  label="标识" min-width="168">
          <template slot-scope="scope">
            <el-dropdown @command="colorSelect">
              <span class="el-dropdown-link">
                 <div :style="{ background : scope.row.FLAG_COLOR}"></div>
              </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item v-for='(color,index) of colors' :style='{background : color}' :command='{index:scope.$index,color:color}' :key=index></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column   min-width="56">
          <template slot-scope="scope">
            <i class='el-icon-delete' v-if='scope.$index != shiftList.length - 1' @click='del(scope.$index)'></i>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="popshow = false">取消</el-button>
        <el-button @click="save">确定</el-button>
      </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "shiftEdit",

        data(){
          return{
            popshow : false,
            shiftList : [],
            colors : ['#C9FCFC','#CAECF6','#A4E3EA','#4ED591','#23BBC5','#68E7CC','#6DC9F7','#619AF2','#B8ABFF','#F3FB8A'],
            deleteArr : []
          }
        },

        methods : {
          setData(data){
            this.popshow = true
            console.log(data);
            this.shiftList = data
            this.pushData()
          },
          pushData(){
            this.shiftList.push({
              WARD_ID : JSON.parse(localStorage.info).ward_id,
              NAME : '',
              BEGINT_TIME : '',
              END_TIME : '',
              FLAG_COLOR : '',
              SORT : ''
            })
          },
          colorSelect(command){
            this.shiftList[command.index].FLAG_COLOR = command.color
          },
          del(index){
            this.shiftList[index].IS_DELETE = 1
            this.deleteArr.push(this.shiftList[index])
            this.shiftList.splice(index, 1)
          },
          save(){
            var flag = true
            var flagColor = true
            var flagNull = true
            this.shiftList.splice(this.shiftList.splice.length - 1 , 1)//delete 最后一条数据
            /*重复判断函数截留*/
            this.shiftList.forEach(each1=>{
              this.shiftList.forEach(each2=>{
                  each1 != each2 && each1.SORT == each2.SORT ? flag = false : null
                  each1 != each2 && each1.FLAG_COLOR == each2.FLAG_COLOR ? flagColor = false : null
              })
            })
            this.shiftList.forEach(item=>{
              for(var k in item){
                !item[k] ? flagNull = false : null
              }
            })

            if(flag == false) this.$message({type: 'warning', message: '序号不能重复,请重新填写'})
            if(flagColor == false) this.$message({type: 'warning', message: '标识不能重复，请重新选择'})
            if(flagNull == false) this.$message({type: 'warning', message: '非最后一行任意表单不能为空'})
            if(flag == false || flagColor == false || flagNull == false) return
            this.shiftList = [...this.deleteArr,...this.shiftList]
            /*重复判断函数截留*/
            console.log(JSON.stringify(this.shiftList));
            this.post('datacenter/shift',{ data:JSON.stringify(this.shiftList) },res => {
              if(res.status < 400) {
                this.popshow = false
                this.$parent.$parent.popshow = false
                this.$message({type: 'success', message: '保存成功'})
                this.$parent.$parent.$parent.$refs.nurseView.getData()
              }
            })
          }
        },

        watch:{
          'shiftList': {
            handler(newValue, oldValue) {
              console.log(newValue)
              var flag = true
              for(var k in newValue[newValue.length-1]){
                newValue[newValue.length - 1][k] == '' ? flag = false : null
              }
              if (flag) this.pushData()
            },
            deep : true
          }
        }
    }
</script>

<style scoped lang='stylus'>
  .el-table >>> .current-row
    background-color #FFFFFF
    td
      background-color #FFFFFF
  .el-table >>> .el-table__row:hover
    td
      background-color #FFFFFF
  .el-table >>> th
    line-height 34px
    border-color #A5DDE9
    background-color #DDEFF9
  .el-table >>> td
    padding 0
    .cell
      padding 0
      text-align center
      .el-icon-delete
        color #E63922
        font-size 22px
        position relative
        top 2px
      .el-date-editor
        width 100%
        .el-input__inner
          padding-left 10px
          height 34px
      .el-input
        .el-input__inner
          border none
          height 34px
          &::-webkit-outer-spin-button,&::-webkit-inner-spin-button
            -webkit-appearance none
      .el-dropdown
        width 100%
        height 100%
        .el-dropdown-link
          display block
          height 23px
          div
            width 27px
            height 27px
            margin 0 auto
            border-radius 50%
            position relative
            top 1px
            border 2px solid #FFFFFF
            box-shadow 0 1px 2px 0 rgba(0,0,0,0.10)

  .el-dropdown-menu
    width 169px
    padding 5px 0
    .el-dropdown-menu__item
      width 25px
      height 25px
      border-radius 50%
      padding 0
      margin 2px 0px 2px 4px
      float left
      border 2px solid #FFFFFF
      box-shadow 0 1px 2px 0 rgba(0,0,0,0.10)

  .dialog-footer
    .el-button
      &:nth-child(1)
        background-color #DDEFF9
        color #00B3DC
        border none
        padding 13px 30px!important
      &:nth-child(2)
        background-color #00B3DC
        color #FFFFFF
        border none
        padding 13px 56px !important
</style>
