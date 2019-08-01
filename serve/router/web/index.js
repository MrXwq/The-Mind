module.exports = app => {
    const express = require('express')
    const router = express.Router()

    // 加载幸福数据库
    const Happiness = require('../../model/Happiness')
    // 加载后悔数据库
    const Regret = require('../../model/Regret')
    // 加载感恩数据库
    const Gratitude = require('../../model/Gratitude')
    // 加载用户数据库
    const User = require('../../model/User')

    // 产生token
    const jwt = require('jsonwebtoken')
    const SECRET = 'dongpeidaxiaojie'

    // 查询所有用户
    router.get('/user', async (req, res) => {
        const items = await User.find()
        res.send(items)
    })
    // 根据单条查询
    router.get('/user/:id',async (req,res) => {
        let user = await User.findById(req.params.id)
        res.send(user)
    })
    // 更新当前用户信息
   router.put('/user/:id', async (req, res) => {
       const items = await User.findByIdAndUpdate(req.params.id, req.body)
       res.send(items)
   })
    // 用户资源需要登陆验证
    app.use('/rest/', async (req,res,next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        if(!token) {
            return res.status(401).send({
                message: '请登陆'
            })
        }

        const {id} = jwt.verify(token, SECRET)
        if(!id) {
            return res.status(401).send({
                message: '请登录'
            })
        }

        req.user = await User.findById(id)
        if(!req.user) {
            return res.status(401).send({
                message: '请登录'
            })
        }

        await next()
    } ,router)
    
    
    // 获取所有幸福列表
    router.get('/happinesslist',async (req, res) => {
        const items = await Happiness.find()
        res.send(items)
    })
    // 创造幸福时刻
    router.post('/happinesslist',async (req, res) => {
        console.log('传过来的信息：'+ req.body.happiness[0])
        const items =await Happiness.create(req.body.happiness[0])
        res.send(items)
    })
    // 获取个人幸福列表
    router.get('/happinessprivate/:id',async (req, res) => {

        const items = await Happiness.find({hid:req.params.id})
        res.send(items)
    })
    // 根据id删除单条幸福记录
    router.delete('/happinessprivate/:id', async (req, res) => {
        console.log(req)
        const items = await Happiness.findByIdAndDelete(req.params.id)
        res.send(items)
    })

    // 获取所有后悔列表
    router.get('/regretlist',async (req, res) => {
        const items = await Regret.find()
        res.send(items)
    })
    // 创建个人后悔时刻
    router.post('/regretlist',async (req, res) => {
        console.log('传过来的信息：'+ req.body.regret.rid)
        const items =await Regret.create(req.body.regret)
        console.log(items)
        res.send(items)
    })
    // 获取个人后悔列表
    router.get('/regretprivate/:id',async (req, res) => {
        const items = await Regret.find({rid:req.params.id})
        res.send(items)
    })
    // 根据id删除单条后悔记录
    router.delete('/regretprivate/:id', async (req, res) => {
        console.log(req)
        const items = await Regret.findByIdAndDelete(req.params.id)
        res.send(items)
    })

    // 获取所有感恩列表
    router.get('/gratitudelist',async (req, res) => {
        const items = await Gratitude.find()
        res.send(items)
    })
    // 创建感恩时刻
    router.post('/gratitudelist',async (req, res) => {
        const items = await Gratitude.create(req.body.gratitude)
        res.send(items)
    })
    // 获取个人感恩列表
    router.get('/gratitudeprivate/:id',async (req, res) => {
        
        let items = await Gratitude.find({gid:req.params.id})
        res.send(items)
    })
    // 根据id删除单条感恩记录
    router.delete('/gratitudeprivate/:id', async (req, res) => {
        console.log(req)
        const items = await Gratitude.findByIdAndDelete(req.params.id)
        res.send(items)
    })

    router.get('/moodlist', async (req, res) => {
        const happinesslist = await Happiness.find()
        const gratitudelist = await Gratitude.find()
        const regretlist = await Regret.find()
        const moodlist = [...happinesslist, ...gratitudelist, ...regretlist]
        res.send(moodlist)
    })
    // 观看资源不需要登陆验证
    app.use('/mood/', router)


    // 文件上传处理
    var multer  = require('multer')
    var upload = multer({ dest: __dirname + '\\..\\..\\uploads' })
    app.post('/upload',upload.single('file'), async (req,res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    // 注册请求
    app.post('/register',async (req, res) => {
        const information = req.body

        const user = await User.create(information)
        res.send(user)
    })
    // 登陆请求
    app.post('/login',async (req, res) => {
        const {tel,password} = req.body
        // 找到数据库中的电话和密码
        const user = await User.findOne({tel}).select('+password')
        if(!user) {
            return res.status(422).send({
                message: '用户不存在'
            })
        }
        //对比请求的密码和数据库中的密码
        const isValue = require('bcrypt').compareSync(password, user.password)
        if(!isValue) {
            return res.status(422).send({
                message: '密码错误'
            })
        }
        // 根据id生成token
        const token = jwt.sign({id:user._id}, SECRET)
        res.send({token,user})
    })
}