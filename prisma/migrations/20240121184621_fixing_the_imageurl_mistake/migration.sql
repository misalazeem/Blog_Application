/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "imageUrl";
