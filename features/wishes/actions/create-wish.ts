"use server"

import { connectDb } from "@/lib/db";
import { wishSchema } from "../schemas/wish-schema";
import { generateSlug } from "../utils/generate-slug";
import {Wish} from '../../../models/wish.models'

export async function createWish(formData: unknown) {
    await connectDb();

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


    const wish = await Wish.create({
  title: data.title,
  message: data.message,
  category: data.category,
  slug,
});
  

  return { 
    success: true, 
    message: "Validation successful", 
    slug: wish.slug
  };
}
