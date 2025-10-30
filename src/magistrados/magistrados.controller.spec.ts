import { Test, TestingModule } from '@nestjs/testing';
import { MagistradosController } from './magistrados.controller';

describe('MagistradosController', () => {
  let controller: MagistradosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagistradosController],
    }).compile();

    controller = module.get<MagistradosController>(MagistradosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
