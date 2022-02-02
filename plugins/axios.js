export default function ({ $axios, store }, inject) {
  const api = $axios.create({})

  api.setBaseURL(process.env.API_URL)
  api.setHeader('Content-Type', 'application/json')

  api.interceptors.request.use(
    (config) => {
      const token = store.getters['auth/getToken']

      if (token) {
        api.setHeader('authorization', token)
      }

      return config
    }
  )

  api.interceptors.response.use(
    response => response,
    ({ response }) => response
  )

  inject('api', api)
}