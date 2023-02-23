import {Sequelize} from "sequelize";

export default (sequelize, DataTypes) => {
    const File = sequelize.define('file', {
        file_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        meta_data: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
    },{
        timestamps: true,
        underscored: true,
        tableName: 'file'
    });

    File.associate = (models) => {
        File.hasOne(models.Voice, { foreignKey: "file_id" });
    }

    return File;
};
