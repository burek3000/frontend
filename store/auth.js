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
    async doLogin({ commit, dispatch }, loginData) {

        try {
            const data = await this.$api.$post('/login', loginData) || {}

            if (!data.token) {
                return data
            }

            await commit('SET_TOKEN', data.token)

            await dispatch('fetchUserInfo')

            return data;
        }

        catch (e) {
            console.log(e);
            return null;
        }
    },

    async fetchUserInfo({
        commit,
        state
    }) {
        try {
            if (!state.token) {
                return null
            }
            const data = await this.$api.$get('/user/info')

            if (data.id) {
                await commit('SET_USER', data)
            }

        }
        catch (e) {
            console.log(e);
            return null;
        }
    },
}
