
 
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
      nama: {
      type: DataTypes.STRING,
      allowNull :false,
      },
      kd_hewan: {
        type: DataTypes.STRING(11),
        allowNull :false,
      },
      daerah: {
        type: DataTypes.STRING,
        allowNull :false,
      },
      lokasimap: {
        type: DataTypes.STRING,
        allowNull :false,
      },
      tgl_hilang: {
        type: DataTypes.DATE,
        allowNull :false,
      },
      jenis: {
        type: DataTypes.STRING,
        allowNull :false,
      },
      kelamin: {
        type: DataTypes.STRING(11),
        allowNull :false,
      },
      informasi: {
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