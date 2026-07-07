"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { wishSchema, type WishSchema } from "../schemas/wish-schema";
import { wishCategories } from "../constants";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function WishForm() {
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
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl space-y-6"
    >
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Title
        </label>

        <Input
          placeholder="Happy Birthday Rahul 🎉"
          {...register("title")}
        />

        {errors.title && (
          <p className="mt-2 text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Message
        </label>

        <Textarea
          rows={6}
          placeholder="Write your wishes..."
          {...register("message")}
        />

        {errors.message && (
          <p className="mt-2 text-sm text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Category
        </label>

        <select
          {...register("category")}
          className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
        >
          {wishCategories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        {errors.category && (
          <p className="mt-2 text-sm text-red-500">
            {errors.category.message}
          </p>
        )}
      </div>

      <Button
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Create Wish"}
      </Button>
    </form>
  );
}