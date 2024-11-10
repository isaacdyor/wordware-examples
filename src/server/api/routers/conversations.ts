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
      return ctx.db.message.create({
        data: input,
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
