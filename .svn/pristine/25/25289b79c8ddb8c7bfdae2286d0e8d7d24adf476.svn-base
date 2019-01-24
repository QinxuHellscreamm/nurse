<template>
    <div class="in-content" style="margin:0 auto 0 20px">
      <div style="width:100%">
        <div class="in-top">
          <span style="float:left;line-height:40px">版本管理</span>
          <div style="float:right">
            <uploadVersion  @up="upsuccess"></uploadVersion>
          </div>
        </div>
          <div class="out-main">
            <div id="dataTable" class="out-main">
              <el-table :data="versionList" style="width: 100%">
                <el-table-column fixed prop="ID" label="ID" min-width='90'></el-table-column>
                <el-table-column fixed prop="UPGR_VERSION" label="版本号" min-width='90'></el-table-column>
                <el-table-column fixed label="上传时间" min-width='150'>
                  <template slot-scope="{row}">
                    <div>{{row.UPGR_CREATETIME | stampTotime}}</div>
                  </template>
                </el-table-column>
                <el-table-column fixed prop="UPGR_STATUS" label="状态" min-width='90'>
                  <template slot-scope="{row}">
                    <span v-if="row.UPGR_STATUS == '1'">启用</span><span v-else>停用</span>
                  </template>
                </el-table-column>
                <el-table-column fixed prop="UPGR_ISFORCE" label="强制更新" min-width='90'>
                  <template slot-scope="{row}">
                    <div>{{row.UPGR_ISFORCE | yesorno}}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="USERNAME" label="编辑人" min-width='50'></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <span @click="viewClick(scope.row.ID)" class="ver-btn">编辑</span>
                    <el-button @click="open6(scope.row.ID, scope.row.UPGR_STATUS)" type="text" size="small"><span v-if="scope.row.UPGR_STATUS == '1'">停用</span><span v-else>启用</span></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="block" style="margin:20px 0;">
           <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page="currentPage1"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="versionCount">
            </el-pagination>
          </div>
          <viewVersion ref='child'></viewVersion>
        </div>
    </div>
</template>
<script>
    import uploadVersion from "./uploadVersion.vue"
    import viewVersion from "./viewVersion.vue"
    export default{

        data(){
            return {
              versionList:[],
              currentPage1: 1,
              pageSize: 20,
              versionCount:0,
              abled:false
            }
        },

        mounted(){
          this.$nextTick(()=> {
            this.pageAjax()     //进入页面默认请求第一页
          })
        },

        methods: {
          pageAjax(){
            this.getSer("datacenter/version" ,{ page : this.currentPage1 , page_size : this.pageSize } , res => {
              if(res.status == 200){
                this.versionList = res.data.items
                this.versionCount = parseInt(res.data.meta.totalCount)
              }else{
                this.$message(res.data.message)
              }
            })
          },
          viewClick(id){
            this.$refs.child.viewClick(id)
          },
          handleCurrentChange(val) {       //当前页变化的时候
           this.currentPage1 = val
           this.pageAjax()
          },
          open6(id,status) {
            const isstr = status === "0" ? "启用该版本" : "停用该版本"
            this.$confirm('是否确定'+isstr, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              this._put("datacenter/version/operate",{ "id" : id , "upgr_status" : status }, res => {
              if(res.data.status=="201"){
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                })
                this.pageAjax()
              }
            })
          }).catch(() => {
              this.$message({
              type: 'info',
              message: '已取消操作'
            });
          });
          },
          upsuccess(){
            this.pageAjax();
          }
        },

        components:{uploadVersion,viewVersion}
    }
</script>
<style>

</style>
