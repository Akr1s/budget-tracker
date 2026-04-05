import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryEnum } from "@/enums/category.enum";
import { IndexedDBService } from "@/storage/index-db.service";
import { formatNumber } from "@/utils/format-number.util";

export default function AboutCard() {
  const { t: tSettings, i18n } = useTranslation("settings");
  const [transactionCount, setTransactionCount] = useState(0);

  useEffect(() => {
    IndexedDBService.getAllTransactions().then((txs) =>
      setTransactionCount(txs.length),
    );
  }, []);

  const categoryCount = Object.keys(CategoryEnum).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          {tSettings("about.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-y-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted-foreground">
              {tSettings("about.version")}
            </dt>
            <dd className="font-medium">1.0.0</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">
              {tSettings("about.transactions")}
            </dt>
            <dd className="font-medium">
              {tSettings("about.transactionCount", {
                count: transactionCount,
                countFormatted: formatNumber(transactionCount, i18n.language),
              })}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">
              {tSettings("about.categories")}
            </dt>
            <dd className="font-medium">
              {tSettings("about.categoryCount", {
                count: categoryCount,
                countFormatted: formatNumber(categoryCount, i18n.language),
              })}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
