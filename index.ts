import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

async function main() {
  //Create User
  const id = 'cl70bpt2s000009mp9a3j3shf';
  const summary_id = 'cl70bpt2s000009mp9a3j3sha';

  const user = await prisma.user.create({
    data: {
      email: 'test@test.com',
      name: 'test',
      createdAt: new Date(),
      id: id,
    },
  });

  const response = await prisma.userActiveHistorySummary.upsert({
    where: {
      summary_id_user_id: {
        summary_id: summary_id,
        user_id: id,
      },
    },
    create: {
      summary_id: summary_id,
      user_id: id,
      login_count: 3,
    },
    update: {
      summary_id: summary_id,
      user_id: id,
      login_count: 3,
    },
  });

  console.log(response);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
