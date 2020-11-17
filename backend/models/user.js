module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define("users", {
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email: {
            type: DataTypes.STRING
          },
          password: {
            type: DataTypes.STRING
          }
    
        
    });

    User.associate = models =>{
        User.hasMany(models.reviews,{
            onDelete: "cascade"
        });
    
           
            User.belongsToMany(models.roles, { through: 'user_roles' });
           
    };

    return User;
};