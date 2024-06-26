import Sequelize, { Model } from "sequelize";

class Careers extends Model {
  static init(sequelize) {
    super.init(
      {
        career_id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        title: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        job_description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        requirements: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        is_active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        created_at: {
          type: Sequelize.BIGINT,
          defaultValue: new Date().getTime(),
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.BIGINT,
          defaultValue: null,
        },
      },
      {
        sequelize,
        modelName: "Careers",
        tableName: "careers",
        createdAt: false,
        updatedAt: false,
        underscored: true,
        defaultScope: {
          order: [["created_at", "DESC"]],
        },
      }
    );

    return this;
  }

  static associate(models) {}
}

export default Careers;
