"use server";

import { connectDb} from "@/lib/db";
import { Wish } from "@/models/wish.models";

export async function getWish(slug: string) {
  await connectDb();

  const wish = await Wish.findOne({
    slug,
  });

  return wish;
}