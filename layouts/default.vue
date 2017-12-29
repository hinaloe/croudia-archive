<template>
    <div>
        <b-navbar toggleable="md">
            <b-navbar-nav class="ml-auto">
                <b-collapse is-nav id="nav_collapse">
                    <b-nav-item v-if="account">
                        <img :src="account.profile_image_url_https" class="nav-profile-icon">@{{account.screen_name}}
                    </b-nav-item>
                    <b-nav-item v-else>
                        ログインしてください
                    </b-nav-item>
                </b-collapse>
            </b-navbar-nav>
        </b-navbar>
        <nuxt/>
    </div>
</template>

<script>
  export default {
    computed: {
      account() {
        return this.$store.getters.account
      }
    }
  }
</script>

<style>
html
{
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*, *:before, *:after
{
  box-sizing: border-box;
  margin: 0;
}
.button--green
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover
{
  color: #fff;
  background-color: #3b8070;
}
.button--grey
{
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover
{
  color: #fff;
  background-color: #35495e;
}

.nav-profile-icon {
    height: 32px;
}
</style>
