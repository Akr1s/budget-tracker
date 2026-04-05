import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CurrencyEnum } from "@/utils/currency";
import { formatCurrency } from "@/utils/format-currency";
import type { ISummaryCard } from "..";

interface IProps {
  card: ISummaryCard;
  currency: CurrencyEnum;
  locale: string;
}

export default function CardData({ card, currency, locale }: IProps) {
  const Icon = card.icon;

  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {card.title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${card.iconClass}`} />
      </CardHeader>
      <CardContent>
        <p className={`text-2xl font-bold ${card.amountClass}`}>
          {formatCurrency(card.amount, currency, locale)}
        </p>
        {card.subtitle && (
          <p className="mt-1 text-xs text-muted-foreground">
            {card.subtitle}
          </p>
        )}
      </CardContent>
    </>
  );
}
