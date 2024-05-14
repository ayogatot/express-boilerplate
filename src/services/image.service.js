import path from "path";
import sharp from "sharp";
import { logger } from "express-glass";
import { objectToLogStr } from "../utils/ObjectToLog";

import Pages from "../models/Pages";
import Images from "../models/Images";
import getImagesQuery from "../utils/query/image.query";
import pagedData from "../utils/PagedData";
import { NotFoundError } from "../utils/ApiError";

const imageService = {};

imageService.getAll = async (query) => {
  logger().info(`get all images with query = ${objectToLogStr(query)}`);
  const pageSize = 12;
  const start = query.pages ? query.pages * pageSize - pageSize : null;

  const { rows: images, count: totalItems } = await Images.findAndCountAll({
    where: getImagesQuery(query),
    include: [
      {
        model: Pages,
        as: "page_detail",
        attributes: [ "page_id", "parent_page_id", "page", "title", "subtitle", "description", "sequence" ],
      },
    ],
    limit: pageSize,
    offset: start,
  });
  const totalPage = Math.ceil(totalItems / pageSize);
  return pagedData( images, totalItems, totalPage, Number(query.pages || 1), totalItems > start + pageSize
  );
};

imageService.update = async (imageId, image) => {
  logger().info(`update image, image_id: ${imageId}`);
  const existingImage = await Images.findOne({
    where: {
      image_id: imageId,
    },
  });

  if (!existingImage) throw new NotFoundError("image not found");

  await sharp(image.buffer)
    .png({ quality: 70 })
    .toFile(path.join(__dirname, "../uploads", existingImage.filename));
  
  existingImage.updated_at = new Date().getTime();
  await existingImage.save()

  return existingImage
};

export default imageService;
