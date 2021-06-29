class RoleRepository {
  constructor(knex) {
    this.database = knex;
    this.columns = ['id', 'name', 'displayName', 'description', 'createdAt', 'updatedAt'];
  }

  async findForAccountId(userId) {
    return this.database('roleUser')
      .select(this.columns)
      .where({ userId })
      .leftOuterJoin('roles', 'roleUser.roleId', 'roles.id');
  }
}

export default RoleRepository;
