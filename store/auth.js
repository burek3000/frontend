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
    async doLogin({ commit }, loginData) {

        try {
            const data = await this.$api.$post('/login', loginData) || {}

            if (!data.token) {
                return data
            }

            await commit('SET_TOKEN', data.token)

            return data;
        }

        catch (e) {
            console.log(e);
            return null;
        }
    }
}
