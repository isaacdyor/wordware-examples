import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { SpaceCreateInputSchema } from "prisma/generated/zod";

export const spacesRouter = createTRPCRouter({
  create: privateProcedure
    .input(SpaceCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.space.create({
        data: {
          ...input,
          user: {
            connect: {
              userId: ctx.user.id,
            },
          },
        },
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
          where: { archived: false },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
  }),
});
