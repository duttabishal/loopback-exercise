import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Customer extends Entity {
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
  name: string;

  @property({
    type: 'string',
  })
  website?: string;

  @property({
    type: 'string',
  })
  address?: string;

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

  @belongsTo(() => User, {keyTo: 'id'}, {name: 'user_id'})
  userId?: number;

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;

// export class Customer extends TimeStampEntityMixin(CustomerBase) {}
