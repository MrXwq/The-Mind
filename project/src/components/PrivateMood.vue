<template>
  <el-table
    :data="form"
    style="width: 80%"
    height="600">
    <el-table-column
      fixed
      prop="createdAt"
      label="发布日期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="theme"
      label="主题"
      show-overflow-tooltip
      width="150"
      >
    </el-table-column>
    <el-table-column
      prop="place"
      label="发生地点"
      width="120">
    </el-table-column>
    <el-table-column
      prop="time"
      label="发生时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="privacy"
      label="只有自己可看"
      width="120">
    </el-table-column>
    <el-table-column
    show-overflow-tooltip
      prop="content"
      label="发表内容"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.row)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
      props: {
          id: {type: String}
      },
    methods: {
      deleteRow(rows) {
          console.log(rows._id)
          this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
            let res = await this.$http.delete(`/mood/${this.$route.name}/${rows._id}`)
            console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getPrivate() 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
                   
        });
        
      },
      async getPrivate() {
          let res = await this.$http.get(`/mood/${this.$route.name}/${this.$route.params.id}`)
          res.data.forEach(item => {
              item.privacy === 'true' ? item.privacy = '只有自己能看' : item.privacy = '公开'
          })
          this.form = res.data
      },
    
    },
    created() {
        this.getPrivate()
        
    },
    data() {
      return {
        form:[]
      }
    }
  }
</script>