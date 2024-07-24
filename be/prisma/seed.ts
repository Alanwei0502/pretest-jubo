import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const patients = [
  {
    name: '張小明',
    orders: [
      '每日量血壓，控制在140/90以下',
      '每日服用降血壓藥物，早晚各一次',
      '限制鹽分攝入，每日不超過6克',
      '每週至少進行3次有氧運動，每次30分鐘',
      '定期進行眼底檢查，每6個月一次',
    ],
  },
  {
    name: '李芳宜',
    orders: [
      '每週三次有氧運動，每次30分鐘',
      '每日記錄飲食及運動情況',
      '每月進行一次體重和體脂率檢測',
      '增加蛋白質攝入，每日至少1.5克/公斤體重',
      '保持充足睡眠，每晚至少7-8小時',
    ],
  },
  {
    name: '王大力',
    orders: [
      '飲食控制，減少高糖高脂食物攝入',
      '每日監測血糖，空腹和餐後2小時各一次',
      '按時服用降血糖藥物，遵醫囑調整劑量',
      '每天步行至少30分鐘',
      '每3個月進行一次糖化血紅蛋白檢查',
    ],
  },
  {
    name: '陳美麗',
    orders: [
      '每天服用鈣片一次，飯後服用',
      '增加戶外活動時間，每週至少3次，每次20分鐘',
      '進行負重運動，如快走或輕度舉重，每週3次',
      '飲食中增加富含維生素D的食物',
      '每年進行一次骨密度檢查',
    ],
  },
  {
    name: '黃志強',
    orders: [
      '戒菸，並進行定期肺功能檢查',
      '使用尼古丁替代療法，如尼古丁貼片',
      '參加戒菸互助小組，每週一次',
      '增加水果蔬菜攝入，促進肺部健康',
      '進行呼吸訓練exercises，每天2次，每次15分鐘',
    ],
  },
];

async function main() {
  await prisma.patient.deleteMany();

  for (const p of patients) {
    await prisma.patient.create({
      data: {
        name: p.name,
        order: {
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
