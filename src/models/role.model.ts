import {Entity, hasMany, model, property} from '@loopback/repository';
import {Roles} from '../enum';
import {User} from './user.model';

@model({name: 'role', settings: {strict: false}})
export class Role extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
    jsonSchema: {
      enum: Object.values(Roles),
    },
    name: 'id',
  })
  key: Roles;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.keys(Roles),
    },
    name: 'role_name',
  })
  name: Roles;

  @hasMany(() => User, {keyTo: 'role'})
  users: User[];
  // @hasMany(() => User, {keyTo: 'role'})
  // users?: User[];

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
