-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAdmin" BOOLEAN DEFAULT false;
