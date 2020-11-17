module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("roles", {
      name: {
        type: DataTypes.STRING
      }
    });
    Role.associate = models =>{
    Role.belongsToMany(models.users, { through: 'user_roles' });
    };
    return Role;
  };