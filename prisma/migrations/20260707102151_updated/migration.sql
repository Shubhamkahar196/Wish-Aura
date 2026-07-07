/*
  Warnings:

  - You are about to drop the column `isAnonymous` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image2` on the `Wish` table. All the data in the column will be lost.
  - The `image1` column on the `Wish` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "WishTheme" AS ENUM ('Classic', 'Elegant', 'Party');

-- DropIndex
DROP INDEX "Wish_slug_idx";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAnonymous";

-- AlterTable
ALTER TABLE "Wish" DROP COLUMN "image2",
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "theme" "WishTheme",
DROP COLUMN "image1",
ADD COLUMN     "image1" JSONB;

-- CreateIndex
CREATE INDEX "Wish_createdAt_idx" ON "Wish"("createdAt");
