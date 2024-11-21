import { Test, TestingModule } from '@nestjs/testing';
import { ParserService } from './parser.service';

describe('ParserService', () => {
  let service: ParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParserService],
    }).compile();

    service = module.get<ParserService>(ParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should parse valid FXQL correctly', () => {
    const FXQL =
      'USD-GBP {\\n  BUY 0.85\\n  SELL 0.90\\n  CAP 10000\\n}\\n\\nUSD-GBP {\\n  BUY 145.20\\n  SELL 146.50\\n  CAP 50000\\n}\\n\\nGBP-USD {\\n  BUY 0.0022\\n  SELL 0.0023\\n  CAP 2000000\\n}';
    const result = service.parseFXQLStatements(FXQL);
    expect(result.results.length).toBe(3);
    expect(result.errors.length).toBe(0);
  });

  it('should return errors for invalid FXQL statements', () => {
    const FXQL = 'USD-GBP {\\n  BUY 100\\n  SELL 20\\n  CAP -3\\n}';
    const result = service.parseFXQLStatements(FXQL);
    expect(result.results.length).toBe(0);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
