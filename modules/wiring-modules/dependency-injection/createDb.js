import sqlite3 from "sqlite3";

// factory instead of singleton
export function createDb(dbFile) {
  return new sqlite3.Database(dbFile);
}
