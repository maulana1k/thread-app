"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Camera, Loader2, User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarUploadProps {
  value?: string;
  username?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function AvatarUpload({ value, username, onChange, disabled }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    try {
      setIsUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${username}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("user_avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from("user_avatars").getPublicUrl(filePath);
      onChange(data.publicUrl);
      toast.success("Avatar uploaded successfully");
    } catch (error: any) {
      toast.error(error.message || "Error uploading avatar");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className={cn(
          "relative group cursor-pointer w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-muted transition-all",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        {value ? (
          <Image
            src={value}
            alt="Avatar"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
            <User className="w-10 h-10" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          {isUploading ? (
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          ) : (
            <Camera className="w-6 h-6 text-white" />
          )}
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
      />
      
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="text-sm text-blue-500 font-medium hover:underline"
        disabled={disabled || isUploading}
      >
        {value ? "Change Photo" : "Upload Photo"}
      </button>
    </div>
  );
}
