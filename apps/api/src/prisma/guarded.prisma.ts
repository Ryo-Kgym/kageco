import { PrismaService } from "./prisma.service";
//
// export const organizationPrisma = async (prisma: PrismaService, token: string) => {
//   const session = await bypassedPrisma(prisma).session.findUnique({
//     where: { token },
//   });
//
//   if (!session || !session?.activeOrganizationId) {
//     throw new Error("session not found");
//   }
//
//   return prisma.$extends({
//     query: {
//       $allModels: {
//         async $allOperations({ args, query }) {
//           const [, , result] = await prisma.$transaction([
//             prisma.$executeRaw`SELECT set_config('app.organizationId', ${session.activeOrganizationId}, TRUE)`,
//             prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'off', TRUE)`,
//             query(args),
//           ]);
//           return result;
//         },
//       },
//     },
//   });
// };

export const bypassedPrisma = (prisma: PrismaService) => {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query }) {
          const [, , result] = await prisma.$transaction([
            prisma.$executeRaw`SELECT set_config('app.organizationId', ${(-1).toString()}, TRUE)`,
            prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', TRUE)`,
            query(args),
          ]);
          return result;
        },
      },
    },
  });
};
