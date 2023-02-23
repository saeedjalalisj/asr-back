import runner from "../runner"

export default {
    up: async (queryInterface, Sequelize) => {
        const CREATE_BASE_USER = () => {
            return queryInterface.createTable('user', {
                user_id: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true
                },
                user_email: {
                    type: Sequelize.STRING(250),
                    allowNull: false,
                    unique: true
                },
                is_email_verified: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                username: {
                    type: Sequelize.STRING(250),
                    allowNull: false
                },
                user_password: {
                    type: Sequelize.STRING,
                    allowNull: true,
                    defaultValue: null
                },
                is_admin_user: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                is_deleted: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                }
            })
        }

        const CREATE_VOICE = () => (
            queryInterface.createTable('voice', {
                voice_id: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true
                },
                user_id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: 'user',
                        key: 'user_id'
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade',
                },
                file_id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: 'file',
                        key: 'file_id'
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade',
                },
                status: {
                    type: Sequelize.STRING(30),
                    allowNull: false
                },
                title: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                }
            })
        )

        const CREATE_RESULT = () => (
            queryInterface.createTable('result', {
                result_id: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true
                },
                text: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },
                gender: {
                    type: Sequelize.TEXT,
                    allowNull: true
                },
                voice_id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: 'voice',
                        key: 'voice_id'
                    },
                    onDelete: 'cascade',
                    onUpdate: 'cascade',
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                }
            })
        );
        const CREATE_FILES = () => {
            queryInterface.createTable('file', {
                file_id: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    primaryKey: true
                },
                path: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                meta_data: {
                    type: Sequelize.JSONB,
                    allowNull: true,
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
                }
            })
        }

        await runner.run([
            () => CREATE_BASE_USER(),
            () => CREATE_FILES(),
            () => CREATE_VOICE(),
            () => CREATE_RESULT(),
        ])
    },
    // eslint-disable @typescript-eslint/no-unused-vars
    down: (queryInterface, Sequelize) => {
        return runner.run([
            () => queryInterface.dropTable('user'),
            () => queryInterface.dropTable('result'),
            () => queryInterface.dropTable('file'),
            () => queryInterface.dropTable('voice'),
        ])
    }
};
