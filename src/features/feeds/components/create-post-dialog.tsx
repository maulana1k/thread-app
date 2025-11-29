"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PenNewSquare } from "@solar-icons/react";
import { CreatePostForm } from "./create-post-form";

import { CircleDot, CircleEllipsis, X } from "lucide-react";

export function CreatePostDialog({
  children,
  trigger,
}: {
  children?: React.ReactNode;
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const Trigger = trigger ? (
    <div onClick={() => setOpen(true)} className="cursor-pointer">{trigger}</div>
  ) : (
    <Button
      variant="ghost"
      size="icon"
      className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
      onClick={() => setOpen(true)}
    >
      <PenNewSquare size={24} weight="Bold" />
    </Button>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{Trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden rounded-3xl">
          <DialogHeader className="px-4 py-3 border-b">
            <DialogTitle>Create new post</DialogTitle>
          </DialogHeader>
          <CreatePostForm onSuccess={() => setOpen(false)} className="h-[500px]" />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      {Trigger}
      {open && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col h-dvh animate-in ease-in-out slide-in-from-bottom-10 duration-300">
          <div className="px-4 py-3 text-left border-b flex items-center justify-between shrink-0">
            <button
              onClick={() => setOpen(false)}
              className="h-8 w-8 rounded-full hover:bg-muted"
            >
              <X size={24} />
            </button>
            <span className="text-xl font-bold">New Post</span>
            <button
              onClick={() => setOpen(false)}
              className="h-8 w-8 rounded-full hover:bg-muted"
            >
              <CircleEllipsis size={24} />
            </button>
          </div>
          <CreatePostForm onSuccess={() => setOpen(false)} className="flex-1 min-h-0" />
        </div>
      )}
    </>
  );
}
