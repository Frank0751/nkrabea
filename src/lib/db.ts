import { PrismaClient } from "@prisma/client";

/**
 * Lazily constructed Prisma client.
 *
 * Constructing PrismaClient throws when DATABASE_URL is unset. At module scope
 * that would crash the route on import, before the persistence guard had a
 * chance to answer honestly. Creating it on first use instead means a
 * misconfigured deployment returns a clear message rather than a 500.
 *
 * The instance is cached on globalThis in development so that hot reload does
 * not open a new connection pool on every edit.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function getDb(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}
