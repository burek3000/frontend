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
}

export const mutations = {
    SET_IMAGE_URLS(state, imageUrls) {
        state.imageUrls = imageUrls;
    },
}

export const actions = {
    async fetchImages({ commit }) {
        try {
            const data = await this.$api.$get('/test/imageNames') || {}

            const images = data.randomImages.map(
                (name) => "http://localhost:4000/images/" + name + ".JPG");

            await commit('SET_IMAGE_URLS', images)
            return images;
        }

        catch (e) {
            console.log(e);
            return null;
        }
    }
}
