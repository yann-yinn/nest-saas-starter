import { Test, TestingModule } from '@nestjs/testing';
import { AuthSessionController } from './auth-session.controller';

describe('AuthSessionController', () => {
  let controller: AuthSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthSessionController],
    }).compile();

    controller = module.get<AuthSessionController>(AuthSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
