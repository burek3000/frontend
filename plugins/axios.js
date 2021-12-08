export default function ({ $axios }, inject) {
    const api = $axios.create({})
    
    api.setBaseURL('http://localhost:4000')
    api.setHeader('Content-Type', 'application/json')
  
    api.interceptors.response.use(
      response => response,
      ({ response }) => response
    )
  
    inject('api', api)
  }