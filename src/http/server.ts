import { Elysia } from 'elysia'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthLink } from './routes/send-auth-link'
import { authenticateFromLink } from './routes/authenticate-from-link'
import { getProfile } from './routes/get-profile'
import { getManagedRestaurant } from './routes/get-managed-restaurant'
import { getOrderDetails } from './routes/get-order-details'
import { approveOrder } from './routes/approve-order'
import { deliverOrder } from './routes/deliver-order'
import { dispatchOrder } from './routes/dispatch-order'
import { cancelOrder } from './routes/cancel-order'
import { getOrders } from './routes/get-orders'
import { getMonthReceipt } from './routes/get-month-receipt'
import { getDayOrdersAmount } from './routes/get-day-orders-amount'
import { getMonthOrdersAmount } from './routes/get-month-orders-amount'
import { getMonthCanceledOrdersAmount } from './routes/get-month-canceled-orders-amount'
import { getPopularProducts } from './routes/get-popular-products'
import { getDailyReceiptInPeriod } from './routes/get-daily-receipt-in-period'
import cors from '@elysiajs/cors'

const app = new Elysia()
  .use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  )
  .use(registerRestaurant)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(getProfile)
  .use(getManagedRestaurant)
  .use(getOrderDetails)
  .use(approveOrder)
  .use(deliverOrder)
  .use(dispatchOrder)
  .use(cancelOrder)
  .use(getOrders)
  .use(getMonthReceipt)
  .use(getDayOrdersAmount)
  .use(getMonthOrdersAmount)
  .use(getMonthCanceledOrdersAmount)
  .use(getPopularProducts)
  .use(getDailyReceiptInPeriod)
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status
        return error.toResponse()
      }
      case 'NOT_FOUND': {
        return new Response(null, { status: 404 })
      }

      default: {
        console.error(error)
        return new Response(null, { status: 500 })
      }
    }
  })

app.listen(3333, () => {
  console.log('🚀 HTTP server running')
})
