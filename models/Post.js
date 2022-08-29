
module.exports = (sequelize, DataTypes)=>{
    const Post = sequelize.define('Post', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull :false,
      },
      judul_postingan: {
      type: DataTypes.STRING,
      allowNull :false,
      },
      jenis: {
        type: DataTypes.STRING,
        allowNull :false,
      },
      postingan: {
        type: DataTypes.TEXT,
      },
      foto: {
        type: DataTypes.STRING,
        allowNull :false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull :false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull :false,
      }
    },{
        tableName: 'posts'
    } );
    return Post;
}


