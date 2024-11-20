import { Module } from '@nestjs/common';
import { FxqlService } from './fxql.service';
import { FxqlController } from './fxql.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [FxqlController],
  providers: [FxqlService, DatabaseService],
})
export class FxqlModule {}
