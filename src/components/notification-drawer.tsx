"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Bell, CloseCircle } from "@solar-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

interface NotificationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  avatar?: string;
}

// Mock notifications - replace with actual data
const mockNotifications: Notification[] = [];

export function NotificationDrawer({
  open,
  onOpenChange,
}: NotificationDrawerProps) {
  const [notifications, setNotifications] =
    React.useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  return (
    <>
      {/* Mobile Drawer - Right to Left, Fullscreen */}
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        direction="right"
        modal={true}
      >
        <DrawerContent
          className={cn(
            "lg:hidden",
            // "z-50 flex flex-col",
            "data-[vaul-drawer-direction=right]:w-full",
            "rounded-none border-none",
            "data-[state=open]:animate-slide-in-right",
            "data-[state=closed]:animate-slide-out-right",
          )}
        >
          {/* iOS-style Header */}
          <div className="flex items-center justify-between px-4 py-3  backdrop-blur supports-backdrop-filter:bg-background/60">
            <DrawerTitle className="text-2xl font-bold">
              Notifications
            </DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full"
              >
                <X size={28} />
              </Button>
            </DrawerClose>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <Empty className="border-none">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Bell size={24} weight="Bold" />
                    </EmptyMedia>
                    <EmptyTitle>No Notifications</EmptyTitle>
                    <EmptyDescription>
                      When you get notifications, they'll show up here
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={markAsRead}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      {/* Desktop Drawer - Left to Right */}
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        direction="left"
        modal={true}
      >
        <DrawerContent
          className={cn(
            "hidden lg:flex",
            "fixed inset-y-0 left-0 z-50 flex-col",
            "w-[400px] max-w-[400px]",
            "rounded-none border-r",
            "data-[state=open]:animate-slide-in-left",
            "data-[state=closed]:animate-slide-out-left",
          )}
        >
          {/* Header */}
          <DrawerHeader className="flex flex-row items-center justify-between px-6 py-4">
            <DrawerTitle className="text-2xl font-bold">
              Notifications
            </DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                className="h-9 w-9 rounded-full"
              >
                <X size={36} />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          {/* Content */}
          <ScrollArea className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <Empty className="border-none">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <Bell size={24} weight="Bold" />
                    </EmptyMedia>
                    <EmptyTitle>No Notifications</EmptyTitle>
                    <EmptyDescription>
                      When you get notifications, they'll show up here
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={markAsRead}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  );
}

// Notification Item Component
function NotificationItem({
  notification,
  onRead,
}: {
  notification: Notification;
  onRead: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onRead(notification.id)}
      className={cn(
        "w-full px-4 py-4 text-left transition-colors hover:bg-muted/50 active:bg-muted",
        !notification.read && "bg-muted/30",
      )}
    >
      <div className="flex gap-3">
        {notification.avatar ? (
          <div className="h-10 w-10 rounded-full bg-muted shrink-0" />
        ) : (
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Bell size={20} weight="Bold" className="text-primary" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold text-sm line-clamp-1">
              {notification.title}
            </p>
            {!notification.read && (
              <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
            {notification.description}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {notification.time}
          </p>
        </div>
      </div>
    </button>
  );
}
