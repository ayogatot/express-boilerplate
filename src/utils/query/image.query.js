// import { Op } from 'sequelize';

import { Sequelize } from "sequelize";

export default function getImagesQuery(query) {
    let conditions = {};

    if (query.page) {
      conditions = Sequelize.literal(`page_detail.page = '${query.page}'`);
    }

    return conditions;
  }
  