const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	}
);

const File = sequelize.define(
	'File',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
		},
		file: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		fileType: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		data: DataTypes.BLOB('long'),
	},
	{
		timestamps: true,
	}
);

User.hasMany(File, { foreignKey: 'userId' });
File.belongsTo(User, { foreignKey: 'userId' });

module.exports = {User, File};
