// so a new creation of the database isnt made every time the app runs

import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// globalThis.prisma : this global variable ensures that the Prisma client instance is reused across hot reloads during development, without this, each time your application reloads, a new instance of the Prisma client would be created, potentially leading to connection issues
