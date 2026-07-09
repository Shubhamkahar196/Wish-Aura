"use server"

import { db } from "@/lib/db";
import { wishSchema } from "../schemas/wish-schema";
import { generateSlug } from "../utils/generate-slug";

export async function createWish(formData: unknown) {
  const validationFields = wishSchema.safeParse(formData);

  if (!validationFields.success) {
    return {
      success: false,
      message: "Invalid form data.", 
      errors: validationFields.error.flatten().fieldErrors,
    };
  } 

  const data = validationFields.data;
  const slug = generateSlug(data.title);

  const wish = await db.wish.create({
    data: {
      title: data?.title,
      message: data?.message,
      category: data?.category,
      slug
    }
  });

  return { 
    success: true, 
    message: "Validation successful", 
    wish 
  };
}
