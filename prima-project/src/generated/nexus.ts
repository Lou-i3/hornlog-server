/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
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
  UserCreateInput: { // input type
    email: string; // String!
    name?: string | null; // String
  }
  UserUniqueInput: { // input type
    email?: string | null; // String
    id?: number | null; // Int
  }
}

export interface NexusGenEnums {
  Role: "ADMIN" | "MODERATOR" | "USER"
  SortOrder: "asc" | "desc"
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
  Mutation: {};
  Query: {};
  User: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    displayName?: string | null; // String
    email: string; // String!
    id: string; // ID!
    lastLogin: NexusGenScalars['DateTime']; // DateTime!
    password: string; // String!
    resetPasswordToken: string; // String!
    role: NexusGenEnums['Role']; // Role!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
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
  Mutation: { // field return type
    addUser: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    login: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    signupUser: NexusGenRootTypes['User']; // User!
  }
  Query: { // field return type
    allUsers: NexusGenRootTypes['User'][]; // [User!]!
    me: NexusGenRootTypes['User'] | null; // User
    ok: string | null; // String
  }
  User: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    displayName: string | null; // String
    email: string; // String!
    id: string; // ID!
    lastLogin: NexusGenScalars['DateTime']; // DateTime!
    password: string; // String!
    resetPasswordToken: string; // String!
    role: NexusGenEnums['Role']; // Role!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Mutation: { // field return type name
    addUser: 'AuthPayload'
    login: 'AuthPayload'
    signupUser: 'User'
  }
  Query: { // field return type name
    allUsers: 'User'
    me: 'User'
    ok: 'String'
  }
  User: { // field return type name
    createdAt: 'DateTime'
    displayName: 'String'
    email: 'String'
    id: 'ID'
    lastLogin: 'DateTime'
    password: 'String'
    resetPasswordToken: 'String'
    role: 'Role'
    updatedAt: 'DateTime'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addUser: { // args
      displayName: string; // String!
      email: string; // String!
      password?: string | null; // String
      username: string; // String!
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
  context: Context;
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