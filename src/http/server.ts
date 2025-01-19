import { Elysia } from 'elysia'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'
import { authenticateFromLink } from './routes/authenticate-from-link'
import { getProfile } from './routes/get-profile'

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(getProfile)

app.listen(3333, () => {
  console.log('🚀 HTTP server running')
})
