<template>
    <div class="hlContainer">
        <!-- hl == happniessList -->
        <div class="hl" v-for="item in mes" :key="item._id">
            <div class="hlLeft">
                <img class="hlImg" :src="item.url" alt="">
            </div>
            <div class="hlRight">
                <div class="hlRightTop">
                    <div class="hlTheme" >{{item.theme}}</div>
                    <div class="hlPlace" >{{item.place}}</div>
                </div>
                <div class="hlContent" >{{item.content}}</div>
                <div class="hlTime">{{item.time | dateForm}}</div>
            </div>
        </div>

        <!-- 分页 -->
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageItem"
            layout="prev, pager, next, jumper"
            :total="allData">
        </el-pagination>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 请求回来的数据
            mes: {},
            // 当前页
            currentPage: 1,
            // 每页展示的条数
            pageItem: 3,
            // 总数据
            allData: 1,

            // 数据过渡
            resarr:{}
        }
    },
    methods: {
        // 当前页改变赋值
        handleCurrentChange(val) {
            this.currentPage = val
            console.log(`当前页: ${val}`);
        },
        async petch() {
            // let res = await this.$http.get(`mood/${this.$route.name}/${JSON.parse(localStorage.getItem('userId'))}`)
            let res = await this.$http.get(`mood/${this.$route.name}`)
            
            // 所有区根据创造时间来排序
            if(this.$route.name === 'moodlist'){
                this.resarr = res.data.sort((a,b)=> {
                return Date.parse(b.createdAt)-Date.parse(a.createdAt)
                this.mes = this.resarr
            })
            }else {
                this.resarr = res.data
                this.mes = this.resarr
            }
            // 总数据长度
            this.allData = res.data.length

            // this.mes = this.resarr.slice((this.currentPage-1)*this.pageItem,this.pageItem*this.currentPage)
            let ar = [10,22,2,3].find((item, index) => {
                return item > 1
            })
            console.log(ar)
        },
        
    },
    created() {
        this.petch()
    },
    filters: {
        'dateForm': (val) => {
            var date = new Date(val)
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
    },
    watch: {
        // 监听页数的变化
        'currentPage': function(newVal) {
            // 计算分页数据
            this.mes = this.resarr.slice((this.currentPage-1)*this.pageItem,this.pageItem*this.currentPage)
        }
    },
}
</script>
<style lang="scss">
    .hlContainer {
        box-sizing: border-box;
        padding: 0 10rem;
    }
    .hl {
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: space-between;
        border: 1px solid palevioletred;
        margin-top: 3rem;
        box-sizing: border-box;
        padding: 2rem;
        overflow: hidden;
        .hlLeft {
            width: 10%;
            .hlImg {
                width: 80%;
            }
        }
        .hlRight {
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .hlRightTop {
                display: flex;
                justify-content: space-between;
            }
            .hlContent {
                width: 90%;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
            .hlTime {
                align-self: flex-end;
            }
        }
    }
</style>
