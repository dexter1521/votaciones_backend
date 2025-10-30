import { Test, TestingModule } from '@nestjs/testing';
import { MagistradosService } from './magistrados.service';

describe('MagistradosService', () => {
  let service: MagistradosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MagistradosService],
    }).compile();

    service = module.get<MagistradosService>(MagistradosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
