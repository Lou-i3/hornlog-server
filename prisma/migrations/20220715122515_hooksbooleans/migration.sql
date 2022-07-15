/*
  Warnings:

  - You are about to drop the column `Penetration` on the `Hook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Hook` DROP COLUMN `Penetration`,
    ADD COLUMN `penetration` BOOLEAN NULL,
    ADD COLUMN `pill` BOOLEAN NULL,
    ADD COLUMN `protection` BOOLEAN NULL;
