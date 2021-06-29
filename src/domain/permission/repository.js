class PermissionRepository {
  constructor(knex) {
    this.database = knex;
    this.columns = ['id', 'name', 'displayName', 'description', 'createdAt', 'updatedAt'];
  }

  async findForRole(roleId) {
    return this.database('permissionRole')
      .select(this.columns)
      .where({ roleId })
      .leftOuterJoin('permissions', 'permissionRole.permissionId', 'permissions.id');
  }
}

export default PermissionRepository;
