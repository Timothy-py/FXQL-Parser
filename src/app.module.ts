import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ParserModule } from './parser/parser.module';
import { FxqlModule } from './fxql/fxql.module';

@Module({
  imports: [DatabaseModule, ParserModule, FxqlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
