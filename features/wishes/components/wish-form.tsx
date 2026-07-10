"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ImageUpload from "@/features/uploads/image-upload";
import { wishSchema, type WishSchema } from "../schemas/wish-schema";
import { wishCategories } from "../constants";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createWish } from "../actions/create-wish";
import { useRouter } from "next/navigation";

export default function WishForm() {
  const router = useRouter();
const [imageUrl, setImageUrl] = useState("");
const [uploading, setUploading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WishSchema>({
    resolver: zodResolver(wishSchema),
    defaultValues: {
      title: "",
      message: "",
      category: "Birthday",
    },
  });

  async function onSubmit(data: WishSchema) {
   const response = await createWish({
  ...data,
  image: imageUrl,
});
    
    if (!response.success) return;
    router.push(`/w/${response.slug}`);
    console.log(response);
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-background via-muted/50 to-background">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl space-y-6 rounded-2xl border bg-card p-6 sm:p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
      >
        {/* Header Section */}
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Create a Special Wish
          </h1>
          <p className="text-sm text-muted-foreground">
            Fill out the details below to generate a beautiful, shareable wish card.
          </p>
        </div>

        <hr className="border-muted" />

        {/* Title */}
        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wide text-foreground/90">
            Title
          </label>
          <Input
            placeholder="Happy Birthday Shubham 🎉"
            className="h-11 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-xs sm:text-sm font-medium text-destructive animate-in fade-in-50 slide-in-from-top-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wide text-foreground/90">
            Message
          </label>
          <Textarea
            rows={5}
            placeholder="Write your heartfelt wishes here..."
            className="resize-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary"
            {...register("message")}
          />
          {errors.message && (
            <p className="text-xs sm:text-sm font-medium text-destructive animate-in fade-in-50 slide-in-from-top-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wide text-foreground/90">
            Category
          </label>
          <div className="relative">
            <select
              {...register("category")}
              className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 appearance-none cursor-pointer"
            >
              {wishCategories.map((category) => (
                <option key={category} value={category} className="bg-background text-foreground">
                  {category}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow for a cleaner look */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.category && (
            <p className="text-xs sm:text-sm font-medium text-destructive animate-in fade-in-50 slide-in-from-top-1">
              {errors.category.message}
            </p>
          )}
        </div>
<ImageUpload
  onUpload={setImageUrl}
  onUploading={setUploading}
/>
        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-11 text-base font-medium shadow-md transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          disabled={isSubmitting || uploading}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2 justify-center">
              {/* Optional: Small loading spinner */}
              <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating...
            </span>
          ) : (
            "Create Wish ✨"
          )}
        </Button>
      </form>
    </div>
  );
}