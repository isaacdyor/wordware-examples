import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { UserCreateInputSchema } from "prisma/generated/zod";

export const usersRouter = createTRPCRouter({
  create: privateProcedure
    .input(UserCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.$transaction(async (prisma) => {
        // Create the user first
        const user = await prisma.user.create({
          data: input,
        });

        // Create the space and associate it with the user
        const space = await prisma.space.create({
          data: {
            name: "Personal",
            icon: "User",
            userId: user.id,
          },
        });

        // Update the user with the active space ID
        await prisma.user.update({
          where: { id: user.id },
          data: { activeSpaceId: space.id },
        });

        return { user, space };
      });
    }),

  getCurrent: privateProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUnique({
      where: { userId: ctx.user.id },
      include: {
        spaces: {
          include: {
            conversations: {
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        },
      },
    });
  }),
});
