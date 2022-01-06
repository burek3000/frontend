export default function ({ store, redirect }) {
    if (store.getters['auth/isLoggedIn'] && store.getters['auth/isUser']) {
        console.log ()
        return redirect('/test')
    }
    else if (store.getters['auth/isLoggedIn'] && store.getters['auth/isExpert']) {
        return redirect('/results')
    }
}