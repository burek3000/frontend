export const state = () => {
    return ({
        results: null,
    });
}

export const getters = {
    getResults({ results }) {
        return results;
    },
}

export const mutations = {
    SET_RESULTS(state, results) {
        state.results = results;
    },
}

export const actions = {
    async fetchTestResults({ commit }) {
        try {
            const data = await this.$api.$get('/test/results') || {}

            await commit('SET_RESULTS', data.users)

            return data;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    },

}