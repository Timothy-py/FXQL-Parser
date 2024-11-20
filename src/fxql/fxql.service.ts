import { Injectable } from '@nestjs/common';
import { FXQL } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { HelperService } from 'src/helper/helper.service';
import { ParserService } from 'src/parser/parser.service';

@Injectable()
export class FxqlService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly parserService: ParserService,
    private readonly helperService: HelperService,
  ) {}

  async parseFxqlQuery(FXQL: string): Promise<any> {
    try {
      const { results, errors } = this.parserService.parseFXQLStatements(FXQL);

      if (errors.length > 0) {
        return {
          message: 'FXQL parsing failed',
          code: 'FXQL-400',
          errors: errors,
        };
      }

      // Save parsed FXQL to database
      const savedData = await this.saveParsedFXQL(results);

      return {
        message: 'FXQL parsed successfully',
        code: 'FXQL-200',
        data: savedData,
      };
    } catch (error) {
      return {
        message: 'An error occurred while parsing FXQL',
        code: 'FXQL-500',
        error: error,
      };
    }
  }

  async saveParsedFXQL(data: Array<Omit<FXQL, 'id' | 'createdAt'>>) {
    const filteredData = this.helperService.removeDuplicatePairs(data);

    const savedData = [];

    for (let i = 0; i < filteredData.length; i++) {
      const element = filteredData[i];
      const { sourceCurrency, destinationCurrency } = element;

      const currencyExist = await this.databaseService.fXQL.findUnique({
        where: {
          sourceCurrency_destinationCurrency: {
            sourceCurrency: sourceCurrency,
            destinationCurrency: destinationCurrency,
          },
        },
      });

      if (currencyExist) {
        await this.databaseService.fXQL.delete({
          where: {
            id: currencyExist.id,
          },
        });
      }

      const newData = await this.databaseService.fXQL.create({
        data: {
          ...element,
        },
      });

      savedData.push(newData);
    }

    return savedData;
  }
}
