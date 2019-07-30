const express = require('express');
const path = require('path')
const app = express()

// 跨域
app.use(require('cors')())
// post请求必要
app.use(express.json()) 

app.use('/uploads',express.static(path.join(__dirname,'./uploads')))

// 挂载路由
require('./router/web/index')(app)

// 连接数据库
require('./plugins/db')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})