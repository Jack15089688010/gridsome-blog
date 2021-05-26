// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async ({
    addCollection
  }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/

    const user = addCollection('User')

    const blog = addCollection('Blog')
    const followers = addCollection('Followers')
    const followings = addCollection('Followings')
    const projects = addCollection('Projects')
    const readmes = addCollection('Readmes')

    let githubUsername = 'GitHub-Laziji'

    // 获取开源项目
    const proData = await axios.get(`https://api.github.com/users/${githubUsername}/repos?page=1&per_page=5`)
    // console.log( proData.data);
    for (const item of proData.data) {
      projects.addNode({
        id: item.id,
        name: item.name,
        url: item.html_url,
        description: item.description,
        stargazersCount: item.stargazers_count,
        watchersCount: item.watchers_count,
        forksCount: item.forks_count,
        language: item.language,
        license: item["license"] ? item["license"]["spdx_id"] : null,
        createTime: item.created_at,
        updateTime: item.updated_at,
        hide: false,
      })
    }

    // 获取readme
    //  '/repos/' + githubUsername + '/' + name + '/contents/README.md'
    const readmeData = await axios.get(`https://api.github.com/repos/${githubUsername}/canvas-utils/contents/README.md`)
    readmes.addNode({
      content: readmeData.data.content
    })
    // for (const item of readmeData.data) {
    //   readmes.addNode({
    //     content: item.content
    //   })
    // }


    // 获取用户信息
    const userData = await axios.get(`https://api.github.com/users/${githubUsername}`)
    user.addNode({
      login: userData.data.login,
      id: userData.data.id,
      followers: userData.data.followers,
      following: userData.data.following
    })

    // 获取最新动态
    const {
      data
    } = await axios.get(`https://api.github.com/users/${githubUsername}/gists?page=1&per_page=5`)
    const blogRes = await axios.get(`https://api.github.com/gists/${data[0]["id"]}`)

    for (const item in blogRes.data.files) {
      blog.addNode({
        id: data[0]["id"],
        title: item,
        content: blogRes.data.files[item]["content"],
        description: blogRes.data["description"],
        createTime: blogRes.data["created_at"],
        updateTime: blogRes.data["updated_at"]
      })
    }

    // 获取粉丝列表
    const followersRes = await axios.get(`https://api.github.com/users/${githubUsername}/followers?page=1&per_page=${userData.data.followers}`)
    for (const item of followersRes.data) {
      followers.addNode({
        id: item.id,
        name: item.login,
        htmlUrl: item.html_url,
        avatarUrl: item.avatar_url
      })
    }

    // 获取关注列表
    const followingsRes = await axios.get(`https://api.github.com/users/${githubUsername}/following?page=1&per_page=${userData.data.following}`)
    for (const item of followingsRes.data) {
      followings.addNode({
        id: item.id,
        name: item.login,
        htmlUrl: item.html_url,
        avatarUrl: item.avatar_url
      })
    }

    // 添加详情数据
    // let userList = []
    // userList= userList.concat(followersRes.data).concat(followingsRes.data)
    // for (const item of userList) {
    //   const usersRes = await axios.get(`https://api.github.com/users/${item.login}`)
    //   users.addNode({
    //     name: usersRes.data.name,
    //     avatarUrl: usersRes.data.avatar_url,
    //     htmlUrl: usersRes.data.html_url,
    //     blog: usersRes.data.blog,
    //     location: usersRes.data.location,
    //     bio: usersRes.data.bio,
    //     email: usersRes.data.email,
    //     followers: usersRes.data.followers,
    //     following: usersRes.data.following,
    //     publicRepos: usersRes.data.publicRepos
    //   })
    // }

  })

  api.createPages(({
    createPage
  }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    createPage({
      path: '/social/details/:name',
      component: './src/templates/social/Details.vue'
    })
    createPage({
      path: '/blog/details/:id',
      component: './src/templates/blog/Details.vue'
    })
    createPage({
      path: '/blog/add',
      component: './src/templates/blog/Add.vue'
    })
    createPage({
      path: '/blog/edit/:id',
      component: './src/templates/blog/Edit.vue'
    })
    createPage({
      path: '/blog/details/:id',
      component: './src/templates/blog/Details.vue'
    })
    createPage({
      path: '/project/details/:name',
      component: './src/templates/project/Details.vue'
    })
  })
}