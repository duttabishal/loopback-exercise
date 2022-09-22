import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository} from '@loopback/repository';
import {UserDbDataSource} from '../datasources';
import {Role, RoleRelations} from '../models';
import {UserRepository} from './user.repository';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.key,
  RoleRelations
> {
  // public readonly users: HasManyRepositoryFactory<
  //   User,
  //   typeof Role.prototype.key
  // >;

  constructor(
    @inject('datasources.UserDb') dataSource: UserDbDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Role, dataSource);
    // this.users = this.createHasManyRepositoryFactoryFor(
    //   'users',
    //   userRepositoryGetter,
    // );
    // this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
