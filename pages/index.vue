<template>
    <section class="container">
        <div>
            <h1 class="title">
                croudia archiver
            </h1>
            <h2 class="subtitle">
                archive whispers
            </h2>
            <div class="links" v-if="!account || token_limit_rem < 10 * 10 * 1000">
                <button @click="auth" class="button--grey">Login with Croudia</button>
            </div>
            <div v-else>
                <p>
                    (トークンの有効時間はあと約{{~~(token_limit_rem / 60 / 1000)}}分です)
                </p>
                <div class="links">
                    <nuxt-link to="/main/" class="button--green">@{{account.screen_name}}として続ける</nuxt-link>
                    <button @click="auth" class="button--grey">ログインし直す</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
  import appId from '~/config/oauth'
  import { mapGetters } from 'vuex'

  export default {
    components: {},
    methods: {
      auth() {
        location.assign(`https://api.croudia.com/oauth/authorize?response_type=code&client_id=${appId.app_id}`)
      }
    },
    computed: {
      ...mapGetters(['account', 'token_limit_rem'])
    }
  }
</script>

<style>
    .container {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .title {
        font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
        display: block;
        font-weight: 300;
        font-size: 100px;
        color: #35495e;
        letter-spacing: 1px;
    }

    .subtitle {
        font-weight: 300;
        font-size: 42px;
        color: #526488;
        word-spacing: 5px;
        padding-bottom: 15px;
    }

    .links {
        padding-top: 15px;
    }
</style>
