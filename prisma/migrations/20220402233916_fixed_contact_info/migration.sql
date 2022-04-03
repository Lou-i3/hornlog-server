/*
  Warnings:

  - You are about to drop the column `ownerId` on the `ContactInfo` table. All the data in the column will be lost.
  - Added the required column `personId` to the `ContactInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ContactInfo` DROP FOREIGN KEY `ContactInfo_ownerId_fkey`;

-- AlterTable
ALTER TABLE `ContactInfo` DROP COLUMN `ownerId`,
    ADD COLUMN `personId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ContactInfo` ADD CONSTRAINT `ContactInfo_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
