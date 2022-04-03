/*
  Warnings:

  - The values [Facebook,Instagram,Twitter,Snapchat,LinkedIn,Other] on the enum `ContactInfo_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `ContactInfo` MODIFY `type` ENUM('Phone', 'Email', 'social_media') NOT NULL;
