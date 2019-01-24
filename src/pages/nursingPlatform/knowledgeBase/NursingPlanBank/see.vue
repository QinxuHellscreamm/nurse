<template>
  <el-dialog title="查看护理" :visible.sync="viewdialogFormVisible" width='800px' class='custom'>
    <el-form :model="ruleForm" ref="ruleForm" label-width="80px">
      <el-form-item label="疾病名称">
        <el-input v-model="ruleForm.DIS_NAME" auto-complete="off" placeholder="搜索选择项"  disabled></el-input>
      </el-form-item>
      <div class="aimtitle" style="height: 40px;">
        <p>预期目标</p>
      </div>
      <div class="aim">
        <p v-for="(val,key,i) in ruleForm.TARGET">{{val}}</p>
      </div>
      <div class="aimtitle" style="height: 40px;">
        <p>护理路径<span style="margin-left: 10px;font-size: 15px;">(共{{ruleForm.SUM_DAYS}}天)</span></p>
      </div>
      <el-tabs v-model="editableTabsValue"  type="card">
        <el-tab-pane v-for="(item, index) in ruleForm.DATA" :key="item.STAGE_NUMBER" :label="item.STAGE_NUMBER | romeNumber" :name="item.index">
          <div style="border: 1px solid #D8E3E7;padding: 20px 10px;min-height: 250px;">
            <div class="Dtime">
              <span class="timeDa">住院持续天数</span>
              <span  class="timeDa">{{item.FEW_DATS}}天</span>
              <span style="margin-left: 50px"  class="timeDa">手术(分娩)本阶段第</span>
              <span  class="timeDa">{{item.THAT_DAY!=null ? item.THAT_DAY.DAYS : ''}}天</span>

            </div>
            <div class="aimtitle go">
              <div>
                <p>执行医嘱</p>
              </div>
              <div style="" class="tabNurbot">
                <p v-for="(val, key) in item.EXECUTE_ORDER" @click="bbb(val,key)">
                  {{ val }}
                </p>
              </div>
            </div>
            <div class="aimtitle go">
              <div>
                <p>护理与健康指导</p>
              </div>
              <div class="tabNurbot">
                <p v-for="(val, key) in item.HEALTH_NOTES" @click="ccc(val,key)">
                  {{ val }}
                </p>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="viewdialogFormVisible = false" >取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>

  export default {
    name: "see",

    data(){
      return{
        viewdialogFormVisible : false,
        ruleForm : {},
        editableTabsValue: '0',
      }
    },

    methods:{
      viewItem(id){
        this.editableTabsValue="0",
        this.getSer('datacenter/nursingpath/' + id, { id }, (res) => {
        this.ruleForm = res.data
        this.viewdialogFormVisible = true
      })
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .custom >>> .el-dialog__body
    padding 30px
    .el-tabs>.el-tabs__header
      border none
      margin 0
  .el-form-item
    margin-bottom 0px
  .el-form-item >>> .el-form-item__label
    font-size 16px!important
  .el-form-item .el-autocomplete
    width 50%
  .el-form-item__content .el-input >>> .el-input__inner
    background-color #F9F9FB
  .el-textarea >>> .el-textarea__inner
    background-color #F9F9FB
    height 240px
    resize none
  .tag-box
    margin-top 10px
    .el-tag
      margin-right 8px
  .aim
    min-height 40px
    background #f9f9fb
    border 1px solid #d8e3e7
    padding 10px
  .aim .el-table
    border 1px solid #D8E3E7
    border-bottom none
    background #f9f9fb
    ::before
      height 0
  .aim >>> .el-table .el-table__row
    background-color #F9F9FB
  .el-table >>> .el-table__row td
    border none
    padding 4px 0
  .aimtitle
    line-height 40px
    padding 10px 0
    p
      font-size 16px
      color #00B3DC
  .el-tabs >>> .el-tabs__item
    background-color #DDEFF9
    margin-right 10px
    color #00B3DC
    border-radius 10px 10px 0 0
    line-height 35px
  .el-tabs >>> .el-tabs__item.is-active
    border none
    color #fff
    background-color #00B3DC
  .el-tabs >>> .el-table__body-wrapper
    background-color #f9f9fb
  .el-tabs >>> .el-tabs--card>.el-tabs__header .el-tabs__nav
    border none
  .el-tabs >>> .el-tabs__nav
    padding-left 10px
    height 30px
    border none
  .Dtime .timeDa
    float left
    margin-right 20px
    line-height 40px
    font-size 14px
  .Dtime .el-input
    float left
    width 18%
  .Dtime .el-input >>> .el-input__inner
    width 100%
    background #f9f9fb
  .go
    clear both
    p
      color #2B3A50
  .addTab
    position absolute
    z-index 99
    left 106px
    .el-button--default
      padding 0
      border none
      color #11C462
      span
        font-size 26px
      :hover
        color #11C462
        background #fff
    .el-button:focus
      background #fff
      color #11C462
  .tabNurbot
    border 1px solid #D8E3E7
    padding 10px
    background #F9F9FB
    clear both
    min-height 20px
    p
      font-size 14px
      line-height 20px
  .tabNurbot >>> .el-table tr
    background #F9F9FB
</style>
