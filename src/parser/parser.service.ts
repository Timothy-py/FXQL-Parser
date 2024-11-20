import { Injectable } from '@nestjs/common';

@Injectable()
export class ParserService {
  // Regular expression pattern for parsing FXQL statements
  // The pattern extracts:
  // > Source currency (3 uppercase letters)
  // > Destination currency (3 uppercase letters)
  // > BUY value (numeric, can have decimal points)
  // > SELL value (numeric, can have decimal points)
  // > CAP value (whole number)
  private fxqlPattern =
    /[A-Z]{3}-[A-Z]{3} {\s*\\n\s*BUY \d+(\.\d+)?\\n\s*SELL \d+(\.\d+)?\\n\s*CAP \d+\\n\s*}/gm;

  private fxqlElementPattern =
    /^(?<curr1>[A-Z]{3})-(?<curr2>[A-Z]{3}) {\\n  BUY (?<buy>\d+(\.\d+)?)\\n  SELL (?<sell>\d+(\.\d+)?)\\n  CAP (?<cap>\d+)\\n}$/m;

  // method to parse and validate FXQL statements
  parseFXQLStatements(fxql: string): { results: any; errors: any } {
    const results = []; //Stores valid FXQL entries after parsing
    const errors = []; //Stores errors for invalid entries

    if (!fxql.trim()) {
      errors.push({ error: 'FXQL input cannot be empty.', statement: fxql });
      return { results, errors };
    }

    // if (!this.fxqlPattern.test(fxql)) {
    //   errors.push({ error: 'No valid FXQL blocks found.', statement: fxql });
    //   return { results, errors };
    // }

    const matches = fxql.match(this.fxqlPattern);

    if (matches === null) {
      errors.push({ error: 'Invalid FXQL input.', statement: fxql });
      return { results, errors };
    }

    matches.forEach((match) => {
      const result = match.match(this.fxqlElementPattern);
      if (result) {
        const [source, destination, buy, sell, cap] = [
          result.groups.curr1,
          result.groups.curr2,
          result.groups.buy,
          result.groups.sell,
          result.groups.cap,
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
            SourceCurrency: source,
            DestinationCurrency: destination,
            BuyPrice: parseFloat(buy),
            SellPrice: parseFloat(sell),
            CapAmount: parseInt(cap, 10),
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
    // Check if source and destination currencies are exactly 3 uppercase letters
    if (!/^[A-Z]{3}$/.test(source)) {
      return 'Source currency must be exactly 3 uppercase letters.';
    }
    if (!/^[A-Z]{3}$/.test(destination)) {
      return 'Destination currency must be exactly 3 uppercase letters.';
    }

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
