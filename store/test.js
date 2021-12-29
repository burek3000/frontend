export const state = () => {
    return ({
        imageUrls: null,
        imageNames: null
    });
}

export const getters = {
    getImageUrls({ imageUrls }) {
        return imageUrls
    },

    getImageNames({ imageNames }) {
        return imageNames
    },
}

export const mutations = {
    SET_IMAGE_URLS(state, imageUrls) {
        state.imageUrls = imageUrls;
    },
    SET_IMAGE_NAMES(state, imageNames) {
        state.imageNames = imageNames;
    },
}

export const actions = {
    async fetchImages({ commit }) {
        try {
            const data = await this.$api.$get('/test/imageNames') || {}

            await commit('SET_IMAGE_NAMES', data.randomImages)

            const imageUrl = data.randomImages.map(
                (name) => "http://localhost:4000/images/" + name + ".JPG");

            await commit('SET_IMAGE_URLS', imageUrl)
            return imageUrl;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
}
