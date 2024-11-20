import { Logger, Module } from '@nestjs/common';
import { FxqlService } from './fxql.service';
import { FxqlController } from './fxql.controller';
import { DatabaseService } from 'src/database/database.service';
import { ParserService } from 'src/parser/parser.service';
import { HelperService } from 'src/helper/helper.service';

@Module({
  controllers: [FxqlController],
  providers: [
    FxqlService,
    DatabaseService,
    ParserService,
    HelperService,
    Logger,
  ],
})
export class FxqlModule {}
