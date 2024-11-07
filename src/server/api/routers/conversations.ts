import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { ConversationCreateInputSchema } from "prisma/generated/zod";
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
          userId: ctx.user.id,
          messages: {
            create: {
              content: input.message,
              role: "USER",
            },
          },
        },
      });
    }),
});
