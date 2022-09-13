import {Constructor} from '@loopback/core';
import {Entity, property} from '@loopback/repository';
import {AbstractConstructor, ITimeStampBaseEntityConfig} from '../types';

export function TimeStampEntityMixin<
  E extends Entity,
  S extends Constructor<E> | AbstractConstructor<E>,
>(baseEntity: S, config?: ITimeStampBaseEntityConfig) {
  class TimeStampEntity extends baseEntity {
    @property({
      type: 'date',
      default: () => new Date(),
      ...(config?.createdOn ?? {}),
    })
    public createdOn?: Date;

    @property({
      type: 'date',
      default: () => new Date(),
      ...(config?.modifiedOn ?? {}),
    })
    modifiedOn?: Date;
  }
  return TimeStampEntity;
}
