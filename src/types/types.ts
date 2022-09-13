import {PropertyDefinition} from '@loopback/repository';

export interface ITimeStampBaseEntity {
  createdOn?: Date;
  modifiedOn?: Date;
}

export interface ITimeStampBaseEntityConfig {
  createdOn?: Partial<PropertyDefinition>;
  modifiedOn?: Partial<PropertyDefinition>;
}

export type AbstractConstructor<T> = abstract new (...args: any[]) => T;
