import { Test, TestingModule } from '@nestjs/testing';
import { AuthJwtController } from './auth-jwt.controller';

describe('AuthJwtController', () => {
  let controller: AuthJwtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthJwtController],
    }).compile();

    controller = module.get<AuthJwtController>(AuthJwtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
