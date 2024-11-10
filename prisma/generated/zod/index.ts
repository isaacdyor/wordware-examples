import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','userId','email','name','image','createdAt','updatedAt','activeSpaceId']);

export const SpaceScalarFieldEnumSchema = z.enum(['id','name','icon','createdAt','updatedAt','userId']);

export const ConversationScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt','archived','spaceId']);

export const MessageScalarFieldEnumSchema = z.enum(['id','content','createdAt','updatedAt','conversationId','role']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const MessageRoleSchema = z.enum(['USER','ASSISTANT']);

export type MessageRoleType = `${z.infer<typeof MessageRoleSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  userId: z.string(),
  email: z.string().nullable(),
  name: z.string().nullable(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  activeSpaceId: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SPACE SCHEMA
/////////////////////////////////////////

export const SpaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
})

export type Space = z.infer<typeof SpaceSchema>

/////////////////////////////////////////
// CONVERSATION SCHEMA
/////////////////////////////////////////

export const ConversationSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  archived: z.boolean(),
  spaceId: z.string(),
})

export type Conversation = z.infer<typeof ConversationSchema>

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
  role: MessageRoleSchema,
  id: z.string(),
  content: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  conversationId: z.string(),
})

export type Message = z.infer<typeof MessageSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  spaces: z.union([z.boolean(),z.lazy(() => SpaceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  spaces: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  image: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  activeSpaceId: z.boolean().optional(),
  spaces: z.union([z.boolean(),z.lazy(() => SpaceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SPACE
//------------------------------------------------------

export const SpaceIncludeSchema: z.ZodType<Prisma.SpaceInclude> = z.object({
  conversations: z.union([z.boolean(),z.lazy(() => ConversationFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SpaceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const SpaceArgsSchema: z.ZodType<Prisma.SpaceDefaultArgs> = z.object({
  select: z.lazy(() => SpaceSelectSchema).optional(),
  include: z.lazy(() => SpaceIncludeSchema).optional(),
}).strict();

export const SpaceCountOutputTypeArgsSchema: z.ZodType<Prisma.SpaceCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => SpaceCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SpaceCountOutputTypeSelectSchema: z.ZodType<Prisma.SpaceCountOutputTypeSelect> = z.object({
  conversations: z.boolean().optional(),
}).strict();

export const SpaceSelectSchema: z.ZodType<Prisma.SpaceSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  icon: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  conversations: z.union([z.boolean(),z.lazy(() => ConversationFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SpaceCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CONVERSATION
//------------------------------------------------------

export const ConversationIncludeSchema: z.ZodType<Prisma.ConversationInclude> = z.object({
  space: z.union([z.boolean(),z.lazy(() => SpaceArgsSchema)]).optional(),
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
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  archived: z.boolean().optional(),
  spaceId: z.boolean().optional(),
  space: z.union([z.boolean(),z.lazy(() => SpaceArgsSchema)]).optional(),
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

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  activeSpaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  spaces: z.lazy(() => SpaceListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  activeSpaceId: z.lazy(() => SortOrderSchema).optional(),
  spaces: z.lazy(() => SpaceOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    userId: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
    userId: z.string(),
  }),
  z.object({
    id: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    userId: z.string(),
    email: z.string(),
  }),
  z.object({
    userId: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  activeSpaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  spaces: z.lazy(() => SpaceListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  activeSpaceId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  activeSpaceId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SpaceWhereInputSchema: z.ZodType<Prisma.SpaceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpaceWhereInputSchema),z.lazy(() => SpaceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpaceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpaceWhereInputSchema),z.lazy(() => SpaceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  icon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  conversations: z.lazy(() => ConversationListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SpaceOrderByWithRelationInputSchema: z.ZodType<Prisma.SpaceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  conversations: z.lazy(() => ConversationOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SpaceWhereUniqueInputSchema: z.ZodType<Prisma.SpaceWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => SpaceWhereInputSchema),z.lazy(() => SpaceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpaceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpaceWhereInputSchema),z.lazy(() => SpaceWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  icon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  conversations: z.lazy(() => ConversationListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SpaceOrderByWithAggregationInputSchema: z.ZodType<Prisma.SpaceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SpaceCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SpaceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SpaceMinOrderByAggregateInputSchema).optional()
}).strict();

export const SpaceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SpaceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SpaceScalarWhereWithAggregatesInputSchema),z.lazy(() => SpaceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpaceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpaceScalarWhereWithAggregatesInputSchema),z.lazy(() => SpaceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  icon: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ConversationWhereInputSchema: z.ZodType<Prisma.ConversationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  archived: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  spaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  space: z.union([ z.lazy(() => SpaceRelationFilterSchema),z.lazy(() => SpaceWhereInputSchema) ]).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional()
}).strict();

export const ConversationOrderByWithRelationInputSchema: z.ZodType<Prisma.ConversationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  archived: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional(),
  space: z.lazy(() => SpaceOrderByWithRelationInputSchema).optional(),
  messages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ConversationWhereUniqueInputSchema: z.ZodType<Prisma.ConversationWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationWhereInputSchema),z.lazy(() => ConversationWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  archived: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  spaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  space: z.union([ z.lazy(() => SpaceRelationFilterSchema),z.lazy(() => SpaceWhereInputSchema) ]).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional()
}).strict());

export const ConversationOrderByWithAggregationInputSchema: z.ZodType<Prisma.ConversationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  archived: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ConversationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ConversationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ConversationMinOrderByAggregateInputSchema).optional()
}).strict();

export const ConversationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ConversationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema),z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema),z.lazy(() => ConversationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  archived: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  spaceId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const MessageWhereInputSchema: z.ZodType<Prisma.MessageWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
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
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageWhereInputSchema),z.lazy(() => MessageWhereInputSchema).array() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
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
  _max: z.lazy(() => MessageMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MessageMinOrderByAggregateInputSchema).optional()
}).strict();

export const MessageScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MessageScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MessageScalarWhereWithAggregatesInputSchema),z.lazy(() => MessageScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  conversationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumMessageRoleWithAggregatesFilterSchema),z.lazy(() => MessageRoleSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  activeSpaceId: z.string(),
  spaces: z.lazy(() => SpaceCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  activeSpaceId: z.string(),
  spaces: z.lazy(() => SpaceUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  activeSpaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spaces: z.lazy(() => SpaceUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  activeSpaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  spaces: z.lazy(() => SpaceUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  activeSpaceId: z.string()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  activeSpaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  activeSpaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpaceCreateInputSchema: z.ZodType<Prisma.SpaceCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  icon: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutSpaceInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSpacesInputSchema)
}).strict();

export const SpaceUncheckedCreateInputSchema: z.ZodType<Prisma.SpaceUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  icon: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutSpaceInputSchema).optional()
}).strict();

export const SpaceUpdateInputSchema: z.ZodType<Prisma.SpaceUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutSpaceNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSpacesNestedInputSchema).optional()
}).strict();

export const SpaceUncheckedUpdateInputSchema: z.ZodType<Prisma.SpaceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutSpaceNestedInputSchema).optional()
}).strict();

export const SpaceCreateManyInputSchema: z.ZodType<Prisma.SpaceCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  icon: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const SpaceUpdateManyMutationInputSchema: z.ZodType<Prisma.SpaceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpaceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SpaceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversationCreateInputSchema: z.ZodType<Prisma.ConversationCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  archived: z.boolean().optional(),
  space: z.lazy(() => SpaceCreateNestedOneWithoutConversationsInputSchema),
  messages: z.lazy(() => MessageCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationUncheckedCreateInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  archived: z.boolean().optional(),
  spaceId: z.string(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationUpdateInputSchema: z.ZodType<Prisma.ConversationUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  space: z.lazy(() => SpaceUpdateOneRequiredWithoutConversationsNestedInputSchema).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  spaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationCreateManyInputSchema: z.ZodType<Prisma.ConversationCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  archived: z.boolean().optional(),
  spaceId: z.string()
}).strict();

export const ConversationUpdateManyMutationInputSchema: z.ZodType<Prisma.ConversationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  spaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateInputSchema: z.ZodType<Prisma.MessageCreateInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => MessageRoleSchema),
  conversation: z.lazy(() => ConversationCreateNestedOneWithoutMessagesInputSchema)
}).strict();

export const MessageUncheckedCreateInputSchema: z.ZodType<Prisma.MessageUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  conversationId: z.string(),
  role: z.lazy(() => MessageRoleSchema)
}).strict();

export const MessageUpdateInputSchema: z.ZodType<Prisma.MessageUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => EnumMessageRoleFieldUpdateOperationsInputSchema) ]).optional(),
  conversation: z.lazy(() => ConversationUpdateOneRequiredWithoutMessagesNestedInputSchema).optional()
}).strict();

export const MessageUncheckedUpdateInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => EnumMessageRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateManyInputSchema: z.ZodType<Prisma.MessageCreateManyInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  conversationId: z.string(),
  role: z.lazy(() => MessageRoleSchema)
}).strict();

export const MessageUpdateManyMutationInputSchema: z.ZodType<Prisma.MessageUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => EnumMessageRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  conversationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => EnumMessageRoleFieldUpdateOperationsInputSchema) ]).optional(),
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

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
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

export const SpaceListRelationFilterSchema: z.ZodType<Prisma.SpaceListRelationFilter> = z.object({
  every: z.lazy(() => SpaceWhereInputSchema).optional(),
  some: z.lazy(() => SpaceWhereInputSchema).optional(),
  none: z.lazy(() => SpaceWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const SpaceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SpaceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  activeSpaceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  activeSpaceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  activeSpaceId: z.lazy(() => SortOrderSchema).optional()
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

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
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

export const ConversationListRelationFilterSchema: z.ZodType<Prisma.ConversationListRelationFilter> = z.object({
  every: z.lazy(() => ConversationWhereInputSchema).optional(),
  some: z.lazy(() => ConversationWhereInputSchema).optional(),
  none: z.lazy(() => ConversationWhereInputSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const ConversationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ConversationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpaceCountOrderByAggregateInputSchema: z.ZodType<Prisma.SpaceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpaceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SpaceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SpaceMinOrderByAggregateInputSchema: z.ZodType<Prisma.SpaceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  icon: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const SpaceRelationFilterSchema: z.ZodType<Prisma.SpaceRelationFilter> = z.object({
  is: z.lazy(() => SpaceWhereInputSchema).optional(),
  isNot: z.lazy(() => SpaceWhereInputSchema).optional()
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
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  archived: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  archived: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ConversationMinOrderByAggregateInputSchema: z.ZodType<Prisma.ConversationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  archived: z.lazy(() => SortOrderSchema).optional(),
  spaceId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
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

export const EnumMessageRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMessageRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MessageRoleSchema).optional(),
  in: z.lazy(() => MessageRoleSchema).array().optional(),
  notIn: z.lazy(() => MessageRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => NestedEnumMessageRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMessageRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMessageRoleFilterSchema).optional()
}).strict();

export const SpaceCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SpaceCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SpaceCreateWithoutUserInputSchema),z.lazy(() => SpaceCreateWithoutUserInputSchema).array(),z.lazy(() => SpaceUncheckedCreateWithoutUserInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpaceCreateOrConnectWithoutUserInputSchema),z.lazy(() => SpaceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpaceCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SpaceUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SpaceUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SpaceCreateWithoutUserInputSchema),z.lazy(() => SpaceCreateWithoutUserInputSchema).array(),z.lazy(() => SpaceUncheckedCreateWithoutUserInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpaceCreateOrConnectWithoutUserInputSchema),z.lazy(() => SpaceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpaceCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const SpaceUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SpaceUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpaceCreateWithoutUserInputSchema),z.lazy(() => SpaceCreateWithoutUserInputSchema).array(),z.lazy(() => SpaceUncheckedCreateWithoutUserInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpaceCreateOrConnectWithoutUserInputSchema),z.lazy(() => SpaceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpaceUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SpaceUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpaceCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpaceUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SpaceUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpaceUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SpaceUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpaceScalarWhereInputSchema),z.lazy(() => SpaceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpaceUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SpaceUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpaceCreateWithoutUserInputSchema),z.lazy(() => SpaceCreateWithoutUserInputSchema).array(),z.lazy(() => SpaceUncheckedCreateWithoutUserInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SpaceCreateOrConnectWithoutUserInputSchema),z.lazy(() => SpaceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SpaceUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SpaceUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SpaceCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SpaceWhereUniqueInputSchema),z.lazy(() => SpaceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SpaceUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SpaceUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SpaceUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SpaceUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SpaceScalarWhereInputSchema),z.lazy(() => SpaceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ConversationCreateNestedManyWithoutSpaceInputSchema: z.ZodType<Prisma.ConversationCreateNestedManyWithoutSpaceInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutSpaceInputSchema),z.lazy(() => ConversationCreateWithoutSpaceInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutSpaceInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutSpaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutSpaceInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutSpaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManySpaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSpacesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSpacesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSpacesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpacesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSpacesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ConversationUncheckedCreateNestedManyWithoutSpaceInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateNestedManyWithoutSpaceInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutSpaceInputSchema),z.lazy(() => ConversationCreateWithoutSpaceInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutSpaceInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutSpaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutSpaceInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutSpaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManySpaceInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ConversationUpdateManyWithoutSpaceNestedInputSchema: z.ZodType<Prisma.ConversationUpdateManyWithoutSpaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutSpaceInputSchema),z.lazy(() => ConversationCreateWithoutSpaceInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutSpaceInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutSpaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutSpaceInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutSpaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConversationUpsertWithWhereUniqueWithoutSpaceInputSchema),z.lazy(() => ConversationUpsertWithWhereUniqueWithoutSpaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManySpaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateWithWhereUniqueWithoutSpaceInputSchema),z.lazy(() => ConversationUpdateWithWhereUniqueWithoutSpaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConversationUpdateManyWithWhereWithoutSpaceInputSchema),z.lazy(() => ConversationUpdateManyWithWhereWithoutSpaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConversationScalarWhereInputSchema),z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutSpacesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSpacesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSpacesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpacesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSpacesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSpacesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSpacesInputSchema),z.lazy(() => UserUpdateWithoutSpacesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpacesInputSchema) ]).optional(),
}).strict();

export const ConversationUncheckedUpdateManyWithoutSpaceNestedInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyWithoutSpaceNestedInput> = z.object({
  create: z.union([ z.lazy(() => ConversationCreateWithoutSpaceInputSchema),z.lazy(() => ConversationCreateWithoutSpaceInputSchema).array(),z.lazy(() => ConversationUncheckedCreateWithoutSpaceInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutSpaceInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ConversationCreateOrConnectWithoutSpaceInputSchema),z.lazy(() => ConversationCreateOrConnectWithoutSpaceInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ConversationUpsertWithWhereUniqueWithoutSpaceInputSchema),z.lazy(() => ConversationUpsertWithWhereUniqueWithoutSpaceInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ConversationCreateManySpaceInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ConversationWhereUniqueInputSchema),z.lazy(() => ConversationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ConversationUpdateWithWhereUniqueWithoutSpaceInputSchema),z.lazy(() => ConversationUpdateWithWhereUniqueWithoutSpaceInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ConversationUpdateManyWithWhereWithoutSpaceInputSchema),z.lazy(() => ConversationUpdateManyWithWhereWithoutSpaceInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ConversationScalarWhereInputSchema),z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SpaceCreateNestedOneWithoutConversationsInputSchema: z.ZodType<Prisma.SpaceCreateNestedOneWithoutConversationsInput> = z.object({
  create: z.union([ z.lazy(() => SpaceCreateWithoutConversationsInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutConversationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpaceCreateOrConnectWithoutConversationsInputSchema).optional(),
  connect: z.lazy(() => SpaceWhereUniqueInputSchema).optional()
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

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const SpaceUpdateOneRequiredWithoutConversationsNestedInputSchema: z.ZodType<Prisma.SpaceUpdateOneRequiredWithoutConversationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => SpaceCreateWithoutConversationsInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutConversationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SpaceCreateOrConnectWithoutConversationsInputSchema).optional(),
  upsert: z.lazy(() => SpaceUpsertWithoutConversationsInputSchema).optional(),
  connect: z.lazy(() => SpaceWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SpaceUpdateToOneWithWhereWithoutConversationsInputSchema),z.lazy(() => SpaceUpdateWithoutConversationsInputSchema),z.lazy(() => SpaceUncheckedUpdateWithoutConversationsInputSchema) ]).optional(),
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

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
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

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
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

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
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

export const SpaceCreateWithoutUserInputSchema: z.ZodType<Prisma.SpaceCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  icon: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  conversations: z.lazy(() => ConversationCreateNestedManyWithoutSpaceInputSchema).optional()
}).strict();

export const SpaceUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SpaceUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  icon: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  conversations: z.lazy(() => ConversationUncheckedCreateNestedManyWithoutSpaceInputSchema).optional()
}).strict();

export const SpaceCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SpaceCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SpaceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpaceCreateWithoutUserInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SpaceCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SpaceCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SpaceCreateManyUserInputSchema),z.lazy(() => SpaceCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SpaceUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SpaceUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SpaceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SpaceUpdateWithoutUserInputSchema),z.lazy(() => SpaceUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SpaceCreateWithoutUserInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SpaceUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SpaceUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SpaceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SpaceUpdateWithoutUserInputSchema),z.lazy(() => SpaceUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SpaceUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SpaceUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SpaceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SpaceUpdateManyMutationInputSchema),z.lazy(() => SpaceUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SpaceScalarWhereInputSchema: z.ZodType<Prisma.SpaceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SpaceScalarWhereInputSchema),z.lazy(() => SpaceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SpaceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SpaceScalarWhereInputSchema),z.lazy(() => SpaceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  icon: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ConversationCreateWithoutSpaceInputSchema: z.ZodType<Prisma.ConversationCreateWithoutSpaceInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  archived: z.boolean().optional(),
  messages: z.lazy(() => MessageCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationUncheckedCreateWithoutSpaceInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateWithoutSpaceInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  archived: z.boolean().optional(),
  messages: z.lazy(() => MessageUncheckedCreateNestedManyWithoutConversationInputSchema).optional()
}).strict();

export const ConversationCreateOrConnectWithoutSpaceInputSchema: z.ZodType<Prisma.ConversationCreateOrConnectWithoutSpaceInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ConversationCreateWithoutSpaceInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutSpaceInputSchema) ]),
}).strict();

export const ConversationCreateManySpaceInputEnvelopeSchema: z.ZodType<Prisma.ConversationCreateManySpaceInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ConversationCreateManySpaceInputSchema),z.lazy(() => ConversationCreateManySpaceInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutSpacesInputSchema: z.ZodType<Prisma.UserCreateWithoutSpacesInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  activeSpaceId: z.string()
}).strict();

export const UserUncheckedCreateWithoutSpacesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSpacesInput> = z.object({
  id: z.string().optional(),
  userId: z.string(),
  email: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  activeSpaceId: z.string()
}).strict();

export const UserCreateOrConnectWithoutSpacesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSpacesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSpacesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpacesInputSchema) ]),
}).strict();

export const ConversationUpsertWithWhereUniqueWithoutSpaceInputSchema: z.ZodType<Prisma.ConversationUpsertWithWhereUniqueWithoutSpaceInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ConversationUpdateWithoutSpaceInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutSpaceInputSchema) ]),
  create: z.union([ z.lazy(() => ConversationCreateWithoutSpaceInputSchema),z.lazy(() => ConversationUncheckedCreateWithoutSpaceInputSchema) ]),
}).strict();

export const ConversationUpdateWithWhereUniqueWithoutSpaceInputSchema: z.ZodType<Prisma.ConversationUpdateWithWhereUniqueWithoutSpaceInput> = z.object({
  where: z.lazy(() => ConversationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ConversationUpdateWithoutSpaceInputSchema),z.lazy(() => ConversationUncheckedUpdateWithoutSpaceInputSchema) ]),
}).strict();

export const ConversationUpdateManyWithWhereWithoutSpaceInputSchema: z.ZodType<Prisma.ConversationUpdateManyWithWhereWithoutSpaceInput> = z.object({
  where: z.lazy(() => ConversationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ConversationUpdateManyMutationInputSchema),z.lazy(() => ConversationUncheckedUpdateManyWithoutSpaceInputSchema) ]),
}).strict();

export const ConversationScalarWhereInputSchema: z.ZodType<Prisma.ConversationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ConversationScalarWhereInputSchema),z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ConversationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ConversationScalarWhereInputSchema),z.lazy(() => ConversationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  archived: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  spaceId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserUpsertWithoutSpacesInputSchema: z.ZodType<Prisma.UserUpsertWithoutSpacesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSpacesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpacesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSpacesInputSchema),z.lazy(() => UserUncheckedCreateWithoutSpacesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSpacesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSpacesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSpacesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSpacesInputSchema) ]),
}).strict();

export const UserUpdateWithoutSpacesInputSchema: z.ZodType<Prisma.UserUpdateWithoutSpacesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  activeSpaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutSpacesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSpacesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  activeSpaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpaceCreateWithoutConversationsInputSchema: z.ZodType<Prisma.SpaceCreateWithoutConversationsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  icon: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSpacesInputSchema)
}).strict();

export const SpaceUncheckedCreateWithoutConversationsInputSchema: z.ZodType<Prisma.SpaceUncheckedCreateWithoutConversationsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  icon: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export const SpaceCreateOrConnectWithoutConversationsInputSchema: z.ZodType<Prisma.SpaceCreateOrConnectWithoutConversationsInput> = z.object({
  where: z.lazy(() => SpaceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SpaceCreateWithoutConversationsInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutConversationsInputSchema) ]),
}).strict();

export const MessageCreateWithoutConversationInputSchema: z.ZodType<Prisma.MessageCreateWithoutConversationInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => MessageRoleSchema)
}).strict();

export const MessageUncheckedCreateWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutConversationInput> = z.object({
  id: z.string().optional(),
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

export const SpaceUpsertWithoutConversationsInputSchema: z.ZodType<Prisma.SpaceUpsertWithoutConversationsInput> = z.object({
  update: z.union([ z.lazy(() => SpaceUpdateWithoutConversationsInputSchema),z.lazy(() => SpaceUncheckedUpdateWithoutConversationsInputSchema) ]),
  create: z.union([ z.lazy(() => SpaceCreateWithoutConversationsInputSchema),z.lazy(() => SpaceUncheckedCreateWithoutConversationsInputSchema) ]),
  where: z.lazy(() => SpaceWhereInputSchema).optional()
}).strict();

export const SpaceUpdateToOneWithWhereWithoutConversationsInputSchema: z.ZodType<Prisma.SpaceUpdateToOneWithWhereWithoutConversationsInput> = z.object({
  where: z.lazy(() => SpaceWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SpaceUpdateWithoutConversationsInputSchema),z.lazy(() => SpaceUncheckedUpdateWithoutConversationsInputSchema) ]),
}).strict();

export const SpaceUpdateWithoutConversationsInputSchema: z.ZodType<Prisma.SpaceUpdateWithoutConversationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSpacesNestedInputSchema).optional()
}).strict();

export const SpaceUncheckedUpdateWithoutConversationsInputSchema: z.ZodType<Prisma.SpaceUncheckedUpdateWithoutConversationsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  conversationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumMessageRoleFilterSchema),z.lazy(() => MessageRoleSchema) ]).optional(),
}).strict();

export const ConversationCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationCreateWithoutMessagesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  archived: z.boolean().optional(),
  space: z.lazy(() => SpaceCreateNestedOneWithoutConversationsInputSchema)
}).strict();

export const ConversationUncheckedCreateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUncheckedCreateWithoutMessagesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  archived: z.boolean().optional(),
  spaceId: z.string()
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
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  space: z.lazy(() => SpaceUpdateOneRequiredWithoutConversationsNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  spaceId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SpaceCreateManyUserInputSchema: z.ZodType<Prisma.SpaceCreateManyUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  icon: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SpaceUpdateWithoutUserInputSchema: z.ZodType<Prisma.SpaceUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  conversations: z.lazy(() => ConversationUpdateManyWithoutSpaceNestedInputSchema).optional()
}).strict();

export const SpaceUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SpaceUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  conversations: z.lazy(() => ConversationUncheckedUpdateManyWithoutSpaceNestedInputSchema).optional()
}).strict();

export const SpaceUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SpaceUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  icon: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ConversationCreateManySpaceInputSchema: z.ZodType<Prisma.ConversationCreateManySpaceInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  archived: z.boolean().optional()
}).strict();

export const ConversationUpdateWithoutSpaceInputSchema: z.ZodType<Prisma.ConversationUpdateWithoutSpaceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateWithoutSpaceInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateWithoutSpaceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  messages: z.lazy(() => MessageUncheckedUpdateManyWithoutConversationNestedInputSchema).optional()
}).strict();

export const ConversationUncheckedUpdateManyWithoutSpaceInputSchema: z.ZodType<Prisma.ConversationUncheckedUpdateManyWithoutSpaceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  archived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageCreateManyConversationInputSchema: z.ZodType<Prisma.MessageCreateManyConversationInput> = z.object({
  id: z.string().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => MessageRoleSchema)
}).strict();

export const MessageUpdateWithoutConversationInputSchema: z.ZodType<Prisma.MessageUpdateWithoutConversationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => EnumMessageRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateWithoutConversationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => EnumMessageRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MessageUncheckedUpdateManyWithoutConversationInputSchema: z.ZodType<Prisma.MessageUncheckedUpdateManyWithoutConversationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MessageRoleSchema),z.lazy(() => EnumMessageRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const SpaceFindFirstArgsSchema: z.ZodType<Prisma.SpaceFindFirstArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  where: SpaceWhereInputSchema.optional(),
  orderBy: z.union([ SpaceOrderByWithRelationInputSchema.array(),SpaceOrderByWithRelationInputSchema ]).optional(),
  cursor: SpaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpaceScalarFieldEnumSchema,SpaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpaceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SpaceFindFirstOrThrowArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  where: SpaceWhereInputSchema.optional(),
  orderBy: z.union([ SpaceOrderByWithRelationInputSchema.array(),SpaceOrderByWithRelationInputSchema ]).optional(),
  cursor: SpaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpaceScalarFieldEnumSchema,SpaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpaceFindManyArgsSchema: z.ZodType<Prisma.SpaceFindManyArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  where: SpaceWhereInputSchema.optional(),
  orderBy: z.union([ SpaceOrderByWithRelationInputSchema.array(),SpaceOrderByWithRelationInputSchema ]).optional(),
  cursor: SpaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SpaceScalarFieldEnumSchema,SpaceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SpaceAggregateArgsSchema: z.ZodType<Prisma.SpaceAggregateArgs> = z.object({
  where: SpaceWhereInputSchema.optional(),
  orderBy: z.union([ SpaceOrderByWithRelationInputSchema.array(),SpaceOrderByWithRelationInputSchema ]).optional(),
  cursor: SpaceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SpaceGroupByArgsSchema: z.ZodType<Prisma.SpaceGroupByArgs> = z.object({
  where: SpaceWhereInputSchema.optional(),
  orderBy: z.union([ SpaceOrderByWithAggregationInputSchema.array(),SpaceOrderByWithAggregationInputSchema ]).optional(),
  by: SpaceScalarFieldEnumSchema.array(),
  having: SpaceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SpaceFindUniqueArgsSchema: z.ZodType<Prisma.SpaceFindUniqueArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  where: SpaceWhereUniqueInputSchema,
}).strict() ;

export const SpaceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SpaceFindUniqueOrThrowArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  where: SpaceWhereUniqueInputSchema,
}).strict() ;

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

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const SpaceCreateArgsSchema: z.ZodType<Prisma.SpaceCreateArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  data: z.union([ SpaceCreateInputSchema,SpaceUncheckedCreateInputSchema ]),
}).strict() ;

export const SpaceUpsertArgsSchema: z.ZodType<Prisma.SpaceUpsertArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  where: SpaceWhereUniqueInputSchema,
  create: z.union([ SpaceCreateInputSchema,SpaceUncheckedCreateInputSchema ]),
  update: z.union([ SpaceUpdateInputSchema,SpaceUncheckedUpdateInputSchema ]),
}).strict() ;

export const SpaceCreateManyArgsSchema: z.ZodType<Prisma.SpaceCreateManyArgs> = z.object({
  data: z.union([ SpaceCreateManyInputSchema,SpaceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SpaceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SpaceCreateManyAndReturnArgs> = z.object({
  data: z.union([ SpaceCreateManyInputSchema,SpaceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SpaceDeleteArgsSchema: z.ZodType<Prisma.SpaceDeleteArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  where: SpaceWhereUniqueInputSchema,
}).strict() ;

export const SpaceUpdateArgsSchema: z.ZodType<Prisma.SpaceUpdateArgs> = z.object({
  select: SpaceSelectSchema.optional(),
  include: SpaceIncludeSchema.optional(),
  data: z.union([ SpaceUpdateInputSchema,SpaceUncheckedUpdateInputSchema ]),
  where: SpaceWhereUniqueInputSchema,
}).strict() ;

export const SpaceUpdateManyArgsSchema: z.ZodType<Prisma.SpaceUpdateManyArgs> = z.object({
  data: z.union([ SpaceUpdateManyMutationInputSchema,SpaceUncheckedUpdateManyInputSchema ]),
  where: SpaceWhereInputSchema.optional(),
}).strict() ;

export const SpaceDeleteManyArgsSchema: z.ZodType<Prisma.SpaceDeleteManyArgs> = z.object({
  where: SpaceWhereInputSchema.optional(),
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