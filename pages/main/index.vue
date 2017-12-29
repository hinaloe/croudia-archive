<template>
    <div class="container">
        <p class="text-center">{{createdAt}}から{{account.statuses_count}}件のささやきが存在しそうです。</p>
        <div class="text-center">
            <h2>1. ささやきを読み込む</h2>
            <b-button @click="loadStatuses" v-if="!loadStarted">まずはすべての囁きを読み込む</b-button>
            <b-button v-else disabled>開始しました……</b-button>
            <p>※画面には表示されません</p>
        </div>
        <div class="text-center">{{message}}</div>
        <div class="text-center">
            <h2>2. 読み込んだささやきを保存する</h2>
            <b-button @click="saveAsFile" v-if="loaded">保存する</b-button>
            <b-button disabled v-else>まずはささやきを読み込んでください</b-button>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import wait from '~/util/wait'
  import { last } from '~/util/arr'

  export default {
    name: 'index',
    middleware: 'authenticated',
    data() {
      return {
        statuses: [],
        message: '',
        loaded: false,
        loadStarted: false
      }
    },
    computed: {
      ...mapGetters(['account', 'token']),
      createdAt() {
        const date = new Date(this.account.created_at)
        return `${date.getFullYear()}年${date.getMonth() + 1}月`
      }
    },
    methods: {
      async loadStatuses() {
        this.statuses = []
        this.loadStarted = true
        try {
          while (true) {
            this.message = `${this.statuses.length}件取得済み ${this.statuses.length ? ` / ID ${last(this.statuses).id}以前を取得中……` : ''}`
            const params = this.statuses.length ? {max_id: last(this.statuses).id} : {}
            params.access_token = this.token
            params.user_id = this.account.id
            const statuses = await this.$axios.$get('user_timeline', {params})
            if (!Array.isArray(statuses)) {
              throw new Error('レスポンスが異常です')
            }
            if (statuses.length === 0) break
            this.statuses.push(...statuses)
            await wait(1000)
          }
          this.message = `${this.statuses.length}件のささやきを取得しました。`
          this.loaded = true
        } catch (e) {
          this.message = e.message
          console.error(e)
          this.loadStarted = false
        }
        //
      },
      saveAsFile() {
        const blob = new Blob([JSON.stringify(this.statuses)], {type: 'application/json'})
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.download = `croudia:${this.account.screen_name}のささやきバックアップ`
        a.href = url
        a.click()
      }
    }
  }
</script>

<style scoped>

</style>