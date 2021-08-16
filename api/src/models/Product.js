const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    size: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    brand:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El SKU no puede estar vacio",
        },
      },
      unique: {
        args: true,
        msg: "Ese SKU ya está registrado",
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category:{
      type: DataTypes.STRING,
    },
    stock:{
      type: DataTypes.INTEGER,
      defaultValue: 1000
    }
  });
};
