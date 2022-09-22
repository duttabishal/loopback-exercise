import {Entity, model, property, hasMany} from '@loopback/repository';
import {Roles} from '../enum';
import {User} from './user.model';

@model()
export class Role extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
    jsonSchema: {
      enum: Object.values(Roles),
    },
  })
  key: Roles;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.keys(Roles),
    },
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
