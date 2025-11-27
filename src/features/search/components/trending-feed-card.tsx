import { useRouter } from "next/navigation";
import { ImageLoader } from "@/components/ui/image-loader";
import { TrendingFeed } from "../types";
import { Heart } from "@solar-icons/react";
import { formatNumber } from "@/lib/utils";

interface TrendingFeedCardProps {
  feed: TrendingFeed;
}

export function TrendingFeedCard({ feed }: TrendingFeedCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/post/${feed.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="p-4 border-b border-border/40 hover:bg-muted/30 transition-colors cursor-pointer"
    >
      <div className="flex gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-sm">{feed.author.name}</span>
            <span className="text-sm text-muted-foreground">
              @{feed.author.username}
            </span>
          </div>
          <p className="text-sm leading-relaxed line-clamp-3 mb-2">
            {feed.content}
          </p>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Heart size={16} />
            <span className="text-xs">{formatNumber(feed.likes)}</span>
          </div>
        </div>
        {feed.imageUrl && (
          <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-muted">
            <ImageLoader
              src={feed.imageUrl}
              alt="Post preview"
              className="w-full h-full aspect-square object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
