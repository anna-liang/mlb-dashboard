import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.config.errorHandler = (err) => {
  console.error(err)
}

app.mount('#app')
