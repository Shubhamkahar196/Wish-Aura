"use server"

import { connectDb } from "@/lib/db";
import { wishSchema } from "../schemas/wish-schema";
import { generateSlug } from "../utils/generate-slug";
import {Wish} from '../../../models/wish.models'

export async function createWish(formData: unknown) {
  await connectDb();

  // Fix: when using server actions, formData often arrives as FormData,
  // but zod expects plain strings. Convert without changing your business logic.
  const parsedInput: unknown = (() => {
    if (formData instanceof FormData) {
      const obj: Record<string, unknown> = {};
      for (const [key, value] of formData.entries()) {
        obj[key] = typeof value === "string" ? value : String(value);
      }
      return obj;
    }

    return formData;
  })();

  const validationFields = wishSchema.safeParse(parsedInput);

  if (!validationFields.success) {
    return {
      success: false,
      message: "Invalid form data.",
      errors: validationFields.error.flatten().fieldErrors,
    };
  }

  const data = validationFields.data;
  const slug = generateSlug(data.title);

  const wish = await Wish.create({
    title: data.title,
    message: data.message,
    category: data.category,
    slug,
    images: data.image
      ? [
          {
            url: data.image,
            publicId: "",
          },
        ]
      : [],
  });

  return {
    success: true,
    message: "Validation successful",
    slug: wish.slug,
  };
}
