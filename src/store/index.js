/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-05-23 15:19:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-05-26 22:58:48
 */
import token from './modules/token'
import user from './modules/user'
// import configuration from './modules/configuration'
import getters from './getters'
import Cookie from '@/utils/cookie'
import UserApi from '@/api/user'
import configurationData from '../../static/configuration.js'
import Vue from 'vue'

const TOKEN_KEY = "TOKEN_KEY"
const store = {
    state: {
        githubUsername: "",
        blogTitle: "",
        blogDescribe: "",
        htmlTitle: "",
        fontColor: "",
        useBackgroundImage: false,
        backgroundColorLeft: "",
        backgroundColorRight: "",
        audioUrl: "",
        mini: false,
        audioAutoPlay:false,
        webSites:[],
        token: Cookie.getAttribute(TOKEN_KEY),
        avatarUrl: 'https://avatars.githubusercontent.com/u/41071350?v=4',
        name: null,
        location: 'https://github.com/Jack15089688010',
        blog: null,
        followers: 0,
        following: 0
    },
    modules: {
        token,
        user,
        // configuration
    },
    mutations: {
        SET_CONFIGURATION: (state, configuration) => {
            // if(Object.keys(configuration).length > 0){
            //     console.log(state, configuration);
            //     state = {
            //         ...state,
            //         ...configuration
            //     }
            // }
            state.githubUsername = configuration["githubUsername"] || "GitHub-Laziji"

            state.blogTitle = configuration["blogTitle"] || state.githubUsername

            state.blogDescribe = configuration["blogDescribe"] || `欢迎来到${state.githubUsername}的个人博客。`

            state.htmlTitle = configuration["htmlTitle"] || `${state.githubUsername}的博客`

            state.fontColor = configuration["fontColor"] || "#ffffff"
  
            state.useBackgroundImage = configuration["useBackgroundImage"] || false
 
            state.backgroundColorLeft = configuration["backgroundColorLeft"] || "#155799"
    
            state.backgroundColorRight = configuration["backgroundColorRight"] || "#159957"

            //http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3
            state.audioUrl = configuration["audioUrl"] || ""

            state.mini = configuration["mini"] || false

            state.audioAutoPlay = configuration["audioAutoPlay"] || false

            state.webSites = configuration["webSites"] || []
        },
        SET_TOKEN: (state, value) => {
            // state.token = value
            state = {
                ...state,
                token: value
            }
            Cookie.setAttribute(TOKEN_KEY, value, 30)
        },
        REMOVE_TOKEN: (state) => {
            console.log(state);
            state = {
                ...state,
                token: null
            }
            Cookie.remove(TOKEN_KEY)
        }
    },
    actions: {
        LocalReload({ commit }, configuration) {
            commit('SET_CONFIGURATION', configuration)
        },
        Init({ commit }) {
            commit('SET_CONFIGURATION', configurationData)
        },
        Authentication({ commit }, accessToken) {
            UserApi.verifyToken(accessToken).then((response) => {
                let result = response.data
                console.log(result);
               
                let githubUsername = store.state.githubUsername
                if (githubUsername == result['login']) {
                    console.log(store);
                    // commit('SET_CONFIGURATION', result)
                    commit('SET_TOKEN', accessToken)
                    Vue.prototype.$notify({
                        title: '成功',
                        message: 'Token绑定成功',
                        type: 'success'
                    })
                    // Vue.prototype.$message({
                    //     message: 'Token绑定成功',
                    //     type: 'success'
                    // })
                } else {
                    Vue.prototype.$message({
                        message: 'Token用户不一致',
                        type: 'error'
                    })
                }
            }).catch(() => {

            })
        },
        Cancellation({ commit }) {
            commit('REMOVE_TOKEN')
            Vue.prototype.$message({
                message: 'Token取消绑定',
                type: 'info'
            })
        },
    },
    getters
}

export default store
