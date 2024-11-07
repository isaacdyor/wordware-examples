import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const ConversationScalarFieldEnumSchema = z.enum(['id','userId','createdAt','updatedAt']);

export const MessageScalarFieldEnumSchema = z.enum(['id','content','createdAt','updatedAt','conversationId','role']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const MessageRoleSchema = z.enum(['USER','ASSISTANT']);

export type MessageRoleType = `${z.infer<typeof MessageRoleSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CONVERSATION SCHEMA
/////////////////////////////////////////

export const ConversationSchema = z.object({
  id: z.number().int(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Conversation = z.infer<typeof ConversationSchema>

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
  role: MessageRoleSchema,
  id: z.number().int(),
  content: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  conversationId: z.number().int(),
})

export type Message = z.infer<typeof MessageSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CONVERSATION
//------------------------------------------------------

export const ConversationIncludeSchema: z.ZodType<Prisma.ConversationInclude> = z.object({
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ConversationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ConversationArgsSchema: z.ZodType<Prisma.ConversationDefaultArgs> = z.object({
  select: z.lazy(() => ConversationSelectSchema).optional(),
  include: z.lazy(() => ConversationIncludeSchema).optional(),
}).strict();

export const ConversationCountOutputTypeArgsSchema: z.ZodType<Prisma.ConversationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ConversationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ConversationCountOutputTypeSelectSchema: z.ZodType<Prisma.ConversationCountOutputTypeSelect> = z.object({
  messages: z.boolean().optional(),
}).strict();

export const ConversationSelectSchema: z.ZodType<Prisma.ConversationSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ConversationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MESSAGE
//------------------------------------------------------

export const MessageIncludeSchema: z.ZodType<Prisma.MessageInclude> = z.object({
  conversation: z.union([z.boolean(),z.lazy(() => ConversationArgsSchema)]).optional(),
}).strict()

export const MessageArgsSchema: z.ZodType<Prisma.MessageDefaultArgs> = z.object({
  select: z.lazy(() => MessageSelectSchema).optional(),
  include: z.lazy(() => MessageIncludeSchema).optional(),
}).strict();

export const MessageSelectSchema: z.ZodType<Prisma.MessageSelect> = z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  conversationId: z.boolean().optional(),
  role: z.boolean().optional(),
  conversation: z.union([z.boolean(),z.lazy(() => ConversationArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ConversationWhereInputSchema: z.ZodType<Prisma.ConversationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional()
}).strict();

export const ConversationOrderByWithRelationInputSchema: z.ZodType<Prisma.ConversationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  messages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ConversationWhereUniqueInputSchema: z.ZodType<Prisma.ConversationWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional()
}).strict());

export const ConversationOrderByWithAggregationInputSchema: z.ZodType<Prisma.ConversationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ConversationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ConversationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ConversationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ConversationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ConversationSumOrderByAggregateInputSchema).optional()
}).strict();

export const ConversationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ConversationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema),z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema),z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const MessageWhereInputSchema: z.ZodType<Prisma.MessageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  conversationId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => EnumMessageRoleFilterSchema),z.lazy(() => MessageRoleSchema) ]).optional(),
  conversation: z.union([ z.lazy(() => ConversationRelationFilterSchema),z.lazy(() => ConversationWhereInputSchema) ]).optional(),
}).strict();

export const MessageOrderByWithRelationInputSchema: z.ZodType<Prisma.MessageOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  conversation: z.lazy(() => ConversationOrderByWithRelationInputSchema).optional()
}).strict();

export const MessageWhereUniqueInputSchema: z.ZodType<Prisma.MessageWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  conversationId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  role: z.union([ z.lazy(() => EnumMessageRoleFilterSchema),z.lazy(() => MessageRoleSchema) ]).optional(),
  conversation: z.union([ z.lazy(() => ConversationRelationFilterSchema),z.lazy(() => ConversationWhereInputSchema) ]).optional(),
}).strict());

export const MessageOrderByWithAggregationInputSchema: z.ZodType<Prisma.MessageOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MessageCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MessageAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MessageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MessageMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MessageSumOrderByAggregateInputSchema).optional()
}).strict();

export const MessageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MessageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  conversationId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => EnumMessageRoleWithAggregatesFilterSchema),z.lazy(() => MessageRoleSchema) ]).optional(),
}).strict();

export const ConversationCreateInputSchema: z.ZodType<Prisma.ConversationCreateInput> = z.object({
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationUncheckedCreateInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationUpdateInputSchema: z.ZodType<Prisma.ConversationUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationCreateManyInputSchema: z.ZodType<Prisma.ConversationCreateManyInput> = z.object({
  id: z.number().int().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ConversationUpdateManyMutationInputSchema: z.ZodType<Prisma.ConversationUpdateManyMutationInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateInputSchema: z.ZodType<Prisma.MessageCreateInput> = z.object({
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => MessageRoleSchema),
  conversation: z.lazy(() => ConversationCreateNestedOneWithoutMessagesInputSchema)
}).strict();

export const MessageUncheckedCreateInputSchema: z.ZodType<Prisma.MessageUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  conversationId: z.number().int(),
  role: z.lazy(() => MessageRoleSchema)
}).strict();

export const MessageUpdateInputSchema: z.ZodType<Prisma.MessageUpdateInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => EnumMessageRoleFieldUpdateOperationsInputSchema) ]).optional(),
  conversation: z.lazy(() => ConversationUpdateOneRequiredWithoutMessagesNestedInputSchema).optional()
}).strict();

export const MessageUncheckedUpdateInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => EnumMessageRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateManyInputSchema: z.ZodType<Prisma.MessageCreateManyInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  conversationId: z.number().int(),
  role: z.lazy(() => MessageRoleSchema)
}).strict();

export const MessageUpdateManyMutationInputSchema: z.ZodType<Prisma.MessageUpdateManyMutationInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => EnumMessageRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => EnumMessageRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const MessageListRelationFilterSchema: z.ZodType<Prisma.MessageListRelationFilter> = z.object({
  every: z.lazy(() => MessageWhereInputSchema).optional(),
  some: z.lazy(() => MessageWhereInputSchema).optional(),
  none: z.lazy(() => MessageWhereInputSchema).optional()
}).strict();

export const MessageOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MessageOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationCountOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationMinOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationSumOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const EnumMessageRoleFilterSchema: z.ZodType<Prisma.EnumMessageRoleFilter> = z.object({
  equals: z.lazy(() => MessageRoleSchema).optional(),
  in: z.lazy(() => MessageRoleSchema).array().optional(),
  notIn: z.lazy(() => MessageRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => NestedEnumMessageRoleFilterSchema) ]).optional(),
}).strict();

export const ConversationRelationFilterSchema: z.ZodType<Prisma.ConversationRelationFilter> = z.object({
  is: z.lazy(() => ConversationWhereInputSchema).optional(),
  isNot: z.lazy(() => ConversationWhereInputSchema).optional()
}).strict();

export const MessageCountOrderByAggregateInputSchema: z.ZodType<Prisma.MessageCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MessageAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageMinOrderByAggregateInputSchema: z.ZodType<Prisma.MessageMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MessageSumOrderByAggregateInputSchema: z.ZodType<Prisma.MessageSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  conversationId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumMessageRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMessageRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MessageRoleSchema).optional(),
  in: z.lazy(() => MessageRoleSchema).array().optional(),
  notIn: z.lazy(() => MessageRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => NestedEnumMessageRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMessageRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMessageRoleFilterSchema).optional()
}).strict();

export const MessageCreateNestedManyWithoutConversationInputSchema: z.ZodType<Prisma.MessageCreateNestedManyWithoutConversationInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageCreateWithoutConversationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyConversationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MessageUncheckedCreateNestedManyWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageCreateWithoutConversationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyConversationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const MessageUpdateManyWithoutConversationNestedInputSchema: z.ZodType<Prisma.MessageUpdateManyWithoutConversationNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageCreateWithoutConversationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyConversationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutConversationInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutConversationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const MessageUncheckedUpdateManyWithoutConversationNestedInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput> = z.object({
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageCreateWithoutConversationInputSchema).array(),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema),z.lazy(() => MessageCreateOrConnectWithoutConversationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MessageUpsertWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => MessageUpsertWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MessageCreateManyConversationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MessageWhereUniqueInputSchema),z.lazy(() => MessageWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MessageUpdateWithWhereUniqueWithoutConversationInputSchema),z.lazy(() => MessageUpdateWithWhereUniqueWithoutConversationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MessageUpdateManyWithWhereWithoutConversationInputSchema),z.lazy(() => MessageUpdateManyWithWhereWithoutConversationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConversationCreateNestedOneWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateNestedOneWithoutMessagesInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ConversationCreateOrConnectWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => ConversationWhereUniqueInputSchema).optional()
}).strict();

export const EnumMessageRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMessageRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MessageRoleSchema).optional()
}).strict();

export const ConversationUpdateOneRequiredWithoutMessagesNestedInputSchema: z.ZodType<Prisma.ConversationUpdateOneRequiredWithoutMessagesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ConversationCreateOrConnectWithoutMessagesInputSchema).optional(),
  upsert: z.lazy(() => ConversationUpsertWithoutMessagesInputSchema).optional(),
  connect: z.lazy(() => ConversationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateToOneWithWhereWithoutMessagesInputSchema),z.lazy(() => ConversationUpdateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutMessagesInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumMessageRoleFilterSchema: z.ZodType<Prisma.NestedEnumMessageRoleFilter> = z.object({
  equals: z.lazy(() => MessageRoleSchema).optional(),
  in: z.lazy(() => MessageRoleSchema).array().optional(),
  notIn: z.lazy(() => MessageRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => NestedEnumMessageRoleFilterSchema) ]).optional(),
}).strict();

export const NestedEnumMessageRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMessageRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MessageRoleSchema).optional(),
  in: z.lazy(() => MessageRoleSchema).array().optional(),
  notIn: z.lazy(() => MessageRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => NestedEnumMessageRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMessageRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMessageRoleFilterSchema).optional()
}).strict();

export const MessageCreateWithoutConversationInputSchema: z.ZodType<Prisma.MessageCreateWithoutConversationInput> = z.object({
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => MessageRoleSchema)
}).strict();

export const MessageUncheckedCreateWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutConversationInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => MessageRoleSchema)
}).strict();

export const MessageCreateOrConnectWithoutConversationInputSchema: z.ZodType<Prisma.MessageCreateOrConnectWithoutConversationInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema) ]),
}).strict();

export const MessageCreateManyConversationInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManyConversationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessageCreateManyConversationInputSchema),z.lazy(() => MessageCreateManyConversationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MessageUpsertWithWhereUniqueWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpsertWithWhereUniqueWithoutConversationInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MessageUpdateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutConversationInputSchema) ]),
  create: z.union([ z.lazy(() => MessageCreateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedCreateWithoutConversationInputSchema) ]),
}).strict();

export const MessageUpdateWithWhereUniqueWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpdateWithWhereUniqueWithoutConversationInput> = z.object({
  where: z.lazy(() => MessageWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateWithoutConversationInputSchema),z.lazy(() => MessageUncheckedUpdateWithoutConversationInputSchema) ]),
}).strict();

export const MessageUpdateManyWithWhereWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpdateManyWithWhereWithoutConversationInput> = z.object({
  where: z.lazy(() => MessageScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MessageUpdateManyMutationInputSchema),z.lazy(() => MessageUncheckedUpdateManyWithoutConversationInputSchema) ]),
}).strict();

export const MessageScalarWhereInputSchema: z.ZodType<Prisma.MessageScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereInputSchema),z.lazy(() => MessageScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  conversationId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => EnumMessageRoleFilterSchema),z.lazy(() => MessageRoleSchema) ]).optional(),
}).strict();

export const ConversationCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateWithoutMessagesInput> = z.object({
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ConversationUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateWithoutMessagesInput> = z.object({
  id: z.number().int().optional(),
  userId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ConversationCreateOrConnectWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateOrConnectWithoutMessagesInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]),
}).strict();

export const ConversationUpsertWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUpsertWithoutMessagesInput> = z.object({
  update: z.union([ z.lazy(() => ConversationUpdateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutMessagesInputSchema) ]),
  create: z.union([ z.lazy(() => ConversationCreateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutMessagesInputSchema) ]),
  where: z.lazy(() => ConversationWhereInputSchema).optional()
}).strict();

export const ConversationUpdateToOneWithWhereWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUpdateToOneWithWhereWithoutMessagesInput> = z.object({
  where: z.lazy(() => ConversationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ConversationUpdateWithoutMessagesInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutMessagesInputSchema) ]),
}).strict();

export const ConversationUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUpdateWithoutMessagesInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversationUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateManyConversationInputSchema: z.ZodType<Prisma.MessageCreateManyConversationInput> = z.object({
  id: z.number().int().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => MessageRoleSchema)
}).strict();

export const MessageUpdateWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpdateWithoutConversationInput> = z.object({
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => EnumMessageRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateWithoutConversationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => EnumMessageRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutConversationInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => EnumMessageRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ConversationFindFirstArgsSchema: z.ZodType<Prisma.ConversationFindFirstArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConversationScalarFieldEnumSchema,ConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ConversationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ConversationFindFirstOrThrowArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConversationScalarFieldEnumSchema,ConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ConversationFindManyArgsSchema: z.ZodType<Prisma.ConversationFindManyArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ConversationScalarFieldEnumSchema,ConversationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ConversationAggregateArgsSchema: z.ZodType<Prisma.ConversationAggregateArgs> = z.object({
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithRelationInputSchema.array(),ConversationOrderByWithRelationInputSchema ]).optional(),
  cursor: ConversationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ConversationGroupByArgsSchema: z.ZodType<Prisma.ConversationGroupByArgs> = z.object({
  where: ConversationWhereInputSchema.optional(),
  orderBy: z.union([ ConversationOrderByWithAggregationInputSchema.array(),ConversationOrderByWithAggregationInputSchema ]).optional(),
  by: ConversationScalarFieldEnumSchema.array(),
  having: ConversationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ConversationFindUniqueArgsSchema: z.ZodType<Prisma.ConversationFindUniqueArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema,
}).strict() ;

export const ConversationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ConversationFindUniqueOrThrowArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema,
}).strict() ;

export const MessageFindFirstArgsSchema: z.ZodType<Prisma.MessageFindFirstArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MessageFindFirstOrThrowArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageFindManyArgsSchema: z.ZodType<Prisma.MessageFindManyArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MessageAggregateArgsSchema: z.ZodType<Prisma.MessageAggregateArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MessageGroupByArgsSchema: z.ZodType<Prisma.MessageGroupByArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithAggregationInputSchema.array(),MessageOrderByWithAggregationInputSchema ]).optional(),
  by: MessageScalarFieldEnumSchema.array(),
  having: MessageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MessageFindUniqueArgsSchema: z.ZodType<Prisma.MessageFindUniqueArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MessageFindUniqueOrThrowArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const ConversationCreateArgsSchema: z.ZodType<Prisma.ConversationCreateArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  data: z.union([ ConversationCreateInputSchema,ConversationUncheckedCreateInputSchema ]),
}).strict() ;

export const ConversationUpsertArgsSchema: z.ZodType<Prisma.ConversationUpsertArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema,
  create: z.union([ ConversationCreateInputSchema,ConversationUncheckedCreateInputSchema ]),
  update: z.union([ ConversationUpdateInputSchema,ConversationUncheckedUpdateInputSchema ]),
}).strict() ;

export const ConversationCreateManyArgsSchema: z.ZodType<Prisma.ConversationCreateManyArgs> = z.object({
  data: z.union([ ConversationCreateManyInputSchema,ConversationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ConversationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ConversationCreateManyAndReturnArgs> = z.object({
  data: z.union([ ConversationCreateManyInputSchema,ConversationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ConversationDeleteArgsSchema: z.ZodType<Prisma.ConversationDeleteArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  where: ConversationWhereUniqueInputSchema,
}).strict() ;

export const ConversationUpdateArgsSchema: z.ZodType<Prisma.ConversationUpdateArgs> = z.object({
  select: ConversationSelectSchema.optional(),
  include: ConversationIncludeSchema.optional(),
  data: z.union([ ConversationUpdateInputSchema,ConversationUncheckedUpdateInputSchema ]),
  where: ConversationWhereUniqueInputSchema,
}).strict() ;

export const ConversationUpdateManyArgsSchema: z.ZodType<Prisma.ConversationUpdateManyArgs> = z.object({
  data: z.union([ ConversationUpdateManyMutationInputSchema,ConversationUncheckedUpdateManyInputSchema ]),
  where: ConversationWhereInputSchema.optional(),
}).strict() ;

export const ConversationDeleteManyArgsSchema: z.ZodType<Prisma.ConversationDeleteManyArgs> = z.object({
  where: ConversationWhereInputSchema.optional(),
}).strict() ;

export const MessageCreateArgsSchema: z.ZodType<Prisma.MessageCreateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  data: z.union([ MessageCreateInputSchema,MessageUncheckedCreateInputSchema ]),
}).strict() ;

export const MessageUpsertArgsSchema: z.ZodType<Prisma.MessageUpsertArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
  create: z.union([ MessageCreateInputSchema,MessageUncheckedCreateInputSchema ]),
  update: z.union([ MessageUpdateInputSchema,MessageUncheckedUpdateInputSchema ]),
}).strict() ;

export const MessageCreateManyArgsSchema: z.ZodType<Prisma.MessageCreateManyArgs> = z.object({
  data: z.union([ MessageCreateManyInputSchema,MessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MessageCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MessageCreateManyAndReturnArgs> = z.object({
  data: z.union([ MessageCreateManyInputSchema,MessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MessageDeleteArgsSchema: z.ZodType<Prisma.MessageDeleteArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageUpdateArgsSchema: z.ZodType<Prisma.MessageUpdateArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  data: z.union([ MessageUpdateInputSchema,MessageUncheckedUpdateInputSchema ]),
  where: MessageWhereUniqueInputSchema,
}).strict() ;

export const MessageUpdateManyArgsSchema: z.ZodType<Prisma.MessageUpdateManyArgs> = z.object({
  data: z.union([ MessageUpdateManyMutationInputSchema,MessageUncheckedUpdateManyInputSchema ]),
  where: MessageWhereInputSchema.optional(),
}).strict() ;

export const MessageDeleteManyArgsSchema: z.ZodType<Prisma.MessageDeleteManyArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
}).strict() ;