import Sequelize, { Model } from "sequelize";

class Applicants extends Model {
  static init(sequelize) {
    super.init(
      {
        applicant_id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        career_id: {
          type: Sequelize.UUID,
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        first_name: {
          type: Sequelize.STRING(64),
          allowNull: false,
        },
        last_name: {
          type: Sequelize.STRING(64),
          allowNull: false,
        },
        phone_number: {
          type: Sequelize.STRING(16),
          allowNull: false,
        },
        message: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        cv: {
          type: Sequelize.STRING(42),
          allowNull: true,
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
        modelName: "Applicants",
        tableName: "applicants",
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

  static associate(models) {
    this.belongsTo(models.Careers, { foreignKey: "career_id", as: "career_detail" });
  }
}

export default Applicants;
