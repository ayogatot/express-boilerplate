"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("pages", [
      {
        page_id: "a0ddbe7f-cd0c-46ef-9c95-184980f7d2ac",
        parent_page_id: null,
        page: "PRODUCT",
        section: "HERO",
        title: "Our Products",
        subtitle: "Smart Packaging Choices",
        description:
          "Check out our practical and eco-friendly packaging solutions! Explore the latest products, customer favorites, and innovations that set the standard. Upgrade your packaging experience with us!",
        sequence: 1,
        last_updated_by: null,
        created_at: 1714493300387,
        updated_at: null,
      },
      {
        page_id: "6baec89e-4c9d-4ea3-8668-b3f2773052fe",
        parent_page_id: null,
        page: "PRODUCT",
        section: "PRODUCT",
        title: "Bottles",
        subtitle: null,
        description:
          "To be the leading strategic plastic packaging solutions provider in Indonesia",
        sequence: 2,
        last_updated_by: null,
        created_at: 1714493300387,
        updated_at: null,
      },
      {
        page_id: "4d85f66a-81c2-4369-b3cc-86e073df0deb",
        parent_page_id: null,
        page: "PRODUCT",
        section: "PRODUCT",
        title: "Caps & Closures",
        subtitle: null,
        description:
          "To be the leading strategic plastic packaging solutions provider in Indonesia",
        sequence: 3,
        last_updated_by: null,
        created_at: 1714493300387,
        updated_at: null,
      },
      {
        page_id: "8e858983-9494-4405-a3aa-724e0d3b909b",
        parent_page_id: null,
        page: "PRODUCT",
        section: "PRODUCT",
        title: "Jars",
        subtitle: null,
        description:
          "To be the leading strategic plastic packaging solutions provider in Indonesia",
        sequence: 4,
        last_updated_by: null,
        created_at: 1714493300387,
        updated_at: null,
      },
      {
        page_id: "6040290b-e7a0-4c39-8e78-ef88295aab1d",
        parent_page_id: null,
        page: "PRODUCT",
        section: "PRODUCT",
        title: "Jerry Cans",
        subtitle: null,
        description:
          "To be the leading strategic plastic packaging solutions provider in Indonesia",
        sequence: 5,
        last_updated_by: null,
        created_at: 1714493300387,
        updated_at: null,
      },
      {
        page_id: "312ba431-eb5f-467b-860b-0ef8c7f0e252",
        parent_page_id: null,
        page: "PRODUCT",
        section: "PRODUCT",
        title: "Preforms",
        subtitle: null,
        description:
          "To be the leading strategic plastic packaging solutions provider in Indonesia",
        sequence: 6,
        last_updated_by: null,
        created_at: 1714493300387,
        updated_at: null,
      },
      {
        page_id: "230ca4a8-99f0-4d67-b62e-a57cbbdb0904",
        parent_page_id: null,
        page: "PRODUCT",
        section: "PRODUCT",
        title: "Cups",
        subtitle: null,
        description:
          "To be the leading strategic plastic packaging solutions provider in Indonesia",
        sequence: 7,
        last_updated_by: null,
        created_at: 1714493300387,
        updated_at: null,
      },
      {
        page_id: "795aac38-9ba0-401d-953c-8a158c69ebdf",
        parent_page_id: null,
        page: "PRODUCT",
        section: "LAST",
        title: "Need a product?",
        subtitle: null,
        description:
          "Find the perfect plastic product packaging solutions for your business",
        sequence: 8,
        last_updated_by: null,
        created_at: 1714493300387,
        updated_at: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("pages", null, {});
  },
};
