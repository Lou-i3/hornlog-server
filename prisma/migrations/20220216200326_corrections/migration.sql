/*
  Warnings:

  - You are about to drop the column `archied` on the `Hook` table. All the data in the column will be lost.
  - The values [one night stand,self pleasure,sex friend] on the enum `Hook_hookType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Hook` DROP COLUMN `archied`,
    ADD COLUMN `archived` BOOLEAN NULL,
    MODIFY `hookType` ENUM('Date', 'One Night Stand', 'Self Pleasure', 'Sex Friend', 'Friend', 'Sexting') NOT NULL DEFAULT 'Date';
