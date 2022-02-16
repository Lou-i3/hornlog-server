/*
  Warnings:

  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_role` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `username` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `refreshToken` DROP FOREIGN KEY `refreshTokens_ibfk_1`;

-- DropForeignKey
ALTER TABLE `user_role` DROP FOREIGN KEY `user_roles_ibfk_1`;

-- DropForeignKey
ALTER TABLE `user_role` DROP FOREIGN KEY `user_roles_ibfk_2`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `lastLoginAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `resetPasswordToken` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `role` ENUM('USER', 'MODERATOR', 'ADMIN') NOT NULL DEFAULT 'USER',
    MODIFY `username` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `role`;

-- DropTable
DROP TABLE `user_role`;

-- CreateIndex
CREATE UNIQUE INDEX `user_username_key` ON `user`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);

-- AddForeignKey
ALTER TABLE `refreshToken` ADD CONSTRAINT `refreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
