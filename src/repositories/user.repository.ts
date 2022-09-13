import {Constructor, inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserDbDataSource} from '../datasources';
import {TimeStampRepositoryMixin} from '../mixin/time-stamp.repository.mixin';
import {User, UserRelations} from '../models';

// export class UserRepository extends TimeStampRepositoryMixin(
//   DefaultCrudRepository<User, typeof User.prototype.id>,
// ) {
export class UserRepository extends TimeStampRepositoryMixin<
  User,
  Constructor<
    DefaultCrudRepository<User, typeof User.prototype.id, UserRelations>
  >,
  typeof User.prototype.id,
  UserRelations
>(DefaultCrudRepository) {
  constructor(@inject('datasources.UserDb') dataSource: UserDbDataSource) {
    super(User, dataSource);
  }
}
