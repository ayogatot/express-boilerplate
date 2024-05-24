import { logger } from "express-glass";
import { objectToLogStr } from "../utils/ObjectToLog";
import Careers from "../models/Careers";
import pagedData from "../utils/PagedData";
import { NotFoundError } from "../utils/ApiError";
import getCareerQuery from "../utils/query/career.query";

const careerService = {};

careerService.getAll = async (query) => {
  logger().info(`get all career, with query = ${objectToLogStr(query)}`);
  const pageSize = 12;
  const start = query.pages ? query.pages * pageSize - pageSize : null;
  const { rows: careers, count: totalItems } = await Careers.findAndCountAll({
    where: getCareerQuery(query),
    limit: pageSize,
    offset: start,
  });
  const totalPage = Math.ceil(totalItems / pageSize);
  logger().info("sucessfully get all careers");

  return pagedData(careers, totalItems, totalPage, Number(query.pages || 1), totalItems > start + pageSize);
};

careerService.add = async (career) => {
  logger().info(`add career, career = ${objectToLogStr(career)}`);

  career.is_active = true;
  career.created_at = new Date().getTime();
  const newCareer = await Careers.create(career);
  logger().info(`career created, career = ${newCareer.id}`);

  return newCareer;
};

careerService.update = async (careerId, career) => {
  logger().info(`update career, career = ${objectToLogStr(career)}`);

  const existingCareer = await Careers.findOne({ where: { career_id: careerId } });

  if (!existingCareer) {
    throw new NotFoundError(`career not found, id = ${careerId}`);
  }

  existingCareer.title = career.title;
  existingCareer.job_description = career.job_description;
  existingCareer.requirements = career.requirements;
  existingCareer.is_active = career.is_active;
  existingCareer.updated_at = new Date().getTime();
  await existingCareer.save();
  logger().info(`career updated, career = ${careerId}`);

  return existingCareer;
};

careerService.delete = async (careerId) => {
  logger().info(`delete career, id = ${careerId}`);
  const existingCareer = await Careers.findOne({ where: { career_id: careerId } });

  if (!existingCareer) {
    throw new NotFoundError(`career not found, id = ${careerId}`);
  }

  await existingCareer.destroy();
  logger().info(`career deleted, id = ${careerId}`);

  return existingCareer;
};

export default careerService;
