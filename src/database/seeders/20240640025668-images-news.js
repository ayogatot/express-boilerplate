"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("images", [
      {
        image_id: "3280ef03-af48-457c-9314-77e3cbd238f6",
        page_id: "c32917c8-8ad0-4a07-ac66-904e7351fba7",
        filename: "e06a80d2-7619-4c75-be53-8fd3d49b12f5.png",
        created_at: 1714613304490,
        updated_at: null,
      },
      {
        image_id: "3bfe0151-56ce-4d32-b7f1-4564288266ba",
        page_id: "89760015-2c62-4359-a68f-71726da00289",
        filename: "582f2558-6d33-4799-81c1-40d05c259511.png",
        created_at: 1714613304490,
        updated_at: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("images", null, {});
  },
};
