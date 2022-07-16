/*
  Warnings:

  - The values [One Night Stand,Self Pleasure,Sex Friend,Friend,Sexting] on the enum `Hook_hookType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Hook` MODIFY `hookType` ENUM('Hang', 'Date', 'One Time', 'Night', 'Virtual', 'Self') NOT NULL DEFAULT 'Date';
