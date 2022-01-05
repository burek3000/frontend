export const state = () => {
    return ({
        results: null,
        answers: null,
    });
}

export const getters = {
    getResults({ results }) {
        return results;
    },

    getAnswers({ answers }) {
        return answers;
    },

}

export const mutations = {
    SET_RESULTS(state, results) {
        state.results = results;
    },
    SET_ANSWERS(state, answers) {
        state.answers = answers;
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

    async deleteResults(_context, data) {
        try {
            console.log(data)
            return await this.$api.post('/test/delete', data)
        }
        catch (e) {
            console.log(e);
            return null;
        }

    },

    async fetchAnswers({ commit }, id) {
        try {
            const data = await this.$api.get(`/test/${id}/answers`);
            await commit('SET_ANSWERS', data.data.answers);
            return data;

        }
        catch (e) {
            console.log(e);
            return null;
        }
    }

}