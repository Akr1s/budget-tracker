import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCurrencySymbol } from "@/utils/currency";
import { useTranslation } from "react-i18next";
import type { ITransaction } from "../transactions.type";
import { DateService } from "@/utils/date.service";

interface IProps {
  transactions: ITransaction[];
}

export default function TransactionsTable({ transactions }: IProps) {
  const { t } = useTranslation("transactions");

  if (transactions.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">
        {t("table.empty")}
      </p>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm max-h-96">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("table.columns.id")}</TableHead>
            <TableHead>{t("table.columns.type")}</TableHead>
            <TableHead>{t("table.columns.category")}</TableHead>
            <TableHead>{t("table.columns.description")}</TableHead>
            <TableHead className="text-right">{t("table.columns.amount")}</TableHead>
            <TableHead>{t("table.columns.currency")}</TableHead>
            <TableHead>{t("table.columns.date")}</TableHead>
            <TableHead>{t("table.columns.createdAt")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell className="capitalize">{transaction.type}</TableCell>
              <TableCell className="capitalize">
                {transaction.category}
              </TableCell>
              <TableCell>{transaction.description ?? "-"}</TableCell>
              <TableCell className="text-right">
                {getCurrencySymbol(transaction.currency)}
                {transaction.amount.toFixed(2)}
              </TableCell>
              <TableCell className="uppercase">
                {transaction.currency}
              </TableCell>
              <TableCell>
                {DateService.toDisplayDate(transaction.date)}
              </TableCell>
              <TableCell>
                {DateService.toDisplayDate(transaction.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
