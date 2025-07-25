import Elysia from 'elysia'
import { auth } from '../auth'
import dayjs from 'dayjs'
import { UnauthorizedError } from '../errors/unauthorized-error'
import { db } from '../../db/connection'
import { orders } from '../../db/schema'
import { and, count, eq, gte, sql } from 'drizzle-orm'

export const getMonthOrdersAmount = new Elysia()
  .use(auth)
  .get('/metrics/month-orders-amount', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser()

    if (!restaurantId) {
      throw new UnauthorizedError()
    }

    const today = dayjs()
    const lastMonth = today.subtract(1, 'month')
    const startOfLastMonth = lastMonth.startOf('month')
    const currentMonthWithYear = today.format('YYYY-MM')
    const lastMonthWithYear = lastMonth.format('YYYY-MM')

    const ordersPerMonth = await db
      .select({
        monthWithYear: sql<string>`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`,
        amount: count(),
      })
      .from(orders)
      .where(
        and(
          eq(orders.restaurantId, restaurantId),
          gte(orders.createdAt, startOfLastMonth.toDate()),
        ),
      )
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`)

    const currentMonthOrdersAmount = ordersPerMonth.find((orderPerMonth) => {
      return orderPerMonth.monthWithYear === currentMonthWithYear
    })

    const lastMonthOrderAmount = ordersPerMonth.find((orderPerMonth) => {
      return orderPerMonth.monthWithYear === lastMonthWithYear
    })

    const diffFromLastMonth =
      currentMonthOrdersAmount && lastMonthOrderAmount
        ? (currentMonthOrdersAmount.amount * 100) / lastMonthOrderAmount.amount
        : null

    return {
      amount: currentMonthOrdersAmount?.amount,
      diffFromLastMonth: diffFromLastMonth
        ? Number((diffFromLastMonth - 100).toFixed(2))
        : 0,
    }
  })
