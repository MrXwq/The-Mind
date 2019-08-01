<template>
    <!-- 我的主页 -->
    <div class="container">
        <el-menu router :default-active = "$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">个人</span>
                </template>
                <el-menu-item-group>
                <span slot="title">信息</span>
                <el-menu-item :index="infourl">资料</el-menu-item>
                <el-menu-item :index="safeurl">安全</el-menu-item>
                </el-menu-item-group>
                
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">发表</span>
                </template>
                <el-menu-item-group>
                    <span slot="title">幸福</span>
                    <el-menu-item :index="happinesshadurl">你的幸福</el-menu-item>
                    <el-menu-item :index="happinesshopeurl">你想要的幸福</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <span slot="title">后悔</span>
                    <el-menu-item :index="regrethadurl">后悔时刻</el-menu-item>
                    <el-menu-item :index="regretremedyurl">弥补</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <span slot="title">感恩</span>
                    <el-menu-item :index="gratitudehadurl">感恩之情</el-menu-item>
                    <el-menu-item :index="gratituderepayurl">想要如何感恩</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">已发表</span>
                </template>

                <el-menu-item :index="happinessPrivateUrl">个人幸福</el-menu-item>
                
                <el-menu-item :index="regretPrivateUrl">个人后悔</el-menu-item>

                <el-menu-item :index="gratitudePrivateUrl">个人感恩</el-menu-item>
                
            </el-submenu>
        </el-menu>

        <el-main>
            <router-view :key = "$route.path"></router-view>
        </el-main>
    </div>
</template>
<script>
export default {
    // props: {
    //     id: this.$store.state.userId
    // },
    data() {
        return {
            isCollapse: false,
            infourl: `/mood/myself/info/${JSON.parse(localStorage.getItem('userId'))}`,
            safeurl: `/mood/myself/safe/${JSON.parse(localStorage.getItem('userId'))}`,
            happinesshadurl: `/mood/myself/happiness/had/${JSON.parse(localStorage.getItem('userId'))}`,
            happinesshopeurl: `/mood/myself/happiness/hope/${JSON.parse(localStorage.getItem('userId'))}`,
            happinessPrivateUrl: `/mood/myself/happinessprivate/${JSON.parse(localStorage.getItem('userId'))}`,

            regrethadurl: `/mood/myself/regret/had/${JSON.parse(localStorage.getItem('userId'))}`,
            regretremedyurl: `/mood/myself/regret/remedy/${JSON.parse(localStorage.getItem('userId'))}`,
            regretPrivateUrl: `/mood/myself/regretprivate/${JSON.parse(localStorage.getItem('userId'))}`,

            gratitudehadurl: `/mood/myself/gratitude/had/${JSON.parse(localStorage.getItem('userId'))}`,
            gratituderepayurl: `/mood/myself/gratitude/repay/${JSON.parse(localStorage.getItem('userId'))}`,
            gratitudePrivateUrl: `/mood/myself/gratitudeprivate/${JSON.parse(localStorage.getItem('userId'))}`,

        }
        
    },
    methods: {

        handleOpen(key, keyPath) {
        console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        
    },
    
    
    
}
</script>
<style lang="scss">
    .container {
        display: flex;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
                    width: 10%;
                    background: none;
                }
                .el-menu{
                    background: none;
                }
            .el-main {
                background-color: #fffafa;
                color: black;
                text-align: center;
            }
    }
</style>