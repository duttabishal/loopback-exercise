import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Roles} from '../enum';
import {Role} from './role.model';

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
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

  // @belongsTo(() => Role, {keyFrom: 'key'})
  // role: Roles;
  @property({
    type: 'string',
  })
  address?: string;

  @belongsTo(() => Role, {name: 'role'})
  roleId: Roles;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  public createdOn?: Date;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  modifiedOn?: Date;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;

// @model({settings: {strict: false}})
// export class User extends TimeStampEntityMixin(UserBase) {}
