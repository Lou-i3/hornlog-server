-- DropForeignKey
ALTER TABLE `Gender` DROP FOREIGN KEY `Gender_ownerId_fkey`;

-- AlterTable
ALTER TABLE `Gender` MODIFY `ownerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Gender` ADD CONSTRAINT `Gender_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
