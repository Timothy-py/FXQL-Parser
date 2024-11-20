import { Module } from '@nestjs/common';
import { FxqlService } from './fxql.service';
import { FxqlController } from './fxql.controller';
import { DatabaseService } from 'src/database/database.service';
import { ParserService } from 'src/parser/parser.service';

@Module({
  controllers: [FxqlController],
  providers: [FxqlService, DatabaseService, ParserService],
})
export class FxqlModule {}
