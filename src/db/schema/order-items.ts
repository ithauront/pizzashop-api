import { createId } from '@paralleldrive/cuid2'
import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { orders } from './orders'
import { products } from './products'
import { relations } from 'drizzle-orm'

export const orderItems = pgTable('order_items', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id, {
      onDelete: 'cascade',
    }),
  productId: text('product_id').references(() => products.id, {
    onDelete: 'set null',
  }),
  priceInCents: integer('price_in_cents').notNull(),
  quantity: integer('quantity').notNull(),
})

export const orderItemsRelations = relations(orderItems, ({ one }) => {
  return {
    order: one(orders, {
      fields: [orderItems.orderId],
      references: [orders.id],
      relationName: 'order-item_order',
    }),
    product: one(products, {
      fields: [orderItems.productId],
      references: [products.id],
      relationName: 'order-item_product',
    }),
  }
})
