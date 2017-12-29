import createPersistedState from 'vuex-persistedstate'

export const plugins = process.browser ? [createPersistedState()] : []
export const state = () => ({
  access_token: null,
  token_limit: null,
  account: null
})

export const mutations = {
  TOKEN(state, token) {
    state.access_token = token
    state.token_limit = +new Date() + 3600 * 1000
  },
  ACCT(state, account) {
    state.account = account
  }
}

export const getters = {
  account: state => state.account,
  token: state => state.access_token,
  token_limit: state => state.token_limit,
  token_limit_rem: (state, getters) => getters.token_limit - new Date()
}
