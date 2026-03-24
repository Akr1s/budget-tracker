import { CurrencyEnum } from "@/utils/currency";

export const EXCHANGE_RATES: Record<CurrencyEnum, number> = {
  [CurrencyEnum.USD]: 1,
  [CurrencyEnum.EUR]: 0.92,
  [CurrencyEnum.JPY]: 149.5,
  [CurrencyEnum.SAR]: 3.75,
};
