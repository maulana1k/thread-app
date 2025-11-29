import { useState } from "react";
import { useUser } from "@/features/auth/hooks/use-auth";
import { useCreateReply } from "../hooks/use-post";
import { UserAvatar } from "@/components/user-avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ReplyInputProps {
  parentId: string;
}

export function ReplyInput({ parentId }: ReplyInputProps) {
  const [content, setContent] = useState("");
  const { data: user } = useUser();
  const { mutate: createReply, isPending } = useCreateReply();

  const handleSubmit = () => {
    if (!content.trim() || !user) return;

    createReply(
      { parentId, content, userId: user.id },
      {
        onSuccess: () => {
          setContent("");
        },
      }
    );
  };

  if (!user) return null;

  return (
    <div className="p-4 ">
      <div className="flex w-full items-center gap-3">
        <UserAvatar
          size="sm"
          className="shrink-0"
          fallback={user.user_metadata?.full_name?.[0] || "U"}
          src={user.user_metadata?.avatar_url}
        />
        <div className="flex w-full items-center gap-3">
          <div className="flex w-full items-center px-4 py-3 bg-muted/20 rounded-2xl">
            <Textarea
              placeholder="Post your reply"
              className="min-h-fit resize-none bg-transparent dark:bg-transparent border-none focus-visible:ring-0 p-0 text-lg placeholder:text-muted-foreground/50"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <Button
            size="sm"
            className="rounded-full px-6 font-semibold"
            onClick={handleSubmit}
            disabled={!content.trim() || isPending}
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reply"}
          </Button>
        </div>
      </div>
    </div>
  );
}
