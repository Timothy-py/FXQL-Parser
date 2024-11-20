import { Body, Controller, Post } from '@nestjs/common';
import { FxqlService } from './fxql.service';
import { CreateFxqlDto } from './dto/fxql.dto';

@Controller('fxql')
export class FxqlController {
  constructor(private readonly fxqlService: FxqlService) {}

  @Post()
  async parseFxqlQuery(@Body() createFxqlDto: CreateFxqlDto): Promise<any> {
    const { fxql } = createFxqlDto;
    return this.fxqlService.parseFxqlQuery(fxql);
  }
}
