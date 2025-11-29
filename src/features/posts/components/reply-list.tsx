import { Post } from "../types";
import { ReplyItem } from "./reply-item";

interface ReplyListProps {
  replies: Post[];
}

export function ReplyList({ replies }: ReplyListProps) {
  return (
    <div className="divide-y divide-border/40">
      {replies.map((reply) => (
        <ReplyItem key={reply.id} reply={reply} />
      ))}
    </div>
  );
}
