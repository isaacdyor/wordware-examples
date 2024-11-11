import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { UserCreateInputSchema } from "prisma/generated/zod";

export const usersRouter = createTRPCRouter({
  create: privateProcedure
    .input(UserCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: input,
      });
    }),

  getCurrent: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUnique({
      where: { id: ctx.user.id },
      include: {
        conversations: {
          orderBy: {
            updatedAt: "asc",
          },
        },
      },
    });
  }),
});
