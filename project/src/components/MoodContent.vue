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
    </div>
</template>
<script>
export default {
    data() {
        return {
            mes: {},
        }
    },
    methods: {
        async petch() {
            // let res = await this.$http.get(`mood/${this.$route.name}/${JSON.parse(localStorage.getItem('userId'))}`)
            let res = await this.$http.get(`mood/${this.$route.name}`)
            console.log(this.$route)
            // 获取所有随机排列
            if(this.$route.name === 'moodlist'){
                this.mes = res.data.sort(() => {
                    return Math.random() - 0.5
                })
            }else {
                this.mes = res.data
            }
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
    }
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
