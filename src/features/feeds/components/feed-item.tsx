"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Post } from "../types";
import { UserAvatar } from "@/components/user-avatar";
import { cn, formatTimeAgo } from "@/lib/utils";
import {
  Heart,
  ChatRound,
  Repeat,
  Plain,
  MenuDots,
  Bookmark,
  LinkMinimalistic2 as LinkIcon,
  DangerTriangle,
  Flag2,
  Refresh,
} from "@solar-icons/react";
import { ImageLoader } from "@/components/ui/image-loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { DialogTitle } from "@/components/ui/dialog";

interface FeedItemProps {
  post: Post;
}

export function FeedItem({ post }: FeedItemProps) {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handlePostClick = () => {
    router.push(`/post/${post.id}`);
  };

  const handleSave = () => {
    console.log("Save post:", post.id);
    // setIsDrawerOpen(false);
    // TODO: Implement save functionality
  };

  const handleCopyLink = async () => {
    if (navigator?.clipboard?.writeText) {
      const postUrl = `${window.location.origin}/post/${post.id}`;
      await navigator.clipboard.writeText(postUrl);
      console.log("Link copied:", postUrl);
      setIsDrawerOpen(false);
      // TODO: Show toast notification
    }
  };

  const handleReport = () => {
    console.log("Report post:", post.id);
    // setIsDrawerOpen(false);
    // TODO: Implement report functionality
  };

  const menuItems = [
    {
      icon: Bookmark,
      label: "Save",
      onClick: handleSave,
    },
    {
      icon: LinkIcon,
      label: "Copy link",
      onClick: handleCopyLink,
    },
    {
      icon: Flag2,
      label: "Report",
      onClick: handleReport,
      variant: "destructive",
    },
  ];

  return (
    <div className="shadow-none border-none p-0">
      <div className="flex flex-row gap-2">
        <UserAvatar
          className="flex md:hidden"
          size="md"
          src={post.profiles?.avatar_url}
          alt={post.profiles?.username}
          fallback={post.profiles?.username}
        />
        <div className="flex flex-col w-full -mt-1 ">
          <div className="flex justify-between items-center">
            <div className="flex gap-1 items-center">
              <UserAvatar
                className="hidden md:flex mr-1"
                size="sm"
                src={post.profiles?.avatar_url}
                alt={post.profiles?.username}
                fallback={post.profiles?.username}
              />
              <span className="font-semibold text-base leading-none">
                {post.is_anonymous
                  ? "Anonymous"
                  : post.profiles?.username || "Unknown User"}
              </span>
              <span className="text-sm text-muted-foreground leading-none">
                &middot; {formatTimeAgo(post.created_at)}
              </span>
            </div>

            {/* Desktop Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="hidden md:flex">
                <div className="rounded-full">
                  <MenuDots size={21} weight="Bold" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {menuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.label}
                    onClick={item.onClick}
                    className={
                      item.variant === "destructive"
                        ? "text-destructive focus:text-destructive"
                        : ""
                    }
                  >
                    <item.icon size={18} className="mr-2" />
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Drawer */}
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild className="md:hidden">
                <div className=" rounded-full">
                  <MenuDots size={21} weight="Bold" />
                </div>
              </DrawerTrigger>
              <DrawerContent className="rounded-xl">
                <DialogTitle className="sr-only">Action Menu</DialogTitle>
                <div className="mx-4 my-6 space-y-[2px] rounded-3xl overflow-clip ">
                  {menuItems.map((item) => (
                    <button
                      key={item.label}
                      className={cn(
                        "flex items-center w-full gap-4 text-md font-medium bg-muted/50 py-4 px-4 hover:bg-muted/50 transition-colors active:bg-muted",
                        item.variant === "destructive"
                          ? "text-destructive focus:text-destructive"
                          : "",
                      )}
                      onClick={item.onClick}
                    >
                      <item.icon size={22} />
                      {item.label}
                    </button>
                  ))}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <div
            className="pt-1 md:pt-3 cursor-pointer"
            onClick={handlePostClick}
          >
            <p className="text-md">{post.content}</p>
          </div>

          {post.image_url && (
            <div className="pt-2 cursor-pointer" onClick={handlePostClick}>
              <ImageLoader
                src={post.image_url}
                alt="Post content"
                className="rounded-lg border object-cover w-full max-h-[500px]"
              />
            </div>
          )}

          <div className="flex pt-3">
            <div className="flex gap-4">
              <button className="flex items-center gap-2">
                <Heart size={21} />
                {!!post.likes_count && (
                  <span className="text-sm">{post.likes_count}</span>
                )}
              </button>

              <button className="flex items-center gap-2">
                <ChatRound size={21} />
                {!!post.comments_count && (
                  <span className="text-sm">{post.comments_count}</span>
                )}
              </button>

              <button className="flex items-center gap-2">
                <Refresh size={21} />
                {!!post.comments_count && (
                  <span className="text-sm">{post.comments_count}</span>
                )}
              </button>

              <button className="flex items-center gap-2">
                <Plain size={21} className="rotate-45" />
                {!!post.comments_count && (
                  <span className="text-sm">{post.comments_count}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
