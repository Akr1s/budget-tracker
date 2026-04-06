import Dexie, { type Table } from "dexie";
import type {
  ITransaction,
  ITransactionForm,
} from "@/views/transactions/transactions.type";

const DB_NAME = "budget-tracker-db";
const DB_VERSION = 1;
const STORE = "transactions";

class BudgetTrackerDB extends Dexie {
  transactions!: Table<ITransaction, number>;

  constructor() {
    super(DB_NAME);
    this.version(DB_VERSION).stores({
      [STORE]: "++id, date, type, category",
    });
  }
}

const db = new BudgetTrackerDB();

export const IndexedDBService = {
  async addTransaction(formValues: ITransactionForm): Promise<ITransaction> {
    const record: Omit<ITransaction, "id"> = {
      ...formValues,
      createdAt: new Date().toISOString(),
    };
    const id = await db.transactions.add(record as ITransaction);
    return { ...record, id };
  },

  async updateTransaction(
    id: number,
    formValues: ITransactionForm,
  ): Promise<ITransaction> {
    const existingRecord = await db.transactions.get(id);
    const updatedRecord: ITransaction = { ...existingRecord!, ...formValues };
    await db.transactions.put(updatedRecord);

    return updatedRecord;
  },

  async deleteTransaction(id: number): Promise<void> {
    await db.transactions.delete(id);
  },

  async getAllTransactions(): Promise<ITransaction[]> {
    return db.transactions.toArray();
  },

  async getTransactionsByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<ITransaction[]> {
    return db.transactions
      .where("date")
      .between(startDate, endDate, true, true)
      .toArray();
  },

  async clearAll(): Promise<void> {
    await db.transactions.clear();
  },
};
