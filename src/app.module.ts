import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ParserModule } from './parser/parser.module';

@Module({
  imports: [DatabaseModule, ParserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
