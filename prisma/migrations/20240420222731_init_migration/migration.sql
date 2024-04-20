/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `meals` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "meals_id_key" ON "meals"("id");
