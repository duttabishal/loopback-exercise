import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Roles} from '../enum';
import {Role} from './role.model';

@model({name: 'user', settings: {strict: false}})
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
    name: 'first_name',
  })
  firstName: string;

  @property({
    type: 'string',
    name: 'middle_name',
  })
  middleName?: string;

  @property({
    type: 'string',
    required: true,
    name: 'last_name',
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

  @belongsTo(() => Role, {name: 'role'}, {name: 'role_id'})
  roleId: Roles;

  @property({
    type: 'date',
    default: () => new Date(),
    name: 'created_at',
  })
  public createdOn?: Date;

  @property({
    type: 'date',
    default: () => new Date(),
    name: 'updated_at',
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
