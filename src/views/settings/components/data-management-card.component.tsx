import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { generateSampleData } from "@/utils/sample-data-generator";

import ClearAllDialog from "./clear-all-dialog.component";

export default function DataManagementCard() {
  const { t: tSettings } = useTranslation("settings");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [generateSuccessCount, setGenerateSuccessCount] = useState<
    number | null
  >(null);

  async function handleGenerateData() {
    setIsGenerating(true);
    setGenerateSuccessCount(null);
    try {
      const count = await generateSampleData();
      setGenerateSuccessCount(count);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <>
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
          {generateSuccessCount !== null ? (
            <p className="text-sm text-muted-foreground" role="status">
              {tSettings("dataManagement.generateDataSuccess", {
                count: generateSuccessCount,
              })}
            </p>
          ) : null}
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

      <ClearAllDialog
        open={showClearDialog}
        onOpenChange={setShowClearDialog}
      />
    </>
  );
}
