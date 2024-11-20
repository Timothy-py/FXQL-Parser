import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ParserModule } from './parser/parser.module';
import { FxqlModule } from './fxql/fxql.module';
import { HelperService } from './helper/helper.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule,
    ParserModule,
    FxqlModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 2,
      },
    ]),
  ],
  controllers: [],
  providers: [
    HelperService,
    Logger,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
