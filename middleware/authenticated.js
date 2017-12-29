export default function ({store, redirect}) {
  if (!store.getters.account) {
    return redirect('/')
  }
}
