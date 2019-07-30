<template>
    <div class="happiness">

        <header>
            <nav>
                <ul>
                    <router-link tag="li" to="/mood/moodlist">所有区</router-link>
                    <router-link tag="li" to="/mood/happinesslist">幸福区</router-link>
                    <router-link tag="li" to="/mood/regretlist">后悔区</router-link>
                    <router-link tag="li" to="/mood/gratitudelist">感恩区</router-link>
                    <router-link v-if="id" tag="li" to="/mood/myself">我的主页</router-link>
                    <router-link v-if="id" tag="li" to="/mood/friendlist">好友</router-link>
                </ul>
            </nav>
            <div class="loginingImg" v-if="id">
                <el-dropdown @command="handleCommand">
                    <img :src="user.avatar" alt="">
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="loginComponent" v-else>
                <router-link tag="div" to="/login">登陆</router-link>
            </div>
            
        </header>
        <main>
            <router-view></router-view>
        </main>
        <footer>
            <ul>
                <li>©1997-2019 Mrxwq, China. All rights boy.</li>
                <li>©1997-2019 Mrxwq, China. All rights boy.</li>
                <li>©1997-2019 Mrxwq, China. All rights boy.</li>
                <li>©1997-2019 Mrxwq, China. All rights boy.</li>
            </ul>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: '',
            user: [
                {avatar:''}
            ],
        }
    },
    methods: {
        async getUser() {
            if(localStorage.getItem('userId')) {
                this.id = JSON.parse(localStorage.getItem('userId'))
            }
            let res = await this.$http.get(`/rest/user/${this.id}`)
            this.user = res.data
        },
        handleCommand(command) {
            if(command === 'logout') {
                console.log(6)
                localStorage.clear()
                this.id = null
                this.$message({
                    message: '退出成功',
                    type: 'success'
                })
                this.$router.push('/mood/moodlist')
            }
        },
        
    },
    created() {
        this.getUser()
    },
    
}
</script>

<style lang="scss" >
    .happiness {
        header {
            background-color: #ffc0d0;
            width: 100%;
            display: flex;
            box-sizing: border-box;
            padding: 0 3rem;
            justify-content: space-around;
            nav {
                width: 60%;
                ul {
                    display: flex;
                    text-align: center;
                    line-height: 3rem;
                    height: 3rem;
                    li {
                        display: block;
                        color: white;
                        font-size: 1.3rem;
                        width: 6rem;
                        height: 100%;
                        border-bottom: 1px solid transparent;
                    }
                    li:hover {
                        background-color: white;
                        color: pink;
                    }
                }
            }
            .loginingImg {
                width: 4rem;
                height: 3rem;
                box-sizing: border-box;
                padding: 0.5rem;
                img {
                    width: 100%;
                    
                    border-radius: 50%;
                }
            }
            .loginComponent{
                align-self: center;
                width: 4rem;
                height: 2rem;
                color: white;
                background-color: #ffa1c5;
                border-radius: 0.5rem;
                cursor: pointer;
                text-align: center;
                overflow: hidden;
                div {
                    margin: 0.5rem;
                }
            }
        }
    }
    footer {
        text-align: center;
    }

</style>