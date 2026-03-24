import { EXCHANGE_RATES } from "@/constants/exchange-rates.constant";
import type { CurrencyEnum } from "@/utils/currency";
import type { ITransaction } from "@/views/transactions/transactions.type";

export function convertAmount(
  amount: number,
  from: CurrencyEnum,
  to: CurrencyEnum,
): number {
  if (from === to) return amount;

  const amountInUSD = amount / EXCHANGE_RATES[from];
  return amountInUSD * EXCHANGE_RATES[to];
}

export function convertTransactions(
  transactions: ITransaction[],
  targetCurrency: CurrencyEnum,
): ITransaction[] {
  return transactions.map((tx) => ({
    ...tx,
    amount: convertAmount(tx.amount, tx.currency, targetCurrency),
    currency: targetCurrency,
  }));
}
