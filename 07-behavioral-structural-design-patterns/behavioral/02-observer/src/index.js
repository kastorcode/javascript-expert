import Payment from './events/payment.js'
import Marketing from './observers/marketing.js'
import Shipment from './observers/shipment.js'
import PaymentSubject from './subjects/paymentSubject.js'

const marketing = new Marketing()
const shipment = new Shipment()

const subject = new PaymentSubject()
subject.subscribe(marketing)
subject.subscribe(shipment)

const payment = new Payment(subject)
payment.creditCard({
  userName: 'Matheus Ramalho de Oliveira',
  id: Date.now()
})

subject.unsubscribe(marketing)
payment.creditCard({
  userName: 'Naruto Uzumaki',
  id: Date.now()
})