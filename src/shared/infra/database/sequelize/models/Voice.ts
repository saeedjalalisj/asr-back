import {Sequelize} from "sequelize";

export default (sequelize, DataTypes) => {
    const Voice = sequelize.define('voice', {
        voice_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        file_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'file',
                key: 'file_id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        status: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    },{
        timestamps: true,
        underscored: true,
        tableName: 'voice',
        indexes: [
            { fields: ['title'] },
        ]
    });

    Voice.associate = (models) => {
        Voice.belongsTo(models.User, { foreignKey: "user_id", targetKey: 'user_id', as: 'User' })
        Voice.hasOne(models.Result, { foreignKey: "voice_id" });
        Voice.belongsTo(models.File, { foreignKey: "file_id" })
    }

    return Voice;
};
