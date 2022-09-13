import {Constructor} from '@loopback/core';
import {
  Count,
  DataObject,
  DefaultCrudRepository,
  Entity,
  Options,
  Where,
} from '@loopback/repository';
import {AbstractConstructor, ITimeStampBaseEntity} from '../types';
// const DEFAULT_UPDATE_KEY = 'modifiedOn'
// const DEFAULT_CREATE_KEY = 'createdOn'
// type ITimeStampMixinOptions = {
//   updateKey: string;
//   createKey: string;
// }
// interface TimeStampEntity extends Entity {
//   createdOn: Date;
//   modifiedOn: Date;
//   [KEY: string | number | symbol]: any;
// }

export function TimeStampRepositoryMixin<
  // M extends Entity,
  M extends Entity & ITimeStampBaseEntity,
  // R extends MixinTarget<CrudRepository<M>>,
  R extends
    | Constructor<DefaultCrudRepository<M, ID, T>>
    | AbstractConstructor<DefaultCrudRepository<M, ID, T>>,
  // R extends MixinTarget<DefaultCrudRepository<M, ID, T>>,
  ID,
  T extends object = {},
>(
  repository: R,
  //   , options: ITimeStampMixinOptions = {
  //   updateKey : DEFAULT_UPDATE_KEY,
  //   createKey: DEFAULT_CREATE_KEY
  // }
) {
  // const {
  //   updateKey,
  //   createKey
  // } = options
  return class extends repository {
    create(entity: DataObject<M>, options?: Options): Promise<M> {
      entity.createdOn = new Date();
      entity.modifiedOn = new Date();
      return super.create(entity, options);
    }
    createAll(dataObjects: DataObject<M>[], options?: Options): Promise<M[]> {
      const modifiedDataObjects = dataObjects.map(elem => {
        elem.createdOn = new Date();
        elem.modifiedOn = new Date();
        return elem;
      });
      return super.createAll(modifiedDataObjects, options);
    }

    updateAll(
      data: DataObject<M>,
      where?: Where<M>,
      options?: Options,
    ): Promise<Count> {
      data.modifiedOn = new Date();
      return super.updateAll(data, where, options);
    }

    updateById(id: ID, data: DataObject<M>, options?: Options): Promise<void> {
      data.modifiedOn = new Date();
      return super.updateById(id, data, options);
    }

    replaceById(id: ID, data: DataObject<M>, options?: Options): Promise<void> {
      data.modifiedOn = new Date();
      return super.replaceById(id, data, options);
    }
  };
}
