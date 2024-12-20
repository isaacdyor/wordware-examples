import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import {
  ConversationCreateInputSchema,
  ConversationUpdateArgsSchema,
  MessageCreateInputSchema,
} from "prisma/generated/zod";
import { z } from "zod";

const CreateConversationInputSchema = z.object({
  conversation: ConversationCreateInputSchema,
  message: z.string(),
});

export const conversationsRouter = createTRPCRouter({
  create: privateProcedure
    .input(CreateConversationInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.conversation.create({
        data: {
          ...input.conversation,
          messages: {
            create: {
              content: input.message,
              role: "USER",
            },
          },
        },
      });
    }),

  update: privateProcedure
    .input(ConversationUpdateArgsSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.conversation.update(input);
    }),

  archive: privateProcedure
    .input(z.object({ id: z.string(), archived: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.conversation.update({
        where: { id: input.id },
        data: { archived: input.archived },
      });
    }),

  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.conversation.delete({
        where: { id: input.id },
      });
    }),

  addMessage: privateProcedure
    .input(MessageCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.$transaction(async (tx) => {
        const message = await tx.message.create({
          data: input,
        });

        await tx.conversation.update({
          where: { id: input.conversation.connect?.id },
          data: { updatedAt: new Date() },
        });

        return message;
      });
    }),

  getById: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.conversation.findUnique({
        where: { id: input.id },
        include: {
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
    }),
});
