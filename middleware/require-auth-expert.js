export default function ({ store, redirect }) {
  if (!store.getters['auth/isLoggedIn']) {
    return redirect('/login')

  }
  else if (!store.getters['auth/isExpert']) {
    return redirect('/test')
  }
}


