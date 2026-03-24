import { CategoryEnum } from "@/enums/category.enum";
import { IndexedDBService } from "@/storage/index-db.service";
import { CurrencyEnum } from "@/utils/currency";
import type { ITransactionForm } from "@/views/transactions/transactions.type";
import { TransactionTypeEnum } from "@/views/transactions/utils/transaction.enum";

const EXPENSE_TEMPLATES: { category: CategoryEnum; descriptions: string[]; minAmount: number; maxAmount: number }[] = [
  { category: CategoryEnum.HOUSING, descriptions: ["Rent Payment", "Electricity Bill", "Water Bill", "Internet Service"], minAmount: 80, maxAmount: 1500 },
  { category: CategoryEnum.GROCERIES, descriptions: ["Weekly Groceries", "Farmers Market", "Supermarket Run", "Online Grocery Order"], minAmount: 30, maxAmount: 200 },
  { category: CategoryEnum.TRANSPORTATION, descriptions: ["Gas Station", "Bus Pass", "Uber Ride", "Car Maintenance"], minAmount: 10, maxAmount: 120 },
  { category: CategoryEnum.HEALTHCARE, descriptions: ["Pharmacy", "Doctor Visit", "Dental Checkup", "Health Insurance"], minAmount: 20, maxAmount: 300 },
  { category: CategoryEnum.ENTERTAINMENT, descriptions: ["Movie Night", "Streaming Service", "Concert Tickets", "Video Games"], minAmount: 10, maxAmount: 80 },
  { category: CategoryEnum.SHOPPING, descriptions: ["Clothing Store", "Electronics", "Home Decor", "Online Shopping"], minAmount: 15, maxAmount: 250 },
  { category: CategoryEnum.SPORTS, descriptions: ["Gym Membership", "Sports Equipment", "Yoga Class", "Swimming Pool"], minAmount: 20, maxAmount: 100 },
  { category: CategoryEnum.EDUCATION, descriptions: ["Online Course", "Books", "Workshop Fee", "Certification Exam"], minAmount: 15, maxAmount: 200 },
];

const INCOME_TEMPLATES: { descriptions: string[]; minAmount: number; maxAmount: number }[] = [
  { descriptions: ["Monthly Salary", "Salary Deposit"], minAmount: 3000, maxAmount: 6000 },
  { descriptions: ["Freelance Project", "Consulting Fee", "Side Gig Payment"], minAmount: 200, maxAmount: 1500 },
  { descriptions: ["Investment Dividend", "Interest Payment"], minAmount: 50, maxAmount: 500 },
];

const CURRENCIES = Object.values(CurrencyEnum);

function randomBetween(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDateInMonth(year: number, month: number): string {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const day = Math.floor(Math.random() * daysInMonth) + 1;
  const y = String(year);
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return new Date(`${y}-${m}-${d}T12:00:00Z`).toISOString();
}

function generateForMonth(year: number, month: number): ITransactionForm[] {
  const transactions: ITransactionForm[] = [];

  const incomeTemplate = pickRandom(INCOME_TEMPLATES);
  transactions.push({
    type: TransactionTypeEnum.INCOME,
    amount: randomBetween(incomeTemplate.minAmount, incomeTemplate.maxAmount),
    currency: pickRandom(CURRENCIES),
    category: CategoryEnum.SAVINGS,
    description: pickRandom(incomeTemplate.descriptions),
    date: randomDateInMonth(year, month),
  });

  if (Math.random() > 0.5) {
    const extra = pickRandom(INCOME_TEMPLATES);
    transactions.push({
      type: TransactionTypeEnum.INCOME,
      amount: randomBetween(extra.minAmount, extra.maxAmount),
      currency: pickRandom(CURRENCIES),
      category: CategoryEnum.SAVINGS,
      description: pickRandom(extra.descriptions),
      date: randomDateInMonth(year, month),
    });
  }

  const expenseCount = Math.floor(Math.random() * 6) + 5;
  const usedCategories = new Set<CategoryEnum>();

  for (let i = 0; i < expenseCount; i++) {
    let template = pickRandom(EXPENSE_TEMPLATES);

    if (usedCategories.size < EXPENSE_TEMPLATES.length && i < EXPENSE_TEMPLATES.length) {
      while (usedCategories.has(template.category)) {
        template = pickRandom(EXPENSE_TEMPLATES);
      }
    }
    usedCategories.add(template.category);

    transactions.push({
      type: TransactionTypeEnum.EXPENSE,
      amount: randomBetween(template.minAmount, template.maxAmount),
      currency: pickRandom(CURRENCIES),
      category: template.category,
      description: pickRandom(template.descriptions),
      date: randomDateInMonth(year, month),
    });
  }

  return transactions;
}

export async function generateSampleData(): Promise<number> {
  const now = new Date();
  const allTransactions: ITransactionForm[] = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    allTransactions.push(...generateForMonth(date.getFullYear(), date.getMonth()));
  }

  await Promise.all(
    allTransactions.map((tx) => IndexedDBService.addTransaction(tx)),
  );

  return allTransactions.length;
}
