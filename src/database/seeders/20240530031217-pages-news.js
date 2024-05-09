"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("pages", [
      {
        page_id: "c32917c8-8ad0-4a07-ac66-904e7351fba7",
        parent_page_id: null,
        page: "NEWS",
        section: "HERO",
        title: "Latest hasil Raya News",
        subtitle: "Green Solutions News",
        description:
          "Discover how our plastic packaging company is making a positive impact! Get quick updates on eco-friendly innovations, success stories, and the latest trends in sustainable packaging. Join us in creating a greener future together!",
        sequence: 1,
        last_updated_by: null,
        created_at: 1715270185735,
        updated_at: null,
      },
      {
        page_id: "89760015-2c62-4359-a68f-71726da00289",
        parent_page_id: null,
        page: "NEWS",
        section: "NEWSLETTER",
        title: "Join Our Newsletter",
        subtitle: null,
        description:
          "Join Our Plastic Packaging Revolution: Stay Informed with Our Newsletter!",
        sequence: 2,
        last_updated_by: null,
        created_at: 1715271884979,
        updated_at: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("pages", null, {});
  },
};
