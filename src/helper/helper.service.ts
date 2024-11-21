import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  removeDuplicatePairs(data): any[] {
    const seen = new Map();

    // Iterate through the array in reverse to keep the last occurrence
    for (let i = data.length - 1; i >= 0; i--) {
      const pairKey = `${data[i].sourceCurrency}-${data[i].destinationCurrency}`;
      if (!seen.has(pairKey)) {
        seen.set(pairKey, data[i]);
      }
    }

    // Convert the Map back to an array with preserved order
    return Array.from(seen.values()).reverse();
  }
}
