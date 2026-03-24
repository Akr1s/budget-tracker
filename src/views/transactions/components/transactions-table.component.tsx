import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSettings } from "@/settings/use-settings.hook";
import { convertAmount } from "@/utils/currency-converter";
import { DateService } from "@/utils/date.service";
import { formatCurrency } from "@/utils/format-currency";
import { useTranslation } from "react-i18next";
import type { ITransaction } from "../transactions.type";
import TransactionsTableActions from "./transactions-table-actions.component";

interface IProps {
  transactions: ITransaction[];
  onEdit: (transaction: ITransaction) => void;
  onDelete: (id: number) => void;
}

export default function TransactionsTable({
  transactions,
  onEdit,
  onDelete,
}: IProps) {
  const { t: tTransactions } = useTranslation("transactions");
  const { settings } = useSettings();

  if (transactions.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">
        {tTransactions("table.empty")}
      </p>
    );
  }

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm flex-1 min-h-0 overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-card z-10">
          <TableRow>
            <TableHead>{tTransactions("table.columns.id")}</TableHead>
            <TableHead>{tTransactions("table.columns.type")}</TableHead>
            <TableHead>{tTransactions("table.columns.category")}</TableHead>
            <TableHead>{tTransactions("table.columns.description")}</TableHead>
            <TableHead className="text-right">
              {tTransactions("table.columns.amount")}
            </TableHead>
            <TableHead>{tTransactions("table.columns.date")}</TableHead>
            <TableHead>{tTransactions("table.columns.createdAt")}</TableHead>
            <TableHead>{tTransactions("table.columns.actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            const displayAmount = convertAmount(
              transaction.amount,
              transaction.currency,
              settings.displayCurrency,
            );

            return (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell className="capitalize">
                  {transaction.type}
                </TableCell>
                <TableCell className="capitalize">
                  {transaction.category}
                </TableCell>
                <TableCell>{transaction.description ?? "-"}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(displayAmount, settings.displayCurrency)}
                </TableCell>
                <TableCell>
                  {DateService.toDisplayDate(transaction.date)}
                </TableCell>
                <TableCell>
                  {DateService.toDisplayDate(transaction.createdAt)}
                </TableCell>
                <TableCell>
                  <TransactionsTableActions
                    transaction={transaction}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
