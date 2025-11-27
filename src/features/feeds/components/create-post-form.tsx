"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/user-avatar";
import {
  Camera,
  Gallery,
  Ghost,
  Link,
  LinkMinimalistic,
  LinkMinimalistic2,
  List,
} from "@solar-icons/react";
import { GhostSwitch } from "./ghost-switch";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

export function CreatePostForm({ onSuccess }: { onSuccess?: () => void }) {
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    // TODO: Implement actual post creation logic here
    console.log("Creating post:", { content, isAnonymous });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 5000));

    setIsLoading(false);
    setContent("");
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-start gap-3 min-h-full">
          {isAnonymous ? (
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
              <Ghost size={20} />
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
            <div className="font-bold leading-none">zuck</div>
            <Textarea
              placeholder={
                isAnonymous
                  ? "Speak your mind anonymously..."
                  : "What's happening?"
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] h-full dark:bg-transparent resize-none border-none focus-visible:ring-0 p-0 text-lg placeholder:text-muted-foreground/50"
            />
          </div>
        </div>
      </div>

      {/* Fixed Action Buttons */}
      <div className="p-4 border-t bg-background flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-muted-foreground hover:text-primary"
          >
            <Camera size={26} />
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
          disabled={!content.trim() || isLoading}
          className="rounded-full font-bold px-6"
        >
          {isLoading ? (
            <>
              <Spinner /> Posting{" "}
            </>
          ) : (
            "Post"
          )}
        </Button>
      </div>
    </form>
  );
}
