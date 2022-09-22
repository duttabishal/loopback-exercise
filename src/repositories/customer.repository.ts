import {Constructor, Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {UserDbDataSource} from '../datasources';
import {TimeStampRepositoryMixin} from '../mixin/time-stamp.repository.mixin';
import {Customer, CustomerRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class CustomerRepository extends TimeStampRepositoryMixin<
  Customer,
  Constructor<
    DefaultCrudRepository<
      Customer,
      typeof Customer.prototype.id,
      CustomerRelations
    >
  >,
  typeof Customer.prototype.id,
  CustomerRelations
>(DefaultCrudRepository) {
  public readonly user: BelongsToAccessor<User, typeof Customer.prototype.id>;
  constructor(
    @inject('datasources.UserDb') dataSource: UserDbDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Customer, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
