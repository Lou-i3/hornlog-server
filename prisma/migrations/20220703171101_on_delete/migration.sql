-- DropForeignKey
ALTER TABLE `ContactInfo` DROP FOREIGN KEY `ContactInfo_personId_fkey`;

-- DropForeignKey
ALTER TABLE `Gender` DROP FOREIGN KEY `Gender_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `Hook` DROP FOREIGN KEY `Hook_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `HooksOnPartners` DROP FOREIGN KEY `HooksOnPartners_hookId_fkey`;

-- DropForeignKey
ALTER TABLE `HooksOnPartners` DROP FOREIGN KEY `HooksOnPartners_partnerId_fkey`;

-- DropForeignKey
ALTER TABLE `Location` DROP FOREIGN KEY `Location_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `Partner` DROP FOREIGN KEY `Partner_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `Partner` DROP FOREIGN KEY `Partner_personId_fkey`;

-- DropForeignKey
ALTER TABLE `Person` DROP FOREIGN KEY `Person_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserSettings` DROP FOREIGN KEY `UserSettings_userId_fkey`;

-- DropForeignKey
ALTER TABLE `refreshToken` DROP FOREIGN KEY `refreshToken_userId_fkey`;

-- AddForeignKey
ALTER TABLE `refreshToken` ADD CONSTRAINT `refreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSettings` ADD CONSTRAINT `UserSettings_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Person` ADD CONSTRAINT `Person_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactInfo` ADD CONSTRAINT `ContactInfo_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hook` ADD CONSTRAINT `Hook_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gender` ADD CONSTRAINT `Gender_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partner` ADD CONSTRAINT `Partner_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Partner` ADD CONSTRAINT `Partner_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Person`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HooksOnPartners` ADD CONSTRAINT `HooksOnPartners_hookId_fkey` FOREIGN KEY (`hookId`) REFERENCES `Hook`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HooksOnPartners` ADD CONSTRAINT `HooksOnPartners_partnerId_fkey` FOREIGN KEY (`partnerId`) REFERENCES `Partner`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
