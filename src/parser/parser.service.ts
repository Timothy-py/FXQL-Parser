import { Injectable } from '@nestjs/common';

@Injectable()
export class ParserService {
  // Match individual FXQL statements
  private fxqlPattern =
    /[A-Z]{3}-[A-Z]{3} {\s*\\n\s*BUY .+?\\n\s*SELL .+?\\n\s*CAP .+?\\n\s*}/gm;

  // Match FXQL statement elements
  private fxqlElementPattern =
    /([A-Z]{3})-([A-Z]{3}) {\s*\\n\s*BUY (.+)\\n\s*SELL (.+)\\n\s*CAP (.+)\\n\s*}/;

  // method to parse and validate FXQL statements
  parseFXQLStatements(fxql: string): { results: any; errors: any } {
    const results = []; //Stores valid FXQL entries after parÍsing
    const errors = []; //Stores errors for invalid entries

    if (!fxql.trim()) {
      errors.push({ error: 'FXQL input cannot be empty.', statement: fxql });
      return { results, errors };
    }

    const matches = fxql.match(this.fxqlPattern);

    matches.forEach((match) => {
      const result = match.match(this.fxqlElementPattern);
      if (result) {
        const [source, destination, buy, sell, cap] = [
          result[1],
          result[2],
          result[3],
          result[4],
          result[5],
        ];

        // Validate extracted data
        const validationError = this.validateStatement(
          source,
          destination,
          buy,
          sell,
          cap,
        );
        if (validationError) {
          // If validation fails, push the error and statement to errors array
          errors.push({ error: validationError, statement: match });
        } else {
          // If validation succeeds, push the parsed results array
          results.push({
            sourceCurrency: source,
            destinationCurrency: destination,
            buyPrice: parseFloat(buy),
            sellPrice: parseFloat(sell),
            capAmount: parseInt(cap, 10),
          });
        }
      }
    });

    // Return the results and errors arrays as an object
    return { results, errors };
  }

  // Helper method to validate each component of the FXQL statement
  private validateStatement(
    source: string,
    destination: string,
    buy: string,
    sell: string,
    cap: string,
  ) {
    // Check if source and destination currencies are valid
    if (!this.isValidCurrency(source)) {
      return "Source currency must be 'USD', 'GBP' or 'EUR'";
    }
    if (!this.isValidCurrency(destination)) {
      return "Destination currency must be 'USD', 'GBP' or 'EUR'";
    }

    // Validate BUY and SELL values as positive numbers
    if (!this.isValidNumber(buy)) {
      return 'BUY value must be valid positive number.';
    }
    if (!this.isValidNumber(sell)) {
      return 'SELL value must be valid positive number.';
    }

    // Validate CAP value as a non-negative whole number
    if (!/^\d+$/.test(cap)) {
      return 'CAP value must be a whole number.';
    }

    // No errors in validation
    return null;
  }

  // Helper method to check if a string is a valid positive number or 0
  private isValidNumber(value: string): boolean {
    const numberValue = parseFloat(value);

    // Check if the string is a valid number
    const isNaNValue = isNaN(numberValue);

    // Check if the number is finite (not Infinity or -Infinity)
    const isFiniteValue = isFinite(numberValue);

    // Check if the number is non-negative (either 0 or greater)
    const isNonNegative = numberValue >= 0;

    // Return true if all conditions are met
    return !isNaNValue && isFiniteValue && isNonNegative;
  }

  private isValidCurrency(value: string): boolean {
    const validCurrency = ['USD', 'GBP', 'EUR'];
    return validCurrency.includes(value);
  }
}
