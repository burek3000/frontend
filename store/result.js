export const state = () => {
    return ({
        results: null,
        answers: null,
        emotionAnalysis: null,
        intensityAnalysis: null,
    });
}

export const getters = {
    getResults({ results }) {
        return results;
    },
    getAnswers({ answers }) {
        return answers;
    },
    getEmotionAnalysis({ emotionAnalysis }) {
        return emotionAnalysis;
    },
    getIntensityAnalysis({ intensityAnalysis }) {
        return intensityAnalysis;
    },

}

export const mutations = {
    SET_RESULTS(state, results) {
        state.results = results;
    },
    SET_ANSWERS(state, answers) {
        state.answers = answers;
    },
    SET_EMOTION_ANALYSIS(state, emotionAnalysis) {
        state.emotionAnalysis = emotionAnalysis;
    },
    SET_INTENSITY_ANALYSIS(state, intensityAnalysis) {
        state.intensityAnalysis = intensityAnalysis;
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

    async exportResults(_context, data) {
        try {
            console.log(data)
            return await this.$api.post('/test/excel', data, {
                responseType: 'arraybuffer'
            })
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
    },

    async fetchAnalysis({ commit }, id) {
        try {
            const data = await this.$api.get(`/test/${id}/analysis`);
            await commit('SET_EMOTION_ANALYSIS', data.data.emotionAnalysis);
            await commit('SET_INTENSITY_ANALYSIS', data.data.intensityAnalysis);
            return data;

        }
        catch (e) {
            console.log(e);
            return null;
        }
    }

}