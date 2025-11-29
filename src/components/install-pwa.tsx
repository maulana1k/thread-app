"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Spinner } from "./ui/spinner";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function InstallPWA() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e as BeforeInstallPromptEvent);
    };

    const installedHandler = () => {
      setIsInstalled(true);
      setSupportsPWA(false);
      setPromptInstall(null);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const onClick = async (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }

    setIsInstalling(true);

    try {
      await promptInstall.prompt();
      const { outcome } = await promptInstall.userChoice;

      if (outcome === "accepted") {
        setIsInstalled(true);
        setSupportsPWA(false);
        setPromptInstall(null);
      }
    } catch (error) {
      console.error("Error during PWA installation:", error);
    } finally {
      setIsInstalling(false);
    }
  };

  if ((!supportsPWA || isInstalled) && process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <Button
      variant="default"
      className="rounded-full"
      size="sm"
      onClick={onClick}
      disabled={isInstalling}
    >
      {isInstalling && (
        <Spinner />
      )}
      <span className="flex items-center gap-2 font-semibold text-sm">
        <Download size={18} strokeWidth={3} />
        {isInstalling ? "Installing" : "Install"}
      </span>
    </Button>
  );
}
