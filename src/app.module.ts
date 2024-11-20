import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ParserModule } from './parser/parser.module';
import { FxqlModule } from './fxql/fxql.module';
import { HelperService } from './helper/helper.service';

@Module({
  imports: [DatabaseModule, ParserModule, FxqlModule],
  controllers: [],
  providers: [HelperService, Logger],
})
export class AppModule {}
