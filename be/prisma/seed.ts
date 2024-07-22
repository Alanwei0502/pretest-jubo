import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const patients = [
  {
    name: '張小明',
    orders: ['每日量血壓，控制在140/90以下'],
  },
  {
    name: '李芳宜',
    orders: ['每週三次有氧運動，每次30分鐘'],
  },
  {
    name: '王大力',
    orders: ['飲食控制，減少高糖高脂食物攝入'],
  },
  {
    name: '陳美麗',
    orders: ['每天服用鈣片一次，飯後服用'],
  },
  {
    name: '黃志強',
    orders: ['戒菸，並進行定期肺功能檢查'],
  },
];

async function main() {
  await prisma.patient.deleteMany();

  for (const p of patients) {
    await prisma.patient.create({
      data: {
        name: p.name,
        Order: {
          create: p.orders.map((order) => ({
            message: order,
          })),
        },
      },
    });
  }

  console.log('Seed data created successfully');
}

main();
