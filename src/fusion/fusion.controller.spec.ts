import { Test, TestingModule } from '@nestjs/testing';
import { FusionController } from './fusion.controller';

describe('FusionController', () => {
  let controller: FusionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FusionController],
    }).compile();

    controller = module.get<FusionController>(FusionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
