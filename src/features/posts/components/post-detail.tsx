import { Post } from "../types";
import { UserAvatar } from "@/components/user-avatar";
import { ImageLoader } from "@/components/ui/image-loader";
import { Heart, ChatRound, Repeat, Bookmark } from "@solar-icons/react";
import { cn, formatTimeAgo } from "@/lib/utils";
import { useMemo, useRef, useState } from "react";

interface PostDetailProps {
  post: Post;
}

export function PostDetail({ post }: PostDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
  const images = useMemo(() => {
    if (!post.image_url) return [];
    try {
      const parsed = JSON.parse(post.image_url);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      return [post.image_url];
    }
  }, [post.image_url]);
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const center = container.scrollLeft + container.offsetWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const element = child as HTMLElement;
      const childCenter = element.offsetLeft + element.offsetWidth / 2;
      const distance = Math.abs(childCenter - center);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setCurrentImageIndex(closestIndex);
  };

  return (
    <div className="p-4 border-b border-border/40">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <UserAvatar
          size="lg"
          src={post.profiles?.avatar_url}
          fallback={post.profiles?.full_name}
        />
        <div className="flex flex-col">
          <span className="font-bold">{post.profiles?.full_name}</span>
          <span className="text-sm text-muted-foreground">
            @{post.profiles?.username}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <p className="text-lg leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>

        {images.length > 0 && (
          <div className="rounded-2xl overflow-hidden ">
            {images.length === 1 ? (
              <ImageLoader
                src={images[0]}
                alt="Post image"
                className="w-auto h-auto max-h-[600px] object-contain border border-border/40"
              />
            ) : (
              <div className="relative group pb-2">
                <div
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="flex gap-2 w-full overflow-x-auto no-scrollbar snap-x snap-mandatory"
                >
                  {images.map((url, index) => (
                    <div key={index} className="relative shrink-0 snap-center w-full">
                      <img
                        src={url}
                        alt={`Post content ${index + 1}`}
                        className="w-full h-auto max-h-[600px] object-contain bg-muted/20"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-1.5 mt-2">
                  {images.map((_, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "h-1 rounded-full transition-all duration-300",
                        idx === currentImageIndex
                          ? "bg-primary w-3"
                          : "bg-primary/20 w-1"
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Timestamp */}
        <div className="text-sm text-muted-foreground pt-2">
          {new Date(post.created_at).toLocaleString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>

        {/* Stats */}
        <div className="flex gap-6 py-4 border-y border-border/40">
          <div className="flex gap-1">
            <span className="font-bold">
              {post.likes_count.toLocaleString()}
            </span>
            <span className="text-muted-foreground">Likes</span>
          </div>
          <div className="flex gap-1">
            <span className="font-bold">{post.replies_count}</span>
            <span className="text-muted-foreground">Replies</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-around py-2">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
            <Heart size={24} />
          </button>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ChatRound size={24} />
          </button>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Repeat size={24} />
          </button>
          <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Bookmark size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
