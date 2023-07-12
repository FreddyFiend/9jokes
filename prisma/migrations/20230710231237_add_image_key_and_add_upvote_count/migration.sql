/*
  Warnings:

  - Made the column `text` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "text" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "imageKey" TEXT,
ADD COLUMN     "upvoteCount" INTEGER NOT NULL DEFAULT 0;
