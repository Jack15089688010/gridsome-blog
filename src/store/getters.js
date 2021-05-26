/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-05-23 15:19:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-05-26 19:21:03
 */
const getters = {
    token: state => state.token.token,
    githubUsername: state => state.githubUsername,
    blogTitle: state => state.blogTitle,
    blogDescribe: state => state.blogDescribe,
    htmlTitle: state => state.htmlTitle,
    fontColor: state => state.fontColor,
    useBackgroundImage: state => state.useBackgroundImage,
    backgroundColorLeft: state => state.backgroundColorLeft,
    backgroundColorRight: state => state.backgroundColorRight,
    audioUrl: state => state.audioUrl,
    mini: state => state.mini,
    audioAutoPlay: state => state.audioAutoPlay,
    webSites: state => state.webSites,
    avatarUrl: state => state.avatarUrl,
    name: state => state.name,
    location: state => state.location,
    blog: state => state.blog,
    followersTotal: state => state.followers,
    followingTotal: state => state.following,


}
export default getters
