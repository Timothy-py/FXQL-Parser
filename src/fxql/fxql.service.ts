import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ParserService } from 'src/parser/parser.service';

@Injectable()
export class FxqlService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly parserService: ParserService,
  ) {}

  async parseFxqlQuery(FXQL: string): Promise<any> {
    const { results, errors } = this.parserService.parseFXQLStatements(FXQL);

    if (errors.length > 0) {
      return {
        message: 'FXQL parsing failed',
        code: 'FXQL-400',
        errors: errors,
      };
    }

    return {
      message: 'FXQL parsed successfully',
      code: 'FXQL-200',
      data: results,
    };
  }
}
