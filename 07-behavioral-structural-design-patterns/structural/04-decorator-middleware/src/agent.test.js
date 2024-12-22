import { Server } from 'http'
import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { InjectHttpInterceptor } from './agent.js'

const originalHttp = jest.createMockFromModule('http')

describe('HTTP Interceptor Agent Test Suite', () => {

  const eventName = 'request'
  const request = null

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should not change header', () => {
    const response = { setHeader: jest.fn().mockReturnThis() }
    const server = new originalHttp.Server()
    server.emit(eventName, request, response)
    expect(response.setHeader).not.toHaveBeenCalled()
  })

  test('should activate header interceptor', async () => {
    await InjectHttpInterceptor()
    const response = { setHeader: jest.fn().mockReturnThis() }
    const server = new Server()
    server.emit(eventName, request, response)
    expect(response.setHeader).toHaveBeenCalledWith('X-Instrumented-By', 'Matheus Ramalho de Oliveira')
  })

})