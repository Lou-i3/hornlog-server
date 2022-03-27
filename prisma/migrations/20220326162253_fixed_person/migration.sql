-- DropForeignKey
ALTER TABLE `Person` DROP FOREIGN KEY `Person_genderId_fkey`;

-- AlterTable
ALTER TABLE `Person` ADD COLUMN `how` VARCHAR(255) NULL,
    MODIFY `firstName` VARCHAR(255) NULL,
    MODIFY `lastName` VARCHAR(255) NULL,
    MODIFY `genderId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Person` ADD CONSTRAINT `Person_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `Gender`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
