<template>
    <div class="container">
        <div v-if="err" class="text-center">
            <p>エラー</p>
            <a class="btn btn-primary" href="/">トップに戻る</a>
        </div>
        <div v-else-if="!account">
            認証中……
        </div>
        <div v-else>
            Logged in as {{account.screen_name}}.
        </div>
    </div>
</template>

<script>
  import wait from '~/util/wait'

  export default {
    name: 'authorize',
    validate({query}) {
      return !!query.code
    },
    data() {
      return {
        account: null,
        err: false
      }
    },
    async mounted() {
      try {
        const res = await this.$axios.$post('oauth/token', {code: this.$route.query.code})
        this.$store.commit('TOKEN', res.access_token)
        this.$store.commit('ACCT', res.account)
        this.account = res.account
        await wait(500)
        this.$router.push('/main/')
      } catch (err) {
        this.err = err
      }
    }
  }
</script>

<style scoped>

</style>