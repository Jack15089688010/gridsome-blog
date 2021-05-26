<template>
  <Layout>
    <div>
      <el-card
        shadow="never"
        style="
          min-height: 400px;
          margin-bottom: 20px;
          padding: 0px 0px 20px 0px;
        "
      >
        <el-tabs v-model="activeTab" type="card" @tab-click="onSelect">
          <el-tab-pane
            :label="'粉丝 ' + user.followers"
            name="followers"
            style="padding: 5px"
          >
            <followers />
          </el-tab-pane>
          <el-tab-pane
            :label="'关注 ' + user.following"
            name="following"
            style="padding: 5px"
          >
            <following />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query ($page: Int) {
  allUser{
    edges {
      node {
        id
        login
        followers
        following
      }
    }
  }
  allFollowers(perPage:9, page:$page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        name
        htmlUrl
        avatarUrl
      }
    }
  }
    allFollowings(perPage:9, page:$page) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        name
        htmlUrl
        avatarUrl
      }
    }
  }
}
</page-query>  
<script>
import { Pager } from "gridsome";
import Followers from "./followers";
import Following from "./following";

export default {
  components: {
    Pager,
    Followers,
    Following,
  },
  data() {
    return {
      activeTab: "followers",
    };
  },
  computed: {
    user() {
      return this.$page.allUser.edges[0].node;
    },
    followersList() {
      return this.$page.allFollowers.edges;
    },
  },
  methods: {
    onSelect() {
      // switch (this.activeTab) {
      //   case "followers":
      //     break;
      //   case "following":
      //     this.$router.push('/social/following')
      //     break;
      //   default:
      //     break;
      // }
    },
  },
};
</script>