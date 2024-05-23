import { v4 } from "uuid";
import sharp from "sharp";
import path from "path";
import { logger } from "express-glass";
import { objectToLogStr } from "../utils/ObjectToLog";
import News from "../models/News";
import pagedData from "../utils/PagedData";
import Careers from "../models/Careers";
import { NotFoundError } from "../utils/ApiError";

const newsService = {};

newsService.add = async (news) => {
  logger().info(`add news, news = ${objectToLogStr(news)}`);

  if (news.image) {
    const filename = v4() + ".png";
    await sharp(news.image.buffer)
      .png({ quality: 70 })
      .toFile(path.join(__dirname, "../uploads", filename));

    news.image = filename;
  }

  news.created_at = new Date().getTime();
  const newNews = await News.create(news);
  logger().info(`news created, news = ${newNews.id}`);

  return newNews;
};

newsService.getAll = async (query) => {
  logger().info(`get all news, with query = ${objectToLogStr(query)}`);
  const pageSize = query.size || 12;
  const start = query.pages ? query.pages * pageSize - pageSize : null;
  const { rows: newss, count: totalItems } = await News.findAndCountAll({
    limit: pageSize,
    offset: start,
  });
  const totalPage = Math.ceil(totalItems / pageSize);
  logger().info("sucessfully get all newss");

  return pagedData(
    newss,
    totalItems,
    totalPage,
    Number(query.pages || 1),
    totalItems > start + pageSize
  );
};

newsService.getById = async (newsId) => {
  logger().info(`get news by news_id = ${newsId}`);
  const newsDetail = await News.findOne({ where: { news_id: newsId } });

  if (!newsDetail)
    throw new NotFoundError(`News with news_id: ${newsId} is not found`);

  logger().info("sucessfully get all newss");
  return newsDetail;
};

newsService.deleteById = async (newsId) => {
  logger().info(`delete news request, data = ${objectToLogStr(newsId)}`)
  if(!newsId) {
    throw new ValidationError("news_id is required")
  }
  const result = await News.destroy({ where: { news_id: newsId } });
  logger().info(`news: ${newsId} deleted`);
  return result;
};

newsService.update = async ( newsId, news) => {
  logger().info(`update news, news_id = ${newsId}, news = ${objectToLogStr(news)}`);

  const existingNews = await News.findOne({ where: { news_id: newsId } });

  if (!existingNews) throw new NotFoundError(`News with news_id: ${newsId} is not found`);

  if (news.file) {
    await sharp(news.file.buffer)
      .png({ quality: 70 })
      .toFile(path.join(__dirname, "../uploads", existingNews.image));
  }

  news.updated_at = new Date().getTime();
  await existingNews.update(news);
  logger().info(`news: ${newsId} updated`);

  return existingNews;
};

export default newsService;
