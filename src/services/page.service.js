import path from "path";
import sharp from "sharp";
import { v4 } from "uuid";
import { logger } from "express-glass";
import { objectToLogStr } from "../utils/ObjectToLog";
import { BadRequestError } from "../utils/ApiError";

import { connection, Pages, Images } from "../models";
import getPagesQuery from "../utils/query/page.query";

const pageService = {};

pageService.add = async (page) => {
  logger().info(`add page, page = ${objectToLogStr(page)}`);
  const t = await connection.transaction();
  try {
    page.created_at = new Date().getTime();

    const newPage = await Pages.create(page, { transaction: t });
    logger().info(`page created, page = ${newPage.page_id}`);

    if (page.images.length > 0) {
      const pageId = newPage.page_id;
      const images = await page.images.reduce(async (acc, curr) => {
        const filename = v4() + ".png";
        await sharp(curr.buffer)
          .png({ quality: 70 })
          .toFile(path.join(__dirname, "../uploads", filename));
        return [
          ...(await acc),
          {
            ...curr,
            page_id: pageId,
            filename,
            created_at: new Date().getTime(),
          },
        ];
      }, []);
      await Images.bulkCreate(images, { transaction: t });
      logger().info(`images created, for page_id = ${pageId}`);
    }

    t.commit();
    return newPage;
  } catch (error) {
    t.rollback();
    throw new BadRequestError(error.message);
  }
};

pageService.update = async (page_id, page) => {
  logger().info(`update page, body = ${objectToLogStr(page)}`);
  const t = await connection.transaction();
  try {
    const existingPage = await Pages.findOne({
      where: {
        page_id,
      },
      transaction: t,
    });
    if (!existingPage) throw new NotFoundError("page not found");

    page.updated_at = new Date().getTime();

    await Pages.update(page, {
      where: { page_id },
      transaction: t,
    });
    t.commit();
    return existingPage;
  } catch (error) {
    t.rollback();
    throw new BadRequestError(error.message);
  }
};

pageService.getAll = async (query) => {
  logger().info(`get all pages`);
  const pages = await Pages.findAll({
    where: getPagesQuery(query),
    include: [
      {
        model: Images,
        as: "images",
        attributes: ["image_id", "filename"],
      },
      {
        model: Pages,
        as: "childs",
        required: false,
        attributes: ["page_id", "title", "subtitle", "description", "sequence"],
        separate: true,
        order: [["sequence", "ASC"]],
        include: [
          {
            model: Images,
            as: "images",
            attributes: ["image_id", "filename"],
          },
        ],
      },
    ],
  });

  return pages;
};

export default pageService;
