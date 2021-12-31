
const COOKIE_NAME = 'session-token'

export const state = () => ({
    user: null,
    token: null
})


export const getters = {
    getUser({ user }) {
        return user
    },
    getToken({ token }) {
        return token
    },
    isLoggedIn({ user }) {
        return Boolean(user && user.id);
    }
}


export const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
    SET_TOKEN(state, token) {
        state.token = token;
    }
}


export const actions = {
    async doLogin({ dispatch }, loginData) {

        try {
            const data = await this.$api.$post('/login', loginData) || {}

            if (!data.token) {
                return data
            }

            await dispatch('setToken', { token: data.token })

            await dispatch('fetchUserInfo', data.token)

            return data;
        }

        catch (e) {
            console.log(e);
            return null;
        }
    },

    async fetchUserInfo({ commit, state }) {
        try {
            if (!state.token) {
                return null
            }
            const data = await this.$api.$get('/user/info')
            if (data.id) {
                await commit('SET_USER', data)
            }
            return data
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    getTokenFromCookie() {
        return this.$cookies.get(COOKIE_NAME)
    },


    async setToken({ commit }, { token }) {
        try {
            await commit('SET_TOKEN', token)

            this.$cookies.set(COOKIE_NAME, token,
                {
                    path: '/',
                }
            )
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

    async loadToken({ dispatch, commit }) {
        try {
            const token = await dispatch('getTokenFromCookie')
            if (!token) {
                return null
            }
            await commit('SET_TOKEN', token)
            return token
        }
        catch (e) {
            console.log(e);
            return null;
        }

    },

    async nuxtServerInit({ dispatch }) {
        try {
            const token = await dispatch('loadToken')

            if (token) {
                await dispatch('fetchUserInfo')
            }
        }
        catch (e) {
            console.log(e);
            return null;
        }

    },

    doLogout({ commit }) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
        this.$cookies.remove(COOKIE_NAME)
    },


}
