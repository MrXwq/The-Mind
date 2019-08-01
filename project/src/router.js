import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    
    {
      path: '/mood',
      name: 'mood',
      component: () => import('./views/Mood.vue'),
      children: [
        // 全部情感页
        {
          path: 'moodlist', 
          name: 'moodlist',
          component: () => import('./views/MoodList.vue'),
        },
        // 幸福页
        {
          path: 'happinesslist',
          name: 'happinesslist',
          component: () => import('./views/HappinessList.vue'),
        },
        // 后悔页
        {
          path: 'regretlist',
          name: 'regretlist',
          component: () => import('./views/RegretList.vue'),
        },
        // 感恩页
        {
          path: 'gratitudelist',
          name: 'gratitudelist',
          component: () => import('./views/GratitudeList.vue'),
        },
        // 好友页
        {
          path: 'friendlist',
          name: 'friendlist',
          component: () => import('./views/FriendList.vue'),
        },
        // 我的主页
        {
          path: 'myself', 
          name: 'myself',
          component: () => import('./views/Myself.vue'),
          children: [
            // 个人信息
            {
              path: 'info/:id',
              name: 'info',
              component: () => import('./views/Info.vue'),
              props:true
            },
            // 信息安全
            {
              path: 'safe/:id',
              name: 'safe',
              component: () => import('./views/Safe.vue'),
              props:true
            },
            // 幸福发表页
            {
              path: 'happiness/had/:id', 
              name: 'happinesshad',
              component: () => import('./views/HappinessHad.vue'),
              props:true
            },
            {
              path: 'happiness/hope/:id', 
              name: 'happinesshope',
              component: () => import('./views/HappinessHope.vue'),
              props:true
            },
            // 后悔发表页面
            {
              path: 'regret/had/:id',
              name: 'regrethad',
              component: () => import( './views/RegretHad.vue'),
              props:true
            },
            {
              path: 'regret/remedy/:id',
              name: 'regretremedy',
              component: () => import( './views/RegretRemedy.vue'),
              props:true
            },
            // 感恩发表页面
            {
              path: 'gratitude/had/:id',
              name: 'gratitudehad',
              component: () => import( './views/GratitudeHad.vue'),
              props:true
            },
            {
              path: 'gratitude/repay/:id',
              name: 'gratituderepay',
              component: () => import( './views/GratitudeRepay.vue'),
              props:true
            },
            // 个人幸福、
            {
              path: 'happinessprivate/:id',
              name: 'happinessprivate',
              component: () => import( './views/HappinessPrivate.vue'),
              props:true
            },
            // 个人后悔、
            {
              path: 'regretprivate/:id',
              name: 'regretprivate',
              component: () => import( './views/RegretPrivate.vue'),
              props:true
            },
            // 个人感恩、
            {
              path: 'gratitudeprivate/:id',
              name: 'gratitudeprivate',
              component: () => import( './views/GratitudePrivate.vue'),
              props:true
            },
          ]
        },
      ]
    },
    // 登陆页
    {
      path: '/login',
      name: 'login',
      component: () => import( './views/Login.vue')
    },
  ]
})
