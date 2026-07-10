import { z } from "zod";
import { wishCategories } from "../constants";

export const wishSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title can't exceed 100 characters"),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message can't exceed 1000 characters"),

  category: z.enum(wishCategories),

  image: z.string().optional(),
});

export type WishSchema = z.infer<typeof wishSchema>;