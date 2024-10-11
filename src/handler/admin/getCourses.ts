import { HttpRequest, InvocationContext } from "@azure/functions";
import courseRepository from "../../repository/courseRepository";
import handler from "../handler";
import { Course } from "../../model/course";

const getCourses = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<Course[]> => {
  return await courseRepository.getAll();
};

export default handler(getCourses);
