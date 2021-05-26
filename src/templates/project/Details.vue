<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-05-25 00:32:41
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-05-26 09:19:41
-->
<template>
  <Layout>
    <div style="min-height: 600px" v-loading="loading">
      <el-card shadow="never" style="min-height: 400px">
        <div slot="header">
          <el-row>
            <el-col :span="12">
              <span>{{ project.name }}</span>
            </el-col>
            <el-col :span="12">
              <div style="text-align: right">
                <el-button
                  @click="$share()"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-share"
                  >分享</el-button
                >
                <el-button
                  @click="goGithub(project.url)"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-back"
                  >前往GitHub</el-button
                >
                <el-button
                  @click="more"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-more-outline"
                  >更多项目</el-button
                >
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
          发布 {{ project.createTime }} <br />
          更新 {{ project.updateTime }}
        </div>
        <div
          style="
            font-size: 1.1rem;
            line-height: 1.5;
            color: #303133;
            padding: 20px 0px 0px 0px;
          "
        >
          {{ project.description }}
        </div>
        <div
          style="
            font-size: 1.1rem;
            color: #303133;
            padding: 15px 0px 15px 0px;
            border-bottom: 1px solid #e4e7ed;
          "
        >
          <el-row>
            <el-col :span="16" style="padding-top: 5px">
              <el-tooltip
                effect="dark"
                :content="'star ' + project.stargazersCount"
                placement="bottom"
              >
                <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
              </el-tooltip>
              {{ project.stargazersCount }}
              <el-tooltip
                effect="dark"
                :content="'watch ' + project.watchersCount"
                placement="bottom"
              >
                <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{ project.watchersCount }}
              <el-tooltip
                effect="dark"
                :content="'fork ' + project.forksCount"
                placement="bottom"
              >
                <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
              </el-tooltip>
              {{ project.forksCount }}
            </el-col>
            <el-col :span="8" style="text-align: right">
              <el-tag size="small" type="danger" v-if="project.license">{{
                project.license
              }}</el-tag>
              <el-tag size="small" type="success">{{
                project.language
              }}</el-tag>
            </el-col>
          </el-row>
        </div>
        <div
          v-html="projectContent"
          v-if="projectContent"
          class="markdown-body"
          style="padding-top: 20px"
        ></div>
        <div
          v-if="!projectContent"
          style="padding: 20px 0px 20px 0px; text-align: center"
        >
          <font style="font-size: 30px; color: #dddddd">
            <b>还没有介绍 (╯°Д°)╯︵ ┻━┻</b>
          </font>
        </div>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>  
query {
  projects(id: "152960818" ){ 
        id
        name
        url        
        description
        stargazersCount
        watchersCount
        forksCount
        language
        license
        createTime
        updateTime
        hide
  }
  allReadmes{ 
    edges{
      node{
        content
      }
    }
  }
}
</page-query> 
<script>
import { mapGetters } from "vuex";
import ProjectApi from "@/api/project";
export default {
  data() {
    return {
      // project: {
      //   name: "",
      // },
      projectContent: null,
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["token"]),
    project(){
      console.log(this.$page);
        // this.$page.projects.content = this.$markdown(this.$page.projects.content)
        return this.$page.projects
    }
  },
  mounted() {
    let base64 = require("js-base64").Base64;
    this.projectContent = this.$markdown(base64.decode(this.$page.allReadmes.edges[0].node.content))
    console.log(base64.decode(this.$page.allReadmes.edges[0].node.content));
    // this.loading = true;
    // this.project.name = this.$route.params.name;
    // ProjectApi.single(this.project.name)
    //   .then((response) => {
    //     let result = response.data;
    //     let base64 = require("js-base64").Base64;
    //     this.project.id = result["id"];
    //     this.project.url = result["html_url"];
    //     this.project.stargazersCount = result["stargazers_count"];
    //     this.project.watchersCount = result["watchers_count"];
    //     this.project.forksCount = result["forks_count"];
    //     this.project.language = result["language"];
    //     this.project.description = result["description"];
    //     this.project.license = result["license"]
    //       ? result["license"]["spdx_id"]
    //       : null;
    //     this.projectContent = this.$markdown(
    //       base64.decode(result["readme_content"])
    //     );
    //     this.project.createTime = this.$util.utcToLocal(result["created_at"]);
    //     this.project.updateTime = this.$util.utcToLocal(result["updated_at"]);
    //   })
    //   .catch(() => (this.loading = false))
    //   .then(() => (this.loading = false));
  },
  methods: {
    goGithub(url) {
      window.open(url);
    },
    more() {
      this.$router.push("/project/");
    },
  },
};
</script>