"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/user-avatar";
import {
  Gallery,
  Ghost,
  LinkMinimalistic2,
  List,
} from "@solar-icons/react";
import { GhostSwitch } from "./ghost-switch";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreatePostStore } from "../store/create-post-store";

export function CreatePostForm({ onSuccess, className }: { onSuccess?: () => void; className?: string; }) {
  const {
    content,
    isAnonymous,
    visibility,
    images,
    imagePreviews,
    setContent,
    setIsAnonymous,
    setVisibility,
    addImages,
    removeImage,
    reset,
    submitPost,
  } = useCreatePostStore();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && images.length === 0) return;

    // Trigger background submission
    submitPost();
    
    // Close drawer immediately
    onSuccess?.();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      addImages(newFiles);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col h-full", className)}>
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="flex items-start gap-3 px-4">
          {isAnonymous ? (
            <div className="size-10 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Ghost size={24} weight="Bold" className="text-muted-foreground" />
            </div>
          ) : (
            <UserAvatar
              size="md"
              className="shrink-0"
              src="https://github.com/shadcn.png"
              fallback="CN"
            />
          )}

          <div className="flex-1 space-y-2 h-full">
            <Select value={visibility} onValueChange={setVisibility} >
              <SelectTrigger className="w-fit h-3 text-xs px-3 py-0 rounded-full border-primary/20 text-primary gap-1">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent className="rounded-xl" >
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="followers">Followers</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              placeholder={
                isAnonymous
                  ? "Speak your mind anonymously..."
                  : "What's happening?"
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-8 dark:bg-transparent resize-none border-none focus-visible:ring-0 p-0 md:text-xl placeholder:text-muted-foreground/50 md:placeholder:text-xl shadow-none"
            />


          </div>
        </div>
      {/* Image Previews */}
      {imagePreviews.length > 0 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mt-4 w-full">
          <div className="h-full shrink-0 ml-12 "></div>
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative shrink-0">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className={cn("max-h-96 w-auto rounded-xl border bg-muted/20 shadow-sm", imagePreviews.length > 1 ? "max-h-[300px]" : "")}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
      </div>

      {/* Fixed Action Buttons */}
      <div className="p-4 border-t flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
          />
          <button
            type="button"
            className="text-muted-foreground hover:text-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <Gallery size={26} />
          </button>
          <button
            type="button"
            className="text-muted-foreground hover:text-primary"
          >
            <LinkMinimalistic2 size={26} />
          </button>
          <button
            type="button"
            className="text-muted-foreground hover:text-primary"
          >
            <List size={26} />
          </button>

          <div className="flex items-center gap-3 pl-2">
            <GhostSwitch
              id="anonymous-mode"
              checked={isAnonymous}
              onCheckedChange={setIsAnonymous}
            />
          </div>
        </div>

        <Button
          type="submit"
          size={"lg"}
          disabled={!content.trim() && images.length === 0}
          className="rounded-full font-bold px-6"
        >
          Post
        </Button>
      </div>
    </form>
  );
}
