/*
  Warnings:

  - The primary key for the `Upvote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Upvote` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Upvote_userId_postId_key";

-- AlterTable
ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Upvote_pkey" PRIMARY KEY ("userId", "postId");
