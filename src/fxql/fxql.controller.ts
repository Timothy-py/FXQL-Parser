import { Body, Controller, Get, Post } from '@nestjs/common';
import { FxqlService } from './fxql.service';
import { CreateFxqlDto } from './dto/fxql.dto';

@Controller('fxql-statements')
export class FxqlController {
  constructor(private readonly fxqlService: FxqlService) {}

  @Post()
  async parseFxqlQuery(@Body() createFxqlDto: CreateFxqlDto): Promise<any> {
    const { FXQL } = createFxqlDto;
    return this.fxqlService.parseFxqlQuery(FXQL);
  }

  @Get()
  async getFxql() {
    return {
      message: 'Fxql query',
    };
  }
}
