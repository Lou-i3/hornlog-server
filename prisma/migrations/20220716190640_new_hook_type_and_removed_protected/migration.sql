/*
  Warnings:

  - You are about to drop the column `protected` on the `Hook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Hook` DROP COLUMN `protected`,
    MODIFY `hookType` ENUM('Date', 'One Night Stand', 'Self Pleasure', 'Sex Friend', 'Friend', 'Sexting', 'Night', 'One Time', 'Hang') NOT NULL DEFAULT 'Date';
