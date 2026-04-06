import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RoutesEnum } from "@/routes/routes.enum";
import { DEFAULT_SETTINGS } from "@/settings/settings.constant";
import { useSettings } from "@/settings/use-settings.hook";
import { IndexedDBService } from "@/storage/index-db.service";
import { clearAllBrowserStorage } from "@/storage/web-storage.constant";

interface ClearAllDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ClearAllDialog({
  open,
  onOpenChange,
}: ClearAllDialogProps) {
  const { t: tSettings } = useTranslation("settings");
  const navigate = useNavigate();
  const { updateSettings } = useSettings();

  const [confirmText, setConfirmText] = useState("");

  async function handleClearAll() {
    clearAllBrowserStorage();
    await IndexedDBService.clearAll();
    updateSettings(DEFAULT_SETTINGS);
    navigate(`/${RoutesEnum.ONBOARDING}`, { replace: true });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onOpenChange(false);
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
  );
}
