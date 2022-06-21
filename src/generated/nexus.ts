/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ContactInfoCreateInput: { // input type
    designation?: string | null; // String
    info?: string | null; // String
    type: NexusGenEnums['ContactType']; // ContactType!
  }
  ContactInfoDeleteInput: { // input type
    id: number; // Int!
  }
  ContactInfoUpdateInput: { // input type
    designation?: string | null; // String
    id: number; // Int!
    info?: string | null; // String
    type: NexusGenEnums['ContactType']; // ContactType!
  }
  GenderInput: { // input type
    label: string; // String!
  }
  HookCreateInput: { // input type
    addToAppleHealth?: boolean | null; // Boolean
    additionalPartners?: Array<NexusGenInputs['PartnerToHookInput'] | null> | null; // [PartnerToHookInput]
    archived?: boolean | null; // Boolean
    dateTime?: NexusGenScalars['DateTime'] | null; // DateTime
    duration?: number | null; // Int
    grade?: number | null; // Int
    hookType: NexusGenEnums['HookType']; // HookType!
    mood?: string | null; // String
    newPartners?: Array<NexusGenInputs['NewPartnerToHookInput'] | null> | null; // [NewPartnerToHookInput]
    note?: string | null; // String
    orgasm?: boolean | null; // Boolean
    porn?: boolean | null; // Boolean
    protected?: NexusGenEnums['ProtectionType'] | null; // ProtectionType
  }
  HookUpdateInput: { // input type
    addToAppleHealth?: boolean | null; // Boolean
    additionalPartners?: Array<NexusGenInputs['PartnerToHookInput'] | null> | null; // [PartnerToHookInput]
    archived?: boolean | null; // Boolean
    dateTime?: NexusGenScalars['DateTime'] | null; // DateTime
    duration?: number | null; // Int
    grade?: number | null; // Int
    hookType: NexusGenEnums['HookType']; // HookType!
    id: number; // Int!
    mood?: string | null; // String
    newPartners?: Array<NexusGenInputs['NewPartnerToHookInput'] | null> | null; // [NewPartnerToHookInput]
    note?: string | null; // String
    orgasm?: boolean | null; // Boolean
    porn?: boolean | null; // Boolean
    protected?: NexusGenEnums['ProtectionType'] | null; // ProtectionType
    removedPartners?: Array<NexusGenInputs['PartnerToHookInput'] | null> | null; // [PartnerToHookInput]
  }
  NewPartnerToHookInput: { // input type
    nickName: string; // String!
  }
  PartnerCreateInput: { // input type
    birthday?: NexusGenScalars['DateTime'] | null; // DateTime
    firstName?: string | null; // String
    genderId: number; // Int!
    how?: string | null; // String
    lastName?: string | null; // String
    nationality?: string | null; // String
    newContactInfos?: Array<NexusGenInputs['ContactInfoCreateInput'] | null> | null; // [ContactInfoCreateInput]
    nickName?: string | null; // String
    notes?: string | null; // String
    picture?: string | null; // String
    sexPosition?: NexusGenEnums['SexPosition'] | null; // SexPosition
    sexuality?: NexusGenEnums['Sexuality'] | null; // Sexuality
  }
  PartnerToHookInput: { // input type
    id: number; // Int!
  }
  PartnerUpdateInput: { // input type
    birthday?: NexusGenScalars['DateTime'] | null; // DateTime
    deletedContactInfos?: Array<NexusGenInputs['ContactInfoDeleteInput'] | null> | null; // [ContactInfoDeleteInput]
    firstName?: string | null; // String
    genderId?: number | null; // Int
    how?: string | null; // String
    id: number; // Int!
    lastName?: string | null; // String
    nationality?: string | null; // String
    newContactInfos?: Array<NexusGenInputs['ContactInfoCreateInput'] | null> | null; // [ContactInfoCreateInput]
    nickName?: string | null; // String
    notes?: string | null; // String
    picture?: string | null; // String
    sexPosition?: NexusGenEnums['SexPosition'] | null; // SexPosition
    sexuality?: NexusGenEnums['Sexuality'] | null; // Sexuality
    updatedContactInfos?: Array<NexusGenInputs['ContactInfoUpdateInput'] | null> | null; // [ContactInfoUpdateInput]
  }
  UserCreateInput: { // input type
    email: string; // String!
    name?: string | null; // String
  }
  UserUniqueInput: { // input type
    email?: string | null; // String
    id?: number | null; // Int
    username?: string | null; // String
  }
}

export interface NexusGenEnums {
  ContactType: "Email" | "Phone" | "social_media"
  HookType: "Date" | "Friend" | "Sexting" | "one_night_stand" | "self_pleasure" | "sex_friend"
  LocationType: "my_place" | "other" | "your_place"
  ProtectionType: "Protected" | "Unprotected" | "not_required"
  Role: "ADMIN" | "MODERATOR" | "USER"
  SexPosition: "bottom" | "top" | "vers_bottom" | "vers_top" | "versa"
  Sexuality: "Bi" | "Gay" | "Straight"
  SortOrder: "asc" | "desc"
  darkModeChoice: "Dark" | "Light"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  ContactInfo: { // root type
    designation?: string | null; // String
    id: string; // ID!
    info?: string | null; // String
    type: NexusGenEnums['ContactType']; // ContactType!
  }
  Gender: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    label: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Hook: { // root type
    addToAppleHealth?: boolean | null; // Boolean
    archived?: boolean | null; // Boolean
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    dateTime: NexusGenScalars['DateTime']; // DateTime!
    duration?: number | null; // Int
    grade?: number | null; // Int
    hookType: NexusGenEnums['HookType']; // HookType!
    id: string; // ID!
    mood?: string | null; // String
    note?: string | null; // String
    orgasm?: boolean | null; // Boolean
    porn?: boolean | null; // Boolean
    protected?: NexusGenEnums['ProtectionType'] | null; // ProtectionType
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  HooksOnPartners: { // root type
    assignedAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
  }
  Location: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    type?: NexusGenEnums['LocationType'] | null; // LocationType
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: {};
  Partner: { // root type
    id: string; // ID!
  }
  Person: { // root type
    birthday?: NexusGenScalars['DateTime'] | null; // DateTime
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    firstName?: string | null; // String
    how?: string | null; // String
    id: string; // ID!
    lastName?: string | null; // String
    nationality?: string | null; // String
    nickName?: string | null; // String
    notes?: string | null; // String
    picture?: string | null; // String
    sexPosition?: NexusGenEnums['SexPosition'] | null; // SexPosition
    sexuality?: NexusGenEnums['Sexuality'] | null; // Sexuality
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Query: {};
  User: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    displayName?: string | null; // String
    email: string; // String!
    id: string; // ID!
    lastLoginAt: NexusGenScalars['DateTime']; // DateTime!
    password: string; // String!
    resetPasswordToken: string; // String!
    role: NexusGenEnums['Role']; // Role!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
  }
  UserSettings: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  ContactInfo: { // field return type
    designation: string | null; // String
    id: string; // ID!
    info: string | null; // String
    person: NexusGenRootTypes['Person']; // Person!
    type: NexusGenEnums['ContactType']; // ContactType!
  }
  Gender: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    hasPeople: boolean | null; // Boolean
    id: string; // ID!
    label: string; // String!
    owner: NexusGenRootTypes['User'] | null; // User
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Hook: { // field return type
    addToAppleHealth: boolean | null; // Boolean
    archived: boolean | null; // Boolean
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    dateTime: NexusGenScalars['DateTime']; // DateTime!
    duration: number | null; // Int
    grade: number | null; // Int
    hookType: NexusGenEnums['HookType']; // HookType!
    id: string; // ID!
    location: NexusGenRootTypes['Location'] | null; // Location
    mood: string | null; // String
    note: string | null; // String
    orgasm: boolean | null; // Boolean
    owner: NexusGenRootTypes['User']; // User!
    partners: Array<NexusGenRootTypes['Partner'] | null> | null; // [Partner]
    porn: boolean | null; // Boolean
    protected: NexusGenEnums['ProtectionType'] | null; // ProtectionType
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  HooksOnPartners: { // field return type
    assignedAt: NexusGenScalars['DateTime']; // DateTime!
    hook: NexusGenRootTypes['Hook']; // Hook!
    id: string; // ID!
    partner: NexusGenRootTypes['Partner']; // Partner!
  }
  Location: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    owner: NexusGenRootTypes['User']; // User!
    person: NexusGenRootTypes['Person']; // Person!
    type: NexusGenEnums['LocationType'] | null; // LocationType
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: { // field return type
    addAppGender: NexusGenRootTypes['Gender']; // Gender!
    addHook: NexusGenRootTypes['Hook']; // Hook!
    addPartner: NexusGenRootTypes['Partner']; // Partner!
    addUser: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    addUserGender: NexusGenRootTypes['Gender']; // Gender!
    deleteGender: NexusGenRootTypes['Gender']; // Gender!
    editGender: NexusGenRootTypes['Gender']; // Gender!
    editHook: NexusGenRootTypes['Hook']; // Hook!
    editPartner: NexusGenRootTypes['Partner']; // Partner!
    login: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    signupUser: NexusGenRootTypes['User']; // User!
  }
  Partner: { // field return type
    hooks: Array<NexusGenRootTypes['Hook'] | null> | null; // [Hook]
    id: string; // ID!
    owner: NexusGenRootTypes['User']; // User!
    person: NexusGenRootTypes['Person']; // Person!
  }
  Person: { // field return type
    birthday: NexusGenScalars['DateTime'] | null; // DateTime
    contactInfos: Array<NexusGenRootTypes['ContactInfo'] | null> | null; // [ContactInfo]
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    firstName: string | null; // String
    gender: NexusGenRootTypes['Gender'] | null; // Gender
    how: string | null; // String
    id: string; // ID!
    lastName: string | null; // String
    locations: NexusGenRootTypes['Location'] | null; // Location
    nationality: string | null; // String
    nickName: string | null; // String
    notes: string | null; // String
    owner: NexusGenRootTypes['User']; // User!
    picture: string | null; // String
    sexPosition: NexusGenEnums['SexPosition'] | null; // SexPosition
    sexuality: NexusGenEnums['Sexuality'] | null; // Sexuality
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Query: { // field return type
    accessibleGenders: Array<NexusGenRootTypes['Gender'] | null> | null; // [Gender]
    allHooks: Array<NexusGenRootTypes['Hook'] | null> | null; // [Hook]
    allUsers: NexusGenRootTypes['User'][]; // [User!]!
    appGenders: Array<NexusGenRootTypes['Gender'] | null> | null; // [Gender]
    me: NexusGenRootTypes['User'] | null; // User
    myGenders: Array<NexusGenRootTypes['Gender'] | null> | null; // [Gender]
    myHooks: Array<NexusGenRootTypes['Hook'] | null> | null; // [Hook]
    myPartners: Array<NexusGenRootTypes['Partner'] | null> | null; // [Partner]
    ok: string | null; // String
  }
  User: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    displayName: string | null; // String
    email: string; // String!
    genders: Array<NexusGenRootTypes['Gender'] | null> | null; // [Gender]
    hooks: Array<NexusGenRootTypes['Hook'] | null> | null; // [Hook]
    id: string; // ID!
    lastLoginAt: NexusGenScalars['DateTime']; // DateTime!
    locations: Array<NexusGenRootTypes['Location'] | null> | null; // [Location]
    partners: Array<NexusGenRootTypes['Partner'] | null> | null; // [Partner]
    password: string; // String!
    resetPasswordToken: string; // String!
    role: NexusGenEnums['Role']; // Role!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
  }
  UserSettings: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // ID!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    user: NexusGenRootTypes['User']; // User!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  ContactInfo: { // field return type name
    designation: 'String'
    id: 'ID'
    info: 'String'
    person: 'Person'
    type: 'ContactType'
  }
  Gender: { // field return type name
    createdAt: 'DateTime'
    hasPeople: 'Boolean'
    id: 'ID'
    label: 'String'
    owner: 'User'
    updatedAt: 'DateTime'
  }
  Hook: { // field return type name
    addToAppleHealth: 'Boolean'
    archived: 'Boolean'
    createdAt: 'DateTime'
    dateTime: 'DateTime'
    duration: 'Int'
    grade: 'Int'
    hookType: 'HookType'
    id: 'ID'
    location: 'Location'
    mood: 'String'
    note: 'String'
    orgasm: 'Boolean'
    owner: 'User'
    partners: 'Partner'
    porn: 'Boolean'
    protected: 'ProtectionType'
    updatedAt: 'DateTime'
  }
  HooksOnPartners: { // field return type name
    assignedAt: 'DateTime'
    hook: 'Hook'
    id: 'ID'
    partner: 'Partner'
  }
  Location: { // field return type name
    createdAt: 'DateTime'
    id: 'ID'
    owner: 'User'
    person: 'Person'
    type: 'LocationType'
    updatedAt: 'DateTime'
  }
  Mutation: { // field return type name
    addAppGender: 'Gender'
    addHook: 'Hook'
    addPartner: 'Partner'
    addUser: 'AuthPayload'
    addUserGender: 'Gender'
    deleteGender: 'Gender'
    editGender: 'Gender'
    editHook: 'Hook'
    editPartner: 'Partner'
    login: 'AuthPayload'
    signupUser: 'User'
  }
  Partner: { // field return type name
    hooks: 'Hook'
    id: 'ID'
    owner: 'User'
    person: 'Person'
  }
  Person: { // field return type name
    birthday: 'DateTime'
    contactInfos: 'ContactInfo'
    createdAt: 'DateTime'
    firstName: 'String'
    gender: 'Gender'
    how: 'String'
    id: 'ID'
    lastName: 'String'
    locations: 'Location'
    nationality: 'String'
    nickName: 'String'
    notes: 'String'
    owner: 'User'
    picture: 'String'
    sexPosition: 'SexPosition'
    sexuality: 'Sexuality'
    updatedAt: 'DateTime'
  }
  Query: { // field return type name
    accessibleGenders: 'Gender'
    allHooks: 'Hook'
    allUsers: 'User'
    appGenders: 'Gender'
    me: 'User'
    myGenders: 'Gender'
    myHooks: 'Hook'
    myPartners: 'Partner'
    ok: 'String'
  }
  User: { // field return type name
    createdAt: 'DateTime'
    displayName: 'String'
    email: 'String'
    genders: 'Gender'
    hooks: 'Hook'
    id: 'ID'
    lastLoginAt: 'DateTime'
    locations: 'Location'
    partners: 'Partner'
    password: 'String'
    resetPasswordToken: 'String'
    role: 'Role'
    updatedAt: 'DateTime'
    username: 'String'
  }
  UserSettings: { // field return type name
    createdAt: 'DateTime'
    id: 'ID'
    updatedAt: 'DateTime'
    user: 'User'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addAppGender: { // args
      data: NexusGenInputs['GenderInput']; // GenderInput!
    }
    addHook: { // args
      data: NexusGenInputs['HookCreateInput']; // HookCreateInput!
    }
    addPartner: { // args
      data: NexusGenInputs['PartnerCreateInput']; // PartnerCreateInput!
    }
    addUser: { // args
      displayName: string; // String!
      email: string; // String!
      password?: string | null; // String
      username: string; // String!
    }
    addUserGender: { // args
      data: NexusGenInputs['GenderInput']; // GenderInput!
    }
    deleteGender: { // args
      id: number; // Int!
    }
    editGender: { // args
      data: NexusGenInputs['GenderInput']; // GenderInput!
      id: number; // Int!
    }
    editHook: { // args
      data: NexusGenInputs['HookUpdateInput']; // HookUpdateInput!
    }
    editPartner: { // args
      data: NexusGenInputs['PartnerUpdateInput']; // PartnerUpdateInput!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    signupUser: { // args
      data: NexusGenInputs['UserCreateInput']; // UserCreateInput!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}