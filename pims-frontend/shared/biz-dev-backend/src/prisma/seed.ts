// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const fakerProject = () => ({
  name: faker.word.words(3),
});

async function main() {
  console.log('Seeding...');
  /// --------- Users ---------------
  for (let i = 0; i < 5; i++) {
    await prisma.project.create({ data: fakerProject() });
  }
  console.log('Seeding done.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
