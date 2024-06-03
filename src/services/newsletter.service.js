import { logger } from "express-glass";
import { objectToLogStr } from "../utils/ObjectToLog";
import { Newsletters } from "../models/";
import pagedData from "../utils/PagedData";

const newsletterService = {};

newsletterService.add = async (newsletter) => {
  logger().info(`add newsletter, newsletter = ${objectToLogStr(newsletter)}`);

  newsletter.created_at = new Date().getTime();
  const newNewsletter = await Newsletters.create(newsletter);
  logger().info(`newsletter created, newsletter = ${newNewsletter.id}`);

  return newNewsletter;
};

newsletterService.getAll = async (query) => {
  logger().info(`get all newsletter, with query = ${objectToLogStr(query)}`);
  const pageSize = 12;
  const start = query.pages ? query.pages * pageSize - pageSize : null;
  const { rows: newsletters, count: totalItems } = await Newsletters.findAndCountAll({
    limit: pageSize,
    offset: start,
  });
  const totalPage = Math.ceil(totalItems / pageSize);
  logger().info("sucessfully get all newsletters");

  return pagedData(newsletters, totalItems, totalPage, Number(query.pages || 1), totalItems > start + pageSize);
};

newsletterService.deleteById = async (newsletterId) => {
  logger().info(`delete newsletter, newsletter = ${newsletterId}`);

  const existingNewsletter = await Newsletters.findOne({ where: { newsletter_id: newsletterId } });
  if (!existingNewsletter) {
    throw new NotFoundError(`Newsletter with newsletter_id: ${newsletterId} is not found`);
  }

  await existingNewsletter.destroy();
  logger().info(`newsletter deleted, newsletter = ${newsletterId}`);

  return newsletterId;
};

export default newsletterService;
