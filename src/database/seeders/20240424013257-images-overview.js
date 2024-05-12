"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("images", [
      {
        image_id: "c5045e1e-218c-4900-ad47-cdcddb449f35",
        page_id: "b330121b-213d-4d07-bef5-fc89f54c580d",
        filename: "55023c4d-98e1-4ddf-9b0c-ebec380aef8e.png",
        created_at: 1714486624860,
        updated_at: null,
      },
      {
        image_id: "91f924a1-46db-45a4-89b4-cf2cf02578aa",
        page_id: "d0592304-eeec-4604-9a45-397e559a2ba4",
        filename: "3199ac03-53b8-4a70-ad32-253f77a72a8b.png",
        created_at: 1714486670521,
        updated_at: null,
      },
      {
        image_id: "f2bf5809-5225-4696-bbff-b163b8b0b620",
        page_id: "c1438683-4179-4a6a-9ed8-e3461f34936b",
        filename: "063c383f-4d19-4f9a-a5b1-fad19e24e949.png",
        created_at: 1714486931496,
        updated_at: null,
      },
      {
        image_id: "725c0e09-a813-4957-abbd-7ce0e945cfe1",
        page_id: "02fb31a3-9d16-4f3c-9dac-3d8a73edf6ad",
        filename: "004143f1-2811-4005-b56f-fafb7b6cae55.png",
        created_at: 1714487156720,
        updated_at: null,
      },
      {
        image_id: "371003a2-7b35-42c0-a9f6-a1ff703b5662",
        page_id: "3cda484c-e739-4352-a4d7-b5391a5c5ea6",
        filename: "622d89f2-1b09-4667-9f98-47aec8d350a7.png",
        created_at: 1714487192519,
        updated_at: null,
      },
      {
        image_id: "ebb97b18-77a9-4c8f-b58d-7474fdfbd54c",
        page_id: "5e541ff4-81f1-47c7-95e6-eb40f6df6a46",
        filename: "504f22a1-1ea2-42da-b6ed-103c138fe4df.png",
        created_at: 1714487169644,
        updated_at: null,
      },
      {
        image_id: "2a894453-37d9-4043-b9cf-9bf7998a4938",
        page_id: "60d8c7e7-59e5-4756-b16f-e564505f8b77",
        filename: "9bc09b51-1987-4b00-84d6-ac16e1c32c01.png",
        created_at: 1714487182177,
        updated_at: null,
      },
      {
        image_id: "0f3c6061-d5c1-4a80-b9d9-30149aea07c9",
        page_id: "7377d3d9-c248-499c-bfa6-bd16ed238e24",
        filename: "fff30d25-77ef-4958-9cd1-bdbca6fbe114.png",
        created_at: 1714487052385,
        updated_at: null,
      },
      {
        image_id: "0620734b-08f7-45ec-a68f-f12cf74d8068",
        page_id: "788068de-490d-4b49-a34c-5cb6374bfb25",
        filename: "8a946996-80cb-4a7a-89de-69fa8f724ba3.png",
        created_at: 1714487091045,
        updated_at: null,
      },
      {
        image_id: "2ac11ab1-42b5-49a3-88c8-1ba44aebbe2e",
        page_id: "7a682469-362b-4e77-b10b-c0d8ecccd2f9",
        filename: "dd18f8e6-93ed-4b73-9373-ff8329664225.png",
        created_at: 1714487145734,
        updated_at: null,
      },
      {
        image_id: "fbc2bf40-d4af-4605-b77b-9ae4b29a1bfc",
        page_id: "aeaffc7c-ffe3-43de-b7da-39b992b4abc9",
        filename: "13b067a4-3ede-43a9-a0cb-ab9ea3d93c4f.png",
        created_at: 1714487105087,
        updated_at: null,
      },
      {
        image_id: "51be5b51-6bb6-4709-9ec3-3e59f56d7f0a",
        page_id: "c2bbfd75-c99a-4db7-bef1-586614222cf3",
        filename: "4c567e69-da91-437b-9385-49e650d20db2.png",
        created_at: 1714487120838,
        updated_at: null,
      },
      {
        image_id: "02cf2c06-fa78-4f12-aeca-a4586313d687",
        page_id: "02cf2c06-fa78-4f12-aeca-a4586313d677",
        filename: "dff07c70-d7f2-41c9-ad6b-b37c9fe4658b.png",
        created_at: 1714487120838,
        updated_at: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("images", null, {});
  },
};
