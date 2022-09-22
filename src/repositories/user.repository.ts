import {Constructor, Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {UserDbDataSource} from '../datasources';
import {TimeStampRepositoryMixin} from '../mixin/time-stamp.repository.mixin';
import {Role, User, UserRelations} from '../models';
import {CustomerRepository} from './customer.repository';
import {RoleRepository} from './role.repository';

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
  public readonly role: BelongsToAccessor<Role, typeof User.prototype.id>;
  // public readonly role: BelongsToAccessor<Role, typeof User.prototype.id>;
  // public readonly customer: HasOneRepositoryFactory<
  //   Customer,
  //   typeof User.prototype.id
  // >;
  constructor(
    @inject('datasources.UserDb') dataSource: UserDbDataSource,
    @repository.getter('RoleRepository')
    protected roleRepositoryGetter: Getter<RoleRepository>,
    @repository.getter('CustomerRepository')
    protected customerRepositoryGetter: Getter<CustomerRepository>,
  ) {
    super(User, dataSource);
    this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter);
    this.registerInclusionResolver('role', this.role.inclusionResolver);
    // this.role = this.createBelongsToAccessorFor('role', roleRepositoryGetter);
    // this.registerInclusionResolver('role', this.role.inclusionResolver);
    // this.customer = this.createHasOneRepositoryFactoryFor(
    //   'customer',
    //   customerRepositoryGetter,
    // );
    // this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
