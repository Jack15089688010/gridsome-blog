<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-05-24 11:53:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-05-24 15:29:28
-->
<template>
  <div>
    <div v-if="followersList.length">
      <el-row style="min-height: 200px">
        <el-col
          :span="8"
          v-for="(item, index) in followersList"
          :key="'followers' + index"
          style="padding: 10px"
        >
          <el-card
            shadow="hover"
            style="font-size: 13px; color: #606266; line-height: 20px"
          >
            <i class="el-icon-star-off"></i>&emsp;
            <a
              @click="$router.push(`/social/details/${item.node.name}`)"
              style="text-decoration: none; cursor: pointer"
              >{{ item.node.name }}</a
            >
            <br />
            <i class="el-icon-message"></i>&emsp;
            <a
              :href="item.node.htmlUrl"
              target="_blank"
              style="text-decoration: none; cursor: pointer"
              >TA的主页</a
            >
            <br />
            <img
              :src="item.node.avatarUrl"
              style="width: 100%; border-radius: 5px; margin-top: 5px"
            />
          </el-card>
        </el-col>
      </el-row>
      <div style="text-align: center; margin-top: 10px">
        <Pager :info="$page.allFollowers.pageInfo" />
      </div>
    </div>
    <div
      style="
        min-height: 300px;
        margin-bottom: 20px;
        padding: 20px 0px 20px 0px;
        text-align: center;
      "
      v-else
    >
      <font style="font-size: 30px; color: #dddddd">
        <b>(￢_￢) 没有一个粉丝</b>
      </font>
    </div>
  </div>
</template>

<script>
import { Pager } from "gridsome";

export default {
  name: 'followers',
  components: {
    Pager,
  },
  data() {
    return {
      activeTab: "following",
    };
  },
  computed: {
    followersList() {
      return this.$page.allFollowers.edges;
    },
  },
  methods: {
    onSelect() {
    },
  },
};
</script>