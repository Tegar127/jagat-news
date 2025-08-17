-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "content" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
