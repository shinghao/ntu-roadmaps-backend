import { HttpRequest, InvocationContext } from "@azure/functions";
import courseRepository from "../../repository/courseRepository";
import handler from "../handler";
import { Course } from "../../schemas/course";

const getCourseDetails = async (
  request: HttpRequest,
  context: InvocationContext
): Promise<Course> => {
  const { courseCode } = request.params;
  return await courseRepository.get(courseCode);
};

export default handler(getCourseDetails);
