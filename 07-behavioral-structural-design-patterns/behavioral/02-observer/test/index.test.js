import { beforeAll, describe, expect, jest, test } from '@jest/globals'
import Payment from '../src/events/payment.js'
import Marketing from '../src/observers/marketing.js'
import Shipment from '../src/observers/shipment.js'
import PaymentSubject from '../src/subjects/paymentSubject.js'

describe('Observer Pattern Test Suite', () => {

  beforeAll(() => {
    jest.spyOn(console, console.log.name).mockImplementation(() => {})
  })

  test('#PaymentSubject should notify observers', () => {
    const observer = {
      update: jest.fn()
    }
    const subject = new PaymentSubject()
    subject.subscribe(observer)
    const data = 'Hello, World!'
    subject.notify(data)
    expect(observer.update).toBeCalledWith(data)
  })

  test('#PaymentSubject should not notify unsubscribed observers', () => {
    const observer = {
      update: jest.fn()
    }
    const subject = new PaymentSubject()
    subject.subscribe(observer)
    subject.unsubscribe(observer)
    const data = 'Hello, World!'
    subject.notify(data)
    expect(observer.update).not.toHaveBeenCalled()
  })

  test('#PaymentSubject should notify subject after a credit card transaction', () => {
    const subject = new PaymentSubject()
    const payment = new Payment(subject)
    const paymentSubjectNotifySpy = jest.spyOn(payment.paymentSubject, payment.paymentSubject.notify.name)
    const data = {
      userName: 'Matheus Ramalho de Oliveira',
      id: Date.now()
    }
    payment.creditCard(data)
    expect(paymentSubjectNotifySpy).toBeCalledWith(data)
  })

  test('#All should notify subscribers after a credit card payment', () => {
    const subject = new PaymentSubject()
    const shipment = new Shipment()
    const shipmentUpdateSpy = jest.spyOn(shipment, shipment.update.name)
    subject.subscribe(shipment)
    const marketing = new Marketing()
    const marketingUpdateSpy = jest.spyOn(marketing, marketing.update.name)
    subject.subscribe(marketing)
    const payment = new Payment(subject)
    const data = {
      userName: 'Matheus Ramalho de Oliveira',
      id: Date.now()
    }
    payment.creditCard(data)
    expect(shipmentUpdateSpy).toBeCalledWith(data)
    expect(marketingUpdateSpy).toBeCalledWith(data)
  })

})