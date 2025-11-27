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
    <div onClick={() => setOpen(true)}>{trigger}</div>
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
        <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-4 py-3 border-b">
            <DialogTitle>Create new post</DialogTitle>
          </DialogHeader>
          <CreatePostForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{Trigger}</DrawerTrigger>
      <DrawerContent className="h-screen p-0 rounded-none">
        <DrawerHeader className="px-4 py-3 text-left">
          <DrawerTitle className="text-xl font-bold ">New Post</DrawerTitle>
        </DrawerHeader>
        <CreatePostForm onSuccess={() => setOpen(false)} />
      </DrawerContent>
    </Drawer>
  );
}
