import {Entity, model, property} from '@loopback/repository';
import {TimeStampEntityMixin} from '../mixin/time-stamp.entity.mixin';

export class UserBase extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
  })
  middleName?: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'number',
    required: true,
  })
  role: number;

  @property({
    type: 'string',
  })
  address?: string;

  // @property({
  //   type: 'date',
  //   default: () => new Date(),
  // })
  // createdOn?: date;

  // @property({
  //   type: 'date',
  //   default: () => new Date(),
  // })
  // modifiedOn?: date;

  constructor(data?: Partial<UserBase>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = UserBase & UserRelations;

@model({settings: {strict: false}})
export class User extends TimeStampEntityMixin(UserBase) {}
