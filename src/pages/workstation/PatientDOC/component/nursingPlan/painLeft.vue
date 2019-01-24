<template>
    <div class='pain-left'>
      <div class="title">护理路径</div>
      <div class='table'>
        <el-table :data='STAGE' border width='100%' class='custom' @row-click='rowClick' @row-contextmenu='tableRightClick'>
          <el-table-column label="状态" width='50'>
            <template slot-scope="scope">
              <i class='path-status' :class='"path-status"+scope.row.STATUS'></i>
            </template>
          </el-table-column>
          <el-table-column label="阶段" width='50'>
            <template slot-scope="scope">
              <i class='current' v-if='scope.row.current == 1'></i>
              <span v-else='scope.row.current == 1'>{{greekNumbers[scope.$index]}}</span>
            </template>
          </el-table-column>
          <el-table-column label="住院" width='50' class='hhh'>
            <template slot-scope="scope">
              <div v-for='(item,index) of scope.row.numberOfDays' style='line-height: 35px;' :class='[ scope.row.numberOfDays.length - 1 != index ? "border-bottom" : ""]'>{{item}}</div>
            </template>
          </el-table-column>
          <el-table-column label="术后" width='50'>
            <template slot-scope="scope">
              <div v-for='(item,index) of scope.row.operation' style='line-height: 35px;height: 36px;' :class='[ scope.row.operation.length - 1 != index ? "border-bottom" : ""]' >
                <i class='knife' v-if='item.type == 1'></i>
                <span v-if='item.type == 2' >{{item.num}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="完成时间" width='140' prop=''>
            <template slot-scope="scope">
              <span v-if='scope.row.STATUS != 1'>{{scope.row.FINISH_TIME}}</span>
            </template>
          </el-table-column>
          <el-table-column label="执行人" prop=''>
            <template slot-scope="scope">
              <span v-if='scope.row.STATUS != 1'>{{scope.row.EXECUTOR}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class='title'>期望目标</div>
      <ul class='goal'>
        <li v-for='(item,index) of TARGET' @contextmenu.prevent="goalRightClick($event,item)">
          <i class='goal-status' :class='"goal-status"+item.STATUS'></i>
          <span>{{item.TARGET}}</span>
        </li>
      </ul>
      <transition name="el-zoom-in-top">
        <div class='fixed' ref='fix' v-show='fixShow' @mouseout='fixMouseOut'>
          <div class='complete' @click='getAxios(2)' v-show='obj.STATUS !=2 '>完成</div>
          <div class='termination' @click='getAxios(1)' v-show='obj.STATUS !=1 '>取消</div>
        </div>
      </transition>
    </div>
</template>

<script>
    export default {
        name: "painLeft",

        props: ['STAGE','TARGET','STATUS1'],

        data(){
          return{
            greekNumbers : ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
            fixShow : false,
            obj : {},
            id : '',
            type : ''
          }
        },

        methods:{
          rowClick(row){
            this.$parent.active_STAGE = row
          },
          tableRightClick(row,e){
            e.preventDefault()
            if(this.STATUS1 == 2 || this.STATUS1 == 3) return
            console.log(row);
            this.$refs.fix.style.left = e.clientX - 4  + 'px'
            this.$refs.fix.style.top = e.clientY - 4  + 'px'
            this.fixShow = true
            this.type = 'NPS'
            this.id = row.ID
            this.obj = row
          },
          goalRightClick(e,item){
            if(this.STATUS1 == 2 || this.STATUS1 == 3) return
            this.$refs.fix.style.left = e.clientX - 4  + 'px'
            this.$refs.fix.style.top = e.clientY - 4  + 'px'
            this.fixShow = true
            this.type = 'NT'
            this.id = item.ID
            this.obj = item
          },
          getAxios(status){
            this.fixShow = false
            this.getSer('datacenter/nursingplan/operate' ,{ id : this.id , status , type : this.type } , res=>{
              console.log("112",res);
              if(res.status < 400){
                this.$message({ type: 'success', message : '编辑成功'})
                this.obj.STATUS = status
                this.obj.FINISH_TIME = res.data.colck
                this.obj.EXECUTOR = res.data.executor
              }
            })
          },
          fixMouseOut(e){
            console.log(e);
            if(e.toElement.className == 'complete' || e.toElement.className == 'termination'){
              return
            }
            this.fixShow = false
          },

        }
    }
</script>

<style scoped lang='stylus'>
  .pain-left
    width 425px
    border-top 0
    .title
      line-height 36px
      text-indent 1em
      font-weight 600
      border-right 1px solid #D8E3E7
      border-left 1px solid #D8E3E7
    .table
      .custom
        &>>>.el-table__header-wrapper
          th
            background-color #DDEFF9
            .cell
              line-height 30px
        &>>>.el-table--border td
          border-right 1px solid #D8E3E7
        &>>>.el-table__body-wrapper
          td
            padding 0
          .cell
            text-align center
            padding 0
            .path-status
              display block
              margin 5px 15px
              width 18px
              height 18px
            .path-status1
              background url("./image/status1.png")
            .path-status2
              background url("./image/status2.png")
            .border-bottom
              border-bottom 1px solid #D8E3E7
              box-sizing border-box
            .knife
              position relative
              left 15px
              top 8px
              display block
              width 18px
              height 18px
              background url("./image/knife.png")
            .current
              left 15px
              margin 0 auto
              display block
              width 18px
              height 18px
              background url("./image/current.png")
    .goal
      border 1px solid #D8E3E7
      padding 5px 0
      min-height 150px
      li
        line-height 30px
        .goal-status
          position relative
          display inline-block
          width 18px
          height 18px
          margin 0 8px 0 17px
          top 4px
        .goal-status1
          background url("./image/status1.png")
        .goal-status2
          background url("./image/status2.png")
    .fixed
      position fixed
      width 130px
      z-index 3000
      background-color #00B3DC
      line-height 34px
      text-align center
      .complete
        border-bottom 1px solid #FFFFFF
        color #FFFFFF
      .termination
        color #FFFFFF
</style>
