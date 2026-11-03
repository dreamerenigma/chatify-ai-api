import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

describe('AppController', () => {
  let appController: AppController;

  const appServiceMock = {
    getHello: vi.fn().mockReturnValue('Hello World!'),
  };

  beforeEach(async () => {
    appServiceMock.getHello.mockReset();
    appServiceMock.getHello.mockReturnValue('Hello World!');

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: appServiceMock,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
      expect(appServiceMock.getHello).toHaveBeenCalledOnce();
    });
  });
});
