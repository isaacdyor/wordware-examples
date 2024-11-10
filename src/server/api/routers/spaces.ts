import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { SpaceCreateInputSchema } from "prisma/generated/zod";

export const spacesRouter = createTRPCRouter({
  create: privateProcedure
    .input(SpaceCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.space.create({
        data: input,
      });
    }),

  getCurrent: privateProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { userId: ctx.user.id },
      select: { activeSpaceId: true },
    });

    if (!user?.activeSpaceId) {
      throw new Error("Active space not found for the current user.");
    }

    return ctx.db.space.findUnique({
      where: { id: user.activeSpaceId },
      include: {
        conversations: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
  }),

  getAll: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.space.findMany({
      where: { userId: ctx.user.id },
    });
  }),
});
