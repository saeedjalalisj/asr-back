import {Sequelize} from "sequelize";

export default (sequelize, DataTypes) => {
    const Result = sequelize.define('result', {
        result_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        voice_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'voice',
                key: 'voice_id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
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
        tableName: 'result',
    });

    Result.associate = (models) => {
        Result.belongsTo(models.Voice, { foreignKey: "voice_id" })
    }

    return Result;
};
