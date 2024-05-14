import Sequelize, { Model } from "sequelize";

class Newsletters extends Model {
  static init(sequelize) {
    super.init(
      {
        newsletter_id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        email: {
          type: Sequelize.STRING(128),
          allowNull: false,
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
        modelName: "Newsletters",
        tableName: "newsletters",
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

export default Newsletters;
