module.exports = (sequelize,DataTypes) => {
    const Review = sequelize.define("reviews",{
        reviews:{
            type: DataTypes.STRING,
            allowNull:false
        },
        rating:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        approve:{
            type: DataTypes.BOOLEAN,
            allowNull:true
        },
        username:{
            type: DataTypes.STRING,
            allowNull:false
        }
    });

    Review.associate = models =>{
        Review.belongsTo(models.users,{
            foreignKey:{
                allowNull:false
            }
        });
    };
    return Review;
}