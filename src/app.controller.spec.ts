import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

const appServiceMock = {
  getHello: jest.fn().mockImplementation(() => 'Hello World!')
}

describe('AppController', () => {
  let appService: AppService
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      // providers: [AppService]
      providers: [
        {
          provide: AppService,
          useValue: appServiceMock
        }
      ]
    }).compile()

    appService = app.get<AppService>(AppService)
    appController = app.get<AppController>(AppController)
  })

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!')
      expect(appService.getHello()).toHaveBeenCalled()
    })
  })
})
