"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("applicants", {
      applicant_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      career_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'careers',
          key: 'career_id'
        }
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("applicants");
  },
};
