import { PrismaClient } from "@prisma/client";
import { enhance } from "@zenstackhq/runtime";
import { stackServerApp } from "~/stack";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["info", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Gets an enhanced PrismaClient for the current user
 */
export async function getUserDb() {
  const stackAuthUser = await stackServerApp.getUser();
  const currentTeam = stackAuthUser?.selectedTeam;

  // by default StackAuth's team members have "admin" or "member" role
  const perm =
    currentTeam && (await stackAuthUser.getPermission(currentTeam, "admin"));

  const user = stackAuthUser
    ? {
        userId: stackAuthUser.id,
        currentTeamId: stackAuthUser.selectedTeam?.id,
        currentTeamRole: perm ? "admin" : "member",
      }
    : undefined;

  console.log("Creating enhanced PrismaClient:", user);

  return enhance(prisma, { user });
}
