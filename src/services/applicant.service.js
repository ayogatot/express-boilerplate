import { logger } from "express-glass";
import { objectToLogStr } from "../utils/ObjectToLog";
import Applicants from "../models/Applicants";
import pagedData from "../utils/PagedData";
import Careers from "../models/Careers";

const applicantService = {};

applicantService.add = async (applicant) => {
  logger().info(`add applicant, applicant = ${objectToLogStr(applicant)}`);

  applicant.cv = applicant.cv.filename;
  applicant.created_at = new Date().getTime();
  const newApplicant = await Applicants.create(applicant);
  logger().info(`applicant created, applicant = ${newApplicant.id}`);

  return newApplicant;
};

applicantService.getAll = async (query) => {
  logger().info(`get all applicant, with query = ${objectToLogStr(query)}`);
  const pageSize = 12;
  const start = query.pages ? query.pages * pageSize - pageSize : null;
  const { rows: applicants, count: totalItems } = await Applicants.findAndCountAll({
    include: [
      { model: Careers, as: "career_detail", attributes: ["career_id", "title", "job_description", "is_active"], required: false },
    ],
    limit: pageSize,
    offset: start,
  });
  const totalPage = Math.ceil(totalItems / pageSize);
  logger().info("sucessfully get all applicants");

  return pagedData(applicants, totalItems, totalPage, Number(query.pages || 1), totalItems > start + pageSize);
};

applicantService.getById = async (id) => {
  logger().info(`get applicant by id, id = ${id}`);
  const applicant = await Applicants.findOne({ where: { id: id } });

  if (!applicant) {
    throw new NotFoundError(`applicant not found, id = ${id}`);
  }

  logger().info(`get applicant by id, applicant = ${objectToLogStr(applicant)}`);
  return applicant;
};

applicantService.deleteById = async (id) => {
  logger().info(`delete applicant, id = ${id}`);
  const existingApplicant = await Applicants.findOne({ where: { applicant_id: id } });

  if (!existingApplicant) {
    throw new NotFoundError(`applicant not found, id = ${id}`);
  }

  await existingApplicant.destroy();
  logger().info(`applicant deleted, id = ${id}`);

  return existingApplicant;
};

export default applicantService;
