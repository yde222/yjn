import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','userId','empNo','name','password','createdAt','updatedAt']);

export const ProjectScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const ProjectUserScalarFieldEnumSchema = z.enum(['id','userId','projectId','roleId','createdAt','updatedAt']);

export const ResourceScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const ProjectRoleScalarFieldEnumSchema = z.enum(['id','name','projectId','createdAt','updatedAt']);

export const ProjectTaskScalarFieldEnumSchema = z.enum(['id','name','projectId','createdAt','updatedAt']);

export const ProjectTaskStatusScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const ProjectTaskTransitionScalarFieldEnumSchema = z.enum(['id','fromId','toId','createdAt','updatedAt']);

export const AuthorizationScalarFieldEnumSchema = z.enum(['id','userId','roleId','resourceUri','read','write','delete','update','createdAt','updatedAt']);

export const CodeEntityScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt','projectId']);

export const CodeAttributeScalarFieldEnumSchema = z.enum(['id','name','dataType','isRequired','isArray','createdAt','updatedAt']);

export const CodeValueScalarFieldEnumSchema = z.enum(['id','value','codeAttributeId','codeEntityId','createdAt','updatedAt']);

export const CommonUserScalarFieldEnumSchema = z.enum(['userId','userName','nickname','companyCode','companyName','departmentCode','departmentName','authority','projects']);

export const CommonProjectScalarFieldEnumSchema = z.enum(['pjtUid','pjtNo','pjtNm','pjtMngRId','rpnDepCd','pgsStatCd','staYmd','endYmd','isTplEnabled','isSubGrpEnabled','isDeleted','creator','createdDate','lastModifiedUser','lastModifiedDate']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  userId: z.string(),
  empNo: z.string(),
  name: z.string().nullish(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial()

export type UserPartial = z.infer<typeof UserPartialSchema>

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Project = z.infer<typeof ProjectSchema>

/////////////////////////////////////////
// PROJECT PARTIAL SCHEMA
/////////////////////////////////////////

export const ProjectPartialSchema = ProjectSchema.partial()

export type ProjectPartial = z.infer<typeof ProjectPartialSchema>

/////////////////////////////////////////
// PROJECT USER SCHEMA
/////////////////////////////////////////

export const ProjectUserSchema = z.object({
  id: z.string(),
  userId: z.string(),
  projectId: z.string(),
  roleId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ProjectUser = z.infer<typeof ProjectUserSchema>

/////////////////////////////////////////
// PROJECT USER PARTIAL SCHEMA
/////////////////////////////////////////

export const ProjectUserPartialSchema = ProjectUserSchema.partial()

export type ProjectUserPartial = z.infer<typeof ProjectUserPartialSchema>

/////////////////////////////////////////
// RESOURCE SCHEMA
/////////////////////////////////////////

export const ResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Resource = z.infer<typeof ResourceSchema>

/////////////////////////////////////////
// RESOURCE PARTIAL SCHEMA
/////////////////////////////////////////

export const ResourcePartialSchema = ResourceSchema.partial()

export type ResourcePartial = z.infer<typeof ResourcePartialSchema>

/////////////////////////////////////////
// PROJECT ROLE SCHEMA
/////////////////////////////////////////

export const ProjectRoleSchema = z.object({
  id: z.string(),
  name: z.string(),
  projectId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ProjectRole = z.infer<typeof ProjectRoleSchema>

/////////////////////////////////////////
// PROJECT ROLE PARTIAL SCHEMA
/////////////////////////////////////////

export const ProjectRolePartialSchema = ProjectRoleSchema.partial()

export type ProjectRolePartial = z.infer<typeof ProjectRolePartialSchema>

/////////////////////////////////////////
// PROJECT TASK SCHEMA
/////////////////////////////////////////

export const ProjectTaskSchema = z.object({
  id: z.string(),
  name: z.string(),
  projectId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ProjectTask = z.infer<typeof ProjectTaskSchema>

/////////////////////////////////////////
// PROJECT TASK PARTIAL SCHEMA
/////////////////////////////////////////

export const ProjectTaskPartialSchema = ProjectTaskSchema.partial()

export type ProjectTaskPartial = z.infer<typeof ProjectTaskPartialSchema>

/////////////////////////////////////////
// PROJECT TASK STATUS SCHEMA
/////////////////////////////////////////

export const ProjectTaskStatusSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ProjectTaskStatus = z.infer<typeof ProjectTaskStatusSchema>

/////////////////////////////////////////
// PROJECT TASK STATUS PARTIAL SCHEMA
/////////////////////////////////////////

export const ProjectTaskStatusPartialSchema = ProjectTaskStatusSchema.partial()

export type ProjectTaskStatusPartial = z.infer<typeof ProjectTaskStatusPartialSchema>

/////////////////////////////////////////
// PROJECT TASK TRANSITION SCHEMA
/////////////////////////////////////////

export const ProjectTaskTransitionSchema = z.object({
  id: z.string(),
  fromId: z.string(),
  toId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ProjectTaskTransition = z.infer<typeof ProjectTaskTransitionSchema>

/////////////////////////////////////////
// PROJECT TASK TRANSITION PARTIAL SCHEMA
/////////////////////////////////////////

export const ProjectTaskTransitionPartialSchema = ProjectTaskTransitionSchema.partial()

export type ProjectTaskTransitionPartial = z.infer<typeof ProjectTaskTransitionPartialSchema>

/////////////////////////////////////////
// AUTHORIZATION SCHEMA
/////////////////////////////////////////

export const AuthorizationSchema = z.object({
  id: z.string(),
  userId: z.string().nullish(),
  roleId: z.string().nullish(),
  resourceUri: z.string(),
  read: z.boolean(),
  write: z.boolean(),
  delete: z.boolean(),
  update: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Authorization = z.infer<typeof AuthorizationSchema>

/////////////////////////////////////////
// AUTHORIZATION PARTIAL SCHEMA
/////////////////////////////////////////

export const AuthorizationPartialSchema = AuthorizationSchema.partial()

export type AuthorizationPartial = z.infer<typeof AuthorizationPartialSchema>

/////////////////////////////////////////
// CODE ENTITY SCHEMA
/////////////////////////////////////////

export const CodeEntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  projectId: z.string().nullish(),
})

export type CodeEntity = z.infer<typeof CodeEntitySchema>

/////////////////////////////////////////
// CODE ENTITY PARTIAL SCHEMA
/////////////////////////////////////////

export const CodeEntityPartialSchema = CodeEntitySchema.partial()

export type CodeEntityPartial = z.infer<typeof CodeEntityPartialSchema>

/////////////////////////////////////////
// CODE ATTRIBUTE SCHEMA
/////////////////////////////////////////

export const CodeAttributeSchema = z.object({
  id: z.string(),
  name: z.string(),
  dataType: z.string(),
  isRequired: z.boolean(),
  isArray: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type CodeAttribute = z.infer<typeof CodeAttributeSchema>

/////////////////////////////////////////
// CODE ATTRIBUTE PARTIAL SCHEMA
/////////////////////////////////////////

export const CodeAttributePartialSchema = CodeAttributeSchema.partial()

export type CodeAttributePartial = z.infer<typeof CodeAttributePartialSchema>

/////////////////////////////////////////
// CODE VALUE SCHEMA
/////////////////////////////////////////

export const CodeValueSchema = z.object({
  id: z.string(),
  value: z.string(),
  codeAttributeId: z.string(),
  codeEntityId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type CodeValue = z.infer<typeof CodeValueSchema>

/////////////////////////////////////////
// CODE VALUE PARTIAL SCHEMA
/////////////////////////////////////////

export const CodeValuePartialSchema = CodeValueSchema.partial()

export type CodeValuePartial = z.infer<typeof CodeValuePartialSchema>

/////////////////////////////////////////
// COMMON USER SCHEMA
/////////////////////////////////////////

export const CommonUserSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  nickname: z.string(),
  companyCode: z.string(),
  companyName: z.string(),
  departmentCode: z.string(),
  departmentName: z.string(),
  authority: z.string(),
  projects: z.string(),
})

export type CommonUser = z.infer<typeof CommonUserSchema>

/////////////////////////////////////////
// COMMON USER PARTIAL SCHEMA
/////////////////////////////////////////

export const CommonUserPartialSchema = CommonUserSchema.partial()

export type CommonUserPartial = z.infer<typeof CommonUserPartialSchema>

/////////////////////////////////////////
// COMMON PROJECT SCHEMA
/////////////////////////////////////////

export const CommonProjectSchema = z.object({
  pjtUid: z.number(),
  pjtNo: z.string(),
  pjtNm: z.string(),
  pjtMngRId: z.string(),
  rpnDepCd: z.string(),
  pgsStatCd: z.string(),
  staYmd: z.string(),
  endYmd: z.string(),
  isTplEnabled: z.boolean(),
  isSubGrpEnabled: z.boolean(),
  isDeleted: z.boolean(),
  creator: z.number().nullish(),
  createdDate: z.coerce.date(),
  lastModifiedUser: z.number().nullish(),
  lastModifiedDate: z.coerce.date(),
})

export type CommonProject = z.infer<typeof CommonProjectSchema>

/////////////////////////////////////////
// COMMON PROJECT PARTIAL SCHEMA
/////////////////////////////////////////

export const CommonProjectPartialSchema = CommonProjectSchema.partial()

export type CommonProjectPartial = z.infer<typeof CommonProjectPartialSchema>
