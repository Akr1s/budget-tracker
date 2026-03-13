import type {
  ITransaction,
  ITransactionForm,
} from "@/views/transactions/transactions.type";

const DB_NAME = "budget-tracker-db";
const DB_VERSION = 1;
const STORE = "transactions";

let dbPromise: Promise<IDBDatabase> | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("date", "date", { unique: false });
        store.createIndex("type", "type", { unique: false });
        store.createIndex("category", "category", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return dbPromise;
}

function promisify<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const IndexedDBService = {
  async addTransaction(formValues: ITransactionForm): Promise<ITransaction> {
    const record: Omit<ITransaction, "id"> = {
      ...formValues,
      createdAt: new Date().toISOString(),
    };
    const db = await openDB();
    const tx = db.transaction(STORE, "readwrite");

    return promisify(tx.objectStore(STORE).add(record)).then((result) => ({
      ...record,
      id: result as number,
    }));
  },

  async updateTransaction(
    id: number,
    formValues: ITransactionForm,
  ): Promise<ITransaction> {
    const db = await openDB();
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const record: ITransaction = await promisify(store.get(id));
    const updatedRecord: ITransaction = { ...record, ...formValues };

    return promisify(store.put(updatedRecord)).then(() => updatedRecord);
  },

  async deleteTransaction(id: number): Promise<void> {
    const db = await openDB();
    const tx = db.transaction(STORE, "readwrite");
    return promisify(tx.objectStore(STORE).delete(id));
  },

  async getAllTransactions(): Promise<ITransaction[]> {
    const db = await openDB();
    const tx = db.transaction(STORE, "readonly");
    return promisify(tx.objectStore(STORE).getAll());
  },
};
