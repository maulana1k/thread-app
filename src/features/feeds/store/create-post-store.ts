import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface CreatePostState {
  content: string;
  isAnonymous: boolean;
  visibility: string;
  images: File[];
  imagePreviews: string[];
  isSubmitting: boolean;
  submitStatus: string;
  setContent: (content: string) => void;
  setIsAnonymous: (isAnonymous: boolean) => void;
  setVisibility: (visibility: string) => void;
  addImages: (newImages: File[]) => void;
  removeImage: (index: number) => void;
  reset: () => void;
  submitPost: () => Promise<void>;
}

export const useCreatePostStore = create<CreatePostState>((set, get) => ({
  content: "",
  isAnonymous: false,
  visibility: "public",
  images: [],
  imagePreviews: [],
  isSubmitting: false,
  submitStatus: "",
  setContent: (content) => set({ content }),
  setIsAnonymous: (isAnonymous) => set({ isAnonymous }),
  setVisibility: (visibility) => set({ visibility }),
  addImages: (newImages) => {
    const currentImages = get().images;
    
    // Validation: Max 4 images
    if (currentImages.length + newImages.length > 4) {
      toast.error("You can only upload up to 4 images");
      return;
    }
    
    // Validation: Max size 5MB per image
    const validImages = newImages.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });

    set((state) => {
      const newPreviews = validImages.map((file) => URL.createObjectURL(file));
      return {
        images: [...state.images, ...validImages],
        imagePreviews: [...state.imagePreviews, ...newPreviews],
      };
    });
  },
  removeImage: (index) =>
    set((state) => {
      URL.revokeObjectURL(state.imagePreviews[index]);
      return {
        images: state.images.filter((_, i) => i !== index),
        imagePreviews: state.imagePreviews.filter((_, i) => i !== index),
      };
    }),
  reset: () =>
    set((state) => {
      state.imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      return {
        content: "",
        isAnonymous: false,
        visibility: "public",
        images: [],
        imagePreviews: [],
        isSubmitting: false,
        submitStatus: "",
      };
    }),
  submitPost: async () => {
    const { content, isAnonymous, visibility, images, reset } = get();
    
    if (!content.trim() && images.length === 0) {
      toast.error("Post cannot be empty");
      return;
    }

    set({ isSubmitting: true, submitStatus: "Preparing..." });
    const supabase = createClient();

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const imageUrls: string[] = [];
      if (images.length > 0) {
        set({ submitStatus: "Uploading media..." });
        
        for (const file of images) {
          const fileExt = file.name.split(".").pop();
          const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const bucket = file.type.startsWith("video/") ? "post-videos" : "post-images";

          const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(fileName);
            
          imageUrls.push(publicUrl);
        }
      }

      set({ submitStatus: "Publishing..." });
      
      const { error: insertError } = await supabase
        .from("posts")
        .insert({
          content,
          user_id: user.id,
          is_anonymous: isAnonymous,
          image_url: imageUrls.length > 0 ? JSON.stringify(imageUrls) : null,
        });

      if (insertError) throw insertError;

      toast.success("Post created successfully!");
      reset();
    } catch (error: any) {
      console.error("Error creating post:", error);
      toast.error(error.message || "Failed to create post");
      set({ isSubmitting: false, submitStatus: "" });
    }
  }
}));
