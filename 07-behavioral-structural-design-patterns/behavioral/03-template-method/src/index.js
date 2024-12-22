import OrderBusiness from './business/orderBusiness.js'
import Order from './entities/order.js'

const order = new Order({
  customerId: '123',
  amount: 200.000,
  products: [{ description: 'house' }]
})

const orderBusiness = new OrderBusiness()
console.info('Order created: ', orderBusiness.create(order))