
export default (sequelize, DataTypes) => {
    const File = sequelize.define('file', {
        file_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
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
            defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
        },
    },{
        timestamps: true,
        underscored: true,
        tableName: 'file'
    });

    File.associate = (models) => {
        File.belongsTo(models.Voice, { foreignKey: "voice_id" });
    }

    return File;
};
