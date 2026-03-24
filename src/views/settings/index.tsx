import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { AlertTriangle } from "lucide-react";

import CustomRadioGroup from "@/components/custom-radiogroup.component";
import CustomSelect from "@/components/custom-select.component";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CategoryEnum } from "@/enums/category.enum";
import { RoutesEnum } from "@/routes/routes.enum";
import { useSettings } from "@/settings/use-settings.hook";
import { IndexedDBService } from "@/storage/index-db.service";
import type { Theme } from "@/theme/provider.constant";
import { useTheme } from "@/theme/use-theme.hook";
import { CurrencyEnum } from "@/utils/currency";
import { generateSampleData } from "@/utils/sample-data-generator";
import { LanguageEnum } from "@/views/onboarding/utils/onboarding.enum";

export default function Settings() {
  const { t: tSettings } = useTranslation("settings");
  const { t: tCommon } = useTranslation("common");
  const { settings, updateSettings } = useSettings();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const [transactionCount, setTransactionCount] = useState(0);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  function refreshTransactionCount() {
    IndexedDBService.getAllTransactions().then((txs) =>
      setTransactionCount(txs.length),
    );
  }

  useEffect(() => {
    refreshTransactionCount();
  }, []);

  const languageOptions = Object.values(LanguageEnum).map((lang) => ({
    label: tSettings(`languages.${lang}`),
    value: lang,
  }));

  const currencyOptions = Object.values(CurrencyEnum).map((c) => ({
    label: tCommon(`currencies.${c}`),
    value: c,
  }));

  const themeOptions: { label: string; value: Theme }[] = [
    { label: tCommon("themeLight"), value: "light" },
    { label: tCommon("themeDark"), value: "dark" },
    { label: tCommon("themeSystem"), value: "system" },
  ];

  const categoryCount = Object.keys(CategoryEnum).length;

  async function handleClearAll() {
    localStorage.clear();
    await IndexedDBService.clearAll();
    navigate(`/${RoutesEnum.ONBOARDING}`, { replace: true });
  }

  async function handleGenerateData() {
    setIsGenerating(true);
    try {
      await generateSampleData();
      refreshTransactionCount();
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-semibold tracking-tight">
        {tSettings("title")}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            {tSettings("appearance.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>{tSettings("appearance.language")}</FieldLabel>
              <CustomSelect
                label={tSettings("appearance.language")}
                value={settings.language}
                options={languageOptions}
                className="w-full max-w-xs"
                onValueChange={(value) =>
                  updateSettings({ language: value as LanguageEnum })
                }
              />
            </Field>
            <Field>
              <FieldLabel>{tSettings("appearance.theme")}</FieldLabel>
              <CustomRadioGroup
                className="flex flex-row gap-4"
                value={theme}
                onValueChange={(value) => setTheme(value as Theme)}
                items={themeOptions}
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            {tSettings("regional.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>{tSettings("regional.displayCurrency")}</FieldLabel>
              <CustomSelect
                label={tSettings("regional.displayCurrency")}
                value={settings.displayCurrency}
                options={currencyOptions}
                className="w-full max-w-xs"
                onValueChange={(value) =>
                  updateSettings({ displayCurrency: value as CurrencyEnum })
                }
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            {tSettings("dataManagement.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">
                {tSettings("dataManagement.generateData")}
              </p>
              <p className="text-sm text-muted-foreground">
                {tSettings("dataManagement.generateDataDescription")}
              </p>
            </div>
            <Button
              variant="outline"
              disabled={isGenerating}
              onClick={handleGenerateData}
            >
              {tSettings("dataManagement.generateData")}
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">
                {tSettings("dataManagement.clearAll")}
              </p>
              <p className="text-sm text-muted-foreground">
                {tSettings("dataManagement.clearAllDescription")}
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => setShowClearDialog(true)}
            >
              {tSettings("dataManagement.clearAll")}
            </Button>
          </div>
        </CardContent>
      </Card>

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
              <dd className="font-medium">{transactionCount}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">
                {tSettings("about.categories")}
              </dt>
              <dd className="font-medium">{categoryCount}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              {tSettings("dataManagement.clearConfirmTitle")}
            </DialogTitle>
            <DialogDescription>
              {tSettings("dataManagement.clearConfirmDescription")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <p className="text-sm font-medium">
              {tSettings("dataManagement.clearConfirmLabel")}
            </p>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={tSettings("dataManagement.clearConfirmPlaceholder")}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowClearDialog(false);
                setConfirmText("");
              }}
            >
              {tSettings("dataManagement.cancel")}
            </Button>
            <Button
              variant="destructive"
              disabled={confirmText !== "DELETE"}
              onClick={handleClearAll}
            >
              {tSettings("dataManagement.confirmDelete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
