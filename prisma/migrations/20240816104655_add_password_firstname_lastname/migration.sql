-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "avatar" VARCHAR(255);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" VARCHAR(255),
ADD COLUMN     "lastName" VARCHAR(255),
ADD COLUMN     "password" VARCHAR(255) NOT NULL DEFAULT '';
