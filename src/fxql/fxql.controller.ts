import { Body, Controller, Post } from '@nestjs/common';
import { FxqlService } from './fxql.service';
import { CreateFxqlDto } from './dto/fxql.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('fxql-statements')
export class FxqlController {
  constructor(private readonly fxqlService: FxqlService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'FXQL parsed successfully',
    schema: {
      example: {
        message: 'FXQL parsed successfully',
        code: 'FXQL-200',
        data: [],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'FXQL parsing failed',
    schema: {
      example: {
        message: 'FXQL parsing failed',
        code: 'FXQL-400',
        error: '',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An error occurred while parsing FXQL',
    schema: {
      example: {
        message: 'An error occurred while parsing FXQL',
        code: 'FXQL-500',
        error: '',
      },
    },
  })
  async parseFxqlQuery(@Body() createFxqlDto: CreateFxqlDto): Promise<any> {
    const { FXQL } = createFxqlDto;
    return this.fxqlService.parseFxqlQuery(FXQL);
  }
}
