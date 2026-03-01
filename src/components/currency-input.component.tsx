import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getCurrencySymbol, type CurrencyCode } from "@/utils/currency";
import type { ComponentProps } from "react";

interface IProps extends ComponentProps<typeof Input> {
  currency: CurrencyCode;
}

export default function CurrencyInput({
  currency,
  className,
  ...props
}: IProps) {
  const currencySymbol = getCurrencySymbol(currency);

  return (
    <div className="relative flex items-center">
      <span className="absolute start-3 text-sm text-muted-foreground pointer-events-none">
        {currencySymbol}
      </span>
      <Input className={cn("ps-7", className)} {...props} />
    </div>
  );
}
